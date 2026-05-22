/* =============================================================
   Magrim Repairs - site configuration
   PLACEHOLDER: replace the values below with your real details.
   ============================================================= */
const CONFIG = {
  // Enter your WhatsApp number in international format, digits only.
  // Namibia country code is 264. Example: "264811234567"
  whatsappNumber: "264000000000",

  // The message that is pre-filled when a customer taps a WhatsApp button.
  prefilledMessage:
    "Hello Magrim Repairs, I would like help with my car rim. " +
    "Here is a photo of the damage:",
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

  // Show the readable number in the contact section (if still a placeholder
  // it just stays as the default text).
  if (CONFIG.whatsappNumber && CONFIG.whatsappNumber !== "264000000000") {
    document.querySelectorAll("[data-whatsapp-number]").forEach(function (el) {
      el.textContent = "+" + CONFIG.whatsappNumber;
    });
  }

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

  // Scroll-reveal animations: stagger elements in as they enter the viewport.
  const revealEls = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

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
});
