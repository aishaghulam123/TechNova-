/* =========================================================
   TechNova Academy — Dynamic Course Detail page
   Reads ?id= from the URL, pulls that course out of CATALOG.
   Title + instructor are dynamic; description/outline are dummy.
   ========================================================= */

const q = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const root = q("#detailRoot");
const toastWrap = q("#toastWrap");

/* Small toast helper (same look as the dashboards) */
function toast(msg, kind = "info", ms = 2400) {
  if (!toastWrap) return;
  const icons = { info: "fa-circle-info", success: "fa-circle-check", warn: "fa-triangle-exclamation", error: "fa-circle-xmark" };
  const el = document.createElement("div");
  el.className = `toast ${kind}`;
  el.innerHTML = `<i class="fa-solid ${icons[kind] || icons.info}"></i><span>${esc(msg)}</span>`;
  toastWrap.appendChild(el);
  setTimeout(() => { el.classList.add("leaving"); setTimeout(() => el.remove(), 300); }, ms);
}

/* Which course was clicked? Dummy demo courses come from CATALOG;
   real instructor courses (added via Firestore, approved by admin)
   use an "fs-<firestoreId>" url id. */
async function loadCourse(id) {
  if (!id) return null;
  const dummy = getCourseById(id);
  if (dummy) return dummy;
  if (id.startsWith("fs-") && window.TechNova?.read) {
    try {
      const real = await window.TechNova.read("courses", id.slice(3));
      if (real && real.status === "approved") {
        return {
          id: `fs-${real.id}`,
          title: real.title, instr: real.instructorName || "TechNova Instructor",
          cat: real.category || "General", diff: real.difficulty || "Beginner",
          duration: real.duration || "", lessons: (real.modules || []).reduce((a, m) => a + (m.lessons?.length || 0), 0),
          rating: real.rating || 0, students: real.students || 0,
          price: `$${real.price ?? 0}`,
          img: real.thumb || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop",
        };
      }
    } catch (err) { /* fall through to not-found */ }
  }
  return null;
}

const courseId = new URLSearchParams(location.search).get("id");
loadCourse(courseId).then((course) => renderCourseDetail(course));

function renderCourseDetail(course) {

/* Fallback when the id is missing or unknown */
if (!course) {
  document.title = "Course not found — TechNova Academy";
  root.innerHTML = `
    <div class="empty-state" style="padding:80px 20px">
      <i class="fa-regular fa-circle-question"></i>
      <h1 style="margin:8px 0">Course not found</h1>
      <p>The course you're looking for doesn't exist or the link is incomplete.</p>
      <p style="margin-top:16px"><a class="btn-primary" href="courses.html"><i class="fa-solid fa-arrow-left"></i> Back to all courses</a></p>
    </div>`;
} else {
  document.title = `${course.title} — TechNova Academy`;
  const totalLessons = DUMMY_OUTLINE.reduce((n, m) => n + m.lessons.length, 0);

  const outlineHTML = DUMMY_OUTLINE.map((m, i) => `
    <div class="module-item${i === 0 ? " open" : ""}">
      <button class="module-btn" type="button" aria-expanded="${i === 0}">
        <span class="n">${i + 1}</span>
        <b>${esc(m.title)}</b>
        <small>${m.lessons.length} lessons</small>
        <i class="fa-solid fa-chevron-down chev"></i>
      </button>
      <div class="module-body">
        <ul>
          ${m.lessons.map((l) => `<li><i class="fa-regular fa-circle-play"></i> ${esc(l.t)} <span>${esc(l.d)}</span></li>`).join("")}
        </ul>
      </div>
    </div>`).join("");

  const related = CATALOG.filter((c) => c.id !== course.id && c.cat === course.cat).slice(0, 3);
  const relatedHTML = (related.length ? related : CATALOG.filter((c) => c.id !== course.id).slice(0, 3)).map((c) => `
    <a class="cat-card" id="related-${esc(c.id)}" data-course-id="${esc(c.id)}" href="course-detail.html?id=${encodeURIComponent(c.id)}">
      <div class="thumb"><img src="${c.img}" alt="${esc(c.title)}" loading="lazy" /></div>
      <div class="body">
        <span class="cat">${esc(c.cat)}</span>
        <h3>${esc(c.title)}</h3>
        <p class="instr"><i class="fa-solid fa-chalkboard-user"></i> ${esc(c.instr)}</p>
      </div>
    </a>`).join("");

  root.innerHTML = `
    <nav class="crumbs"><a href="courses.html">Courses</a> / <span>${esc(course.cat)}</span> / <span>${esc(course.title)}</span></nav>

    <section class="detail-hero reveal-js" id="courseHero" data-course-id="${esc(course.id)}">
      <span class="eyebrow">${esc(course.cat)} · ${esc(course.diff)}</span>
      <h1 id="courseTitle">${esc(course.title)}</h1>
      <div class="by">
        <img src="https://i.pravatar.cc/80?u=${encodeURIComponent(course.instr)}" alt="${esc(course.instr)}" />
        <div>Instructor<br /><b id="courseInstructor">${esc(course.instr)}</b></div>
      </div>
      <div class="hero-meta">
        <span><i class="fa-solid fa-star" style="color:var(--gold)"></i> ${course.rating} rating</span>
        <span><i class="fa-solid fa-users"></i> ${course.students.toLocaleString()} students</span>
        <span><i class="fa-regular fa-clock"></i> ${esc(course.duration)}</span>
        <span><i class="fa-solid fa-list-check"></i> ${course.lessons} lessons</span>
        <span><i class="fa-solid fa-language"></i> English</span>
      </div>
    </section>

    <div class="detail-grid">
      <div>
        <section class="panel reveal-js">
          <h2>About this course</h2>
          <p>${DUMMY_DESCRIPTION}</p>
        </section>

        <section class="panel reveal-js">
          <h2>What you'll learn</h2>
          <ul class="learn-list">
            ${DUMMY_LEARN.map((t) => `<li><i class="fa-solid fa-circle-check"></i><span>${esc(t)}</span></li>`).join("")}
          </ul>
        </section>

        <section class="panel reveal-js">
          <h2>Course outline</h2>
          <p style="margin-bottom:14px;color:var(--muted);font-size:13px">${DUMMY_OUTLINE.length} modules · ${totalLessons} lessons · ${esc(course.duration)} total</p>
          <div class="outline" id="outline">${outlineHTML}</div>
        </section>

        <section class="panel reveal-js">
          <h2>Requirements</h2>
          <ul class="req-list">${DUMMY_REQUIREMENTS.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>
        </section>
      </div>

      <aside>
        <div class="panel buy-card reveal-js">
          <div class="thumb"><img src="${course.img}" alt="${esc(course.title)}" /></div>
          <div><span class="price">${esc(course.price)}</span><span class="old">$249</span></div>
          <div class="btns">
            <button class="btn-primary" id="enrollBtn" data-act="enroll" data-course-id="${esc(course.id)}"><i class="fa-solid fa-graduation-cap"></i> Enroll now</button>
            <button class="btn-ghost" id="wishlistBtn" data-act="wishlist" data-course-id="${esc(course.id)}"><i class="fa-regular fa-heart"></i> Add to wishlist</button>
            <button class="btn-ghost" id="shareBtn" data-act="share"><i class="fa-solid fa-share-nodes"></i> Share course</button>
          </div>
          <ul class="facts">
            <li><i class="fa-solid fa-infinity"></i> Lifetime access</li>
            <li><i class="fa-solid fa-mobile-screen"></i> Mobile & desktop</li>
            <li><i class="fa-solid fa-award"></i> Certificate of completion</li>
            <li><i class="fa-solid fa-rotate-left"></i> 30-day money-back guarantee</li>
          </ul>
        </div>
      </aside>
    </div>

    <section class="panel reveal-js">
      <h2>Related courses</h2>
      <div class="related-grid">${relatedHTML}</div>
    </section>

    <p class="site-foot">© ${new Date().getFullYear()} TechNova Academy — frontend demo with dummy data.</p>`;

  /* Accordion */
  q("#outline").addEventListener("click", (e) => {
    const btn = e.target.closest(".module-btn");
    if (!btn) return;
    const item = btn.parentElement;
    const open = item.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
  });

  /* Sidebar buttons */
  root.addEventListener("click", (e) => {
    const b = e.target.closest("[data-act]");
    if (!b) return;
    const acts = {
      enroll:   async () => {
        /* Not signed in yet? Send them to the auth page first. */
        const session = window.TechNova?.getSession?.();
        if (!session) {
          toast("Please sign in to enroll — redirecting…", "info");
          setTimeout(() => { location.href = `authentication.html?mode=signup&next=${encodeURIComponent(location.href)}`; }, 1100);
          return;
        }
        if (session.role !== "student") {
          toast("Only student accounts can enroll in courses.", "warn");
          return;
        }
        b.disabled = true;
        try {
          await window.TechNova.enrollInCourse(session, course);
          b.innerHTML = '<i class="fa-solid fa-circle-check"></i> Enrolled';
          toast(`Enrolled in "${course.title}" — check your dashboard!`, "success");
        } catch (err) {
          b.disabled = false;
          toast(err?.message || "Couldn't enroll — please try again.", "error");
        }
      },
           wishlist: async () => {
        /* Not signed in yet? Send them to the auth page first. */
        const session = window.TechNova?.getSession?.();
        if (!session) {
          toast("Please sign in to save courses to your wishlist — redirecting…", "info");
          setTimeout(() => { location.href = `authentication.html?mode=signup&next=${encodeURIComponent(location.href)}`; }, 1100);
          return;
        }
        b.disabled = true;
        try {
          if (b.dataset.saved === "true") {
            await window.TechNova.removeFromWishlist(b.dataset.wishlistId);
            b.dataset.saved = "false";
            b.dataset.wishlistId = "";
            b.innerHTML = '<i class="fa-regular fa-heart"></i> Add to wishlist';
            toast("Removed from your wishlist.", "info");
          } else {
            const id = await window.TechNova.addToWishlist(session, course);
            b.dataset.saved = "true";
            b.dataset.wishlistId = id;
            b.innerHTML = '<i class="fa-solid fa-heart"></i> Saved to wishlist';
            toast("Added to your wishlist.", "success");
          }
        } catch (err) {
          toast(err?.message || "Couldn't update your wishlist — please try again.", "error");
        } finally {
          b.disabled = false;
        }
      },
    };
    acts[b.dataset.act]?.();
  });


  /* If this course is already in the signed-in student's wishlist,
     show the button as saved right away instead of always starting
     from "Add to wishlist". */
  (async () => {
    const session = window.TechNova?.getSession?.();
    const wishlistBtn = q("#wishlistBtn");
    if (!session || !wishlistBtn || !window.TechNova?.listWishlist) return;
    try {
      const items = await window.TechNova.listWishlist(session.uid);
      const saved = items.find((w) => String(w.courseId) === String(course.id));
      if (saved) {
        wishlistBtn.dataset.saved = "true";
        wishlistBtn.dataset.wishlistId = saved.id;
        wishlistBtn.innerHTML = '<i class="fa-solid fa-heart"></i> Saved to wishlist';
      }
    } catch (err) { /* not critical — button just stays in its default state */ }
  })();



  /* Entrance animation */
  window.addEventListener("load", () => {
    if (window.gsap && !reduceMotion()) {
      gsap.from(".reveal-js", { opacity: 0, y: 18, duration: .5, stagger: .08, ease: "power2.out", clearProps: "all", overwrite: "auto" });
    }
  });
}
}
