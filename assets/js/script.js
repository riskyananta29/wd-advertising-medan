'use strict';

/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else if (elem) {
    elem.addEventListener(type, callback);
  }
}



/**
 * toggle navbar
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
}

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * header active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * Auto-play video saat di-scroll ke layar
 */
const aboutVideo = document.getElementById("aboutVideo");

if (aboutVideo) {
  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Putar video saat masuk ke area layar
          aboutVideo.play().catch((err) => {
            console.log("Autoplay dicegah browser:", err);
          });
        } else {
          // Jeda video saat keluar dari layar untuk menghemat performa
          aboutVideo.pause();
        }
      });
    },
    {
      threshold: 0.4 // Video otomatis jalan saat 40% bagian video terlihat di layar
    }
  );

  videoObserver.observe(aboutVideo);
}



/**
 * Scroll Reveal Animation (Transisi Elegan & Dinamis)
 */

const revealTargets = document.querySelectorAll(
  ".hero-content, .hero-banner, .section-title, .section-text, .project-card, .about-banner, .about-content, .cta-subtitle, .cta .btn, .blog-card, .contact-form, .contact-card"
);

revealTargets.forEach((el) => {
  el.classList.add("reveal");

  const parentLi = el.closest("li");
  if (parentLi && parentLi.parentElement) {
    const siblingIndex = Array.from(parentLi.parentElement.children).indexOf(parentLi);
    if (siblingIndex % 3 === 1) el.classList.add("reveal-delay-1");
    if (siblingIndex % 3 === 2) el.classList.add("reveal-delay-2");
  }
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -30px 0px"
  }
);

revealTargets.forEach((el) => revealObserver.observe(el));