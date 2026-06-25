# INU Lecture Starter Kit (github.io)

인천대(INU) 강의 수강생이 **정적 웹서비스를 빠르게 만들고 GitHub Pages(github.io)에 배포**할 수 있도록 만든 스타터킷입니다.

프레임워크·빌드 도구 없이 **순수 HTML · CSS · JavaScript** 만 사용합니다. 저장소에 푸시하면 GitHub Pages가 그대로 서빙하므로 별도의 빌드 단계가 없습니다. 화면 스타일은 [DESIGN.md](DESIGN.md)의 디자인 토큰을 기준으로 통일되어 있습니다.

## 기술 스택

- **마크업/스타일/스크립트**: HTML5 · CSS3(커스텀 프로퍼티) · 바닐라 JavaScript
- **디자인 시스템**: [DESIGN.md](DESIGN.md) 토큰 → `css/tokens.css` CSS 변수
- **폰트**: 시스템 폰트(SF Pro) + Inter(Google Fonts 대체)
- **배포**: GitHub Pages (빌드 없음)

> 빌드·npm·Node 가 필요 없습니다. 텍스트 에디터와 브라우저만 있으면 시작할 수 있습니다.

## 디렉토리 구조

```
.
├── index.html          # 랜딩 (히어로 + 제품 타일 데모)
├── about.html          # 텍스트 중심 페이지 예시
├── components.html     # 컴포넌트 쇼케이스 (복붙 참고용)
├── css/
│   ├── tokens.css      # DESIGN.md → :root CSS 변수 (색/타이포/간격/라운드)
│   ├── base.css        # reset, 폰트, 타이포 유틸리티
│   └── components.css  # nav · 버튼 · 타일 · 카드 · 푸터 컴포넌트
├── js/
│   ├── layout.js       # 공통 nav/footer 주입
│   └── main.js         # 모바일 nav 토글 등 인터랙션
├── assets/             # 이미지 등 정적 자산
├── .nojekyll           # GitHub Pages Jekyll 처리 비활성화
├── DESIGN.md           # 디자인 시스템 (단일 출처)
└── docs/               # PRD/계획 템플릿
```

## 로컬 미리보기

### 방법 1 — 파일 더블클릭 (가장 간단)

`index.html` 을 브라우저로 직접 엽니다. nav/footer 주입은 `file://` 에서도 동작합니다.

### 방법 2 — 로컬 서버 (권장)

상대 경로·페이지 이동을 실제 배포와 동일하게 확인하려면 간단한 서버를 띄웁니다.

```bash
# Python 3 (별도 설치 불필요)
python3 -m http.server 8000
# → http://localhost:8000
```

```bash
# Node 가 있다면
npx serve .
```

## GitHub Pages 배포

GitHub Pages 에는 두 가지 형태가 있습니다.

### A. 사용자/조직 사이트 — `username.github.io`

1. 저장소 이름을 정확히 `username.github.io` 로 생성 (username = 본인 GitHub 아이디).
2. 이 스타터킷 파일을 푸시.
3. **Settings → Pages → Build and deployment → Source** 를 `Deploy from a branch`, 브랜치 `main` / 폴더 `/ (root)` 로 설정.
4. 잠시 후 `https://username.github.io/` 에서 공개됩니다.

### B. 프로젝트 사이트 — `username.github.io/저장소이름`

1. 아무 이름의 저장소에 푸시.
2. **Settings → Pages** 에서 Source 를 `main` / `/ (root)` 로 설정.
3. `https://username.github.io/저장소이름/` 에서 공개됩니다.

> 이 스타터킷의 모든 링크·CSS·JS 경로는 **상대 경로**라서 두 형태 모두에서 깨지지 않습니다. `/css/...` 처럼 앞에 `/` 를 붙이지 마세요(프로젝트 사이트에서 경로가 깨집니다).

## 디자인 가이드 (DESIGN.md) 사용법

화면을 만들거나 수정할 때는 반드시 [DESIGN.md](DESIGN.md)를 따릅니다.

- 색·타이포·간격·라운드는 `css/tokens.css` 의 CSS 변수(`var(--color-primary)` 등)를 사용하고, **인라인 hex/px 를 새로 도입하지 마세요.**
- 인터랙션 액센트는 Action Blue(`--color-primary`) **하나만** 사용합니다.
- 그림자(`--shadow-product`)는 제품 이미지에만. 카드·버튼·텍스트에는 쓰지 않습니다.
- 타이포는 `t-hero-display`, `t-display-lg`, `t-body` 같은 유틸리티 클래스를 사용합니다.

## 새 페이지 추가하기

1. 기존 페이지(예: `about.html`)를 복사해 `portfolio.html` 등으로 저장합니다.
2. `<head>` 의 CSS/JS `<link>`·`<script>` 와 `<header id="site-nav">`, `<footer id="site-footer">` placeholder 는 그대로 둡니다.
3. `<main>` 안의 내용만 교체합니다.
4. 네비게이션에 노출하려면 `js/layout.js` 의 `NAV_LINKS` 배열에 항목을 추가합니다.

```js
const NAV_LINKS = [
  { href: "index.html", label: "Home" },
  { href: "about.html", label: "About" },
  { href: "components.html", label: "Components" },
  { href: "portfolio.html", label: "Portfolio" }, // 추가
];
```

## 라이선스

강의/학습용 스타터킷입니다. 자유롭게 수정해 사용하세요.
