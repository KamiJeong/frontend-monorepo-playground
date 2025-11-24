import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { PaginationDefault } from '../enums/pagination-default.enum';

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

  get offset(): number {
    return ((this.page ?? PaginationDefault.PAGE) - 1) * (this.limit ?? PaginationDefault.LIMIT);
  }
}
