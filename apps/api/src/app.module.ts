import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { TaskCommentsModule } from './modules/task-comments/task-comments.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { UsersModule } from './modules/users/users.module';
import { WorkspacesModule } from './modules/workspaces/workspaces.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: [
        require.resolve('@playground/models/user/users.graphql'),
        require.resolve('@playground/models/workspace/workspaces.graphql'),
        require.resolve('@playground/models/task/tasks.graphql'),
        require.resolve('@playground/models/task-comment/task-comments.graphql'),
      ],
      playground: true,
      introspection: true,
    }),

    UsersModule,
    WorkspacesModule,
    TasksModule,
    TaskCommentsModule,
  ],
})
export class AppModule {}
