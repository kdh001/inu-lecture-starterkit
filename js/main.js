/* ============================================================
 * main.js — 페이지 인터랙션
 * ------------------------------------------------------------
 * 현재는 모바일(<=833px) 네비게이션 햄버거 토글을 담당합니다.
 * layout.js 가 nav 를 주입한 뒤 window.INU.bindNav() 를 호출합니다.
 * ============================================================ */

window.INU = window.INU || {};

/** 주입된 nav 의 햄버거 토글을 바인딩 */
window.INU.bindNav = function bindNav() {
  const toggle = document.querySelector(".global-nav__toggle");
  const links = document.getElementById("nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  // 링크 클릭 시 모바일 메뉴 닫기
  links.addEventListener("click", (e) => {
    if (e.target.matches(".global-nav__link")) {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
};
