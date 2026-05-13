import { pgTable, uuid, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { organizations } from "./organizations";

export const visibilityEnum = pgEnum(
  "visibility",
  ["PUBLIC", "INTERNAL", "RESTRICTED"]
);

export const knowledgeDocuments = pgTable(
  "knowledge_documents",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    organizationId: uuid("organization_id")
      .references(() => organizations.id)
      .notNull(),

    title: text("title").notNull(),

    content: text("content").notNull(),

    visibility: visibilityEnum("visibility")
      .notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  }
);