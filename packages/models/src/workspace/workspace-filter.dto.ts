import { IsOptional, IsString } from 'class-validator';

export class WorkspaceFilterDto {
  @IsString()
  @IsOptional()
  readonly id?: string;

  @IsString()
  @IsString()
  readonly name?: string;

  @IsString()
  @IsString()
  readonly createdBy?: string;
}
