import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { tasks } from './tasks';
import { workspaces } from './workspaces';

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').unique().notNull(),
  name: text('name'),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  workspaces: many(workspaces),
  tasks: many(tasks),
}));
