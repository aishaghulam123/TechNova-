
/* ---------- AOS ---------- */
AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 60 });

/* ---------- GSAP + ScrollTrigger ---------- */
gsap.registerPlugin(ScrollTrigger);

/* Parallax: blobs & grid drift */
gsap.utils.toArray('.blob').forEach((el, i) => {
  gsap.to(el, {
    y: () => (i % 2 === 0 ? -120 : 120),
    x: () => (i % 2 === 0 ? 60 : -60),
    ease: 'none',
    scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: true }
  });
});

/* Hero visual subtle parallax */
const heroVisual = document.querySelector('.hero-visual');
if (heroVisual) {
  gsap.to(heroVisual, {
    y: -60, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });
}

/* Section headers reveal with GSAP as an upgrade over AOS */
gsap.utils.toArray('.section-head').forEach(head => {
  gsap.from(head.children, {
    y: 40, opacity: 0, duration: .9, stagger: .12, ease: 'power3.out',
    scrollTrigger: { trigger: head, start: 'top 82%' }
  });
});

/* ---------- Scroll progress bar ---------- */
const progress = document.querySelector('.scroll-progress span');
if (progress) {
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
    progress.style.width = (scrolled * 100) + '%';
  }, { passive: true });
}

/* ---------- Custom cursor ---------- */
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let tx = 0, ty = 0, rx = 0, ry = 0;
window.addEventListener('mousemove', e => {
  tx = e.clientX; ty = e.clientY;
  dot.style.transform = `translate(${tx}px,${ty}px) translate(-50%,-50%)`;
});
(function loop(){
  rx += (tx - rx) * 0.18; ry += (ty - ry) * 0.18;
  ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
  requestAnimationFrame(loop);
})();
document.addEventListener('mouseover', e => {
  const t = e.target.closest('a,button,[data-magnetic],details summary');
  document.body.classList.toggle('cursor-active', !!t);
});

/* ---------- Magnetic buttons ---------- */
document.querySelectorAll('[data-magnetic]').forEach(el => {
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    gsap.to(el, { x: x * 0.25, y: y * 0.4, duration: .4, ease: 'power3.out' });
    el.style.setProperty('--x', (e.clientX - r.left) + 'px');
    el.style.setProperty('--y', (e.clientY - r.top) + 'px');
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(el, { x: 0, y: 0, duration: .6, ease: 'elastic.out(1,.5)' });
  });
});

/* ---------- 3D tilt on cards ---------- */
document.querySelectorAll('[data-tilt]').forEach(card => {
  const strength = 8;
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(card, {
      rotateY: px * strength,
      rotateX: -py * strength,
      transformPerspective: 800,
      transformOrigin: 'center',
      duration: .4, ease: 'power2.out'
    });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { rotateX: 0, rotateY: 0, duration: .8, ease: 'elastic.out(1,.55)' });
  });
});

/* ---------- Animated counters ---------- */
document.querySelectorAll('[data-count]:not(.psc-num)').forEach(el => {
  const target = +el.dataset.count;
  const suffix = el.dataset.suffix || '';
  ScrollTrigger.create({
    trigger: el, start: 'top 85%', once: true,
    onEnter: () => {
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target, duration: 2, ease: 'power3.out',
        onUpdate: () => { el.textContent = Math.round(obj.v).toLocaleString() + suffix; }
      });
    }
  });
});

/* Skill bars fill when in view */
ScrollTrigger.create({
  trigger: '.a-skills', start: 'top 82%', once: true,
  onEnter: () => document.querySelector('.a-skills').classList.add('in-view')
});

/* ---------- Nav: theme-aware + scrolled shadow ---------- */
const nav = document.getElementById('nav');
const darkSections = document.querySelectorAll('section[data-theme="dark"]');
const io = new IntersectionObserver(() => {
  // The navbar goes dark whenever a dark section sits under it
  const anyDark = [...darkSections].some(s => {
    const r = s.getBoundingClientRect();
    return r.top < 120 && r.bottom > 120;
  });
  nav.classList.toggle('dark', anyDark);
}, { threshold: [0, .35, .6, 1], rootMargin: '-80px 0px 0px 0px' });
darkSections.forEach(s => io.observe(s));

/* ---------- Success stories slider ---------- */
const track = document.getElementById('storyTrack');
const prev = document.getElementById('s-prev');
const next = document.getElementById('s-next');
if (track && prev && next) {
  let index = 0;
  const total = track.children.length;
  function perView() {
    const w = window.innerWidth;
    if (w <= 640) return 1;
    if (w <= 1000) return 2;
    return 3;
  }
  function update() {
    const pv = perView();
    const max = Math.max(0, total - pv);
    if (index > max) index = max;
    const card = track.children[0];
    const step = card.getBoundingClientRect().width + 22;
    track.style.transform = `translateX(${-index * step}px)`;
  }
  prev.addEventListener('click', () => { index = Math.max(0, index - 1); update(); });
  next.addEventListener('click', () => { index = index + 1; update(); });
  window.addEventListener('resize', update);
  update();
}

/* ---------- Smooth anchor scrolling for older browsers ---------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      const t = document.querySelector(id);
      if (t) { e.preventDefault(); window.scrollTo({ top: t.offsetTop - 80, behavior: 'smooth' }); }
    }
  });
});

/* ---------- Footer year ---------- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- Mobile nav toggle ---------- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.addEventListener('click', e => { if (e.target.tagName === 'A') navLinks.classList.remove('open'); });
}

/* ---------- Contact form (swap for a Firestore write later) ---------- */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    if (!contactForm.checkValidity()) { contactForm.reportValidity(); return; }
    
    document.getElementById('contactFormOk')?.classList.add('show');
    contactForm.reset();
  });
}

/* ---------- Newsletter ---------- */
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = document.getElementById('newsletterBtn');
    btn.textContent = 'Subscribed ✓';
    btn.disabled = true;
    newsletterForm.reset();
  });
}
