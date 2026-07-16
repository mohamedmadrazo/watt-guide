/* =========================================
   WATT GUIDE — Shared JS (enhanced)
   ========================================= */

// =========================================
//   Public helpers used by calculator pages
// =========================================
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  // Smooth tween a numeric display. Falls back to instant set if reduced-motion.
  // opts: { prefix, suffix, decimals, duration, signed }
  window.animateNumber = function (el, value, opts) {
    if (!el) return;
    opts = opts || {};
    const decimals = opts.decimals ?? 0;
    const prefix = opts.prefix ?? '';
    const suffix = opts.suffix ?? '';
    const duration = opts.duration ?? 600;
    const format = (n) => {
      if (!isFinite(n)) return '—';
      const fixed = decimals === 0 ? Math.round(n) : Number(n.toFixed(decimals));
      const str = decimals === 0
        ? fixed.toLocaleString('en-US')
        : fixed.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
      return prefix + str + suffix;
    };
    const from = parseFloat(el.dataset.lastValue || '0') || 0;
    const to = parseFloat(value);
    el.dataset.lastValue = isFinite(to) ? String(to) : '0';

    if (reduced || !isFinite(to)) { el.textContent = isFinite(to) ? format(to) : '—'; return; }

    el.classList.add('is-tweening');
    const start = performance.now();
    if (el._raf) cancelAnimationFrame(el._raf);
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const v = from + (to - from) * easeOutCubic(p);
      el.textContent = format(v);
      if (p < 1) el._raf = requestAnimationFrame(tick);
      else {
        el._raf = null;
        el.textContent = format(to);
        el.classList.remove('is-tweening');
      }
    };
    el._raf = requestAnimationFrame(tick);
  };

  // Trigger a brief visual pulse on a result card (CSS-driven)
  window.pulseResult = function (el) {
    if (!el || reduced) return;
    el.classList.remove('is-pulse');
    void el.offsetWidth;  // restart animation
    el.classList.add('is-pulse');
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isCoarse = window.matchMedia('(pointer: coarse)').matches;

  // --- Header scroll state ---
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Mobile nav toggle (with escape + outside click) ---
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    const closeMenu = () => {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
    document.addEventListener('click', (e) => {
      if (!links.contains(e.target) && !toggle.contains(e.target)) closeMenu();
    });
  }

  // --- Year stamp ---
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // --- Reveal on scroll ---
  if ('IntersectionObserver' in window) {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  }

  // --- Count-up for hero metrics ---
  const countUp = (el, target, suffix = '', prefix = '', duration = 1300) => {
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + target + suffix;
    };
    requestAnimationFrame(tick);
  };
  const metricObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      metricObs.unobserve(el);
      const raw = (el.textContent || '').trim();
      // Match things like "300+", "5", "$0"
      const m = raw.match(/^([^\d-]*)(\d+)(.*)$/);
      if (m) {
        const prefix = m[1];
        const num = parseInt(m[2], 10);
        const suffix = m[3];
        el.textContent = prefix + '0' + suffix;
        setTimeout(() => countUp(el, num, suffix, prefix, 1200), 60);
      }
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('.hero-metric .num').forEach(el => metricObs.observe(el));

  // --- Cursor spotlight & tilt ---
  if (!isCoarse && !reduced) {
    const spotTargets = document.querySelectorAll('.app-card, .guide-card, .bento-cell, .result-card');
    spotTargets.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        el.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
      });
    });

    // 3D tilt on calc-preview + bento feature
    document.querySelectorAll('.calc-preview, .bento-cell.feature').forEach(el => {
      el.style.transformStyle = 'preserve-3d';
      el.style.willChange = 'transform';
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * 5;
        const y = ((e.clientY - r.top) / r.height - 0.5) * -5;
        el.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  // --- TOC scrollspy ---
  const tocLinks = document.querySelectorAll('.toc a');
  if (tocLinks.length) {
    const sections = Array.from(tocLinks).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    const spyObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          tocLinks.forEach(l => l.classList.remove('is-active'));
          const active = document.querySelector(`.toc a[href="#${e.target.id}"]`);
          active && active.classList.add('is-active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => spyObs.observe(s));
  }

  // --- Calc result pulse + tween on change (works on any calc page) ---
  if (!reduced && 'MutationObserver' in window) {
    const amounts = document.querySelectorAll('.calc-result .amount, .calc-result.is-pulse-target .amount');
    amounts.forEach(el => {
      // Cache numeric value parsed from textContent for tween fallback
      el.dataset.lastValue = (parseFloat((el.textContent || '').replace(/[^0-9.\-]/g, '')) || 0).toString();
      const card = el.closest('.calc-result');
      let pendingPulse = null;
      const obs = new MutationObserver(() => {
        if (pendingPulse) return;
        pendingPulse = requestAnimationFrame(() => {
          pendingPulse = null;
          if (card) window.pulseResult(card);
        });
      });
      obs.observe(el, { childList: true, characterData: true, subtree: true });
    });
  }

  // --- Smooth anchor scroll with header offset + focus management ---
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
      // Move focus to target for a11y (skip-link to <main tabindex="-1">)
      if (target.hasAttribute('tabindex') || target.tagName === 'MAIN') {
        target.focus({ preventScroll: true });
      }
    });
  });

  // --- Hero intro (GSAP) ---
  if (!reduced && window.gsap && document.querySelector('.hero h1')) {
    try {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } });
      tl.from('.hero .eyebrow', { y: 16, opacity: 0 })
        .from('.hero h1 .line', { y: 30, opacity: 0, stagger: 0.08 }, '-=0.5')
        .from('.hero-sub', { y: 16, opacity: 0 }, '-=0.5')
        .from('.hero-cta-row > *', { y: 16, opacity: 0, stagger: 0.08 }, '-=0.5')
        .from('.hero-metric', { y: 16, opacity: 0, stagger: 0.08 }, '-=0.5')
        .from('.calc-preview', { x: 30, opacity: 0, duration: 1 }, '-=0.9');
    } catch (err) { /* ignore */ }
  }

  // --- Hero mini calculator (with clamping) ---
  const miniCalc = document.querySelector('.calc-preview');
  if (miniCalc) {
    const watts = miniCalc.querySelector('[data-calc-watts]');
    const hours = miniCalc.querySelector('[data-calc-hours]');
    const rate = miniCalc.querySelector('[data-calc-rate]');
    const currency = miniCalc.querySelector('[data-calc-currency]');
    const result = miniCalc.querySelector('[data-calc-result]');
    if (watts && hours && rate && currency && result) {
      const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
      const recalc = () => {
        const w = clamp(parseFloat(watts.value) || 0, 0, 100000);
        const h = clamp(parseFloat(hours.value) || 0, 0, 24);
        const r = clamp(parseFloat(rate.value) || 0, 0, 10);
        const monthly = (w / 1000) * h * r * 30;
        const sym = currency.value === 'USD' ? '$' : currency.value === 'GBP' ? '£' : '€';
        result.textContent = `${sym}${monthly.toFixed(2)}/mo`;
      };
      [watts, hours, rate, currency].forEach(el => el.addEventListener('input', recalc));
      recalc();
    }
  }

  // --- Full calculator page ---
  const fullCalc = document.querySelector('#full-calc');
  if (fullCalc) {
    const inputs = {
      device: fullCalc.querySelector('[name="device"]'),
      watts: fullCalc.querySelector('[name="watts"]'),
      hours: fullCalc.querySelector('[name="hours"]'),
      rate: fullCalc.querySelector('[name="rate"]'),
      currency: fullCalc.querySelector('[name="currency"]'),
      country: fullCalc.querySelector('[name="country"]'),
    };
    const out = {
      daily: document.querySelector('[data-out-daily]'),
      monthly: document.querySelector('[data-out-monthly]'),
      yearly: document.querySelector('[data-out-yearly]'),
      kwh: document.querySelector('[data-out-kwh]'),
    };

    const countryRates = {
      US: { rate: 0.17, currency: 'USD' },
      UK: { rate: 0.28, currency: 'GBP' },
      IE: { rate: 0.35, currency: 'EUR' },
      CA: { rate: 0.13, currency: 'USD' },
      AU: { rate: 0.30, currency: 'USD' },
    };

    const devicePresets = {
      'ac-window': 1000, 'ac-central': 3500, 'heater-space': 1500,
      'refrigerator': 150, 'washing-machine': 500, 'dryer': 3000,
      'dishwasher': 1800, 'oven': 2400, 'microwave': 1000,
      'tv-55': 100, 'gaming-pc': 400, 'laptop': 60,
      'led-bulb': 10, 'ev-charger-l2': 7200, 'water-heater': 4000,
    };

    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

    const recalc = () => {
      if (!inputs.watts || !inputs.hours || !inputs.rate || !inputs.currency) return;
      const w = clamp(parseFloat(inputs.watts.value) || 0, 0, 100000);
      const h = clamp(parseFloat(inputs.hours.value) || 0, 0, 24);
      const r = clamp(parseFloat(inputs.rate.value) || 0, 0, 10);
      const kwhDay = (w / 1000) * h;
      const daily = kwhDay * r;
      const sym = inputs.currency.value === 'USD' ? '$' : inputs.currency.value === 'GBP' ? '£' : '€';
      if (out.daily)   out.daily.textContent   = `${sym}${daily.toFixed(2)}`;
      if (out.monthly) out.monthly.textContent = `${sym}${(daily * 30).toFixed(2)}`;
      if (out.yearly)  out.yearly.textContent  = `${sym}${(daily * 365).toFixed(2)}`;
      if (out.kwh)     out.kwh.textContent     = `${kwhDay.toFixed(2)} kWh`;
    };

    if (inputs.device) {
      inputs.device.addEventListener('change', () => {
        const v = devicePresets[inputs.device.value];
        if (v !== undefined && inputs.watts) inputs.watts.value = v;
        recalc();
      });
    }
    if (inputs.country) {
      inputs.country.addEventListener('change', () => {
        const c = countryRates[inputs.country.value];
        if (c) {
          if (inputs.rate) inputs.rate.value = c.rate;
          if (inputs.currency) inputs.currency.value = c.currency;
        }
        recalc();
      });
    }
    fullCalc.addEventListener('input', recalc);
    recalc();
  }

  // --- Hero video loop fallback (Safari iOS autoplay + prefers-reduced-motion) ---
  const heroVideo = document.querySelector('.hero-video');
  if (heroVideo) {
    if (reduced) {
      heroVideo.removeAttribute('autoplay');
      heroVideo.pause();
    } else {
      const tryPlay = () => heroVideo.play().catch(() => {});
      tryPlay();
      document.addEventListener('touchstart', tryPlay, { once: true, passive: true });
      document.addEventListener('click', tryPlay, { once: true });
    }
  }

  // --- Reveal on scroll (sections fade-in) ---
  if ('IntersectionObserver' in window) {
    const revealIO = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.reveal').forEach(el => revealIO.observe(el));

    // Stagger child reveals (.reveal-stagger > *)
    document.querySelectorAll('.reveal-stagger').forEach((grid) => {
      const children = grid.children;
      const stagIO = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            Array.from(children).forEach((child, i) => {
              child.style.opacity = '0';
              child.style.transform = 'translateY(30px)';
              child.style.transition = 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)';
              setTimeout(() => { child.style.opacity = '1'; child.style.transform = 'translateY(0)'; }, i * 60);
            });
            stagIO.unobserve(grid);
          }
        });
      }, { threshold: 0.05 });
      stagIO.observe(grid);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
  }

  // --- Newsletter AJAX submit with status + ?subscribed=1 redirect support ---
  const nlForm = document.getElementById('newsletter-form');
  const nlStatus = nlForm?.querySelector('.newsletter-status');
  const nlBtn = nlForm?.querySelector('button[type="submit"]');
  if (nlForm && nlStatus && nlBtn) {
    nlForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      nlStatus.dataset.state = '';
      nlStatus.textContent = '';
      if (!nlForm.checkValidity()) {
        nlStatus.dataset.state = 'error';
        nlStatus.textContent = 'Please enter a valid email.';
        return;
      }
      nlBtn.setAttribute('aria-busy', 'true');
      const original = nlBtn.textContent;
      nlBtn.textContent = 'Subscribing…';
      try {
        const res = await fetch(nlForm.action, {
          method: 'POST',
          body: new FormData(nlForm),
          headers: { Accept: 'application/json' },
        });
        if (!res.ok) throw new Error('Network');
        nlStatus.dataset.state = 'success';
        nlStatus.textContent = 'Subscribed. Welcome email arriving shortly.';
        nlForm.reset();
      } catch {
        nlStatus.dataset.state = 'error';
        nlStatus.textContent = 'Could not subscribe. Please try again, or use the contact form.';
      } finally {
        nlBtn.removeAttribute('aria-busy');
        nlBtn.textContent = original;
      }
    });
    if (new URLSearchParams(location.search).get('subscribed') === '1') {
      nlStatus.dataset.state = 'success';
      nlStatus.textContent = 'Subscribed. Welcome email arriving shortly.';
      history.replaceState({}, '', location.pathname);
    }
  }
});

/* =========================================
   v2 update 2026-05-26 · Three.js initLightning eliminada.
   El hero ahora usa <video> loop (assets/hero-loop.mp4 generado con
   Higgsfield Cinema Studio 3.0). Animación de partículas se reemplazó
   por video MP4 de 800 KB para reducir 600 KB de JS + WebGL.
   ========================================= */
