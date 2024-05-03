import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { nanoid } from 'nanoid';
import { z } from 'zod';

export const users = sqliteTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  email: text('email').notNull().unique(),
  password: text('password').notNull()
});

// export type User = typeof users.$inferSelect;
export const User = createSelectSchema(users);
export type User = z.infer<typeof User>;
// export type InsertUser = typeof users.$inferInsert;
export const InsertUser = createInsertSchema(users);
export type InsertUser = z.infer<typeof InsertUser>;
