/* =============================================
   RANVEER SINGH — Portfolio Script
   Premium Interactions & Animations
   ============================================= */

(function () {
  'use strict';

  // =============================================
  // LOADER
  // =============================================
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loaderBar');
  let progress = 0;

  const tick = setInterval(() => {
    progress += Math.random() * 12 + 3;
    if (progress >= 100) {
      progress = 100;
      clearInterval(tick);
      loaderBar.style.width = '100%';
      setTimeout(() => {
        loader.classList.add('done');
        document.body.style.overflow = '';
        initHero();
      }, 400);
    }
    loaderBar.style.width = progress + '%';
  }, 80);

  document.body.style.overflow = 'hidden';

  // =============================================
  // CUSTOM CURSOR
  // =============================================
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');

  if (cursor && follower && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    const hoverTargets = document.querySelectorAll('a, button, .gallery-item, .achievement-card, .contact-card');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovered');
        follower.classList.add('hovered');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovered');
        follower.classList.remove('hovered');
      });
    });
  }

  // =============================================
  // SCROLL PROGRESS
  // =============================================
  const scrollProgress = document.getElementById('scrollProgress');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = pct + '%';
  }, { passive: true });

  // =============================================
  // NAVIGATION
  // =============================================
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });

  // =============================================
  // SECTION REVEALS
  // =============================================
  const revealSections = document.querySelectorAll('.section-reveal');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        sectionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealSections.forEach(section => sectionObserver.observe(section));

  // =============================================
  // ACHIEVEMENT CARDS ANIMATION
  // =============================================
  const achievementCards = document.querySelectorAll('.achievement-card');

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.achievement-card');
        cards.forEach((card, i) => {
          card.style.setProperty('--idx', i);
          card.classList.add('animated');
        });
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  const achievementsGrid = document.querySelector('.achievements-grid');
  if (achievementsGrid) cardObserver.observe(achievementsGrid);

  // =============================================
  // COUNTER ANIMATION
  // =============================================
  const statNums = document.querySelectorAll('.stat-num[data-target]');

  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const start = performance.now();

    function update(time) {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statNums.forEach(animateCounter);
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('stats');
  if (statsSection) statsObserver.observe(statsSection);

  // =============================================
  // GALLERY LIGHTBOX
  // =============================================
  const galleryItems = document.querySelectorAll('.gallery-item[data-src]');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.dataset.src;
      lightboxImg.src = src;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { lightboxImg.src = ''; }, 400);
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // =============================================
  // HERO PARALLAX
  // =============================================
  const heroBg = document.getElementById('heroBg');

  window.addEventListener('scroll', () => {
    if (!heroBg) return;
    const scroll = window.scrollY;
    const heroHeight = window.innerHeight;
    if (scroll < heroHeight) {
      heroBg.style.transform = `scale(1) translateY(${scroll * 0.3}px)`;
    }
  }, { passive: true });

  // =============================================
  // SMOOTH SCROLL NAV LINKS
  // =============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // =============================================
  // ABOUT IMAGE REVEAL
  // =============================================
  const aboutImgs = document.querySelectorAll('.about-img-wrap');
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${i * 0.15}s`;
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        imgObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  aboutImgs.forEach(img => {
    img.style.opacity = '0';
    img.style.transform = 'translateY(30px)';
    img.style.transition = 'opacity 0.8s cubic-bezier(0.77,0,0.175,1), transform 0.8s cubic-bezier(0.77,0,0.175,1)';
    imgObserver.observe(img);
  });

  // =============================================
  // GALLERY ITEMS STAGGER
  // =============================================
  const galleryAll = document.querySelectorAll('.gallery-item');
  const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
        galleryObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  galleryAll.forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = `opacity 0.7s ${i * 0.05}s cubic-bezier(0.77,0,0.175,1), transform 0.7s ${i * 0.05}s cubic-bezier(0.77,0,0.175,1)`;
    galleryObserver.observe(item);
  });

  // =============================================
  // HERO INIT
  // =============================================
  function initHero() {
    // Hero is CSS-animated, just ensure visibility
    document.querySelector('.hero')?.classList.add('loaded');
  }

  // =============================================
  // CONTACT CARDS STAGGER
  // =============================================
  const contactCards = document.querySelectorAll('.contact-card');
  const contactObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      contactCards.forEach((card, i) => {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateX(0)';
        }, i * 120);
      });
      contactObserver.disconnect();
    }
  }, { threshold: 0.2 });

  const contactSection = document.querySelector('.contact-cards');
  if (contactSection) {
    contactCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateX(-20px)';
      card.style.transition = 'opacity 0.6s var(--ease), transform 0.6s var(--ease)';
    });
    contactObserver.observe(contactSection);
  }

  // =============================================
  // FOOTER REVEAL
  // =============================================
  const footer = document.querySelector('.footer');
  const footerObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      footer.style.opacity = '1';
      footerObserver.disconnect();
    }
  }, { threshold: 0.1 });

  if (footer) {
    footer.style.opacity = '0';
    footer.style.transition = 'opacity 1s';
    footerObserver.observe(footer);
  }

})();
