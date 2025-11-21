import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { tasks } from './tasks';
import { users } from './users';

export const taskComments = pgTable('task_comments', {
  id: text('id').primaryKey(),

  taskId: text('task_id')
    .references(() => tasks.id)
    .notNull(),

  userId: text('user_id')
    .references(() => users.id)
    .notNull(),

  content: text('content').notNull(),

  createdAt: timestamp('created_at').defaultNow(),
});

export const taskCommentsRelations = relations(taskComments, ({ one }) => ({
  task: one(tasks, {
    fields: [taskComments.taskId],
    references: [tasks.id],
  }),
  user: one(users, {
    fields: [taskComments.userId],
    references: [users.id],
  }),
}));
