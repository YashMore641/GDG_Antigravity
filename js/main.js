/**
 * ============================================================================
 * YASH DARSHAN MORE - ANIME PORTFOLIO ENGINE (Vanilla JavaScript)
 * Interactive logic: Canvas sakura, custom cursor, 3D tilt, sorting visualizer,
 * typewriter cycling, scrollspy, and mailto handler.
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initPageLoader();
  initScrollProgress();
  initStickyNavAndSpy();
  initMobileNav();
  initHeroTypewriter();
  initSakuraPetals();
  initCustomCursor();
  init3DTilt();
  initSkillsProgress();
  initScrollReveal();
  initSortingVisualizer();
  initContactFormAndCopy();
  initBackToTop();
});

/* ----------------------------------------------------------------------------
   1. PAGE LOADER (Anime "ロード中" Entrance)
   ---------------------------------------------------------------------------- */
function initPageLoader() {
  const loader = document.getElementById('page-loader');
  const bar = document.getElementById('loader-bar-fill');
  if (!loader || !bar) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 22) + 12;
    if (progress >= 100) {
      progress = 100;
      bar.style.width = '100%';
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.add('loaded');
      }, 350);
    } else {
      bar.style.width = `${progress}%`;
    }
  }, 50);
}

/* ----------------------------------------------------------------------------
   2. SCROLL PROGRESS BAR
   ---------------------------------------------------------------------------- */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  }, { passive: true });
}

/* ----------------------------------------------------------------------------
   3. STICKY NAVBAR & SCROLLSPY
   ---------------------------------------------------------------------------- */
function initStickyNavAndSpy() {
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Header shadow on scroll
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scrollspy section highlight
    const scrollPos = window.scrollY + 180;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });
}

/* ----------------------------------------------------------------------------
   4. MOBILE NAVIGATION DRAWER
   ---------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    toggleBtn.classList.toggle('open', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      toggleBtn.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ----------------------------------------------------------------------------
   5. HERO TYPEWRITER (Cycling Taglines)
   ---------------------------------------------------------------------------- */
function initHeroTypewriter() {
  const element = document.getElementById('hero-typing-target');
  if (!element) return;

  const words = [
    'Backend Java Developer',
    'Spring Boot Learner',
    'Spring AI Explorer',
    'Problem Solver'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      charIndex--;
      element.textContent = currentWord.substring(0, charIndex);
      typingSpeed = 45;
    } else {
      charIndex++;
      element.textContent = currentWord.substring(0, charIndex);
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at full word
      typingSpeed = 1600;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Switch to next word
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ----------------------------------------------------------------------------
   6. FALLING SAKURA PETALS CANVAS
   ---------------------------------------------------------------------------- */
function initSakuraPetals() {
  const canvas = document.getElementById('sakura-canvas');
  const toggleBtn = document.getElementById('petals-toggle');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationId = null;
  let isPaused = false;

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    isPaused = true;
    if (toggleBtn) {
      toggleBtn.classList.add('paused');
      toggleBtn.textContent = '🌸 Petals: Off';
    }
  }

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petalCount = window.innerWidth < 768 ? 18 : 35;
  const petals = [];

  class Petal {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -20;
      this.size = Math.random() * 8 + 6;
      this.speedY = Math.random() * 1.2 + 0.8;
      this.speedX = Math.random() * 1.5 - 0.5;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 1.5;
      this.opacity = Math.random() * 0.45 + 0.25;
      // Sakura shades: sakura pink, electric magenta, soft violet
      const colors = [
        'rgba(255, 61, 129, ',
        'rgba(244, 114, 182, ',
        'rgba(217, 70, 239, ',
        'rgba(167, 139, 250, '
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.y * 0.015) * 0.5;
      this.rotation += this.rotationSpeed;

      if (this.y > height + 20 || this.x > width + 20 || this.x < -20) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.fillStyle = `${this.color}${this.opacity})`;
      ctx.beginPath();
      // Draw sakura petal curve
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size, 0, 0, this.size);
      ctx.bezierCurveTo(-this.size, 0, -this.size / 2, -this.size / 2, 0, 0);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < petalCount; i++) {
    petals.push(new Petal());
  }

  function loop() {
    if (!isPaused) {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < petals.length; i++) {
        petals[i].update();
        petals[i].draw();
      }
    }
    animationId = requestAnimationFrame(loop);
  }

  loop();

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      isPaused = !isPaused;
      if (isPaused) {
        ctx.clearRect(0, 0, width, height);
        toggleBtn.classList.add('paused');
        toggleBtn.textContent = '🌸 Petals: Off';
      } else {
        toggleBtn.classList.remove('paused');
        toggleBtn.textContent = '🌸 Petals: On';
      }
    });
  }
}

/* ----------------------------------------------------------------------------
   7. CUSTOM ANIME CURSOR WITH GLOW
   ---------------------------------------------------------------------------- */
function initCustomCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cursor = document.getElementById('custom-cursor');
  const cursorDot = document.getElementById('custom-cursor-dot');
  if (!cursor || !cursorDot) return;

  let mouseX = -100;
  let mouseY = -100;
  let cursorX = -100;
  let cursorY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  function animateCursor() {
    // Smooth lerp for outer ring
    cursorX += (mouseX - cursorX) * 0.22;
    cursorY += (mouseY - cursorY) * 0.22;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover detection
  const interactiveTargets = document.querySelectorAll(
    'a, button, input, textarea, select, .project-card, .stat-card, .achievement-trophy-card, .quest-card, .timeline-card'
  );

  interactiveTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });
}

/* ----------------------------------------------------------------------------
   8. 3D TILT EFFECT ON CARDS
   ---------------------------------------------------------------------------- */
function init3DTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const tiltCards = document.querySelectorAll('[data-tilt]');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -9;
      const rotateY = ((x - centerX) / centerX) * 9;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });
}

/* ----------------------------------------------------------------------------
   9. RPG SKILLS POWER BARS ON SCROLL
   ---------------------------------------------------------------------------- */
function initSkillsProgress() {
  const skillItems = document.querySelectorAll('.skill-bar-fill[data-level]');
  if (!skillItems.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const level = bar.getAttribute('data-level');
          bar.style.width = `${level}%`;
          obs.unobserve(bar);
        }
      });
    },
    { threshold: 0.25 }
  );

  skillItems.forEach(item => observer.observe(item));
}

/* ----------------------------------------------------------------------------
   10. SCROLL REVEAL ANIMATIONS
   ---------------------------------------------------------------------------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach(el => observer.observe(el));
}

/* ----------------------------------------------------------------------------
   11. INTERACTIVE SORTING ALGORITHM VISUALIZER
   Embedded mini-demo inside Project 2 (Algorithm Visualizer)
   ---------------------------------------------------------------------------- */
function initSortingVisualizer() {
  const container = document.getElementById('sorting-bars-container');
  const sortBtn = document.getElementById('algo-btn-sort');
  const resetBtn = document.getElementById('algo-btn-reset');
  const algoSelect = document.getElementById('algo-select');
  const statusText = document.getElementById('demo-status-msg');

  if (!container || !sortBtn || !resetBtn || !algoSelect) return;

  const BAR_COUNT = 16;
  let array = [];
  let isSorting = false;
  let stopRequested = false;

  function generateRandomArray() {
    array = [];
    for (let i = 0; i < BAR_COUNT; i++) {
      // Heights between 15% and 95%
      array.push(Math.floor(Math.random() * 80) + 15);
    }
    renderBars();
    if (statusText) statusText.textContent = 'Ready: Pick an algorithm and click Run';
  }

  function renderBars(comparingIndices = [], swappingIndices = [], sortedIndices = []) {
    container.innerHTML = '';
    array.forEach((val, idx) => {
      const bar = document.createElement('div');
      bar.className = 'sort-bar';
      bar.style.height = `${val}%`;

      if (comparingIndices.includes(idx)) {
        bar.classList.add('comparing');
      } else if (swappingIndices.includes(idx)) {
        bar.classList.add('swapping');
      } else if (sortedIndices.includes(idx)) {
        bar.classList.add('sorted');
      }

      container.appendChild(bar);
    });
  }

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Bubble Sort
  async function bubbleSort() {
    const len = array.length;
    const sorted = [];
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        if (stopRequested) return;
        renderBars([j, j + 1], [], sorted);
        await delay(90);

        if (array[j] > array[j + 1]) {
          const temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
          renderBars([], [j, j + 1], sorted);
          await delay(90);
        }
      }
      sorted.push(len - i - 1);
    }
    renderBars([], [], Array.from({ length: len }, (_, i) => i));
  }

  // Selection Sort
  async function selectionSort() {
    const len = array.length;
    const sorted = [];
    for (let i = 0; i < len; i++) {
      let minIdx = i;
      for (let j = i + 1; j < len; j++) {
        if (stopRequested) return;
        renderBars([minIdx, j], [], sorted);
        await delay(90);

        if (array[j] < array[minIdx]) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        const temp = array[i];
        array[i] = array[minIdx];
        array[minIdx] = temp;
        renderBars([], [i, minIdx], sorted);
        await delay(100);
      }
      sorted.push(i);
    }
    renderBars([], [], Array.from({ length: len }, (_, i) => i));
  }

  // Insertion Sort
  async function insertionSort() {
    const len = array.length;
    const sorted = [0];
    for (let i = 1; i < len; i++) {
      let key = array[i];
      let j = i - 1;
      while (j >= 0 && array[j] > key) {
        if (stopRequested) return;
        renderBars([j, j + 1], [], sorted);
        await delay(90);

        array[j + 1] = array[j];
        renderBars([], [j + 1], sorted);
        await delay(90);
        j--;
      }
      array[j + 1] = key;
      sorted.push(i);
    }
    renderBars([], [], Array.from({ length: len }, (_, i) => i));
  }

  sortBtn.addEventListener('click', async () => {
    if (isSorting) return;
    isSorting = true;
    stopRequested = false;
    sortBtn.disabled = true;
    algoSelect.disabled = true;
    const algo = algoSelect.value;
    if (statusText) statusText.textContent = `Running ${algo.toUpperCase()} SORT...`;

    try {
      if (algo === 'bubble') {
        await bubbleSort();
      } else if (algo === 'selection') {
        await selectionSort();
      } else if (algo === 'insertion') {
        await insertionSort();
      }
      if (!stopRequested && statusText) {
        statusText.textContent = '🎉 Array sorted successfully! 完了';
      }
    } finally {
      isSorting = false;
      sortBtn.disabled = false;
      algoSelect.disabled = false;
    }
  });

  resetBtn.addEventListener('click', () => {
    stopRequested = true;
    isSorting = false;
    sortBtn.disabled = false;
    algoSelect.disabled = false;
    generateRandomArray();
  });

  // Initial random array
  generateRandomArray();
}

/* ----------------------------------------------------------------------------
   12. CONTACT FORM MAILTO & CLIPBOARD COPY
   ---------------------------------------------------------------------------- */
function initContactFormAndCopy() {
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('toast-notice');
  const copyBtn = document.getElementById('btn-copy-email');

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        showToast('⚠️ Please fill in all fields before sending!');
        return;
      }

      // Construct mailto link
      const recipient = 'yashmore0612@gmail.com';
      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(
        `Hi Yash,\n\nMy name is ${name} (${email}).\n\nMessage:\n${message}\n\n---\nSent from your Portfolio Website`
      );
      const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

      showToast('🚀 Opening your email client... 送信中！');
      window.location.href = mailtoUrl;

      // Optional form reset after short delay
      setTimeout(() => {
        form.reset();
      }, 1500);
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = 'yashmore0612@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        showToast(`📋 Copied to clipboard: ${email}`);
      } catch (err) {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`📋 Copied to clipboard: ${email}`);
      }
    });
  }
}

/* ----------------------------------------------------------------------------
   13. BACK TO TOP BUTTON
   ---------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
