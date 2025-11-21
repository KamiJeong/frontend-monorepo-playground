import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { CreateTaskCommentDto, PaginationDto, UpdateTaskCommentDto } from '@playground/models';

import { TaskCommentsService } from './task-comments.service';

@Controller('task-comments')
export class TaskCommentsController {
  constructor(private readonly taskCommentsService: TaskCommentsService) {}

  @Post()
  create(@Body() createTaskCommentDto: CreateTaskCommentDto) {
    return this.taskCommentsService.create(createTaskCommentDto);
  }

  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.taskCommentsService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskCommentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskCommentDto: UpdateTaskCommentDto) {
    return this.taskCommentsService.update(id, updateTaskCommentDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.taskCommentsService.delete(id);
  }
}
