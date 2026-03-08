/* ================================================================
   SCRIPT.JS — Dicky Sihite Portfolio Website
   ================================================================ */

/* ----------------------------------------------------------------
   1. CUSTOM CURSOR
---------------------------------------------------------------- */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

// Move cursor dot instantly
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

// Animate ring with smooth lag
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Expand ring on interactive elements
const interactiveEls = document.querySelectorAll('a, button, .project-card, .skill-chip');

interactiveEls.forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '6px';
    cursor.style.height = '6px';
    ring.style.width    = '52px';
    ring.style.height   = '52px';
    ring.style.opacity  = '1';
  });

  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '10px';
    cursor.style.height = '10px';
    ring.style.width    = '36px';
    ring.style.height   = '36px';
    ring.style.opacity  = '0.6';
  });
});

/* ----------------------------------------------------------------
   2. SCROLL REVEAL
---------------------------------------------------------------- */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

revealElements.forEach((el) => revealObserver.observe(el));

/* ----------------------------------------------------------------
   3. SKILL BAR ANIMATION
---------------------------------------------------------------- */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach((fill) => {
        const targetWidth = fill.dataset.width;
        fill.style.transform = `scaleX(${targetWidth})`;
        fill.classList.add('animate');
      });
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-grid').forEach((grid) => {
  skillObserver.observe(grid);
});

/* ----------------------------------------------------------------
   4. ACTIVE NAV LINK ON SCROLL
---------------------------------------------------------------- */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a:not(.nav-cta)');

window.addEventListener('scroll', () => {
  let currentSection = '';

  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 120) {
      currentSection = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === '#' + currentSection;
    link.style.color = isActive ? 'var(--text)' : '';
  });
}, { passive: true });