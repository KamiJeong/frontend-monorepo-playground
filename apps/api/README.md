# API Based NestJS

NestJS 기반의 REST API 서버입니다.

## 설치

```bash
# 루트 디렉토리에서
bun install
```

## 환경 변수 설정

`.env` 파일을 생성하고 다음 변수들을 설정하세요:

```env
DATABASE_URL="your-database-url"
PORT=3001
NODE_ENV=development
```

## 실행 방법

### 개발 모드

```bash
bun run start:dev
```

### 프로덕션 모드

```bash
# 먼저 빌드
bun run build

# 실행
bun run start:prod
```

## API 엔드포인트

### Users
- `POST /users` - 사용자 생성
- `GET /users` - 사용자 목록 조회 (페이지네이션)
- `GET /users/:id` - 특정 사용자 조회
- `PATCH /users/:id` - 사용자 업데이트
- `DELETE /users/:id` - 사용자 삭제

### Workspaces
- `POST /workspaces` - 워크스페이스 생성
- `GET /workspaces` - 워크스페이스 목록 조회 (페이지네이션)
- `GET /workspaces/:id` - 특정 워크스페이스 조회
- `DELETE /workspaces/:id` - 워크스페이스 삭제

### Tasks
- `POST /tasks` - 태스크 생성
- `GET /tasks` - 태스크 목록 조회 (페이지네이션)
- `GET /tasks/:id` - 특정 태스크 조회
- `PATCH /tasks/:id` - 태스크 업데이트
- `DELETE /tasks/:id` - 태스크 삭제
- `GET /workspaces/:workspaceId/tasks` - 워크스페이스별 태스크 조회

### Task Comments
- `POST /task-comments` - 태스크 댓글 생성
- `GET /task-comments` - 태스크 댓글 목록 조회 (페이지네이션)
- `GET /task-comments/:id` - 특정 태스크 댓글 조회
- `PATCH /task-comments/:id` - 태스크 댓글 업데이트
- `DELETE /task-comments/:id` - 태스크 댓글 삭제

## 기술 스택

- **NestJS** - Node.js 프레임워크
- **TypeScript** - 타입 안전성
- **Drizzle ORM** - 데이터베이스 ORM
- **PostgreSQL** - 데이터베이스
- **Webpack** - 번들러
- **class-validator** - 데이터 유효성 검증
- **class-transformer** - 데이터 변환

## 모노레포 패키지

이 앱은 다음 워크스페이스 패키지들을 사용합니다:

- `@playground/db` - 데이터베이스 스키마 및 연결
- `@playground/models` - 공유 DTO 및 타입
- `@playground/env` - 환경 변수 유효성 검증

## 문제 해결

### 포트가 이미 사용 중인 경우

`.env` 파일의 PORT를 다른 번호로 변경하세요.

### 빌드 오류

```bash
# 의존성 재설치
bun install

# 클린 빌드
rm -rf dist
bun run build
```

## 개발 시 주의사항

- 모든 변경사항은 `develop` 브랜치에서 feature 브랜치를 생성하여 작업하세요
- PR 전에 `bun run lint`를 실행하여 코드 스타일을 확인하세요
- 타입 안전성을 위해 TypeScript strict 모드를 준수하세요

