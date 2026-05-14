/* ==========================================================================
   Cookie Consent Banner — Watt Guide
   GDPR / CCPA ready · Google Consent Mode v2 · Vanilla JS, ~2KB gz
   ========================================================================== */
(function () {
  'use strict';

  var STORAGE_KEY = 'wg_consent';
  var STORAGE_VERSION = 'v1';
  var EXPIRES_DAYS = 180;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500
  });

  function getSaved() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var d = JSON.parse(raw);
      if (d.v !== STORAGE_VERSION) return null;
      if (d.exp && Date.now() > d.exp) return null;
      return d;
    } catch (e) { return null; }
  }

  function save(choice) {
    var p = {
      v: STORAGE_VERSION,
      ts: Date.now(),
      exp: Date.now() + EXPIRES_DAYS * 86400000,
      analytics: !!choice.analytics,
      ads: !!choice.ads
    };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch (e) {}
    apply(p);
    window.dispatchEvent(new CustomEvent('wg:consent', { detail: p }));
  }

  function apply(c) {
    gtag('consent', 'update', {
      ad_storage: c.ads ? 'granted' : 'denied',
      ad_user_data: c.ads ? 'granted' : 'denied',
      ad_personalization: c.ads ? 'granted' : 'denied',
      analytics_storage: c.analytics ? 'granted' : 'denied'
    });
  }

  function inject(html) {
    var w = document.createElement('div');
    w.innerHTML = html;
    document.body.appendChild(w.firstElementChild);
  }

  function show() {
    if (document.getElementById('wg-cc')) return;
    inject(bannerHTML());
    document.addEventListener('click', onClick, { capture: true });
    requestAnimationFrame(function () {
      document.getElementById('wg-cc').classList.add('is-open');
    });
  }

  function hide() {
    var b = document.getElementById('wg-cc');
    if (!b) return;
    b.classList.remove('is-open');
    setTimeout(function () { b.remove(); }, 280);
  }

  function bannerHTML() {
    return '' +
      '<div id="wg-cc" class="wg-cc" role="dialog" aria-live="polite" aria-label="Cookie notice">' +
        '<div class="wg-cc__inner">' +
          '<div class="wg-cc__body">' +
            '<strong>We use cookies</strong>' +
            '<p>We use cookies for analytics and advertising. You can accept all, reject non-essential, or customize your choice. See our <a href="/cookies.html">cookie policy</a>.</p>' +
          '</div>' +
          '<div class="wg-cc__actions">' +
            '<button type="button" class="wg-cc__btn wg-cc__btn--ghost" data-cc="reject">Reject</button>' +
            '<button type="button" class="wg-cc__btn wg-cc__btn--ghost" data-cc="custom">Customize</button>' +
            '<button type="button" class="wg-cc__btn wg-cc__btn--primary" data-cc="accept">Accept all</button>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function modalHTML(c) {
    c = c || { analytics: true, ads: true };
    return '' +
      '<div id="wg-cm" class="wg-cm" role="dialog" aria-modal="true" aria-labelledby="wg-cm-title">' +
        '<div class="wg-cm__scrim" data-cc="close"></div>' +
        '<div class="wg-cm__card">' +
          '<header class="wg-cm__head">' +
            '<h2 id="wg-cm-title">Cookie preferences</h2>' +
            '<button type="button" class="wg-cm__x" data-cc="close" aria-label="Close">×</button>' +
          '</header>' +
          '<div class="wg-cm__body">' +
            '<div class="wg-cm__row"><div><strong>Essential</strong><p>Required for the site to function. Cannot be disabled.</p></div><span class="wg-cm__tag">Always on</span></div>' +
            '<label class="wg-cm__row"><div><strong>Analytics</strong><p>We measure aggregate usage to improve content.</p></div><input type="checkbox" data-cc-cat="analytics" ' + (c.analytics ? 'checked' : '') + '></label>' +
            '<label class="wg-cm__row"><div><strong>Advertising</strong><p>Personalized Google AdSense ads based on browsing.</p></div><input type="checkbox" data-cc-cat="ads" ' + (c.ads ? 'checked' : '') + '></label>' +
          '</div>' +
          '<footer class="wg-cm__foot">' +
            '<button type="button" class="wg-cc__btn wg-cc__btn--ghost" data-cc="reject">Reject all</button>' +
            '<button type="button" class="wg-cc__btn wg-cc__btn--primary" data-cc="save">Save choice</button>' +
          '</footer>' +
        '</div>' +
      '</div>';
  }

  function onClick(e) {
    var t = e.target.closest('[data-cc]');
    if (!t) return;
    var a = t.getAttribute('data-cc');
    if (a === 'accept') { save({ analytics: true, ads: true }); hide(); closeModal(); }
    else if (a === 'reject') { save({ analytics: false, ads: false }); hide(); closeModal(); }
    else if (a === 'custom') { openModal(); }
    else if (a === 'close') { closeModal(); }
    else if (a === 'save') {
      var an = !!document.querySelector('[data-cc-cat="analytics"]:checked');
      var ad = !!document.querySelector('[data-cc-cat="ads"]:checked');
      save({ analytics: an, ads: ad });
      hide();
      closeModal();
    }
  }

  function openModal() {
    if (document.getElementById('wg-cm')) return;
    inject(modalHTML(getSaved()));
    requestAnimationFrame(function () {
      document.getElementById('wg-cm').classList.add('is-open');
    });
  }

  function closeModal() {
    var m = document.getElementById('wg-cm');
    if (!m) return;
    m.classList.remove('is-open');
    setTimeout(function () { m.remove(); }, 220);
  }

  window.WGConsent = {
    open: function () { openModal(); },
    get: function () { return getSaved(); },
    reset: function () { try { localStorage.removeItem(STORAGE_KEY); } catch (e) {} location.reload(); }
  };

  var saved = getSaved();
  if (saved) {
    apply(saved);
  } else {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', show);
    } else {
      show();
    }
    // wire click handler globally even before banner renders, in case modal opens from footer link
    document.addEventListener('click', onClick, { capture: true });
  }
})();
