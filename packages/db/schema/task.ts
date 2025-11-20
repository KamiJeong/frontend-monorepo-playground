import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { user } from './user';
import { workspace } from './workspace';

export const task = pgTable('task', {
  id: text('id').primaryKey(),

  workspaceId: text('workspace_id')
    .references(() => workspace.id, { onDelete: 'cascade' })
    .notNull(),

  title: text('title').notNull(),
  description: text('description'),

  status: text('status').$type<'todo' | 'in_progress' | 'done'>(),

  createdBy: text('created_by').references(() => user.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const taskComment = pgTable('task_comment', {
  id: text('id').primaryKey(),

  taskId: text('task_id')
    .references(() => task.id)
    .notNull(),

  userId: text('user_id')
    .references(() => user.id)
    .notNull(),

  content: text('content').notNull(),

  createdAt: timestamp('created_at').defaultNow(),
});
