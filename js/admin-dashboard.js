

/* ==========================================================
   1. HELPERS
   ========================================================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const fmt = (n) => Number(n).toLocaleString();
const money = (n) => "$" + Number(n).toLocaleString();
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const avatar = (i) => `https://i.pravatar.cc/80?img=${i}`;

/* ==========================================================
   2. DUMMY DATA
   ========================================================== */
const DATA = {
  admin: {
    name: "Hamza Sheikh",
    email: "admin@technova.io",
    role: "Super Admin",
    experience: "9 years managing e-learning platforms",
    phone: "+92 300 1234567",
    photo: avatar(68),
  },

  /* --- 8 statistics cards --- */
  stats: [
    { label: "Total Students", value: 18420, icon: "fa-user-graduate", tone: "blue", trend: "+8.4%", dir: "up", spark: [30, 45, 38, 60, 55, 78, 90] },
    { label: "Total Instructors", value: 268, icon: "fa-chalkboard-user", tone: "gold", trend: "+3.1%", dir: "up", spark: [20, 28, 34, 30, 44, 52, 61] },
    { label: "Total Courses", value: 512, icon: "fa-book-open", tone: "blue", trend: "+12 new", dir: "up", spark: [25, 33, 40, 47, 44, 58, 70] },
    { label: "Published Courses", value: 438, icon: "fa-circle-check", tone: "green", trend: "+9 this week", dir: "up", spark: [22, 30, 36, 42, 50, 55, 66] },
    { label: "Active Users", value: 6240, icon: "fa-bolt", tone: "gold", trend: "+4.9%", dir: "up", spark: [40, 36, 52, 48, 62, 58, 74] },
    { label: "Certificates Issued", value: 3890, icon: "fa-award", tone: "green", trend: "+126", dir: "up", spark: [18, 26, 30, 41, 46, 54, 68] },
    { label: "Monthly Revenue", value: 284600, prefix: "$", icon: "fa-sack-dollar", tone: "blue", trend: "+18.2%", dir: "up", spark: [30, 40, 38, 55, 62, 70, 88] },
    { label: "Pending Reviews", value: 27, icon: "fa-hourglass-half", tone: "red", trend: "-4 vs last week", dir: "down", spark: [60, 54, 50, 44, 38, 32, 27] },
  ],

  /* --- Students --- */
  students: [
    { id: 1, name: "Ayesha Khan", email: "ayesha.khan@mail.com", courses: 5, progress: 82, status: "active", date: "2026-01-14", avatar: 47 },
    { id: 2, name: "Ali Hamza", email: "ali.hamza@mail.com", courses: 3, progress: 46, status: "active", date: "2026-02-02", avatar: 12 },
    { id: 3, name: "Sara Ahmed", email: "sara.ahmed@mail.com", courses: 7, progress: 91, status: "active", date: "2025-11-21", avatar: 32 },
    { id: 4, name: "Zainab Iqbal", email: "zainab.iqbal@mail.com", courses: 2, progress: 24, status: "inactive", date: "2026-03-08", avatar: 5 },
    { id: 5, name: "Hassan Tariq", email: "hassan.tariq@mail.com", courses: 4, progress: 58, status: "active", date: "2026-01-30", avatar: 22 },
    { id: 6, name: "Maria Yousaf", email: "maria.yousaf@mail.com", courses: 1, progress: 12, status: "suspended", date: "2026-04-11", avatar: 44 },
    { id: 7, name: "Umer Farooq", email: "umer.farooq@mail.com", courses: 6, progress: 77, status: "active", date: "2025-12-05", avatar: 60 },
    { id: 8, name: "Fatima Noor", email: "fatima.noor@mail.com", courses: 5, progress: 88, status: "active", date: "2026-02-18", avatar: 25 },
    { id: 9, name: "Bilal Anwar", email: "bilal.anwar@mail.com", courses: 2, progress: 35, status: "inactive", date: "2026-05-02", avatar: 51 },
    { id: 10, name: "Hira Shah", email: "hira.shah@mail.com", courses: 8, progress: 95, status: "active", date: "2025-10-19", avatar: 9 },
    { id: 11, name: "Danish Riaz", email: "danish.riaz@mail.com", courses: 3, progress: 51, status: "active", date: "2026-03-27", avatar: 33 },
    { id: 12, name: "Nimra Aslam", email: "nimra.aslam@mail.com", courses: 4, progress: 63, status: "active", date: "2026-04-29", avatar: 20 },
    { id: 13, name: "Owais Malik", email: "owais.malik@mail.com", courses: 1, progress: 8, status: "suspended", date: "2026-06-07", avatar: 15 },
    { id: 14, name: "Rida Javed", email: "rida.javed@mail.com", courses: 6, progress: 72, status: "active", date: "2026-01-09", avatar: 28 },
  ],

  /* --- Instructors --- */
  instructors: [
    { id: 1, name: "Prof. Bilal Raza", email: "bilal.raza@technova.io", courses: 12, students: 4820, rating: 4.9, status: "approved", avatar: 15 },
    { id: 2, name: "Dr. Sana Mir", email: "sana.mir@technova.io", courses: 8, students: 3120, rating: 4.8, status: "approved", avatar: 41 },
    { id: 3, name: "Kamran Ali", email: "kamran.ali@technova.io", courses: 5, students: 1480, rating: 4.6, status: "pending", avatar: 53 },
    { id: 4, name: "Iqra Naeem", email: "iqra.naeem@technova.io", courses: 9, students: 2740, rating: 4.7, status: "approved", avatar: 36 },
    { id: 5, name: "Usman Ghani", email: "usman.ghani@technova.io", courses: 3, students: 640, rating: 4.2, status: "pending", avatar: 58 },
    { id: 6, name: "Hina Baig", email: "hina.baig@technova.io", courses: 6, students: 1980, rating: 4.5, status: "suspended", avatar: 24 },
    { id: 7, name: "Talha Sheikh", email: "talha.sheikh@technova.io", courses: 11, students: 3960, rating: 4.9, status: "approved", avatar: 11 },
    { id: 8, name: "Areeba Zaidi", email: "areeba.zaidi@technova.io", courses: 2, students: 310, rating: 4.1, status: "pending", avatar: 30 },
  ],

  /* --- Courses --- */
  courses: [
    { id: 1, title: "React & Next.js — Production Grade", category: "Frontend", instructor: "Prof. Bilal Raza", students: 1284, rating: 4.9, status: "published", featured: true, price: 79, thumb: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop" },
    { id: 2, title: "Python for Data Science", category: "Data Science", instructor: "Dr. Sana Mir", students: 964, rating: 4.8, status: "published", featured: false, price: 69, thumb: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&auto=format&fit=crop" },
    { id: 3, title: "Advanced UI/UX Design Systems", category: "Design", instructor: "Iqra Naeem", students: 612, rating: 4.7, status: "published", featured: true, price: 59, thumb: "https://images.unsplash.com/photo-1561070791-2526d30994b8?w=800&auto=format&fit=crop" },
    { id: 4, title: "Machine Learning Foundations", category: "AI/ML", instructor: "Kamran Ali", students: 480, rating: 4.9, status: "draft", featured: false, price: 99, thumb: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop" },
    { id: 5, title: "Full-Stack MERN Bootcamp", category: "Full-Stack", instructor: "Talha Sheikh", students: 1520, rating: 4.8, status: "published", featured: true, price: 89, thumb: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop" },
    { id: 6, title: "Intro to Cloud & DevOps", category: "DevOps", instructor: "Usman Ghani", students: 320, rating: 4.6, status: "draft", featured: false, price: 69, thumb: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop" },
    { id: 7, title: "Cybersecurity Essentials", category: "Security", instructor: "Hina Baig", students: 740, rating: 4.5, status: "published", featured: false, price: 74, thumb: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop" },
    { id: 8, title: "Flutter Mobile Development", category: "Mobile", instructor: "Areeba Zaidi", students: 410, rating: 4.4, status: "published", featured: false, price: 64, thumb: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&auto=format&fit=crop" },
  ],

  /* --- Categories --- */
  categories: [
    { id: 1, name: "Frontend", icon: "fa-code", courses: 86 },
    { id: 2, name: "Data Science", icon: "fa-chart-simple", courses: 64 },
    { id: 3, name: "Design", icon: "fa-pen-nib", courses: 52 },
    { id: 4, name: "AI/ML", icon: "fa-brain", courses: 48 },
    { id: 5, name: "Full-Stack", icon: "fa-layer-group", courses: 71 },
    { id: 6, name: "DevOps", icon: "fa-server", courses: 33 },
    { id: 7, name: "Security", icon: "fa-shield-halved", courses: 29 },
    { id: 8, name: "Mobile", icon: "fa-mobile-screen", courses: 41 },
  ],

  /* --- Assignments --- */
  assignments: [
    { id: 1, name: "Build a Todo App with Hooks", course: "React & Next.js", instructor: "Prof. Bilal Raza", deadline: "2026-08-12", submissions: 84, status: "active" },
    { id: 2, name: "Pandas Data Cleaning Challenge", course: "Python for Data Science", instructor: "Dr. Sana Mir", deadline: "2026-08-15", submissions: 61, status: "active" },
    { id: 3, name: "Design a Mobile Wallet UI", course: "UI/UX Design Systems", instructor: "Iqra Naeem", deadline: "2026-07-20", submissions: 32, status: "closed" },
    { id: 4, name: "Deploy Full-Stack App", course: "MERN Bootcamp", instructor: "Talha Sheikh", deadline: "2026-08-25", submissions: 108, status: "active" },
    { id: 5, name: "Threat Modeling Report", course: "Cybersecurity Essentials", instructor: "Hina Baig", deadline: "2026-07-18", submissions: 45, status: "closed" },
    { id: 6, name: "CI/CD Pipeline Setup", course: "Cloud & DevOps", instructor: "Usman Ghani", deadline: "2026-09-02", submissions: 19, status: "active" },
  ],

  /* --- Quizzes --- */
  quizzes: [
    { id: 1, name: "React Hooks Mastery", course: "React & Next.js", questions: 15, attempts: 420, avg: 82 },
    { id: 2, name: "Python Basics", course: "Python for Data Science", questions: 20, attempts: 610, avg: 74 },
    { id: 3, name: "UI/UX Principles", course: "UI/UX Design Systems", questions: 12, attempts: 280, avg: 88 },
    { id: 4, name: "MERN Full-Stack", course: "MERN Bootcamp", questions: 25, attempts: 190, avg: 71 },
    { id: 5, name: "Security Fundamentals", course: "Cybersecurity Essentials", questions: 18, attempts: 240, avg: 79 },
    { id: 6, name: "Cloud Concepts", course: "Cloud & DevOps", questions: 14, attempts: 150, avg: 68 },
  ],

  /* --- Certificates --- */
  certificates: [
    { id: "TN-CERT-90211", student: "Ayesha Khan", course: "React & Next.js", date: "2026-06-21" },
    { id: "TN-CERT-90212", student: "Sara Ahmed", course: "MERN Bootcamp", date: "2026-06-24" },
    { id: "TN-CERT-90213", student: "Hira Shah", course: "Python for Data Science", date: "2026-07-01" },
    { id: "TN-CERT-90214", student: "Umer Farooq", course: "UI/UX Design Systems", date: "2026-07-05" },
    { id: "TN-CERT-90215", student: "Fatima Noor", course: "Cybersecurity Essentials", date: "2026-07-09" },
    { id: "TN-CERT-90216", student: "Rida Javed", course: "Flutter Mobile Development", date: "2026-07-14" },
    { id: "TN-CERT-90217", student: "Danish Riaz", course: "Cloud & DevOps", date: "2026-07-19" },
  ],

  /* --- Announcements --- */
  announcements: [
    { id: 1, title: "Summer Scholarship Program 2026", body: "Applications are now open for the TechNova summer scholarship. 200 fully-funded seats across all categories.", audience: "Students", date: "Jul 26, 2026", tone: "gold" },
    { id: 2, title: "New Instructor Payout Schedule", body: "Payouts will now be processed every 1st and 15th of the month. Update your billing details in Settings.", audience: "Instructors", date: "Jul 22, 2026", tone: "blue" },
    { id: 3, title: "Platform Maintenance Window", body: "TechNova will be briefly unavailable on Aug 3, 02:00–04:00 PKT for scheduled upgrades.", audience: "All Users", date: "Jul 18, 2026", tone: "gold" },
  ],

  /* --- Revenue --- */
  revenue: {
    today: 4820, monthly: 284600, total: 3182400, pending: 46200,
    transactions: [
      { id: "TXN-88121", user: "Ayesha Khan", course: "React & Next.js", amount: 79, date: "2026-07-28", status: "paid" },
      { id: "TXN-88122", user: "Ali Hamza", course: "Python for Data Science", amount: 69, date: "2026-07-28", status: "paid" },
      { id: "TXN-88123", user: "Sara Ahmed", course: "MERN Bootcamp", amount: 89, date: "2026-07-27", status: "pending" },
      { id: "TXN-88124", user: "Hira Shah", course: "UI/UX Design Systems", amount: 59, date: "2026-07-27", status: "paid" },
      { id: "TXN-88125", user: "Umer Farooq", course: "Cybersecurity Essentials", amount: 74, date: "2026-07-26", status: "failed" },
      { id: "TXN-88126", user: "Fatima Noor", course: "Machine Learning Foundations", amount: 99, date: "2026-07-26", status: "paid" },
      { id: "TXN-88127", user: "Nimra Aslam", course: "Flutter Mobile Development", amount: 64, date: "2026-07-25", status: "paid" },
      { id: "TXN-88128", user: "Danish Riaz", course: "Cloud & DevOps", amount: 69, date: "2026-07-25", status: "pending" },
      { id: "TXN-88129", user: "Rida Javed", course: "React & Next.js", amount: 79, date: "2026-07-24", status: "paid" },
      { id: "TXN-88130", user: "Bilal Anwar", course: "Python for Data Science", amount: 69, date: "2026-07-24", status: "paid" },
    ],
  },

  /* --- Activity timeline --- */
  activity: [
    { icon: "fa-user-plus", tone: "blue", text: "New student registered — Nimra Aslam", time: "4 minutes ago" },
    { icon: "fa-user-check", tone: "green", text: "Instructor approved — Iqra Naeem", time: "38 minutes ago" },
    { icon: "fa-book-open", tone: "gold", text: "Course published — Flutter Mobile Development", time: "2 hours ago" },
    { icon: "fa-award", tone: "green", text: "Certificate issued — TN-CERT-90217", time: "5 hours ago" },
    { icon: "fa-file-pen", tone: "blue", text: "Assignment submitted — Deploy Full-Stack App", time: "8 hours ago" },
    { icon: "fa-clipboard-check", tone: "gold", text: "Quiz completed — React Hooks Mastery (12 students)", time: "Yesterday" },
  ],

  /* --- Notifications --- */
  notifications: [
    { icon: "fa-user-plus", tone: "blue", text: "3 instructors awaiting approval", time: "10m ago" },
    { icon: "fa-triangle-exclamation", tone: "gold", text: "27 course reviews pending moderation", time: "1h ago" },
    { icon: "fa-sack-dollar", tone: "blue", text: "Monthly revenue crossed $280,000", time: "4h ago" },
    { icon: "fa-award", tone: "gold", text: "126 new certificates issued this week", time: "1d ago" },
  ],

  /* --- Chats --- */
  chats: [
    { id: 1, name: "Prof. Bilal Raza", avatar: 15, role: "Instructor", last: "Thanks for approving the course!", unread: 2, messages: [
      { from: "in", text: "Assalamualaikum, I submitted the new React course for review." },
      { from: "out", text: "Walaikum Assalam! Reviewing it today, looks great so far." },
      { from: "in", text: "Thanks for approving the course!" },
    ]},
    { id: 2, name: "Dr. Sana Mir", avatar: 41, role: "Instructor", last: "When is the next payout?", unread: 0, messages: [
      { from: "in", text: "When is the next payout?" },
      { from: "out", text: "1st of August, as per the new schedule." },
    ]},
    { id: 3, name: "Ayesha Khan", avatar: 47, role: "Student", last: "My certificate name is misspelled.", unread: 1, messages: [
      { from: "in", text: "My certificate name is misspelled." },
      { from: "out", text: "No problem — I'll reissue it for you right away." },
    ]},
    { id: 4, name: "Support Team", avatar: 7, role: "Internal", last: "Weekly report attached.", unread: 0, messages: [
      { from: "in", text: "Weekly report attached." },
      { from: "out", text: "Received, thanks team." },
    ]},
  ],
};

/* ==========================================================
   3. UI PRIMITIVES
   ========================================================== */

/* Application state */
const state = {
  view: "dashboard",
  charts: {},
  chartObserver: null,
  counterFrames: new WeakMap(),
  activeChat: 1,
  chatSearch: "",
  // Per-table UI state (search / sort / filter / page)
  tables: {},
};

/* ---- Toast ---- */

function toast(a, b, c, d) {
  const TYPES = ["info","success","warn","warning","error"];
  let title, msg, type, ms;
  if (TYPES.includes(b)) { title = a; msg = ""; type = b; ms = typeof c === "number" ? c : undefined; }
  else if (TYPES.includes(c)) { title = a; msg = b || ""; type = c; ms = typeof d === "number" ? d : undefined; }
  else { title = a; msg = typeof b === "string" ? b : ""; type = "info"; ms = typeof c === "number" ? c : undefined; }
  const wrap = $("#toastWrap");
  if (!wrap) return;
  const icons = { info: "fa-circle-info", success: "fa-circle-check", warn: "fa-triangle-exclamation", error: "fa-circle-xmark" };
  const t = document.createElement("div");
  t.className = `toast ${type}`;
  t.innerHTML = `<i class="fa-solid ${icons[type] || icons.info}"></i><span><b>${title}</b>${msg ? ` — ${msg}` : ""}</span>`;
  wrap.appendChild(t);
  setTimeout(() => t.classList.add("show"), 10);
  setTimeout(() => { t.classList.remove("show"); setTimeout(() => t.remove(), 300); }, ms || 3400);
}

/* ---- Modal ---- */
function openModal(html) {
  const m = $("#modal");
  const body = $("#modalBody");
  if (!m || !body) return;
  body.innerHTML = html;
  m.classList.add("open");
  m.setAttribute("aria-hidden", "false");
 
  if (window.gsap) gsap.fromTo(".modal-panel", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .35, ease: "power2.out", overwrite: "auto", clearProps: "opacity,transform" });
}
function closeModal() {
  const m = $("#modal");
  if (!m) return;
 
  if (m.contains(document.activeElement)) document.activeElement.blur();
  m.classList.remove("open");
  m.setAttribute("aria-hidden", "true");
}

document.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

/* ---- Confirmation dialog (reusable) ---- */
function confirmDialog(title, text, onYes, danger = true) {
  openModal(`
    <h2>${title}</h2>
    <p style="margin:10px 0">${text}</p>
    <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:16px">
      <button class="btn-ghost" data-close>Cancel</button>
      <button class="${danger ? "btn-danger" : "btn-primary"}" id="confirmYes">Confirm</button>
    </div>`);
  $("#confirmYes")?.addEventListener("click", () => { closeModal(); onYes(); });
}

/* ---- Animated counter ---- */
function animateCounter(node, target, prefix = "") {
  const previousFrame = state.counterFrames.get(node);
  if (previousFrame) cancelAnimationFrame(previousFrame);
  const dur = 1300, start = performance.now();
  const tick = (now) => {
    if (!node.isConnected) return;
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    node.textContent = prefix + Math.round(target * eased).toLocaleString();
    if (p < 1) state.counterFrames.set(node, requestAnimationFrame(tick));
    else state.counterFrames.delete(node);
  };
  state.counterFrames.set(node, requestAnimationFrame(tick));
}

/* ---- Ripple effect on buttons ---- */
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-primary, .btn-ghost, .btn-danger, .ic-btn");
  if (!btn) return;
  btn.classList.add("ripple");
  const r = document.createElement("span");
  r.className = "rp";
  const size = Math.max(btn.offsetWidth, btn.offsetHeight);
  const rect = btn.getBoundingClientRect();
  r.style.width = r.style.height = size + "px";
  r.style.left = e.clientX - rect.left - size / 2 + "px";
  r.style.top = e.clientY - rect.top - size / 2 + "px";
  btn.appendChild(r);
  setTimeout(() => r.remove(), 600);
});

/* ---- Mini sparkline markup ---- */
const sparkHTML = (arr) => `<div class="spark">${arr.map((v) => `<i style="height:${v}%"></i>`).join("")}</div>`;

/* ==========================================================
   4. REUSABLE TABLE MODULE
 
   ========================================================== */
const PAGE_SIZE = 6;

function tableState(key) {
  if (!state.tables[key]) state.tables[key] = { q: "", sort: null, dir: "asc", filter: "all", page: 1 };
  return state.tables[key];
}

/**
 * @param {object} cfg
 *  key        unique table id
 *  rows       array of records
 *  columns    [{ key, label, sortable, render(row) }]
 *  searchKeys fields included in the search
 *  filter     { key, label, options:[] } | null
 */
function renderTable(cfg) {
  const st = tableState(cfg.key);
  let rows = [...cfg.rows];

  // Search
  if (st.q) {
    const q = st.q.toLowerCase();
    rows = rows.filter((r) => cfg.searchKeys.some((k) => String(r[k]).toLowerCase().includes(q)));
  }
  // Filter
  if (cfg.filter && st.filter !== "all") rows = rows.filter((r) => String(r[cfg.filter.key]) === st.filter);
  // Sort
  if (st.sort) {
    rows.sort((a, b) => {
      const A = a[st.sort], B = b[st.sort];
      const cmp = typeof A === "number" && typeof B === "number" ? A - B : String(A).localeCompare(String(B));
      return st.dir === "asc" ? cmp : -cmp;
    });
  }
  // Paginate
  const pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  if (st.page > pages) st.page = pages;
  const from = (st.page - 1) * PAGE_SIZE;
  const pageRows = rows.slice(from, from + PAGE_SIZE);

  const head = cfg.columns.map((c) => c.sortable
    ? `<th class="sortable ${st.sort === c.key ? st.dir : ""}" data-sort="${c.key}" data-table="${cfg.key}">${c.label}<i class="fa-solid fa-sort"></i></th>`
    : `<th>${c.label}</th>`).join("");

  const body = pageRows.length
    ? pageRows.map((r) => `<tr>${cfg.columns.map((c) => `<td>${c.render(r)}</td>`).join("")}</tr>`).join("")
    : `<tr><td colspan="${cfg.columns.length}"><div class="empty"><i class="fa-regular fa-folder-open"></i>No matching records found.</div></td></tr>`;

  return `
    <div class="toolbar">
      <div class="tb-search">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" placeholder="${cfg.placeholder || "Search…"}" value="${esc(st.q)}" data-tsearch="${cfg.key}" />
      </div>
      ${cfg.filter ? `<select data-tfilter="${cfg.key}">
          <option value="all">${cfg.filter.label}: All</option>
          ${cfg.filter.options.map((o) => `<option value="${o}" ${st.filter === o ? "selected" : ""}>${o[0].toUpperCase() + o.slice(1)}</option>`).join("")}
        </select>` : ""}
      ${cfg.extra || ""}
    </div>

    <div class="table-wrap">
      <table class="data"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>
    </div>

    <div class="pager">
      <span class="pg-info">Showing ${rows.length ? from + 1 : 0}–${Math.min(from + PAGE_SIZE, rows.length)} of ${rows.length}</span>
      <div class="pg-btns">
        <button data-page="${cfg.key}:${st.page - 1}" ${st.page === 1 ? "disabled" : ""}><i class="fa-solid fa-chevron-left"></i></button>
        ${Array.from({ length: pages }, (_, i) => `<button class="${st.page === i + 1 ? "active" : ""}" data-page="${cfg.key}:${i + 1}">${i + 1}</button>`).join("")}
        <button data-page="${cfg.key}:${st.page + 1}" ${st.page === pages ? "disabled" : ""}><i class="fa-solid fa-chevron-right"></i></button>
      </div>
    </div>`;
}

/* Small shared partials */
const pill = (s) => `<span class="status-pill ${s}">${s}</span>`;
const progressBar = (p) => `<div style="display:flex;align-items:center;gap:8px"><div class="pb-mini"><span style="width:${p}%"></span></div><b style="font-size:12px">${p}%</b></div>`;
const sectionHead = (eyebrow, title, actions = "") => `
  <div class="section-head reveal">
    <div><span class="eyebrow-sm">${eyebrow}</span><h1>${title}</h1></div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">${actions}</div>
  </div>`;

/* ==========================================================
   5. VIEWS
   ========================================================== */

/* ----- Dashboard ----- */
function viewDashboard() {
  return `
  <div class="view">
    <!-- Welcome section -->
    <section class="admin-hero reveal">
      <div class="ah-shape s1"></div><div class="ah-shape s2"></div><div class="ah-shape s3"></div>
      <div class="ah-inner">
        <span class="eyebrow"><i class="fa-solid fa-shield-halved"></i> Platform Overview</span>
        <h1>Welcome back, <span class="gradient">Admin</span> 👋</h1>
        <p>Here is what happened on TechNova Academy today — 142 new signups, 18 course submissions and $4,820 in revenue.</p>
        <div class="ah-summary">
          <span><i class="fa-solid fa-user-plus"></i> 142 new students</span>
          <span><i class="fa-solid fa-book"></i> 18 submissions</span>
          <span><i class="fa-solid fa-sack-dollar"></i> $4,820 today</span>
        </div>
        <div class="ah-cta">
          <button class="btn-primary magnetic" data-action="new-announcement"><i class="fa-solid fa-bullhorn"></i> Create Announcement</button>
          <button class="btn-ghost" data-action="add-category"><i class="fa-solid fa-plus"></i> Add Category</button>
          <button class="btn-ghost" data-action="view-reports"><i class="fa-solid fa-file-arrow-down"></i> View Reports</button>
        </div>
      </div>
    </section>

    <!-- 8 statistics cards -->
    <section class="stats-grid-8">
      ${DATA.stats.map((s) => `
        <article class="a-stat reveal">
          <div class="as-top">
            <div class="as-icon ${s.tone}"><i class="fa-solid ${s.icon}"></i></div>
            ${sparkHTML(s.spark)}
          </div>
          <div class="as-body">
            <span class="as-label">${s.label}</span>
            <div class="as-value counter" data-count="${s.value}" data-prefix="${s.prefix || ""}">0</div>
            <span class="as-trend ${s.dir}"><i class="fa-solid fa-arrow-${s.dir}"></i> ${s.trend}</span>
          </div>
        </article>`).join("")}
    </section>

    <div class="grid-2col" style="margin-top:22px">
      <!-- Overview chart -->
      <section class="chart-box reveal">
        <div class="panel-head"><div><span class="eyebrow-sm">Last 7 months</span><h2>Platform Growth</h2></div>
          <button class="btn-ghost sm" data-view="analytics">Full analytics <i class="fa-solid fa-arrow-right"></i></button></div>
        <div class="chart-holder"><canvas id="chartOverview"></canvas></div>
      </section>

      <!-- Recent activity timeline -->
      <section class="chart-box reveal">
        <div class="panel-head"><div><span class="eyebrow-sm">Live</span><h2>Recent Activity</h2></div></div>
        <ul class="timeline">
          ${DATA.activity.map((a) => `
            <li><div class="tl-dot ${a.tone}"><i class="fa-solid ${a.icon}"></i></div>
            <div class="tl-body"><b>${a.text}</b><span>${a.time}</span></div></li>`).join("")}
        </ul>
      </section>
    </div>

    <!-- Latest students snapshot -->
    <section class="chart-box reveal" style="margin-top:22px">
      <div class="panel-head"><div><span class="eyebrow-sm">Newest</span><h2>Recent Registrations</h2></div>
        <button class="btn-ghost sm" data-view="students">Manage students</button></div>
      <div class="table-wrap">
        <table class="data"><thead><tr><th>Student</th><th>Courses</th><th>Progress</th><th>Status</th><th>Registered</th></tr></thead>
        <tbody>${DATA.students.slice(0, 5).map((s) => `
          <tr><td><div class="u-cell"><img src="${avatar(s.avatar)}" alt="${s.name}" /><div><b>${s.name}</b><span>${s.email}</span></div></div></td>
          <td>${s.courses}</td><td>${progressBar(s.progress)}</td><td>${pill(s.status)}</td><td>${s.date}</td></tr>`).join("")}
        </tbody></table>
      </div>
    </section>
  </div>`;
}

/* ----- Students ----- */
function viewStudents() {
  const table = renderTable({
    key: "students",
    rows: DATA.students,
    placeholder: "Search students by name or email…",
    searchKeys: ["name", "email"],
    filter: { key: "status", label: "Status", options: ["active", "inactive", "suspended"] },
    columns: [
      { key: "name", label: "Student", sortable: true, render: (r) => `<div class="u-cell"><img src="${avatar(r.avatar)}" alt="${r.name}" /><div><b>${r.name}</b><span>${r.email}</span></div></div>` },
      { key: "courses", label: "Courses", sortable: true, render: (r) => `<b>${r.courses}</b>` },
      { key: "progress", label: "Progress", sortable: true, render: (r) => progressBar(r.progress) },
      { key: "status", label: "Status", sortable: true, render: (r) => pill(r.status) },
      { key: "date", label: "Registered", sortable: true, render: (r) => r.date },
      { key: "actions", label: "Actions", render: (r) => `<div class="row-actions">
          <button class="ic-btn" title="View" data-action="view-student" data-id="${r.id}"><i class="fa-regular fa-eye"></i></button>
          <button class="ic-btn" title="Edit" data-action="edit-student" data-id="${r.id}"><i class="fa-solid fa-pen"></i></button>
          <button class="ic-btn warn" title="Suspend" data-action="suspend-student" data-id="${r.id}"><i class="fa-solid fa-ban"></i></button>
          <button class="ic-btn danger" title="Delete" data-action="delete-student" data-id="${r.id}"><i class="fa-solid fa-trash"></i></button>
        </div>` },
    ],
  });
  return `<div class="view">
    ${sectionHead("Manage", "Student Management", `<button class="btn-primary" data-action="export-students"><i class="fa-solid fa-file-arrow-down"></i> Export CSV</button>`)}
    <div class="reveal">${table}</div>
  </div>`;
}

/* ----- Instructors ----- */
function viewInstructors() {
  const table = renderTable({
    key: "instructors",
    rows: DATA.instructors,
    placeholder: "Search instructors…",
    searchKeys: ["name", "email"],
    filter: { key: "status", label: "Status", options: ["approved", "pending", "suspended"] },
    columns: [
      { key: "name", label: "Instructor", sortable: true, render: (r) => `<div class="u-cell"><img src="${avatar(r.avatar)}" alt="${r.name}" /><div><b>${r.name}</b><span>${r.email}</span></div></div>` },
      { key: "courses", label: "Courses", sortable: true, render: (r) => `<b>${r.courses}</b>` },
      { key: "students", label: "Students", sortable: true, render: (r) => fmt(r.students) },
      { key: "rating", label: "Rating", sortable: true, render: (r) => `<span style="color:var(--gold)"><i class="fa-solid fa-star"></i></span> ${r.rating}` },
      { key: "status", label: "Status", sortable: true, render: (r) => pill(r.status) },
      { key: "actions", label: "Actions", render: (r) => `<div class="row-actions">
          <button class="ic-btn" title="View profile" data-action="view-instructor" data-id="${r.id}"><i class="fa-regular fa-eye"></i></button>
          <button class="ic-btn" title="Approve" data-action="approve-instructor" data-id="${r.id}"><i class="fa-solid fa-check"></i></button>
          <button class="ic-btn danger" title="Reject" data-action="reject-instructor" data-id="${r.id}"><i class="fa-solid fa-xmark"></i></button>
          <button class="ic-btn warn" title="Suspend" data-action="suspend-instructor" data-id="${r.id}"><i class="fa-solid fa-ban"></i></button>
          <button class="ic-btn" title="Edit" data-action="edit-instructor" data-id="${r.id}"><i class="fa-solid fa-pen"></i></button>
        </div>` },
    ],
  });
  return `<div class="view">
    ${sectionHead("Manage", "Instructor Management", `<button class="btn-primary" data-action="invite-instructor"><i class="fa-solid fa-paper-plane"></i> Invite Instructor</button>`)}
    <div class="reveal">${table}</div>
  </div>`;
}

/* ----- Courses ----- */
function viewCourses() {
  const st = tableState("courses");
  let rows = DATA.courses.filter((c) => (!st.q || c.title.toLowerCase().includes(st.q.toLowerCase()) || c.instructor.toLowerCase().includes(st.q.toLowerCase())));
  if (st.filter !== "all") rows = rows.filter((c) => c.status === st.filter);

  return `<div class="view">
    ${sectionHead("Manage", "Course Management", `<button class="btn-primary" data-action="add-course"><i class="fa-solid fa-plus"></i> Add Course</button>`)}
    <div class="toolbar reveal">
      <div class="tb-search"><i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" placeholder="Search courses or instructors…" value="${esc(st.q)}" data-tsearch="courses" /></div>
      <select data-tfilter="courses">
        <option value="all">Status: All</option>
        <option value="published" ${st.filter === "published" ? "selected" : ""}>Published</option>
        <option value="draft" ${st.filter === "draft" ? "selected" : ""}>Draft</option>
      </select>
    </div>
    <div class="grid-cards">
      ${rows.length ? rows.map((c) => `
        <article class="icourse reveal">
          <div class="thumb"><img src="${c.thumb}" alt="${c.title}" loading="lazy" />
            <span class="status ${c.status}">${c.status}</span>
            ${c.featured ? `<span class="status published" style="left:auto;right:10px"><i class="fa-solid fa-star"></i> Featured</span>` : ""}
          </div>
          <div class="body">
            <span class="cat">${c.category}</span>
            <h3>${c.title}</h3>
            <div class="meta">
              <span><i class="fa-solid fa-chalkboard-user"></i> ${c.instructor}</span>
              <span><i class="fa-solid fa-users"></i> ${fmt(c.students)}</span>
              <span><i class="fa-solid fa-star"></i> ${c.rating}</span>
              <span><i class="fa-solid fa-tag"></i> ${money(c.price)}</span>
            </div>
            <div class="actions">
              <button class="btn-ghost sm" data-action="view-course" data-id="${c.id}"><i class="fa-regular fa-eye"></i> View</button>
              <button class="btn-ghost sm" data-action="edit-course" data-id="${c.id}"><i class="fa-solid fa-pen"></i> Edit</button>
              <button class="btn-ghost sm" data-action="feature-course" data-id="${c.id}"><i class="fa-solid fa-star"></i> ${c.featured ? "Unfeature" : "Feature"}</button>
              <button class="btn-primary sm" data-action="toggle-publish" data-id="${c.id}">${c.status === "published" ? "Unpublish" : "Publish"}</button>
              <button class="btn-danger" data-action="delete-course" data-id="${c.id}"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
        </article>`).join("")
      : `<div class="empty"><i class="fa-regular fa-folder-open"></i>No courses match your search.</div>`}
    </div>
  </div>`;
}

/* ----- Categories ----- */
function viewCategories() {
  return `<div class="view">
    ${sectionHead("Manage", "Category Management", `<button class="btn-primary" data-action="add-category"><i class="fa-solid fa-plus"></i> Add Category</button>`)}
    <div class="cat-grid">
      ${DATA.categories.map((c) => `
        <article class="cat-card reveal">
          <div class="cc-icon"><i class="fa-solid ${c.icon}"></i></div>
          <h3>${c.name}</h3>
          <small>${c.courses} courses</small>
          <div class="cc-actions">
            <button class="btn-ghost sm" data-action="edit-category" data-id="${c.id}"><i class="fa-solid fa-pen"></i> Edit</button>
            <button class="btn-danger" data-action="delete-category" data-id="${c.id}"><i class="fa-solid fa-trash"></i></button>
          </div>
        </article>`).join("")}
    </div>
  </div>`;
}

/* ----- Assignments ----- */
function viewAssignments() {
  const table = renderTable({
    key: "assignments",
    rows: DATA.assignments,
    placeholder: "Search assignments…",
    searchKeys: ["name", "course", "instructor"],
    filter: { key: "status", label: "Status", options: ["active", "closed"] },
    columns: [
      { key: "name", label: "Assignment", sortable: true, render: (r) => `<b>${r.name}</b>` },
      { key: "course", label: "Course", sortable: true, render: (r) => r.course },
      { key: "instructor", label: "Instructor", sortable: true, render: (r) => r.instructor },
      { key: "deadline", label: "Deadline", sortable: true, render: (r) => r.deadline },
      { key: "submissions", label: "Submissions", sortable: true, render: (r) => `<b>${r.submissions}</b>` },
      { key: "status", label: "Status", sortable: true, render: (r) => pill(r.status === "active" ? "active" : "inactive") },
      { key: "actions", label: "Actions", render: (r) => `<div class="row-actions">
          <button class="ic-btn" title="View" data-action="view-assignment" data-id="${r.id}"><i class="fa-regular fa-eye"></i></button>
          <button class="ic-btn" title="Edit" data-action="edit-assignment" data-id="${r.id}"><i class="fa-solid fa-pen"></i></button>
          <button class="ic-btn danger" title="Delete" data-action="delete-assignment" data-id="${r.id}"><i class="fa-solid fa-trash"></i></button>
        </div>` },
    ],
  });
  return `<div class="view">
    ${sectionHead("Manage", "Assignment Management", `<button class="btn-primary" data-action="new-assignment"><i class="fa-solid fa-plus"></i> New Assignment</button>`)}
    <div class="reveal">${table}</div>
  </div>`;
}

/* ----- Quizzes ----- */
function viewQuizzes() {
  return `<div class="view">
    ${sectionHead("Manage", "Quiz Management", `<button class="btn-primary" data-action="new-quiz"><i class="fa-solid fa-plus"></i> New Quiz</button>`)}
    <div class="grid-cards">
      ${DATA.quizzes.map((q) => `
        <article class="mini-card reveal">
          <div class="mc-top">
            <div class="mc-icon gold"><i class="fa-solid fa-clipboard-question"></i></div>
            <span class="status-pill active">${q.avg}% avg</span>
          </div>
          <h3>${q.name}</h3>
          <div class="mc-meta">
            <span><i class="fa-solid fa-book"></i> ${q.course}</span>
            <span><i class="fa-solid fa-list-ol"></i> ${q.questions} questions</span>
            <span><i class="fa-solid fa-users"></i> ${fmt(q.attempts)} attempts</span>
          </div>
          <div class="mc-actions">
            <button class="btn-ghost sm" data-action="preview-quiz" data-id="${q.id}"><i class="fa-regular fa-eye"></i> Preview</button>
            <button class="btn-ghost sm" data-action="edit-quiz" data-id="${q.id}"><i class="fa-solid fa-pen"></i> Edit</button>
            <button class="btn-primary sm" data-action="quiz-results" data-id="${q.id}">Results</button>
            <button class="btn-danger" data-action="delete-quiz" data-id="${q.id}"><i class="fa-solid fa-trash"></i></button>
          </div>
        </article>`).join("")}
    </div>
  </div>`;
}

/* ----- Certificates ----- */
function viewCertificates() {
  const table = renderTable({
    key: "certificates",
    rows: DATA.certificates,
    placeholder: "Search by student, course or certificate ID…",
    searchKeys: ["student", "course", "id"],
    filter: null,
    columns: [
      { key: "student", label: "Student", sortable: true, render: (r) => `<b>${r.student}</b>` },
      { key: "course", label: "Course", sortable: true, render: (r) => r.course },
      { key: "date", label: "Completion Date", sortable: true, render: (r) => r.date },
      { key: "id", label: "Certificate ID", sortable: true, render: (r) => `<code style="font-size:12px">${r.id}</code>` },
      { key: "actions", label: "Actions", render: (r) => `<div class="row-actions">
          <button class="ic-btn" title="View" data-action="view-certificate" data-id="${r.id}"><i class="fa-regular fa-eye"></i></button>
          <button class="ic-btn" title="Download" data-action="download-certificate" data-id="${r.id}"><i class="fa-solid fa-download"></i></button>
          <button class="ic-btn warn" title="Reissue" data-action="reissue-certificate" data-id="${r.id}"><i class="fa-solid fa-rotate"></i></button>
        </div>` },
    ],
  });
  return `<div class="view">
    ${sectionHead("Manage", "Certificate Management", `<button class="btn-primary" data-action="bulk-certificates"><i class="fa-solid fa-file-zipper"></i> Bulk Download</button>`)}
    <div class="reveal">${table}</div>
  </div>`;
}

/* ----- Announcements ----- */
function viewAnnouncements() {
  return `<div class="view">
    ${sectionHead("Engage", "Announcements")}
    <div class="form-panel reveal">
      <div class="field" style="margin-bottom:14px">
        <label>Title</label>
        <input type="text" id="annTitle" placeholder="e.g. New scholarship program" />
      </div>
      <div class="field" style="margin-bottom:14px">
        <label>Description</label>
        <textarea id="annBody" placeholder="Write the announcement details…"></textarea>
      </div>
      <div class="field" style="margin-bottom:14px">
        <label>Target Audience</label>
        <div class="audience-row">
          <label><input type="radio" name="aud" value="Students" checked /><span>Students</span></label>
          <label><input type="radio" name="aud" value="Instructors" /><span>Instructors</span></label>
          <label><input type="radio" name="aud" value="All Users" /><span>All Users</span></label>
        </div>
      </div>
      <div class="step-nav">
        <button class="btn-ghost" data-action="preview-announcement"><i class="fa-regular fa-eye"></i> Preview</button>
        <div style="display:flex;gap:8px">
          <button class="btn-ghost" data-action="draft-announcement"><i class="fa-regular fa-floppy-disk"></i> Save Draft</button>
          <button class="btn-primary" data-action="publish-announcement"><i class="fa-solid fa-bullhorn"></i> Publish</button>
        </div>
      </div>
    </div>

    <div class="ann-grid">
      ${DATA.announcements.map((a) => `
        <article class="ann-card reveal ${a.tone}">
          <h3>${a.title}</h3>
          <p>${a.body}</p>
          <div class="an-meta">
            <span><i class="fa-solid fa-users"></i> ${a.audience}</span>
            <span><i class="fa-regular fa-calendar"></i> ${a.date}</span>
          </div>
          <div style="display:flex;gap:6px;margin-top:6px">
            <button class="btn-ghost sm" data-action="edit-announcement" data-id="${a.id}"><i class="fa-solid fa-pen"></i> Edit</button>
            <button class="btn-danger" data-action="delete-announcement" data-id="${a.id}"><i class="fa-solid fa-trash"></i></button>
          </div>
        </article>`).join("")}
    </div>
  </div>`;
}

/* ----- Messages ----- */
function viewMessages() {
  const chats = DATA.chats.filter((c) => c.name.toLowerCase().includes(state.chatSearch.toLowerCase()));
  const active = DATA.chats.find((c) => c.id === state.activeChat) || DATA.chats[0];
  return `<div class="view">
    ${sectionHead("Engage", "Messages")}
    <div class="chat-shell reveal">
      <div class="chat-list">
        <div style="padding:12px;border-bottom:1px solid var(--line)">
          <div class="tb-search" style="position:relative">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" id="chatSearch" placeholder="Search conversations…" value="${esc(state.chatSearch)}" />
          </div>
        </div>
        <div style="overflow-y:auto;flex:1">
          ${chats.length ? chats.map((c) => `
            <div class="cl-item ${c.id === active.id ? "active" : ""}" data-chat="${c.id}">
              <img src="${avatar(c.avatar)}" alt="${c.name}" />
              <div style="min-width:0;flex:1"><b>${c.name}</b><span>${c.last}</span></div>
              ${c.unread ? `<em class="sb-badge">${c.unread}</em>` : ""}
            </div>`).join("") : `<div class="empty"><i class="fa-regular fa-comment"></i>No conversations</div>`}
        </div>
      </div>
      <div class="chat-panel">
        <div class="cp-head">
          <img src="${avatar(active.avatar)}" alt="${active.name}" />
          <div><b>${active.name}</b><span style="font-size:11px;color:var(--muted);display:block">${active.role} · online</span></div>
        </div>
        <div class="cp-body" id="chatBody">
          ${active.messages.map((m) => `<div class="msg ${m.from}">${m.text}</div>`).join("")}
        </div>
        <form class="cp-input" id="chatForm">
          <input type="text" id="chatInput" placeholder="Type a message…" autocomplete="off" />
          <button class="btn-primary" type="submit"><i class="fa-solid fa-paper-plane"></i></button>
        </form>
      </div>
    </div>
  </div>`;
}

/* ----- Analytics ----- */
function viewAnalytics() {
  const box = (id, eyebrow, title) => `
    <section class="chart-box reveal">
      <div class="panel-head"><div><span class="eyebrow-sm">${eyebrow}</span><h2>${title}</h2></div></div>
      <div class="chart-holder"><canvas id="${id}"></canvas></div>
    </section>`;
  return `<div class="view">
    ${sectionHead("Insights", "Platform Analytics", `<button class="btn-primary" data-action="view-reports"><i class="fa-solid fa-file-arrow-down"></i> Export Report</button>`)}
    <div class="chart-grid">
      ${box("chartStudents", "Monthly", "Student Growth")}
      ${box("chartInstructors", "Monthly", "Instructor Growth")}
      ${box("chartRevenue", "Monthly", "Revenue")}
      ${box("chartEnrollments", "Per course", "Course Enrollments")}
      ${box("chartCompletion", "Percentage", "Course Completion")}
      ${box("chartCategories", "Share", "Top Categories")}
      ${box("chartVisitors", "This week", "Daily Visitors")}
      ${box("chartActivity", "8 weeks", "Monthly Activity")}
    </div>
  </div>`;
}

/* ----- Revenue ----- */
function viewRevenue() {
  const r = DATA.revenue;
  const cards = [
    { label: "Today's Revenue", value: r.today, icon: "fa-calendar-day", tone: "blue" },
    { label: "Monthly Revenue", value: r.monthly, icon: "fa-chart-line", tone: "gold" },
    { label: "Total Revenue", value: r.total, icon: "fa-sack-dollar", tone: "green" },
    { label: "Pending Payments", value: r.pending, icon: "fa-hourglass-half", tone: "red" },
  ];
  const table = renderTable({
    key: "transactions",
    rows: r.transactions,
    placeholder: "Search transactions…",
    searchKeys: ["id", "user", "course"],
    filter: { key: "status", label: "Status", options: ["paid", "pending", "failed"] },
    columns: [
      { key: "id", label: "Transaction", sortable: true, render: (x) => `<code style="font-size:12px">${x.id}</code>` },
      { key: "user", label: "User", sortable: true, render: (x) => `<b>${x.user}</b>` },
      { key: "course", label: "Course", sortable: true, render: (x) => x.course },
      { key: "amount", label: "Amount", sortable: true, render: (x) => money(x.amount) },
      { key: "date", label: "Date", sortable: true, render: (x) => x.date },
      { key: "status", label: "Status", sortable: true, render: (x) => pill(x.status) },
      { key: "actions", label: "Actions", render: (x) => `<div class="row-actions">
          <button class="ic-btn" title="Invoice" data-action="view-invoice" data-id="${x.id}"><i class="fa-regular fa-file-lines"></i></button>
          <button class="ic-btn" title="Download" data-action="download-invoice" data-id="${x.id}"><i class="fa-solid fa-download"></i></button>
        </div>` },
    ],
  });
  return `<div class="view">
    ${sectionHead("Finance", "Revenue", `<button class="btn-primary" data-action="payout-run"><i class="fa-solid fa-money-bill-transfer"></i> Run Payout</button>`)}
    <div class="rev-cards">
      ${cards.map((c) => `
        <article class="a-stat reveal">
          <div class="as-top"><div class="as-icon ${c.tone}"><i class="fa-solid ${c.icon}"></i></div></div>
          <div class="as-body">
            <span class="as-label">${c.label}</span>
            <div class="as-value counter" data-count="${c.value}" data-prefix="$">0</div>
          </div>
        </article>`).join("")}
    </div>
    <section class="chart-box reveal" style="margin-top:22px">
      <div class="panel-head"><div><span class="eyebrow-sm">Last 7 months</span><h2>Revenue Trend</h2></div></div>
      <div class="chart-holder"><canvas id="chartRevTrend"></canvas></div>
    </section>
    <h2 style="margin:24px 0 12px">Recent Transactions</h2>
    <div class="reveal">${table}</div>
  </div>`;
}

/* ----- Settings ----- */
function viewSettings() {
  return `<div class="view">
    ${sectionHead("Account", "Platform Settings")}
    <div class="form-panel reveal">
      <div class="form-row">
        <div class="field"><label>Platform Name</label><input type="text" value="TechNova Academy" /></div>
        <div class="field"><label>Support Email</label><input type="email" value="support@technova.io" /></div>
      </div>
      <div class="form-row">
        <div class="field"><label>Phone</label><input type="tel" value="+92 300 1234567" /></div>
        <div class="field"><label>Theme Color</label><input type="color" value="#FFAA00" /></div>
      </div>
      <div class="field" style="margin-bottom:14px">
        <label>Platform Logo (UI only)</label>
        <div class="upload-box" data-action="upload-logo">
          <i class="fa-solid fa-cloud-arrow-up"></i>
          <div>Click to upload a logo</div>
          <small>PNG or SVG, max 2MB</small>
        </div>
      </div>
      <div class="form-row">
        <div class="field"><label>Facebook</label><input type="url" value="https://facebook.com/technova" /></div>
        <div class="field"><label>LinkedIn</label><input type="url" value="https://linkedin.com/company/technova" /></div>
      </div>
      <div class="form-row">
        <div class="field"><label>Twitter / X</label><input type="url" value="https://x.com/technova" /></div>
        <div class="field"><label>YouTube</label><input type="url" value="https://youtube.com/@technova" /></div>
      </div>
      <div class="field" style="margin-bottom:14px">
        <label>Footer Text</label>
        <input type="text" value="© 2026 TechNova Academy. All rights reserved." />
      </div>
      <div class="step-nav">
        <button class="btn-ghost" data-action="reset-settings"><i class="fa-solid fa-rotate-left"></i> Reset</button>
        <button class="btn-primary" data-action="save-settings"><i class="fa-solid fa-check"></i> Save Changes</button>
      </div>
    </div>
  </div>`;
}

/* ----- Profile ----- */
function viewProfile() {
  const a = DATA.admin;
  return `<div class="view">
    ${sectionHead("Account", "My Profile")}
    <div class="profile-shell">
      <div class="p-card reveal">
        <img class="avatar" src="${a.photo}" alt="${a.name}" />
        <h2>${a.name}</h2>
        <span class="role">${a.role}</span>
        <div class="p-stats">
          <div><b>18.4k</b><span>Students</span></div>
          <div><b>268</b><span>Instructors</span></div>
          <div><b>512</b><span>Courses</span></div>
        </div>
        <div style="margin-top:16px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
          <button class="btn-primary" data-action="edit-profile"><i class="fa-solid fa-pen"></i> Edit Profile</button>
          <button class="btn-ghost" data-action="change-photo">Change Photo</button>
        </div>
      </div>
      <div class="p-info">
        <div class="p-block reveal">
          <h3>Contact</h3>
          <p><i class="fa-regular fa-envelope"></i> ${a.email}</p>
          <p style="margin-top:6px"><i class="fa-solid fa-phone"></i> ${a.phone}</p>
        </div>
        <div class="p-block reveal">
          <h3>Role & Experience</h3>
          <p>${a.role} — ${a.experience}. Oversees course quality, instructor onboarding, payouts and platform analytics.</p>
        </div>
        <div class="p-block reveal">
          <h3>Permissions</h3>
          <div class="skill-chips">
            <span>Manage Users</span><span>Approve Instructors</span><span>Publish Courses</span>
            <span>Issue Certificates</span><span>View Revenue</span><span>Platform Settings</span>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

/* ==========================================================
   5b. APPROVALS (real Firebase data — pending signups + courses)
   ========================================================== */
function viewApprovals() {
  return `
  <div class="view">
    <div class="section-head">
      <div><span class="eyebrow-sm">Firebase</span><h1>Approvals</h1></div>
    </div>
    <div id="approvalsRoot">
      <div class="reveal" style="padding:40px;text-align:center;color:var(--muted)">
        <i class="fa-solid fa-circle-notch fa-spin"></i> Loading pending approvals…
      </div>
    </div>
  </div>`;
}

function pendingUserRow(u) {
  return `
    <div class="reveal" style="display:flex;align-items:center;gap:14px;padding:14px 0;border-bottom:1px solid var(--border,rgba(125,125,125,.15))">
      <div style="flex:1;min-width:0">
        <b>${esc(u.name || "Unnamed")}</b>
        <span class="status-pill pending" style="margin-left:8px">${esc(u.role)}</span>
        <div style="color:var(--muted);font-size:13px">${esc(u.email || "")}</div>
      </div>
      <button class="btn-primary sm" data-action="approve-pending-user" data-uid="${u.id}"><i class="fa-solid fa-check"></i> Approve</button>
      <button class="btn-danger sm" data-action="reject-pending-user" data-uid="${u.id}"><i class="fa-solid fa-xmark"></i> Reject</button>
    </div>`;
}

function pendingCourseRow(c) {
  return `
    <div class="reveal" style="display:flex;align-items:center;gap:14px;padding:14px 0;border-bottom:1px solid var(--border,rgba(125,125,125,.15))">
      <div style="flex:1;min-width:0">
        <b>${esc(c.title || "Untitled course")}</b>
        <span class="status-pill pending" style="margin-left:8px">${esc(c.category || "")}</span>
        <div style="color:var(--muted);font-size:13px">By ${esc(c.instructorName || "Unknown instructor")}</div>
      </div>
      <button class="btn-primary sm" data-action="approve-pending-course" data-cid="${c.id}"><i class="fa-solid fa-check"></i> Approve</button>
      <button class="btn-danger sm" data-action="reject-pending-course" data-cid="${c.id}"><i class="fa-solid fa-xmark"></i> Reject</button>
    </div>`;
}

async function loadApprovals() {
  const root = $("#approvalsRoot");
  if (!root) return;
  if (!window.TechNova) {
    root.innerHTML = `<p style="color:var(--danger,#e5484d)">Couldn't load approvals: the Firebase helper (js/firebase.js) hasn't loaded on this page. Reload the page, or check the browser console for errors.</p>`;
    return;
  }
  if (window.TechNova.configured === false) {
    root.innerHTML = `<p style="color:var(--danger,#e5484d)">Firebase isn't connected yet, so there's nothing to approve. Paste your project config into <code>js/firebase.js</code> (see README-FIREBASE.md), then reload this page.</p>`;
    return;
  }
  try {
    const [users, courses] = await Promise.all([
      window.TechNova.listPendingUsers(),
      window.TechNova.listPendingCourses(),
    ]);
    root.innerHTML = `
      <div class="reveal" style="margin-bottom:28px">
        <h3 style="margin-bottom:10px">Pending signups (${users.length})</h3>
        ${users.length ? users.map(pendingUserRow).join("") : `<p style="color:var(--muted)">No accounts waiting for approval.</p>`}
      </div>
      <div class="reveal">
        <h3 style="margin-bottom:10px">Pending courses (${courses.length})</h3>
        ${courses.length ? courses.map(pendingCourseRow).join("") : `<p style="color:var(--muted)">No courses waiting for approval.</p>`}
      </div>`;
    // These .reveal blocks were injected *after* render()'s initial
    // ".reveal -> .in" pass already ran, so without this they'd sit
    // at opacity:0 forever (data loads fine, buttons work, but
    // nothing is visible).
    root.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
  } catch (err) {
    root.innerHTML = `<p style="color:var(--danger,#e5484d)">Couldn't load approvals: ${esc(err.message || String(err))}. Check your Firebase config in js/firebase.js.</p>`;
  }
}

/* ==========================================================
   6. ROUTER + ANIMATIONS
   ========================================================== */
const VIEWS = {
  dashboard: viewDashboard, students: viewStudents, instructors: viewInstructors,
  courses: viewCourses, categories: viewCategories, assignments: viewAssignments,
  quizzes: viewQuizzes, certificates: viewCertificates, announcements: viewAnnouncements,
  messages: viewMessages, analytics: viewAnalytics, revenue: viewRevenue,
  settings: viewSettings, profile: viewProfile, approvals: viewApprovals,
};

function render(view = state.view, options = {}) {
  const previousView = state.view;
  const shouldAnimate = options.animate !== false;
  const shouldPreserveScroll = options.preserveScroll === true || view === previousView;
  state.view = VIEWS[view] ? view : "dashboard";
  destroyCharts();
  const root = $("#viewRoot");
  if (!root) return;
  root.innerHTML = VIEWS[state.view]();
  if (state.view === "approvals") loadApprovals();

  // Active sidebar item
  $$(".sb-item").forEach((i) => i.classList.toggle("active", i.dataset.view === state.view));

  // Counters
  $$(".counter").forEach((c) => animateCounter(c, +c.dataset.count, c.dataset.prefix || ""));

  // Reveal: add .in so the shared CSS base state (opacity:0) is cleared
  $$(".reveal").forEach((el) => el.classList.add("in"));

  if (window.gsap && shouldAnimate && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const viewNode = $(".view", root);
    const reveals = $$(".reveal", root).filter((el) => !el.classList.contains("a-stat"));
    const stats = $$(".a-stat", root);
    const rows = $$('table.data tbody tr', root);
    if (viewNode) gsap.fromTo(viewNode, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .4, ease: "power2.out", overwrite: "auto", clearProps: "opacity,transform" });
    if (reveals.length) gsap.fromTo(reveals, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: .55, stagger: .04, ease: "power2.out", overwrite: "auto", clearProps: "opacity,transform" });
    if (stats.length) gsap.fromTo(stats, { opacity: 0, scale: .94 }, { opacity: 1, scale: 1, duration: .45, stagger: .04, ease: "back.out(1.6)", overwrite: "auto", clearProps: "opacity,transform" });
    if (rows.length) gsap.fromTo(rows, { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: .35, stagger: .025, ease: "power2.out", overwrite: "auto", clearProps: "opacity,transform" });
    const shapes = $$(".ah-shape", root);
    if (shapes.length) {
      gsap.to($(".ah-shape.s1", root), { y: 18, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to($(".ah-shape.s2", root), { y: -16, duration: 2.4, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to($(".ah-shape.s3", root), { x: -14, duration: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }
  }

  // Charts (animate when scrolled into view)
  requestAnimationFrame(() => initChartsFor(state.view));

  // Close mobile sidebar and scroll up
  $("#sidebar")?.classList.remove("open");
  $("#scrim")?.classList.remove("on");
  if (!shouldPreserveScroll) window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ==========================================================
   7. CHARTS (Chart.js) — created lazily when scrolled into view
   ========================================================== */
function destroyCharts() {
  state.chartObserver?.disconnect();
  state.chartObserver = null;
  Object.values(state.charts).forEach((c) => c?.destroy?.());
  state.charts = {};
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
const baseOpts = () => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: { x: { grid: { display: false } }, y: { grid: { color: "rgba(125,125,125,.12)" }, beginAtZero: true } },
  animation: { duration: 1400, easing: "easeOutQuart" },
});

/* Chart definitions keyed by canvas id */
const CHART_DEFS = {
  chartOverview: () => ({ type: "line", data: { labels: MONTHS, datasets: [
      { label: "Students", data: [8200, 9800, 11400, 13100, 15000, 16800, 18420], borderColor: "#2F80ED", backgroundColor: "rgba(47,128,237,.15)", fill: true, tension: .4, pointRadius: 4 },
      { label: "Courses", data: [280, 320, 360, 400, 440, 480, 512], borderColor: "#FFAA00", backgroundColor: "rgba(255,170,0,.15)", fill: true, tension: .4, pointRadius: 4 }] },
    options: { ...baseOpts(), plugins: { legend: { display: true, position: "top" } } } }),
  chartStudents: () => ({ type: "line", data: { labels: MONTHS, datasets: [{ data: [8200, 9800, 11400, 13100, 15000, 16800, 18420], borderColor: "#2F80ED", backgroundColor: "rgba(47,128,237,.18)", fill: true, tension: .4 }] }, options: baseOpts() }),
  chartInstructors: () => ({ type: "bar", data: { labels: MONTHS, datasets: [{ data: [140, 168, 190, 212, 234, 250, 268], backgroundColor: "#FFAA00", borderRadius: 8 }] }, options: baseOpts() }),
  chartRevenue: () => ({ type: "bar", data: { labels: MONTHS, datasets: [{ data: [124000, 148000, 172000, 198000, 226000, 258000, 284600], backgroundColor: "#2F80ED", borderRadius: 8 }] }, options: baseOpts() }),
  chartRevTrend: () => ({ type: "line", data: { labels: MONTHS, datasets: [{ data: [124000, 148000, 172000, 198000, 226000, 258000, 284600], borderColor: "#FFAA00", backgroundColor: "rgba(255,170,0,.18)", fill: true, tension: .4, pointRadius: 4 }] }, options: baseOpts() }),
  chartEnrollments: () => ({ type: "bar", data: { labels: ["React", "Python", "MERN", "UI/UX", "ML", "Security"], datasets: [{ data: [1284, 964, 1520, 612, 480, 740], backgroundColor: "#16A34A", borderRadius: 8 }] }, options: baseOpts() }),
  chartCompletion: () => ({ type: "bar", data: { labels: ["React", "Python", "MERN", "UI/UX", "ML", "DevOps"], datasets: [{ data: [78, 64, 71, 82, 55, 42], backgroundColor: "#2F80ED", borderRadius: 8 }] }, options: { ...baseOpts(), indexAxis: "y" } }),
  chartCategories: () => ({ type: "doughnut", data: { labels: ["Frontend", "Data Science", "Design", "AI/ML", "Full-Stack"], datasets: [{ data: [86, 64, 52, 48, 71], backgroundColor: ["#2F80ED", "#FFAA00", "#16A34A", "#EF4444", "#8B5CF6"], borderWidth: 0 }] },
    options: { responsive: true, maintainAspectRatio: false, cutout: "60%", plugins: { legend: { position: "bottom", labels: { boxWidth: 12 } } }, animation: { duration: 1400 } } }),
  chartVisitors: () => ({ type: "line", data: { labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], datasets: [{ data: [3200, 4100, 3800, 4600, 5200, 4400, 3900], borderColor: "#8B5CF6", backgroundColor: "rgba(139,92,246,.16)", fill: true, tension: .4 }] }, options: baseOpts() }),
  chartActivity: () => ({ type: "line", data: { labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"], datasets: [
      { label: "Lessons", data: [240, 320, 280, 410, 380, 520, 470, 600], borderColor: "#FFAA00", backgroundColor: "rgba(255,170,0,.15)", fill: true, tension: .4 },
      { label: "Quizzes", data: [80, 120, 100, 140, 110, 180, 150, 220], borderColor: "#2F80ED", backgroundColor: "rgba(47,128,237,.12)", fill: true, tension: .4 }] },
    options: { ...baseOpts(), plugins: { legend: { display: true, position: "top" } } } }),
};

/* Create charts only when the canvas scrolls into view (IntersectionObserver) */
function initChartsFor() {
  if (!window.Chart) return;
  const canvases = $$("canvas").filter((c) => CHART_DEFS[c.id]);
  if (!canvases.length) return;

  const build = (canvas) => {
    if (state.charts[canvas.id]) return;
    state.charts[canvas.id] = new Chart(canvas, CHART_DEFS[canvas.id]());
  };

  if (!("IntersectionObserver" in window)) { canvases.forEach(build); return; }
  state.chartObserver?.disconnect();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { build(e.target); io.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -60px 0px", threshold: .15 });
  state.chartObserver = io;
  canvases.forEach((c) => io.observe(c));
}

/* ==========================================================
   8. EVENT DELEGATION — every button does something
   ========================================================== */

/* ---- Navigation (sidebar / dropdown links) ---- */
document.addEventListener("click", (e) => {
  const nav = e.target.closest("[data-view]");
  if (!nav) return;
  e.preventDefault();
  $("#profileDropdown")?.classList.remove("open");
  render(nav.dataset.view);
});

/* ---- Table interactions: search, filter, sort, paginate ---- */
document.addEventListener("input", (e) => {
  const s = e.target.dataset.tsearch;
  if (s) { const st = tableState(s); st.q = e.target.value; st.page = 1; rerenderPreservingFocus(e.target); }
  if (e.target.id === "chatSearch") { state.chatSearch = e.target.value; rerenderPreservingFocus(e.target); }
});
document.addEventListener("change", (e) => {
  const f = e.target.dataset.tfilter;
  if (f) { const st = tableState(f); st.filter = e.target.value; st.page = 1; render(); }
});
document.addEventListener("click", (e) => {
  const th = e.target.closest("th.sortable");
  if (th) {
    const st = tableState(th.dataset.table);
    if (st.sort === th.dataset.sort) st.dir = st.dir === "asc" ? "desc" : "asc";
    else { st.sort = th.dataset.sort; st.dir = "asc"; }
    render();
    return;
  }
  const pg = e.target.closest("[data-page]");
  if (pg) {
    const [key, page] = pg.dataset.page.split(":");
    tableState(key).page = Math.max(1, +page);
    render();
  }
});

/* Re-render but keep the caret inside the input the user is typing in */
function rerenderPreservingFocus(input) {
  const id = input.dataset.tsearch ? `[data-tsearch="${input.dataset.tsearch}"]` : "#chatSearch";
  const pos = input.selectionStart;
  render(state.view, { animate: false, preserveScroll: true });
  const next = $(id);
  if (next) { next.focus(); next.setSelectionRange(pos, pos); }
}

/* ---- Chat ---- */
document.addEventListener("click", (e) => {
  const item = e.target.closest("[data-chat]");
  if (item) { state.activeChat = +item.dataset.chat; render("messages"); }
});
document.addEventListener("submit", (e) => {
  if (e.target.id !== "chatForm") return;
  e.preventDefault();
  const input = $("#chatInput"), body = $("#chatBody");
  const txt = input.value.trim();
  if (!txt) return;
  const chat = DATA.chats.find((c) => c.id === state.activeChat);
  chat.messages.push({ from: "out", text: txt });
  chat.last = txt;
  input.value = "";
  body.insertAdjacentHTML("beforeend", `<div class="msg out">${esc(txt)}</div>`);
  body.scrollTop = body.scrollHeight;
  // Dummy auto-reply
  setTimeout(() => {
    const reply = "Noted, thank you Admin!";
    chat.messages.push({ from: "in", text: reply });
    body.insertAdjacentHTML("beforeend", `<div class="msg in">${reply}</div>`);
    body.scrollTop = body.scrollHeight;
  }, 900);
});

/* ---- All other actions ---- */
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;
  e.preventDefault();
  const a = btn.dataset.action;
  const id = btn.dataset.id;

  switch (a) {
    /* --- Global / shell --- */
    case "logout":
      confirmDialog("Sign out?", "You will be returned to the login page.", () => {
        window.TechNova ? window.TechNova.logout() : (window.location.href = "authentication.html");
      }, false);
      break;
    case "system-status":
      openModal(`<h2>System Status</h2>
        <ul style="margin:14px 0;padding-left:18px;color:var(--muted);line-height:2">
          <li>API Gateway — <b style="color:var(--success)">Operational</b></li>
          <li>Video Streaming — <b style="color:var(--success)">Operational</b></li>
          <li>Payments — <b style="color:var(--success)">Operational</b></li>
          <li>Email Delivery — <b style="color:var(--gold)">Degraded</b></li>
        </ul>
        <button class="btn-primary" data-close>Close</button>`);
      break;
    case "help": toast("Help center opening soon", "info"); break;
    case "privacy": case "terms": case "support":
      toast(`${a[0].toUpperCase() + a.slice(1)} page is a demo link`, "info"); break;

    /* --- Welcome section --- */
    case "view-reports":
      toast("Generating platform report…", "info");
      setTimeout(() => downloadDummy("technova-platform-report.csv", buildReportCSV()), 700);
      break;

    /* --- Students --- */
    case "view-student": {
      const s = DATA.students.find((x) => x.id === +id);
      openModal(`<h2>${s.name}</h2><p style="margin-top:6px">${s.email}</p>
        <div style="display:flex;gap:14px;margin:16px 0;flex-wrap:wrap">
          <span class="status-pill active">${s.courses} courses</span>
          <span class="status-pill pending">${s.progress}% progress</span>
          ${pill(s.status)}
        </div>
        <p>Registered on ${s.date}. Last activity 2 hours ago.</p>
        <div style="display:flex;gap:8px;margin-top:16px"><button class="btn-ghost" data-close>Close</button>
        <button class="btn-primary" data-action="email-student" data-id="${s.id}">Send Email</button></div>`);
      break;
    }
    case "email-student": closeModal(); toast("Email sent to student (demo)", "success"); break;
    case "edit-student": {
      const s = DATA.students.find((x) => x.id === +id);
      openModal(`<h2>Edit Student</h2>
        <div class="field" style="margin:12px 0"><label>Name</label><input id="edName" type="text" value="${esc(s.name)}" /></div>
        <div class="field" style="margin:12px 0"><label>Email</label><input id="edEmail" type="email" value="${esc(s.email)}" /></div>
        <div class="field" style="margin:12px 0"><label>Status</label><select id="edStatus">
          ${["active", "inactive", "suspended"].map((o) => `<option ${s.status === o ? "selected" : ""}>${o}</option>`).join("")}
        </select></div>
        <button class="btn-primary" id="saveStudent"><i class="fa-solid fa-check"></i> Save</button>`);
      $("#saveStudent").addEventListener("click", () => {
        s.name = $("#edName").value; s.email = $("#edEmail").value; s.status = $("#edStatus").value;
        closeModal(); toast("Student updated", "success"); render();
      });
      break;
    }
    case "suspend-student": {
      const s = DATA.students.find((x) => x.id === +id);
      s.status = s.status === "suspended" ? "active" : "suspended";
      toast(`${s.name} ${s.status === "suspended" ? "suspended" : "reactivated"}`, "warn");
      render();
      break;
    }
    case "delete-student":
      confirmDialog("Delete student?", "This permanently removes the student and their progress.", () => {
        DATA.students = DATA.students.filter((x) => x.id !== +id);
        toast("Student deleted", "success"); render();
      });
      break;
    case "export-students":
      downloadDummy("technova-students.csv", toCSV(DATA.students, ["name", "email", "courses", "progress", "status", "date"]));
      toast("Students exported as CSV", "success");
      break;

    /* --- Instructors --- */
    case "view-instructor": {
      const i = DATA.instructors.find((x) => x.id === +id);
      openModal(`<div style="display:flex;gap:14px;align-items:center">
          <img src="${avatar(i.avatar)}" style="width:64px;height:64px;border-radius:50%" />
          <div><h2>${i.name}</h2><p>${i.email}</p></div></div>
        <div style="display:flex;gap:14px;margin:16px 0;flex-wrap:wrap">
          <span class="status-pill active">${i.courses} courses</span>
          <span class="status-pill pending">${fmt(i.students)} students</span>
          <span class="status-pill paid">${i.rating} ★</span>${pill(i.status)}</div>
        <button class="btn-primary" data-close>Close</button>`);
      break;
    }
    case "approve-instructor": {
      const i = DATA.instructors.find((x) => x.id === +id);
      i.status = "approved"; toast(`${i.name} approved`, "success"); render();
      break;
    }
    case "reject-instructor":
      confirmDialog("Reject application?", "The instructor will be notified by email.", () => {
        DATA.instructors = DATA.instructors.filter((x) => x.id !== +id);
        toast("Application rejected", "warn"); render();
      });
      break;

    /* --- Firebase: pending signup approvals (Approvals view) --- */
    case "approve-pending-user": {
      const uid = btn.dataset.uid;
      window.TechNova.approveUser(uid)
        .then(() => { toast("Account approved — they can log in now", "success"); loadApprovals(); })
        .catch((err) => toast("Couldn't approve", err.message || "Try again", "error"));
      break;
    }
    case "reject-pending-user": {
      const uid = btn.dataset.uid;
      confirmDialog("Reject this account?", "They will not be able to log in.", () => {
        window.TechNova.rejectUser(uid)
          .then(() => { toast("Account rejected", "warn"); loadApprovals(); })
          .catch((err) => toast("Couldn't reject", err.message || "Try again", "error"));
      });
      break;
    }

    /* --- Firebase: pending course approvals (Approvals view) --- */
    case "approve-pending-course": {
      const cid = btn.dataset.cid;
      window.TechNova.approveCourse(cid)
        .then(() => { toast("Course approved and published", "success"); loadApprovals(); })
        .catch((err) => toast("Couldn't approve", err.message || "Try again", "error"));
      break;
    }
    case "reject-pending-course": {
      const cid = btn.dataset.cid;
      confirmDialog("Reject this course?", "The instructor will need to resubmit it.", () => {
        window.TechNova.rejectCourse(cid)
          .then(() => { toast("Course rejected", "warn"); loadApprovals(); })
          .catch((err) => toast("Couldn't reject", err.message || "Try again", "error"));
      });
      break;
    }
    case "suspend-instructor": {
      const i = DATA.instructors.find((x) => x.id === +id);
      i.status = i.status === "suspended" ? "approved" : "suspended";
      toast(`${i.name} ${i.status === "suspended" ? "suspended" : "restored"}`, "warn"); render();
      break;
    }
    case "edit-instructor": {
      const i = DATA.instructors.find((x) => x.id === +id);
      openModal(`<h2>Edit Instructor</h2>
        <div class="field" style="margin:12px 0"><label>Name</label><input id="inName" value="${esc(i.name)}" /></div>
        <div class="field" style="margin:12px 0"><label>Email</label><input id="inEmail" value="${esc(i.email)}" /></div>
        <button class="btn-primary" id="saveIns"><i class="fa-solid fa-check"></i> Save</button>`);
      $("#saveIns").addEventListener("click", () => {
        i.name = $("#inName").value; i.email = $("#inEmail").value;
        closeModal(); toast("Instructor updated", "success"); render();
      });
      break;
    }
    case "invite-instructor":
      openModal(`<h2>Invite Instructor</h2>
        <div class="field" style="margin:12px 0"><label>Email address</label><input type="email" placeholder="name@mail.com" /></div>
        <button class="btn-primary" id="sendInvite"><i class="fa-solid fa-paper-plane"></i> Send Invite</button>`);
      $("#sendInvite").addEventListener("click", () => { closeModal(); toast("Invitation sent", "success"); });
      break;

    /* --- Courses --- */
    case "view-course": {
      const c = DATA.courses.find((x) => x.id === +id);
      openModal(`<h2>${c.title}</h2><p style="margin-top:6px">${c.category} · ${c.instructor}</p>
        <img src="${c.thumb}" style="width:100%;border-radius:12px;margin:14px 0" alt="${c.title}" />
        <div style="display:flex;gap:14px;flex-wrap:wrap;font-size:13px;color:var(--muted)">
          <span><i class="fa-solid fa-users"></i> ${fmt(c.students)} students</span>
          <span><i class="fa-solid fa-star"></i> ${c.rating}</span>
          <span><i class="fa-solid fa-tag"></i> ${money(c.price)}</span>${pill(c.status)}</div>
        <button class="btn-primary" style="margin-top:16px" data-close>Close</button>`);
      break;
    }
    case "edit-course": {
      const c = DATA.courses.find((x) => x.id === +id);
      openModal(`<h2>Edit Course</h2>
        <div class="field" style="margin:12px 0"><label>Title</label><input id="cTitle" value="${esc(c.title)}" /></div>
        <div class="field" style="margin:12px 0"><label>Category</label><select id="cCat">
          ${DATA.categories.map((k) => `<option ${k.name === c.category ? "selected" : ""}>${k.name}</option>`).join("")}</select></div>
        <div class="field" style="margin:12px 0"><label>Price ($)</label><input id="cPrice" type="number" value="${c.price}" /></div>
        <button class="btn-primary" id="saveCourse"><i class="fa-solid fa-check"></i> Save</button>`);
      $("#saveCourse").addEventListener("click", () => {
        c.title = $("#cTitle").value; c.category = $("#cCat").value; c.price = +$("#cPrice").value;
        closeModal(); toast("Course updated", "success"); render();
      });
      break;
    }
    case "feature-course": {
      const c = DATA.courses.find((x) => x.id === +id);
      c.featured = !c.featured; toast(c.featured ? "Course featured" : "Course unfeatured", "success"); render();
      break;
    }
    case "toggle-publish": {
      const c = DATA.courses.find((x) => x.id === +id);
      c.status = c.status === "published" ? "draft" : "published";
      toast(c.status === "published" ? "🎉 Course published" : "Course unpublished", "success"); render();
      break;
    }
    case "delete-course":
      confirmDialog("Delete course?", "All lessons and enrollments will be removed.", () => {
        DATA.courses = DATA.courses.filter((x) => x.id !== +id);
        toast("Course deleted", "success"); render();
      });
      break;
    case "add-course":
      openModal(`<h2>Add Course</h2>
        <div class="field" style="margin:12px 0"><label>Title</label><input id="ncTitle" placeholder="Course title" /></div>
        <div class="field" style="margin:12px 0"><label>Category</label><select id="ncCat">${DATA.categories.map((k) => `<option>${k.name}</option>`).join("")}</select></div>
        <div class="field" style="margin:12px 0"><label>Instructor</label><select id="ncIns">${DATA.instructors.map((k) => `<option>${k.name}</option>`).join("")}</select></div>
        <button class="btn-primary" id="createCourse"><i class="fa-solid fa-plus"></i> Create</button>`);
      $("#createCourse").addEventListener("click", () => {
        const title = $("#ncTitle").value.trim();
        if (!title) return toast("Please enter a course title", "warn");
        DATA.courses.unshift({ id: Date.now(), title, category: $("#ncCat").value, instructor: $("#ncIns").value,
          students: 0, rating: 0, status: "draft", featured: false, price: 49,
          thumb: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop" });
        closeModal(); toast("Course created as draft", "success"); render("courses");
      });
      break;

    /* --- Categories --- */
    case "add-category":
      openModal(`<h2>Add Category</h2>
        <div class="field" style="margin:12px 0"><label>Name</label><input id="catName" placeholder="e.g. Blockchain" /></div>
        <div class="field" style="margin:12px 0"><label>Icon</label><select id="catIcon">
          <option value="fa-shapes">Shapes</option><option value="fa-code">Code</option><option value="fa-brain">Brain</option>
          <option value="fa-server">Server</option><option value="fa-pen-nib">Design</option></select></div>
        <button class="btn-primary" id="createCat"><i class="fa-solid fa-plus"></i> Create</button>`);
      $("#createCat").addEventListener("click", () => {
        const name = $("#catName").value.trim();
        if (!name) return toast("Please enter a category name", "warn");
        DATA.categories.push({ id: Date.now(), name, icon: $("#catIcon").value, courses: 0 });
        closeModal(); toast("Category added", "success"); render("categories");
      });
      break;
    case "edit-category": {
      const c = DATA.categories.find((x) => x.id === +id);
      openModal(`<h2>Edit Category</h2>
        <div class="field" style="margin:12px 0"><label>Name</label><input id="ecName" value="${esc(c.name)}" /></div>
        <button class="btn-primary" id="saveCat"><i class="fa-solid fa-check"></i> Save</button>`);
      $("#saveCat").addEventListener("click", () => { c.name = $("#ecName").value; closeModal(); toast("Category updated", "success"); render(); });
      break;
    }
    case "delete-category":
      confirmDialog("Delete category?", "Courses in this category will become uncategorised.", () => {
        DATA.categories = DATA.categories.filter((x) => x.id !== +id);
        toast("Category deleted", "success"); render();
      });
      break;

    /* --- Assignments --- */
    case "view-assignment": {
      const x = DATA.assignments.find((r) => r.id === +id);
      openModal(`<h2>${x.name}</h2><p style="margin-top:6px">${x.course} · ${x.instructor}</p>
        <div style="margin:14px 0;padding:14px;background:var(--bg);border-radius:12px">
          <b>${x.submissions}</b> submissions · deadline <b>${x.deadline}</b></div>
        <button class="btn-primary" data-close>Close</button>`);
      break;
    }
    case "edit-assignment": {
      const x = DATA.assignments.find((r) => r.id === +id);
      openModal(`<h2>Edit Assignment</h2>
        <div class="field" style="margin:12px 0"><label>Name</label><input id="asName" value="${esc(x.name)}" /></div>
        <div class="field" style="margin:12px 0"><label>Deadline</label><input id="asDate" type="date" value="${x.deadline}" /></div>
        <button class="btn-primary" id="saveAs"><i class="fa-solid fa-check"></i> Save</button>`);
      $("#saveAs").addEventListener("click", () => { x.name = $("#asName").value; x.deadline = $("#asDate").value; closeModal(); toast("Assignment updated", "success"); render(); });
      break;
    }
    case "delete-assignment":
      confirmDialog("Delete assignment?", "Student submissions will also be removed.", () => {
        DATA.assignments = DATA.assignments.filter((x) => x.id !== +id);
        toast("Assignment deleted", "success"); render();
      });
      break;
    case "new-assignment":
      openModal(`<h2>New Assignment</h2>
        <div class="field" style="margin:12px 0"><label>Name</label><input id="naName" placeholder="Assignment title" /></div>
        <div class="field" style="margin:12px 0"><label>Course</label><select id="naCourse">${DATA.courses.map((c) => `<option>${c.title}</option>`).join("")}</select></div>
        <div class="field" style="margin:12px 0"><label>Deadline</label><input id="naDate" type="date" /></div>
        <button class="btn-primary" id="createAs"><i class="fa-solid fa-plus"></i> Create</button>`);
      $("#createAs").addEventListener("click", () => {
        const name = $("#naName").value.trim();
        if (!name) return toast("Please enter a name", "warn");
        DATA.assignments.unshift({ id: Date.now(), name, course: $("#naCourse").value, instructor: "Unassigned",
          deadline: $("#naDate").value || "2026-09-01", submissions: 0, status: "active" });
        closeModal(); toast("Assignment created", "success"); render("assignments");
      });
      break;

    /* --- Quizzes --- */
    case "preview-quiz": {
      const q = DATA.quizzes.find((x) => x.id === +id);
      openModal(`<h2>${q.name}</h2><p style="margin-top:6px">${q.course}</p>
        <div style="margin:14px 0;padding:14px;background:var(--bg);border-radius:12px">
          <b>Q1.</b> Which hook stores local component state?<br />
          <div style="margin-top:8px;color:var(--muted)">A) useEffect &nbsp; B) useState &nbsp; C) useMemo &nbsp; D) useRef</div>
        </div>
        <p>${q.questions} questions in total · ${fmt(q.attempts)} attempts</p>
        <button class="btn-primary" style="margin-top:14px" data-close>Close Preview</button>`);
      break;
    }
    case "edit-quiz": {
      const q = DATA.quizzes.find((x) => x.id === +id);
      openModal(`<h2>Edit Quiz</h2>
        <div class="field" style="margin:12px 0"><label>Name</label><input id="qName" value="${esc(q.name)}" /></div>
        <div class="field" style="margin:12px 0"><label>Questions</label><input id="qNum" type="number" value="${q.questions}" /></div>
        <button class="btn-primary" id="saveQuiz"><i class="fa-solid fa-check"></i> Save</button>`);
      $("#saveQuiz").addEventListener("click", () => { q.name = $("#qName").value; q.questions = +$("#qNum").value; closeModal(); toast("Quiz updated", "success"); render(); });
      break;
    }
    case "quiz-results": {
      const q = DATA.quizzes.find((x) => x.id === +id);
      openModal(`<h2>${q.name} — Results</h2>
        <div style="margin:14px 0;display:flex;gap:14px;flex-wrap:wrap">
          <span class="status-pill paid">Average ${q.avg}%</span>
          <span class="status-pill active">${fmt(q.attempts)} attempts</span>
          <span class="status-pill pending">Pass rate ${Math.min(99, q.avg + 8)}%</span></div>
        <button class="btn-primary" data-close>Close</button>`);
      break;
    }
    case "delete-quiz":
      confirmDialog("Delete quiz?", "All attempts and scores will be deleted.", () => {
        DATA.quizzes = DATA.quizzes.filter((x) => x.id !== +id);
        toast("Quiz deleted", "success"); render();
      });
      break;
    case "new-quiz":
      openModal(`<h2>New Quiz</h2>
        <div class="field" style="margin:12px 0"><label>Name</label><input id="nqName" placeholder="Quiz title" /></div>
        <div class="field" style="margin:12px 0"><label>Course</label><select id="nqCourse">${DATA.courses.map((c) => `<option>${c.title}</option>`).join("")}</select></div>
        <button class="btn-primary" id="createQuiz"><i class="fa-solid fa-plus"></i> Create</button>`);
      $("#createQuiz").addEventListener("click", () => {
        const name = $("#nqName").value.trim();
        if (!name) return toast("Please enter a quiz name", "warn");
        DATA.quizzes.unshift({ id: Date.now(), name, course: $("#nqCourse").value, questions: 10, attempts: 0, avg: 0 });
        closeModal(); toast("Quiz created", "success"); render("quizzes");
      });
      break;

    /* --- Certificates --- */
    case "view-certificate": {
      const c = DATA.certificates.find((x) => x.id === id);
      openModal(`<h2>Certificate Preview</h2>
        <div style="margin:16px 0;padding:26px;border:2px solid var(--gold);border-radius:16px;text-align:center;background:var(--gold-soft)">
          <span style="letter-spacing:.2em;font-size:11px;font-weight:700">TECHNOVA ACADEMY</span>
          <h2 style="margin:10px 0">Certificate of Completion</h2>
          <p style="color:var(--ink-2)">Awarded to</p>
          <h3 style="margin:6px 0">${c.student}</h3>
          <p style="color:var(--ink-2)">for completing <b>${c.course}</b> on ${c.date}</p>
          <small style="display:block;margin-top:10px;color:var(--muted)">ID: ${c.id}</small>
        </div>
        <button class="btn-primary" data-action="download-certificate" data-id="${c.id}"><i class="fa-solid fa-download"></i> Download</button>`);
      break;
    }
    case "download-certificate": {
      const c = DATA.certificates.find((x) => x.id === id);
      downloadDummy(`${c.id}.txt`, `TechNova Academy\nCertificate of Completion\n\nAwarded to: ${c.student}\nCourse: ${c.course}\nDate: ${c.date}\nID: ${c.id}\n`);
      toast("Certificate downloaded", "success");
      break;
    }
    case "reissue-certificate":
      toast("Certificate reissued and emailed to the student", "success");
      break;
    case "bulk-certificates":
      downloadDummy("technova-certificates.csv", toCSV(DATA.certificates, ["id", "student", "course", "date"]));
      toast("All certificates exported", "success");
      break;

    /* --- Announcements --- */
    case "publish-announcement": {
      const t = $("#annTitle")?.value.trim(), b = $("#annBody")?.value.trim();
      if (!t || !b) return toast("Title and description are required", "warn");
      DATA.announcements.unshift({ id: Date.now(), title: t, body: b,
        audience: $('input[name="aud"]:checked')?.value || "All Users",
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        tone: "blue" });
      toast("Announcement published", "success"); render("announcements");
      break;
    }
    case "draft-announcement": toast("Draft saved locally", "success"); break;
    case "preview-announcement": {
      const t = $("#annTitle")?.value.trim() || "Untitled announcement";
      const b = $("#annBody")?.value.trim() || "No description yet.";
      openModal(`<h2>${esc(t)}</h2><p style="margin-top:10px">${esc(b)}</p>
        <p style="margin-top:12px;font-size:12px">Audience: <b>${$('input[name="aud"]:checked')?.value}</b></p>
        <button class="btn-primary" style="margin-top:14px" data-close>Close</button>`);
      break;
    }
    case "new-announcement": render("announcements"); setTimeout(() => $("#annTitle")?.focus(), 300); break;
    case "edit-announcement": {
      const an = DATA.announcements.find((x) => x.id === +id);
      openModal(`<h2>Edit Announcement</h2>
        <div class="field" style="margin:12px 0"><label>Title</label><input id="eaTitle" value="${esc(an.title)}" /></div>
        <div class="field" style="margin:12px 0"><label>Description</label><textarea id="eaBody">${esc(an.body)}</textarea></div>
        <button class="btn-primary" id="saveAnn"><i class="fa-solid fa-check"></i> Save</button>`);
      $("#saveAnn").addEventListener("click", () => { an.title = $("#eaTitle").value; an.body = $("#eaBody").value; closeModal(); toast("Announcement updated", "success"); render(); });
      break;
    }
    case "delete-announcement":
      confirmDialog("Delete announcement?", "It will be removed for all users.", () => {
        DATA.announcements = DATA.announcements.filter((x) => x.id !== +id);
        toast("Announcement deleted", "success"); render();
      });
      break;

    /* --- Revenue --- */
    case "view-invoice": {
      const t = DATA.revenue.transactions.find((x) => x.id === id);
      openModal(`<h2>Invoice ${t.id}</h2>
        <p style="margin-top:8px">${t.user} · ${t.course}</p>
        <div style="margin:14px 0;padding:14px;background:var(--bg);border-radius:12px;display:flex;justify-content:space-between">
          <span>Amount</span><b>${money(t.amount)}</b></div>
        <div style="display:flex;gap:10px;align-items:center">${pill(t.status)}<span style="font-size:12px;color:var(--muted)">${t.date}</span></div>
        <button class="btn-primary" style="margin-top:16px" data-action="download-invoice" data-id="${t.id}"><i class="fa-solid fa-download"></i> Download</button>`);
      break;
    }
    case "download-invoice": {
      const t = DATA.revenue.transactions.find((x) => x.id === id);
      downloadDummy(`${t.id}.txt`, `TechNova Academy Invoice\n\nID: ${t.id}\nUser: ${t.user}\nCourse: ${t.course}\nAmount: ${money(t.amount)}\nDate: ${t.date}\nStatus: ${t.status}\n`);
      toast("Invoice downloaded", "success");
      break;
    }
    case "payout-run":
      confirmDialog("Run instructor payout?", `${money(DATA.revenue.pending)} will be scheduled for transfer.`, () => toast("Payout scheduled", "success"), false);
      break;

    /* --- Settings / Profile --- */
    case "save-settings": toast("Settings saved", "success"); break;
    case "reset-settings": toast("Settings reset to defaults", "warn"); render("settings"); break;
    case "upload-logo": toast("Logo uploaded (demo only)", "success"); btn.classList.add("has-file"); break;
    case "edit-profile":
      openModal(`<h2>Edit Profile</h2>
        <div class="field" style="margin:12px 0"><label>Name</label><input id="pName" value="${esc(DATA.admin.name)}" /></div>
        <div class="field" style="margin:12px 0"><label>Email</label><input id="pEmail" value="${esc(DATA.admin.email)}" /></div>
        <button class="btn-primary" id="savePro"><i class="fa-solid fa-check"></i> Save</button>`);
      $("#savePro").addEventListener("click", () => {
        DATA.admin.name = $("#pName").value; DATA.admin.email = $("#pEmail").value;
        closeModal(); toast("Profile updated", "success"); render("profile");
      });
      break;
    case "change-photo":
      DATA.admin.photo = avatar(Math.floor(Math.random() * 70) + 1);
      toast("Profile photo changed", "success"); render("profile");
      break;

    default:
      toast("Action performed (demo)", "info");
  }
});

/* ---- Dummy download + CSV helpers ---- */
function downloadDummy(filename, content) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function toCSV(rows, keys) {
  return [keys.join(","), ...rows.map((r) => keys.map((k) => `"${String(r[k]).replace(/"/g, '""')}"`).join(","))].join("\n");
}
function buildReportCSV() {
  return toCSV(DATA.stats.map((s) => ({ metric: s.label, value: s.value, trend: s.trend })), ["metric", "value", "trend"]);
}

/* ==========================================================
   9. SHELL INIT
   ========================================================== */

/* ---- Sidebar (collapse + mobile drawer) ---- */
function initSidebar() {
  const sb = $("#sidebar"), sc = $("#scrim");
  if (!sb || !sc) return;
  $("#burger")?.addEventListener("click", () => { sb.classList.add("open"); sc.classList.add("on"); });
  sc.addEventListener("click", () => { sb.classList.remove("open"); sc.classList.remove("on"); });
  $("#sbCollapse")?.addEventListener("click", () => {
    sb.classList.toggle("collapsed");
    if (window.gsap) gsap.fromTo($$(".sb-item", sb), { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: .3, stagger: .02, ease: "power2.out", overwrite: "auto", clearProps: "opacity,transform" });
  });
}

/* ---- Topbar: theme, notifications, profile, global search ---- */
function initTopbar() {
  // Theme toggle (UI only)
  const themeBtn = $("#themeToggle");
  themeBtn?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const icon = themeBtn.querySelector("i");
    if (icon) icon.className = document.body.classList.contains("dark") ? "fa-regular fa-sun" : "fa-regular fa-moon";
    destroyCharts(); initChartsFor();
  });

  // Notifications
  const bell = $("#bellBtn"), panel = $("#notifPanel");
  const notificationList = $("#notifList");
  if (notificationList) notificationList.innerHTML = DATA.notifications.map((n) => `
    <a href="#" class="np-item"><div class="np-ic ${n.tone}"><i class="fa-solid ${n.icon}"></i></div>
    <div><b>${n.text}</b><span>${n.time}</span></div></a>`).join("");
  bell?.addEventListener("click", (e) => {
    if (e.target.closest("#notifPanel")) return; // let "Mark all read" etc. work normally
    e.stopPropagation();
    if (!panel) return;
    panel.classList.toggle("open");
    if (panel.classList.contains("open") && window.gsap) gsap.fromTo(".np-item", { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: .3, stagger: .05, overwrite: "auto", clearProps: "opacity,transform" });
  });
  $("#markAllRead")?.addEventListener("click", (e) => { e.preventDefault(); toast("All notifications marked as read", "success"); panel.classList.remove("open"); });

  // Messages shortcut
  $("#msgBtn")?.addEventListener("click", () => render("messages"));

  // Profile dropdown (animated)
  const pBtn = $("#profileBtn"), pDrop = $("#profileDropdown");
  pBtn?.addEventListener("click", (e) => {
    if (e.target.closest("#profileDropdown")) return; // let dropdown links/buttons work normally
    e.stopPropagation();
    if (!pDrop) return;
    pDrop.classList.toggle("open");
    if (pDrop.classList.contains("open") && window.gsap) gsap.fromTo("#profileDropdown a", { opacity: 0, x: 10 }, { opacity: 1, x: 0, duration: .25, stagger: .04, overwrite: "auto", clearProps: "opacity,transform" });
  });

  // Close popovers on outside click
  document.addEventListener("click", (e) => {
    if (!panel?.contains(e.target) && !bell?.contains(e.target)) panel?.classList.remove("open");
    if (!pBtn?.contains(e.target)) pDrop?.classList.remove("open");
    if (!$("#searchInput")?.contains(e.target) && !$("#searchResults")?.contains(e.target)) $("#searchResults")?.classList.remove("open");
  });

  initGlobalSearch();
}

/* ---- Global instant search across all datasets ---- */
function initGlobalSearch() {
  const input = $("#searchInput"), box = $("#searchResults");
  if (!input || !box) return;

  const index = () => [
    ...DATA.students.map((s) => ({ label: s.name, sub: "Student", icon: "fa-user-graduate", view: "students" })),
    ...DATA.instructors.map((s) => ({ label: s.name, sub: "Instructor", icon: "fa-chalkboard-user", view: "instructors" })),
    ...DATA.courses.map((c) => ({ label: c.title, sub: "Course", icon: "fa-book-open", view: "courses" })),
    ...DATA.categories.map((c) => ({ label: c.name, sub: "Category", icon: "fa-shapes", view: "categories" })),
    ...DATA.announcements.map((a) => ({ label: a.title, sub: "Announcement", icon: "fa-bullhorn", view: "announcements" })),
  ];

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (!q) return box.classList.remove("open");
    const hits = index().filter((i) => i.label.toLowerCase().includes(q)).slice(0, 8);
    box.innerHTML = hits.length
      ? hits.map((h) => `<a href="#" data-search-go="${h.view}"><i class="fa-solid ${h.icon}"></i> ${esc(h.label)} <em>${h.sub}</em></a>`).join("")
      : `<div class="sr-empty">No results for “${esc(input.value)}”</div>`;
    box.classList.add("open");
  });
  input.addEventListener("click", (e) => e.stopPropagation());

  box.addEventListener("click", (e) => {
    const go = e.target.closest("[data-search-go]");
    if (!go) return;
    e.preventDefault();
    box.classList.remove("open");
    input.value = "";
    render(go.dataset.searchGo);
  });

  // ⌘K / Ctrl+K focus shortcut
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); input.focus(); }
  });
}

/* ---- Floating action button ---- */
function initFab() {
  const fab = $("#fab"), menu = $("#fabMenu");
  fab?.addEventListener("click", (e) => {
    e.stopPropagation();
    fab.classList.toggle("open");
    menu.classList.toggle("open");
  });
  document.addEventListener("click", () => { fab?.classList.remove("open"); menu?.classList.remove("open"); });
  menu?.addEventListener("click", () => { fab.classList.remove("open"); menu.classList.remove("open"); });
}

/* ---- Custom cursor (desktop only, rAF-smoothed) ---- */
function initCursor() {
  if (window.matchMedia("(max-width: 900px)").matches) return;
  const dot = $(".cursor-dot"), ring = $(".cursor-ring");
  if (!dot || !ring) return;
  let x = 0, y = 0, rx = 0, ry = 0;
  document.addEventListener("mousemove", (e) => {
    x = e.clientX; y = e.clientY;
    dot.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;
  });
  const loop = () => {
    rx += (x - rx) * .3; ry += (y - ry) * .3;
    ring.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  };
  loop();
  const hot = "a,button,.a-stat,.icourse,.cat-card,.mini-card";
  document.addEventListener("mouseover", (e) => { if (e.target.closest(hot)) document.body.classList.add("cursor-active"); });
  document.addEventListener("mouseout", (e) => { if (e.target.closest(hot)) document.body.classList.remove("cursor-active"); });
}

/* ---- Magnetic buttons (subtle pull towards the cursor) ---- */
function initMagnetic() {
  if (window.matchMedia("(max-width: 900px)").matches) return;
  document.addEventListener("mousemove", (e) => {
    const m = e.target.closest(".magnetic");
    if (!m) return;
    const r = m.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * .18;
    const dy = (e.clientY - (r.top + r.height / 2)) * .3;
    m.style.transform = `translate(${dx}px, ${dy}px)`;
  });
  document.addEventListener("mouseout", (e) => {
    const m = e.target.closest(".magnetic");
    if (m) m.style.transform = "";
  });
}

/* ---- Boot ---- */
document.addEventListener("DOMContentLoaded", () => {
  const todayChip = $("#todayChip");
  const year = $("#year");
  if (todayChip) todayChip.textContent = new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
  if (year) year.textContent = new Date().getFullYear();

  initSidebar();
  initTopbar();
  initFab();
  initCursor();
  initMagnetic();

  // Sidebar entrance animation
  if (window.gsap) {
    gsap.fromTo(".sidebar", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: .5, ease: "power2.out", clearProps: "opacity,transform" });
    gsap.fromTo(".topbar", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: .5, ease: "power2.out", clearProps: "opacity,transform" });
  }

  render("dashboard");
});