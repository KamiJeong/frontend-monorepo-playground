import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { PaginationDefault, PaginationDirection } from '../enums/pagination-default.enum';

export class PaginationDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page: number = PaginationDefault.PAGE;

  @Type(() => Number)
  @IsInt()
  @Max(100)
  @IsOptional()
  limit: number = PaginationDefault.LIMIT;

  @Type(() => String)
  @IsString()
  @IsOptional()
  cursor?: string;

  @IsEnum(PaginationDirection)
  @IsOptional()
  direction?: string = PaginationDefault.DIRECTION;

  get offset(): number {
    return ((this.page ?? PaginationDefault.PAGE) - 1) * (this.limit ?? PaginationDefault.LIMIT);
  }
}
