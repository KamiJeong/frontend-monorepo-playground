import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { CreateTaskDto, PaginationDto, UpdateTaskDto } from '@playground/models';

import { TasksService } from './tasks.service';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  /** BY TASKS */

  @Post('/tasks')
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get('/tasks')
  findAll(@Query() pagination: PaginationDto) {
    return this.tasksService.findAll(pagination);
  }

  @Get('/tasks/:id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch('/tasks/:id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete('/tasks/:id')
  delete(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }

  @Get('/workspaces/:workspaceId/tasks')
  findAllByWorkspace(
    @Param('workspaceId') workspaceId: string,
    @Query() pagination: PaginationDto,
  ) {
    return this.tasksService.findAllByWorkspace(workspaceId, pagination);
  }
}
