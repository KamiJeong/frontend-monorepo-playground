import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';

import { CreateWorkspaceMemberDto, PaginationDto } from '@playground/models';

import { WorkspaceMembersService } from './workspace-members.service';

@Controller('workspace-members')
export class WorkspaceMembersController {
  constructor(private readonly workspaceMembersService: WorkspaceMembersService) {}

  @Post()
  create(@Body() createWorkspaceMemberDto: CreateWorkspaceMemberDto) {
    return this.workspaceMembersService.create(createWorkspaceMemberDto);
  }

  @Get(':workspaceId')
  findAll(@Param('workspaceId') workspaceId: string, @Query() pagination: PaginationDto) {
    return this.workspaceMembersService.findAll(workspaceId, pagination);
  }

  @Get(':workspaceId/:userId')
  findOne(@Param('workspaceId') workspaceId: string, @Param('userId') userId: string) {
    return this.workspaceMembersService.findOne(workspaceId, userId);
  }

  @Delete(':workspaceId/:userId')
  delete(@Param('workspaceId') workspaceId: string, @Param('userId') userId: string) {
    return this.workspaceMembersService.delete(workspaceId, userId);
  }
}
