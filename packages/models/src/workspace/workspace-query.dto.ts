import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { WorkspaceFilterDto } from './workspace-filter.dto';
import { PaginationDto } from '../pagination/pagination.dto';
import { SortDto } from '../sort/sort.dto';

export class WorkspaceQueryDto extends PaginationDto {
  @ValidateNested()
  @IsOptional()
  @Type(() => WorkspaceFilterDto)
  filter?: WorkspaceFilterDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => SortDto)
  sort?: SortDto;
}
