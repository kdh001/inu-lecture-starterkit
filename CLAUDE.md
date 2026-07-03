# CLAUDE.md

인천대(INU) 컴퓨터공학 전공 · 전자공학 복수전공 **김도훈의 개인 포트폴리오** 사이트입니다.
프로젝트와 기술 스택을 소개하는 포트폴리오이자 INU 특강 제출물 겸용으로, **GitHub Pages(kdh001.github.io)에 배포**합니다.
원본은 강의용 정적 스타터킷이며, 프레임워크·빌드 도구 없이 **순수 HTML · CSS · JavaScript** 로만 동작합니다.
화면 스타일은 [DESIGN.md](DESIGN.md)의 디자인 토큰을 단일 출처로 사용합니다.

## 기술 스택

- **마크업**: HTML5 (다중 페이지, 각 페이지 독립 `.html`)
- **스타일**: CSS3 + 커스텀 프로퍼티(`:root` 변수) — 빌드/전처리 없음
- **스크립트**: 바닐라 JavaScript (모듈 번들러 없음)
- **디자인 시스템**: [DESIGN.md](DESIGN.md) → `css/tokens.css`
- **폰트**: 영문 시스템 폰트(SF Pro) + Inter(비-Apple 대체) · 한글 Pretendard(jsDelivr CDN)
- **배포**: GitHub Pages (빌드 단계 없음, `main`/root 서빙)

> npm·Node·빌드 단계가 없습니다. 새 의존성이나 빌드 도구를 도입하지 마세요. (강의 대상이 빌드 환경에 익숙하지 않을 수 있습니다.)

## 디렉토리 구조

```
.
├── index.html              # 홈 원페이지 (Hero+자기소개 → 대표 프로젝트 → 기술 스택/자격증 → 연락처)
├── projects.html           # 프로젝트 전체 갤러리 (카드 · 기술스택 태그 · GitHub 링크)
├── components.html         # 컴포넌트 쇼케이스 (개발 참고용 · nav 비노출)
├── css/
│   ├── tokens.css          # DESIGN.md → :root CSS 변수 (단일 출처에서 파생)
│   ├── base.css            # reset, 폰트, body, 타이포 유틸리티 (.t-* 클래스)
│   └── components.css      # nav · 버튼 · 타일 · 카드 · 푸터 컴포넌트 클래스
├── js/
│   ├── layout.js           # 공통 nav/footer 를 placeholder 에 주입
│   └── main.js             # 모바일 nav 토글 등 인터랙션 (window.INU)
├── assets/                 # 이미지 등 정적 자산
├── .nojekyll               # GitHub Pages Jekyll 처리 비활성화
├── DESIGN.md               # 디자인 시스템 (단일 출처)
└── docs/                   # PRD/계획 템플릿
```

## 포트폴리오 구성

- **홈(`index.html`)** — 원페이지 스크롤. 순서: `Hero(+자기소개) → 대표 프로젝트 3 → 기술 스택/자격증 → 연락처 CTA`.
  - Hero 헤드라인은 "컴퓨터공학 전공 · 전자공학 복수전공"을 담아 간결하게. 자기소개는 별도 페이지 없이 홈에 흡수(about.html 없음).
  - nav 는 섹션 앵커(`#projects`, `#skills`, `#contact`) + `projects.html` 링크.
- **프로젝트(`projects.html`)** — 전체 갤러리. 카드 + 기술스택 태그 + GitHub 링크. 콘텐츠는 실제 보유 프로젝트 기준.
- **인터랙션** — 스크롤 리빌(IntersectionObserver `fade-up`) + 기존 테마 토글만. 화려한 효과는 배제(DESIGN.md 절제 원칙).
- 헤더 우측 GitHub 아이콘은 `js/layout.js` 의 `SITE.repoUrl` 로 저장소에 연결.

## 개발 워크플로우

### 로컬 미리보기

```bash
# 권장: 로컬 서버 (상대 경로·페이지 이동을 실제 배포처럼 확인)
python3 -m http.server 8000
# → http://localhost:8000

# 또는 index.html 을 브라우저로 직접 열기 (file:// 에서도 nav/footer 주입 동작)
```

### 배포 (GitHub Pages)

- 별도 빌드 없이 `main` 브랜치 root 를 GitHub Pages 소스로 지정하면 됩니다.
- 단계별 가이드는 [README.md](README.md)의 "GitHub Pages 배포" 참고.

## 공통 레이아웃 (nav / footer)

빌드가 없어 서버사이드 include 가 불가능하므로, 공통 nav/footer 는 `js/layout.js` 가
JS 템플릿 문자열로 생성해 각 페이지의 placeholder 에 주입합니다.

- 각 페이지는 `<header id="site-nav">`, `<footer id="site-footer">` 빈 placeholder 만 둡니다.
- `fetch()` 로 partial 을 불러오면 `file://` 에서 CORS 로 실패하므로 사용하지 않습니다.
- 네비게이션 항목은 `js/layout.js` 의 `NAV_LINKS` 배열에서 관리합니다.

## 새 페이지 추가

1. 기존 페이지(`projects.html`)를 복사해 새 `.html` 로 저장.
2. `<head>` 의 CSS/JS 링크와 nav/footer placeholder 는 유지, `<main>` 내용만 교체.
3. nav 에 노출하려면 `js/layout.js` 의 `NAV_LINKS` 에 항목 추가.

## 디자인 시스템

프론트엔드 작업(페이지/컴포넌트 생성·수정, 스타일링, 레이아웃 변경 등)을 수행할 때는 반드시 [DESIGN.md](DESIGN.md)를 먼저 참고하세요.

- 색·타이포·간격·라운드·컴포넌트 스펙은 `DESIGN.md` 프론트매터의 토큰을 기준으로 사용합니다.
- 토큰은 `css/tokens.css` 의 CSS 변수로 정의되어 있습니다. 스타일링 시 **`var(--token)` 을 참조하고 인라인 hex/px 를 새로 도입하지 마세요.**
  - 색: `var(--color-primary)` · 간격: `var(--space-lg)` · 라운드: `var(--radius-pill)` · 타이포: `.t-body` 등 유틸 클래스
- "Do's and Don'ts" 규칙을 반드시 준수합니다.
  - 인터랙션 액센트는 Action Blue(`--color-primary`) **하나만**.
  - 그림자(`--shadow-product`)는 제품 이미지에만. 카드·버튼·텍스트 금지.
  - full-bleed 타일은 라운드 없음(색 변화가 곧 구분선).
  - active(누름)는 `transform: scale(0.95)` 공통. hover 는 정의하지 않음.
- 새 컴포넌트를 만들기 전에 `DESIGN.md` `components:` 와 `css/components.css` 에 유사한 정의가 있는지 먼저 확인하세요.
- **한글 텍스트 폰트는 Pretendard 로 통일합니다.** 다른 한글 폰트를 새로 도입하지 마세요. 폰트 스택은 `css/tokens.css` 의 `--font-display`/`--font-text` 한 곳에서 관리하며, 영문은 SF Pro·Inter 룩을 유지하고 한글만 Pretendard 로 렌더됩니다(Pretendard 는 스택에서 `system-ui` 앞에 둡니다).

## 코딩 컨벤션

- 시맨틱 HTML, 접근성 기본(`aria-*`, 키보드 포커스, `sr-only`) 준수.
- CSS 는 토큰 변수만 참조. 새 hex/px 인라인 금지.
- JavaScript 는 의존성 없는 바닐라로 유지. 전역은 `window.INU` 네임스페이스 사용.
- 경로는 항상 **상대 경로**(앞에 `/` 금지) — 프로젝트 사이트 서브경로 배포 호환.
- 환경 변수·시크릿을 정적 파일에 넣지 마세요(공개 저장소에 그대로 노출됩니다).

## Claude 에이전트 목록

`.claude/agents/` 에 프리셋 에이전트가 있습니다. 본 스타터킷은 **정적 사이트**이므로 일부 에이전트만 해당됩니다.

| 에이전트 | 본 템플릿 적용 여부 |
|---------|------|
| `development-planner` | ✅ ROADMAP.md 작성 및 개발 계획 |
| `starter-cleaner` | ✅ 보일러플레이트 정리 |
| `code-reviewer` | ✅ 코드 리뷰 |
| `prd-generator` / `prd-validator` | ✅ PRD 문서 생성/검증 |
| `ui-markup-specialist` | ⚠️ Next.js/Tailwind/shadcn 전제 — 본 정적 템플릿에는 그대로 적용 불가 (바닐라 HTML/CSS 컨텍스트로 참고만) |
| `nextjs-app-developer` | ❌ Next.js 전용 — 사용하지 않음 |

> 참고: `backend-developer` 등 백엔드/프레임워크 전용 에이전트는 본 정적 템플릿에서 사용하지 않습니다.
