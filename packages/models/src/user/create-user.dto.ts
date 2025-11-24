import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  readonly email!: string;

  @IsString()
  readonly name?: string;

  @IsUrl()
  @IsOptional()
  readonly avatarUrl?: string;
}
