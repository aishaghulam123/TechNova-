
/* ---------- Nav: theme-aware + scrolled shadow ---------- */
const nav = document.getElementById('nav');
const darkSections = document.querySelectorAll('section[data-theme="dark"]');
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.intersectionRatio > 0.35) {
      nav.classList.add('dark');
    }
  });
  // fallback: if none intersecting in top area, light
  const anyDark = [...darkSections].some(s => {
    const r = s.getBoundingClientRect();
    return r.top < 120 && r.bottom > 120;
  });
  nav.classList.toggle('dark', anyDark);
}, { threshold: [0, .35, .6, 1], rootMargin: '-80px 0px 0px 0px' });
darkSections.forEach(s => io.observe(s));

//filter  seruch //   
function filterCourseCards() {
  // Search query get karein aur lowercase karein
  const searchValue = document.getElementById('courseSearchInput').value.toLowerCase().trim();
  
  // Tamam Bootstrap Columns (.col) ko select karein
  const columns = document.querySelectorAll('.row-cols-1 .col');

  columns.forEach(col => {
    // Card ke andar mojood title (.card-title) aur description (.card-text) ka text nikaalein
    const title = col.querySelector('.card-title')?.textContent.toLowerCase() || '';
    const text = col.querySelector('.card-text')?.textContent.toLowerCase() || '';

    // Check karein ke query title ya text mein exist karti hai
    if (title.includes(searchValue) || text.includes(searchValue)) {
      col.style.display = ""; // Card show karein (Bootstrap grid layout ke sath)
    } else {
      col.style.display = "none"; // Card hide karein
    }
  });
}



  function changePage(event, page) {
    // 1. Hero Section par smooth scroll karne ke liye
    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    }

    // 2. Active Class Toggle Logic
    if (typeof page === 'number') {
      const pageButtons = document.querySelectorAll('.page-btn');
      pageButtons.forEach(btn => btn.classList.remove('active'));

      // Jis button par click hua usko active state dena
      event.currentTarget.classList.add('active');
    }
  }
  
