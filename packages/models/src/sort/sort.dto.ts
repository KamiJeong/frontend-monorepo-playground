import { Type } from 'class-transformer';
import { IsArray, IsIn, IsOptional, IsString, ValidateNested } from 'class-validator';

export class SortItemDto {
  @IsString()
  by: string;

  @IsIn(['asc', 'desc'])
  order: 'asc' | 'desc' = 'asc';
}

export class SortDto {
  // 단일 정렬 방식 지원
  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'asc';

  // 배열 정렬 방식 지원
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SortItemDto)
  sorts?: SortItemDto[];
}
