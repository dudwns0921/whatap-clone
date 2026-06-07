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
  - [x] Header
  - [x] ControlBar (LIVE 타이머)
  - [x] Sidebar (ElioTap 브랜딩)
  - [x] ThemeSwitcher (테마 전환 팝업)
- [x] 테마별 색상 시스템 (#D7E1FF / #003F75)
- [x] 라이브 타이머 훅 (useLiveTimer)

### Phase 2: Canvas 차트 위젯 🚧

- [ ] 히트맵 차트 (Heatmap)
- [ ] 액티브 트랜잭션 도넛 차트
- [ ] TPS 라인/에어리어 차트
- [ ] Apdex 스택 에어리어 차트
- [ ] 시스템 CPU 차트
- [ ] 힙 메모리 차트

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
