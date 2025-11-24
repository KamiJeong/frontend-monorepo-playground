# GraphQL 구현 완료 요약

## 완료된 작업

`packages/models` 패키지에 Next.js와 NestJS에서 공유할 수 있는 GraphQL 코드를 성공적으로 구현했습니다.

### 1. 생성된 GraphQL 스키마 파일

각 모델별로 `.graphql` 스키마 파일을 생성했습니다:

- ✅ `user/users.graphql` - User 타입 및 Query/Mutation
- ✅ `workspace/workspaces.graphql` - Workspace 타입 및 Query/Mutation
- ✅ `workspace-member/workspace-members.graphql` - WorkspaceMember 타입 및 Query/Mutation
- ✅ `task/tasks.graphql` - Task 타입, TaskStatus enum, Query/Mutation
- ✅ `task-comment/task-comments.graphql` - TaskComment 타입 및 Query/Mutation

### 2. GraphQL Code Generator 설정

- ✅ `codegen.ts` - GraphQL Code Generator 설정 파일 생성
- ✅ `graphql/context.ts` - GraphQL Context 타입 정의
- ✅ `graphql/types.ts` - 자동 생성된 TypeScript 타입 (Resolvers 포함)
- ✅ `graphql/schema.graphql` - 병합된 전체 스키마 (자동 생성)

### 3. 의존성 설치

```json
{
  "dependencies": {
    "graphql": "^16.12.0"
  },
  "devDependencies": {
    "@graphql-codegen/cli": "^6.1.0",
    "@graphql-codegen/typescript": "^5.0.5",
    "@graphql-codegen/typescript-resolvers": "^5.1.3",
    "@graphql-codegen/schema-ast": "^5.0.0",
    "@graphql-tools/schema": "^10.0.29",
    "@graphql-tools/merge": "^9.1.5"
  }
}
```

### 4. Package.json 업데이트

#### Scripts 추가
- `codegen` - GraphQL 타입 생성
- `prebuild` - 빌드 전 자동으로 codegen 실행

#### Exports 추가
- `./graphql` - GraphQL 타입들
- `./graphql/types` - 생성된 TypeScript 타입
- `./graphql/context` - GraphQL Context 타입
- `./graphql/schema.graphql` - 병합된 스키마
- `./*.graphql` - 개별 스키마 파일들

### 5. Index.ts Export 추가

GraphQL 타입들을 메인 패키지에서 re-export:
- `User`, `Task`, `Workspace`, `TaskComment`, `WorkspaceMember`
- `CreateUserInput`, `UpdateUserInput` 등 모든 Input 타입
- `Query`, `Mutation`, `Resolvers` 타입
- `GraphQLContext`

### 6. README 문서화

GraphQL 사용법을 포함한 상세한 문서 작성:
- GraphQL 타입 import 방법
- NestJS에서 사용하는 방법
- Next.js에서 사용하는 방법
- 타입 재생성 명령어

## 사용 방법

### NestJS (백엔드)

```typescript
// GraphQL 모듈 설정
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['../../../packages/models/**/*.graphql'],
    }),
  ],
})
export class AppModule {}

// Resolver 구현
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import type { User, CreateUserInput, Resolvers } from '@playground/models';

@Resolver('User')
export class UserResolver {
  @Query('users')
  async getUsers(): Promise<User[]> {
    return [];
  }

  @Mutation('createUser')
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return {} as User;
  }
}
```

### Next.js (프론트엔드)

```typescript
// Apollo Client와 함께 사용
import { gql } from '@apollo/client';
import type { User, CreateUserInput } from '@playground/models';

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

function MyComponent() {
  const { data } = useQuery<{ users: User[] }>(GET_USERS);
  // ...
}
```

### GraphQL 타입 재생성

```bash
cd packages/models
bun run codegen
```

## 프로젝트 구조

```
packages/models/
├── graphql/
│   ├── context.ts              # GraphQL context 타입
│   ├── schema.graphql          # 병합된 스키마 (생성됨)
│   └── types.ts                # TypeScript 타입 (생성됨)
├── user/
│   ├── users.graphql           # User 스키마
│   ├── create-user.dto.ts      # REST DTO
│   └── update-user.dto.ts
├── workspace/
│   ├── workspaces.graphql      # Workspace 스키마
│   ├── create-workspace.dto.ts
│   └── update-workspace.dto.ts
├── workspace-member/
│   ├── workspace-members.graphql
│   └── create-workspace-member.dto.ts
├── task/
│   ├── tasks.graphql           # Task 스키마
│   ├── create-task.dto.ts
│   └── update-task.dto.ts
├── task-comment/
│   ├── task-comments.graphql   # TaskComment 스키마
│   ├── create-task-comment.dto.ts
│   └── update-task-comment.dto.ts
├── codegen.ts                  # Code Generator 설정
├── index.ts                    # 메인 export 파일
├── package.json
└── README.md                   # 상세 문서

dist/                           # 빌드된 파일
├── graphql/
│   ├── context.js
│   ├── types.js
│   └── ...
└── ...
```

## 주요 특징

1. **Schema First 방식**: `.graphql` 파일로 스키마를 정의하고 TypeScript 타입을 자동 생성
2. **타입 안정성**: 모든 GraphQL 타입이 TypeScript로 타입 체크됨
3. **모듈화**: 각 도메인별로 스키마 파일 분리
4. **공유 가능**: Next.js와 NestJS 양쪽에서 동일한 타입 사용
5. **자동화**: 빌드 시 자동으로 타입 생성 (`prebuild` script)

## 다음 단계

1. **NestJS API 앱에 GraphQL 모듈 추가**
   - `@nestjs/graphql` 및 `@apollo/server` 설치
   - GraphQL 모듈 설정
   - Resolver 구현

2. **Next.js 앱 생성 및 Apollo Client 설정**
   - Next.js 앱 생성 (`apps/web` 등)
   - Apollo Client 설정
   - GraphQL 쿼리 작성

3. **통합 테스트**
   - E2E 테스트 작성
   - GraphQL Playground 확인

## 참고 사항

- DTO 클래스 (`create-*.dto.ts`, `update-*.dto.ts`)는 REST API 및 class-validator 용으로 유지
- GraphQL Input 타입은 `.graphql` 파일에 정의
- 두 가지 방식을 병행하여 REST API와 GraphQL API를 모두 지원 가능

