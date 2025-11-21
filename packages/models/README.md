# @playground/models

Shared Data Transfer Objects (DTOs) and models for the playground monorepo.

## Overview

This package contains all shared DTOs used across the monorepo, including:
- User DTOs
- Workspace DTOs
- Workspace Member DTOs
- Task DTOs
- Task Comment DTOs
- Enums (TaskStatus)

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

## Dependencies

- `class-validator`: ^0.14.2 - Validation decorators
- `reflect-metadata`: ^0.2.2 - Metadata reflection

## Development

This package is part of the monorepo and uses TypeScript. All DTOs are written in TypeScript with proper type definitions.

### Project Structure

```
packages/models/
├── enums/
│   └── task-status.enum.ts
├── task/
│   ├── create-task.dto.ts
│   ├── update-task.dto.ts
│   └── delete-task.dto.ts
├── task-comment/
│   ├── create-task-comment.dto.ts
│   ├── update-task-comment.dto.ts
│   └── delete-task-comment.dto.ts
├── user/
│   ├── create-user.dto.ts
│   ├── update-user.dto.ts
│   └── delete-user.dto.ts
├── workspace/
│   ├── create-workspace.dto.ts
│   └── delete-workspace.dto.ts
├── workspace-member/
│   ├── create-workspace-member.dto.ts
│   └── delete-workspace-member.dto.ts
├── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Notes

- All DTOs use `readonly` properties for immutability
- All DTOs use default exports internally but are re-exported as named exports in `index.ts`
- The package uses TypeScript source files directly (no build step required for development)

