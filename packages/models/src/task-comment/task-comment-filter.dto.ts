import { IsOptional, IsString } from 'class-validator';

export class TaskCommentFilterDto {
  @IsString()
  @IsOptional()
  readonly id?: string;

  @IsString()
  @IsString()
  readonly taskId?: string;

  @IsString()
  @IsString()
  readonly userId?: string;

  @IsString()
  @IsString()
  readonly content?: string;
}
