(function () {
  const BRAND = "cafelabs-ci";

  function applyBrand() {
    // 1) 改浏览器标题（Jenkins 会反复改，所以每次都覆盖）
    if (document.title !== BRAND) {
      document.title = BRAND;
    }

    // 2) 左上角文字兜底替换（即使 CSS 未生效也能改）
    const textEl = document.querySelector("a.app-jenkins-logo span.jenkins-mobile-hide");
    if (textEl) {
      textEl.textContent = BRAND;
      textEl.style.display = "none";
    }
  }

  applyBrand();

  // Jenkins 页面是动态渲染，持续兜底
  new MutationObserver(applyBrand).observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  setInterval(applyBrand, 1000);
})();