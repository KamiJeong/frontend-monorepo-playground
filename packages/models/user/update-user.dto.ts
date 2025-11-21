import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsUrl()
  @IsOptional()
  readonly avatarUrl?: string;
}
