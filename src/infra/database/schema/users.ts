import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { organizations } from "./organizations";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  organizationId: uuid("organization_id")
    .references(() => organizations.id)
    .notNull(),

  name: text("name").notNull(),

  email: text("email").unique().notNull(),

  password: text("password").notNull(),

  role: text("role").notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});