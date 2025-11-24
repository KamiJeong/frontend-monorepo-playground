import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { WorkspaceMemberFilterDto } from './workspace-member-filter.dto';
import { PaginationDto } from '../pagination/pagination.dto';
import { SortDto } from '../sort/sort.dto';

export class WorkspaceMemberQueryDto extends PaginationDto {
  @ValidateNested()
  @IsOptional()
  @Type(() => WorkspaceMemberFilterDto)
  filter?: WorkspaceMemberFilterDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => SortDto)
  sort?: SortDto;
}
