# 도서 쇼핑몰

React와 Tailwind CSS로 구현한 모던한 도서 쇼핑몰 웹 애플리케이션입니다.

## 주요 기능

### 1. 회원 및 마이페이지
- 회원 가입 / 로그인 / 로그아웃
- 내 정보 조회/수정
- 회원 탈퇴
- 구매 목록 조회
- 내가 쓴 댓글 목록 조회

### 2. 도서 탐색 및 검색
- 전체 도서 목록 조회
- 신간 도서 조회
- 인기 도서 랭킹 조회
- 카테고리별 도서 조회
- 도서명/저자명 검색

### 3. 장바구니 및 구매
- 장바구니 목록 조회
- 장바구니 담기
- 장바구니 도서 제거
- 도서 구매/선택 항목 구매
- 구매 내역 저장

### 4. 도서 상세 및 리뷰
- 도서 상세 정보 조회
- 댓글 조회
- 댓글 등록
- 댓글 수정/삭제

### 5. 관리자 기능
- 새 도서 등록
- 기존 도서 정보 수정
- 도서 삭제
- 이미지 파일 등록/업로드

## 기술 스택

- **React 18** - UI 라이브러리
- **Vite** - 빌드 도구
- **React Router** - 라우팅
- **Tailwind CSS** - 스타일링
- **React Hook Form** - 폼 관리
- **Context API** - 상태 관리
- **Lucide React** - 아이콘

## 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속하세요.

### 3. 빌드

```bash
npm run build
```

## Vercel 배포

### 방법 1: Vercel CLI 사용

1. Vercel CLI 설치
```bash
npm i -g vercel
```

2. 배포
```bash
vercel
```

3. 프로덕션 배포
```bash
vercel --prod
```

### 방법 2: Vercel 웹 대시보드 사용

1. [Vercel](https://vercel.com)에 로그인
2. "Add New Project" 클릭
3. GitHub/GitLab/Bitbucket에서 저장소 연결 또는 직접 업로드
4. 프로젝트 설정:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. "Deploy" 클릭

### 배포 후 확인사항

- ✅ SPA 라우팅이 정상 작동하는지 확인 (vercel.json에 rewrites 설정 포함)
- ✅ 환경 변수가 필요한 경우 Vercel 대시보드에서 설정
- ✅ 커스텀 도메인 연결 (선택사항)

## 테스트 계정

### 일반 사용자
- 이메일: `user@example.com`
- 비밀번호: `password`

### 관리자
- 이메일: `admin@example.com`
- 비밀번호: `password`

## 프로젝트 구조

```
src/
├── components/      # 재사용 가능한 컴포넌트
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── BookCard.jsx
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── Layout.jsx
├── contexts/       # Context API (상태 관리)
│   ├── AuthContext.jsx
│   ├── CartContext.jsx
│   └── BookContext.jsx
├── pages/          # 페이지 컴포넌트
│   ├── Home.jsx
│   ├── BookList.jsx
│   ├── BookDetail.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Cart.jsx
│   ├── MyPage.jsx
│   ├── Admin.jsx
│   └── Search.jsx
├── utils/          # 유틸리티 함수
│   └── mockData.js
├── App.jsx         # 메인 앱 컴포넌트
├── main.jsx        # 진입점
└── index.css       # 전역 스타일
```

## 주요 특징

- 🎨 모던하고 반응형 디자인
- 🔐 사용자 인증 시스템
- 🛒 장바구니 기능
- ⭐ 리뷰 및 평점 시스템
- 👤 마이페이지
- 🔧 관리자 도서 관리
- 📱 모바일 친화적 UI

## 데이터 저장

현재는 localStorage를 사용하여 데이터를 저장합니다. 실제 프로덕션 환경에서는 백엔드 API와 연동하여 사용하시면 됩니다.

## 라이선스

MIT
