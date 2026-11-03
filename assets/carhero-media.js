/* One click-to-load YouTube player. A breakpoint change destroys the old player. */
(() => {
  'use strict';
  const mobile = window.matchMedia('(max-width: 1023px)');
  const validId = id => /^[A-Za-z0-9_-]{11}$/.test(id || '');
  document.querySelectorAll('[data-carhero-trailer]').forEach(section => {
    const stage = section.querySelector('[data-trailer-stage]');
    const start = section.querySelector('[data-trailer-start]');
    const external = section.querySelector('[data-trailer-external]');
    const status = section.querySelector('[data-trailer-status]');
    let frame = null;
    const selected = () => mobile.matches ? section.dataset.portraitId : section.dataset.landscapeId;

    function refresh(event) {
      const hadFocus = stage.contains(document.activeElement);
      if (frame) {
        // Removal stops the previous video's sound before a new iframe can exist.
        frame.remove();
        frame = null;
      }
      start.hidden = false;
      const id = selected();
      const ready = validId(id);
      start.disabled = !ready;
      external.hidden = !ready;
      if (ready) external.href = `https://www.youtube.com/watch?v=${id}`;
      else external.removeAttribute('href');
      section.dataset.videoFormat = mobile.matches ? 'portrait' : 'landscape';
      status.textContent = event ? section.dataset.changedMessage : '';
      if (event && hadFocus && ready) start.focus();
    }

    start.addEventListener('click', () => {
      const id = selected();
      if (frame || !validId(id)) return;
      frame = document.createElement('iframe');
      frame.title = section.dataset.playerTitle;
      frame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0`;
      frame.loading = 'lazy';
      frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      frame.allowFullscreen = true;
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      stage.append(frame);
      start.hidden = true;
      status.textContent = '';
      frame.focus();
    });
    refresh();
    if (mobile.addEventListener) mobile.addEventListener('change', refresh);
    else mobile.addListener(refresh);
  });
})();
