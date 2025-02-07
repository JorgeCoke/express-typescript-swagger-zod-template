import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { nanoid } from "nanoid";
import type { z } from "zod";
import { ROLE } from "../../models/enums/role";

export const users = sqliteTable("user", {
	id: text()
		.primaryKey()
		.$defaultFn(() => nanoid()),
	email: text().notNull().unique(),
	password: text().notNull(),
	enabled: integer({ mode: "boolean" }).notNull().default(true),
	role: text({ enum: [ROLE.ADMIN, ROLE.USER] })
		.notNull()
		.default(ROLE.USER),
	createdAt: integer({ mode: "timestamp_ms" })
		.notNull()
		.default(sql`(unixepoch() * 1000)`),
	updatedAt: integer({ mode: "timestamp_ms" })
		.notNull()
		.default(sql`(unixepoch() * 1000)`)
		.$onUpdateFn(() => new Date()),
});

export const User = createSelectSchema(users); // or typeof users.$inferSelect;
export type User = z.infer<typeof User>;
export const InsertUser = createInsertSchema(users); // or typeof users.$inferInsert;
export type InsertUser = z.infer<typeof InsertUser>;
