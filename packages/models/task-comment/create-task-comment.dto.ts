import { IsString } from 'class-validator';

export class CreateTaskCommentDto {
  @IsString()
  readonly taskId!: string;

  @IsString()
  readonly userId!: string;

  @IsString()
  readonly content!: string;
}
