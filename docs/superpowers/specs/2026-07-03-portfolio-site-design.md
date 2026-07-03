# 김도훈 포트폴리오 사이트 — 설계 문서

- **작성일**: 2026-07-03
- **대상 저장소**: `inu-lecture-starterkit` (배포: `kdh001.github.io/inu-lecture-starterkit/`)
- **성격**: 개인 포트폴리오 겸 INU 특강 제출물
- **제약**: 순수 HTML/CSS/JS, 빌드·의존성·프레임워크 없음. 스타일은 `DESIGN.md` 토큰 단일 출처.

## 1. 목적

인천대 컴퓨터공학 전공·전자공학 복수전공 김도훈의 프로젝트와 기술 스택을 소개하는 정적 포트폴리오.
평상시엔 포트폴리오로, INU 특강 제출물로도 겸용한다. GitHub Pages 서브경로 배포에 호환되어야 한다(상대 경로만 사용).

## 2. 사이트 구조 (하이브리드)

| 페이지 | 역할 |
|--------|------|
| `index.html` | 홈 원페이지 스크롤 — Hero(+소개) → 대표 프로젝트 → 기술 스택/자격증 → 연락처 |
| `projects.html` | 프로젝트 전체 갤러리 (카드 · 기술스택 태그 · GitHub 링크) |
| `components.html` | 컴포넌트 쇼케이스 — nav 비노출, 개발 참고용으로만 잔존 |
| ~~`about.html`~~ | **삭제** — 자기소개는 홈 Hero 아래 '소개' 블록으로 흡수 |

- nav 항목(`js/layout.js` `NAV_LINKS`): 홈 섹션 앵커(`index.html#projects`, `#skills`, `#contact`) + `projects.html`.
- 헤더 우측 GitHub 아이콘은 이미 구현됨(`SITE.repoUrl`).

## 3. index.html 섹션 스펙

1. **Hero** — eyebrow 라벨("INU · PORTFOLIO") + 헤드라인 **"컴퓨터공학 전공 · 전자공학 복수전공 개발자 김도훈"** + CTA 2개(프로젝트 보기 / GitHub). 전공 두 개만 담아 간결하게.
2. **소개** — 2~3줄 자기소개(임베디드·AI·바이브코딩, 캡스톤/개인 프로젝트). 별도 about 페이지 없음.
3. **대표 프로젝트** — 카드 3개(영양제 추천 시스템 · auto-equity-trader · keyword-scout), 각 기술스택 태그. 하단 "프로젝트 전체 보기 → projects.html".
4. **기술 스택 / 자격증** — 칩 나열(Python · Swift/SwiftUI · C · HTML/CSS/JS · ESP32/임베디드 · LLM/RAG 등).
5. **연락처 CTA** — 이메일 + GitHub 버튼.

## 4. projects.html 스펙

- 대표작 포함 전체 프로젝트를 카드 그리드로. 각 카드: 제목 · 한 줄 설명 · 기술스택 태그 · GitHub(또는 데모) 링크.
- 콘텐츠는 실제 보유 프로젝트 기준(영양제 추천 시스템/캡스톤, auto-equity-trader, keyword-scout, father-music-pipeline, haenam-solar-finder, inu-llm-lecture, JLPT 단어장 등). 링크·공개 여부는 사용자 확인 후 채움.
- 필터/모달은 이번 범위 제외(YAGNI). 향후 확장 여지만 남김.

## 5. 인터랙션

- **스크롤 리빌**: `IntersectionObserver`로 섹션이 뷰포트에 들어오면 `fade-up`. 저비용·절제된 모션.
- **테마 토글**: 기존 구현 유지.
- 그 외 화려한 효과(타이핑, 패럴랙스 등)는 배제 — DESIGN.md 절제 원칙.

## 6. 디자인 규칙 (DESIGN.md 준수)

- 색·간격·라운드·타이포는 `var(--token)`만. 새 hex/px 인라인 금지.
- 인터랙션 액센트는 Action Blue(`--color-primary`) 하나만.
- 그림자(`--shadow-product`)는 제품 이미지에만. 카드·버튼·텍스트 금지.
- active(누름)는 `transform: scale(0.95)`. hover는 기존 정의된 것 외 신규 남발 금지.
- 한글은 Pretendard, 폰트 스택은 `css/tokens.css` 한 곳에서 관리.

## 7. 구현 대상 파일

- `css/components.css` — `.hero`, `.about-intro`, `.project-card`, `.skill-chip`, `.reveal` 컴포넌트 클래스 추가.
- `js/main.js` — `bindReveal()`(IntersectionObserver) 추가, `window.INU`에 노출. `layout.js` 주입 후 호출.
- `js/layout.js` — `NAV_LINKS` 갱신(about 제거, projects 추가, 홈 앵커).
- `index.html` — 원페이지 섹션 마크업 교체.
- `projects.html` — 신규(기존 `about.html` 복사 대체) 갤러리 페이지.
- `about.html` — 삭제.
- `CLAUDE.md` — 이미 포트폴리오 정체성으로 갱신 완료.

## 8. 실행 워크플로우 (사용자 요청)

- **단계별로** 구현하고, **각 단계마다 로컬에서 테스트**(로컬 서버 렌더 확인) 후 다음 단계로.
- **각 단계 완료 시 `git commit` + `git push`** (origin = `kdh001/inu-lecture-starterkit`).
- 단계 경계는 배포해도 사이트가 깨지지 않는 지점으로 잡는다(중간 단계도 서빙 가능 상태 유지).

## 9. 범위 밖 (YAGNI)

- 프로젝트 필터/태그 토글, 상세 모달, 히어로 타이핑 효과, 타임라인 페이지, 특강 학습 기록 페이지 — 이번 범위 제외.
- 백엔드·폼 제출 처리 없음(연락처는 mailto/링크).
