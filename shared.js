(() => {
  const glow = document.createElement("div");
  glow.className = "cursor-glow";
  document.body.appendChild(glow);

  let mx = 0;
  let my = 0;
  let raf = 0;

  const tick = () => {
    glow.style.left = `${mx}px`;
    glow.style.top = `${my}px`;
    raf = 0;
  };

  window.addEventListener(
    "pointermove",
    (e) => {
      document.body.classList.add("has-pointer");
      mx = e.clientX;
      my = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    },
    { passive: true },
  );

  document.querySelectorAll("[data-nav-home]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const home = el.getAttribute("href") || "index.html";
      try {
        const ref = document.referrer ? new URL(document.referrer) : null;
        if (ref && ref.origin === window.location.origin && ref.href !== window.location.href) {
          window.history.back();
          return;
        }
      } catch (_) {}
      window.location.href = home;
    });
  });

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll("[data-reveal]").forEach((el, i) => {
    if (reduce) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }
    el.style.transition = `opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1) ${90 + i * 70}ms, transform 0.85s cubic-bezier(0.22, 1, 0.36, 1) ${90 + i * 70}ms`;
    requestAnimationFrame(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  });
})();
