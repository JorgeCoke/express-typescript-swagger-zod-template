import { defineConfig } from "drizzle-kit";
import { env } from "./src/lib/env";

export default defineConfig({
	out: "./src/lib/db/migrations",
	schema: "./src/lib/db/schemas/*",
	dialect: "sqlite",
	dbCredentials: {
		url: `db.${env.NODE_ENV}.sqlite`,
	},
});
