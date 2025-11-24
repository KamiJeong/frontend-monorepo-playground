import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { taskComments } from './task-comments';
import { users } from './users';
import { workspaces } from './workspaces';

export const tasks = pgTable('tasks', {
  id: text('id').primaryKey(),

  workspaceId: text('workspace_id')
    .references(() => workspaces.id, { onDelete: 'cascade' })
    .notNull(),

  title: text('title').notNull(),
  description: text('description'),

  status: text('status').$type<'todo' | 'in_progress' | 'done'>(),

  createdBy: text('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const tasksRelations = relations(tasks, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [tasks.workspaceId],
    references: [workspaces.id],
  }),
  comments: many(taskComments),
  createdByUser: one(users, {
    fields: [tasks.createdBy],
    references: [users.id],
  }),
}));
