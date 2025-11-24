import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { UserFilterDto } from './user-filter.dto';
import { PaginationDto } from '../pagination/pagination.dto';
import { SortDto } from '../sort/sort.dto';

export class UserQueryDto extends PaginationDto {
  @ValidateNested()
  @IsOptional()
  @Type(() => UserFilterDto)
  filter?: UserFilterDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => SortDto)
  sort?: SortDto;
}
