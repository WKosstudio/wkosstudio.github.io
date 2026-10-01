// WKos Studio — shared page behaviour (home + Games page).
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Old links to the Dice Imprint block on the home page now live on /games/.
  const legacy = { "#dice-imprint": "dice-imprint", "#trailer": "dice-trailer" };
  if (document.body.dataset.page === "home" && legacy[location.hash]) {
    location.replace("games/#" + legacy[location.hash]);
    return;
  }

  // Reveal elements on scroll
  const revealElements = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }

  // Header state on scroll
  const header = document.querySelector(".site-header");
  if (header) {
    const handleScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 15);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }

  // Mouse halo (with inertia) + subtle hero parallax
  const art = document.querySelector(".stc-art");
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let targetX = mouseX;
  let targetY = mouseY;

  document.addEventListener(
    "mousemove",
    (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    },
    { passive: true }
  );

  const tick = () => {
    mouseX += (targetX - mouseX) * 0.08;
    mouseY += (targetY - mouseY) * 0.08;
    const root = document.documentElement.style;
    root.setProperty("--mouse-x", `${mouseX}px`);
    root.setProperty("--mouse-y", `${mouseY}px`);
    if (art && !reduceMotion && window.innerWidth > 620) {
      const nx = mouseX / window.innerWidth - 0.5;
      const ny = mouseY / window.innerHeight - 0.5;
      art.style.setProperty("--px", `${(-nx * 18).toFixed(2)}px`);
      art.style.setProperty("--py", `${(-ny * 10).toFixed(2)}px`);
    }
    requestAnimationFrame(tick);
  };
  tick();

  // Count-up for the facts strip
  const counters = document.querySelectorAll("[data-count]");
  const format = (n) => n.toLocaleString("en-US");
  const runCounter = (el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    if (reduceMotion) {
      el.textContent = format(target) + suffix;
      return;
    }
    const start = performance.now();
    const duration = target > 1000 ? 1800 : 1100;
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      el.textContent = format(Math.round(target * eased)) + (t === 1 ? suffix : "");
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window) {
    if (!reduceMotion) counters.forEach((el) => (el.textContent = "0"));
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            countObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => countObserver.observe(el));
  } else {
    counters.forEach(runCounter);
  }
})();
