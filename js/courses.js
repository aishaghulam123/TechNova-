

const q  = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const grid    = q("#courseGrid");
const empty   = q("#emptyState");
const counter = q("#resultCount");
const search  = q("#searchInput");
const catSel  = q("#catFilter");
const diffSel = q("#diffFilter");
const sortSel = q("#sortBy");

q("#year").textContent = new Date().getFullYear();

[...new Set(CATALOG.map((c) => c.cat))].sort().forEach((cat) => {
  const o = document.createElement("option");
  o.value = o.textContent = cat;
  catSel.appendChild(o);
});

const params = new URLSearchParams(location.search);
if (params.get("cat")) catSel.value = params.get("cat");
if (params.get("q")) search.value = params.get("q");

/* One card of markup — the whole card links to the dynamic detail page */
const cardHTML = (c) => `
  <a class="cat-card" id="course-${esc(c.id)}" data-course-id="${esc(c.id)}" href="course-detail.html?id=${encodeURIComponent(c.id)}">
    <div class="thumb">
      <img src="${c.img}" alt="${esc(c.title)}" loading="lazy" />
      <span class="badge">${esc(c.diff)}</span>
    </div>
    <div class="body">
      <span class="cat">${esc(c.cat)}</span>
      <h3>${esc(c.title)}</h3>
      <p class="instr"><i class="fa-solid fa-chalkboard-user"></i> ${esc(c.instr)}</p>
      <div class="meta">
        <span><i class="fa-regular fa-clock"></i> ${esc(c.duration)}</span>
        <span><i class="fa-solid fa-list-check"></i> ${c.lessons} lessons</span>
        <span><i class="fa-solid fa-star" style="color:var(--gold)"></i> ${c.rating}</span>
      </div>
      <div class="foot">
        <span class="price">${esc(c.price)}</span>
        <span class="btn-primary btn-sm">View course <i class="fa-solid fa-arrow-right"></i></span>
      </div>
    </div>
  </a>`;

/* Filter + sort + render */
function render() {
  const term = search.value.trim().toLowerCase();
  let list = CATALOG.filter((c) => {
    const matchText = !term || c.title.toLowerCase().includes(term) || c.instr.toLowerCase().includes(term) || c.cat.toLowerCase().includes(term);
    return matchText && (!catSel.value || c.cat === catSel.value) && (!diffSel.value || c.diff === diffSel.value);
  });

  if (sortSel.value === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
  else if (sortSel.value === "az") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
  else list = [...list].sort((a, b) => b.students - a.students);

  grid.innerHTML = list.map(cardHTML).join("");
  empty.style.display = list.length ? "none" : "block";
  counter.textContent = `${list.length} course${list.length === 1 ? "" : "s"} found`;

  if (window.gsap && !reduceMotion() && list.length) {
    gsap.from(grid.children, { opacity: 0, y: 18, duration: .45, stagger: .05, ease: "power2.out", clearProps: "all", overwrite: "auto" });
  }
}

[search, catSel, diffSel, sortSel].forEach((el) => el.addEventListener("input", render));
render();


async function mergeApprovedCourses() {
  if (!window.TechNova?.listApprovedCourses) return;
  try {
    const real = await window.TechNova.listApprovedCourses();
    if (!real.length) return;
    real.forEach((c) => {
      CATALOG.push({
        id: `fs-${c.id}`, title: c.title, instr: c.instructorName || "TechNova Instructor",
        cat: c.category || "General", diff: c.difficulty || "Beginner", duration: c.duration || "",
        lessons: (c.modules || []).reduce((a, m) => a + (m.lessons?.length || 0), 0),
        rating: c.rating || 0, students: c.students || 0, price: `$${c.price ?? 0}`,
        img: c.thumb || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop",
      });
      if (!catSel.querySelector(`option[value="${CSS.escape(c.category || "General")}"]`)) {
        const o = document.createElement("option");
        o.value = o.textContent = c.category || "General";
        catSel.appendChild(o);
      }
    });
    render();
  } catch (err) { }
}
mergeApprovedCourses();

/* Page entrance */
window.addEventListener("load", () => {
  if (window.gsap && !reduceMotion()) {
    gsap.from(".reveal-js", { opacity: 0, y: 16, duration: .5, stagger: .1, ease: "power2.out", clearProps: "all" });
  }
});
