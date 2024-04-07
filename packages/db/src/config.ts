import type { Config } from "drizzle-kit";

const connectionString = [
  "postgresql://",
  process.env.DB_USERNAME,
  ":",
  process.env.DB_PASSWORD,
  "@",
  process.env.DB_HOST,
  ":",
  process.env.DB_PORT,
  "/",
  process.env.DB_NAME,
  // '?ssl={"rejectUnauthorized":true}',
  // "?schema=", // <-- // TODO: looks like this is being ignored and everything goes into public schema, https://github.com/drizzle-team/drizzle-orm/issues/1181
  // process.env.DB_SCHEMA,
].join("");

export default {
  schema: "./src/schema",
  driver: "pg",
  dbCredentials: { connectionString },
  // https://stackoverflow.com/questions/77184284/using-drizzle-orm-schemafilter-deletes-the-schema
  // schemaFilter: process.env.DB_SCHEMA,
  tablesFilter: [`${process.env.DB_SCHEMA}_*`],
} satisfies Config;
