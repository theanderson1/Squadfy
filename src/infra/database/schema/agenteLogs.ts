import {
  pgTable,
  uuid,
  text,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

import { organizations } from "./organizations";

export const agentLogs = pgTable(
  "agent_logs",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    organizationId:
      uuid("organization_id")
        .references(
          () => organizations.id
        )
        .notNull(),

    question:
      text("question")
        .notNull(),

    answer:
      text("answer")
        .notNull(),

    decision:
      text("decision")
        .notNull(),

    contextUsed:
      jsonb("context_used"),

    createdAt:
      timestamp("created_at")
        .defaultNow()
        .notNull(),
  }
);