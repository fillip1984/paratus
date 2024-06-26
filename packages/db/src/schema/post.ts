import { sql } from "drizzle-orm";
import { serial, timestamp, varchar } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";

export const post = pgTable("post", {
  id: serial("id").primaryKey(),
  title: varchar("name", { length: 256 }).notNull(),
  content: varchar("content", { length: 256 }).notNull(),
  rating: varchar("rating", { length: 5 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});
