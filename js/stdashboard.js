
const courses = [];
const certificates = [];
const recommended = [
  { title: "TypeScript Deep Dive",    instr: "Sara Ahmed",  rating: 4.9, price: "$129", img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600&auto=format&fit=crop" },
  { title: "System Design Interview", instr: "Bilal Raza",  rating: 4.8, price: "$199", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop" },
  { title: "GraphQL for Product Devs",instr: "Hina Malik",  rating: 4.7, price: "$149", img: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=600&auto=format&fit=crop" },
  { title: "Docker & Kubernetes",     instr: "Zain Abbas",  rating: 4.9, price: "$179", img: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=600&auto=format&fit=crop" },
  { title: "Prompt Engineering",      instr: "Dr. Fatima",  rating: 5.0, price: "$99",  img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop" },
  { title: "Advanced CSS & Motion",   instr: "Sara Ahmed",  rating: 4.9, price: "$119", img: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=600&auto=format&fit=crop" },
];
const liveClasses = [
  { d: "18", m: "Nov", title: "State Management with Zustand", instr: "Sara Ahmed",  time: "6:00 PM PKT" },
  { d: "20", m: "Nov", title: "FastAPI in Production",         instr: "Bilal Raza",  time: "8:30 PM PKT" },
  { d: "22", m: "Nov", title: "RAG with Vector Databases",     instr: "Dr. Fatima",  time: "7:00 PM PKT" },
  { d: "25", m: "Nov", title: "Terraform on AWS",              instr: "Hina Malik",  time: "9:00 PM PKT" },
];
const activities = [
  { type: "s", icon: "fa-circle-check",    title: "Completed lesson: Suspense & Streaming", time: "12 min ago" },
  { type: "b", icon: "fa-file-pen",        title: "Submitted assignment: REST API design",  time: "2 hours ago" },
  { type: "g", icon: "fa-clipboard-check", title: "Scored 92% on JavaScript quiz",         time: "Yesterday" },
  { type: "g", icon: "fa-award",           title: "Earned certificate: JavaScript Mastery", time: "3 days ago" },
  { type: "b", icon: "fa-comment",         title: "New reply from Sara Ahmed",              time: "4 days ago" },
];
const notifications = [
  { icon: "fa-file-pen",  title: "Assignment due tomorrow",  msg: "REST API design — Backend course",    tone: "gold" },
  { icon: "fa-video",     title: "Live class in 2 hours",    msg: "State Management with Zustand",        tone: "" },
  { icon: "fa-sparkles",  title: "New course available",     msg: "Prompt Engineering with GPT-5",        tone: "gold" },
  { icon: "fa-award",     title: "You unlocked a badge",     msg: "Consistency Champion · 15-day streak", tone: "" },
];

const YOUTUBE_LESSON_URL = "https://www.youtube.com/watch?v=zOjov-2OZ0E"; // Intro to CS — beginner

/* ---------- Helpers ---------- */
const $  = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));

/* ---------- Toast ---------- */
const toastWrap = $("#toastWrap");
const toast = (msg, kind = "info", ms = 2600) => {
  const el = document.createElement("div");
  const iconMap = { info: "fa-circle-info", success: "fa-circle-check", warn: "fa-triangle-exclamation", error: "fa-circle-xmark" };
  el.className = `toast ${kind}`;
  el.innerHTML = `<i class="fa-solid ${iconMap[kind] || iconMap.info}"></i><span>${esc(msg)}</span>`;
  toastWrap.appendChild(el);
  setTimeout(() => { el.classList.add("leaving"); setTimeout(() => el.remove(), 300); }, ms);
};

/* ---------- Modal ---------- */
const modal = $("#modal");
const modalBody = $("#modalBody");
const openModal = (html) => { modalBody.innerHTML = html; modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; };
const closeModal = () => { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; modalBody.innerHTML = ""; };
modal.addEventListener("click", (e) => { if (e.target.hasAttribute("data-close")) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

/* ---------- Date ---------- */
const today = new Date();
$("#todayDate").textContent = today.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
$("#year").textContent = today.getFullYear();

/* ---------- Render: My courses ---------- */
const diffClass = (d) => d === "Beginner" ? "beg" : d === "Advanced" ? "adv" : "int";
const renderCourses = () => {
  $("#coursesGrid").innerHTML = courses.map((c, i) => `
    <article class="course-card" data-idx="${i}" data-completed="${c.progress >= 100}">
      <div class="course-thumb">
        <img src="${c.img}" alt="${esc(c.title)}" loading="lazy" />
        <span class="course-diff ${diffClass(c.diff)}">${c.diff}</span>
      </div>
      <div class="course-body">
        <span class="course-cat">${c.cat}</span>
        <h4>${esc(c.title)}</h4>
        <p class="course-instr"><i class="fa-solid fa-chalkboard-user"></i> ${esc(c.instr)}</p>
        <div class="progress"><span style="--v:${c.progress}%"></span></div>
        <div class="course-meta">
          <span><i class="fa-regular fa-clock"></i> ${c.duration}</span>
          <span>${c.progress}% complete</span>
        </div>
        <button class="btn-primary btn-sm course-cta" data-action="open-course" data-idx="${i}"><i class="fa-solid fa-play"></i> ${c.progress >= 100 ? "Review" : "Continue"}</button>
      </div>
    </article>
  `).join("");
};
renderCourses();

/* ---------- Render: Certificates ---------- */
const renderCertificates = () => {
  $("#certGrid").innerHTML = certificates.map((c, i) => `
  <div class="cert-card">
    <div class="cert-seal"><i class="fa-solid fa-award"></i></div>
    <h4>${esc(c.title)}</h4>
    <p class="cert-date"><i class="fa-regular fa-calendar"></i> ${esc(c.date)}</p>
    <div class="cert-actions">
      <button data-action="view-cert" data-idx="${i}"><i class="fa-regular fa-eye"></i> View</button>
      <button class="primary" data-action="download-cert" data-idx="${i}"><i class="fa-solid fa-download"></i> Download</button>
    </div>
  </div>
`).join("");
};
renderCertificates();

/* ---------- Render: Recommended ---------- */
$("#recTrack").innerHTML = recommended.map((r, i) => `
  <article class="rec-card">
    <div class="rec-thumb"><img src="${r.img}" alt="${esc(r.title)}" loading="lazy" /></div>
    <h4>${esc(r.title)}</h4>
    <p class="rec-instr"><i class="fa-solid fa-chalkboard-user"></i> ${esc(r.instr)}</p>
    <div class="rec-foot">
      <span class="rec-rating"><i class="fa-solid fa-star"></i> ${r.rating}</span>
      <span class="rec-price">${r.price}</span>
    </div>
    <button class="btn-primary btn-sm" data-action="enroll" data-idx="${i}"><i class="fa-solid fa-bolt"></i> Enroll</button>
  </article>
`).join("");

/* ---------- Render: Live classes ---------- */
$("#liveList").innerHTML = liveClasses.map((l, i) => `
  <li class="tl-item">
    <div class="tl-date"><b>${l.d}</b><span>${l.m}</span></div>
    <div class="tl-info"><b>${esc(l.title)}</b><span>${esc(l.instr)} · ${esc(l.time)}</span></div>
    <button class="tl-join" data-action="join-live" data-idx="${i}">Join</button>
  </li>
`).join("");

/* ---------- Render: Activity ---------- */
$("#activityList").innerHTML = activities.map(a => `
  <li class="act-item">
    <span class="act-icon ${a.type}"><i class="fa-solid ${a.icon}"></i></span>
    <div class="act-body"><b>${esc(a.title)}</b><span>${esc(a.time)}</span></div>
  </li>
`).join("");

/* ---------- Render: Notifications (mini + panel) ---------- */
const notifHTML = notifications.map(n => `
  <li class="nm-item ${n.tone}">
    <i class="fa-solid ${n.icon}"></i>
    <div><b>${esc(n.title)}</b><span>${esc(n.msg)}</span></div>
  </li>
`).join("");
$("#notifMini").innerHTML = notifHTML;
$("#notifList").innerHTML = notifHTML;

/* ---------- Sidebar ---------- */
const sidebar = $("#sidebar");
const scrim = $("#scrim");
$("#sbCollapse").addEventListener("click", () => sidebar.classList.toggle("collapsed"));
$("#burger").addEventListener("click", () => { sidebar.classList.add("open"); scrim.classList.add("on"); });
scrim.addEventListener("click", () => { sidebar.classList.remove("open"); scrim.classList.remove("on"); });

const navigate = (label) => {
  $$(".sb-item").forEach(i => i.classList.toggle("active", i.dataset.nav === label));
  if (window.innerWidth < 900) { sidebar.classList.remove("open"); scrim.classList.remove("on"); }
  const targets = {
    "Dashboard":     () => window.scrollTo({ top: 0, behavior: "smooth" }),
    "My Courses":    () => document.querySelector(".courses-grid")?.scrollIntoView({ behavior: "smooth", block: "start" }),
    "Continue":      () => continueLearning(),
    "Assignments":   () => toast("You have 3 pending assignments.", "warn"),
    "Quizzes":       () => openQuiz(),
    "Certificates":  () => document.querySelector(".cert-grid")?.scrollIntoView({ behavior: "smooth", block: "start" }),
    "Wishlist":      () => openWishlistModal(),
    "Messages":      () => toast("No new messages.", "info"),
    "Profile":       () => openProfileModal(),
    "Settings":      () => openSettingsModal(),
  };
  targets[label]?.();
};

$$(".sb-item, .brand").forEach(item => item.addEventListener("click", (e) => {
  if (item.dataset.action === "logout") return;            // handled below
  const href = item.getAttribute("href");
  if (href && href !== "#") return;                        // real page link (index.html, courses.html)
  e.preventDefault();
  const label = item.dataset.nav;
  if (label) navigate(label);
}));

/* ---------- Dark mode ---------- */
const themeBtn = $("#themeToggle");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeBtn.querySelector("i").className = document.body.classList.contains("dark") ? "fa-regular fa-sun" : "fa-regular fa-moon";
});

/* ---------- Dropdowns ---------- */
const profileBtn = $("#profileBtn");
const profileDropdown = $("#profileDropdown");
const bellBtn = $("#bellBtn");
const notifPanel = $("#notifPanel");
profileBtn.addEventListener("click", (e) => {
  if (e.target.closest("#profileDropdown")) return; // let dropdown links behave normally (open modal, then close via the outside-click handler below)
  e.stopPropagation();
  profileDropdown.classList.toggle("open");
  notifPanel.classList.remove("open");
});
bellBtn.addEventListener("click", (e) => {
  if (e.target.closest("#notifPanel")) return;
  e.stopPropagation();
  notifPanel.classList.toggle("open");
  profileDropdown.classList.remove("open");
});
document.addEventListener("click", (e) => {
  if (!profileBtn.contains(e.target)) profileDropdown.classList.remove("open");
  if (!bellBtn.contains(e.target) && !notifPanel.contains(e.target)) notifPanel.classList.remove("open");
});
$("#markAllRead").addEventListener("click", (e) => {
  e.preventDefault();
  $("#notifList").querySelectorAll(".nm-item").forEach(el => el.style.opacity = ".55");
  $(".bell .dot").style.display = "none";
  toast("All notifications marked as read.", "success");
});
$("#seeAllNotif").addEventListener("click", (e) => { e.preventDefault(); notifPanel.classList.add("open"); });

/* ---------- Ripple on primary buttons ---------- */
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-primary");
  if (!btn) return;
  const r = document.createElement("span");
  r.className = "ripple";
  const rect = btn.getBoundingClientRect();
  r.style.left = `${e.clientX - rect.left}px`;
  r.style.top = `${e.clientY - rect.top}px`;
  r.style.width = r.style.height = "20px";
  btn.appendChild(r);
  setTimeout(() => r.remove(), 650);
});

/* ---------- Magnetic buttons ---------- */
$$(".magnetic").forEach(el => {
  el.addEventListener("mousemove", (e) => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.22}px, ${y * 0.3}px)`;
  });
  el.addEventListener("mouseleave", () => { el.style.transform = ""; });
});

/* ---------- Custom cursor (fast) ---------- */
if (window.matchMedia("(min-width: 900px)").matches && !window.matchMedia("(hover: none)").matches) {
  const dot = $(".cursor-dot"), ring = $(".cursor-ring");
  let tx = 0, ty = 0, rx = 0, ry = 0, running = false;
  const loop = () => {
    rx += (tx - rx) * 0.35;
    ry += (ty - ry) * 0.35;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
    if (Math.abs(tx - rx) > 0.1 || Math.abs(ty - ry) > 0.1) requestAnimationFrame(loop);
    else running = false;
  };
  window.addEventListener("mousemove", (e) => {
    tx = e.clientX; ty = e.clientY;
    dot.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%)`;
    if (!running) { running = true; requestAnimationFrame(loop); }
  }, { passive: true });
  document.addEventListener("mouseover", (e) => {
    document.body.classList.toggle("cursor-active",
      !!e.target.closest("a, button, .course-card, .rec-card, .cert-card, .profile, .quiz-opt, .tl-item"));
  });
} else {
  $(".cursor-dot").style.display = "none";
  $(".cursor-ring").style.display = "none";
}

/* ---------- Recommended slider ---------- */
const recTrack = $("#recTrack");
let recOffset = 0;
const recStep = 276;
const recClamp = () => Math.max(0, recTrack.scrollWidth - recTrack.parentElement.clientWidth);
$("#recNext").addEventListener("click", () => { recOffset = Math.min(recOffset + recStep, recClamp()); recTrack.style.transform = `translateX(-${recOffset}px)`; });
$("#recPrev").addEventListener("click", () => { recOffset = Math.max(recOffset - recStep, 0); recTrack.style.transform = `translateX(-${recOffset}px)`; });

/* ---------- Chip tabs: course filter ---------- */
const applyFilter = (filter, query = "") => {
  const q = query.trim().toLowerCase();
  let visible = 0;
  $$(".course-card").forEach(card => {
    const c = courses[+card.dataset.idx];
    const completed = c.progress >= 100;
    const filterOk = filter === "all" || (filter === "completed" && completed) || (filter === "progress" && !completed);
    const searchOk = !q || c.title.toLowerCase().includes(q) || c.instr.toLowerCase().includes(q) || c.cat.toLowerCase().includes(q);
    const show = filterOk && searchOk;
    card.classList.toggle("hidden", !show);
    if (show) visible++;
  });
  $("#coursesEmpty").style.display = visible === 0 ? "block" : "none";
};
let currentFilter = "all";
$("#courseTabs").addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  $("#courseTabs").querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
  chip.classList.add("active");
  currentFilter = chip.dataset.filter;
  applyFilter(currentFilter, $("#searchInput").value);
});

/* ---------- Search ---------- */
$("#searchInput").addEventListener("input", (e) => {
  applyFilter(currentFilter, e.target.value);
  document.querySelector(".courses-grid")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
});
document.addEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); $("#searchInput").focus(); }
});

/* ---------- Chart range tabs (removed with analytics section) ---------- */
const rangeTabsEl = $("#rangeTabs");
if (rangeTabsEl) {
  rangeTabsEl.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    rangeTabsEl.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    const range = chip.dataset.range;
    const hr = $("#hoursRange");
    if (hr) hr.textContent = range === "week" ? "Last 7 days" : "Last 4 weeks";
    if (window.hoursChart) {
      window.hoursChart.data.labels = range === "week"
        ? ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
        : ["Wk 1","Wk 2","Wk 3","Wk 4"];
      window.hoursChart.data.datasets[0].data = range === "week"
        ? [1.5, 2.2, 1.8, 2.6, 3.1, 1.2, 2.8]
        : [12, 15, 11, 18];
      window.hoursChart.update();
    }
  });
}


/* ---------- Counters ---------- */
const runCounter = (el) => {
  const target = +el.dataset.count;
  const suffix = el.dataset.suffix || "";
  const dur = 1400, start = performance.now();
  const step = (t) => {
    const p = Math.min((t - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased).toLocaleString() + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

/* ---------- Reveal on scroll ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    el.classList.add("in");
    el.querySelectorAll(".counter").forEach(runCounter);
    el.querySelectorAll(".progress").forEach(p => {
      if (window.gsap) {
        const bar = p.querySelector("span");
        const v = bar?.style.getPropertyValue("--v") || "0%";
        gsap.fromTo(bar, { width: "0%" }, { width: v, duration: 1.2, ease: "power3.out" });
      } else {
        p.classList.add("animate");
      }
    });
    io.unobserve(el);
  });
}, { threshold: 0.12 });
$$(".reveal").forEach(el => io.observe(el));

/* ---------- GSAP page load ---------- */
window.addEventListener("load", () => {
  if (!window.gsap) return;
  gsap.from(".sidebar", { x: -40, opacity: 0, duration: .7, ease: "power3.out" });
  gsap.from(".topbar > *", { y: -20, opacity: 0, duration: .6, stagger: .06, ease: "power3.out", delay: .15 });
  gsap.from(".hero-copy > *", { y: 24, opacity: 0, duration: .7, stagger: .08, ease: "power3.out", delay: .3 });
  gsap.from(".hero-art > *", { scale: .8, opacity: 0, duration: .8, stagger: .1, ease: "back.out(1.6)", delay: .5 });
  gsap.from(".stat-card", { y: 20, opacity: 0, duration: .6, stagger: .1, ease: "power3.out", delay: .5 });
});

/* ---------- Charts ---------- */
window.addEventListener("load", () => {
  if (!window.Chart) return;
  const gold = "#FFAA00", blue = "#2F80ED";
  const gridColor = document.body.classList.contains("dark") ? "rgba(255,255,255,.06)" : "rgba(15,16,18,.06)";
  Chart.defaults.animation.duration = 0; // we trigger manually on visible

  const hoursCtx = $("#hoursChart");
  if (hoursCtx) {
    const g = hoursCtx.getContext("2d").createLinearGradient(0, 0, 0, 180);
    g.addColorStop(0, "rgba(47,128,237,.85)");
    g.addColorStop(1, "rgba(47,128,237,.15)");
    window.hoursChart = new Chart(hoursCtx, {
      type: "bar",
      data: { labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
        datasets: [{ label: "Hours", data: [1.5, 2.2, 1.8, 2.6, 3.1, 1.2, 2.8], backgroundColor: g, borderRadius: 10, borderSkipped: false, barThickness: 22 }]},
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { backgroundColor: "#0F1012", padding: 10, cornerRadius: 8 } },
        animation: false,
        scales: {
          x: { grid: { display: false }, ticks: { color: "#9AA0AA", font: { size: 11 } } },
          y: { grid: { color: gridColor }, ticks: { color: "#9AA0AA", font: { size: 11 } }, beginAtZero: true }
        }
      }
    });
  }
  const donutCtx = $("#donutChart");
  if (donutCtx) {
    window.donutChart = new Chart(donutCtx, {
      type: "doughnut",
      data: { labels: ["Frontend","Backend","AI","DevOps"],
        datasets: [{ data: [68, 42, 25, 55], backgroundColor: [gold, blue, "#F5C56B", "#7AAEF3"], borderWidth: 0, hoverOffset: 8 }]},
      options: {
        responsive: true, maintainAspectRatio: false, cutout: "68%",
        plugins: {
          legend: { position: "bottom", labels: { color: "#6B7280", font: { size: 11 }, boxWidth: 10, boxHeight: 10, padding: 12 } },
          tooltip: { backgroundColor: "#0F1012", padding: 10, cornerRadius: 8 }
        },
        animation: false
      }
    });
  }

  // Animate charts when scrolled into view
  const chartIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const canvas = entry.target;
      const chart = canvas.id === "hoursChart" ? window.hoursChart : window.donutChart;
      if (chart) { chart.reset(); chart.update({ duration: 1100, easing: "easeOutQuart" }); }
      chartIO.unobserve(canvas);
    });
  }, { threshold: 0.3 });
  [hoursCtx, donutCtx].filter(Boolean).forEach(c => chartIO.observe(c));
});

/* =========================================================
   Feature: Continue Learning → YouTube (temporary)
   ========================================================= */
const continueLearning = () => {
  toast("Opening lesson in a new tab…", "info", 1800);
  window.open(YOUTUBE_LESSON_URL, "_blank", "noopener");
};

/* =========================================================
   Feature: Certificates — View & Download
   ========================================================= */
const certPreviewHTML = (cert) => `
  <h2>Certificate</h2>
  <p class="sub">Preview and download your official TechNova Academy certificate.</p>
  <div class="cert-preview" id="certPreview">
    <div class="cp-seal"><i class="fa-solid fa-award"></i></div>
    <h3>Certificate of Completion</h3>
    <h1>TechNova Academy</h1>
    <p>This is proudly presented to</p>
    <div class="cp-name">Ayesha Khan</div>
    <p>for successfully completing the course</p>
    <div class="cp-course">${esc(cert.title)}</div>
    <div class="cp-foot">
      <div><span>Issued</span><b>${esc(cert.date)}</b></div>
      <div><span>Certificate ID</span><b>${esc(cert.id)}</b></div>
    </div>
  </div>
  <div class="modal-actions">
    <button class="btn-primary" data-action="download-cert-modal"><i class="fa-solid fa-download"></i> Download PDF</button>
    <button class="btn-ghost" data-close>Close</button>
  </div>
`;

const downloadCertPDF = (cert) => {
  if (!window.jspdf) { toast("PDF library still loading — try again.", "warn"); return; }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();
  // border
  doc.setDrawColor(255, 170, 0); doc.setLineWidth(6); doc.rect(24, 24, w - 48, h - 48);
  doc.setDrawColor(47, 128, 237); doc.setLineWidth(1.5); doc.rect(36, 36, w - 72, h - 72);
  // title
  doc.setFont("helvetica", "bold"); doc.setFontSize(14); doc.setTextColor(120, 120, 120);
  doc.text("CERTIFICATE OF COMPLETION", w / 2, 110, { align: "center" });
  doc.setFontSize(34); doc.setTextColor(15, 16, 18);
  doc.text("TechNova Academy", w / 2, 160, { align: "center" });
  doc.setFont("helvetica", "normal"); doc.setFontSize(13); doc.setTextColor(107, 114, 128);
  doc.text("This certificate is proudly presented to", w / 2, 210, { align: "center" });
  doc.setFont("helvetica", "bold"); doc.setFontSize(30); doc.setTextColor(47, 128, 237);
  doc.text("Ayesha Khan", w / 2, 260, { align: "center" });
  doc.setFont("helvetica", "normal"); doc.setFontSize(13); doc.setTextColor(107, 114, 128);
  doc.text("for successfully completing the course", w / 2, 300, { align: "center" });
  doc.setFont("helvetica", "bold"); doc.setFontSize(20); doc.setTextColor(15, 16, 18);
  doc.text(cert.title, w / 2, 340, { align: "center" });
  // footer
  doc.setFont("helvetica", "normal"); doc.setFontSize(11); doc.setTextColor(107, 114, 128);
  doc.text(`Issued: ${cert.date}`, 80, h - 80);
  doc.text(`Certificate ID: ${cert.id}`, w - 80, h - 80, { align: "right" });
  doc.setFontSize(10);
  doc.text("Authorized Signatory · TechNova Academy", w / 2, h - 60, { align: "center" });
  doc.save(`${cert.title.replace(/\s+/g, "_")}_Certificate.pdf`);
  toast("Certificate downloaded.", "success");
};

/* =========================================================
   Feature: Quiz
   ========================================================= */
const QUIZ = [
  { q: "What does CPU stand for?", opts: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Control Panel Unit"], a: 0 },
  { q: "Which device is used to move the cursor on screen?", opts: ["Keyboard", "Mouse", "Monitor", "Speaker"], a: 1 },
  { q: "Which key is used to delete text to the left of the cursor?", opts: ["Enter", "Shift", "Backspace", "Tab"], a: 2 },
  { q: "What is often called the 'brain of the computer'?", opts: ["RAM", "Hard Drive", "GPU", "CPU"], a: 3 },
  { q: "What does WWW stand for?", opts: ["World Wide Web", "Wide Windows Web", "World Web Wire", "Web Wide World"], a: 0 },
];
let quizIdx = 0;
const quizAnswers = new Array(QUIZ.length).fill(null);

const renderQuiz = () => {
  if (quizIdx >= QUIZ.length) { renderQuizResult(); return; }
  const q = QUIZ[quizIdx];
  const pct = ((quizIdx) / QUIZ.length) * 100;
  modalBody.innerHTML = `
    <h2>Basic Computer Knowledge</h2>
    <p class="sub">Test your fundamentals — ${QUIZ.length} quick questions.</p>
    <div class="quiz-progress"><span style="width:${pct}%"></span></div>
    <span class="quiz-count">Question ${quizIdx + 1} of ${QUIZ.length}</span>
    <div class="quiz-q">${esc(q.q)}</div>
    <div class="quiz-opts">
      ${q.opts.map((o, i) => `
        <button class="quiz-opt ${quizAnswers[quizIdx] === i ? "selected" : ""}" data-opt="${i}">
          <span class="qo-idx">${String.fromCharCode(65 + i)}</span>${esc(o)}
        </button>`).join("")}
    </div>
    <div class="quiz-nav">
      <button class="btn-ghost" data-quiz="prev" ${quizIdx === 0 ? "disabled style='opacity:.5;pointer-events:none'" : ""}><i class="fa-solid fa-arrow-left"></i> Previous</button>
      ${quizIdx === QUIZ.length - 1
        ? `<button class="btn-primary" data-quiz="submit"><i class="fa-solid fa-check"></i> Submit</button>`
        : `<button class="btn-primary" data-quiz="next">Next <i class="fa-solid fa-arrow-right"></i></button>`}
    </div>
  `;
};

const renderQuizResult = () => {
  const correct = quizAnswers.reduce((n, a, i) => n + (a === QUIZ[i].a ? 1 : 0), 0);
  const wrong = QUIZ.length - correct;
  const pct = Math.round((correct / QUIZ.length) * 100);
  const grade = pct >= 80 ? "Excellent!" : pct >= 60 ? "Good job!" : "Keep practicing!";
  modalBody.innerHTML = `
    <div class="quiz-result">
      <p class="sub" style="margin:0">Your result</p>
      <div class="quiz-score">${pct}%</div>
      <h2>${grade}</h2>
      <div class="quiz-stats">
        <div class="quiz-stat correct"><b>${correct}</b><span>Correct</span></div>
        <div class="quiz-stat wrong"><b>${wrong}</b><span>Wrong</span></div>
        <div class="quiz-stat"><b>${QUIZ.length}</b><span>Total</span></div>
      </div>
      <div class="modal-actions" style="justify-content:center">
        <button class="btn-primary" data-quiz="restart"><i class="fa-solid fa-rotate-right"></i> Restart</button>
        <button class="btn-ghost" data-close>Close</button>
      </div>
    </div>
  `;
};

const openQuiz = () => {
  quizIdx = 0; quizAnswers.fill(null);
  openModal(""); renderQuiz();
};

// Delegated quiz events
modalBody.addEventListener("click", (e) => {
  const opt = e.target.closest(".quiz-opt");
  if (opt) { quizAnswers[quizIdx] = +opt.dataset.opt; renderQuiz(); return; }
  const nav = e.target.closest("[data-quiz]");
  if (!nav) return;
  const act = nav.dataset.quiz;
  if (act === "next") {
    if (quizAnswers[quizIdx] == null) { toast("Please select an answer.", "warn"); return; }
    quizIdx++; renderQuiz();
  } else if (act === "prev") { quizIdx = Math.max(0, quizIdx - 1); renderQuiz(); }
  else if (act === "submit") {
    if (quizAnswers[quizIdx] == null) { toast("Please answer the last question.", "warn"); return; }
    renderQuizResult();
  } else if (act === "restart") { openQuiz(); }
});

/* =========================================================
   Modals: Profile / Settings / Course
   ========================================================= */
const openProfileModal = () => {
  profileDropdown.classList.remove("open");
  openModal(`
    <h2>Your Profile</h2>
    <p class="sub">Overview of your TechNova learning journey.</p>
    <div style="display:flex;gap:16px;align-items:center;margin-bottom:18px">
      <img src="https://i.pravatar.cc/160?img=47" style="width:72px;height:72px;border-radius:16px;object-fit:cover" />
      <div>
        <div style="font-family:'Space Grotesk';font-size:18px;font-weight:700">Ayesha Khan</div>
        <div style="color:var(--muted);font-size:13px">ayesha.khan@technova.io</div>
        <div style="display:flex;gap:6px;margin-top:8px"><span class="tag gold">Intermediate</span><span class="tag blue">Frontend</span></div>
      </div>
    </div>
    <div class="quiz-stats">
      <div class="quiz-stat"><b>8</b><span>Courses</span></div>
      <div class="quiz-stat"><b>5</b><span>Certificates</span></div>
      <div class="quiz-stat"><b>18</b><span>Day streak</span></div>
    </div>
    <div class="modal-actions"><button class="btn-primary" data-action="edit-profile-modal"><i class="fa-solid fa-pen"></i> Edit profile</button><button class="btn-ghost" data-close>Close</button></div>
  `);
};

const openSettingsModal = () => {
  profileDropdown.classList.remove("open");
  openModal(`
    <h2>Settings</h2>
    <p class="sub">Preferences are stored locally in this session.</p>
    <div style="display:flex;flex-direction:column;gap:14px">
      <label style="display:flex;justify-content:space-between;align-items:center;padding:14px;border:1px solid var(--line);border-radius:14px"><span><b>Dark mode</b><br><small style="color:var(--muted)">Switch theme</small></span><input type="checkbox" id="setDark" ${document.body.classList.contains("dark") ? "checked" : ""}></label>
      <label style="display:flex;justify-content:space-between;align-items:center;padding:14px;border:1px solid var(--line);border-radius:14px"><span><b>Email notifications</b><br><small style="color:var(--muted)">Weekly summary</small></span><input type="checkbox" checked></label>
      <label style="display:flex;justify-content:space-between;align-items:center;padding:14px;border:1px solid var(--line);border-radius:14px"><span><b>Sound effects</b><br><small style="color:var(--muted)">Quiz feedback</small></span><input type="checkbox"></label>
    </div>
    <div class="modal-actions"><button class="btn-primary" data-close><i class="fa-solid fa-check"></i> Save</button></div>
  `);
  $("#setDark")?.addEventListener("change", (e) => {
    document.body.classList.toggle("dark", e.target.checked);
    themeBtn.querySelector("i").className = e.target.checked ? "fa-regular fa-sun" : "fa-regular fa-moon";
  });
};

const openCourseModal = (c) => {
  openModal(`
    <h2>${esc(c.title)}</h2>
    <p class="sub">${esc(c.cat)} · ${esc(c.diff)} · ${esc(c.duration)}</p>
    <img src="${c.img}" style="width:100%;height:200px;object-fit:cover;border-radius:14px;margin-bottom:16px" alt="" />
    <p style="color:var(--ink-2);font-size:14px;margin-bottom:14px"><i class="fa-solid fa-chalkboard-user"></i> Instructor: <b>${esc(c.instr)}</b></p>
    <div class="cont-progress" style="margin-bottom:16px">
      <div class="cp-top"><b>Progress</b><span>${c.progress}%</span></div>
      <div class="progress animate"><span style="--v:${c.progress}%;width:${c.progress}%"></span></div>
    </div>
    <p style="color:var(--muted);font-size:13px;margin-bottom:18px">The full Course Details page is being developed by another team. For now, tap below to open a preview lesson.</p>
    <div class="modal-actions">
      <button class="btn-primary" data-action="watch-video"><i class="fa-solid fa-play"></i> Watch lesson</button>
      <button class="btn-ghost" data-close>Close</button>
    </div>
  `);
};

/* ---------- Wishlist (real Firestore data) ---------- */
let wishlistItems = [];

function renderWishlistBody() {
  const body = $("#wishlistModalBody");
  if (!body) return;
  if (!wishlistItems.length) {
    body.innerHTML = `<p style="color:var(--muted);text-align:center;padding:28px 0">Your wishlist is empty. Tap the heart icon on any course to save it here.</p>`;
    return;
  }
  body.innerHTML = wishlistItems.map((w) => `
    <div style="display:flex;gap:12px;align-items:center;padding:12px 0;border-bottom:1px solid var(--line)">
      <img src="${w.courseImg || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&auto=format&fit=crop"}" style="width:56px;height:56px;border-radius:12px;object-fit:cover;flex-shrink:0" alt="" />
      <div style="flex:1;min-width:0">
        <b style="display:block;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(w.courseTitle || "Untitled course")}</b>
        <span style="font-size:12px;color:var(--muted)">${esc(w.instructorName || "")}</span>
      </div>
      <button class="btn-ghost" style="padding:8px 12px" data-action="remove-wishlist" data-wid="${w.id}" aria-label="Remove from wishlist"><i class="fa-solid fa-trash"></i></button>
    </div>
  `).join("");
}

const openWishlistModal = async () => {
  profileDropdown.classList.remove("open");
  openModal(`
    <h2>Your Wishlist</h2>
    <p class="sub">Courses you've saved for later.</p>
    <div id="wishlistModalBody" style="min-height:60px">
      <p style="color:var(--muted);text-align:center;padding:24px 0"><i class="fa-solid fa-circle-notch fa-spin"></i> Loading…</p>
    </div>
    <div class="modal-actions"><button class="btn-ghost" data-close>Close</button></div>
  `);
  const session = window.TechNova?.getSession?.();
  const body = $("#wishlistModalBody");
  if (!session || !window.TechNova?.listWishlist) {
    body.innerHTML = `<p style="color:var(--muted);text-align:center;padding:24px 0">Sign in to save and view your wishlist.</p>`;
    return;
  }
  try {
    wishlistItems = await window.TechNova.listWishlist(session.uid);
    renderWishlistBody();
  } catch (err) {
    body.innerHTML = `<p style="color:var(--danger,#ef4444);text-align:center;padding:24px 0">Couldn't load your wishlist. Please try again.</p>`;
  }
};

/* =========================================================
   Global click delegation for data-action buttons
   ========================================================= */
document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-action]");
  if (!el) return;
  const act = el.dataset.action;
  const idx = +el.dataset.idx;

  const actions = {
    "continue-learning": continueLearning,
    "watch-video": continueLearning,
    "schedule": () => toast("Weekly schedule opens soon.", "info"),
    "bookmark": () => toast("Bookmarked.", "success"),
    "save-course": () => toast("Course saved to your list.", "success"),
    "open-course": () => openCourseModal(courses[idx]),
    "enroll": async () => {
      const session = window.TechNova?.getSession?.();
      if (!session || !window.TechNova?.enrollInCourse) { toast(`Enrolled in "${recommended[idx].title}".`, "success"); return; }
      try {
        await window.TechNova.enrollInCourse(session, { id: `rec-${idx}`, title: recommended[idx].title, instr: recommended[idx].instr, img: recommended[idx].img });
        toast(`Enrolled in "${recommended[idx].title}" — check My Courses!`, "success");
        loadMyEnrollments();
      } catch (err) { toast(err?.message || "Couldn't enroll — please try again.", "error"); }
    },
    "join-live": () => { toast(`Joining "${liveClasses[idx].title}"…`, "info"); setTimeout(continueLearning, 500); },
    "view-cert": () => openModal(certPreviewHTML(certificates[idx])),
    "download-cert": () => downloadCertPDF(certificates[idx]),
    "download-cert-modal": () => {
      const title = $("#certPreview .cp-course")?.textContent.trim();
      const cert = certificates.find(c => c.title === title) || certificates[0];
      downloadCertPDF(cert);
    },
    "upgrade": () => openModal(`
      <h2>Upgrade to Pro</h2>
      <p class="sub">Unlock 84+ premium courses, unlimited certificates, and 1-on-1 mentor support.</p>
      <div class="quiz-stats">
        <div class="quiz-stat"><b>$0</b><span>Free</span></div>
        <div class="quiz-stat" style="border:2px solid var(--gold)"><b>$19</b><span>Pro / mo</span></div>
        <div class="quiz-stat"><b>$49</b><span>Team / mo</span></div>
      </div>
      <div class="modal-actions"><button class="btn-primary"><i class="fa-solid fa-crown"></i> Choose Pro</button><button class="btn-ghost" data-close>Maybe later</button></div>
    `),
    "logout": () => {
      if (!confirm("Sign out of TechNova Academy?")) return;
      toast("Signed out. Redirecting…", "info");
      setTimeout(() => (window.TechNova ? window.TechNova.logout() : (location.href = "authentication.html")), 700);
    },
    "profile": openProfileModal,
    "settings": openSettingsModal,
    "billing": () => toast("Billing panel coming soon.", "info"),
    "help": () => toast("Help Center: support@technova.io", "info"),
    "remove-wishlist": async () => {
      const wid = el.dataset.wid;
      if (!wid || !window.TechNova?.removeFromWishlist) return;
      try {
        await window.TechNova.removeFromWishlist(wid);
        wishlistItems = wishlistItems.filter((w) => w.id !== wid);
        renderWishlistBody();
        toast("Removed from wishlist.", "success");
      } catch (err) { toast(err?.message || "Couldn't remove — please try again.", "error"); }
    },
    "edit-profile": openProfileModal,
    "edit-profile-modal": () => toast("Profile editor coming soon.", "info"),
    "calendar": () => toast("Calendar view is on the way.", "info"),
    "privacy": () => toast("Privacy policy — coming soon.", "info"),
    "terms": () => toast("Terms of service — coming soon.", "info"),
    "support": () => toast("Reach us at support@technova.io", "info"),
  };
  if (actions[act]) {
    e.preventDefault();
    actions[act]();
  }
});
/* ==========================================================
   FIREBASE — load THIS student's real profile + enrollments.
   Nothing dummy — a brand-new student sees an empty dashboard
   until they actually enroll in a course.
   ========================================================== */
async function loadMyEnrollments() {
  const session = window.TechNova?.getSession?.();
  if (!session) return; // guard.js already redirects if there's no session

  const firstName = (session.name || "Student").split(" ")[0];
  const nameEls = [$("#topbarName"), $("#dropdownName"), $("#welcomeName")];
  nameEls.forEach((el) => { if (el) el.textContent = session.name ? (el.id === "welcomeName" ? firstName : session.name) : el.textContent; });
  const emailEl = $("#dropdownEmail");
  if (emailEl && session.email) emailEl.textContent = session.email;

  if (!window.TechNova?.listStudentEnrollments) return;
  try {
    const mine = await window.TechNova.listStudentEnrollments(session.uid);
    courses.length = 0;
    mine.forEach((e) => courses.push({
      title: e.courseTitle, instr: e.instructorName, cat: e.courseCategory,
      diff: e.courseDifficulty, progress: e.progress || 0, duration: e.courseDuration,
      img: e.courseImg || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop",
    }));
    renderCourses();
  } catch (err) { /* Firestore not configured yet — dashboard just stays empty */ }
}
if (document.readyState !== "loading") loadMyEnrollments();
else document.addEventListener("DOMContentLoaded", loadMyEnrollments);