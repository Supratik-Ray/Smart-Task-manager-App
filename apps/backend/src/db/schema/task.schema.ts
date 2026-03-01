import {
  index,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { userTable } from "./user.schema.ts";

export const StatusEnum = pgEnum("status_enum", [
  "TODO",
  "IN_PROGRESS",
  "COMPLETED",
]);

export const PriorityEnum = pgEnum("priority_enum", ["LOW", "MEDIUM", "HIGH"]);

export const taskTable = pgTable(
  "tasks",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    description: varchar("description", { length: 500 }),
    status: StatusEnum("status").default("TODO").notNull(),
    priority: PriorityEnum("priority").default("LOW").notNull(),
    dueDate: timestamp("due_date", { withTimezone: true }).notNull(),
    userId: uuid("user_id")
      .references(() => userTable.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index().on(table.userId),
    index().on(table.createdAt),
    index().on(table.status),
  ],
);

export type SelectTask = typeof taskTable.$inferSelect;
export type InsertTask = typeof taskTable.$inferInsert;
