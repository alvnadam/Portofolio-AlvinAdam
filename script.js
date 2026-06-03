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
  let lastScrollY = window.scrollY;

  // Scroll opacity and auto-hide
  window.addEventListener('scroll', () => {
    // Opacity/background
    if (window.scrollY > 60) {
      nav.style.background = 'rgba(3, 3, 7, 0.85)';
    } else {
      nav.style.background = 'rgba(3, 3, 7, 0.65)';
    }

    // Auto-hide
    if (window.scrollY > 120) {
      if (window.scrollY > lastScrollY) {
        nav.style.transform = 'translateY(-100%)';
      } else {
        nav.style.transform = 'translateY(0)';
      }
    } else {
      nav.style.transform = 'translateY(0)';
    }
    lastScrollY = window.scrollY;
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

/* ─── Mouse Glow Tracker ────────────────────────────────────────── */
function initMouseGlow() {
  const glow = document.querySelector('.mouse-glow');
  if (glow) {
    window.addEventListener('mousemove', (e) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    });
  }

  // Spotlight cards mouse tracking
  const cards = document.querySelectorAll('.skill-card, .pcard, .exp-card, .cert-card, .avatar-card, .contact-box');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ─── Typewriter Animation ───────────────────────────────────────── */
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.isDeleting = false;
    this.type();
  }

  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = this.txt;

    let typeSpeed = 100;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

function initTypewriter() {
  const txtElement = document.querySelector('.typewriter-text');
  if (!txtElement) return;
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  new TypeWriter(txtElement, words, 2000);
}

/* ─── Scroll Progress Bar ──────────────────────────────────────── */
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) return;
  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    progressBar.style.width = `${scrolled}%`;
  });
}

/* ─── Back to Top Button ────────────────────────────────────────── */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─── Init ───────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initNavbar();
  initSmoothScroll();
  initCardStagger();
  initMouseGlow();
  initTypewriter();
  initScrollProgress();
  initBackToTop();
});