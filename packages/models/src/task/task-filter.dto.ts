import { IsEnum, IsOptional, IsString } from 'class-validator';

import { TaskStatus } from '../enums/task-status.enum';

export class TaskFilterDto {
  @IsOptional()
  @IsString()
  readonly id?: string;

  @IsOptional()
  @IsString()
  readonly workspaceId?: string;

  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  readonly status?: 'todo' | 'in_progress' | 'done';

  @IsOptional()
  @IsString()
  readonly createdBy?: string;
}
