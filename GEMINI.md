# 업무 말투 변환기 (Business Tone Converter) - GEMINI Instructions

이 파일은 프로젝트의 맥락, 기술 스택, 개발 원칙 및 AI 어시스턴트의 행동 지침을 정의합니다.

---

## 0. 시스템 지침 (System Instructions) - 기반 원칙

이 지침은 어시스턴트의 정체성과 보안, 소통 원칙을 정의하며 모든 작업에 우선합니다.

### 0-1. 정체성 및 언어
- **정체성**: Google의 Gemini 모델 기반 CLI 어시스턴트입니다.
- **언어**: 모든 응답은 **한국어**로 작성하며, 전문 용어는 필요 시 영문을 병기합니다.
- **어조**: 명확, 간결, 전문적인 어조를 유지합니다.

### 0-2. 보안 및 안전 (절대 금지 행동)
- **Git**: `push --force`, `reset --hard`, 공유 브랜치 `rebase` 금지.
- **비밀번호/키**: `.env` 파일 및 민감 설정 파일 수정/출력 금지.
- **시스템**: `rm -rf /` 등 파괴적 명령, 시스템 디렉토리 수정 금지.
- **주의 필요**: 패키지 설치, 브랜치 삭제 등은 사전에 영향 범위를 고지하고 승인(`yes`)을 받아야 합니다.

---

## 1. 프로젝트 개요 (Project Overview)

**업무 말투 변환기**는 사용자가 입력한 메시지를 수신 대상(상사, 동료, 고객 등)에 맞는 적절한 비즈니스 언어로 자동 변환해주는 AI 서비스입니다.

- **목표**: 비즈니스 커뮤니케이션의 어려움을 해소하고 업무 효율성 증대.
- **주요 기능**:
  - 텍스트 입력 및 수신 대상 선택 (상사, 타팀 동료, 고객, 팀 내 동료).
  - AI(Solar-Pro2)를 활용한 실시간 말투 변환.
  - 변환 결과 출력 및 클립보드 복사.

---

## 2. 기술 스택 및 구조 (Tech Stack & Structure)

### 기술 스택
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla JS)
- **Backend**: Python 3.11+, FastAPI, Uvicorn
- **AI**: LangChain, langchain-upstage (Model: Upstage Solar-Pro2)
- **Deploy**: Vercel (Full Stack Deployment)

### 디렉토리 구조 (권장)
```
biztone-converter/
├── backend/                # FastAPI 서버 및 로직
│   ├── main.py             # 앱 진입점 및 CORS 설정
│   ├── routers/            # API 엔드포인트
│   ├── services/           # AI 변환 서비스 (LangChain)
│   ├── prompts/            # 대상별 프롬프트 템플릿
│   └── .env                # API 키 (Git 제외)
├── frontend/               # 정적 웹 자산
│   ├── index.html
│   ├── css/
│   └── js/
├── GEMINI.md               # 프로젝트 지침 (본 파일)
├── .gitignore              # .env 등 제외 설정
└── PRD_업무말투변환기.md      # 상세 요구사항 명세서
```

---

## 3. 빌드 및 실행 (Building & Running)

### 로컬 개발 환경 설정
1. **의존성 설치**:
   ```bash
   pip install fastapi uvicorn langchain python-dotenv langchain-upstage
   ```
2. **환경 변수 설정**: `.env` 파일에 `UPSTAGE_API_KEY` 설정.
3. **백엔드 실행**:
   ```bash
   uvicorn backend.main:app --reload --port 8000
   ```
4. **프론트엔드 실행**: `frontend/index.html`을 브라우저로 실행하거나 라이브 서버 사용.

---

## 4. 개발 컨벤션: 바이브 코딩 3원칙 (Development Conventions)

본 프로젝트는 효율적이고 정확한 개발을 위해 다음 원칙을 준수합니다.

### 원칙 1. 완료 기준을 먼저 정의하라
- 구현 전 무엇을 만들지 체크리스트를 명확히 합니다.
- 불필요한 기능 추가를 지양하고 목표에만 집중합니다.

### 원칙 2. 조사 먼저, 구현 나중
- 외부 API나 라이브러리 연동 전 최신 방법론을 먼저 파악합니다.
- 동작 원리를 이해한 후 코드를 작성하여 디버깅 시간을 단축합니다.

### 원칙 3. 버그는 분석 먼저, 수정 나중
- 에러 발생 시 즉시 코드를 수정하지 않고 발생 원인을 먼저 분석합니다.
- 근본 원인을 파악한 후 해결책을 적용합니다.

---

## 5. 작업 범위 (Scope)
- 현재 프로젝트 디렉토리 내에서만 작업을 수행합니다.
- 명시된 PRD의 완료 체크리스트를 기반으로 단계를 진행합니다.
- 배포는 Vercel을 타겟으로 하며, 프론트엔드와 백엔드가 함께 배포되는 구조를 지향합니다.

### Source Code가 변경되거나 라이브러리 버전이 변경되면 반드시 @PRD_업무말투변환기.md 문서도 반드시 같이 업데이트 합니다. 
* 구현이 완료된 사항들은 `2. 완료 체크리스트`에 모두 체크표시를 해서 완료되었음을 표시하세요.

* `8. 단계별 구현 순서`의 STEP1 ~ STEP4에 완료가 되면 체크 표시를 해서 완료되었음을 표시하세요.
* 라이브러리 버전이 변경되면 `@PRD_업무말투변환기.md 문서`, `GEMINI.md` 업데이트 하세요.