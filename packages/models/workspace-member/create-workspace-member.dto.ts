import { IsString } from 'class-validator';

export class CreateWorkspaceMemberDto {
  @IsString()
  readonly workspaceId!: string;

  @IsString()
  readonly userId!: string;
}
