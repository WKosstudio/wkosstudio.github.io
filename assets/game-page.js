// Game page (Steam-style media viewer, trailer on hover, lightbox, looping clips).
(() => {
  const viewer = document.getElementById("gp-viewer");
  const strip = document.getElementById("gp-strip");
  if (!viewer || !strip) return;

  const slides = [...viewer.querySelectorAll(".gp-slide")];
  const thumbs = [...strip.querySelectorAll(".gp-thumb")];
  const trailer = viewer.querySelector(".gp-trailer");
  const scrollThumb = document.getElementById("gp-scroll-thumb");
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  let current = 0;
  let iframe = null;
  let engaged = false; // the visitor clicked the trailer: keep it playing, with sound

  // ---------- YouTube trailer ----------
  const ytCommand = (func, args = []) => {
    if (!iframe) return;
    iframe.contentWindow.postMessage(JSON.stringify({ event: "command", func, args }), "*");
  };

  const startTrailer = (withSound) => {
    if (!trailer) return;
    const id = trailer.dataset.youtube;
    if (!iframe) {
      iframe = document.createElement("iframe");
      const params = new URLSearchParams({
        autoplay: "1",
        mute: withSound ? "0" : "1",
        enablejsapi: "1",
        playsinline: "1",
        rel: "0",
        modestbranding: "1",
        loop: "1",
        playlist: id,
        origin: location.origin,
      });
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?${params}`;
      iframe.title = "Sort That Cash! trailer";
      iframe.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      iframe.allowFullscreen = true;
      trailer.appendChild(iframe);
    } else {
      if (withSound) ytCommand("unMute");
      ytCommand("playVideo");
    }
    trailer.classList.add("is-playing");
    viewer.classList.add("is-video-playing");
  };

  const pauseTrailer = () => {
    ytCommand("pauseVideo");
  };

  if (trailer) {
    trailer.querySelector(".gp-play").addEventListener("click", (e) => {
      e.stopPropagation();
      engaged = true;
      startTrailer(true);
    });
    trailer.addEventListener("click", () => {
      if (!iframe) {
        engaged = true;
        startTrailer(true);
      }
    });
  }

  if (canHover) {
    viewer.addEventListener("mouseenter", () => {
      if (current === 0) startTrailer(false);
    });
    viewer.addEventListener("mouseleave", () => {
      if (current === 0 && !engaged) pauseTrailer();
    });
  }

  // ---------- Slides / thumbnails ----------
  const updateScrollbar = () => {
    if (!scrollThumb) return;
    const max = strip.scrollWidth - strip.clientWidth;
    const ratio = strip.clientWidth / strip.scrollWidth;
    const track = strip.clientWidth;
    scrollThumb.style.width = `${Math.max(ratio, 0.12) * 100}%`;
    const left = max > 0 ? (strip.scrollLeft / max) * (track - scrollThumb.offsetWidth) : 0;
    scrollThumb.style.transform = `translateX(${left}px)`;
    scrollThumb.parentElement.style.visibility = max > 2 ? "visible" : "hidden";
  };

  const show = (index) => {
    index = (index + slides.length) % slides.length;
    if (index === current) return;
    if (current === 0) pauseTrailer();
    slides[current].classList.remove("is-active");
    thumbs[current].classList.remove("is-active");
    thumbs[current].setAttribute("aria-selected", "false");
    current = index;
    slides[current].classList.add("is-active");
    thumbs[current].classList.add("is-active");
    thumbs[current].setAttribute("aria-selected", "true");
    viewer.classList.toggle("is-video-playing", current === 0 && !!iframe);
    const t = thumbs[current];
    strip.scrollTo({ left: t.offsetLeft - (strip.clientWidth - t.offsetWidth) / 2, behavior: "smooth" });
  };

  thumbs.forEach((t) =>
    t.addEventListener("click", () => {
      show(Number(t.dataset.index));
      if (Number(t.dataset.index) === 0 && iframe) ytCommand("playVideo");
    })
  );
  viewer.querySelector(".gp-prev").addEventListener("click", () => show(current - 1));
  viewer.querySelector(".gp-next").addEventListener("click", () => show(current + 1));
  strip.addEventListener("scroll", updateScrollbar, { passive: true });
  window.addEventListener("resize", updateScrollbar);
  updateScrollbar();

  // swipe on touch screens
  let touchX = null;
  viewer.addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
  viewer.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) show(current + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  // ---------- Lightbox ----------
  const lb = document.getElementById("gp-lightbox");
  document.body.appendChild(lb); // escape the page's stacking context (header stays below)
  const shots = slides.filter((s) => s.classList.contains("gp-shot"));
  let lbIndex = 0;
  const lbImg = lb.querySelector("img");
  const lbCount = lb.querySelector(".gp-lb-count");
  const lbShow = (i) => {
    lbIndex = (i + shots.length) % shots.length;
    const img = shots[lbIndex].querySelector("img");
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCount.textContent = `${lbIndex + 1} / ${shots.length}`;
  };
  const lbOpen = (i) => {
    lbShow(i);
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    lb.querySelector(".gp-lb-close").focus();
  };
  const lbClose = () => {
    lb.hidden = true;
    document.body.style.overflow = "";
    show(slides.indexOf(shots[lbIndex]));
  };
  shots.forEach((s, i) => s.addEventListener("click", () => lbOpen(i)));
  lb.querySelector(".gp-lb-close").addEventListener("click", lbClose);
  lb.querySelector(".gp-prev").addEventListener("click", () => lbShow(lbIndex - 1));
  lb.querySelector(".gp-next").addEventListener("click", () => lbShow(lbIndex + 1));
  lb.addEventListener("click", (e) => {
    if (e.target === lb) lbClose();
  });
  document.addEventListener("keydown", (e) => {
    if (!lb.hidden) {
      if (e.key === "Escape") lbClose();
      if (e.key === "ArrowLeft") lbShow(lbIndex - 1);
      if (e.key === "ArrowRight") lbShow(lbIndex + 1);
    }
  });

  // ---------- Looping clips in the description (play only while visible) ----------
  const clips = document.querySelectorAll(".gp-clip video");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          const v = entry.target;
          if (entry.isIntersecting) {
            if (v.preload === "none") v.preload = "auto";
            if (!reduce) v.play().catch(() => {});
          } else {
            v.pause();
          }
        }),
      { threshold: 0.35 }
    );
    clips.forEach((v) => io.observe(v));
  }
  if (reduce) clips.forEach((v) => (v.controls = true));
})();
