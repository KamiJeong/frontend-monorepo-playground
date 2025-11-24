# @playground/models

Shared Data Transfer Objects (DTOs), GraphQL types, and models for the playground monorepo.

## Overview

This package contains all shared DTOs and GraphQL schemas used across the monorepo, including:
- User DTOs & GraphQL Types
- Workspace DTOs & GraphQL Types
- Workspace Member DTOs & GraphQL Types
- Task DTOs & GraphQL Types
- Task Comment DTOs & GraphQL Types
- Enums (TaskStatus)
- GraphQL Type Definitions & Generated TypeScript Types

## Installation

This package is already installed as a workspace dependency. No additional installation needed.

## Usage

### Import DTOs

```typescript
import {
  CreateUserDto,
  UpdateUserDto,
  DeleteUserDto,
  CreateWorkspaceDto,
  DeleteWorkspaceDto,
  CreateWorkspaceMemberDto,
  DeleteWorkspaceMemberDto,
  CreateTaskDto,
  UpdateTaskDto,
  DeleteTaskDto,
  CreateTaskCommentDto,
  UpdateTaskCommentDto,
  DeleteTaskCommentDto,
  TaskStatus,
} from '@playground/models';
```

### Example Usage in NestJS Controller

```typescript
import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '@playground/models';

@Controller('users')
export class UsersController {
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // createUserDto is automatically validated with class-validator
    return { message: 'User created', data: createUserDto };
  }
}
```

## Available DTOs

### User DTOs

- **CreateUserDto**: Create a new user
  - `email` (string, required): User email
  - `name` (string, optional): User name
  - `avatarUrl` (string, optional): User avatar URL

- **UpdateUserDto**: Update an existing user
  - `id` (string, required): User ID
  - `name` (string, optional): User name
  - `avatarUrl` (string, optional): User avatar URL

- **DeleteUserDto**: Delete a user
  - `id` (string, required): User ID

### Workspace DTOs

- **CreateWorkspaceDto**: Create a new workspace
  - `name` (string, required): Workspace name
  - `createdBy` (string, required): Creator user ID

- **DeleteWorkspaceDto**: Delete a workspace
  - `id` (string, required): Workspace ID

### Workspace Member DTOs

- **CreateWorkspaceMemberDto**: Add a member to workspace
  - `workspaceId` (string, required): Workspace ID
  - `userId` (string, required): User ID

- **DeleteWorkspaceMemberDto**: Remove a member from workspace
  - `workspaceId` (string, required): Workspace ID
  - `userId` (string, required): User ID

### Task DTOs

- **CreateTaskDto**: Create a new task
  - `workspaceId` (string, required): Workspace ID
  - `title` (string, required): Task title
  - `description` (string, optional): Task description
  - `status` (TaskStatus, optional): Task status
  - `createdBy` (string, required): Creator user ID

- **UpdateTaskDto**: Update an existing task
  - `id` (string, required): Task ID
  - `title` (string, optional): Task title
  - `description` (string, optional): Task description
  - `status` (TaskStatus, optional): Task status

- **DeleteTaskDto**: Delete a task
  - `id` (string, required): Task ID

### Task Comment DTOs

- **CreateTaskCommentDto**: Create a new task comment
  - `taskId` (string, required): Task ID
  - `userId` (string, required): User ID
  - `content` (string, required): Comment content

- **UpdateTaskCommentDto**: Update an existing task comment
  - `id` (string, required): Comment ID
  - `content` (string, required): Comment content

- **DeleteTaskCommentDto**: Delete a task comment
  - `id` (string, required): Comment ID

### Enums

- **TaskStatus**: Task status enum
  - `TODO`: "TODO"
  - `IN_PROGRESS`: "IN_PROGRESS"
  - `DONE`: "DONE"

## Validation

All DTOs use `class-validator` decorators for automatic validation. To enable validation in NestJS:

```typescript
// main.ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation globally
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.listen(3000);
}
bootstrap();
```

## GraphQL Usage

This package includes GraphQL schema definitions and automatically generated TypeScript types.

### Import GraphQL Types

```typescript
// Import generated GraphQL types
import type {
  User,
  Task,
  Workspace,
  CreateUserInput,
  UpdateUserInput,
  Resolvers,
  GraphQLContext,
} from '@playground/models';

// Or import from graphql/types directly
import type { User, Resolvers } from '@playground/models/graphql/types';
import type { GraphQLContext } from '@playground/models/graphql/context';
```

### Import GraphQL Schema Files

```typescript
// In NestJS GraphQL Module
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: [
        // Import all .graphql schema files
        join(__dirname, '../../../packages/models/**/*.graphql'),
      ],
      // Or use the merged schema
      // typePaths: [join(__dirname, '../../../packages/models/graphql/schema.graphql')],
    }),
  ],
})
export class AppModule {}
```

### Using GraphQL Types in Resolvers (NestJS)

```typescript
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import type { User, CreateUserInput, Resolvers } from '@playground/models';

@Resolver('User')
export class UserResolver {
  @Query('users')
  async getUsers(): Promise<User[]> {
    // Your logic here
    return [];
  }

  @Query('user')
  async getUser(@Args('id') id: string): Promise<User | null> {
    // Your logic here
    return null;
  }

  @Mutation('createUser')
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    // Your logic here
    return {} as User;
  }
}
```

### Using GraphQL Types in Next.js (Client)

```typescript
// In your Next.js app with Apollo Client or urql
import { gql } from '@apollo/client';
import type { User, CreateUserInput } from '@playground/models';

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      avatarUrl
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
    }
  }
`;

// TypeScript will validate the types
function MyComponent() {
  const { data } = useQuery<{ users: User[] }>(GET_USERS);
  const [createUser] = useMutation<{ createUser: User }, { input: CreateUserInput }>(CREATE_USER);

  // ...
}
```

### Available GraphQL Schemas

- `user/users.graphql` - User types and operations
- `workspace/workspaces.graphql` - Workspace types and operations
- `workspace-member/workspace-members.graphql` - Workspace member operations
- `task/tasks.graphql` - Task types and operations
- `task-comment/task-comments.graphql` - Task comment types and operations
- `graphql/schema.graphql` - Merged schema (auto-generated)

### Regenerate GraphQL Types

To regenerate TypeScript types from GraphQL schemas:

```bash
cd packages/models
bun run codegen
```

This will update `graphql/types.ts` and `graphql/schema.graphql`.

## Dependencies

- `class-validator`: ^0.14.2 - Validation decorators
- `class-transformer`: ^0.5.1 - Object transformation
- `reflect-metadata`: ^0.2.2 - Metadata reflection
- `graphql`: ^16.12.0 - GraphQL implementation
- `@graphql-codegen/cli`: ^6.1.0 - GraphQL Code Generator (dev)
- `@graphql-codegen/typescript`: ^5.0.5 - TypeScript types generator (dev)
- `@graphql-codegen/typescript-resolvers`: ^5.1.3 - Resolver types generator (dev)
- `@graphql-tools/schema`: ^10.0.29 - GraphQL schema tools
- `@graphql-tools/merge`: ^9.1.5 - Schema merging utilities

## Development

This package is part of the monorepo and uses TypeScript. All DTOs are written in TypeScript with proper type definitions.

### Project Structure

```
packages/models/
├── enums/
│   └── task-status.enum.ts
├── graphql/
│   ├── context.ts              # GraphQL context type
│   ├── schema.graphql          # Merged GraphQL schema (generated)
│   └── types.ts                # Generated TypeScript types
├── task/
│   ├── create-task.dto.ts
│   ├── update-task.dto.ts
│   └── tasks.graphql           # Task GraphQL schema
├── task-comment/
│   ├── create-task-comment.dto.ts
│   ├── update-task-comment.dto.ts
│   └── task-comments.graphql  # Task Comment GraphQL schema
├── user/
│   ├── create-user.dto.ts
│   ├── update-user.dto.ts
│   └── users.graphql           # User GraphQL schema
├── workspace/
│   ├── create-workspace.dto.ts
│   ├── update-workspace.dto.ts
│   └── workspaces.graphql      # Workspace GraphQL schema
├── workspace-member/
│   ├── create-workspace-member.dto.ts
│   └── workspace-members.graphql # Workspace Member GraphQL schema
├── codegen.ts                  # GraphQL Code Generator config
├── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Notes

- All DTOs use `readonly` properties for immutability
- All DTOs use default exports internally but are re-exported as named exports in `index.ts`
- The package uses TypeScript source files directly (no build step required for development)

