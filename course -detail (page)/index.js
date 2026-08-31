gsap.registerPlugin(ScrollTrigger);

// Page Load Animations
window.addEventListener('DOMContentLoaded', () => {
    const tl = gsap.timeline();

    // Navbar drop down effect
    tl.from('.nav', { opacity: 0, y: -30, duration: 0.8, ease: 'power3.out' })
      // Hero text elements reveal
      .from('.hero-text-content > *', { opacity: 0, y: 40, duration: 0.8, stagger: 0.15, ease: 'power3.out' }, '-=0.4')
      // Video container pop-in effect
      .from('.video-container', { opacity: 0, scale: 0.9, duration: 0.8, ease: 'back.out(1.4)' }, '-=0.6');
});

// ScrollTrigger Animations for Cards and Sections
gsap.utils.toArray('.gsap-reveal').forEach((card) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 50,
        duration: 0.9,
        ease: 'power3.out'
    });
});

// Mobile Navbar Toggle Function
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = navToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.replace('ri-menu-line', 'ri-close-line');
        gsap.fromTo('#navMenu', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.3 });
    } else {
        icon.classList.replace('ri-close-line', 'ri-menu-line');
    }
});

// Switch View Function with Smooth GSAP Morph
function switchView(target) {
    const paidCard = document.getElementById('paidCard');
    const unlockedCard = document.getElementById('unlockedCard');

    const current = target === 'unlocked' ? paidCard : unlockedCard;
    const next = target === 'unlocked' ? unlockedCard : paidCard;

    gsap.to(current, {
        opacity: 0,
        scale: 0.92,
        duration: 0.25,
        onComplete: () => {
            current.style.display = 'none';
            next.style.display = 'block';
            gsap.fromTo(next, 
                { opacity: 0, scale: 0.92, y: 15 },
                { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.5)' }
            );
        }
    });
}

// Smooth Accordion Animation using GSAP
function toggleAcc(element) {
    const content = element.nextElementSibling;
    const isOpen = content.clientHeight > 0;

    document.querySelectorAll('.accordion-content').forEach(c => {
        if (c !== content) {
            gsap.to(c, { height: 0, padding: '0 1rem', duration: 0.3, ease: 'power2.inOut' });
        }
    });

    if (!isOpen) {
        gsap.to(content, { height: 'auto', padding: '0.8rem 1rem', duration: 0.4, ease: 'power2.out' });
    } else {
        gsap.to(content, { height: 0, padding: '0 1rem', duration: 0.3, ease: 'power2.inOut' });
    }
}