/* ============================================================
   Matthew McCallum — Portfolio
   main.js — Minimal, purposeful interactions.
   ============================================================ */

/* --- Footer year --- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* --- Image gallery (featured project thumbnails) --- */
const galleryImg = document.getElementById('gallery-main-img');

document.querySelectorAll('.thumb').forEach(thumb => {
  thumb.addEventListener('click', () => {
    if (!galleryImg) return;

    // Fade out, swap, fade in
    galleryImg.style.opacity = '0';
    setTimeout(() => {
      galleryImg.src = thumb.dataset.src;
      galleryImg.style.opacity = '1';
    }, 150);

    document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
  });
});

// Smooth opacity transition on gallery image
if (galleryImg) {
  galleryImg.style.transition = 'opacity 0.2s ease';
}

/* --- Active nav link on scroll --- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, {
  rootMargin: '-30% 0px -60% 0px'
});

sections.forEach(s => sectionObserver.observe(s));

/* --- Scroll-triggered fade-in --- */
const fadeEls = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -40px 0px'
});

fadeEls.forEach(el => fadeObserver.observe(el));

/* --- Mobile nav toggle --- */
const toggle = document.getElementById('nav-toggle');
const mobileNav = document.getElementById('nav-links');

if (toggle && mobileNav) {
  toggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close on any nav link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* --- Copy email to clipboard --- */
function bindCopyEmail(btnId) {
  const btn = document.getElementById(btnId);
  if (!btn) return;

  let timer;
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(btn.dataset.email).then(() => {
      const original = btn.textContent;
      btn.textContent = '✓ Copied';
      clearTimeout(timer);
      timer = setTimeout(() => { btn.textContent = original; }, 2000);
    });
  });
}

bindCopyEmail('copy-email');
bindCopyEmail('copy-email-hero');

/* --- Keyboard support for gallery thumbs --- */
document.querySelectorAll('.thumb').forEach(thumb => {
  thumb.setAttribute('tabindex', '0');
  thumb.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      thumb.click();
    }
  });
});
