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
// 워드마크는 renderNav 에서 가운뎃점(·)을 시그널 색으로 렌더합니다.
const SITE = {
  brandLead: "kim",
  brandTail: "dohun",
  // 헤더 우측 GitHub 아이콘이 연결될 저장소 주소
  repoUrl: "https://github.com/kdh001/inu-lecture-starterkit",
};

// GitHub 마크(옥토캣) — 외부 요청 없이 자체 포함(인라인 SVG)
const GITHUB_ICON = `<svg class="global-nav__github-icon" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" aria-hidden="true" focusable="false"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>`;

// 네비게이션 항목. href 는 상대경로(앞에 / 없이) — project-site 서브경로 배포 호환.
const NAV_LINKS = [
  { href: "index.html", label: "Home" },
  { href: "projects.html", label: "Projects" },
  { href: "index.html#skills", label: "Skills" },
  { href: "index.html#contact", label: "Contact" },
];

const FOOTER_COLUMNS = [
  {
    heading: "프로젝트",
    links: [
      { href: "index.html", label: "홈" },
      { href: "projects.html", label: "프로젝트" },
      { href: "index.html#contact", label: "연락처" },
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

/** 현재 페이지 파일명 (예: "projects.html"). 루트("/")는 index.html 로 간주. */
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
      <a class="global-nav__brand" href="index.html">${SITE.brandLead}<span class="dot">·</span>${SITE.brandTail}</a>
      <div class="global-nav__links" id="nav-links">${links}</div>
      <a class="global-nav__github" href="${SITE.repoUrl}" target="_blank" rel="noopener" aria-label="GitHub 저장소 열기">${GITHUB_ICON}</a>
      <button class="global-nav__theme" type="button" aria-label="테마 전환"></button>
      <button class="global-nav__toggle" type="button" aria-expanded="false" aria-controls="nav-links">
        <span class="sr-only">메뉴 열기</span>☰
      </button>
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
  if (window.INU && typeof window.INU.bindTheme === "function") {
    window.INU.bindTheme();
  }
  if (window.INU && typeof window.INU.bindReveal === "function") {
    window.INU.bindReveal();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountLayout);
} else {
  mountLayout();
}
