
/* ---------- Utility helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};
const fmt = n => n.toLocaleString();
const money = n => "$" + n.toLocaleString();

/* ---------- Data ----------*/
const DATA = {
  instructor: {
    name: "", email: "", bio: "", education: "", experience: "",
    skills: [], socials: { linkedin: "#", twitter: "#", github: "#", youtube: "#" }
  },
  stats: [
    { label: "Total Courses", value: 0, icon: "fa-book", tone: "gold", trend: "" },
    { label: "Total Students", value: 0, icon: "fa-users", tone: "blue", trend: "" },
    { label: "Assignments", value: 0, icon: "fa-file-pen", tone: "gold", trend: "" },
    { label: "Monthly Earnings", value: 0, prefix: "$", icon: "fa-sack-dollar", tone: "blue", trend: "" }
  ],
  courses: [],
  students: [
    { name: "Ayesha Khan", course: "React & Next.js", progress: 68, lastActive: "2h ago", status: "active", avatar: 47 },
    { name: "Ali Hamza", course: "Python for Data Science", progress: 42, lastActive: "1d ago", status: "active", avatar: 12 },
    { name: "Sara Ahmed", course: "MERN Bootcamp", progress: 91, lastActive: "5m ago", status: "active", avatar: 32 },
    { name: "Zainab Iqbal", course: "UI/UX Design Systems", progress: 30, lastActive: "3d ago", status: "inactive", avatar: 5 },
    { name: "Hassan Tariq", course: "Machine Learning", progress: 55, lastActive: "1h ago", status: "active", avatar: 22 },
    { name: "Maria Yousaf", course: "DevOps", progress: 12, lastActive: "1w ago", status: "inactive", avatar: 44 },
    { name: "Umer Farooq", course: "React & Next.js", progress: 76, lastActive: "10m ago", status: "active", avatar: 68 },
    { name: "Fatima Noor", course: "Python for Data Science", progress: 88, lastActive: "20m ago", status: "active", avatar: 25 }
  ],
  assignments: [
    { id: 1, name: "Build a Todo App with Hooks", course: "React & Next.js", deadline: "Aug 12, 2026", submissions: 84 },
    { id: 2, name: "Pandas Data Cleaning Challenge", course: "Python for Data Science", deadline: "Aug 15, 2026", submissions: 61 },
    { id: 3, name: "Design a Mobile Wallet UI", course: "UI/UX Design Systems", deadline: "Aug 20, 2026", submissions: 32 },
    { id: 4, name: "Deploy Full-Stack App", course: "MERN Bootcamp", deadline: "Aug 25, 2026", submissions: 108 }
  ],
  quizzes: [
    { id: 1, name: "React Hooks Mastery", questions: 15, attempts: 420, avgScore: 82 },
    { id: 2, name: "Python Basics", questions: 20, attempts: 610, avgScore: 74 },
    { id: 3, name: "UI/UX Principles", questions: 12, attempts: 280, avgScore: 88 },
    { id: 4, name: "MERN Full-Stack", questions: 25, attempts: 190, avgScore: 71 }
  ],
  earnings: {
    total: 148600, monthly: 12480, pending: 3200, completed: 145400,
    history: [
      { date: "Jul 28, 2026", course: "React & Next.js", amount: 2400, status: "paid" },
      { date: "Jul 25, 2026", course: "MERN Bootcamp", amount: 3200, status: "paid" },
      { date: "Jul 22, 2026", course: "Python for Data Science", amount: 1800, status: "pending" },
      { date: "Jul 18, 2026", course: "UI/UX Design Systems", amount: 1400, status: "paid" },
      { date: "Jul 15, 2026", course: "Machine Learning", amount: 2600, status: "paid" },
      { date: "Jul 10, 2026", course: "DevOps", amount: 1080, status: "pending" }
    ]
  },
  notifications: [
    { icon: "fa-user-plus", tone: "blue", text: "New student enrolled in React & Next.js", time: "5m ago" },
    { icon: "fa-file-pen", tone: "gold", text: "Assignment submitted by Ali Hamza", time: "1h ago" },
    { icon: "fa-star", tone: "gold", text: "New 5-star review on Python for Data Science", time: "3h ago" },
    { icon: "fa-clipboard-check", tone: "blue", text: "Quiz 'React Hooks' completed by 12 students", time: "1d ago" }
  ],
  chats: [
    { id: 1, name: "Ayesha Khan", avatar: 47, last: "Thank you sir, that helped!", unread: 2, messages: [
      { from: "in", text: "Sir, I'm confused about useEffect cleanup." },
      { from: "out", text: "Sure! It runs when the component unmounts or before the effect re-runs." },
      { from: "in", text: "Ohh got it now." },
      { from: "in", text: "Thank you sir, that helped!" }
    ]},
    { id: 2, name: "Ali Hamza", avatar: 12, last: "When is the assignment due?", unread: 0, messages: [
      { from: "in", text: "When is the assignment due?" },
      { from: "out", text: "August 15, 2026. Make sure to submit early!" }
    ]},
    { id: 3, name: "Sara Ahmed", avatar: 32, last: "I submitted my project.", unread: 1, messages: [
      { from: "in", text: "I submitted my project." },
      { from: "out", text: "Great! I'll review it today." }
    ]}
  ]
};

/* ---------- State ---------- */
const state = {
  view: "dashboard",
  createStep: 1,
  createDraft: { title: "", category: "Frontend", price: 49, duration: "10h", difficulty: "Beginner", language: "English",
    description: "", requirements: "", outcomes: "", tags: "", thumb: "" , modules: [] },
  activeChat: 1,
  chartInstances: {}
};

/* ---------- Toast ---------- */

function toast(a, b, c, d) {
  const TYPES = ["info","success","warn","warning","error"];
  let title, msg, type, ms;
  if (TYPES.includes(b)) { title = a; msg = ""; type = b; ms = typeof c === "number" ? c : undefined; }
  else if (TYPES.includes(c)) { title = a; msg = b || ""; type = c; ms = typeof d === "number" ? d : undefined; }
  else { title = a; msg = typeof b === "string" ? b : ""; type = "info"; ms = typeof c === "number" ? c : undefined; }
  const wrap = $("#toastWrap");
  const icon = type === "success" ? "fa-check-circle" : type === "error" ? "fa-triangle-exclamation" : type === "warn" ? "fa-triangle-exclamation" : "fa-circle-info";
  const t = el("div", `toast toast-${type}`, `<i class="fa-solid ${icon}"></i><span><b>${title}</b>${msg ? ` — ${msg}` : ""}</span>`);
  wrap.appendChild(t);
  setTimeout(() => t.classList.add("show"), 10);
  setTimeout(() => { t.classList.remove("show"); setTimeout(() => t.remove(), 300); }, ms || 3400);
}

/* ---------- Modal ---------- */
function openModal(html) {
  const m = $("#modal");
  $("#modalBody").innerHTML = html;
  m.classList.add("open"); m.setAttribute("aria-hidden", "false");
}
function closeModal() { const m = $("#modal"); if (m.contains(document.activeElement)) document.activeElement.blur(); m.classList.remove("open"); m.setAttribute("aria-hidden", "true"); }
document.addEventListener("click", e => { if (e.target.closest("[data-close]")) closeModal(); });

/* ---------- Ripple ---------- */
function ripple(e) {
  const btn = e.currentTarget;
  if (!btn.classList.contains("ripple")) btn.classList.add("ripple");
  const r = document.createElement("span");
  r.className = "rp";
  const size = Math.max(btn.offsetWidth, btn.offsetHeight);
  r.style.width = r.style.height = size + "px";
  const rect = btn.getBoundingClientRect();
  r.style.left = (e.clientX - rect.left - size / 2) + "px";
  r.style.top = (e.clientY - rect.top - size / 2) + "px";
  btn.appendChild(r);
  setTimeout(() => r.remove(), 600);
}

/* ---------- Motion preference ---------- */
const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Counter animation (safe, cancellable) ---------- */
const counterFrames = new Set();
function stopCounters() { counterFrames.forEach(id => cancelAnimationFrame(id)); counterFrames.clear(); }
function animateCounter(node, target, prefix = "", suffix = "") {
  if (!node || !Number.isFinite(target)) return;
  const done = () => { node.textContent = prefix + target.toLocaleString() + suffix; };
  if (reduceMotion()) { done(); return; }
  const dur = 1200; const start = performance.now();
  let frame = 0;
  function tick(now) {
    counterFrames.delete(frame);
    if (!node.isConnected) return;            // node replaced by a re-render
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    node.textContent = prefix + Math.round(target * eased).toLocaleString() + suffix;
    if (p < 1) { frame = requestAnimationFrame(tick); counterFrames.add(frame); }
  }
  frame = requestAnimationFrame(tick);
  counterFrames.add(frame);
}


/* ----- Dashboard ----- */
function viewDashboard() {
  return `
  <div class="view">
    <section class="hero-card reveal">
      <div class="hero-copy">
        <span class="eyebrow"><i class="fa-solid fa-sparkles"></i> Instructor Portal</span>
        <h1>Welcome back, <span class="gradient">Bilal</span> 👋</h1>
        <p>Your courses reached <b>4,820 students</b> this month. Keep the momentum — publish a new lesson to boost engagement.</p>
        <div class="hero-cta">
          <button class="btn-primary magnetic" data-action="new-course"><i class="fa-solid fa-plus"></i> Create New Course</button>
          <button class="btn-ghost" data-view="analytics">View Analytics</button>
        </div>
      </div>
      <div class="hero-art">
        <div class="art-blob b1"></div>
        <div class="art-blob b2"></div>
        <div class="art-card floaty">
          <div class="ac-row"><i class="fa-solid fa-chalkboard-user"></i><b>Live Class</b><span>Today 6 PM</span></div>
          <div class="ac-row"><i class="fa-solid fa-star"></i><b>Avg Rating</b><span>4.8</span></div>
          <div class="ac-row"><i class="fa-solid fa-graduation-cap"></i><b>Students</b><span>4,820</span></div>
        </div>
        <div class="art-chip c1 floaty delay-1"><i class="fa-brands fa-react"></i></div>
        <div class="art-chip c2 floaty delay-2"><i class="fa-brands fa-python"></i></div>
        <div class="art-chip c3 floaty delay-3"><i class="fa-solid fa-brain"></i></div>
      </div>
    </section>

    <section class="stats-grid">
      ${DATA.stats.map(s => `
        <div class="stat-card reveal">
          <div class="s-icon ${s.tone}"><i class="fa-solid ${s.icon}"></i></div>
          <div class="s-body">
            <span class="s-label">${s.label}</span>
            <b class="counter" data-count="${s.value}" ${s.prefix ? `data-prefix="${s.prefix}"` : ""}>0</b>
            <em class="s-trend up"><i class="fa-solid fa-arrow-up"></i> ${s.trend}</em>
          </div>
        </div>`).join("")}
    </section>

    <div class="grid-2col" style="margin-top:22px">
      <section class="panel reveal">
        <div class="panel-head">
          <div><span class="eyebrow-sm">Top performing</span><h2>My Courses</h2></div>
          <button class="btn-ghost sm" data-view="courses">View all <i class="fa-solid fa-arrow-right"></i></button>
        </div>
        <div class="grid-cards">
          ${DATA.courses.slice(0, 3).map(courseCard).join("")}
        </div>
      </section>

      <section class="panel reveal">
        <div class="panel-head"><div><span class="eyebrow-sm">Latest</span><h2>Recent Activity</h2></div></div>
        <ul class="activity">
          ${DATA.notifications.map(n => `
            <li><div class="act-ic ${n.tone}"><i class="fa-solid ${n.icon}"></i></div>
            <div><b>${n.text}</b><span>${n.time}</span></div></li>`).join("")}
        </ul>
      </section>
    </div>
  </div>`;
}

/* ----- Course Card partial ----- */
function courseCard(c) {
  return `
    <article class="icourse" data-course-id="${c.id}">
      <div class="thumb">
        <img src="${c.thumb}" alt="${c.title}" loading="lazy" />
        <span class="status ${c.status}">${c.status}</span>
      </div>
      <div class="body">
        <span class="cat">${c.category}</span>
        <h3>${c.title}</h3>
        <div class="meta">
          <span><i class="fa-solid fa-users"></i> ${fmt(c.students)}</span>
          <span><i class="fa-solid fa-star"></i> ${c.rating}</span>
          <span><i class="fa-regular fa-clock"></i> ${c.duration}</span>
          <span><i class="fa-solid fa-list"></i> ${c.lessons} lessons</span>
        </div>
        <div class="actions">
          <button class="btn-ghost sm" data-action="edit-course" data-id="${c.id}"><i class="fa-solid fa-pen"></i> Edit</button>
          <button class="btn-primary sm" data-action="view-course" data-id="${c.id}"><i class="fa-solid fa-eye"></i> View</button>
          <button class="btn-danger" data-action="delete-course" data-id="${c.id}"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
    </article>`;
}

/* ----- My Courses ----- */
function viewCourses() {
  return `
  <div class="view">
    <div class="section-head">
      <div><span class="eyebrow-sm">Manage</span><h1>My Courses</h1></div>
      <button class="btn-primary" data-action="new-course"><i class="fa-solid fa-plus"></i> Create Course</button>
    </div>
    <div class="grid-cards">${DATA.courses.map(courseCard).join("")}</div>
  </div>`;
}

/* ----- Create Course ----- */
function viewCreate() {
  return `
  <div class="view">
    <div class="section-head">
      <div><span class="eyebrow-sm">New Course</span><h1>Create Course</h1></div>
      <div style="display:flex;gap:8px">
        <button class="btn-ghost" data-action="save-draft"><i class="fa-regular fa-floppy-disk"></i> Save Draft</button>
        <button class="btn-primary" data-action="publish-course"><i class="fa-solid fa-rocket"></i> Publish</button>
      </div>
    </div>

    <div class="stepper" id="stepper">
      ${["Basics","Details","Content","Preview"].map((s,i) => `
        <div class="step ${i+1 === state.createStep ? "active" : i+1 < state.createStep ? "done" : ""}" data-step="${i+1}">
          <span class="st-num">${i+1}</span>
          <div class="st-txt"><small>Step ${i+1}</small><b>${s}</b></div>
        </div>`).join("")}
    </div>

    <div class="grid-2col">
      <div class="form-panel" id="createForm">${createStepMarkup()}</div>
      <div>
        <div class="preview-card" id="previewCard">${previewMarkup()}</div>
      </div>
    </div>
  </div>`;
}

function createStepMarkup() {
  const d = state.createDraft;
  if (state.createStep === 1) {
    return `
      <h2 style="margin-bottom:14px">Course Basics</h2>
      <div class="form-row">
        <div class="field"><label>Course Title</label><input id="f-title" type="text" placeholder="e.g. React & Next.js Bootcamp" value="${d.title}" /></div>
        <div class="field"><label>Category</label>
          <select id="f-category">
            ${["Frontend","Backend","Full-Stack","Data Science","AI/ML","Design","DevOps","Mobile"].map(c => `<option ${d.category===c?"selected":""}>${c}</option>`).join("")}
          </select></div>
      </div>
      <div class="form-row">
        <div class="field"><label>Price (USD)</label><input id="f-price" type="number" min="0" value="${d.price}" /></div>
        <div class="field"><label>Duration</label><input id="f-duration" type="text" value="${d.duration}" placeholder="e.g. 24h" /></div>
      </div>
      <div class="form-row">
        <div class="field"><label>Difficulty</label>
          <select id="f-difficulty">
            ${["Beginner","Intermediate","Advanced"].map(x => `<option ${d.difficulty===x?"selected":""}>${x}</option>`).join("")}
          </select></div>
        <div class="field"><label>Language</label>
          <select id="f-language">
            ${["English","Urdu","Arabic","Spanish","French"].map(x => `<option ${d.language===x?"selected":""}>${x}</option>`).join("")}
          </select></div>
      </div>
      <div class="step-nav">
        <span></span>
        <button class="btn-primary" data-action="next-step">Continue <i class="fa-solid fa-arrow-right"></i></button>
      </div>`;
  }
  if (state.createStep === 2) {
    return `
      <h2 style="margin-bottom:14px">Details & Media</h2>
      <div class="form-row">
        <div class="field"><label>Thumbnail (16:9)</label>
          <div class="upload-box" data-upload="thumb">
            <i class="fa-solid fa-cloud-arrow-up"></i>
            <b>Click to upload thumbnail</b>
            <small>PNG or JPG, up to 2MB</small>
          </div></div>
        <div class="field"><label>Banner Image</label>
          <div class="upload-box" data-upload="banner">
            <i class="fa-solid fa-image"></i>
            <b>Click to upload banner</b>
            <small>Recommended 1920×480</small>
          </div></div>
      </div>
      <div class="field" style="margin-bottom:14px"><label>Description</label>
        <textarea id="f-description" placeholder="What will students learn?">${d.description}</textarea></div>
      <div class="form-row">
        <div class="field"><label>Requirements</label><textarea id="f-requirements" placeholder="One per line">${d.requirements}</textarea></div>
        <div class="field"><label>Learning Outcomes</label><textarea id="f-outcomes" placeholder="One per line">${d.outcomes}</textarea></div>
      </div>
      <div class="field" style="margin-bottom:14px"><label>Tags (comma separated)</label>
        <input id="f-tags" type="text" value="${d.tags}" placeholder="react, hooks, nextjs" /></div>
      <div class="step-nav">
        <button class="btn-ghost" data-action="prev-step"><i class="fa-solid fa-arrow-left"></i> Back</button>
        <button class="btn-primary" data-action="next-step">Continue <i class="fa-solid fa-arrow-right"></i></button>
      </div>`;
  }
  if (state.createStep === 3) {
    return `
      <h2 style="margin-bottom:8px">Course Content</h2>
      <p style="margin-bottom:14px">Add modules and lessons. Everything updates instantly in the preview.</p>
      <div class="module-list" id="moduleList">${d.modules.map(moduleMarkup).join("")}</div>
      <button class="btn-ghost" data-action="add-module" style="margin-top:14px"><i class="fa-solid fa-plus"></i> Add Module</button>
      <div class="step-nav">
        <button class="btn-ghost" data-action="prev-step"><i class="fa-solid fa-arrow-left"></i> Back</button>
        <button class="btn-primary" data-action="next-step">Continue <i class="fa-solid fa-arrow-right"></i></button>
      </div>`;
  }
  // step 4
  return `
    <h2 style="margin-bottom:14px">Final Review</h2>
    <p style="margin-bottom:14px">Review your course details in the live preview. When ready, publish or save as draft.</p>
    <ul class="activity">
      <li><div class="act-ic blue"><i class="fa-solid fa-book"></i></div><div><b>${d.title || "Untitled Course"}</b><span>${d.category} · ${d.difficulty} · ${d.language}</span></div></li>
      <li><div class="act-ic gold"><i class="fa-solid fa-list"></i></div><div><b>${d.modules.length} Modules · ${d.modules.reduce((a,m)=>a+m.lessons.length,0)} Lessons</b><span>Duration: ${d.duration}</span></div></li>
      <li><div class="act-ic blue"><i class="fa-solid fa-dollar-sign"></i></div><div><b>${money(d.price)}</b><span>One-time enrollment fee</span></div></li>
    </ul>
    <div class="step-nav">
      <button class="btn-ghost" data-action="prev-step"><i class="fa-solid fa-arrow-left"></i> Back</button>
      <div style="display:flex;gap:8px">
        <button class="btn-ghost" data-action="save-draft">Save Draft</button>
        <button class="btn-primary" data-action="publish-course"><i class="fa-solid fa-rocket"></i> Publish Course</button>
      </div>
    </div>`;
}

function moduleMarkup(m, idx) {
  return `
    <div class="module" data-mid="${m.id}">
      <div class="module-head">
        <span class="mh-num">${idx != null ? idx + 1 : (state.createDraft.modules.findIndex(x=>x.id===m.id)+1)}</span>
        <input type="text" placeholder="Module title" value="${m.title}" data-mfield="title" />
        <button class="icon-btn btn-danger-ghost" data-action="remove-module" data-mid="${m.id}" title="Remove module"><i class="fa-solid fa-trash"></i></button>
      </div>
      <div class="field" style="margin-bottom:10px">
        <textarea placeholder="Module description" data-mfield="description">${m.description}</textarea>
      </div>
      <div class="lesson-list">
        ${m.lessons.map((l,li) => lessonMarkup(m.id, l, li)).join("")}
      </div>
      <button class="btn-ghost sm" data-action="add-lesson" data-mid="${m.id}" style="margin-top:10px"><i class="fa-solid fa-plus"></i> Add Lesson</button>
    </div>`;
}
function lessonMarkup(mid, l, li) {
  return `
    <div class="lesson" data-lid="${l.id}" data-mid="${mid}">
      <div class="lesson-row">
        <div class="l-num">#${li + 1}</div>
        <input type="text" placeholder="Lesson title" value="${l.title}" data-lfield="title" />
        <input type="text" placeholder="Duration" value="${l.duration}" data-lfield="duration" />
        <button class="icon-btn btn-danger-ghost" data-action="remove-lesson" data-mid="${mid}" data-lid="${l.id}" title="Remove"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="form-row" style="margin-bottom:0">
        <div class="field"><label>YouTube URL</label><input type="text" placeholder="https://youtube.com/…" value="${l.videoUrl}" data-lfield="videoUrl" /></div>
        <div class="field"><label>Lesson Notes</label><input type="text" placeholder="Short notes" value="${l.notes}" data-lfield="notes" /></div>
      </div>
      <div class="field"><label>Description</label><textarea placeholder="What this lesson covers" data-lfield="description">${l.description}</textarea></div>
      <div class="upload-box" data-upload="resource" style="padding:12px"><i class="fa-solid fa-paperclip"></i> Attach resources <small>(UI only)</small></div>
    </div>`;
}

function previewMarkup() {
  const d = state.createDraft;
  const totalLessons = d.modules.reduce((a,m)=>a+m.lessons.length,0);
  const thumb = d.thumb || "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&auto=format&fit=crop";
  return `
    <div class="pv-thumb"><img src="${thumb}" alt="preview" /></div>
    <div class="pv-body">
      <span class="cat" style="color:var(--blue);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em">${d.category}</span>
      <h3 id="pv-title">${d.title || "Your course title"}</h3>
      <p style="font-size:12px"><i class="fa-solid fa-chalkboard-user"></i> ${DATA.instructor.name}</p>
      <div class="pv-price">${money(d.price)}</div>
      <div class="pv-meta">
        <span><i class="fa-solid fa-signal"></i> ${d.difficulty}</span>
        <span><i class="fa-regular fa-clock"></i> ${d.duration}</span>
        <span><i class="fa-solid fa-layer-group"></i> ${d.modules.length} modules</span>
        <span><i class="fa-solid fa-play"></i> ${totalLessons} lessons</span>
        <span><i class="fa-solid fa-language"></i> ${d.language}</span>
      </div>
    </div>`;
}

function refreshPreview() { const p = $("#previewCard"); if (p) p.innerHTML = previewMarkup(); }

/* ----- Assignments ----- */
function viewAssignments() {
  return `
  <div class="view">
    <div class="section-head">
      <div><span class="eyebrow-sm">Homework</span><h1>Assignments</h1></div>
      <button class="btn-primary" data-action="new-assignment"><i class="fa-solid fa-plus"></i> New Assignment</button>
    </div>
    <div class="grid-cards">
      ${DATA.assignments.map(a => `
        <div class="mini-card">
          <div class="mc-top"><div class="mc-icon"><i class="fa-solid fa-file-pen"></i></div>
            <span class="status-pill active">Open</span></div>
          <h3>${a.name}</h3>
          <p style="font-size:12px"><i class="fa-solid fa-book"></i> ${a.course}</p>
          <div class="mc-meta">
            <span><i class="fa-regular fa-calendar"></i> Due ${a.deadline}</span>
            <span><i class="fa-solid fa-inbox"></i> ${a.submissions} submissions</span>
          </div>
          <div class="mc-actions">
            <button class="btn-ghost" data-action="view-assignment" data-id="${a.id}">View</button>
            <button class="btn-ghost" data-action="edit-assignment" data-id="${a.id}">Edit</button>
            <button class="btn-primary" data-action="grade-assignment" data-id="${a.id}">Grade</button>
          </div>
        </div>`).join("")}
    </div>
  </div>`;
}

/* ----- Quizzes ----- */
function viewQuizzes() {
  return `
  <div class="view">
    <div class="section-head">
      <div><span class="eyebrow-sm">Assessments</span><h1>Quizzes</h1></div>
      <button class="btn-primary" data-action="new-quiz"><i class="fa-solid fa-plus"></i> New Quiz</button>
    </div>
    <div class="grid-cards">
      ${DATA.quizzes.map(q => `
        <div class="mini-card">
          <div class="mc-top"><div class="mc-icon gold"><i class="fa-solid fa-clipboard-question"></i></div>
            <span class="status-pill active">Active</span></div>
          <h3>${q.name}</h3>
          <div class="mc-meta">
            <span><i class="fa-solid fa-list"></i> ${q.questions} questions</span>
            <span><i class="fa-solid fa-users"></i> ${q.attempts} attempts</span>
            <span><i class="fa-solid fa-percent"></i> ${q.avgScore}% avg</span>
          </div>
          <div class="mc-actions">
            <button class="btn-ghost" data-action="edit-quiz" data-id="${q.id}">Edit</button>
            <button class="btn-ghost" data-action="preview-quiz" data-id="${q.id}">Preview</button>
            <button class="btn-primary" data-action="quiz-results" data-id="${q.id}">Results</button>
          </div>
        </div>`).join("")}
    </div>
  </div>`;
}

/* ----- Students ----- */
function viewStudents() {
  return `
  <div class="view">
    <div class="section-head">
      <div><span class="eyebrow-sm">Enrolled</span><h1>Students</h1></div>
      <span class="today-chip"><i class="fa-solid fa-users"></i> ${DATA.students.length} shown</span>
    </div>
    <div class="table-wrap">
      <table class="data">
        <thead><tr><th>Student</th><th>Course</th><th>Progress</th><th>Last Active</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          ${DATA.students.map(s => `
            <tr>
              <td><div style="display:flex;align-items:center;gap:10px"><img src="https://i.pravatar.cc/60?img=${s.avatar}" style="width:34px;height:34px;border-radius:50%" alt="" /><b>${s.name}</b></div></td>
              <td>${s.course}</td>
              <td><div class="pb-mini"><span style="width:${s.progress}%"></span></div><small style="color:var(--muted);font-size:11px">${s.progress}%</small></td>
              <td>${s.lastActive}</td>
              <td><span class="status-pill ${s.status}">${s.status}</span></td>
              <td>
                <button class="btn-ghost sm" data-action="view-student" data-name="${s.name}"><i class="fa-solid fa-eye"></i></button>
                <button class="btn-primary sm" data-action="message-student" data-name="${s.name}"><i class="fa-regular fa-comment-dots"></i></button>
              </td>
            </tr>`).join("")}
        </tbody>
      </table>
    </div>
  </div>`;
}

/* ----- Analytics ----- */
function viewAnalytics() {
  return `
  <div class="view">
    <div class="section-head"><div><span class="eyebrow-sm">Insights</span><h1>Analytics</h1></div></div>
    <div class="grid-cards">
      <div class="chart-box"><h3>Student Growth</h3><div class="chart-holder"><canvas id="chartGrowth"></canvas></div></div>
      <div class="chart-box"><h3>Monthly Revenue</h3><div class="chart-holder"><canvas id="chartRevenue"></canvas></div></div>
      <div class="chart-box"><h3>Course Enrollments</h3><div class="chart-holder"><canvas id="chartEnroll"></canvas></div></div>
      <div class="chart-box"><h3>Course Completion</h3><div class="chart-holder"><canvas id="chartCompletion"></canvas></div></div>
      <div class="chart-box" style="grid-column: 1 / -1"><h3>Monthly Activity</h3><div class="chart-holder"><canvas id="chartActivity"></canvas></div></div>
    </div>
  </div>`;
}

/* ----- Earnings ----- */
function viewEarnings() {
  const e = DATA.earnings;
  const cards = [
    { l: "Total Earnings", v: e.total, tone: "gold", icon: "fa-sack-dollar" },
    { l: "Monthly Earnings", v: e.monthly, tone: "blue", icon: "fa-calendar-check" },
    { l: "Pending Payments", v: e.pending, tone: "gold", icon: "fa-hourglass-half" },
    { l: "Completed Payments", v: e.completed, tone: "blue", icon: "fa-check-double" },
  ];
  return `
  <div class="view">
    <div class="section-head"><div><span class="eyebrow-sm">Money</span><h1>Earnings</h1></div>
    <button class="btn-primary" data-action="withdraw"><i class="fa-solid fa-money-bill-transfer"></i> Withdraw</button></div>
    <section class="stats-grid">
      ${cards.map(c => `
        <div class="stat-card"><div class="s-icon ${c.tone}"><i class="fa-solid ${c.icon}"></i></div>
        <div class="s-body"><span class="s-label">${c.l}</span>
        <b class="counter" data-count="${c.v}" data-prefix="$">0</b>
        <em class="s-trend up"><i class="fa-solid fa-arrow-up"></i> Updated today</em></div></div>`).join("")}
    </section>
    <section class="panel" style="margin-top:22px">
      <div class="panel-head"><div><span class="eyebrow-sm">History</span><h2>Payment History</h2></div></div>
      <div class="table-wrap">
        <table class="data">
          <thead><tr><th>Date</th><th>Course</th><th>Amount</th><th>Status</th></tr></thead>
          <tbody>
            ${e.history.map(h => `<tr><td>${h.date}</td><td>${h.course}</td><td><b>${money(h.amount)}</b></td><td><span class="status-pill ${h.status}">${h.status}</span></td></tr>`).join("")}
          </tbody>
        </table>
      </div>
    </section>
  </div>`;
}

/* ----- Messages ----- */
function viewMessages() {
  const chat = DATA.chats.find(c => c.id === state.activeChat) || DATA.chats[0];
  return `
  <div class="view">
    <div class="section-head"><div><span class="eyebrow-sm">Inbox</span><h1>Messages</h1></div></div>
    <div class="chat-shell">
      <div class="chat-list">
        ${DATA.chats.map(c => `
          <div class="cl-item ${c.id === state.activeChat ? "active" : ""}" data-chat="${c.id}">
            <img src="https://i.pravatar.cc/60?img=${c.avatar}" alt="" />
            <div style="flex:1;min-width:0">
              <b>${c.name}</b>
              <span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block">${c.last}</span>
            </div>
            ${c.unread ? `<em class="sb-badge">${c.unread}</em>` : ""}
          </div>`).join("")}
      </div>
      <div class="chat-panel">
        <div class="cp-head">
          <img src="https://i.pravatar.cc/60?img=${chat.avatar}" alt="" />
          <div><b>${chat.name}</b><br><small style="color:var(--muted)">Online now</small></div>
        </div>
        <div class="cp-body" id="cpBody">
          ${chat.messages.map(m => `<div class="msg ${m.from}">${m.text}</div>`).join("")}
        </div>
        <form class="cp-input" id="chatForm">
          <input type="text" id="chatInput" placeholder="Type a message…" required />
          <button class="btn-primary" type="submit"><i class="fa-solid fa-paper-plane"></i></button>
        </form>
      </div>
    </div>
  </div>`;
}

/* ----- Profile ----- */
function viewProfile() {
  const p = DATA.instructor;
  return `
  <div class="view">
    <div class="section-head"><div><span class="eyebrow-sm">Account</span><h1>Instructor Profile</h1></div>
    <button class="btn-primary" data-action="edit-profile"><i class="fa-solid fa-pen"></i> Edit Profile</button></div>
    <div class="profile-shell">
      <div class="p-card">
        <img class="avatar" src="https://i.pravatar.cc/240?img=15" alt="${p.name}" />
        <h2>${p.name}</h2>
        <span class="role">Senior Instructor</span>
        <p style="margin-top:10px;font-size:13px">${p.bio}</p>
        <div class="socials">
          <a href="${p.socials.linkedin}" title="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
          <a href="${p.socials.twitter}" title="Twitter"><i class="fa-brands fa-twitter"></i></a>
          <a href="${p.socials.github}" title="GitHub"><i class="fa-brands fa-github"></i></a>
          <a href="${p.socials.youtube}" title="YouTube"><i class="fa-brands fa-youtube"></i></a>
        </div>
      </div>
      <div class="p-info">
        <div class="p-block"><h3><i class="fa-solid fa-graduation-cap"></i> Education</h3><p style="color:var(--ink-2)">${p.education}</p></div>
        <div class="p-block"><h3><i class="fa-solid fa-briefcase"></i> Experience</h3><p style="color:var(--ink-2)">${p.experience}</p></div>
        <div class="p-block"><h3><i class="fa-solid fa-code"></i> Skills</h3>
          <div class="skill-chips">${p.skills.map(s => `<span>${s}</span>`).join("")}</div>
        </div>
      </div>
    </div>
  </div>`;
}

/* ----- Settings ----- */
function viewSettings() {
  return `
  <div class="view">
    <div class="section-head"><div><span class="eyebrow-sm">Preferences</span><h1>Settings</h1></div></div>
    <div class="form-panel" style="max-width:720px">
      <h2 style="margin-bottom:14px">Account</h2>
      <div class="form-row">
        <div class="field"><label>Full Name</label><input type="text" value="${DATA.instructor.name}" /></div>
        <div class="field"><label>Email</label><input type="email" value="${DATA.instructor.email}" /></div>
      </div>
      <div class="form-row">
        <div class="field"><label>Timezone</label><select><option>Asia/Karachi (GMT+5)</option><option>UTC</option><option>Asia/Dubai</option></select></div>
        <div class="field"><label>Language</label><select><option>English</option><option>Urdu</option></select></div>
      </div>
      <h2 style="margin:20px 0 14px">Notifications</h2>
      <label style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--line)"><span>Email me when a student enrolls</span><input type="checkbox" checked /></label>
      <label style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--line)"><span>New assignment submissions</span><input type="checkbox" checked /></label>
      <label style="display:flex;justify-content:space-between;padding:10px 0"><span>Weekly earnings report</span><input type="checkbox" /></label>
      <div class="step-nav">
        <button class="btn-ghost" data-action="cancel-settings">Cancel</button>
        <button class="btn-primary" data-action="save-settings"><i class="fa-solid fa-check"></i> Save Changes</button>
      </div>
    </div>
  </div>`;
}

/* ==========================================================
   VIEW ROUTER
   ========================================================== */
const VIEWS = {
  dashboard: viewDashboard, courses: viewCourses, create: viewCreate,
  assignments: viewAssignments, students: viewStudents, quizzes: viewQuizzes,
  analytics: viewAnalytics, messages: viewMessages, earnings: viewEarnings,
  profile: viewProfile, settings: viewSettings
};

let chartTimer = null;

function render(view) {
  const root = $("#viewRoot");
  if (!root) return;
  state.view = view;

  // Stop anything still running from the previous view
  stopCounters();
  if (window.gsap) gsap.killTweensOf(root.querySelectorAll("*"));
  if (chartTimer) { clearTimeout(chartTimer); chartTimer = null; }
  if (view !== "analytics") destroyCharts();

  root.innerHTML = (VIEWS[view] || viewDashboard)();

  // Update sidebar active
  $$(".sb-item").forEach(i => i.classList.toggle("active", i.dataset.view === view));

  // Counters
  $$(".counter", root).forEach(c => animateCounter(c, +c.dataset.count, c.dataset.prefix || "", c.dataset.suffix || ""));

  // Reveal — always make content visible first, animation is purely additive
  const reveals = $$(".reveal", root);
  reveals.forEach(n => n.classList.add("in"));
  const cards = $$(".stat-card", root);

  if (window.gsap && !reduceMotion()) {
    const plain = reveals.filter(n => !n.classList.contains("stat-card"));
     if (plain.length) gsap.fromTo(plain, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .5, stagger: .06, ease: "power2.out", overwrite: "auto", clearProps: "opacity,transform" });
    if (cards.length) gsap.fromTo(cards, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .45, stagger: .08, ease: "power2.out", overwrite: "auto", clearProps: "opacity,transform" });
  }

  // Charts if analytics
  if (view === "analytics") chartTimer = setTimeout(() => { chartTimer = null; initCharts(); }, 120);

  // Close mobile sidebar
  $("#sidebar")?.classList.remove("open");
  $("#scrim")?.classList.remove("on");
  window.scrollTo({ top: 0, behavior: reduceMotion() ? "auto" : "smooth" });
}

/* ==========================================================
   CHARTS
   ========================================================== */
function destroyCharts() {
  Object.values(state.chartInstances).forEach(c => { try { c?.destroy?.(); } catch (_) {} });
  state.chartInstances = {};
}

/** Safely build a chart only when its canvas is still on the page. */
function makeChart(key, sel, config) {
  const cv = $(sel);
  if (!cv || !cv.isConnected) return;
  try { state.chartInstances[key] = new Chart(cv, config); }
  catch (err) { console.warn("Chart skipped:", key, err); }
}

function initCharts() {
  if (!window.Chart) return;
  if (state.view !== "analytics") return;      // user already navigated away
  const grid = { color: "rgba(0,0,0,.05)" };
  const anim = reduceMotion() ? false : { duration: 1200, easing: "easeOutQuart" };
  const common = { responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: { grid: { display: false } }, y: { grid, beginAtZero: true } },
    animation: anim };
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul"];

  destroyCharts();

  makeChart("growth", "#chartGrowth", {
    type: "line",
    data: { labels: months, datasets: [{ data: [420,610,890,1240,1780,2420,3120], borderColor: "#2F80ED", backgroundColor: "rgba(47,128,237,.15)", fill: true, tension: .4, pointRadius: 4 }] },
    options: common
  });
  makeChart("revenue", "#chartRevenue", {
    type: "bar",
    data: { labels: months, datasets: [{ data: [3200,4800,6100,7400,9800,11200,12480], backgroundColor: "#FFAA00", borderRadius: 8 }] },
    options: common
  });
  makeChart("enroll", "#chartEnroll", {
    type: "doughnut",
    data: { labels: ["React","Python","MERN","UI/UX","ML"], datasets: [{ data: [1284,964,1520,612,480], backgroundColor: ["#2F80ED","#FFAA00","#16A34A","#EF4444","#8B5CF6"], borderWidth: 0 }] },
    options: { responsive: true, maintainAspectRatio: false, animation: anim, plugins: { legend: { position: "bottom", labels: { boxWidth: 12 } } }, cutout: "60%" }
  });
  makeChart("completion", "#chartCompletion", {
    type: "bar",
    data: { labels: ["React","Python","MERN","UI/UX","ML","DevOps"], datasets: [{ data: [78,64,71,82,55,42], backgroundColor: "#2F80ED", borderRadius: 8 }] },
    options: { ...common, indexAxis: "y" }
  });
  makeChart("activity", "#chartActivity", {
    type: "line",
    data: { labels: ["W1","W2","W3","W4","W5","W6","W7","W8"], datasets: [
      { label: "Lessons", data: [24,32,28,41,38,52,47,60], borderColor: "#FFAA00", backgroundColor: "rgba(255,170,0,.15)", fill: true, tension: .4 },
      { label: "Quizzes", data: [8,12,10,14,11,18,15,22], borderColor: "#2F80ED", backgroundColor: "rgba(47,128,237,.12)", fill: true, tension: .4 }
    ]},
    options: { ...common, plugins: { legend: { display: true, position: "top" } } }
  });
}

/* ==========================================================
   CREATE COURSE — dynamic modules/lessons
   ========================================================== */
let mSeq = 1, lSeq = 1;
function addModule() {
  state.createDraft.modules.push({ id: mSeq++, title: "", description: "", lessons: [] });
  rerenderModules();
}
function removeModule(id) {
  state.createDraft.modules = state.createDraft.modules.filter(m => m.id !== +id);
  rerenderModules();
}
function addLesson(mid) {
  const m = state.createDraft.modules.find(m => m.id === +mid);
  if (!m) return;
  m.lessons.push({ id: lSeq++, title: "", description: "", duration: "", videoUrl: "", notes: "" });
  rerenderModules();
}
function removeLesson(mid, lid) {
  const m = state.createDraft.modules.find(m => m.id === +mid);
  if (!m) return;
  m.lessons = m.lessons.filter(l => l.id !== +lid);
  rerenderModules();
}
function rerenderModules() {
  const list = $("#moduleList");
  if (list) list.innerHTML = state.createDraft.modules.map(moduleMarkup).join("");
  refreshPreview();
}

/* Sync form fields into draft */
function syncCreateForm() {
  const d = state.createDraft;
  ["title","category","price","duration","difficulty","language","description","requirements","outcomes","tags"].forEach(k => {
    const n = $(`#f-${k}`); if (n) d[k] = n.type === "number" ? +n.value : n.value;
  });
  // Modules/lessons
  $$("#moduleList .module").forEach(mn => {
    const m = d.modules.find(x => x.id === +mn.dataset.mid); if (!m) return;
    mn.querySelectorAll("[data-mfield]").forEach(f => { m[f.dataset.mfield] = f.value; });
    mn.querySelectorAll(".lesson").forEach(ln => {
      const l = m.lessons.find(x => x.id === +ln.dataset.lid); if (!l) return;
      ln.querySelectorAll("[data-lfield]").forEach(f => { l[f.dataset.lfield] = f.value; });
    });
  });
  refreshPreview();
}

async function submitCourseForApproval() {
  const d = state.createDraft;
  if (!d.title || !d.title.trim()) { toast("Please enter a course title", "warn"); return; }

  const session = window.TechNova?.getSession?.();
  if (!session) { toast("Please log in again", "error"); return; }

  const payload = {
    title: d.title, category: d.category, price: d.price, duration: d.duration,
    difficulty: d.difficulty, language: d.language, description: d.description,
    requirements: d.requirements, outcomes: d.outcomes, tags: d.tags,
    modules: d.modules,
  };

  // Optimistic local card so the instructor sees it immediately as "pending"
  const localId = Date.now();
  DATA.courses.unshift({
    id: localId, title: d.title, category: d.category, students: 0, rating: 0,
    duration: d.duration, lessons: d.modules.reduce((a, m) => a + m.lessons.length, 0),
    status: "pending",
    thumb: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop",
    price: d.price, difficulty: d.difficulty,
  });
  render("courses");

  try {
    await window.TechNova.addCourse(payload, session);
    toast("Sent for approval ⏳", "An admin will review and approve this course before it goes live.", "success");
  } catch (err) {
    const msg = err?.message === "not-configured"
      ? "Firebase isn't connected yet — paste your project config into js/firebase.js (see README-FIREBASE.md)."
      : (err?.message || "Please try again.");
    toast("Couldn't submit course", msg, "error", 6000);
  }
}
async function loadMyCoursesFromFirestore() {
  const session = window.TechNova?.getSession?.();
  if (!session) return; // guard.js will already be redirecting if there's no session

  DATA.instructor.name = session.name || "";
  DATA.instructor.email = session.email || "";

  if (!window.TechNova?.listInstructorCourses) return;
  try {
    const mine = await window.TechNova.listInstructorCourses(session.uid);
    DATA.courses = mine.map((c) => ({
      id: c.id, title: c.title, category: c.category, students: c.students || 0,
      rating: c.rating || 0, duration: c.duration, lessons: (c.modules || []).reduce((a, m) => a + (m.lessons?.length || 0), 0),
      status: c.status === "approved" ? "published" : c.status,
      thumb: c.thumb || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop",
      price: c.price, difficulty: c.difficulty,
    }));
    DATA.stats[0].value = DATA.courses.length;
    DATA.stats[1].value = DATA.courses.reduce((a, c) => a + (c.students || 0), 0);
    render(state.view);
  } catch (err) { /* Firestore not configured yet — dashboard just stays empty */ }
}
if (document.readyState !== "loading") loadMyCoursesFromFirestore();
else document.addEventListener("DOMContentLoaded", loadMyCoursesFromFirestore);

/* ==========================================================
   GLOBAL EVENT HANDLERS
   ========================================================== */
document.addEventListener("click", e => {
  // Ripple on primary/ghost buttons
  const btn = e.target.closest(".btn-primary, .btn-ghost, .btn-danger, .icon-btn");
  if (btn && !btn.dataset.rippled) { ripple({ currentTarget: btn, clientX: e.clientX, clientY: e.clientY }); }

  // Navigation via data-view
  const nav = e.target.closest("[data-view]");
  if (nav) { e.preventDefault(); render(nav.dataset.view); return; }

  // Actions
  const action = e.target.closest("[data-action]");
  if (!action) return;
  const a = action.dataset.action;
  const id = action.dataset.id;

  switch (a) {
    case "new-course": render("create"); break;
    case "edit-course": toast("Opening course editor…", "info"); render("create"); break;
    case "view-course": {
      const c = DATA.courses.find(x => x.id === +id);
      if (c) openModal(`
        <h2>${c.title}</h2>
        <p style="margin-top:8px">${c.category} · ${c.difficulty || "Intermediate"} · ${c.duration}</p>
        <img src="${c.thumb}" style="width:100%;border-radius:12px;margin:14px 0" />
        <div class="mc-meta" style="display:flex;gap:14px;flex-wrap:wrap;font-size:13px;color:var(--muted)">
          <span><i class="fa-solid fa-users"></i> ${fmt(c.students)} students</span>
          <span><i class="fa-solid fa-star"></i> ${c.rating}</span>
          <span><i class="fa-solid fa-list"></i> ${c.lessons} lessons</span>
          <span><i class="fa-solid fa-dollar-sign"></i> ${money(c.price)}</span>
        </div>
        <div style="display:flex;gap:8px;margin-top:16px">
          <button class="btn-ghost" data-close>Close</button>
          <button class="btn-primary" onclick="window.open('https://youtube.com/watch?v=dQw4w9WgXcQ','_blank')"><i class="fa-solid fa-play"></i> Preview Video</button>
        </div>`);
      break;
    }
    case "delete-course": {
      openModal(`<h2>Delete course?</h2><p style="margin:10px 0">This action cannot be undone. All lessons and student progress data will be removed.</p>
        <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:14px">
          <button class="btn-ghost" data-close>Cancel</button>
          <button class="btn-danger" id="confirmDel"><i class="fa-solid fa-trash"></i> Delete</button>
        </div>`);
      $("#confirmDel")?.addEventListener("click", () => {
        const idx = DATA.courses.findIndex(x => x.id === +id);
        if (idx >= 0) DATA.courses.splice(idx, 1);
        closeModal(); toast("Course deleted", "success"); render(state.view);
      });
      break;
    }
    case "save-draft": syncCreateForm(); toast("Draft saved locally", "success"); break;
    case "publish-course": syncCreateForm(); submitCourseForApproval(); break;
    case "next-step": syncCreateForm(); if (state.createStep < 4) { state.createStep++; render("create"); } break;
    case "prev-step": syncCreateForm(); if (state.createStep > 1) { state.createStep--; render("create"); } break;
    case "add-module": syncCreateForm(); addModule(); break;
    case "remove-module": syncCreateForm(); removeModule(action.dataset.mid); break;
    case "add-lesson": syncCreateForm(); addLesson(action.dataset.mid); break;
    case "remove-lesson": syncCreateForm(); removeLesson(action.dataset.mid, action.dataset.lid); break;
    case "view-assignment":
    case "edit-assignment":
    case "grade-assignment": {
      const asg = DATA.assignments.find(x => x.id === +id);
      if (!asg) { toast("Assignment not found", "error"); break; }
      openModal(`<h2>${asg.name}</h2><p style="margin-top:6px">${asg.course} · Due ${asg.deadline}</p>
        <div style="margin:14px 0;padding:14px;background:var(--bg);border-radius:12px">
          <b>${asg.submissions}</b> student submissions · <b>${Math.floor(asg.submissions*0.7)}</b> graded
        </div>
        <button class="btn-primary" data-close>Close</button>`);
      break;
    }
    case "new-assignment":
      openModal(`<h2>New Assignment</h2>
        <div class="field" style="margin:12px 0"><label>Name</label><input class="i" type="text" placeholder="Assignment title" /></div>
        <div class="field" style="margin:12px 0"><label>Course</label>
          <select>${DATA.courses.map(c=>`<option>${c.title}</option>`).join("")}</select></div>
        <div class="field" style="margin:12px 0"><label>Deadline</label><input type="date" /></div>
        <button class="btn-primary" data-close>Create Assignment</button>`);
      break;
    case "new-quiz":
      openModal(`<h2>New Quiz</h2><p style="margin:10px 0">Build a quiz with multiple-choice questions.</p>
        <div class="field" style="margin:12px 0"><label>Quiz Name</label><input type="text" /></div>
        <div class="field" style="margin:12px 0"><label>Course</label>
          <select>${DATA.courses.map(c=>`<option>${c.title}</option>`).join("")}</select></div>
        <button class="btn-primary" data-close>Create</button>`);
      break;
    case "edit-quiz":
    case "preview-quiz":
    case "quiz-results": {
      const q = DATA.quizzes.find(x => x.id === +id);
      if (!q) { toast("Quiz not found", "error"); break; }
      openModal(`<h2>${q.name}</h2>
        <div style="margin:14px 0;padding:14px;background:var(--bg);border-radius:12px">
          <b>${q.attempts}</b> attempts · <b>${q.avgScore}%</b> average score · <b>${q.questions}</b> questions
        </div>
        <button class="btn-primary" data-close>Close</button>`);
      break;
    }
    case "view-student": {
      const s = DATA.students.find(x => x.name === action.dataset.name);
      if (!s) { toast("Student not found", "error"); break; }
      openModal(`<div style="text-align:center"><img src="https://i.pravatar.cc/120?img=${s.avatar}" style="width:96px;height:96px;border-radius:50%;margin-bottom:10px" />
        <h2>${s.name}</h2><p>${s.course}</p>
        <div class="pb-mini" style="width:100%;margin:14px 0"><span style="width:${s.progress}%"></span></div>
        <b>${s.progress}% complete</b></div>
        <button class="btn-primary" style="margin-top:14px;width:100%" data-close>Close</button>`);
      break;
    }
    case "message-student":
      state.activeChat = 1; render("messages"); toast(`Opened chat with ${action.dataset.name}`, "info"); break;
    case "edit-profile":
      openModal(`<h2>Edit Profile</h2>
        <div class="field" style="margin:12px 0"><label>Full Name</label><input type="text" value="${DATA.instructor.name}" /></div>
        <div class="field" style="margin:12px 0"><label>Bio</label><textarea>${DATA.instructor.bio}</textarea></div>
        <button class="btn-primary" data-close>Save</button>`);
      break;
    case "save-settings": toast("Settings saved", "success"); break;
    case "cancel-settings": render("dashboard"); break;
    case "logout": openModal(`<h2>Sign out?</h2><p style="margin:10px 0">You'll be redirected to the login page.</p>
      <div style="display:flex;gap:8px;justify-content:flex-end"><button class="btn-ghost" data-close>Cancel</button>
      <button class="btn-primary" id="confirmLogout">Sign out</button></div>`);
      document.getElementById("confirmLogout")?.addEventListener("click", () =>
        window.TechNova ? window.TechNova.logout() : (location.href = "authentication.html"));
      break;
    case "upgrade": openModal(`<h2>Go Pro Instructor</h2><p style="margin:10px 0">Unlock advanced analytics, featured listings and priority support.</p>
      <ul style="margin:12px 0;padding-left:20px;color:var(--muted);font-size:13px">
        <li>Featured on homepage</li><li>Advanced student insights</li><li>Custom certificate templates</li><li>Priority payouts</li></ul>
      <button class="btn-primary" data-close style="width:100%">Upgrade — $19/mo</button>`); break;
    case "withdraw": toast("Withdrawal request submitted. Funds arrive in 3-5 days.", "success"); break;
    case "help":
    case "privacy": case "terms": case "support":
      toast("This page is under development.", "info"); break;
  }
});

/* Live typing sync for create course form */
document.addEventListener("input", e => {
  if (state.view !== "create") return;
  if (e.target.matches("[id^='f-'], [data-mfield], [data-lfield]")) {
    syncCreateForm();
    const t = $("#pv-title"); if (t && e.target.id === "f-title") t.textContent = state.createDraft.title || "Your course title";
  }
});

/* Upload boxes (UI only) */
document.addEventListener("click", e => {
  const up = e.target.closest("[data-upload]");
  if (!up) return;
  up.classList.add("has-file");
  up.innerHTML = `<i class="fa-solid fa-circle-check"></i><b>File selected</b><small>dummy_file.png · 240 KB</small>`;
  toast("File attached (UI only)", "success");
});

/* Chat handling */
document.addEventListener("click", e => {
  const item = e.target.closest(".cl-item");
  if (item) { state.activeChat = +item.dataset.chat; render("messages"); }
});
document.addEventListener("submit", e => {
  if (e.target.id === "chatForm") {
    e.preventDefault();
    const inp = $("#chatInput"); const txt = inp ? inp.value.trim() : ""; if (!txt) return;
    const chat = DATA.chats.find(c => c.id === state.activeChat);
    const body = $("#cpBody");
    if (!chat || !body) return;
    chat.messages.push({ from: "out", text: txt });
    chat.last = txt;
    inp.value = "";
    body.insertAdjacentHTML("beforeend", `<div class="msg out">${txt}</div>`);
    body.scrollTop = body.scrollHeight;
    // Fake reply
    setTimeout(() => {
      if (!body.isConnected) return;
      chat.messages.push({ from: "in", text: "Got it, thanks sir!" });
      body.insertAdjacentHTML("beforeend", `<div class="msg in">Got it, thanks sir!</div>`);
      body.scrollTop = body.scrollHeight;
    }, 900);
  }
});

/* ==========================================================
   TOPBAR: theme, notifications, profile
   ========================================================== */
function initTopbar() {
  const themeBtn = $("#themeToggle");
  themeBtn?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeBtn.querySelector("i").className = document.body.classList.contains("dark") ? "fa-regular fa-sun" : "fa-regular fa-moon";
    if (state.view === "analytics") setTimeout(initCharts, 100);
  });

  // Notifications
  const bell = $("#bellBtn"), panel = $("#notifPanel");
  bell?.addEventListener("click", e => {
    if (e.target.closest("#notifPanel")) return;
    e.stopPropagation();
    panel?.classList.toggle("open");
  });
  const nList = $("#notifList");
  if (nList) nList.innerHTML = DATA.notifications.map(n => `
    <a href="#" class="np-item"><div class="np-ic ${n.tone}"><i class="fa-solid ${n.icon}"></i></div>
    <div><b>${n.text}</b><span>${n.time}</span></div></a>`).join("");
  $("#markAllRead")?.addEventListener("click", e => { e.preventDefault(); toast("All notifications marked as read", "success"); panel?.classList.remove("open"); });

  // Messages button
  $("#msgBtn")?.addEventListener("click", () => render("messages"));

  // Profile dropdown
  const pBtn = $("#profileBtn"), pDrop = $("#profileDropdown");
  pBtn?.addEventListener("click", e => {
    if (e.target.closest("#profileDropdown")) return; // let dropdown links/buttons work normally
    e.stopPropagation();
    pDrop?.classList.toggle("open");
  });
  document.addEventListener("click", (e) => {
    if (!panel?.contains(e.target) && !bell?.contains(e.target)) panel?.classList.remove("open");
    if (!pBtn?.contains(e.target)) pDrop?.classList.remove("open");
  });

  // Search
  $("#searchInput")?.addEventListener("keydown", e => {
    if (e.key === "Enter" && e.target.value.trim()) {
      toast(`Searching for "${e.target.value}"…`, "info");
    }
  });
  document.addEventListener("keydown", e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); $("#searchInput")?.focus(); }
  });
}

/* ==========================================================
   SIDEBAR
   ========================================================== */
function initSidebar() {
  const sb = $("#sidebar"), sc = $("#scrim");
  if (!sb) return;
  $("#burger")?.addEventListener("click", () => { sb.classList.add("open"); sc?.classList.add("on"); });
  sc?.addEventListener("click", () => { sb.classList.remove("open"); sc.classList.remove("on"); });
  $("#sbCollapse")?.addEventListener("click", () => {
    sb.classList.toggle("collapsed");
    document.body.classList.toggle("sb-collapsed", sb.classList.contains("collapsed"));
    // charts need a resize pass after the layout width changes
    if (state.view === "analytics") setTimeout(() => Object.values(state.chartInstances).forEach(c => c?.resize?.()), 320);
  });
  window.addEventListener("keydown", e => { if (e.key === "Escape") { sb.classList.remove("open"); sc?.classList.remove("on"); } });
}

/* ==========================================================
   CUSTOM CURSOR (desktop)
   ========================================================== */
function initCursor() {
  if (window.matchMedia("(max-width: 900px)").matches) return;
  const dot = $(".cursor-dot"), ring = $(".cursor-ring");
  if (!dot || !ring) return;
  let x = 0, y = 0, rx = 0, ry = 0;
  document.addEventListener("mousemove", e => { x = e.clientX; y = e.clientY; dot.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`; });
  const loop = () => { rx += (x - rx) * .18; ry += (y - ry) * .18; ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`; requestAnimationFrame(loop); };
  loop();
  document.addEventListener("mouseover", e => { if (e.target.closest("a,button,.icourse,.stat-card")) document.body.classList.add("cursor-active"); });
  document.addEventListener("mouseout", e => { if (e.target.closest("a,button,.icourse,.stat-card")) document.body.classList.remove("cursor-active"); });
}

/* ==========================================================
   INIT
   ========================================================== */
function initSeedDraft() {
  // Seed one module + one lesson so builder shows something
  state.createDraft.modules = [
    { id: mSeq++, title: "Getting Started", description: "Introduction and setup.", lessons: [
      { id: lSeq++, title: "Welcome to the course", description: "Overview and prerequisites.", duration: "8m", videoUrl: "", notes: "" }
    ]}
  ];
}

document.addEventListener("DOMContentLoaded", () => {
  const today = new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  const chip = $("#todayChip"); if (chip) chip.textContent = today;
  const yr = $("#year"); if (yr) yr.textContent = new Date().getFullYear();
  initSeedDraft();
  initSidebar();
  initTopbar();
  initCursor();
  render("dashboard");
});