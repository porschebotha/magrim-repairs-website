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
  // gallery — the grid and lightbox rebuild automatically.
  galleryImages: [
    "car-1.JPG", "car-2.JPG", "car-3.JPG", "car-4.JPG", "car-5.JPG",
    "car-6.JPG", "car-7.JPG", "car-8.JPG", "car-9.JPG", "car-10.JPG",
    "car-11.jpg", "car-12.jpg", "car-13.jpg", "car-14.jpg",
    "rim-1.JPG", "rim-2.JPG", "rim-3.JPG", "rim-4.JPG", "rim-5.JPG",
    "rim-6.JPG", "rim-7.JPG", "rim-8.JPG", "rim-9.JPG", "rim-10.JPG",
    "rim-11.JPG", "rim-12.JPG", "rim-13.JPG", "rim-14.JPG", "rim-15.JPG",
    "rim-16.JPG", "rim-17.JPG", "rim-18.JPG", "rim-19.JPG", "rim-20.JPG",
    "rim-21.JPG", "rim-22.JPG", "rim-23.JPG", "rim-24.JPG", "rim-26.JPG",
    "rim-27.JPG", "rim-28.JPG", "rim-29.JPG", "rim-30.JPG", "rim-31.JPG",
    "rim-32.jpg", "rim-33.jpg", "rim-34.jpg", "rim-35.jpg", "rim-36.JPG",
    "rim-37.jpg", "rim-38.JPG", "rim-39.JPG", "rim-40.JPG", "rim-41.JPG",
    "rim-42.JPG", "rim-43.JPG", "rim-44.JPG", "rim-45.JPG", "rim-46.JPG",
    "rim-47.JPG", "rim-48.JPG", "rim-49.JPG", "rim-50.JPG", "rim-51.JPG",
    "rim-52.JPG", "rim-53.JPG", "rim-54.JPG", "rim-55.JPG", "rim-56.JPG",
    "rim-57.JPG", "rim-58.JPG", "rim-59.JPG", "rim-278.JPG",
  ],
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
