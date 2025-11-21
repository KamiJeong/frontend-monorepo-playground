import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';

import { CreateWorkspaceDto, PaginationDto } from '@playground/models';

import { WorkspacesService } from './workspaces.service';

@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Post()
  create(@Body() createWorkspaceDto: CreateWorkspaceDto) {
    return this.workspacesService.create(createWorkspaceDto);
  }

  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.workspacesService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workspacesService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.workspacesService.delete(id);
  }
}
