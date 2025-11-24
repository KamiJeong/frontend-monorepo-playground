import { IsEnum, IsOptional, IsString } from 'class-validator';

import { TaskStatus } from '../enums/task-status.enum';

export class CreateTaskDto {
  @IsString()
  readonly workspaceId!: string;

  @IsString()
  readonly title!: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  readonly status?: 'todo' | 'in_progress' | 'done';

  @IsString()
  readonly createdBy!: string;
}
