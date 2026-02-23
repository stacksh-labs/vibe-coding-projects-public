// ─── Smooth scroll for anchor links ─────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ─── Navbar: add scrolled class when page is scrolled ────────────────────────
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('nav--scrolled', window.scrollY > 60);
}, { passive: true });

// ─── Intersection Observer: fade-in sections on scroll ───────────────────────
const revealElements = document.querySelectorAll(
  '.card, .landscape-item, .temple-item, .food-card, .stat, .intro__text, .intro__stats'
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((el) => {
  el.classList.add('reveal');
  observer.observe(el);
});

// ─── Hero scroll hint: hide after first scroll ───────────────────────────────
const scrollHint = document.querySelector('.hero__scroll-hint');
if (scrollHint) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) scrollHint.style.opacity = '0';
    else scrollHint.style.opacity = '1';
  }, { passive: true });
}
