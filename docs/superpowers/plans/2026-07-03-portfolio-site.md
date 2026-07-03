# 김도훈 포트폴리오 사이트 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 강의용 스타터킷을 김도훈 개인 포트폴리오(홈 원페이지 + 프로젝트 갤러리)로 전환한다.

**Architecture:** 순수 정적 HTML/CSS/JS. 기존 `.card`/`.chip`/`.hero`/`.btn` 컴포넌트를 재사용하고, 태그·소개·CTA·스크롤 리빌용 클래스만 소량 추가한다. 공통 nav/footer는 `js/layout.js` 주입 방식 유지. 각 단계는 배포해도 사이트가 깨지지 않는 지점에서 끊는다.

**Tech Stack:** HTML5, CSS3(커스텀 프로퍼티), 바닐라 JS(IntersectionObserver). 빌드·의존성·프레임워크 없음.

## Global Constraints

- 빌드·npm·프레임워크·새 의존성 도입 금지. 순수 HTML/CSS/JS만.
- CSS는 `css/tokens.css` 변수(`var(--token)`)만 참조. 새 hex/px 인라인 금지.
- 인터랙션 액센트는 `var(--color-signal)`(아쿠아) 하나만. 그림자는 오버레이 시트 외 금지.
- 경로는 항상 상대경로(앞에 `/` 금지) — GitHub Pages 서브경로 배포 호환.
- 한글은 Pretendard 스택(`--font-body`), 라틴 디스플레이는 `--font-display`, 메타/태그는 `--font-mono`.
- JS 전역은 `window.INU` 네임스페이스.
- 각 Task 완료 시 로컬 테스트 통과 후 `git commit` + `git push origin main` (origin = `kdh001/inu-lecture-starterkit`).
- 저장소 링크를 지어내지 말 것. 공개 URL이 확인된 것만 링크(현재 확인됨: `https://github.com/kdh001/keyword-scout`). 미확인 프로젝트 카드는 링크 없이 역할 라벨만 표기.

## 로컬 테스트 관례 (모든 Task 공통)

이 저장소는 유닛 테스트 프레임워크가 없다. "테스트" = 아래 스모크 체크로 정의한다.

- 로컬 서버 기동(백그라운드): `python3 -m http.server 8000`
- 페이지 응답: `curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/<page>` → `200`
- 콘텐츠 존재: `curl -s http://localhost:8000/<page> | grep -c "<기대 문자열>"` → `1` 이상
- JS 문법: `node --check js/<file>.js`
- 최종 시각 확인: 브라우저에서 `http://localhost:8000/` 열어 섹션/애니메이션 육안 확인(각 Task 끝에 명시).

---

## 프로젝트 콘텐츠 데이터 (참조용)

홈 대표작 3개 + projects.html 전체 6개. 설명은 사용자 볼트 기준. 링크는 위 제약 참고.

| 프로젝트 | 한 줄 설명 | 태그 | 링크 |
|---------|-----------|------|------|
| 영양제 추천 시스템 | 생체데이터 기반 영양제 자동 디스펜싱 (산학캡스톤) | Swift · Firebase · ESP32 | (비공개 — 링크 없음) |
| auto-equity-trader | 키움 REST 기반 주식 자동매매 봇 · 128 tests | Python | (비공개 — 링크 없음) |
| keyword-scout | 키워드 소싱·트렌드 분석 파이프라인 | Python | https://github.com/kdh001/keyword-scout |
| father-music-pipeline | Suno 음원 QA·병합·영상 파이프라인 | Python · FFmpeg | (비공개 — 링크 없음) |
| haenam-solar-finder | 태양광 부지 지도·점수화 웹 PoC | JavaScript · Map | (비공개 — 링크 없음) |
| inu-llm-lecture | LLM·RAG·Agentic 실습 노트북 | Python · LLM | (비공개 — 링크 없음) |

> **Task 1 Step 0에서 사용자에게 공개 저장소 URL을 확인**하고, 확인된 것만 해당 카드에 GitHub 링크를 추가한다. 확인 전에는 표 그대로 진행.

---

## Task 1: 포트폴리오 CSS 컴포넌트 추가

**Files:**
- Modify: `css/components.css` (파일 끝에 새 섹션 추가)

**Interfaces:**
- Produces: CSS 클래스 `.pf-section`, `.pf-section__eyebrow`, `.pf-intro`, `.pf-cta`, `.tag-row`, `.tag`, `.reveal`, `.reveal.is-visible`. 이후 Task 2·3·4가 이 클래스를 사용.

- [ ] **Step 0: (사용자 확인) 공개 저장소 URL**

사용자에게 위 표의 프로젝트 중 공개 GitHub 저장소가 있는 것의 URL을 물어 표를 갱신한다. 응답이 없으면 keyword-scout만 링크로 두고 진행.

- [ ] **Step 1: components.css 끝에 포트폴리오 섹션 추가**

`css/components.css` 맨 아래(반응형 섹션 뒤)에 append:

```css
/* ============================================================
 * 10. Portfolio — sections, tags, reveal
 * ============================================================ */

/* 홈 섹션 공통 컨테이너 */
.pf-section {
  max-width: var(--content-max);
  margin-inline: auto;
  padding-block: var(--space-12);
  padding-inline: var(--space-4);
}
.pf-section__eyebrow {
  margin-bottom: var(--space-6);
}

/* 소개 블록 — hero 아래 흡수 (72ch 읽기 폭) */
.pf-intro {
  max-width: var(--measure);
  margin-inline: auto;
  padding-block: var(--space-12);
  padding-inline: var(--space-4);
}

/* 연락처 CTA 밴드 */
.pf-cta {
  text-align: center;
  padding-block: var(--space-12);
  padding-inline: var(--space-4);
  border-top: var(--hairline-w) solid var(--color-hairline);
}
.pf-cta__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);
  margin-top: var(--space-6);
}

/* 비인터랙티브 태그 pill (기술스택/자격증) */
.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-3);
}
.tag {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-muted);
  background-color: var(--color-surface-2);
  border: var(--hairline-w) solid var(--color-hairline);
  border-radius: var(--radius-sm);
  padding: var(--space-1) var(--space-2);
}

/* 스크롤 리빌 : fade-up */
.reveal {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s var(--ease), transform 0.5s var(--ease);
}
.reveal.is-visible {
  opacity: 1;
  transform: none;
}
@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

- [ ] **Step 2: CSS가 유효한지 확인 (중괄호 짝)**

Run: `node -e "const c=require('fs').readFileSync('css/components.css','utf8');const o=(c.match(/{/g)||[]).length,x=(c.match(/}/g)||[]).length;if(o!==x)throw new Error('brace mismatch '+o+'/'+x);console.log('braces ok',o)"`
Expected: `braces ok <n>` (에러 없이 종료)

- [ ] **Step 3: 새 클래스가 존재하는지 확인**

Run: `grep -c -E '\.(pf-section|pf-intro|pf-cta|tag|reveal)\b' css/components.css`
Expected: `6` 이상

- [ ] **Step 4: Commit + Push**

```bash
git add css/components.css
git commit -m "feat: 포트폴리오용 CSS 컴포넌트(pf-section·tag·reveal) 추가"
git push origin main
```

---

## Task 2: projects.html 전체 갤러리 페이지 생성

**Files:**
- Create: `projects.html`

**Interfaces:**
- Consumes: 기존 `.card`/`.card-grid`/`.card__tag`/`.card__title`/`.card__desc`/`.card__foot`, `.tag-row`/`.tag`(Task 1), `.text-link`, `.t-eyebrow`/`.t-display-md`/`.t-body`.
- Produces: `projects.html` (nav에서 링크될 대상). Task 3의 `NAV_LINKS`가 이 파일을 가리킴.

- [ ] **Step 1: projects.html 작성**

`about.html`의 `<head>`·placeholder 구조를 그대로 따르고 `<main>`만 갤러리로 채운다. 파일 전체:

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>김도훈 — Projects</title>
    <meta name="description" content="김도훈의 프로젝트 모음 — 캡스톤·개인 개발 프로젝트" />

    <script>
      (function () {
        try {
          var t =
            localStorage.getItem("theme") ||
            (matchMedia("(prefers-color-scheme: light)").matches
              ? "light"
              : "dark");
          document.documentElement.dataset.theme = t;
        } catch (e) {}
      })();
    </script>

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap"
      rel="stylesheet"
    />
    <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css"
    />

    <link rel="stylesheet" href="css/tokens.css" />
    <link rel="stylesheet" href="css/base.css" />
    <link rel="stylesheet" href="css/components.css" />

    <script defer src="js/main.js"></script>
    <script defer src="js/layout.js"></script>
  </head>
  <body>
    <header id="site-nav"></header>

    <main class="pf-section">
      <p class="t-eyebrow" style="margin-bottom: var(--space-3)">Projects</p>
      <h1 class="t-display-md">프로젝트</h1>
      <p class="t-body" style="margin-top: var(--space-4); max-width: var(--measure)">
        캡스톤과 개인 개발로 만든 것들입니다. 임베디드·AI·자동화·웹을 오가며
        아이디어를 빠르게 제품으로 옮기는 걸 좋아합니다.
      </p>

      <div class="card-grid" style="margin-top: var(--space-8)">
        <article class="card">
          <p class="card__tag">Capstone</p>
          <h2 class="card__title">영양제 추천 시스템</h2>
          <p class="card__desc">생체데이터 기반 영양제 자동 디스펜싱 시스템. iOS 앱·Firestore 허브·ESP32 제어를 연결한 산학캡스톤 프로젝트.</p>
          <div class="tag-row">
            <span class="tag">Swift</span><span class="tag">Firebase</span><span class="tag">ESP32</span>
          </div>
          <p class="card__foot">산학캡스톤디자인</p>
        </article>

        <article class="card">
          <p class="card__tag">Personal</p>
          <h2 class="card__title">auto-equity-trader</h2>
          <p class="card__desc">키움 REST API 기반 주식 자동매매 봇. 전략·백테스트·리스크 관리 코어에 128개 테스트를 갖춘 개인 프로젝트.</p>
          <div class="tag-row">
            <span class="tag">Python</span>
          </div>
          <p class="card__foot">개인 프로젝트</p>
        </article>

        <article class="card">
          <p class="card__tag">Personal</p>
          <h2 class="card__title">keyword-scout</h2>
          <p class="card__desc">키워드 소싱·트렌드 분석 파이프라인. 데이터 수집부터 점수화·리포트까지 자동화.</p>
          <div class="tag-row">
            <span class="tag">Python</span>
          </div>
          <p class="card__foot">
            <a class="text-link" href="https://github.com/kdh001/keyword-scout">GitHub →</a>
          </p>
        </article>

        <article class="card">
          <p class="card__tag">Personal</p>
          <h2 class="card__title">father-music-pipeline</h2>
          <p class="card__desc">Suno 생성 음원의 QA·병합과 영상·업로드까지 잇는 파이프라인.</p>
          <div class="tag-row">
            <span class="tag">Python</span><span class="tag">FFmpeg</span>
          </div>
          <p class="card__foot">개인 프로젝트</p>
        </article>

        <article class="card">
          <p class="card__tag">PoC</p>
          <h2 class="card__title">haenam-solar-finder</h2>
          <p class="card__desc">태양광 발전 부지 후보를 지도 위에서 점수화해 보여주는 웹 PoC.</p>
          <div class="tag-row">
            <span class="tag">JavaScript</span><span class="tag">Map</span>
          </div>
          <p class="card__foot">PoC</p>
        </article>

        <article class="card">
          <p class="card__tag">Lecture</p>
          <h2 class="card__title">inu-llm-lecture</h2>
          <p class="card__desc">INU LLM 특강 실습 — LLM·RAG·Agentic 워크플로 노트북과 소스.</p>
          <div class="tag-row">
            <span class="tag">Python</span><span class="tag">LLM</span>
          </div>
          <p class="card__foot">INU 특강</p>
        </article>
      </div>
    </main>

    <footer id="site-footer"></footer>
  </body>
</html>
```

- [ ] **Step 2: 로컬 서버 기동 후 응답 확인**

Run:
```bash
pkill -f "http.server 8000" 2>/dev/null; sleep 1
python3 -m http.server 8000 >/tmp/pf-server.log 2>&1 &
sleep 1
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/projects.html
```
Expected: `200`

- [ ] **Step 3: 카드 6개가 렌더되는지 확인**

Run: `curl -s http://localhost:8000/projects.html | grep -c 'class="card__title"'`
Expected: `6`

- [ ] **Step 4: 브라우저 육안 확인**

`http://localhost:8000/projects.html` 를 열어 카드 6개·태그·keyword-scout GitHub 링크·주입된 nav/footer 확인.

- [ ] **Step 5: Commit + Push**

```bash
git add projects.html
git commit -m "feat: 프로젝트 전체 갤러리 페이지(projects.html) 추가"
git push origin main
```

---

## Task 3: index.html 포트폴리오 원페이지로 재작성

**Files:**
- Modify: `index.html` (`<main>` 내부 전체 교체, `<title>`/description 갱신)

**Interfaces:**
- Consumes: `.hero`/`.hero__inner`/`.hero-accent`/`.hero__cta`, `.btn`/`.btn--primary`/`.btn--lg`, `.card-grid`/`.card`, `.pf-intro`/`.pf-section`/`.pf-cta`/`.tag-row`/`.tag`(Task 1), `.t-*` 유틸.
- Produces: 섹션 id `#projects`, `#skills`, `#contact` (Task 4 nav 앵커 + reveal 대상).

- [ ] **Step 1: `<title>`·description 교체**

`index.html`의 `<title>INU Starter — Home</title>` → `<title>김도훈 — 포트폴리오</title>`
`<meta name="description" content="INU 강의용 github.io 정적 웹서비스 스타터킷" />` → `<meta name="description" content="인천대 컴퓨터공학 전공·전자공학 복수전공 김도훈의 개발 포트폴리오" />`

- [ ] **Step 2: `<main>` 내부 전체 교체**

`index.html`의 `<main>` … `</main>` 전체를 아래로 교체:

```html
    <main>
      <!-- Hero -->
      <section class="hero">
        <div class="hero__inner">
          <p class="t-eyebrow">INU · PORTFOLIO</p>
          <h1 class="t-hero-display">
            컴퓨터공학 전공 · 전자공학 복수전공<br />
            개발자 <span class="hero-accent">김도훈</span>
          </h1>
          <div class="hero__cta">
            <a class="btn btn--primary btn--lg" href="#projects">프로젝트 보기</a>
            <a class="btn btn--lg" href="https://github.com/kdh001">GitHub</a>
          </div>
        </div>
      </section>

      <!-- 소개 (about 흡수) -->
      <section class="pf-intro reveal">
        <p class="t-eyebrow" style="margin-bottom: var(--space-3)">소개</p>
        <p class="t-body">
          인천대학교 컴퓨터공학을 전공하며 전자공학을 복수전공합니다. 임베디드·AI·바이브코딩으로
          아이디어를 빠르게 제품으로 만드는 걸 좋아하고, 반도체 직무를 향해 학습과 프로젝트를
          쌓고 있습니다. 캡스톤과 개인 프로젝트로 만든 것들을 아래에 모았습니다.
        </p>
      </section>

      <!-- 대표 프로젝트 -->
      <section class="pf-section reveal" id="projects">
        <p class="t-eyebrow pf-section__eyebrow">대표 프로젝트</p>
        <div class="card-grid">
          <article class="card">
            <p class="card__tag">Capstone</p>
            <h2 class="card__title">영양제 추천 시스템</h2>
            <p class="card__desc">생체데이터 기반 영양제 자동 디스펜싱. iOS·Firestore·ESP32를 연결한 산학캡스톤.</p>
            <div class="tag-row">
              <span class="tag">Swift</span><span class="tag">Firebase</span><span class="tag">ESP32</span>
            </div>
            <p class="card__foot">산학캡스톤디자인</p>
          </article>
          <article class="card">
            <p class="card__tag">Personal</p>
            <h2 class="card__title">auto-equity-trader</h2>
            <p class="card__desc">키움 REST 기반 주식 자동매매 봇. 전략·백테스트 코어에 128개 테스트.</p>
            <div class="tag-row">
              <span class="tag">Python</span>
            </div>
            <p class="card__foot">개인 프로젝트</p>
          </article>
          <article class="card">
            <p class="card__tag">Personal</p>
            <h2 class="card__title">keyword-scout</h2>
            <p class="card__desc">키워드 소싱·트렌드 분석 파이프라인. 수집부터 점수화·리포트까지 자동화.</p>
            <div class="tag-row">
              <span class="tag">Python</span>
            </div>
            <p class="card__foot">
              <a class="text-link" href="https://github.com/kdh001/keyword-scout">GitHub →</a>
            </p>
          </article>
        </div>
        <p style="margin-top: var(--space-8)">
          <a class="text-link" href="projects.html">프로젝트 전체 보기 →</a>
        </p>
      </section>

      <!-- 기술 스택 / 자격증 -->
      <section class="pf-section reveal" id="skills">
        <p class="t-eyebrow pf-section__eyebrow">기술 스택 · 자격증</p>
        <div class="tag-row">
          <span class="tag">Python</span>
          <span class="tag">Swift / SwiftUI</span>
          <span class="tag">C</span>
          <span class="tag">HTML / CSS / JS</span>
          <span class="tag">ESP32 / 임베디드</span>
          <span class="tag">LLM / RAG</span>
          <span class="tag">Firebase</span>
          <span class="tag">Git</span>
        </div>
      </section>

      <!-- 연락처 CTA -->
      <section class="pf-cta reveal" id="contact">
        <h2 class="t-tagline">함께 만들고 싶은 게 있다면</h2>
        <div class="pf-cta__actions">
          <a class="btn btn--primary btn--lg" href="mailto:hi20020721@gmail.com">이메일 보내기</a>
          <a class="btn btn--lg" href="https://github.com/kdh001">GitHub</a>
        </div>
      </section>
    </main>
```

- [ ] **Step 3: 응답·콘텐츠 확인**

Run:
```bash
pkill -f "http.server 8000" 2>/dev/null; sleep 1
python3 -m http.server 8000 >/tmp/pf-server.log 2>&1 &
sleep 1
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/index.html
curl -s http://localhost:8000/index.html | grep -c -E 'id="(projects|skills|contact)"'
```
Expected: `200` 그리고 두 번째 명령 `3`

- [ ] **Step 4: about.html로의 잔존 링크가 없는지 확인**

Run: `grep -c 'about.html' index.html`
Expected: `0`

- [ ] **Step 5: 브라우저 육안 확인**

`http://localhost:8000/` 에서 Hero 헤드라인(컴퓨터공학·전자공학 복수전공), 소개, 대표작 3, 스킬 칩, 연락처 CTA, "프로젝트 전체 보기" 링크 이동 확인.

- [ ] **Step 6: Commit + Push**

```bash
git add index.html
git commit -m "feat: 홈을 포트폴리오 원페이지로 재작성(Hero·소개·프로젝트·스킬·연락처)"
git push origin main
```

---

## Task 4: nav 정비 + about.html 삭제

**Files:**
- Modify: `js/layout.js` (`SITE`, `NAV_LINKS`, `FOOTER_COLUMNS`)
- Delete: `about.html`

**Interfaces:**
- Consumes: `index.html`의 섹션 앵커 `#projects`/`#skills`/`#contact`, `projects.html`.
- Produces: 최종 nav/footer 구성. about 참조 완전 제거.

- [ ] **Step 1: 워드마크를 이름으로 변경**

`js/layout.js`의 `SITE` 객체에서:
```js
  brandLead: "inu",
  brandTail: "starter",
```
을
```js
  brandLead: "kim",
  brandTail: "dohun",
```
로 교체.

- [ ] **Step 2: NAV_LINKS 교체**

`js/layout.js`의 `NAV_LINKS` 배열을 교체:
```js
const NAV_LINKS = [
  { href: "index.html", label: "Home" },
  { href: "projects.html", label: "Projects" },
  { href: "index.html#skills", label: "Skills" },
  { href: "index.html#contact", label: "Contact" },
];
```

- [ ] **Step 3: FOOTER_COLUMNS의 about 링크 교체**

`js/layout.js` `FOOTER_COLUMNS`의 "프로젝트" 컬럼 링크를 교체:
```js
    links: [
      { href: "index.html", label: "홈" },
      { href: "projects.html", label: "프로젝트" },
      { href: "index.html#contact", label: "연락처" },
    ],
```
("컴포넌트" 링크(`components.html`)는 리소스 컬럼으로 남겨도 되고 제거해도 됨 — 기본은 그대로 둔다.)

- [ ] **Step 4: about.html 삭제**

Run: `git rm about.html`
Expected: `rm 'about.html'`

- [ ] **Step 5: layout.js 문법 확인**

Run: `node --check js/layout.js && echo OK`
Expected: `OK`

- [ ] **Step 6: about 참조가 저장소에서 사라졌는지 확인**

Run: `grep -rn 'about.html' index.html projects.html js/ | grep -v node_modules || echo "no about refs"`
Expected: `no about refs`

- [ ] **Step 7: nav 링크가 유효 대상인지 확인 (서버)**

Run:
```bash
pkill -f "http.server 8000" 2>/dev/null; sleep 1
python3 -m http.server 8000 >/tmp/pf-server.log 2>&1 &
sleep 1
for p in index.html projects.html; do
  echo -n "$p "; curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/$p
done
curl -s -o /dev/null -w "about.html %{http_code}\n" http://localhost:8000/about.html
```
Expected: `index.html 200`, `projects.html 200`, `about.html 404`

- [ ] **Step 8: 브라우저 육안 확인**

`http://localhost:8000/` 에서 nav가 `kim·dohun / Home / Projects / Skills / Contact` 로 뜨고, Skills·Contact 클릭 시 홈 앵커로 스크롤, Projects 클릭 시 페이지 이동 확인. 모바일 폭(≤560px)에서 햄버거 토글 동작 확인.

- [ ] **Step 9: Commit + Push**

```bash
git add -A
git commit -m "feat: nav를 포트폴리오 구성으로 정비하고 about.html 제거"
git push origin main
```

---

## Task 5: 스크롤 리빌 인터랙션 연결

**Files:**
- Modify: `js/main.js` (`window.INU.bindReveal` 추가)
- Modify: `js/layout.js` (`mountLayout`에서 `bindReveal()` 호출)

**Interfaces:**
- Consumes: `.reveal`/`.reveal.is-visible`(Task 1), index 섹션의 `reveal` 클래스(Task 3).
- Produces: `window.INU.bindReveal()` — `.reveal` 요소가 뷰포트 진입 시 `is-visible` 부여.

- [ ] **Step 1: main.js에 bindReveal 추가**

`js/main.js` 끝(파일 마지막)에 append:
```js
/** .reveal 요소가 뷰포트에 들어오면 is-visible 부여 (스크롤 리빌 fade-up) */
window.INU.bindReveal = function bindReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  // IntersectionObserver 미지원/모션 최소화 시 즉시 표시
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || typeof IntersectionObserver === "undefined") {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  els.forEach((el) => io.observe(el));
};
```

- [ ] **Step 2: layout.js에서 bindReveal 호출**

`js/layout.js`의 `mountLayout()` 안, `bindTheme()` 호출 블록 바로 뒤에 추가:
```js
  if (window.INU && typeof window.INU.bindReveal === "function") {
    window.INU.bindReveal();
  }
```

- [ ] **Step 3: JS 문법 확인**

Run: `node --check js/main.js && node --check js/layout.js && echo OK`
Expected: `OK`

- [ ] **Step 4: bindReveal 노출/호출 확인**

Run: `grep -c 'bindReveal' js/main.js js/layout.js`
Expected: `js/main.js:2`(정의+할당 라인) 이상, `js/layout.js:2` 이상 — 두 파일 모두 `bindReveal` 포함

- [ ] **Step 5: 브라우저 육안 확인**

`http://localhost:8000/` 를 새로고침하고 위→아래로 스크롤하며 소개·프로젝트·스킬·연락처 섹션이 fade-up으로 등장하는지 확인. 시스템 "동작 줄이기"(prefers-reduced-motion) 켠 상태에서는 애니메이션 없이 즉시 표시되는지 확인.

- [ ] **Step 6: Commit + Push**

```bash
git add js/main.js js/layout.js
git commit -m "feat: 스크롤 리빌(IntersectionObserver fade-up) 추가"
git push origin main
```

- [ ] **Step 7: 서버 종료**

Run: `pkill -f "http.server 8000" 2>/dev/null; echo done`

---

## Self-Review 체크 결과

- **Spec 커버리지**: 구조(하이브리드) Task 2·3·4 / index 섹션 Task 3 / projects.html Task 2 / about 삭제 Task 4 / 스크롤 리빌 Task 5 / CSS 토큰 준수 Task 1 / 단계별 test+commit+push 각 Task Step. 누락 없음.
- **플레이스홀더**: 없음(모든 마크업·CSS·JS 전체 코드 제시, 링크는 확인된 것만).
- **타입/이름 일관성**: `.reveal`/`is-visible`, `bindReveal`, `#projects/#skills/#contact`, `.pf-*`, `.tag` 가 Task 간 동일하게 사용됨.
