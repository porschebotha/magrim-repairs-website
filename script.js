/* =============================================================
   Magrim Repairs - site configuration
   PLACEHOLDER: update the Facebook URL below with your real page.
   ============================================================= */
const CONFIG = {
  // WhatsApp number in international format, digits only.
  whatsappNumber: "264811241463",

  // The message that is pre-filled when a customer taps a WhatsApp button.
  prefilledMessage:
    "Hello Magrim Repairs, I would like a quote. " +
    "Here are photos of my damaged rims:",

  // PLACEHOLDER: replace with the real Magrim Repairs Facebook Page URL.
  facebookUrl: "https://www.facebook.com/",

  // Gallery photos for "Our Recent Rim Repair Work". File names refer to
  // images in the images/ folder. Add or remove entries to update the
  // slideshow — it rebuilds automatically.
  galleryImages: [
    "car-1.JPG", "car-2.JPG", "car-3.JPG", "car-4.JPG", "car-5.JPG",
    "car-6.JPG", "car-7.JPG", "car-8.JPG", "car-9.JPG", "car-10.JPG",
    "car-11.jpg", "car-12.jpg", "car-13.jpg", "car-14.jpg",
  ],
};

/* =============================================================
   FIREBASE CONFIGURATION  (customer reviews backend)
   -------------------------------------------------------------
   Paste your Firebase project's web config below. To find it:
     1. Go to  https://console.firebase.google.com/
     2. Create a project (or open an existing one).
     3. Add a Web app:  Project Overview -> the "</>" web icon.
     4. Open  Project settings (gear icon) -> "General" tab.
     5. Under "Your apps" -> "SDK setup and configuration",
        choose "Config" and copy each value here.

   NOTE: these values are NOT secret. Firebase web config is
   meant to be public and safe to commit to GitHub. Your data is
   protected by Firestore SECURITY RULES, not by hiding these
   keys. See the "Firebase setup" section in README.md.

   Until real values replace the "YOUR_..." placeholders below,
   the reviews form keeps working but saves reviews only in the
   visitor's own browser (localStorage fallback).
   ============================================================= */
const FIREBASE_CONFIG = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

/* ------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
  // Build the WhatsApp link and apply it to every WhatsApp button.
  const waLink =
    "https://wa.me/" +
    CONFIG.whatsappNumber +
    "?text=" +
    encodeURIComponent(CONFIG.prefilledMessage);

  document.querySelectorAll("[data-whatsapp]").forEach(function (el) {
    el.setAttribute("href", waLink);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  // Apply the Facebook Page link.
  document.querySelectorAll("[data-facebook]").forEach(function (el) {
    el.setAttribute("href", CONFIG.facebookUrl);
  });

  // Current year in the footer.
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile navigation toggle.
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Add a subtle border to the header once the page is scrolled.
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // ===== Gallery slideshow =====
  setupGallery(reduceMotion);

  // ===== Customer reviews + submission form =====
  setupReviews(reduceMotion);

  // Scroll-reveal animations: stagger elements in as they enter the viewport.
  setupReveal(reduceMotion, ".reveal", 90);

  // ===== Image fallbacks =====
  // Show a styled placeholder in place of any image that fails to load.
  setupImageFallbacks();
});

function setupReveal(reduceMotion, selector, step) {
  const els = document.querySelectorAll(selector);
  if (reduceMotion || !("IntersectionObserver" in window)) {
    els.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const siblings = Array.prototype.slice.call(
          el.parentElement.querySelectorAll(":scope > " + selector)
        );
        const delay = Math.min(8, Math.max(0, siblings.indexOf(el))) * step;
        el.style.transitionDelay = delay + "ms";
        el.classList.add("is-visible");
        observer.unobserve(el);
      });
    },
    { threshold: 0.12 }
  );
  els.forEach(function (el) {
    observer.observe(el);
  });
}

function setupImageFallbacks() {
  function replaceWithPlaceholder(img) {
    if (!img.parentNode || img.dataset.fallbackDone) return;
    img.dataset.fallbackDone = "1";
    const ph = document.createElement("div");
    ph.className = "media-placeholder";
    ph.textContent = img.getAttribute("data-fallback") || "Photo coming soon";
    img.parentNode.replaceChild(ph, img);
  }

  document.querySelectorAll("img[data-fallback]").forEach(function (img) {
    if (img.complete && img.naturalWidth === 0) {
      replaceWithPlaceholder(img);
    } else {
      img.addEventListener("error", function () {
        replaceWithPlaceholder(img);
      });
    }
  });
}

function setupGallery(reduceMotion) {
  const track = document.querySelector("[data-slideshow-track]");
  const images = CONFIG.galleryImages || [];
  if (!track || images.length === 0) return;

  const slideshow = document.querySelector("[data-slideshow]");
  const prevArrow = document.querySelector("[data-slideshow-prev]");
  const nextArrow = document.querySelector("[data-slideshow-next]");
  const counter = document.querySelector("[data-slideshow-counter]");

  let index = 0;
  let timer = null;

  // Build one full-width slide per image.
  images.forEach(function (file, i) {
    const slide = document.createElement("figure");
    slide.className = "slideshow-slide";
    slide.tabIndex = 0;
    slide.setAttribute("role", "button");
    slide.setAttribute("aria-label", "View photo " + (i + 1) + " full screen");

    const img = document.createElement("img");
    img.src = "images/" + file;
    img.alt = "Magrim Repairs completed rim repair work";
    img.loading = i < 2 ? "eager" : "lazy";
    img.setAttribute("data-fallback", "Photo " + (i + 1));
    slide.appendChild(img);

    slide.addEventListener("click", function () {
      openLightbox(i);
    });
    slide.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(i);
      }
    });

    track.appendChild(slide);
  });

  function goTo(i) {
    index = (i + images.length) % images.length;
    track.style.transform = "translateX(-" + index * 100 + "%)";
    if (counter) counter.textContent = index + 1 + " / " + images.length;
  }

  function startAuto() {
    if (reduceMotion || images.length < 2) return;
    timer = window.setInterval(function () {
      goTo(index + 1);
    }, 5000);
  }
  function stopAuto() {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  }
  function restartAuto() {
    stopAuto();
    startAuto();
  }

  if (prevArrow) {
    prevArrow.addEventListener("click", function () {
      goTo(index - 1);
      restartAuto();
    });
  }
  if (nextArrow) {
    nextArrow.addEventListener("click", function () {
      goTo(index + 1);
      restartAuto();
    });
  }

  if (slideshow) {
    // Pause auto-advance while the visitor is interacting.
    slideshow.addEventListener("mouseenter", stopAuto);
    slideshow.addEventListener("mouseleave", startAuto);
    slideshow.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") {
        goTo(index - 1);
        restartAuto();
      } else if (e.key === "ArrowRight") {
        goTo(index + 1);
        restartAuto();
      }
    });
  }

  // Touch swipe to slide left/right.
  let swipeX = 0;
  let swiping = false;
  track.addEventListener(
    "touchstart",
    function (e) {
      swipeX = e.touches[0].clientX;
      swiping = true;
      stopAuto();
    },
    { passive: true }
  );
  track.addEventListener(
    "touchend",
    function (e) {
      if (!swiping) return;
      swiping = false;
      const dx = e.changedTouches[0].clientX - swipeX;
      if (Math.abs(dx) > 45) goTo(index + (dx < 0 ? 1 : -1));
      restartAuto();
    },
    { passive: true }
  );

  window.addEventListener("resize", function () {
    track.style.transform = "translateX(-" + index * 100 + "%)";
  });

  goTo(0);
  startAuto();

  // ===== Lightbox =====
  const lightbox = document.querySelector("[data-lightbox]");
  if (!lightbox) return;

  const lbImage = lightbox.querySelector("[data-lightbox-image]");
  const lbPrev = lightbox.querySelector("[data-lightbox-prev]");
  const lbNext = lightbox.querySelector("[data-lightbox-next]");
  const lbClose = lightbox.querySelector("[data-lightbox-close]");
  const lbCounter = lightbox.querySelector("[data-lightbox-counter]");
  let current = 0;

  function show(i) {
    current = (i + images.length) % images.length;
    lbImage.src = "images/" + images[current];
    if (lbCounter) {
      lbCounter.textContent = current + 1 + " / " + images.length;
    }
  }

  function openLightbox(i) {
    show(i);
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (lbPrev) {
    lbPrev.addEventListener("click", function () {
      show(current - 1);
    });
  }
  if (lbNext) {
    lbNext.addEventListener("click", function () {
      show(current + 1);
    });
  }
  if (lbClose) lbClose.addEventListener("click", closeLightbox);

  // Click on the dark backdrop (not the image) closes the viewer.
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation.
  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft") show(current - 1);
    else if (e.key === "ArrowRight") show(current + 1);
  });

  // Swipe support on the lightbox image (mobile).
  let startX = 0;
  let dragging = false;
  lbImage.addEventListener(
    "touchstart",
    function (e) {
      startX = e.touches[0].clientX;
      dragging = true;
    },
    { passive: true }
  );
  lbImage.addEventListener(
    "touchend",
    function (e) {
      if (!dragging) return;
      dragging = false;
      const deltaX = e.changedTouches[0].clientX - startX;
      if (Math.abs(deltaX) > 45) {
        show(current + (deltaX < 0 ? 1 : -1));
      }
    },
    { passive: true }
  );
}

function setupReviews(reduceMotion) {
  const grid = document.querySelector("[data-reviews]");
  const form = document.querySelector("[data-review-form]");
  if (!grid || !form) return;

  const STORAGE_KEY = "magrim-reviews";
  const LAST_SUBMIT_KEY = "magrim-last-review";
  const SUBMIT_COOLDOWN = 30000; // anti-spam: 30s between submissions

  const ratingInput = form.querySelector("[data-rating-input]");
  const stars = ratingInput
    ? Array.prototype.slice.call(ratingInput.querySelectorAll(".rating-star"))
    : [];
  const messageEl = form.querySelector("[data-form-message]");
  const nameInput = form.querySelector('[name="name"]');
  const commentInput = form.querySelector('[name="comment"]');
  const honeypot = form.querySelector("[data-hp]");
  const submitBtn = form.querySelector('button[type="submit"]');
  let rating = 0;

  // Reviews submitted by visitors are inserted ahead of this first
  // built-in (seed) review card.
  const firstSeedCard = grid.querySelector(".review-card");

  /* ----- Star rating input ----- */
  function paintStars(value) {
    stars.forEach(function (star, i) {
      star.classList.toggle("is-active", i < value);
    });
  }
  function setRating(value) {
    rating = value;
    paintStars(value);
  }
  stars.forEach(function (star) {
    const value = parseInt(star.getAttribute("data-value"), 10);
    star.addEventListener("click", function () {
      setRating(value);
    });
    star.addEventListener("mouseenter", function () {
      paintStars(value);
    });
  });
  if (ratingInput) {
    ratingInput.addEventListener("mouseleave", function () {
      paintStars(rating);
    });
  }

  /* ----- Card rendering ----- */
  function formatDate(date) {
    try {
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch (e) {
      return "";
    }
  }

  function buildCard(review) {
    // review: { name, rating, comment, dateLabel }
    const card = document.createElement("article");
    card.className = "review-card reveal";

    const starsEl = document.createElement("div");
    starsEl.className = "stars";
    starsEl.setAttribute("aria-label", review.rating + " out of 5 stars");
    for (let i = 1; i <= 5; i++) {
      const s = document.createElement("span");
      s.className = i <= review.rating ? "star-on" : "star-off";
      s.textContent = "★";
      starsEl.appendChild(s);
    }

    const text = document.createElement("p");
    text.className = "review-text";
    text.textContent = "“" + review.comment + "”";

    const reviewer = document.createElement("div");
    reviewer.className = "reviewer";
    const avatar = document.createElement("span");
    avatar.className = "reviewer-avatar";
    avatar.setAttribute("aria-hidden", "true");
    avatar.textContent = (review.name.trim().charAt(0) || "?").toUpperCase();
    const meta = document.createElement("div");
    const strong = document.createElement("strong");
    strong.textContent = review.name;
    const metaSpan = document.createElement("span");
    metaSpan.className = "reviewer-meta";
    metaSpan.textContent = review.dateLabel || "Customer review";
    meta.appendChild(strong);
    meta.appendChild(metaSpan);
    reviewer.appendChild(avatar);
    reviewer.appendChild(meta);

    card.appendChild(starsEl);
    card.appendChild(text);
    card.appendChild(reviewer);
    return card;
  }

  function revealCard(card, animate) {
    if (reduceMotion || !animate) {
      card.classList.add("is-visible");
    } else {
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          card.classList.add("is-visible");
        });
      });
    }
  }

  function showMessage(text, type) {
    if (!messageEl) return;
    messageEl.textContent = text;
    messageEl.className = "form-message is-" + type;
  }

  /* ----- Validation + basic spam protection ----- */
  function validateSubmission() {
    // Honeypot: a hidden field that real visitors never fill.
    if (honeypot && honeypot.value.trim() !== "") {
      return { ok: false, silent: true };
    }
    // Cooldown: block rapid repeat submissions from the same browser.
    try {
      const last = parseInt(
        window.localStorage.getItem(LAST_SUBMIT_KEY) || "0",
        10
      );
      if (last && Date.now() - last < SUBMIT_COOLDOWN) {
        return {
          ok: false,
          message: "Please wait a moment before submitting another review.",
        };
      }
    } catch (e) {
      /* localStorage unavailable — skip the cooldown check */
    }

    const name = nameInput.value.trim();
    const comment = commentInput.value.trim();
    if (name.length < 2) {
      return { ok: false, message: "Please enter your name.", focus: nameInput };
    }
    if (name.length > 60) {
      return { ok: false, message: "That name is too long.", focus: nameInput };
    }
    if (rating < 1 || rating > 5) {
      return { ok: false, message: "Please select a star rating." };
    }
    if (comment.length < 4) {
      return {
        ok: false,
        message: "Please write a short review.",
        focus: commentInput,
      };
    }
    if (comment.length > 400) {
      return {
        ok: false,
        message: "That review is too long (max 400 characters).",
        focus: commentInput,
      };
    }
    return { ok: true, name: name, rating: rating, comment: comment };
  }

  function handleInvalid(result) {
    if (!result.silent && result.message) {
      showMessage(result.message, "error");
      if (result.focus) result.focus.focus();
    }
  }

  function afterSuccess() {
    form.reset();
    setRating(0);
    try {
      window.localStorage.setItem(LAST_SUBMIT_KEY, String(Date.now()));
    } catch (e) {
      /* ignore */
    }
    showMessage("Thank you! Your review has been posted.", "success");
  }

  /* =========================================================
     Backend: Firebase Firestore when configured (see
     FIREBASE_CONFIG at the top of this file), otherwise the
     review is saved only in the visitor's own browser.
     ========================================================= */
  const firebaseReady =
    typeof firebase !== "undefined" &&
    typeof FIREBASE_CONFIG === "object" &&
    typeof FIREBASE_CONFIG.apiKey === "string" &&
    FIREBASE_CONFIG.apiKey.indexOf("YOUR_") !== 0;

  if (firebaseReady && setupFirestoreBackend()) {
    return;
  }
  setupLocalBackend();

  /* ----- Firebase Firestore backend (permanent, shared storage) ----- */
  function setupFirestoreBackend() {
    let db;
    try {
      if (!firebase.apps || !firebase.apps.length) {
        firebase.initializeApp(FIREBASE_CONFIG);
      }
      db = firebase.firestore();
    } catch (e) {
      return false; // fall back to local storage
    }

    const collection = db.collection("reviews");
    const seenIds = {};
    let dynamicCards = [];

    // Live listener: any review added to Firestore (by anyone) shows
    // up immediately, without a page reload.
    collection.onSnapshot(
      function (snapshot) {
        const items = [];
        snapshot.forEach(function (doc) {
          const d = doc.data() || {};
          let date = null;
          if (d.createdAt && typeof d.createdAt.toDate === "function") {
            date = d.createdAt.toDate();
          }
          items.push({
            id: doc.id,
            name: String(d.name || ""),
            rating: Number(d.rating) || 0,
            comment: String(d.comment || ""),
            date: date,
          });
        });
        // Newest first; a review still awaiting its server timestamp
        // sorts to the very top.
        items.sort(function (a, b) {
          const ta = a.date ? a.date.getTime() : Infinity;
          const tb = b.date ? b.date.getTime() : Infinity;
          return tb - ta;
        });

        dynamicCards.forEach(function (c) {
          c.remove();
        });
        dynamicCards = [];
        items.forEach(function (item) {
          const isNew = !seenIds[item.id];
          seenIds[item.id] = true;
          const card = buildCard({
            name: item.name,
            rating: item.rating,
            comment: item.comment,
            dateLabel: item.date ? formatDate(item.date) : "Just now",
          });
          grid.insertBefore(card, firstSeedCard);
          dynamicCards.push(card);
          revealCard(card, isNew);
        });
      },
      function () {
        showMessage(
          "Reviews could not load right now. Please try again later.",
          "error"
        );
      }
    );

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const result = validateSubmission();
      if (!result.ok) {
        handleInvalid(result);
        return;
      }
      if (submitBtn) submitBtn.disabled = true;
      showMessage("Posting your review…", "success");

      collection
        .add({
          name: result.name,
          rating: result.rating,
          comment: result.comment,
          // Date submitted — set by Firebase's servers.
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(function () {
          afterSuccess();
        })
        .catch(function () {
          showMessage(
            "Sorry, your review could not be saved. Please try again.",
            "error"
          );
        })
        .then(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });

    return true;
  }

  /* ----- Browser-only fallback (used when Firebase is not set up) ----- */
  function setupLocalBackend() {
    function readStored() {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        return [];
      }
    }
    function writeStored(list) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      } catch (e) {
        /* storage unavailable — the review still shows for this visit */
      }
    }

    readStored().forEach(function (review) {
      grid.insertBefore(
        buildCard({
          name: review.name,
          rating: review.rating,
          comment: review.comment,
          dateLabel: review.date
            ? formatDate(new Date(review.date))
            : "Customer review",
        }),
        firstSeedCard
      );
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const result = validateSubmission();
      if (!result.ok) {
        handleInvalid(result);
        return;
      }

      const review = {
        name: result.name,
        rating: result.rating,
        comment: result.comment,
        date: new Date().toISOString(),
      };
      const list = readStored();
      list.push(review);
      writeStored(list);

      const card = buildCard({
        name: review.name,
        rating: review.rating,
        comment: review.comment,
        dateLabel: formatDate(new Date(review.date)),
      });
      grid.insertBefore(card, firstSeedCard);
      revealCard(card, true);

      afterSuccess();
      card.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
}
