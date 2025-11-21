import { Module } from '@nestjs/common';

import { TaskCommentsModule } from './modules/task-comments/task-comments.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { UsersModule } from './modules/users/users.module';
import { WorkspacesModule } from './modules/workspaces/workspaces.module';

@Module({
  imports: [UsersModule, WorkspacesModule, TasksModule, TaskCommentsModule],
})
export class AppModule {}
