---
name: eliotap-ui-guidelines
description: UI 작업 시 reference 폴더 확인 및 ElioTap 스타일 가이드 적용. "UI 구현", "컴포넌트 작성", "스타일링", "레이아웃 작업" 시 사용.
metadata:
  author: eliotap
  version: "1.0.0"
  scope: project
---

# ElioTap UI Guidelines

ElioTap 모니터링 대시보드의 UI 작업을 위한 가이드라인입니다.

## 작업 전 필수 확인사항

UI 관련 작업을 시작하기 전에 **반드시** 아래 파일들을 먼저 읽어야 합니다:

```
reference/main-ui.png              → 메인 UI 레퍼런스
reference/theme-change-ui.png      → 테마 변경 UI 레퍼런스
reference/chart-ui.png             → 차트 호버 인터랙션 및 툴팁 UI 레퍼런스
reference/whatap-dashboard.html    → HTML 구조 및 스타일 레퍼런스
```

## 디자인 원칙

### 1. 브랜딩
- **제품명**: ElioTap (WhaTap이 아님)
- **로고**: 텍스트만 사용, 컬러 바 제거
- **테마**: Light / Dark (Presentation 모드 제거됨)

### 2. 색상 시스템
- **다크 모드 우선** (기본 테마)
- Tailwind CSS v4 theme variables 사용 필수
- 하드코딩된 색상 금지 (예: `#1a2035` → `var(--color-surface-sidebar)`)

**주요 테마 변수:**
```css
/* Surface */
--color-surface-primary      → 메인 배경
--color-surface-secondary    → 카드, 패널 배경
--color-surface-sidebar      → 사이드바 배경

/* Text */
--color-text-primary         → 주요 텍스트
--color-text-secondary       → 부가 텍스트
--color-text-tertiary        → 비활성 텍스트

/* Brand */
--color-brand-cyan           → 주요 강조색
--color-brand-green          → 성공/활성
--color-brand-yellow         → 경고
--color-brand-red            → 에러

/* Interactive */
--color-hover-overlay        → 호버 상태
--color-border-default       → 기본 테두리
```

### 3. 타이포그래피
- **본문**: 13px (var(--font-size-base))
- **작은 텍스트**: 11px (var(--font-size-sm))
- **큰 제목**: 15px (var(--font-size-lg))
- **폰트**: Inter (UI), JetBrains Mono (숫자/코드)

### 4. 레이아웃 구조
```
IconBar (48px) → Sidebar (240px) → Main Content (flex-1)
```

**IconBar**:
- 너비: w-12 (48px)
- 테마 스위처 버튼 맨 아래 배치
- 배경: `var(--color-surface-sidebar)`

**Sidebar**:
- 너비: w-60 (240px)
- ElioTap 브랜딩 상단
- 메뉴 선택 시: 파란 배경(#2563eb) + 흰색 텍스트

**Main Content**:
- Header: 제목만 (왼쪽 정렬, text-lg font-bold)
- ControlBar: LIVE 배지 + 타이머 + 일시정지 버튼만

## 작업 체크리스트

UI 컴포넌트 작성 시 반드시 확인:

- [ ] reference/ 폴더의 모든 파일 확인했는가?
- [ ] Tailwind v4 theme variables 사용했는가?
- [ ] 하드코딩된 색상이 없는가?
- [ ] ElioTap 브랜딩을 사용했는가? (WhaTap 아님)
- [ ] 다크 모드와 라이트 모드 모두 정상 작동하는가?
- [ ] HTML 레퍼런스의 구조를 따랐는가?
- [ ] 선택된 메뉴 항목이 잘 보이는가? (#2563eb 배경)

## 금지사항

```
❌ 하드코딩된 색상 (예: bg-[#1a2035])
❌ WhaTap 브랜딩 사용
❌ Presentation 테마
❌ 안내문 ("일부 요소의 경우...")
❌ reference 파일 확인 없이 UI 작업
```

## 허용사항

```
✅ theme variable 사용 (예: bg-[var(--color-surface-sidebar)])
✅ ElioTap 브랜딩
✅ Light / Dark 테마만
✅ reference HTML의 구조와 스타일 참고
✅ 선택 항목: #2563eb 배경 + 흰색 텍스트
```

## 사용 예시

UI 작업 시작 시:
1. reference/main-ui.png 읽기
2. reference/theme-change-ui.png 읽기
3. reference/whatap-dashboard.html 읽기
4. 위 레퍼런스를 기반으로 ElioTap 스타일 적용
5. theme variables만 사용하여 구현
