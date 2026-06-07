# CLAUDE.md

이 파일은 Claude Code가 자동으로 읽는 프로젝트 규칙 파일입니다.

---

## 프로젝트 개요

모니터링 UI 컴포넌트 라이브러리 + 대시보드 프로젝트
와탭랩스 스타일의 실시간 모니터링 대시보드를 구현합니다.

```
packages/charts    →  Canvas 기반 차트 라이브러리 (npm: elio-charts)
packages/ui        →  공통 UI 컴포넌트 라이브러리 (Button, Input 등)
apps/dashboard     →  모니터링 대시보드 앱 (Vercel 배포)
.storybook/        →  모든 packages 컴포넌트 문서화
```

---

## 기술 스택

### 공통

- TypeScript (strict mode, any 사용 금지)
- Turborepo (모노레포 관리)
- ESLint 9 (flat config) + Prettier (통합)
- Tailwind CSS v4
- Vitest (테스트)

### packages/charts

- React 19
- Canvas API (차트 렌더링 전용, Recharts/D3/Chart.js 사용 금지)
- Tailwind CSS v4 (스타일링)
- npm 배포: `elio-charts`

### packages/ui

- React 19
- Tailwind CSS v4 (스타일링)
- Headless UI 패턴 (접근성)

### apps/dashboard

- React 19 + Vite
- Zustand (전역 클라이언트 상태)
- TanStack Query v5 (서버/비동기 상태)
- React Router v7
- MSW (API mocking)

### Storybook (root)

- Storybook 8
- packages/charts + packages/ui 통합 문서화

---

## 폴더 구조

```
root/
├── CLAUDE.md
├── .storybook/                →  Storybook 설정 (packages 문서화)
├── reference/                 →  와탭 스타일 디자인 레퍼런스 이미지
├── packages/
│   ├── charts/                →  elio-charts (npm 배포)
│   │   ├── src/
│   │   │   ├── components/   →  차트 컴포넌트
│   │   │   ├── hooks/        →  커스텀 훅
│   │   │   ├── utils/        →  Canvas 유틸 함수
│   │   │   └── types/        →  TypeScript 타입
│   │   └── stories/          →  Storybook 스토리
│   └── ui/                    →  공통 UI 컴포넌트 (npm 배포 예정)
│       ├── src/
│       │   ├── components/   →  Button, Input, Card 등
│       │   ├── hooks/        →  UI 관련 훅
│       │   ├── utils/        →  유틸 함수
│       │   └── types/        →  TypeScript 타입
│       └── stories/          →  Storybook 스토리
└── apps/
    └── dashboard/
        ├── src/
        │   ├── pages/        →  페이지 컴포넌트
        │   ├── stores/       →  Zustand 스토어
        │   ├── hooks/        →  커스텀 훅
        │   ├── mock/         →  하드코딩 mock 데이터
        │   └── types/        →  TypeScript 타입
        └── ...
```

---

## 코드 품질 도구

### ESLint 9 + Prettier (통합)

```bash
npm run lint     # ESLint + Prettier 동시 실행 (에러 검사 + 포맷팅)
npm run format   # Prettier만 실행 (포맷팅만)
```

**ESLint 9 flat config** (`eslint.config.js`)

- TypeScript strict rules
- React 19 rules (react-in-jsx-scope 불필요)
- Prettier 통합 (`eslint-plugin-prettier`)
- 자동 포맷팅 에러로 표시

**Prettier 규칙** (`.prettierrc`)

- Single quotes
- 2 spaces
- Semicolons: yes
- Trailing commas: es5
- Print width: 100

**중요:**

- `any` 타입 사용 시 ESLint 에러
- `console.log` 사용 시 경고 (warn/error만 허용)
- barrel import 금지 (vercel-react-best-practices)

---

## 네이밍 컨벤션

```
컴포넌트 파일     →  PascalCase       (LineChart.tsx)
훅 파일          →  camelCase        (useChartData.ts)
유틸 파일        →  camelCase        (canvasUtils.ts)
타입 파일        →  camelCase        (chartTypes.ts)
스토리 파일      →  PascalCase       (LineChart.stories.tsx)
스토어 파일      →  camelCase        (dashboardStore.ts)
mock 파일        →  camelCase        (metricsData.ts)

컴포넌트명       →  PascalCase
훅명             →  use 접두사 필수  (useResizeObserver)
타입/인터페이스  →  PascalCase, I 접두사 없음
```

---

## Canvas 차트 규칙

Canvas 기반 차트 구현 시 반드시 준수합니다.

```typescript
// ✅ 필수 패턴
// 1. ResizeObserver로 반응형 필수
const observer = new ResizeObserver(entries => {
  canvas.width = entries[0].contentRect.width;
  canvas.height = entries[0].contentRect.height;
  draw();
});

// 2. requestAnimationFrame으로 애니메이션
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draw();
  requestAnimationFrame(animate);
};

// 3. devicePixelRatio 처리 필수 (레티나 대응)
const dpr = window.devicePixelRatio || 1;
canvas.width = width * dpr;
canvas.height = height * dpr;
ctx.scale(dpr, dpr);

// 4. 컴포넌트 언마운트 시 cleanup 필수
useEffect(() => {
  return () => {
    observer.disconnect();
    cancelAnimationFrame(animationId);
  };
}, []);
```

```
❌ 금지
- Recharts, D3.js, Chart.js 등 차트 라이브러리 사용 금지
- SVG 기반 차트 구현 금지
- canvas 없이 CSS로 차트 구현 금지
```

---

## React 성능 최적화 규칙

**vercel-react-best-practices skill을 자동으로 따릅니다.**

주요 원칙:

- barrel import 금지 (`import { X } from '@pkg/X'` 직접 import)
- 독립적인 비동기 작업은 `Promise.all()` 병렬 처리
- 무거운 컴포넌트는 `lazy()` dynamic import
- 비긴급 업데이트는 `startTransition()` 사용
- 반복 조회는 `Map`/`Set` 사용

자세한 규칙은 `.agents/skills/vercel-react-best-practices` 참조

---

## 상태관리 규칙

```
서버/비동기 데이터   →  TanStack Query
전역 클라이언트 상태 →  Zustand
로컬 상태           →  useState / useReducer
URL 상태            →  React Router useSearchParams
```

```typescript
// ✅ Zustand - 진짜 전역 상태만
const useDashboardStore = create<DashboardStore>(set => ({
  theme: 'dark',
  selectedTimeRange: '1h',
  setTimeRange: range => set({ selectedTimeRange: range }),
}));

// ❌ 서버 데이터를 Zustand에 넣지 않기
// fetchMetrics 같은 건 TanStack Query로
```

---

## Storybook 규칙

**위치**: `.storybook/` (root)
**대상**: packages/charts + packages/ui 컴포넌트

```typescript
// ✅ 모든 packages 컴포넌트는 스토리 필수
// ✅ 최소 3가지 케이스: Default, Loading/Disabled, Empty/Error
// ✅ Controls로 props 조작 가능하게
// ✅ MSW로 API 목업 (차트 데이터)

// packages/charts/stories/LineChart.stories.tsx
export const Default: Story = { args: { data: mockData } };
export const Loading: Story = { parameters: { msw: { handlers: [...] } } };
export const Empty: Story = { args: { data: [] } };

// packages/ui/stories/Button.stories.tsx
export const Primary: Story = { args: { variant: 'primary' } };
export const Disabled: Story = { args: { disabled: true } };
```

---

## Mock 데이터 규칙

```typescript
// apps/dashboard/src/mock/ 에 위치
// 실제 모니터링 데이터처럼 현실적으로 작성

// ✅ 시계열 데이터 패턴
export const cpuMetrics = Array.from({ length: 60 }, (_, i) => ({
  time: new Date(Date.now() - (60 - i) * 1000).toISOString(),
  value: Math.floor(Math.random() * 40 + 30), // 30~70% 범위
}));

// ✅ 스파이크 데이터 포함 (현실적인 모니터링 데이터)
// ✅ 에러 케이스 데이터 포함
```

---

## 디자인 규칙

```
테마            →  다크 테마 기반
레퍼런스        →  reference/ 폴더 이미지 참고
스타일          →  와탭 스타일에서 영감받은 오리지널 디자인
배경색          →  #0f1117 계열 (어두운 네이비/블랙)
포인트 색상     →  형광 계열 (cyan, green, yellow)
차트 색상       →  #00d4ff, #00ff88, #ffb800
폰트            →  모노스페이스 계열 (숫자 표시용)
```

---

## 금지사항

```
❌ any 타입 사용
❌ console.log 커밋
❌ Recharts, D3.js, Chart.js 등 차트 라이브러리
❌ barrel import (index.ts에서 전체 re-export)
❌ 서버 데이터를 Zustand에 저장
❌ useEffect로 데이터 fetch (TanStack Query 사용)
❌ SVG 기반 차트
```

---

## Git Workflow

### 커밋 규칙

매 커밋 시 **반드시** README.md의 "개발 진행상황" 섹션을 업데이트합니다.

**커밋 전 체크리스트:**

1. 완료한 작업을 README.md에 체크 (`- [x]`)
2. 다음 단계 작업이 있다면 추가 (`- [ ]`)
3. Phase 완료 시 제목에 ✅ 표시
4. 현재 진행 중인 Phase에 🚧 표시

**예시:**

```markdown
### Phase 1: 기본 UI 구조 ✅
- [x] Tailwind v4 테마 시스템 구축
- [x] Zustand 스토어 구현

### Phase 2: Canvas 차트 위젯 🚧
- [x] 히트맵 차트
- [ ] 액티브 트랜잭션 도넛 차트
```

**커밋 메시지 포맷:**

```
<type>: <subject>

<body (optional)>

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Agent Skills

프로젝트에 설치된 Vercel Labs Agent Skills:

- **vercel-react-best-practices** - React/Next.js 성능 최적화 (우선 참조)
- **vercel-composition-patterns** - 컴포지션 패턴
- **vercel-optimize** - 번들 최적화
- **web-design-guidelines** - UI/UX 디자인 가이드라인

코드 작성/리뷰 시 vercel-react-best-practices를 기본 가이드로 사용합니다.

---

## 참고 문서

Claude Code가 필요 시 참조합니다.

- Turborepo: https://turbo.build/repo/docs
- Storybook: https://storybook.js.org/docs
- TanStack Query: https://tanstack.com/query/latest/docs
- Zustand: https://zustand.docs.pmnd.rs
- Tailwind CSS v4: https://tailwindcss.com/docs
- React Router v7: https://reactrouter.com/start/library/installation
- Vitest: https://vitest.dev/guide
- Canvas API: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
