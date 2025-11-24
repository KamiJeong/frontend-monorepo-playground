import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { TaskFilterDto } from './task-filter.dto';
import { PaginationDto } from '../pagination/pagination.dto';
import { SortDto } from '../sort/sort.dto';

export class TaskQueryDto extends PaginationDto {
  @ValidateNested()
  @IsOptional()
  @Type(() => TaskFilterDto)
  filter?: TaskFilterDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => SortDto)
  sort?: SortDto;
}
