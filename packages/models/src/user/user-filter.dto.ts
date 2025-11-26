import { IsOptional, IsString } from 'class-validator';

export class UserFilterDto {
  @IsOptional()
  @IsString()
  readonly email?: string;

  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly id?: string;
}
