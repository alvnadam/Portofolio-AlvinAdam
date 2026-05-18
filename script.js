/* ================================================================
   Alvin Adam Raihansyah — Portfolio
   script.js  |  Final clean version
   ================================================================ */

/* ─── Scroll Reveal ──────────────────────────────────────────────── */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.05}s`;
    observer.observe(el);
  });
}

/* ─── Navbar: scroll opacity + active link ───────────────────────── */
function initNavbar() {
  const nav      = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id], div.hero');
  const links    = document.querySelectorAll('.nav-links a');

  // Scroll opacity
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 60
      ? 'rgba(10,10,15,0.95)'
      : 'rgba(10,10,15,0.75)';
  }, { passive: true });

  // Active link highlight
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id || 'hero';
        links.forEach((a) => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach((s) => io.observe(s));
}

/* ─── Smooth scroll for anchor links ────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ─── Stagger cards inside revealed sections ─────────────────────── */
function initCardStagger() {
  document.querySelectorAll('.skills-grid, .projects-grid, .certs-grid, .exp-list').forEach((grid) => {
    Array.from(grid.children).forEach((card, i) => {
      card.style.transitionDelay = `${i * 0.07}s`;
    });
  });
}

/* ─── Init ───────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initNavbar();
  initSmoothScroll();
  initCardStagger();
});