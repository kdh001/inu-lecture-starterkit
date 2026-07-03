/* ============================================================
 * projects.js — 프로젝트 데이터(단일 출처) + 카드 렌더 + 상세 모달
 * ------------------------------------------------------------
 * 데스크톱 실제 프로젝트 정보 기준. 공개 저장소만 GitHub 링크를 걸고,
 * 비공개/로컬 프로젝트는 링크 없이 상태만 표기한다.
 * #featured-grid(홈, 앞 3개) · #projects-grid(전체) 컨테이너에 렌더하고,
 * 카드를 클릭하면 상세 설명 모달을 연다.
 * ============================================================ */

window.INU = window.INU || {};

/** visibility: "public"(링크) · "private"(비공개 저장소) · "local"(로컬만) */
window.INU.PROJECTS = [
  {
    id: "supplement",
    name: "영양제 추천 시스템",
    role: "산학캡스톤",
    tags: ["SwiftUI", "FastAPI", "XGBoost", "ESP32", "Firebase"],
    short: "생체데이터 기반 영양제 자동 디스펜싱 시스템.",
    detail:
      "인천대 메이커스페이스 산학캡스톤. iOS(SwiftUI) 앱 · FastAPI AI 서비스(Rule + XGBoost + SHAP) · ESP32 펌웨어(Firestore 브리지)로 구성됩니다. 생체데이터를 받아 영양제를 추천하고, 디스펜서가 자동으로 배출합니다. Firestore를 허브로 앱·AI·기기를 연결했습니다.",
    visibility: "private",
  },
  {
    id: "trader",
    name: "auto-equity-trader",
    role: "개인 프로젝트",
    tags: ["Python", "Streamlit", "SQLite"],
    short: "우량주·금·지수 방어적 자동매매 봇.",
    detail:
      "저평가·목표가 기반 분할 매수/매도, 주말 리밸런싱, 무인 운영을 목표로 한 방어적 자동매매 봇입니다. 키움/KIS·DART·뉴스 수집 → 피처·감성 분석 → 전략 스코어·적정가 밴드 → 리스크 관리(하한선·MDD·킬스위치) → 주문 어댑터로 이어집니다. SQLite+Parquet 저장, Streamlit 대시보드, 128개 테스트.",
    visibility: "private",
  },
  {
    id: "listing",
    name: "listing-forge",
    role: "개인 프로젝트",
    tags: ["Python", "Gemini"],
    short: "소싱 URL → 쿠팡·스마트스토어 리스팅 자동 생성.",
    detail:
      "알리익스프레스/1688 소싱 URL을 입력하면 쿠팡용 JPG 상세와 네이버 스마트스토어 HTML을 자동 생성합니다. Gemini로 카피·이미지 구성을 만들고, keyword-scout의 키워드 데이터와 연동합니다.",
    visibility: "public",
    repo: "https://github.com/kdh001/listing-forge",
  },
  {
    id: "keyword",
    name: "keyword-scout",
    role: "캠프 도구",
    tags: ["Python", "SearchAd", "DataLab"],
    short: "키워드·경쟁률 자동 조회 파이프라인.",
    detail:
      "네이버 SearchAd·DataLab·쇼핑 API로 키워드의 월검색량과 경쟁지수(CI/MOI/COS)를 자동 산출해 CSV/MD 리포트로 만듭니다. Google Trends로 신규 키워드 발굴도 지원합니다. 판다랭크+데이터랩 수동 작업을 대체하는 도구입니다.",
    visibility: "private",
  },
  {
    id: "music",
    name: "father-music-pipeline",
    role: "개인 프로젝트",
    tags: ["Python", "Suno API", "OpenAI", "FFmpeg"],
    short: "AI 음악·영상 자동 생성 파이프라인.",
    detail:
      "아버지의 Plymaker 스타일 AI 음악 채널을 위한 파이프라인입니다. 스타일 YAML → Suno API 생성 → 규칙 + LLM 검수 → 통과 곡 mp3 병합으로 이어집니다. 다음 단계는 Runway·Kling 영상과 FFmpeg 루프로 1~2시간 영상화입니다.",
    visibility: "private",
  },
  {
    id: "solar",
    name: "haenam-solar-finder",
    role: "PoC",
    tags: ["TypeScript", "Map", "Scoring"],
    short: "태양광 부지 5대 조건 자동 점수화 지도 웹.",
    detail:
      "해남 분산에너지 특구의 우수 태양광 부지를 5대 조건(3상 전선망 거리·계통 잔여용량·이격거리·경사/방위·데이터센터 거리)으로 0~100점 점수화해 지도에 등급별 색상으로 시각화하는 Mock-first PoC입니다. 부지 상세는 레이더 차트와 인접 인프라 목록으로 제공합니다.",
    visibility: "private",
  },
  {
    id: "vaultrag",
    name: "vault-rag",
    role: "INU 특강 실습",
    tags: ["Python", "FAISS", "RAG", "CLI"],
    short: "옵시디언 볼트에 질문하는 RAG.",
    detail:
      "INU LLM 특강에서 배운 RAG를 파이썬으로 직접 구현한 학습 프로젝트입니다. wiki 마크다운을 청킹 → 임베딩 → FAISS 색인하고, 자연어로 물으면 관련 근거를 출처([[페이지]])와 함께 붙여 답하는 CLI입니다. 특강 노트북을 제품 형태(.py + CLI)로 재구현했습니다.",
    visibility: "local",
  },
];

/** 태그 pill 마크업 */
function tagsHtml(tags) {
  return tags.map((t) => `<span class="tag">${t}</span>`).join("");
}

/** 카드 마크업 (클릭 시 모달) */
function cardHtml(p) {
  return `
    <article class="card card--clickable" role="button" tabindex="0"
             data-id="${p.id}" aria-haspopup="dialog">
      <p class="card__tag">${p.role}</p>
      <h3 class="card__title">${p.name}</h3>
      <p class="card__desc">${p.short}</p>
      <div class="tag-row">${tagsHtml(p.tags)}</div>
      <p class="card__foot">자세히 →</p>
    </article>`;
}

/** 지정 컨테이너에 카드 렌더 (limit 개수 제한) */
function renderGrid(id, limit) {
  const el = document.getElementById(id);
  if (!el) return;
  const list = limit
    ? window.INU.PROJECTS.slice(0, limit)
    : window.INU.PROJECTS;
  el.innerHTML = list.map(cardHtml).join("");
}

/* --- 상세 모달 --- */
let lastFocused = null;

function buildModal() {
  if (document.querySelector(".pmodal")) return;
  const modal = document.createElement("div");
  modal.className = "pmodal";
  modal.hidden = true;
  modal.innerHTML = `
    <div class="pmodal__backdrop" data-close></div>
    <div class="pmodal__dialog" role="dialog" aria-modal="true" aria-labelledby="pmodal-title">
      <button class="pmodal__close" type="button" data-close aria-label="닫기">✕</button>
      <p class="pmodal__role" id="pmodal-role"></p>
      <h2 class="pmodal__title" id="pmodal-title"></h2>
      <div class="tag-row" id="pmodal-tags"></div>
      <p class="pmodal__desc" id="pmodal-desc"></p>
      <div class="pmodal__foot" id="pmodal-foot"></div>
    </div>`;
  document.body.appendChild(modal);

  modal.addEventListener("click", (e) => {
    if (e.target.hasAttribute("data-close")) closeModal();
  });
}

function footHtml(p) {
  if (p.visibility === "public" && p.repo) {
    return `<a class="btn" href="${p.repo}" target="_blank" rel="noopener">GitHub 저장소 →</a>`;
  }
  if (p.visibility === "local") {
    return `<span class="pmodal__private">로컬 학습 프로젝트 (저장소 비공개)</span>`;
  }
  return `<span class="pmodal__private">비공개 저장소</span>`;
}

function openModal(id) {
  const p = window.INU.PROJECTS.find((x) => x.id === id);
  const modal = document.querySelector(".pmodal");
  if (!p || !modal) return;

  lastFocused = document.activeElement;
  modal.querySelector("#pmodal-role").textContent = p.role;
  modal.querySelector("#pmodal-title").textContent = p.name;
  modal.querySelector("#pmodal-tags").innerHTML = tagsHtml(p.tags);
  modal.querySelector("#pmodal-desc").textContent = p.detail;
  modal.querySelector("#pmodal-foot").innerHTML = footHtml(p);

  modal.hidden = false;
  document.body.style.overflow = "hidden";
  modal.querySelector(".pmodal__close").focus();
  document.addEventListener("keydown", onKeydown);
}

function closeModal() {
  const modal = document.querySelector(".pmodal");
  if (!modal || modal.hidden) return;
  modal.hidden = true;
  document.body.style.overflow = "";
  document.removeEventListener("keydown", onKeydown);
  if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
}

function onKeydown(e) {
  if (e.key === "Escape") closeModal();
}

/** 카드 클릭·키보드 → 모달 (이벤트 위임) */
window.INU.bindProjects = function bindProjects() {
  buildModal();
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".card--clickable");
    if (card) openModal(card.dataset.id);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const card = e.target.closest && e.target.closest(".card--clickable");
    if (card && document.activeElement === card) {
      e.preventDefault();
      openModal(card.dataset.id);
    }
  });
};

/** 자체 초기화 — 컨테이너가 있으면 렌더 후 바인딩 */
function initProjects() {
  renderGrid("featured-grid", 3);
  renderGrid("projects-grid", 0);
  if (document.getElementById("featured-grid") || document.getElementById("projects-grid")) {
    window.INU.bindProjects();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initProjects);
} else {
  initProjects();
}
