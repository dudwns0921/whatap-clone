# WhaTap Clone — Monitoring Dashboard

> Canvas 기반 실시간 모니터링 대시보드 프로젝트

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![Turborepo](https://img.shields.io/badge/Turborepo-2.9-ef4444.svg)](https://turbo.build/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8.svg)](https://tailwindcss.com/)

## 🎯 프로젝트 개요

와탭랩스 스타일의 모니터링 대시보드를 Turborepo 모노레포로 구현합니다.

```
packages/charts    →  Canvas 기반 차트 라이브러리 (npm: elio-charts)
packages/ui        →  공통 UI 컴포넌트 라이브러리
apps/dashboard     →  모니터링 대시보드 앱
.storybook/        →  컴포넌트 문서화
```

## 🛠 기술 스택

- **언어**: TypeScript 5.7 (strict)
- **프레임워크**: React 19, React Router v7
- **빌드**: Turborepo 2.9, Vite 6
- **스타일링**: Tailwind CSS v4
- **상태관리**: Zustand (클라이언트), TanStack Query v5 (서버)
- **차트**: Canvas API (외부 라이브러리 사용 금지)
- **테스트**: Vitest
- **문서화**: Storybook 8

## 🚀 시작하기

### 필수 요구사항

- Node.js >= 18
- npm >= 10

### 설치

```bash
git clone https://github.com/dudwns0921/whatap-clone.git
cd whatap-clone
npm install
```

### 개발 서버 실행

```bash
# 대시보드 개발 서버 (포트 3000)
npm run dev

# Storybook (포트 6006)
npm run storybook
```

### 빌드

```bash
npm run build
```

### Docker

```bash
# 로컬 빌드 & 실행
docker compose up --build

# 백그라운드 실행
docker compose up -d --build
```

## 📁 프로젝트 구조

```
whatap-clone/
├── packages/
│   ├── charts/              # Canvas 차트 라이브러리
│   │   └── src/
│   │       └── index.css    # Tailwind v4 차트 테마
│   └── ui/                  # 공통 UI 컴포넌트
│       └── src/
│           └── index.css    # Tailwind v4 UI 테마
└── apps/
    └── dashboard/           # 모니터링 대시보드
        └── src/
            ├── index.css    # Tailwind v4 메인 테마
            ├── stores/      # Zustand 스토어
            ├── components/  # React 컴포넌트
            ├── hooks/       # 커스텀 훅
            └── pages/       # 페이지 컴포넌트
```

## 📊 개발 진행상황

### Phase 1: 기본 UI 구조 ✅

- [x] Tailwind v4 테마 시스템 구축 (Light/Dark)
- [x] Zustand 스토어 구현
- [x] 레이아웃 구조 (IconBar + Sidebar + Main)
- [x] 기본 컴포넌트
  - [x] Header (동적 제목)
  - [x] ControlBar (LIVE 타이머)
  - [x] Sidebar (ElioTap 브랜딩)
  - [x] ThemeSwitcher (테마 전환 팝업)
- [x] 테마별 색상 시스템 (#D7E1FF / #003F75)
- [x] 라이브 타이머 훅 (useLiveTimer)
- [x] React Router 설정
- [x] Storybook 통합 (iframe 렌더링)

### Phase 2: Canvas 차트 위젯 🚧

- [x] Canvas 기본 인프라
  - [x] useCanvas 훅 (devicePixelRatio 처리)
  - [x] useChartResize 훅 (ResizeObserver)
  - [x] Canvas 유틸리티 (drawLine, drawText, drawGrid 등)
  - [x] 차트 유틸리티 (scaleValue, valueToY, indexToX 등)
- [x] LineChart 구현 ✅
  - [x] 시계열 데이터 시각화 (timestamp 기반)
  - [x] X축 시간 레이블 (HH:MM 형식)
  - [x] Y축 값 레이블 (왼쪽 정렬)
  - [x] 연한 점선 그리드
  - [x] 호버 인터랙션 (수직 점선 + 점 표시)
  - [x] 테마 적용 툴팁 (날짜/시간 + 값)
  - [x] 반응형 크기 조정
  - [x] Storybook 스토리 (6가지 케이스)
  - [x] 대시보드 통합 (TPS, CPU, 메모리)
- [ ] 히트맵 차트 (Heatmap)
- [ ] 액티브 트랜잭션 도넛 차트
- [ ] Apdex 스택 에어리어 차트

### Phase 3: 공통 UI 컴포넌트 (packages/ui)

- [ ] Badge
- [ ] Card / WidgetCard
- [ ] Dropdown
- [ ] ToggleGroup
- [ ] EmptyState
- [ ] NavItem

### Phase 4: 데이터 & 문서화

- [ ] Mock 데이터 작성
- [ ] Storybook 스토리
- [ ] 단위 테스트 (Vitest)

## 📝 라이선스

MIT License
