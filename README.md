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
            └── App.tsx      # Hello World
```

## 📝 라이선스

MIT License
