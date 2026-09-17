import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

     const firebaseConfig = {
    apiKey: "AIzaSyBYHOZBNnPUfe-6A_whxjCCuN53pBYf-sc",
    authDomain: "technova-9e57e.firebaseapp.com",
    projectId: "technova-9e57e",
    storageBucket: "technova-9e57e.firebasestorage.app",
    messagingSenderId: "631133485801",
    appId: "1:631133485801:web:78dacc3ebe76f903750e78",
    measurementId: "G-E1MY3W481L"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });


const IS_CONFIGURED = Object.entries(firebaseConfig).every(
  ([, v]) => typeof v === "string" && v && !v.startsWith("YOUR_")
);
if (!IS_CONFIGURED) {
  console.warn(
    "[TechNova] Firebase config abhi tak placeholder values par hai — " +
    "js/firebase.js mein apna real project config paste karein (README-FIREBASE.md dekhein)."
  );
}


function showNotConfiguredBanner() {
  if (document.getElementById("tnFirebaseBanner")) return;
  const bar = document.createElement("div");
  bar.id = "tnFirebaseBanner";
  bar.setAttribute("role", "alert");
  bar.style.cssText = [
    "position:fixed", "top:0", "left:0", "right:0", "z-index:99999",
    "background:#7a1f1f", "color:#fff", "font:600 13px/1.5 Inter,system-ui,sans-serif",
    "padding:10px 44px 10px 16px", "text-align:center", "box-shadow:0 6px 18px rgba(0,0,0,.25)",
  ].join(";");
  bar.innerHTML =
    '⚠️ Firebase abhi connect nahi hai — signup, login aur admin approvals kaam nahi karenge. ' +
    '<code style="background:rgba(255,255,255,.15);padding:1px 6px;border-radius:4px">js/firebase.js</code> ' +
    'mein apna real Firebase config paste karein (README-FIREBASE.md).' +
    '<button id="tnFirebaseBannerClose" aria-label="Dismiss" style="position:absolute;right:10px;top:50%;' +
    'transform:translateY(-50%);background:none;border:0;color:#fff;font-size:16px;cursor:pointer;' +
    'width:28px;height:28px;line-height:1">✕</button>';
  const mount = () => {
    document.body.prepend(bar);
    document.getElementById("tnFirebaseBannerClose")?.addEventListener("click", () => bar.remove());
  };
  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);
}
if (!IS_CONFIGURED) showNotConfiguredBanner();



const SESSION_KEY = "technova.session";
const setSession = (user) => {
  try { localStorage.setItem(SESSION_KEY, JSON.stringify({ ...user, at: Date.now() })); }
  catch (e) { /* storage disabled */ }
};
const getSession = () => {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || null; }
  catch (e) { return null; }
};
const clearSession = () => {
  try { localStorage.removeItem(SESSION_KEY); } catch (e) {}
};

/* Are we currently inside /html/ or at the site root? Lets every
   helper build correct relative links from either location. */
const inPages = () => window.location.pathname.includes("/pages/");
const pagePath = (file) => (inPages() ? file : `${file}`);

/* Where a role's dashboard lives */
const homeFor = (role) => {
  if (role === "admin") return pagePath("admin.html");
  if (role === "instructor") return pagePath("instructor.html");
  return pagePath("stdashboard.html");
};
const loginPath = () => pagePath("authentication.html");

/* ===========================================================
   GENERIC FIRESTORE CRUD
   Use these anywhere in your dashboards, e.g.:
     TechNova.create("courses", {title:"..."})
     TechNova.list("courses", { field:"status", value:"approved" })
     TechNova.update("courses", id, { price: 59 })
     TechNova.remove("courses", id)
   =========================================================== */

/** Throws one clear, friendly error if the project hasn't been configured yet. */
function assertConfigured() {
  if (!IS_CONFIGURED) throw new Error("not-configured");
}

/** Create a doc. Pass an id to set a specific doc id, otherwise one is generated. */
async function create(col, data, id = null) {
  assertConfigured();
  const payload = { ...data, createdAt: serverTimestamp() };
  if (id) {
    await setDoc(doc(db, col, id), payload);
    return id;
  }
  const ref = await addDoc(collection(db, col), payload);
  return ref.id;
}

/** Read a single doc by id. Returns null if it doesn't exist. */
async function read(col, id) {
  assertConfigured();
  const snap = await getDoc(doc(db, col, id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

/** Update fields on an existing doc (merge, doesn't overwrite the whole doc). */
async function update(col, id, data) {
  assertConfigured();
  await updateDoc(doc(db, col, id), data);
}

/** Delete a doc. */
async function remove(col, id) {
  assertConfigured();
  await deleteDoc(doc(db, col, id));
}

/**
 * List docs in a collection, optionally filtered/sorted.
 *   TechNova.list("courses")
 *   TechNova.list("courses", { field: "status", value: "approved" })
 *   TechNova.list("courses", { field: "instructorId", value: uid, order: "createdAt" })
 */
async function list(col, opts = {}) {
  assertConfigured();
  const parts = [];
  if (opts.field) parts.push(where(opts.field, opts.op || "==", opts.value));
  if (opts.order) parts.push(orderBy(opts.order));
  const q = parts.length ? query(collection(db, col), ...parts) : collection(db, col);
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/* ===========================================================
   AUTH — sign up / log in / log out
   =========================================================== */

/**
 * Sign a new user up. Always starts as status:"pending" — they
 * can NOT log in until an admin approves them (see admin
 * dashboard -> Approvals). Nobody can self-register as "admin".
 */
async function signUp({ name, email, password, role }) {
  assertConfigured();
  const safeRole = role === "admin" ? "student" : (role || "student");
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName: name });
  await setDoc(doc(db, "users", cred.user.uid), {
    name,
    email,
    role: safeRole,
    status: "pending", // pending -> approved | rejected | suspended (set by admin)
    createdAt: serverTimestamp(),
  });
  await signOut(auth); // don't let them in until an admin approves
  return { uid: cred.user.uid, name, email, role: safeRole, status: "pending" };
}

/**
 * Log an existing user in. Throws a plain Error whose .message is
 * one of: "invalid-credentials" | "no-profile" | "pending-approval"
 * | "rejected" | "suspended" — check e.message in the UI to show
 * the right toast.
 */
async function logIn({ email, password }) {
  assertConfigured();
  let cred;
  try {
    cred = await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    throw new Error("invalid-credentials");
  }
  const snap = await getDoc(doc(db, "users", cred.user.uid));
  if (!snap.exists()) { await signOut(auth); throw new Error("no-profile"); }
  const profile = snap.data();
  if (profile.status === "pending") { await signOut(auth); throw new Error("pending-approval"); }
  if (profile.status === "rejected") { await signOut(auth); throw new Error("rejected"); }
  if (profile.status === "suspended") { await signOut(auth); throw new Error("suspended"); }
  const user = { uid: cred.user.uid, name: profile.name, email: profile.email, role: profile.role, status: profile.status };
  setSession(user);
  return user;
}

/**
 * Google sign-in. Same approval rules as logIn():
 *   - first time ever -> creates a "pending" profile (role: student)
 *     and throws "pending-approval" so they wait for an admin, same
 *     as an email/password signup.
 *   - existing profile -> throws "pending-approval" | "rejected" |
 *     "suspended" if not yet approved, otherwise resolves the user.
 */
async function signInWithGoogle() {
  assertConfigured();
  const cred = await signInWithPopup(auth, googleProvider);
  const fbUser = cred.user;
  const ref = doc(db, "users", fbUser.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      name: fbUser.displayName || "",
      email: fbUser.email || "",
      role: "student", // Google sign-up always starts as student; admin/instructor still needs the manual flow
      status: "pending",
      createdAt: serverTimestamp(),
    });
    await signOut(auth);
    throw new Error("pending-approval");
  }

  const profile = snap.data();
  if (profile.status === "pending") { await signOut(auth); throw new Error("pending-approval"); }
  if (profile.status === "rejected") { await signOut(auth); throw new Error("rejected"); }
  if (profile.status === "suspended") { await signOut(auth); throw new Error("suspended"); }

  const user = { uid: fbUser.uid, name: profile.name, email: profile.email, role: profile.role, status: profile.status };
  setSession(user);
  return user;
}

/** Send a password reset email. */
async function resetPassword(email) {
  await sendPasswordResetEmail(auth, email);
}

/** Sign out and go back to the login page (kept as .logout to match existing buttons). */
async function logout() {
  try { await signOut(auth); } catch (e) {}
  clearSession();
  window.location.href = inPages() ? "authentication.html" : loginPath();
}

/** Subscribe to auth state; callback receives the full user profile (or null). */
function onAuth(callback) {
  if (!IS_CONFIGURED) { callback(null); return () => {}; }
  return onAuthStateChanged(auth, async (fbUser) => {
    if (!fbUser) { clearSession(); callback(null); return; }
    const snap = await getDoc(doc(db, "users", fbUser.uid));
    if (!snap.exists()) { callback(null); return; }
    const profile = snap.data();
    const user = { uid: fbUser.uid, name: profile.name, email: profile.email, role: profile.role, status: profile.status };
    if (profile.status === "approved") setSession(user);
    callback(user);
  });
}

/* ---------------------------------------------------------
   Auto-redirect an already-logged-in + approved user away
   from the login/home page straight to their dashboard.
   (Adapted from the redirection snippet you shared — file
   names here match this project's actual /html/ structure.)
   --------------------------------------------------------- */
function initAuthRedirect() {
  if (!IS_CONFIGURED) return; // nothing to redirect from until Firebase is set up

  // Only auto-redirect from the marketing/landing page (index.html).
  // NOT from authentication.html: if a user is already signed in
  // (Firebase keeps sessions alive across page loads) and opens the
  // auth page to sign up a new/second account, this redirect used to
  // fire mid-interaction and yank them away to their old dashboard —
  // which looked exactly like "the signup form shows for a second
  // then disappears". Authentication.html is also the page you use
  // to switch accounts, so it should never bounce you on its own.
  const path = window.location.pathname;
  const onEntryPage = path === "/" || path.endsWith("/index.html");
  if (!onEntryPage) return;

  // Only react to the auth state Firebase already knows about when the
  // page first loads — not to whatever this same page does afterwards
  // (e.g. it shouldn't matter for this listener if something on this
  // page later signs a user in or out).
  const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
    unsubscribe();
    if (fbUser) {
      const snap = await getDoc(doc(db, "users", fbUser.uid));
      if (snap.exists()) {
        const user = snap.data();
        if (user.status !== "approved") { console.log("User not approved yet"); return; }
        if (user.role === "admin") window.location.replace(homeFor("admin"));
        else if (user.role === "instructor") window.location.replace(homeFor("instructor"));
        else if (user.role === "student") window.location.replace(homeFor("student"));
        else console.log("Redirect skipped");
      } else {
        console.log("User Not Found!");
      }
    } else {
      console.log("No user is signed in.");
    }
  });
}
/* ===========================================================
   COURSES — CRUD + admin-approval workflow
   =========================================================== */

/** Instructor creates a course. Always starts "pending". */
async function addCourse(courseData, instructorUser) {
  return create("courses", {
    ...courseData,
    instructorId: instructorUser.uid,
    instructorName: instructorUser.name,
    status: "pending", // pending -> approved | rejected (admin decides) then published toggles visibility
    published: false,
  });
}

/** Admin approves a pending course (makes it live/publishable). */
async function approveCourse(id) {
  await update("courses", id, { status: "approved", published: true });
}

/** Admin rejects a pending course. */
async function rejectCourse(id, reason = "") {
  await update("courses", id, { status: "rejected", published: false, rejectionReason: reason });
}

/** Courses visible to the public / students. */
async function listApprovedCourses() {
  return list("courses", { field: "status", value: "approved" });
}

/** All courses waiting on an admin decision. */
async function listPendingCourses() {
  return list("courses", { field: "status", value: "pending" });
}

/** A single instructor's own courses (any status). */
async function listInstructorCourses(uid) {
  return list("courses", { field: "instructorId", value: uid });
}

/* ===========================================================
   USERS — admin approval workflow
   =========================================================== */

/** Users (students/instructors) waiting for admin approval. */
async function listPendingUsers() {
  return list("users", { field: "status", value: "pending" });
}

async function listUsersByRole(role) {
  return list("users", { field: "role", value: role });
}

/** Admin approves a pending signup. */
async function approveUser(uid) {
  await update("users", uid, { status: "approved" });
}

/** Admin rejects a pending signup. */
async function rejectUser(uid) {
  await update("users", uid, { status: "rejected" });
}

/** Admin suspends / restores an already-approved user. */
async function setUserStatus(uid, status) {
  await update("users", uid, { status });
}

/* ===========================================================
   WISHLIST — a student saving a course for later
   =========================================================== */

/** Save a course to a student's wishlist. Prevents duplicates. */
async function addToWishlist(studentUser, course) {
  const existing = await list("wishlist", { field: "studentId", value: studentUser.uid });
  const already = existing.find((w) => w.courseId === String(course.id));
  if (already) return already.id;

  return create("wishlist", {
    studentId: studentUser.uid,
    courseId: String(course.id),
    courseTitle: course.title,
    courseImg: course.img || course.thumb || "",
    courseCategory: course.cat || course.category || "",
    courseDifficulty: course.diff || course.difficulty || "",
    courseDuration: course.duration || "",
    instructorName: course.instr || course.instructorName || "",
    price: course.price || "",
  });
}

/** Remove one wishlist entry by its Firestore doc id. */
async function removeFromWishlist(id) {
  await remove("wishlist", id);
}

/** This student's own wishlist — nobody else's. */
async function listWishlist(uid) {
  return list("wishlist", { field: "studentId", value: uid });
}

/* ===========================================================
   CART — courses a student is considering before enrolling
   =========================================================== */

/** Add a course to a student's cart. Prevents duplicates. */
async function addToCart(studentUser, course) {
  const existing = await list("cart", { field: "studentId", value: studentUser.uid });
  const already = existing.find((c) => c.courseId === String(course.id));
  if (already) return already.id;

  return create("cart", {
    studentId: studentUser.uid,
    courseId: String(course.id),
    courseTitle: course.title,
    courseImg: course.img || course.thumb || "",
    courseCategory: course.cat || course.category || "",
    courseDifficulty: course.diff || course.difficulty || "",
    courseDuration: course.duration || "",
    instructorName: course.instr || course.instructorName || "",
    price: course.price || "",
  });
}

/** Remove one cart entry by its Firestore doc id. */
async function removeFromCart(id) {
  await remove("cart", id);
}

/** This student's own cart — nobody else's. */
async function listCart(uid) {
  return list("cart", { field: "studentId", value: uid });
}

/* ===========================================================
   ENROLLMENTS — a student enrolling in a course
   =========================================================== */

/** Enroll the given student in a course. Prevents duplicate enrollment. */
async function enrollInCourse(studentUser, course) {
  const existing = await list("enrollments", { field: "studentId", value: studentUser.uid });
  const already = existing.find((e) => e.courseId === String(course.id));
  if (already) return already.id;

  return create("enrollments", {
    studentId: studentUser.uid,
    studentName: studentUser.name,
    courseId: String(course.id),
    courseTitle: course.title,
    courseImg: course.img || course.thumb || "",
    courseCategory: course.cat || course.category || "",
    courseDifficulty: course.diff || course.difficulty || "",
    courseDuration: course.duration || "",
    instructorName: course.instr || course.instructorName || "",
    progress: 0,
  });
}

/** This student's own enrollments — nobody else's. */
async function listStudentEnrollments(uid) {
  return list("enrollments", { field: "studentId", value: uid });
}

/* ---------------------------------------------------------
   Public API — everything lives on window.TechNova so every
   existing page/script (loaded as a plain <script defer>)
   can keep calling window.TechNova.* exactly like before.
   --------------------------------------------------------- */
const TechNova = {
  enabled: true,
  configured: IS_CONFIGURED,
  config: firebaseConfig,
  app, auth, db,

  // session cache
  setSession, getSession, clearSession, homeFor, loginPath,

  // generic CRUD
  create, read, update, remove, list,

  // auth
  signUp, logIn, logout, onAuth, resetPassword, signInWithGoogle,

  // courses
  addCourse, approveCourse, rejectCourse,
  listApprovedCourses, listPendingCourses, listInstructorCourses,

  // users / approvals
  listPendingUsers, listUsersByRole, approveUser, rejectUser, setUserStatus,

  // wishlist / cart
  addToWishlist, removeFromWishlist, listWishlist,
  addToCart, removeFromCart, listCart,

  // enrollments
  enrollInCourse, listStudentEnrollments,
};

window.TechNova = TechNova;
initAuthRedirect();