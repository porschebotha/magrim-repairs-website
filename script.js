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

  // Gallery carousel auto-slide interval, in milliseconds.
  carouselInterval: 4500,
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
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
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

  // Scroll-reveal animations: stagger elements in as they enter the viewport.
  const revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const siblings = Array.prototype.slice.call(
            el.parentElement.querySelectorAll(":scope > .reveal")
          );
          const delay = Math.max(0, siblings.indexOf(el)) * 90;
          el.style.transitionDelay = delay + "ms";
          el.classList.add("is-visible");
          observer.unobserve(el);
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ===== Gallery carousel =====
  setupCarousel(reduceMotion);
});

function setupCarousel(reduceMotion) {
  const carousel = document.querySelector("[data-carousel]");
  if (!carousel) return;

  const track = carousel.querySelector("[data-carousel-track]");
  const slides = Array.prototype.slice.call(
    carousel.querySelectorAll(".carousel-slide")
  );
  const prevBtn = carousel.querySelector("[data-carousel-prev]");
  const nextBtn = carousel.querySelector("[data-carousel-next]");
  const dotsWrap = carousel.querySelector("[data-carousel-dots]");
  if (!track || slides.length === 0) return;

  let index = 0;
  let timer = null;

  // Build navigation dots.
  const dots = slides.map(function (_, i) {
    const dot = document.createElement("button");
    dot.className = "carousel-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", "Go to photo " + (i + 1));
    dot.addEventListener("click", function () {
      goTo(i);
      restartAuto();
    });
    dotsWrap.appendChild(dot);
    return dot;
  });

  function goTo(next) {
    index = (next + slides.length) % slides.length;
    track.style.transform = "translateX(-" + index * 100 + "%)";
    dots.forEach(function (dot, i) {
      dot.classList.toggle("active", i === index);
    });
  }

  function startAuto() {
    if (reduceMotion || slides.length < 2) return;
    timer = window.setInterval(function () {
      goTo(index + 1);
    }, CONFIG.carouselInterval);
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

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      goTo(index - 1);
      restartAuto();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      goTo(index + 1);
      restartAuto();
    });
  }

  // Keyboard support.
  carousel.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      goTo(index - 1);
      restartAuto();
    } else if (e.key === "ArrowRight") {
      goTo(index + 1);
      restartAuto();
    }
  });

  // Pause auto-slide on hover (desktop).
  carousel.addEventListener("mouseenter", stopAuto);
  carousel.addEventListener("mouseleave", startAuto);

  // Touch / swipe support for mobile.
  let startX = 0;
  let dragging = false;
  track.addEventListener(
    "touchstart",
    function (e) {
      startX = e.touches[0].clientX;
      dragging = true;
      stopAuto();
    },
    { passive: true }
  );
  track.addEventListener(
    "touchend",
    function (e) {
      if (!dragging) return;
      dragging = false;
      const deltaX = e.changedTouches[0].clientX - startX;
      if (Math.abs(deltaX) > 40) {
        goTo(index + (deltaX < 0 ? 1 : -1));
      }
      restartAuto();
    },
    { passive: true }
  );

  goTo(0);
  startAuto();
}
