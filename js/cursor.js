
(() => {
  "use strict";

  if (window.matchMedia("(max-width: 900px)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const dot  = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  if (!dot || !ring) return;

  let x = 0, y = 0, rx = 0, ry = 0;

  window.addEventListener("mousemove", (e) => {
    x = e.clientX; y = e.clientY;
    dot.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;
  }, { passive: true });

  (function loop() {
    rx += (x - rx) * .18;
    ry += (y - ry) * .18;
    ring.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  })();

  const HOT = "a,button,input,select,textarea,.cat-card,.module-btn,.role-card,.tab";
  document.addEventListener("mouseover", (e) => {
    document.body.classList.toggle("cursor-active", !!e.target.closest(HOT));
  });
})();
