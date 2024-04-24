import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const users = sqliteTable('user', {
  id: text('id').notNull().primaryKey(),
  email: text('email').notNull()
});

export const User = createSelectSchema(users);
export type User = z.infer<typeof User>;
export const InsertUser = createInsertSchema(users);
export type InsertUser = z.infer<typeof InsertUser>;
// TODO: or
// export type User = typeof users.$inferSelect;
// export type InsertUser = typeof users.$inferInsert;
