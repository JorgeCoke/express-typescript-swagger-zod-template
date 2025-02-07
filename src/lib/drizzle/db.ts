import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { env } from "../env";
import { users } from "./schemas/users";

const connection = new Database(`db.${env.NODE_ENV}.sqlite`);
const db = drizzle(connection, {
	logger: env.NODE_ENV === "development",
	schema: { users },
});

export { connection, db };
