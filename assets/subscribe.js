// WKos Studio — newsletter sign-up (Google Forms).
// 1. Every link to "#subscribe" opens a sign-up dialog on the current page,
//    so a visitor does not leave the game page to subscribe.
//    Without JavaScript (or without <dialog> support) the link still goes to
//    the home page section.
// 2. Every <form data-subscribe> posts the email to the Google Form.
//    Without JavaScript the form posts to Google directly (action attribute).
(() => {
  const FORM_ACTION =
    "https://docs.google.com/forms/d/e/1FAIpQLSdUuD0ug1OFvOweM67qSf0y3Kb5vzei81EBzdg2GtypHhUUjA/formResponse";
  const EMAIL_FIELD = "entry.1104028759";
  const STORAGE_KEY = "wkos-subscribed";
  const DISCORD_URL = "https://discord.gg/HZG63Erjyk";

  // Paths relative to this script (assets/subscribe.js), so it works on any page depth.
  const script = document.currentScript;
  const assetUrl = (path) => (script ? new URL(path, script.src).href : path);

  const isSubscribed = () => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "1";
    } catch (error) {
      return false;
    }
  };
  const rememberSubscribed = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch (error) {
      /* storage blocked: the visitor just sees the form again next time */
    }
  };

  const send = (email) => {
    const data = new FormData();
    data.append(EMAIL_FIELD, email);
    // Google Forms sends no CORS headers; an opaque "no-cors" response is the expected success.
    return fetch(FORM_ACTION, { method: "POST", body: data, mode: "no-cors" });
  };

  const bindForm = (form) => {
    if (form.dataset.subscribeBound) return;
    form.dataset.subscribeBound = "1";

    const input = form.querySelector('input[type="email"]');
    const button = form.querySelector('button[type="submit"]');
    const error = form.querySelector(".error-feedback");
    const success = form.dataset.success
      ? document.getElementById(form.dataset.success)
      : null;

    const showSuccess = () => {
      form.hidden = true;
      if (success) success.classList.add("is-visible");
    };

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = input.value.trim();
      if (error) {
        error.classList.remove("is-visible");
        error.textContent = "";
      }
      if (!input.checkValidity() || !email) {
        input.reportValidity();
        return;
      }

      button.classList.add("is-loading");
      button.disabled = true;
      input.disabled = true;

      send(email)
        .then(() => {
          rememberSubscribed();
          button.classList.remove("is-loading");
          showSuccess();
          document.dispatchEvent(new CustomEvent("wkos:subscribed"));
        })
        .catch((err) => {
          console.error("Subscription error:", err);
          button.classList.remove("is-loading");
          button.disabled = false;
          input.disabled = false;
          if (error) {
            error.textContent = "Something went wrong. Check your connection and try again.";
            error.classList.add("is-visible");
          }
        });
    });

    // Another form on this page subscribed: show the same success state here too.
    document.addEventListener("wkos:subscribed", () => {
      if (!form.hidden) showSuccess();
    });
  };

  // ---------- Sign-up dialog ----------
  const supportsDialog = typeof HTMLDialogElement === "function";
  let dialog = null;

  const buildDialog = () => {
    const el = document.createElement("dialog");
    el.className = "sub-dialog";
    el.setAttribute("aria-labelledby", "sub-dialog-title");
    el.innerHTML = `
      <div class="sub-dialog-card">
        <button class="sub-close" type="button" aria-label="Close">
          <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L12 13.41l-6.29 6.3-1.42-1.42L10.59 12 4.29 5.71l1.42-1.42L12 10.59l6.29-6.3z"/></svg>
        </button>
        <img class="sub-dialog-logo" src="${assetUrl("sort-that-cash/logo-640.webp")}" alt="" width="640" height="380" />
        <p class="eyebrow">Free email updates</p>
        <h2 id="sub-dialog-title">Be the first to play Sort That Cash!</h2>
        <ul class="sub-perks">
          <li>Get the news on Steam launch day</li>
          <li>Get invites to public playtests</li>
          <li>Hear about new WKos games first</li>
        </ul>
        <form class="subscribe-form" data-subscribe data-success="sub-dialog-success"
              action="${FORM_ACTION}" method="POST" target="_blank" novalidate>
          <div class="input-group">
            <label class="visually-hidden" for="sub-dialog-email">Email address</label>
            <input type="email" name="${EMAIL_FIELD}" id="sub-dialog-email" class="subscribe-input"
                   placeholder="Your email address" autocomplete="email" inputmode="email" required />
            <button type="submit" class="button button-primary subscribe-btn">
              <span>Notify me</span>
              <svg class="spinner" viewBox="0 0 50 50" aria-hidden="true"><circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle></svg>
            </button>
          </div>
          <p class="form-feedback error-feedback" role="alert"></p>
          <p class="sub-fine">Only major news, no spam. To unsubscribe, write to
            <a href="mailto:wkos.studio@gmail.com">wkos.studio@gmail.com</a>.
            <a href="${assetUrl("../privacy/index.html")}">Privacy</a></p>
        </form>
        <div class="form-feedback success-feedback sub-success" id="sub-dialog-success" role="status">
          <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
          <div>
            <strong>You're on the list!</strong>
            <span>We will email you when Sort That Cash! launches. Want to chat with the developer now?</span>
            <a class="button button-secondary" href="${DISCORD_URL}" target="_blank" rel="noopener noreferrer">Join Discord</a>
          </div>
        </div>
      </div>`;
    document.body.appendChild(el);

    el.querySelector(".sub-close").addEventListener("click", () => el.close());
    // Click on the dark backdrop (outside the card) closes the dialog.
    el.addEventListener("click", (event) => {
      if (event.target === el) el.close();
    });
    bindForm(el.querySelector("form"));
    return el;
  };

  const openDialog = () => {
    if (!dialog) dialog = buildDialog();
    const form = dialog.querySelector("form");
    if (isSubscribed() && !form.hidden) {
      form.hidden = true;
      dialog.querySelector(".sub-success").classList.add("is-visible");
    }
    dialog.showModal();
    if (!form.hidden && window.matchMedia("(hover: hover)").matches) {
      dialog.querySelector("input").focus();
    }
  };

  const init = () => {
    document.querySelectorAll("form[data-subscribe]").forEach(bindForm);

    // Already subscribed on an earlier visit: show the thank-you state instead of the form.
    if (isSubscribed()) {
      document.querySelectorAll("form[data-subscribe]").forEach((form) => {
        const success = form.dataset.success && document.getElementById(form.dataset.success);
        if (success) {
          form.hidden = true;
          success.classList.add("is-visible");
        }
      });
    }

    if (!supportsDialog) return;
    document.addEventListener("click", (event) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest("a[href]");
      if (!link || link.closest(".sub-dialog")) return;
      const url = new URL(link.getAttribute("href"), location.href);
      if (url.hash !== "#subscribe") return;
      event.preventDefault();
      openDialog();
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
