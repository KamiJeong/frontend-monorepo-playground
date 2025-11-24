import { GraphQLResolveInfo } from 'graphql';
import { GraphQLContext } from './context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateTaskCommentInput = {
  content: Scalars['String']['input'];
  taskId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type CreateTaskInput = {
  createdBy: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<TaskStatus>;
  title: Scalars['String']['input'];
  workspaceId: Scalars['String']['input'];
};

export type CreateUserInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CreateWorkspaceInput = {
  createdBy: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateWorkspaceMemberInput = {
  userId: Scalars['String']['input'];
  workspaceId: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addWorkspaceMember: WorkspaceMember;
  createTask: Task;
  createTaskComment: TaskComment;
  createUser: User;
  createWorkspace: Workspace;
  deleteTask: Scalars['Boolean']['output'];
  deleteTaskComment: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  deleteWorkspace: Scalars['Boolean']['output'];
  removeWorkspaceMember: Scalars['Boolean']['output'];
  updateTask: Task;
  updateTaskComment: TaskComment;
  updateUser: User;
  updateWorkspace: Workspace;
};


export type MutationAddWorkspaceMemberArgs = {
  input: CreateWorkspaceMemberInput;
};


export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};


export type MutationCreateTaskCommentArgs = {
  input: CreateTaskCommentInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCreateWorkspaceArgs = {
  input: CreateWorkspaceInput;
};


export type MutationDeleteTaskArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTaskCommentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteWorkspaceArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveWorkspaceMemberArgs = {
  userId: Scalars['String']['input'];
  workspaceId: Scalars['String']['input'];
};


export type MutationUpdateTaskArgs = {
  id: Scalars['ID']['input'];
  input: UpdateTaskInput;
};


export type MutationUpdateTaskCommentArgs = {
  id: Scalars['ID']['input'];
  input: UpdateTaskCommentInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: UpdateUserInput;
};


export type MutationUpdateWorkspaceArgs = {
  id: Scalars['ID']['input'];
  input: UpdateWorkspaceInput;
};

export type PaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type PaginationMeta = {
  __typename?: 'PaginationMeta';
  hasNext: Scalars['Boolean']['output'];
  hasPrevious: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  task?: Maybe<Task>;
  taskComment?: Maybe<TaskComment>;
  taskComments: Array<TaskComment>;
  tasks: Array<Task>;
  user?: Maybe<User>;
  users: Array<User>;
  workspace?: Maybe<Workspace>;
  workspaceMembers: Array<WorkspaceMember>;
  workspaces: Array<Workspace>;
};


export type QueryTaskArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTaskCommentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTaskCommentsArgs = {
  input?: InputMaybe<PaginationInput>;
  taskId: Scalars['String']['input'];
};


export type QueryTasksArgs = {
  input?: InputMaybe<PaginationInput>;
  workspaceId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  input?: InputMaybe<PaginationInput>;
};


export type QueryWorkspaceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryWorkspaceMembersArgs = {
  input?: InputMaybe<PaginationInput>;
  workspaceId: Scalars['String']['input'];
};


export type QueryWorkspacesArgs = {
  input?: InputMaybe<PaginationInput>;
};

export type Task = {
  __typename?: 'Task';
  comments: Array<TaskComment>;
  createdAt: Scalars['String']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  createdByUser?: Maybe<User>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  status?: Maybe<TaskStatus>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  workspace?: Maybe<Workspace>;
  workspaceId: Scalars['String']['output'];
};

export type TaskComment = {
  __typename?: 'TaskComment';
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  task?: Maybe<Task>;
  taskId: Scalars['String']['output'];
  user?: Maybe<User>;
  userId: Scalars['String']['output'];
};

export enum TaskStatus {
  Done = 'DONE',
  InProgress = 'IN_PROGRESS',
  Todo = 'TODO'
}

export type UpdateTaskCommentInput = {
  content: Scalars['String']['input'];
};

export type UpdateTaskInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<TaskStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateWorkspaceInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  tasks: Array<Task>;
  workspaces: Array<Workspace>;
};

export type Workspace = {
  __typename?: 'Workspace';
  createdAt: Scalars['String']['output'];
  createdBy: Scalars['String']['output'];
  createdByUser?: Maybe<User>;
  id: Scalars['ID']['output'];
  members: Array<WorkspaceMember>;
  name: Scalars['String']['output'];
  tasks: Array<Task>;
};

export type WorkspaceMember = {
  __typename?: 'WorkspaceMember';
  user?: Maybe<User>;
  userId: Scalars['String']['output'];
  workspace?: Maybe<Workspace>;
  workspaceId: Scalars['String']['output'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateTaskCommentInput: CreateTaskCommentInput;
  CreateTaskInput: CreateTaskInput;
  CreateUserInput: CreateUserInput;
  CreateWorkspaceInput: CreateWorkspaceInput;
  CreateWorkspaceMemberInput: CreateWorkspaceMemberInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  PaginationInput: PaginationInput;
  PaginationMeta: ResolverTypeWrapper<PaginationMeta>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Task: ResolverTypeWrapper<Task>;
  TaskComment: ResolverTypeWrapper<TaskComment>;
  TaskStatus: TaskStatus;
  UpdateTaskCommentInput: UpdateTaskCommentInput;
  UpdateTaskInput: UpdateTaskInput;
  UpdateUserInput: UpdateUserInput;
  UpdateWorkspaceInput: UpdateWorkspaceInput;
  User: ResolverTypeWrapper<User>;
  Workspace: ResolverTypeWrapper<Workspace>;
  WorkspaceMember: ResolverTypeWrapper<WorkspaceMember>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  CreateTaskCommentInput: CreateTaskCommentInput;
  CreateTaskInput: CreateTaskInput;
  CreateUserInput: CreateUserInput;
  CreateWorkspaceInput: CreateWorkspaceInput;
  CreateWorkspaceMemberInput: CreateWorkspaceMemberInput;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: Record<PropertyKey, never>;
  PaginationInput: PaginationInput;
  PaginationMeta: PaginationMeta;
  Query: Record<PropertyKey, never>;
  String: Scalars['String']['output'];
  Task: Task;
  TaskComment: TaskComment;
  UpdateTaskCommentInput: UpdateTaskCommentInput;
  UpdateTaskInput: UpdateTaskInput;
  UpdateUserInput: UpdateUserInput;
  UpdateWorkspaceInput: UpdateWorkspaceInput;
  User: User;
  Workspace: Workspace;
  WorkspaceMember: WorkspaceMember;
}>;

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addWorkspaceMember?: Resolver<ResolversTypes['WorkspaceMember'], ParentType, ContextType, RequireFields<MutationAddWorkspaceMemberArgs, 'input'>>;
  createTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationCreateTaskArgs, 'input'>>;
  createTaskComment?: Resolver<ResolversTypes['TaskComment'], ParentType, ContextType, RequireFields<MutationCreateTaskCommentArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  createWorkspace?: Resolver<ResolversTypes['Workspace'], ParentType, ContextType, RequireFields<MutationCreateWorkspaceArgs, 'input'>>;
  deleteTask?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteTaskArgs, 'id'>>;
  deleteTaskComment?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteTaskCommentArgs, 'id'>>;
  deleteUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  deleteWorkspace?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteWorkspaceArgs, 'id'>>;
  removeWorkspaceMember?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemoveWorkspaceMemberArgs, 'userId' | 'workspaceId'>>;
  updateTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationUpdateTaskArgs, 'id' | 'input'>>;
  updateTaskComment?: Resolver<ResolversTypes['TaskComment'], ParentType, ContextType, RequireFields<MutationUpdateTaskCommentArgs, 'id' | 'input'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id' | 'input'>>;
  updateWorkspace?: Resolver<ResolversTypes['Workspace'], ParentType, ContextType, RequireFields<MutationUpdateWorkspaceArgs, 'id' | 'input'>>;
}>;

export type PaginationMetaResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['PaginationMeta'] = ResolversParentTypes['PaginationMeta']> = ResolversObject<{
  hasNext?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPrevious?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  limit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  task?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<QueryTaskArgs, 'id'>>;
  taskComment?: Resolver<Maybe<ResolversTypes['TaskComment']>, ParentType, ContextType, RequireFields<QueryTaskCommentArgs, 'id'>>;
  taskComments?: Resolver<Array<ResolversTypes['TaskComment']>, ParentType, ContextType, RequireFields<QueryTaskCommentsArgs, 'taskId'>>;
  tasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType, Partial<QueryTasksArgs>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryUsersArgs>>;
  workspace?: Resolver<Maybe<ResolversTypes['Workspace']>, ParentType, ContextType, RequireFields<QueryWorkspaceArgs, 'id'>>;
  workspaceMembers?: Resolver<Array<ResolversTypes['WorkspaceMember']>, ParentType, ContextType, RequireFields<QueryWorkspaceMembersArgs, 'workspaceId'>>;
  workspaces?: Resolver<Array<ResolversTypes['Workspace']>, ParentType, ContextType, Partial<QueryWorkspacesArgs>>;
}>;

export type TaskResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = ResolversObject<{
  comments?: Resolver<Array<ResolversTypes['TaskComment']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdByUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['TaskStatus']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  workspace?: Resolver<Maybe<ResolversTypes['Workspace']>, ParentType, ContextType>;
  workspaceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type TaskCommentResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['TaskComment'] = ResolversParentTypes['TaskComment']> = ResolversObject<{
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  task?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType>;
  taskId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  avatarUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>;
  workspaces?: Resolver<Array<ResolversTypes['Workspace']>, ParentType, ContextType>;
}>;

export type WorkspaceResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Workspace'] = ResolversParentTypes['Workspace']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdByUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  members?: Resolver<Array<ResolversTypes['WorkspaceMember']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>;
}>;

export type WorkspaceMemberResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['WorkspaceMember'] = ResolversParentTypes['WorkspaceMember']> = ResolversObject<{
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  workspace?: Resolver<Maybe<ResolversTypes['Workspace']>, ParentType, ContextType>;
  workspaceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type Resolvers<ContextType = GraphQLContext> = ResolversObject<{
  Mutation?: MutationResolvers<ContextType>;
  PaginationMeta?: PaginationMetaResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
  TaskComment?: TaskCommentResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Workspace?: WorkspaceResolvers<ContextType>;
  WorkspaceMember?: WorkspaceMemberResolvers<ContextType>;
}>;

