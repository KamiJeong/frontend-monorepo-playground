import { IsString } from 'class-validator';

export class UpdateTaskCommentDto {
  @IsString()
  readonly content!: string;
}
