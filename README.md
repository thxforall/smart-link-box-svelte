# 🧠 SmartLinkBox

AI 요약 및 분류 기능을 갖춘 SvelteKit 기반 북마크 관리 웹앱

---

## ✨ 개요

**SmartLinkBox**는 사용자가 저장한 웹 링크를 기반으로  
AI를 활용해 자동으로 **요약**, **카테고리 분류**, **제목 생성** 기능을 제공하는 북마크 큐레이션 플랫폼입니다.

- ✍️ URL 입력만으로 자동 요약/분류
- 🔐 Supabase 기반 로그인 기능
- ⚡ 빠르고 가벼운 SvelteKit 기반 UI
- 📄 Storybook으로 UI 문서화

---

## 🎯 목적 및 배경

React와 Next.js에 익숙한 상태에서,  
이번 프로젝트는 **SvelteKit과 Supabase**, 그리고 **AI API 연동 학습**을 목표로 진행되었습니다.

### ✅ 기술적 목표
- 새로운 프레임워크(Svelte)의 구조 및 철학 이해
- 백엔드 없는 서버리스 개발 흐름 실습 (Supabase)
- OpenAI API와의 통신 구조 학습
- Storybook으로 UI 개발 독립성 경험

---

## ⚙️ 사용 기술 스택

| 구분 | 기술 |
|------|------|
| 프레임워크 | [SvelteKit](https://kit.svelte.dev/) |
| 백엔드/BaaS | [Supabase](https://supabase.com/) |
| AI API | [OpenAI GPT-4](https://platform.openai.com/) |
| UI 문서화 | [Storybook](https://storybook.js.org/) |
| 스타일링 | Tailwind CSS |

---

## 🔁 기존 스택과의 비교

이전까지는 `React + Next.js`로 프로젝트를 진행해왔으며,  
이번에는 **더 직관적이고 빠른 개발 경험**을 위해 SvelteKit으로 전환하였습니다.

| 항목 | React/Next.js | Svelte/SvelteKit |
|------|---------------|------------------|
| 문법 복잡도 | JSX, 상태 관리 라이브러리 필요 | 선언형 반응성, 내장 store |
| 런타임 성능 | 비교적 크고 무거움 | 컴파일 타임 최적화, 빠름 |
| SSR 구조 | Next.js 기반 설정 필요 | 기본 내장 |
| UI 분리 | Context 등 외부 의존 많음 | 간단한 props + store 구조 |
| 프레임워크 구조 | 생태계 방대 | 컴팩트하고 단순 |

---

## 📌 주요 기능 (MVP 기준)

- ✅ 사용자 로그인 (Supabase Auth)
- ✅ URL 링크 등록
- ✅ GPT-4 기반 자동 요약 기능
- ✅ GPT-4 기반 자동 카테고리 추천
- ✅ 사용자 대시보드에서 링크 목록 확인
- ✅ 반응형 카드 UI 구성 (Tailwind)
- ✅ Storybook 기반 UI 컴포넌트 설계

---

## 🗂️ 디렉토리 구조 (예시)

```
src/
┣ routes/
┃ ┣ +page.svelte
┃ ┣ login/+page.svelte
┃ ┣ dashboard/+page.svelte
┃ ┗ api/summarize/+server.ts
┣ lib/
┃ ┣ supabase.ts
┃ ┗ utils.ts
┣ components/
┃ ┣ LinkCard.svelte
┃ ┣ AddLinkModal.svelte
┣ stores/
┃ ┗ auth.ts
```

---

## 🧠 AI 프롬프트 설계 예시

```txt
"다음 링크의 내용을 짧게 요약해줘. 핵심 내용을 2~3문장으로 정리해줘: [URL]"
```

---

## 🧪 개발 단계

1. ✅ 문서 작성 및 개요 정의
2. 🔲 Supabase 테이블 설계
3. 🔲 SvelteKit 프로젝트 초기화
4. 🔲 인증 기능 구현
5. 🔲 링크 등록 및 요약 처리 API 구성
6. 🔲 대시보드 UI 구현
7. 🔲 Storybook 적용

---

## 💬 향후 확장 아이디어

- 링크 공유 기능 (`/u/:username`)
- 다크 모드
- 댓글/좋아요 기능
- 개인 요약 리포트 생성 기능
- 브라우저 확장기능으로 확장

---
