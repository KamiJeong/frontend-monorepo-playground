import { IsOptional, IsString } from 'class-validator';

export class WorkspaceMemberFilterDto {
  @IsString()
  @IsOptional()
  readonly id?: string;

  @IsString()
  @IsString()
  readonly workspaceId?: string;

  @IsString()
  @IsString()
  readonly userId?: string;
}
