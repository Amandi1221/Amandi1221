/* ==========================================================
   Amandi Chamathsara — Portfolio scripts
   ========================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var CONTACT_EMAIL = 'chamathsaraamandi2003@gmail.com';

  /* ---------- Light / dark theme ---------- */
  var themeBtn = document.getElementById('theme-toggle');
  var themeLabel = document.getElementById('theme-label');
  var metaTheme = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme, save) {
    root.setAttribute('data-theme', theme);
    var isDark = theme === 'dark';
    if (themeBtn) {
      themeBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
    if (themeLabel) themeLabel.textContent = isDark ? 'Light' : 'Dark';
    if (metaTheme) metaTheme.setAttribute('content', isDark ? '#0e171e' : '#0f766e');
    if (save) {
      try { localStorage.setItem('theme', theme); } catch (e) { /* storage unavailable */ }
    }
  }

  applyTheme(root.getAttribute('data-theme') || 'light', false);

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
    });
  }

  /* ---------- Mobile navigation ---------- */
  var nav = document.getElementById('site-nav');
  var navBtn = document.getElementById('nav-toggle');

  function setNav(open) {
    if (!nav || !navBtn) return;
    nav.classList.toggle('open', open);
    navBtn.setAttribute('aria-expanded', String(open));
    navBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  if (navBtn) {
    navBtn.addEventListener('click', function () {
      setNav(navBtn.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setNav(false);
    });
  }

  /* ---------- Highlight the current section in the nav ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.site-nav a'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = '#' + entry.target.id;
        links.forEach(function (a) {
          var active = a.getAttribute('href') === id;
          a.classList.toggle('active', active);
          if (active) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------- Skill icons (Devicon), with graceful fallback ---------- */
  var ICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/';

  function letterBadge(text) {
    var span = document.createElement('span');
    span.className = 'chip-letter';
    span.setAttribute('aria-hidden', 'true');
    span.textContent = text.trim().charAt(0).toUpperCase();
    return span;
  }

  document.querySelectorAll('.chip').forEach(function (chip) {
    var slug = chip.getAttribute('data-icon');
    var label = chip.textContent;

    if (slug === 'none') return;

    if (!slug) {
      chip.insertBefore(letterBadge(label), chip.firstChild);
      return;
    }

    var img = document.createElement('img');
    img.alt = '';
    img.width = 22;
    img.height = 22;
    img.loading = 'lazy';
    if (chip.hasAttribute('data-invert')) img.setAttribute('data-invert', '');

    var variants = ['original', 'plain'];
    var tries = 0;
    img.src = ICON_BASE + slug + '/' + slug + '-' + variants[0] + '.svg';
    img.addEventListener('error', function () {
      tries += 1;
      if (tries < variants.length) {
        img.src = ICON_BASE + slug + '/' + slug + '-' + variants[tries] + '.svg';
      } else {
        img.replaceWith(letterBadge(label));
      }
    });
    chip.insertBefore(img, chip.firstChild);
  });

  /* ---------- Image viewer ---------- */
  var box = document.getElementById('lightbox');
  var boxImg = document.getElementById('lightbox-img');
  var boxCap = document.getElementById('lightbox-caption');

  document.querySelectorAll('.zoomable').forEach(function (btn) {
    var thumb = btn.querySelector('img');
    btn.setAttribute('aria-label', 'Enlarge image: ' + (btn.getAttribute('data-caption') || (thumb && thumb.alt) || ''));
    btn.addEventListener('click', function () {
      if (!box || typeof box.showModal !== 'function') {
        window.open(btn.getAttribute('data-full'), '_blank', 'noopener');
        return;
      }
      boxImg.src = btn.getAttribute('data-full');
      boxImg.alt = thumb ? thumb.alt : '';
      boxCap.textContent = btn.getAttribute('data-caption') || '';
      box.showModal();
    });
  });

  if (box) {
    // Click on the backdrop closes the viewer
    box.addEventListener('click', function (e) {
      if (e.target === box) box.close();
    });
  }

  /* ---------- Get in touch form (delivers to your inbox via FormSubmit) ---------- */
  var form = document.getElementById('touch-form');
  var status = document.getElementById('form-status');
  var FORM_ENDPOINT = 'https://formsubmit.co/ajax/' + CONTACT_EMAIL;

  function setStatus(text, isError) {
    status.className = 'form-status' + (isError ? ' error' : '');
    status.textContent = text;
  }

  if (form) {
    var submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.elements.name;
      var email = form.elements.email;
      var subject = form.elements.subject;
      var message = form.elements.message;
      var honey = form.elements._honey;
      var problems = [];

      [name, email, message].forEach(function (f) { f.removeAttribute('aria-invalid'); });

      if (!name.value.trim()) { name.setAttribute('aria-invalid', 'true'); problems.push('your name'); }
      if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) { email.setAttribute('aria-invalid', 'true'); problems.push('a valid email address'); }
      if (!message.value.trim()) { message.setAttribute('aria-invalid', 'true'); problems.push('a message'); }

      if (problems.length) {
        setStatus('Please enter ' + problems.join(', ') + '.', true);
        var firstBad = form.querySelector('[aria-invalid="true"]');
        if (firstBad) firstBad.focus();
        return;
      }

      // Spam bots fill the hidden field; pretend it worked and send nothing
      if (honey && honey.value) { setStatus('Thank you! Your message has been sent.', false); form.reset(); return; }

      var subj = subject.value.trim() || 'New message from your portfolio';
      var payload = {
        name: name.value.trim(),
        email: email.value.trim(),
        message: message.value.trim(),
        _subject: subj,
        _replyto: email.value.trim(),
        _template: 'table',
        _captcha: 'false'
      };

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      setStatus('Sending your message...', false);

      function showFailure(reason) {
        var body = payload.message + '\n\n' + payload.name + '\n' + payload.email;
        var mailto = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent(body);
        status.className = 'form-status error';
        status.innerHTML = '';
        status.appendChild(document.createTextNode(reason + ' You can also '));
        var link = document.createElement('a');
        link.href = mailto;
        link.textContent = 'email me directly';
        status.appendChild(link);
        status.appendChild(document.createTextNode('.'));
      }

      function finish() {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send message';
      }

      // Opened from a file on the computer: browsers block the request, so say so clearly
      if (window.location.protocol === 'file:') {
        showFailure('This form only works on the live website, not when the page is opened from a file.');
        finish();
        return;
      }

      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          return res.json().catch(function () { return {}; }).then(function (data) { return { ok: res.ok, data: data }; });
        })
        .then(function (r) {
          if (r.ok && (r.data.success === true || r.data.success === 'true')) {
            setStatus('Thank you! Your message has been sent. I will reply to you by email soon.', false);
            form.reset();
            return;
          }
          var msg = (r.data && r.data.message) ? String(r.data.message) : '';
          if (console && console.error) console.error('FormSubmit response:', r.data);
          if (/activat/i.test(msg)) {
            showFailure('The form is not activated yet. The site owner needs to click the activation link FormSubmit sent to her Gmail.');
          } else if (msg) {
            showFailure('Your message could not be sent (' + msg + ').');
          } else {
            showFailure('Your message could not be sent. Please try again.');
          }
        })
        .catch(function (err) {
          if (console && console.error) console.error('Form request failed:', err);
          showFailure('Your message could not be sent because the connection failed. Please try again.');
        })
        .then(finish);
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
