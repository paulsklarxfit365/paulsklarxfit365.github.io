/* PaulSklarXFit365 landing pages · media slots, checkout links, Meta Pixel, stories. Settings live in config.js. */
(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");

  var CFG = window.PSX_CONFIG || {};
  var MEDIA = window.PSX_MEDIA || {};
  var VARIANT = document.body.getAttribute("data-variant") || "page";

  /* ---------- Meta Pixel ---------- */
  var pixelId = (CFG.pixelId || "").trim();
  if (pixelId) {
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", pixelId);
    window.fbq("track", "PageView");
    window.fbq("track", "ViewContent", { content_name: VARIANT, content_category: "PaulSklarXFit365" });
  }
  function track(evt, data) { if (window.fbq) window.fbq("track", evt, data || {}); }

  /* ---------- Price ---------- */
  Array.prototype.forEach.call(document.querySelectorAll("[data-price]"), function (el) {
    el.textContent = (CFG.price || "$39.99") + (el.hasAttribute("data-per") ? (CFG.per || "/mo") : "");
  });

  /* ---------- Checkout links (pass UTM / fbclid through) ---------- */
  var base = (CFG.checkoutUrl || "").trim();
  if (!base) { console.warn("[PSX] checkoutUrl is empty in assets/js/config.js"); }
  function checkoutHref() {
    if (!base) return "#";
    var keep = new URLSearchParams();
    new URLSearchParams(location.search).forEach(function (v, k) {
      if (/^utm_|^fbclid$/.test(k)) keep.set(k, v);
    });
    if (!keep.has("utm_content")) keep.set("utm_content", VARIANT);
    var q = keep.toString();
    return base + (q ? (base.indexOf("?") > -1 ? "&" : "?") + q : "");
  }
  Array.prototype.forEach.call(document.querySelectorAll("[data-checkout]"), function (a) {
    a.href = checkoutHref();
    a.addEventListener("click", function (e) {
      if (!base) { e.preventDefault(); return; }
      track("InitiateCheckout", { content_name: VARIANT, value: parseFloat((CFG.price || "39.99").replace(/[^0-9.]/g, "")) || 39.99, currency: "USD" });
      if (window.fbq && !a.target) {           // give the pixel a moment before leaving the page
        e.preventDefault();
        setTimeout(function () { location.href = a.href; }, 250);
      }
    });
  });

  /* ---------- Logo ---------- */
  var logo = (CFG.logo || "").trim();
  if (logo) {
    Array.prototype.forEach.call(document.querySelectorAll("[data-logo]"), function (holder) {
      var img = new Image(); img.alt = "PaulSklarXFit";
      img.onload = function () { holder.innerHTML = ""; holder.appendChild(img); };
      img.src = logo;
    });
  }

  /* ---------- Media slots ---------- */
  function youtubeId(u) { var m = u.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/); return m ? m[1] : null; }
  function vimeoId(u) { var m = u.match(/vimeo\.com\/(?:video\/)?(\d+)/); return m ? m[1] : null; }
  function isImage(u) { return /\.(jpe?g|png|webp|avif|gif|svg)(\?.*)?$/i.test(u); }

  function fillSlot(slot, src, key) {
    src = (src || "").trim();
    var loop = slot.hasAttribute("data-loop");
    var label = slot.getAttribute("data-label") || key;
    if (!src) {
      slot.classList.add("slot--empty");
      var cap = document.createElement("span");
      cap.className = "slot__cap";
      cap.textContent = label + " · " + key;
      slot.appendChild(cap);
      return;
    }
    var el, yt = youtubeId(src), vm = vimeoId(src);
    if (yt) {
      el = document.createElement("iframe");
      el.src = "https://www.youtube-nocookie.com/embed/" + yt + "?rel=0&modestbranding=1&playsinline=1" +
        (loop ? "&autoplay=1&mute=1&loop=1&controls=0&playlist=" + yt : "");
      el.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      el.allowFullscreen = true;
      el.loading = loop ? "eager" : "lazy";
      el.title = label;
    } else if (vm) {
      el = document.createElement("iframe");
      el.src = "https://player.vimeo.com/video/" + vm + (loop ? "?autoplay=1&muted=1&loop=1&background=1" : "?dnt=1&playsinline=1");
      el.allow = "autoplay; fullscreen; picture-in-picture";
      el.loading = loop ? "eager" : "lazy";
      el.title = label;
    } else if (isImage(src)) {
      el = document.createElement("img");
      el.src = src; el.alt = slot.getAttribute("data-alt") || "";
      el.loading = loop ? "eager" : "lazy"; el.decoding = "async";
    } else {
      el = document.createElement("video");
      el.src = src; el.playsInline = true; el.setAttribute("playsinline", "");
      if (loop) {
        el.muted = true; el.defaultMuted = true; el.setAttribute("muted", "");
        el.autoplay = true; el.loop = true; el.preload = "auto";
        var kick = function () { var p = el.play(); if (p && p.catch) p.catch(function () {}); };
        el.addEventListener("canplay", kick, { once: true }); setTimeout(kick, 0);
      } else { el.controls = true; el.preload = "metadata"; }
    }
    slot.appendChild(el);
  }
  Array.prototype.forEach.call(document.querySelectorAll("[data-media]"), function (slot) {
    var key = slot.getAttribute("data-media");
    fillSlot(slot, MEDIA[key], key);
  });

  /* ---------- Member stories (section hidden until at least one is filled in) ---------- */
  var wrap = document.getElementById("stories");
  if (wrap) {
    var stories = (window.PSX_STORIES || []).filter(function (s) {
      return s && ((s.video || "").trim() || (s.quote || "").trim());
    }).slice(0, 3);
    if (!stories.length) {
      var sec = wrap.closest("section"); if (sec) sec.hidden = true;
    } else {
      stories.forEach(function (s, i) {
        var fig = document.createElement("figure");
        fig.className = "story";
        if ((s.video || "").trim()) {
          var slot = document.createElement("div");
          slot.className = "slot slot--9x16";
          slot.setAttribute("data-label", "Member story " + (i + 1));
          fig.appendChild(slot); fillSlot(slot, s.video, "story");
        }
        if ((s.quote || "").trim()) {
          var q = document.createElement("blockquote"); q.textContent = s.quote.trim(); fig.appendChild(q);
        }
        if ((s.name || "").trim() || (s.detail || "").trim()) {
          var c = document.createElement("figcaption");
          c.textContent = [s.name, s.detail].filter(function (x) { return (x || "").trim(); }).join(" · ");
          fig.appendChild(c);
        }
        wrap.appendChild(fig);
      });
    }
  }

  /* ---------- Sticky mobile bar: hide it while another Join button is on screen ---------- */
  var bar = document.querySelector(".mbar");
  if (bar && "IntersectionObserver" in window) {
    var visible = new Set();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { e.isIntersecting ? visible.add(e.target) : visible.delete(e.target); });
      bar.classList.toggle("is-hidden", visible.size > 0);
    });
    Array.prototype.forEach.call(document.querySelectorAll(".cta-block"), function (el) { io.observe(el); });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); ro.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    Array.prototype.forEach.call(reveals, function (el) { ro.observe(el); });
  } else {
    Array.prototype.forEach.call(reveals, function (el) { el.classList.add("is-in"); });
  }

  Array.prototype.forEach.call(document.querySelectorAll("[data-year]"), function (el) { el.textContent = new Date().getFullYear(); });
})();
