/* Kiprop Haggai portfolio: small enhancements, nothing here is required to read the site */
(function () {
  'use strict';
  var d = document, root = d.documentElement;
  root.classList.remove('no-js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };

  /* nav: stuck state + mobile menu */
  var nav = $('#nav');
  function onScroll() { if (nav) nav.classList.toggle('stuck', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  var mb = $('#menuBtn');
  if (mb && nav) {
    mb.addEventListener('click', function () {
      var o = nav.classList.toggle('open'); mb.setAttribute('aria-expanded', o);
      mb.textContent = o ? 'Close' : 'Menu';
    });
  }

  /* reveal on scroll */
  var rv = $$('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    rv.forEach(function (el) { io.observe(el); });
  } else { rv.forEach(function (el) { el.classList.add('in'); }); }

  /* count-up */
  function fmt(n) { return n.toLocaleString('en-US'); }
  var counters = $$('[data-count]');
  if (counters.length) {
    var co = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return; co.unobserve(e.target);
        var el = e.target, to = +el.dataset.count, suf = el.dataset.suffix || '';
        if (reduce) { el.textContent = fmt(to) + suf; return; }
        var t0 = performance.now(), dur = 1100;
        (function tick(t) {
          var p = Math.min(1, (t - t0) / dur), v = Math.round(to * (1 - Math.pow(1 - p, 3)));
          el.textContent = fmt(v) + suf; if (p < 1) requestAnimationFrame(tick);
        })(t0);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { co.observe(c); });
  }

  /* instant-feeling navigation: prefetch on hover/touch for browsers without speculation rules */
  var seen = {};
  function prefetch(a) {
    if (!a || !a.href || a.origin !== location.origin || seen[a.href] || a.href === location.href) return;
    seen[a.href] = 1; var l = d.createElement('link'); l.rel = 'prefetch'; l.href = a.href; d.head.appendChild(l);
  }
  d.addEventListener('pointerover', function (e) { prefetch(e.target.closest && e.target.closest('a')); }, { passive: true });
  d.addEventListener('touchstart', function (e) { prefetch(e.target.closest && e.target.closest('a')); }, { passive: true });

  /* contour terrain on home hero (marching squares, pointer raises a hill) */
  var cv = $('#terrain');
  if (cv) {
    var ctx = cv.getContext('2d'), W = 0, H = 0, dpr = 1, cell = 14, cols = 0, rows = 0, vals;
    var mx = 0.5, my = 0.35, tx = 0.5, ty = 0.35, run = true, vis = true;
    var SEG = { 1: [[3, 2]], 2: [[2, 1]], 3: [[3, 1]], 4: [[0, 1]], 5: [[0, 1], [3, 2]], 6: [[0, 2]], 7: [[0, 3]], 8: [[0, 3]], 9: [[0, 2]], 10: [[0, 3], [1, 2]], 11: [[0, 1]], 12: [[3, 1]], 13: [[2, 1]], 14: [[3, 2]] };
    var resize = function () {
      var r = cv.getBoundingClientRect(); dpr = Math.min(2, window.devicePixelRatio || 1);
      W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = W < 500 ? 12 : 14; cols = Math.ceil(W / cell) + 1; rows = Math.ceil(H / cell) + 1; vals = new Float32Array(cols * rows);
      draw(performance.now());
    };
    var field = function (x, y, t) {
      var dx = x - mx, dy = y - my;
      return Math.sin(x * 5.1 + t * .00031) * .55 + Math.cos(y * 4.3 - t * .00027) * .5 + Math.sin((x + y) * 3.4 + t * .00018) * .45 + 1.7 * Math.exp(-(dx * dx + dy * dy) / .035);
    };
    var pt = function (e, x0, y0, a, b, c, d2, lv) {
      var f = function (p, q) { return (lv - p) / (q - p || 1e-6); };
      if (e === 0) return [x0 + f(a, b) * cell, y0];
      if (e === 1) return [x0 + cell, y0 + f(b, c) * cell];
      if (e === 2) return [x0 + f(d2, c) * cell, y0 + cell];
      return [x0, y0 + f(a, d2) * cell];
    };
    var draw = function (t) {
      if (!W) return;
      ctx.clearRect(0, 0, W, H);
      for (var j = 0; j < rows; j++) for (var i = 0; i < cols; i++) vals[j * cols + i] = field(i * cell / W, j * cell / W, t);
      for (var lv = -1.4, k = 0; lv < 1.7; lv += .2, k++) {
        ctx.beginPath();
        for (var y = 0; y < rows - 1; y++) for (var x = 0; x < cols - 1; x++) {
          var a = vals[y * cols + x], b = vals[y * cols + x + 1], c = vals[(y + 1) * cols + x + 1], dd = vals[(y + 1) * cols + x];
          var idx = (a > lv ? 8 : 0) | (b > lv ? 4 : 0) | (c > lv ? 2 : 0) | (dd > lv ? 1 : 0);
          var s = SEG[idx]; if (!s) continue;
          for (var q = 0; q < s.length; q++) {
            var p1 = pt(s[q][0], x * cell, y * cell, a, b, c, dd, lv), p2 = pt(s[q][1], x * cell, y * cell, a, b, c, dd, lv);
            ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]);
          }
        }
        var hi = k % 5 === 0;
        ctx.strokeStyle = hi ? 'rgba(246,166,35,.95)' : 'rgba(169,216,210,' + (.28 + (k % 5) * .06) + ')';
        ctx.lineWidth = hi ? 1.6 : 1; ctx.stroke();
      }
    };
    var loop = function (t) {
      if (!run) return;
      mx += (tx - mx) * .08; my += (ty - my) * .08;
      if (vis) draw(t); requestAnimationFrame(loop);
    };
    cv.parentNode.addEventListener('pointermove', function (e) {
      var r = cv.getBoundingClientRect(); tx = (e.clientX - r.left) / r.width; ty = (e.clientY - r.top) / r.width;
    });
    new ResizeObserver(resize).observe(cv);
    new IntersectionObserver(function (es) { vis = es[0].isIntersecting; }).observe(cv);
    resize();
    if (!reduce) requestAnimationFrame(loop);
  }

  /* projects: filter with a smooth same-page transition, filter kept in the URL hash */
  var fb = $('#filters');
  if (fb) {
    var cards = $$('.card[data-cat]'), chips = $$('.chip', fb), cnt = $('#count');
    var apply = function (f) {
      var n = 0;
      cards.forEach(function (c) { var show = f === 'all' || c.dataset.cat.split(' ').indexOf(f) > -1; c.hidden = !show; if (show) n++; });
      chips.forEach(function (c) { c.setAttribute('aria-pressed', c.dataset.f === f); });
      if (cnt) cnt.textContent = n + (n === 1 ? ' project' : ' projects');
    };
    var set = function (f, push) {
      var go = function () { apply(f); };
      if (d.startViewTransition && !reduce && !push) d.startViewTransition(go); else go();
      try { history.replaceState(null, '', f === 'all' ? location.pathname : '#' + f); } catch (e) { }
    };
    chips.forEach(function (c) { c.addEventListener('click', function () { set(c.dataset.f); }); });
    var h = location.hash.replace('#', ''); if (h && chips.some(function (c) { return c.dataset.f === h; })) apply(h); else apply('all');
  }

  /* about: timeline filter + toggles, skills explorer, scrollspy */
  var tl = $('#roleFilters');
  if (tl) {
    var rs = $$('.role'), cs = $$('.chip', tl);
    cs.forEach(function (c) {
      c.addEventListener('click', function () {
        var f = c.dataset.f, go = function () {
          rs.forEach(function (r) { r.hidden = !(f === 'all' || r.dataset.tags.split(' ').indexOf(f) > -1); });
          cs.forEach(function (x) { x.setAttribute('aria-pressed', x === c); });
        };
        if (d.startViewTransition && !reduce) d.startViewTransition(go); else go();
      });
    });
  }
  $$('.toggle').forEach(function (b) {
    b.addEventListener('click', function () {
      var r = b.closest('.role'), o = r.classList.toggle('open'); b.setAttribute('aria-expanded', o); b.textContent = o ? 'Show less' : 'Show more';
    });
  });
  var sl = $('#skillList'), sp = $('#panel');
  if (sl && sp && window.SKILLS) {
    var names = window.ROLE_NAMES || {};
    window.SKILLS.forEach(function (s, i) {
      var b = d.createElement('button'); b.type = 'button'; b.className = 'chip'; b.textContent = s.n; b.setAttribute('aria-pressed', 'false');
      b.addEventListener('click', function () {
        $$('.chip', sl).forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
        var html = '<h3>' + s.n + '</h3><ul>';
        s.e.forEach(function (e) { html += '<li>' + e[1] + ' <a href="#role-' + e[0] + '">' + (names[e[0]] || e[0]) + '</a></li>'; });
        sp.innerHTML = html + '</ul>';
      });
      sl.appendChild(b); if (i === 0) b.click();
    });
    $$('.panel').forEach(function (p) { p.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#role-"]'); if (!a) return;
      var r = $(a.getAttribute('href')); if (r) { r.hidden = false; r.classList.add('open'); var t = $('.toggle', r); if (t) { t.setAttribute('aria-expanded', 'true'); t.textContent = 'Show less'; } }
    }); });
  }
  var sub = $('.subnav');
  if (sub && 'IntersectionObserver' in window) {
    var links = $$('a', sub), map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { links.forEach(function (l) { l.classList.remove('on'); }); map[e.target.id].classList.add('on'); } });
    }, { rootMargin: '-35% 0px -60% 0px' });
    Object.keys(map).forEach(function (id) { var el = d.getElementById(id); if (el) so.observe(el); });
  }

  /* project detail: reading progress, arrow-key paging, gallery lightbox */
  var bar = $('#progress');
  if (bar) {
    var upd = function () { var h = root.scrollHeight - innerHeight; bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(1, scrollY / h) : 0) + ')'; };
    window.addEventListener('scroll', upd, { passive: true }); upd();
  }
  d.addEventListener('keydown', function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey || /input|textarea|select/i.test(e.target.tagName)) return;
    var a = e.key === 'ArrowLeft' ? $('.pn .prev') : e.key === 'ArrowRight' ? $('.pn .next') : null;
    if (a) location.href = a.href;
  });
  var lb = $('#lb');
  if (lb) {
    var li = $('img', lb);
    $$('.gallery button').forEach(function (b) {
      b.addEventListener('click', function () { var im = $('img', b); li.src = im.currentSrc || im.src; li.alt = im.alt; if (lb.showModal) lb.showModal(); });
    });
    lb.addEventListener('click', function () { lb.close(); });
  }

  /* contact: copy email */
  var cp = $('#copy'), toast = $('#toast');
  if (cp) cp.addEventListener('click', function () {
    var m = cp.dataset.mail, done = function (ok) { if (toast) { toast.textContent = ok ? 'Copied to clipboard' : 'Press Ctrl+C to copy: ' + m; setTimeout(function () { toast.textContent = ''; }, 2600); } };
    if (navigator.clipboard) navigator.clipboard.writeText(m).then(function () { done(true); }, function () { done(false); }); else done(false);
  });
})();
