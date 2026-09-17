
(() => {
  "use strict";

  const grid = document.getElementById("homeCourseGrid");
  if (!grid || typeof CATALOG === "undefined") return;

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const limit = +grid.dataset.limit || 6;

  const cardHTML = (c) => `
    <a class="cat-card" id="home-course-${esc(c.id)}" data-course-id="${esc(c.id)}"
       href="pages/course-detail.html?id=${encodeURIComponent(c.id)}">
      <div class="thumb">
        <img src="${esc(c.img)}" alt="${esc(c.title)}" loading="lazy" />
        <span class="badge">${esc(c.diff)}</span>
      </div>
      <div class="body">
        <span class="cat">${esc(c.cat)}</span>
        <h3>${esc(c.title)}</h3>
        <p class="instr"><i class="ri-user-star-line"></i> ${esc(c.instr)}</p>
        <div class="meta">
          <span><i class="ri-time-line"></i> ${esc(c.duration)}</span>
          <span><i class="ri-list-check-2"></i> ${c.lessons} lessons</span>
          <span><i class="ri-star-fill star"></i> ${c.rating}</span>
        </div>
        <div class="foot">
          <span class="price">${esc(c.price)}</span>
          <span class="cc-link">View course <i class="ri-arrow-right-line"></i></span>
        </div>
      </div>
    </a>`;

  grid.innerHTML = CATALOG.slice(0, limit).map(cardHTML).join("");

  /* Stagger the cards in once they scroll into view */
  if (window.gsap && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.from(grid.children, {
      opacity: 0, y: 24, duration: .55, stagger: .08, ease: "power2.out",
      clearProps: "all",
      scrollTrigger: { trigger: grid, start: "top 85%", once: true }
    });
  }
})();
