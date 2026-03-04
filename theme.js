/* ===== cafelabs-ci Jenkins Branding ===== */

/* 0) 全局变量 */
:root {
  --cafe-brand-name: "cafelabs-ci";
  --cafe-brand-color: #ffffff;
}

/* 1) 左上角头像/logo 尺寸统一（你已成功替换图标可保留） */
#jenkins-head-icon,
.jenkins-logo,
img[src*="jenkins-headshot"],
img[src*="jenkins.png"] {
  height: 28px !important;
  width: 28px !important;
  object-fit: contain !important;
}

/* 2) 隐藏各种可能出现的 Jenkins 文本节点 */
#jenkins-name-icon,
.jenkins-app-bar__title,
a[aria-label="Dashboard"] .jenkins-visually-hidden,
a[href="/"] .jenkins-visually-hidden,
a[href$="/"] .jenkins-visually-hidden {
  font-size: 0 !important;
  line-height: 0 !important;
}

/* 3) 在不同可能的容器后追加 cafelabs-ci 文本 */
#jenkins-name-icon::after,
.jenkins-app-bar__title::after,
a[aria-label="Dashboard"]::after,
a[href="/"]::after,
a[href$="/"]::after {
  content: var(--cafe-brand-name) !important;
  font-size: 22px !important;
  line-height: 1 !important;
  font-weight: 700 !important;
  color: var(--cafe-brand-color) !important;
  margin-left: 8px !important;
  letter-spacing: 0.2px !important;
  vertical-align: middle !important;
  display: inline-block !important;
}

/* 4) 某些版本里 Jenkins 文本在 svg+span，直接隐藏 */
a[aria-label="Dashboard"] svg + span,
a[href="/"] svg + span,
a[href$="/"] svg + span {
  display: none !important;
}

/* 5) 顶栏品牌区域间距微调 */
a[aria-label="Dashboard"],
a[href="/"],
a[href$="/"] {
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
}

/* 6) 登录页标题补充品牌 */
#login h1,
.login h1 {
  font-size: 0 !important;
}
#login h1::after,
.login h1::after {
  content: var(--cafe-brand-name) !important;
  font-size: 28px !important;
  font-weight: 700 !important;
  color: #111 !important;
}

/* 7) 页脚轻微弱化（可删） */
#page-footer,
.page-footer {
  opacity: 0.92 !important;
}