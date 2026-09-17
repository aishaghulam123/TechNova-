

(function () {
  'use strict';

  /* ---------- Config ---------- */
  const HQ = { x: 218, y: 148 };

  const CITIES = [
    { id: 'karachi',     name: 'Karachi',     x: 185, y: 425, students: 2450, courses: 35, success: 96 },
    { id: 'lahore',      name: 'Lahore',      x: 298, y: 210, students: 2180, courses: 32, success: 95 },
    { id: 'islamabad',   name: 'Islamabad',   x: 235, y: 142, students: 1840, courses: 30, success: 97 },
    { id: 'rawalpindi',  name: 'Rawalpindi',  x: 222, y: 158, students: 1620, courses: 28, success: 94 },
    { id: 'faisalabad',  name: 'Faisalabad',  x: 268, y: 248, students: 1340, courses: 26, success: 93 },
    { id: 'multan',      name: 'Multan',      x: 238, y: 310, students: 980,  courses: 22, success: 92 },
    { id: 'peshawar',    name: 'Peshawar',    x: 168, y: 108, students: 1120, courses: 24, success: 94 },
    { id: 'quetta',      name: 'Quetta',      x: 88,  y: 318, students: 780,  courses: 18, success: 91 },
    { id: 'hyderabad',   name: 'Hyderabad',   x: 205, y: 378, students: 890,  courses: 20, success: 93 },
    { id: 'sialkot',     name: 'Sialkot',     x: 310, y: 178, students: 720,  courses: 16, success: 95 }
  ];

  const section = document.getElementById('presence');
  if (!section) return;

  const pinsGroup   = document.getElementById('cityPins');
  const connGroup   = document.getElementById('connLines');
  const mapTilt     = document.getElementById('mapTilt');
  const mapStage    = document.getElementById('mapStage');
  const tooltip     = document.getElementById('mapTooltip');
  const chartsWrap  = document.getElementById('presenceCharts');

  let chartsBuilt = false;
  let activeCity  = null;
  let tooltipRAF  = null;
  let tiltRAF     = null;

  /* ---------- Build SVG city pins ---------- */
  function buildCityPins() {
    const frag = document.createDocumentFragment();

    CITIES.forEach((city) => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', 'city-pin');
      g.setAttribute('data-city', city.id);
      g.setAttribute('transform', `translate(${city.x}, ${city.y})`);
      g.setAttribute('tabindex', '0');
      g.setAttribute('role', 'button');
      g.setAttribute('aria-label', `${city.name}: ${city.students.toLocaleString()} students`);

      g.innerHTML = `
        <circle class="pin-pulse" r="14"/>
        <circle class="pin-ring" r="10"/>
        <circle class="pin-glow" r="6"/>
        <circle class="pin-core" r="3"/>
      `;

      g.addEventListener('mouseenter', () => showTooltip(city));
      g.addEventListener('mouseleave', hideTooltip);
      g.addEventListener('focus', () => showTooltip(city));
      g.addEventListener('blur', hideTooltip);

      frag.appendChild(g);
    });

    pinsGroup.appendChild(frag);
  }

  /* ---------- Build animated connection lines HQ → cities ---------- */
  function buildConnectionLines() {
    CITIES.forEach((city, i) => {
      if (city.id === 'islamabad') return;

      const midX = (HQ.x + city.x) / 2;
      const midY = (HQ.y + city.y) / 2 - 30 - (i % 3) * 8;
      const d = `M ${HQ.x} ${HQ.y} Q ${midX} ${midY} ${city.x} ${city.y}`;

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      path.setAttribute('data-conn', city.id);

      const len = path.getTotalLength();
      path.style.setProperty('--len', len);
      path.style.strokeDasharray = len;
      path.style.strokeDashoffset = len;

      connGroup.appendChild(path);
    });
  }

  /* ---------- Continuous line draw animation ---------- */
  function animateConnectionLines() {
    const paths = connGroup.querySelectorAll('path');

    ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        paths.forEach((path, i) => {
          const len = path.getTotalLength();
          path.style.strokeDasharray = `${len}`;
          path.style.strokeDashoffset = `${len}`;

          const draw = () => {
            gsap.fromTo(path,
              { strokeDashoffset: len },
              {
                strokeDashoffset: 0,
                duration: 2.4,
                ease: 'power2.inOut',
                delay: i * 0.1,
                onComplete: () => {
                  gsap.to(path, {
                    strokeDashoffset: -len,
                    duration: 3,
                    ease: 'none',
                    onComplete: draw
                  });
                }
              }
            );
          };
          draw();
        });
      }
    });
  }

  /* ---------- Tooltip ---------- */
  function showTooltip(city) {
    activeCity = city;
    tooltip.querySelector('.mt-city').textContent = city.name;
    tooltip.querySelector('.mt-students em').textContent = city.students.toLocaleString();
    tooltip.querySelector('.mt-courses em').textContent = city.courses;
    tooltip.querySelector('.mt-success em').textContent = city.success + '%';
    tooltip.classList.add('is-visible');
    tooltip.setAttribute('aria-hidden', 'false');

    document.querySelectorAll('.city-pin').forEach((pin) => {
      pin.classList.toggle('is-hovered', pin.dataset.city === city.id);
    });
  }

  function hideTooltip() {
    activeCity = null;
    tooltip.classList.remove('is-visible');
    tooltip.setAttribute('aria-hidden', 'true');
    document.querySelectorAll('.city-pin').forEach((pin) => pin.classList.remove('is-hovered'));
  }

  /** Tooltip follows cursor smoothly inside map stage */
  function initTooltipFollow() {
    mapStage.addEventListener('mousemove', (e) => {
      if (!activeCity) return;

      if (tooltipRAF) cancelAnimationFrame(tooltipRAF);
      tooltipRAF = requestAnimationFrame(() => {
        const rect = mapStage.getBoundingClientRect();
        const x = e.clientX - rect.left + 18;
        const y = e.clientY - rect.top - 12;
        const maxX = rect.width - tooltip.offsetWidth - 12;
        const maxY = rect.height - tooltip.offsetHeight - 12;

        tooltip.style.left = Math.min(Math.max(x, 12), maxX) + 'px';
        tooltip.style.top  = Math.min(Math.max(y, 12), maxY) + 'px';
      });
    });
  }

  /* ---------- Map tilt on mouse movement ---------- */
  function initMapTilt() {
    const strength = 6;

    mapStage.addEventListener('mousemove', (e) => {
      if (tiltRAF) cancelAnimationFrame(tiltRAF);
      tiltRAF = requestAnimationFrame(() => {
        const rect = mapStage.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(mapTilt, {
          rotateY: px * strength,
          rotateX: -py * strength,
          duration: 0.5,
          ease: 'power2.out',
          transformPerspective: 900
        });
      });
    });

    mapStage.addEventListener('mouseleave', () => {
      gsap.to(mapTilt, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.55)'
      });
    });
  }

  /* ---------- Chart.js dashboard ---------- */
  function buildCharts() {
    if (chartsBuilt || typeof Chart === 'undefined') return;
    chartsBuilt = true;

    const gold    = '#FFAA00';
    const blue    = '#2F80ED';
    const muted   = '#75767A';
    const gridClr = 'rgba(15,16,18,.06)';

    const baseOpts = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1800,
        easing: 'easeOutQuart'
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#0F1012',
          titleFont: { family: 'Space Grotesk', size: 12 },
          bodyFont: { family: 'Inter', size: 11 },
          padding: 10,
          cornerRadius: 10
        }
      }
    };

    /* Student Growth — line */
    new Chart(document.getElementById('chartGrowth'), {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          data: [8200, 9800, 11200, 13400, 15800, 18500],
          borderColor: blue,
          backgroundColor: 'rgba(47,128,237,.12)',
          fill: true,
          tension: 0.42,
          borderWidth: 2.5,
          pointRadius: 0,
          pointHoverRadius: 4
        }]
      },
      options: {
        ...baseOpts,
        scales: {
          x: { grid: { display: false }, ticks: { color: muted, font: { size: 10 } } },
          y: { display: false }
        }
      }
    });

    /* Course Completion — doughnut */
    new Chart(document.getElementById('chartCompletion'), {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'In Progress', 'Not Started'],
        datasets: [{
          data: [68, 22, 10],
          backgroundColor: [gold, blue, 'rgba(15,16,18,.08)'],
          borderWidth: 0,
          hoverOffset: 6
        }]
      },
      options: {
        ...baseOpts,
        cutout: '68%',
        plugins: {
          ...baseOpts.plugins,
          legend: {
            display: true,
            position: 'bottom',
            labels: { boxWidth: 8, font: { size: 9 }, color: muted, padding: 8 }
          }
        }
      }
    });

    /* Enrollment Distribution — polar area */
    new Chart(document.getElementById('chartEnrollment'), {
      type: 'polarArea',
      data: {
        labels: ['Karachi', 'Lahore', 'Islamabad', 'Others'],
        datasets: [{
          data: [28, 24, 18, 30],
          backgroundColor: [
            'rgba(255,170,0,.75)',
            'rgba(47,128,237,.65)',
            'rgba(255,170,0,.45)',
            'rgba(47,128,237,.35)'
          ],
          borderWidth: 0
        }]
      },
      options: {
        ...baseOpts,
        scales: { r: { display: false } },
        plugins: {
          ...baseOpts.plugins,
          legend: {
            display: true,
            position: 'bottom',
            labels: { boxWidth: 8, font: { size: 9 }, color: muted, padding: 8 }
          }
        }
      }
    });

    /* Weekly Active Students — bar */
    new Chart(document.getElementById('chartWeekly'), {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          data: [4200, 5100, 4800, 5600, 6200, 3900, 2800],
          backgroundColor: (ctx) => {
            const chart = ctx.chart;
            const { ctx: c, chartArea } = chart;
            if (!chartArea) return gold;
            const grad = c.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
            grad.addColorStop(0, blue);
            grad.addColorStop(1, gold);
            return grad;
          },
          borderRadius: 6,
          borderSkipped: false
        }]
      },
      options: {
        ...baseOpts,
        scales: {
          x: { grid: { display: false }, ticks: { color: muted, font: { size: 10 } } },
          y: { display: false, grid: { color: gridClr } }
        }
      }
    });
  }

  /* ---------- GSAP ScrollTrigger entrance animations ---------- */
  function initScrollAnimations() {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 72%',
        once: true
      }
    });

    /* Heading slides from left */
    tl.from('.presence-heading', {
      x: -60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, 0);

    /* Eyebrow + description fade upward */
    tl.from('.presence-eyebrow', {
      y: 20,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out'
    }, 0.1);

    tl.from('.presence-desc', {
      y: 30,
      opacity: 0,
      duration: 0.85,
      ease: 'power2.out'
    }, 0.2);

    /* Statistics cards stagger */
    tl.from('[data-presence-stat]', {
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out'
    }, 0.35);

    /* Map scales from 0.8 → 1 */
    tl.from('.map-stage', {
      scale: 0.8,
      opacity: 0,
      duration: 1.1,
      ease: 'power3.out'
    }, 0.25);

    /* Pins appear one after another */
    tl.from('.city-pin', {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: 'back.out(1.6)',
      transformOrigin: 'center center'
    }, 0.7);

    /* Charts fade in */
    tl.from('.pch-card', {
      y: 24,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      onStart: buildCharts
    }, 0.85);
  }

  /* ---------- Presence-specific counter (section-scoped) ---------- */
  function initPresenceCounters() {
    section.querySelectorAll('.psc-num[data-count]').forEach((el) => {
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';

      ScrollTrigger.create({
        trigger: section,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target,
            duration: 2.2,
            ease: 'power3.out',
            onUpdate: () => {
              el.textContent = Math.round(obj.v).toLocaleString() + suffix;
            }
          });
        }
      });
    });
  }

  /* ---------- Stat card hover micro-interactions (GSAP enhancement) ---------- */
  function initStatCardHovers() {
    section.querySelectorAll('.presence-stat-card').forEach((card) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card.querySelector('.psc-icon'), {
          rotation: 15,
          scale: 1.1,
          duration: 0.4,
          ease: 'power2.out'
        });
        gsap.to(card.querySelector('.psc-num'), {
          scale: 1.08,
          duration: 0.35,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card.querySelector('.psc-icon'), {
          rotation: 0,
          scale: 1,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)'
        });
        gsap.to(card.querySelector('.psc-num'), {
          scale: 1,
          duration: 0.4,
          ease: 'power2.out'
        });
      });
    });
  }

  /* ---------- Init ---------- */
  function init() {
    buildCityPins();
    buildConnectionLines();
    initTooltipFollow();
    initMapTilt();
    initScrollAnimations();
    animateConnectionLines();
    initPresenceCounters();
    initStatCardHovers();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
