/* =========================================
   cafelabs-ci Jenkins Branding JS (Full)
   作用：
   1) 强制浏览器标题为 cafelabs-ci
   2) 强制替换左上角品牌文字 Jenkins -> cafelabs-ci
   3) 动态页面刷新时持续生效
   ========================================= */

(function () {
  const BRAND = "cafelabs-ci";
  const BRAND_CLASS = "cafe-brand-text";

  function setDocTitle() {
    try {
      if (document.title !== BRAND) {
        document.title = BRAND;
      }
    } catch (e) {
      // ignore
    }
  }

  function findBrandContainers() {
    const selectors = [
      "#jenkins-home-link",
      "a#jenkins-home-link",
      'a[aria-label="Dashboard"]',
      'a[href="/"]',
      'a[href="/jenkins/"]',
      ".jenkins-app-bar__title",
      "#jenkins-name-icon",
      ".jenkins-logo"
    ];

    const nodes = [];
    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => nodes.push(el));
    });

    // 去重
    return Array.from(new Set(nodes));
  }

  function removeOldInjected(el) {
    try {
      el.querySelectorAll("." + BRAND_CLASS).forEach((n) => n.remove());
    } catch (e) {
      // ignore
    }
  }

  function hideJenkinsTextNodes(el) {
    try {
      // 隐藏常见文本承载节点
      const textNodes = el.querySelectorAll("span, strong, b, .jenkins-visually-hidden");
      textNodes.forEach((n) => {
        const txt = (n.textContent || "").trim().toLowerCase();
        if (txt.includes("jenkins") || txt.length > 0) {
          n.style.fontSize = "0";
          n.style.lineHeight = "0";
          n.style.color = "transparent";
        }
      });
    } catch (e) {
      // ignore
    }
  }

  function injectBrandText(el) {
    try {
      // 如果已经有我们注入的文本就不重复注入
      if (el.querySelector("." + BRAND_CLASS)) return;

      const span = document.createElement("span");
      span.className = BRAND_CLASS;
      span.textContent = BRAND;

      // 样式内联，避免主题 CSS 不生效时失效
      span.style.marginLeft = "6px";
      span.style.fontSize = "28px";
      span.style.fontWeight = "700";
      span.style.lineHeight = "1";
      span.style.letterSpacing = "0.2px";
      span.style.color = "#fff";
      span.style.whiteSpace = "nowrap";
      span.style.display = "inline-block";
      span.style.verticalAlign = "middle";
      span.style.pointerEvents = "none";

      // 保证容器布局
      el.style.display = el.style.display || "inline-flex";
      el.style.alignItems = el.style.alignItems || "center";
      el.style.gap = el.style.gap || "4px";

      el.appendChild(span);
    } catch (e) {
      // ignore
    }
  }

  function replaceHeaderBrand() {
    try {
      const containers = findBrandContainers();
      containers.forEach((el) => {
        removeOldInjected(el);
        hideJenkinsTextNodes(el);
        injectBrandText(el);
      });
    } catch (e) {
      // ignore
    }
  }

  function replaceAnyVisibleJenkinsText() {
    // 兜底：如果页面里有独立标题显示 Jenkins，就替换
    try {
      const candidates = document.querySelectorAll("h1, h2, .page-header__title, .jenkins-app-bar__title");
      candidates.forEach((el) => {
        const txt = (el.textContent || "").trim();
        if (!txt) return;
        if (txt.toLowerCase() === "jenkins") {
          el.textContent = BRAND;
        }
      });
    } catch (e) {
      // ignore
    }
  }

  function runBranding() {
    setDocTitle();
    replaceHeaderBrand();
    replaceAnyVisibleJenkinsText();
  }

  // 首次执行
  runBranding();

  // DOM 变化时持续执行（Jenkins 页面是动态渲染）
  const observer = new MutationObserver(() => {
    runBranding();
  });
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  // 定时兜底，防止前端框架异步重绘覆盖
  setInterval(runBranding, 1200);

  // 切页/焦点变化再补一次
  window.addEventListener("focus", runBranding);
  window.addEventListener("pageshow", runBranding);
})();