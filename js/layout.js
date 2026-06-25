/* ============================================================
 * layout.js — 공통 nav/footer 를 모든 페이지에 주입
 * ------------------------------------------------------------
 * 빌드 단계가 없으므로 서버사이드 include 가 불가능합니다.
 * fetch() 로 partial 을 불러오면 file:// 로 직접 열었을 때 CORS 로
 * 실패하므로, 여기서는 JS 템플릿 문자열로 마크업을 생성해
 * 빈 placeholder(<header id="site-nav">, <footer id="site-footer">)에
 * 주입합니다. → 로컬 더블클릭과 github.io 양쪽에서 동일하게 동작.
 *
 * 새 페이지를 추가하면 아래 NAV_LINKS 배열에 항목을 추가하세요.
 * ============================================================ */

// 사이트 메타 — 강의/프로젝트에 맞게 수정하세요.
const SITE = {
  brand: "INU Starter",
};

// 네비게이션 항목. href 는 상대경로(앞에 / 없이) — project-site 서브경로 배포 호환.
const NAV_LINKS = [
  { href: "index.html", label: "Home" },
  { href: "about.html", label: "About" },
  { href: "components.html", label: "Components" },
];

const FOOTER_COLUMNS = [
  {
    heading: "프로젝트",
    links: [
      { href: "index.html", label: "홈" },
      { href: "about.html", label: "소개" },
      { href: "components.html", label: "컴포넌트" },
    ],
  },
  {
    heading: "리소스",
    links: [
      { href: "https://pages.github.com/", label: "GitHub Pages" },
      { href: "https://developer.mozilla.org/ko/", label: "MDN 문서" },
    ],
  },
];

/** 현재 페이지 파일명 (예: "about.html"). 루트("/")는 index.html 로 간주. */
function currentPage() {
  const path = window.location.pathname.split("/").pop();
  return path && path.length ? path : "index.html";
}

/** 글로벌 nav 마크업 생성 */
function renderNav() {
  const here = currentPage();
  const links = NAV_LINKS.map((link) => {
    const active = link.href === here ? ' aria-current="page"' : "";
    return `<a class="global-nav__link" href="${link.href}"${active}>${link.label}</a>`;
  }).join("");

  return `
    <nav class="global-nav" aria-label="주요 메뉴">
      <a class="global-nav__brand" href="index.html">${SITE.brand}</a>
      <button class="global-nav__toggle" type="button" aria-expanded="false" aria-controls="nav-links">
        <span class="sr-only">메뉴 열기</span>☰
      </button>
      <div class="global-nav__links" id="nav-links">${links}</div>
      <span class="global-nav__spacer"></span>
    </nav>
  `;
}

/** 푸터 마크업 생성 */
function renderFooter() {
  const columns = FOOTER_COLUMNS.map((col) => {
    const links = col.links
      .map((l) => `<a href="${l.href}">${l.label}</a>`)
      .join("");
    return `
      <div class="footer__column">
        <p class="footer__heading">${col.heading}</p>
        <div class="footer__links">${links}</div>
      </div>`;
  }).join("");

  return `
    <div class="footer__inner">
      <div class="footer__columns">${columns}</div>
      <p class="footer__legal">
        © INU Lecture Starter Kit. DESIGN.md 토큰 기반으로 제작되었습니다.
      </p>
    </div>
  `;
}

/** placeholder 에 주입 */
function mountLayout() {
  const nav = document.getElementById("site-nav");
  if (nav) nav.innerHTML = renderNav();

  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.classList.add("footer");
    footer.innerHTML = renderFooter();
  }

  // nav 주입 후 인터랙션 바인딩 (main.js 가 노출한 함수)
  if (window.INU && typeof window.INU.bindNav === "function") {
    window.INU.bindNav();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountLayout);
} else {
  mountLayout();
}
