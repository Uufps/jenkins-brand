(function () {
  function applyBrand() {
    try {
      // 1) 页签标题统一
      document.title = "cafelabs-ci";

      // 2) 常见标题区域替换文本
      const candidates = [
        "#jenkins-name-icon",
        ".jenkins-app-bar__title",
        ".page-header__title",
        "h1"
      ];

      candidates.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el) => {
          // 只在有可见文本时替换，避免误伤图标容器
          const txt = (el.textContent || "").trim();
          if (txt && txt.toLowerCase().includes("jenkins")) {
            el.textContent = "cafelabs-ci";
          }
        });
      });

      // 3) 登录页提示补一行
      const loginBox = document.querySelector("#login, .login");
      if (loginBox && !document.querySelector("#cafe-brand-tip")) {
        const tip = document.createElement("div");
        tip.id = "cafe-brand-tip";
        tip.style.marginTop = "8px";
        tip.style.fontSize = "12px";
        tip.style.opacity = "0.8";
        tip.textContent = "Welcome to cafelabs-ci";
        loginBox.appendChild(tip);
      }
    } catch (e) {
      // ignore
    }
  }

  // 首次执行 + DOM 变化后重试（Jenkins 有些页面是动态渲染）
  applyBrand();
  const observer = new MutationObserver(() => applyBrand());
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();