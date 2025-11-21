import { IsString } from 'class-validator';

export class CreateWorkspaceDto {
  @IsString()
  readonly name!: string;

  @IsString()
  readonly createdBy!: string;
}
