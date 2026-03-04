(function () {
  const BRAND = "cafelabs-ci";

  function apply() {
    document.title = BRAND;

    // 双保险：把那个 span 的文本也替掉（即使 CSS 没生效也能看到变化）
    const el = document.querySelector("a.app-jenkins-logo span.jenkins-mobile-hide");
    if (el) {
      el.textContent = BRAND;
      el.style.fontSize = "28px";
      el.style.fontWeight = "700";
      el.style.color = "#fff";
      el.style.width = "auto";
    }
  }

  apply();
  new MutationObserver(apply).observe(document.documentElement, { childList: true, subtree: true });
  setInterval(apply, 1500);
})();