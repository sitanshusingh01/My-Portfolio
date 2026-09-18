const root = document.documentElement;
const header = document.querySelector("[data-header]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const sections = navLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
const form = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");
const year = document.querySelector("[data-year]");

if (year) {
  year.textContent = new Date().getFullYear();
}

const syncThemeToggleLabel = () => {
  if (!themeToggle) return;

  const isDark = root.dataset.theme === "dark";
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  themeToggle.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
};

syncThemeToggleLabel();

themeToggle?.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  syncThemeToggleLabel();

  try {
    localStorage.setItem("portfolio-theme", root.dataset.theme);
  } catch {
    return;
  }
});

const syncHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 8);
};

syncHeaderState();
window.addEventListener("scroll", syncHeaderState, { passive: true });

const closeNavigation = () => {
  document.body.classList.remove("nav-open");
  navToggle?.setAttribute("aria-expanded", "false");
  navToggle?.setAttribute("aria-label", "Open navigation");
};

navToggle?.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

nav?.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    closeNavigation();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeNavigation();
  }
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.14 }
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    if (element.getBoundingClientRect().top < window.innerHeight * 0.92) {
      element.classList.add("is-visible");
    }

    revealObserver.observe(element);
  });

  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("is-active", isActive);

          if (isActive) {
            link.setAttribute("aria-current", "page");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    { rootMargin: "-35% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => activeObserver.observe(section));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
}

const galleries = {
  "food-delivery": [
    { full: "assets/screenshots/food-delivery/fd-01-landing.jpg", thumb: "assets/screenshots/food-delivery/fd-01-landing-thumb.jpg", label: "Landing Page" },
    { full: "assets/screenshots/food-delivery/fd-02-overview.jpg", thumb: "assets/screenshots/food-delivery/fd-02-overview-thumb.jpg", label: "Project Overview" },
    { full: "assets/screenshots/food-delivery/fd-03-dataset-schema.jpg", thumb: "assets/screenshots/food-delivery/fd-03-dataset-schema-thumb.jpg", label: "Dataset Schema" },
    { full: "assets/screenshots/food-delivery/fd-04-kpi-dashboard.jpg", thumb: "assets/screenshots/food-delivery/fd-04-kpi-dashboard-thumb.jpg", label: "KPI Dashboard" },
    { full: "assets/screenshots/food-delivery/fd-05-city-analysis.jpg", thumb: "assets/screenshots/food-delivery/fd-05-city-analysis-thumb.jpg", label: "City Analysis" },
  ],
  plasticnet: [
    { full: "assets/screenshots/plasticnet/pn-01-landing.jpg", thumb: "assets/screenshots/plasticnet/pn-01-landing-thumb.jpg", label: "Landing Page" },
    { full: "assets/screenshots/plasticnet/pn-02-segmentation-overlay.jpg", thumb: "assets/screenshots/plasticnet/pn-02-segmentation-overlay-thumb.jpg", label: "Segmentation Overlay" },
    { full: "assets/screenshots/plasticnet/pn-03-segmentation-mask.jpg", thumb: "assets/screenshots/plasticnet/pn-03-segmentation-mask-thumb.jpg", label: "Segmentation Mask" },
    { full: "assets/screenshots/plasticnet/pn-04-classification.jpg", thumb: "assets/screenshots/plasticnet/pn-04-classification-thumb.jpg", label: "Classification" },
    { full: "assets/screenshots/plasticnet/pn-05-zone-mapping.jpg", thumb: "assets/screenshots/plasticnet/pn-05-zone-mapping-thumb.jpg", label: "Zone Mapping" },
  ],
};

const lightbox = document.querySelector("[data-lightbox]");
const lightboxImg = document.querySelector("[data-lightbox-img]");
const lightboxLabel = document.querySelector("[data-lightbox-label]");
const lightboxCounter = document.querySelector("[data-lightbox-counter]");
const lightboxThumbs = document.querySelector("[data-lightbox-thumbs]");
const lightboxClose = document.querySelector("[data-lightbox-close]");
const lightboxBackdrop = document.querySelector("[data-lightbox-backdrop]");
const lightboxPrev = document.querySelector("[data-lightbox-prev]");
const lightboxNext = document.querySelector("[data-lightbox-next]");
const galleryTriggers = [...document.querySelectorAll("[data-gallery-trigger]")];

let activeGallery = null;
let activeIndex = 0;
let lastFocusedElement = null;

const renderLightbox = () => {
  if (!activeGallery || !lightboxImg) return;

  const item = activeGallery[activeIndex];
  lightboxImg.src = item.full;
  lightboxImg.alt = item.label;

  if (lightboxLabel) lightboxLabel.textContent = item.label;
  if (lightboxCounter) lightboxCounter.textContent = `${activeIndex + 1} / ${activeGallery.length}`;

  if (lightboxThumbs) {
    lightboxThumbs.innerHTML = "";
    activeGallery.forEach((thumbItem, index) => {
      const thumbButton = document.createElement("button");
      thumbButton.type = "button";
      thumbButton.className = index === activeIndex ? "is-active" : "";
      thumbButton.setAttribute("aria-label", `View ${thumbItem.label}`);

      const thumbImg = document.createElement("img");
      thumbImg.src = thumbItem.thumb;
      thumbImg.alt = "";
      thumbImg.loading = "lazy";

      thumbButton.appendChild(thumbImg);
      thumbButton.addEventListener("click", () => {
        activeIndex = index;
        renderLightbox();
      });

      lightboxThumbs.appendChild(thumbButton);
    });
  }
};

const openLightbox = (key, startIndex, triggerElement) => {
  const gallery = galleries[key];
  if (!gallery || !lightbox) return;

  activeGallery = gallery;
  activeIndex = startIndex;
  lastFocusedElement = triggerElement || document.activeElement;

  renderLightbox();

  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
  lightboxClose?.focus();
};

const closeLightbox = () => {
  if (!lightbox) return;

  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
  activeGallery = null;

  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  }
};

const showPrev = () => {
  if (!activeGallery) return;
  activeIndex = (activeIndex - 1 + activeGallery.length) % activeGallery.length;
  renderLightbox();
};

const showNext = () => {
  if (!activeGallery) return;
  activeIndex = (activeIndex + 1) % activeGallery.length;
  renderLightbox();
};

galleryTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const key = trigger.getAttribute("data-gallery-trigger");
    openLightbox(key, 0, trigger);
  });
});

lightboxClose?.addEventListener("click", closeLightbox);
lightboxBackdrop?.addEventListener("click", closeLightbox);
lightboxPrev?.addEventListener("click", showPrev);
lightboxNext?.addEventListener("click", showNext);

document.addEventListener("keydown", (event) => {
  if (!lightbox?.classList.contains("is-open")) return;

  if (event.key === "Escape") {
    closeLightbox();
  } else if (event.key === "ArrowLeft") {
    showPrev();
  } else if (event.key === "ArrowRight") {
    showNext();
  }
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !subject || !message) {
    if (formStatus) {
      formStatus.textContent = "Please complete every field before sending.";
    }
    return;
  }

  const mailSubject = encodeURIComponent(subject);
  const mailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

  window.location.href = `mailto:official.sitanshu369@gmail.com?subject=${mailSubject}&body=${mailBody}`;

  if (formStatus) {
    formStatus.textContent = "Opening your email app with the drafted message.";
  }

  form.reset();
});
