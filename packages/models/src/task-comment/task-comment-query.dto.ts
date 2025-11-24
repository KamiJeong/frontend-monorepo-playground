import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { TaskCommentFilterDto } from './task-comment-filter.dto';
import { PaginationDto } from '../pagination/pagination.dto';
import { SortDto } from '../sort/sort.dto';

export class TaskCommentQueryDto extends PaginationDto {
  @ValidateNested()
  @IsOptional()
  @Type(() => TaskCommentFilterDto)
  filter?: TaskCommentFilterDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => SortDto)
  sort?: SortDto;
}
