/**
 * Simsalaclean — main.js
 *
 * Modules:
 * 1. Footer — set current year.
 * 2. Lead Form — validation + Google Apps Script submission.
 * 3. Thank-you modal — open/close/focus-trap.
 * 4. FAQ Accordion — accessible expand/collapse.
 * 5. CTA Scroll — smooth scroll with header offset.
 * 6. Mobile nav toggle.
 */

'use strict';

/* ─────────────────────────────────────────────────────────────
   CONFIG
   Replace GAS_ENDPOINT with your deployed Web App /exec URL.
   Format: https://script.google.com/macros/s/<DEPLOY_ID>/exec

   How to get the URL:
   1. Open your Apps Script project.
   2. Click Deploy → Manage deployments.
   3. Copy the Web App URL that ends with /exec.

   The /edit URL you provided is the editor URL — it is NOT
   the endpoint. The endpoint is only available after deploying.
   ───────────────────────────────────────────────────────────── */
var CONFIG = {
  GAS_ENDPOINT: 'https://script.google.com/macros/s/AKfycbyP-ZoVXj9RfPJXgSeZqix_JFlIPQr5ZHRqwOrAwZg8djEKfWCwGDmnvVkGzLq_RXJ_/exec'
};

/* ─────────────────────────────────────────────────────────────
   GTM DATALAYER HELPER
   Initialises window.dataLayer if GTM has not yet done so
   (e.g. script blocked), then pushes a named event object.
   No personal data is ever included in these pushes.
   ───────────────────────────────────────────────────────────── */
function pushDataLayerEvent(eventName) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName });
}

/* ──────────────────────────────────────────
   1. Footer — current year
   ────────────────────────────────────────── */
(function setYear() {
  var el = document.getElementById('currentYear');
  if (el) el.textContent = new Date().getFullYear();
})();

/* ──────────────────────────────────────────
   2. Lead Form + 3. Modal
   ────────────────────────────────────────── */
(function initLeadForm() {
  var form      = document.getElementById('leadForm');
  var submitBtn = form ? form.querySelector('button[type="submit"]') : null;
  var modal     = document.getElementById('thankYouModal');
  var modalClose = document.getElementById('modalClose');

  if (!form || !submitBtn || !modal) return;

  /* Prevent double-submit while a request is in flight */
  var isSubmitting = false;

  /* ── Field-level error helpers ── */
  function setError(input, message) {
    input.classList.add('input-error');
    input.setAttribute('aria-invalid', 'true');

    var container = input.closest('.form-group') || input.parentElement;
    var msg = container.querySelector('.field-error-msg');
    if (!msg) {
      msg = document.createElement('p');
      msg.className = 'field-error-msg';
      msg.setAttribute('role', 'alert');
      msg.style.cssText = 'font-size:0.75rem;color:#e05252;margin-top:4px;';
      container.appendChild(msg);
    }
    msg.textContent = message;
  }

  function clearError(input) {
    input.classList.remove('input-error');
    input.removeAttribute('aria-invalid');
    var container = input.closest('.form-group') || input.parentElement;
    var msg = container.querySelector('.field-error-msg');
    if (msg) msg.textContent = '';
  }

  /* ── Submission-level error (shown below the button) ── */
  function showSubmitError(message) {
    var el = form.querySelector('.submit-error-msg');
    if (!el) {
      el = document.createElement('p');
      el.className = 'submit-error-msg';
      el.setAttribute('role', 'alert');
      el.style.cssText =
        'font-size:0.8125rem;color:#e05252;text-align:center;' +
        'margin-top:4px;line-height:1.5;';
      submitBtn.insertAdjacentElement('afterend', el);
    }
    el.textContent = message;
  }

  function clearSubmitError() {
    var el = form.querySelector('.submit-error-msg');
    if (el) el.remove();
  }

  /* ── Validation ── */
  function validateForm(nameInput, igInput) {
    var valid = true;

    if (!nameInput.value.trim()) {
      setError(nameInput, 'Nama lengkap wajib diisi.');
      valid = false;
    } else {
      clearError(nameInput);
    }

    var igVal = igInput.value.trim().replace(/^@/, '');
    if (!igVal) {
      setError(igInput, 'Username Instagram wajib diisi.');
      valid = false;
    } else if (!/^[a-zA-Z0-9._]{1,30}$/.test(igVal)) {
      setError(igInput, 'Masukkan username Instagram yang valid (tanpa spasi atau karakter khusus).');
      valid = false;
    } else {
      clearError(igInput);
    }

    return valid;
  }

  /* ── Loading state ── */
  function setLoading(on) {
    isSubmitting = on;
    submitBtn.disabled = on;
    submitBtn.textContent = on ? 'Memproses…' : 'Daftar Sekarang';
  }

  /* ── Submit handler ── */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (isSubmitting) return;

    var nameInput = document.getElementById('fullName');
    var igInput   = document.getElementById('instagramUsername');

    clearSubmitError();
    if (!validateForm(nameInput, igInput)) return;

    var fullName   = nameInput.value.trim();
    var igUsername = igInput.value.trim().replace(/^@/, '');

    /* Guard: catch unconfigured endpoint before making any request */
    if (!CONFIG.GAS_ENDPOINT ||
        CONFIG.GAS_ENDPOINT === 'PASTE_YOUR_DEPLOYED_EXEC_URL_HERE') {
      console.warn(
        '[Simsalaclean] GAS_ENDPOINT belum dikonfigurasi.\n' +
        'Ganti CONFIG.GAS_ENDPOINT di main.js dengan URL /exec ' +
        'dari deployment Apps Script kamu.\n' +
        'Cara: Deploy → Manage deployments → salin Web App URL.'
      );
      showSubmitError(
        'Konfigurasi sistem belum tersedia. Coba beberapa saat lagi.'
      );
      return;
    }

    setLoading(true);

    submitToGAS(fullName, igUsername)
      .then(function () {
        /*
         * fetch() in no-cors mode resolves when the request leaves
         * the browser, not when the server writes to Sheets.
         * This is the strongest confirmation we can get from a
         * static frontend without a proxy.
         */
        form.reset();
        clearSubmitError();

        /*
         * Push custom event to GTM dataLayer.
         * Fires ONLY after a confirmed successful submission —
         * never on validation failure, network error, or double-click.
         * Personal data (fullName, instagramUsername) is intentionally
         * excluded from this push per privacy requirements.
         */
        pushDataLayerEvent('simsalaclean_lead_form_submit');

        showModal();
      })
      .catch(function (err) {
        /* Network failure (offline, DNS, etc.) — keep values intact */
        console.error('[Simsalaclean] Submission error:', err.message || err);
        showSubmitError(
          'Pendaftaran belum berhasil. Periksa koneksi internetmu dan coba lagi.'
        );
      })
      .finally(function () {
        setLoading(false);
      });
  });

  /* Clear field errors while the user is typing */
  form.querySelectorAll('input').forEach(function (input) {
    input.addEventListener('input', function () {
      clearError(input);
      clearSubmitError();
    });
  });

  /* ────────────────────────────────────────────────────────────
     GAS SUBMISSION

     Your doPost() reads e.postData.contents and JSON.parse()s it,
     so we send a JSON string as the body.

     Content-Type must be 'text/plain;charset=UTF-8' — a CORS
     "simple" value — so the browser skips the preflight OPTIONS
     request that GAS cannot handle. GAS receives the raw body
     and JSON.parse(e.postData.contents) still works correctly.

     mode: 'no-cors' is required because GAS does not return
     Access-Control-Allow-Origin headers. The Response will be
     opaque (status 0, body unreadable) — this is expected.
     If fetch() resolves without throwing, the request was
     delivered and doPost() ran.
   ──────────────────────────────────────────────────────────── */
  function submitToGAS(fullName, igUsername) {
    var payload = JSON.stringify({
      fullName:          fullName,
      instagramUsername: igUsername
    });

    return fetch(CONFIG.GAS_ENDPOINT, {
      method:  'POST',
      mode:    'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body:    payload
    });
  }

  /* ── Modal ── */
  function showModal() {
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    var first = modal.querySelector('button, [href], input');
    if (first) first.focus();
    modal.addEventListener('keydown', trapFocus);
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
    modal.removeEventListener('keydown', trapFocus);
    submitBtn.focus();
  }

  function trapFocus(e) {
    if (e.key !== 'Tab') return;
    var focusable = Array.from(
      modal.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])')
    ).filter(function (el) { return !el.disabled; });
    var first = focusable[0];
    var last  = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });
})();

/* ──────────────────────────────────────────
   4. FAQ Accordion
   ────────────────────────────────────────── */
(function initFaqAccordion() {
  var faqList = document.querySelector('.faq-list');
  if (!faqList) return;

  var buttons = faqList.querySelectorAll('.faq-question');

  function openItem(btn) {
    var answer = document.getElementById(btn.getAttribute('aria-controls'));
    if (!answer) return;
    btn.setAttribute('aria-expanded', 'true');
    answer.hidden = false;
    requestAnimationFrame(function () { answer.classList.add('is-open'); });
  }

  function closeItem(btn) {
    var answer = document.getElementById(btn.getAttribute('aria-controls'));
    if (!answer) return;
    btn.setAttribute('aria-expanded', 'false');
    answer.classList.remove('is-open');
    answer.hidden = true;
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      buttons.forEach(function (other) {
        if (other !== btn && other.getAttribute('aria-expanded') === 'true') {
          closeItem(other);
        }
      });
      if (expanded) { closeItem(btn); } else { openItem(btn); }
    });

    btn.addEventListener('keydown', function (e) {
      var idx = Array.from(buttons).indexOf(btn);
      if      (e.key === 'Home')      { e.preventDefault(); buttons[0].focus(); }
      else if (e.key === 'End')       { e.preventDefault(); buttons[buttons.length - 1].focus(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); (buttons[idx + 1] || buttons[0]).focus(); }
      else if (e.key === 'ArrowUp')   { e.preventDefault(); (buttons[idx - 1] || buttons[buttons.length - 1]).focus(); }
    });
  });
})();

/* ──────────────────────────────────────────
   5. CTA Scroll
   ────────────────────────────────────────── */
(function initCtaScroll() {
  var btn = document.querySelector('a[href="#hero-form"]');
  if (!btn) return;

  btn.addEventListener('click', function (e) {
    e.preventDefault();
    var target = document.getElementById('hero-form');
    if (!target) return;

    var headerH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--header-height'), 10
    ) || 72;

    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - headerH - 16,
      behavior: 'smooth'
    });

    setTimeout(function () {
      var first = target.querySelector('input');
      if (first) first.focus({ preventScroll: true });
    }, 400);
  });
})();

/* ──────────────────────────────────────────
   6. Mobile nav toggle
   ────────────────────────────────────────── */
(function initMobileNav() {
  var toggle = document.querySelector('.nav-toggle');
  var nav    = document.querySelector('.header-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));

    if (!open) {
      nav.style.cssText =
        'display:flex;flex-direction:column;position:absolute;' +
        'top:var(--header-height);left:0;right:0;' +
        'background-color:var(--color-cream);' +
        'padding:1rem 1.5rem 1.5rem;' +
        'border-bottom:1px solid rgba(15,45,82,0.12);z-index:99;';
      var ul = nav.querySelector('ul');
      if (ul) ul.style.cssText = 'flex-direction:column;gap:1rem;';
    } else {
      nav.removeAttribute('style');
      var ul = nav.querySelector('ul');
      if (ul) ul.removeAttribute('style');
    }
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (toggle.getAttribute('aria-expanded') === 'true') toggle.click();
    });
  });
})();

/* ──────────────────────────────────────────
   7. Privacy Policy Modal
   ────────────────────────────────────────── */
(function initPrivacyModal() {
  var modal     = document.getElementById('privacyModal');
  var closeBtn  = document.getElementById('privacyModalClose');
  var triggers  = [
    document.getElementById('privacyLinkForm'),
    document.getElementById('privacyLinkFooter')
  ];

  if (!modal) return;

  /* Track which element opened the modal so focus can return there */
  var lastTrigger = null;

  /* ── Open ── */
  function openModal(triggerEl) {
    lastTrigger = triggerEl || null;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';

    /* Focus the scrollable body so keyboard users can scroll immediately */
    var body = modal.querySelector('.privacy-modal-body');
    if (body) body.focus();

    modal.addEventListener('keydown', handleKeydown);
  }

  /* ── Close ── */
  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
    modal.removeEventListener('keydown', handleKeydown);

    /* Return focus to the element that opened the modal */
    if (lastTrigger) lastTrigger.focus();
  }

  /* ── Focus trap ── */
  function handleKeydown(e) {
    if (e.key === 'Escape') {
      e.stopPropagation();
      closeModal();
      return;
    }

    if (e.key !== 'Tab') return;

    var focusable = Array.from(
      modal.querySelectorAll(
        'button:not([disabled]), [href], input, [tabindex]:not([tabindex="-1"])'
      )
    );

    if (!focusable.length) return;

    var first = focusable[0];
    var last  = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  /* ── Wire triggers ── */
  triggers.forEach(function (trigger) {
    if (!trigger) return;
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      openModal(trigger);
    });
  });

  /* ── Close button ── */
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  /* ── Backdrop click ── */
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  /*
   * Escape is also handled in handleKeydown (active only while modal is open).
   * No global listener needed — avoids conflicts with the thank-you modal.
   */
})();
