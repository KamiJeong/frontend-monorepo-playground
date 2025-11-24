import 'reflect-metadata';

// User DTOs
export { CreateUserDto } from './src/user/create-user.dto';
export { UpdateUserDto } from './src/user/update-user.dto';
export { UserFilterDto } from './src/user/user-filter.dto';
export { UserQueryDto } from './src/user/user-query.dto';

// Workspace DTOs
export { CreateWorkspaceDto } from './src/workspace/create-workspace.dto';
export { WorkspaceFilterDto } from './src/workspace/workspace-filter.dto';
export { WorkspaceQueryDto } from './src/workspace/workspace-query.dto';

// Workspace Member DTOs
export { CreateWorkspaceMemberDto } from './src/workspace-member/create-workspace-member.dto';
export { WorkspaceMemberFilterDto } from './src/workspace-member/workspace-member-filter.dto';
export { WorkspaceMemberQueryDto } from './src/workspace-member/workspace-member-query.dto';

// Task DTOs
export { CreateTaskDto } from './src/task/create-task.dto';
export { UpdateTaskDto } from './src/task/update-task.dto';
export { TaskFilterDto } from './src/task/task-filter.dto';
export { TaskQueryDto } from './src/task/task-query.dto';

// Task Comment DTOs
export { CreateTaskCommentDto } from './src/task-comment/create-task-comment.dto';
export { UpdateTaskCommentDto } from './src/task-comment/update-task-comment.dto';
export { TaskCommentFilterDto } from './src/task-comment/task-comment-filter.dto';
export { TaskCommentQueryDto } from './src/task-comment/task-comment-query.dto';

// Pagination DTO
export { PaginationDto } from './src/pagination/pagination.dto';

// Sort DTO
export { SortDto, SortItemDto } from './src/sort/sort.dto';

// Filter Utils and Types
export type { FilterType } from './src/filter/filter.type';
export { createFilterClass } from './src/filter/filter.utils';

export {
  createPaginationMeta,
  createPaginationResponse,
  getPaginationOffset,
} from './src/pagination/pagination.util';
export type { PaginationResponse, PaginationMeta } from './src/pagination/pagination.type';

// Enums
export { TaskStatus } from './src/enums/task-status.enum';

// GraphQL Types (re-export from generated types)
export type {
  PaginationInput,
  User,
  Task,
  TaskComment,
  Workspace,
  WorkspaceMember,
  CreateUserInput,
  UpdateUserInput,
  CreateTaskInput,
  UpdateTaskInput,
  CreateTaskCommentInput,
  UpdateTaskCommentInput,
  CreateWorkspaceInput,
  UpdateWorkspaceInput,
  CreateWorkspaceMemberInput,
  Query,
  Mutation,
  Resolvers,
} from './src/graphql/types';

// GraphQL Context
export type { GraphQLContext } from './src/graphql/context';
