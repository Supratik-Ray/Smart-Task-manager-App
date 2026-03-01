import { relations } from "drizzle-orm";
import { userTable } from "./user.schema.ts";
import { taskTable } from "./task.schema.ts";

export const usersRelations = relations(userTable, ({ many }) => ({
  tasks: many(taskTable),
}));

export const taskRelations = relations(taskTable, ({ one }) => ({
  user: one(userTable, {
    fields: [taskTable.userId],
    references: [userTable.id],
  }),
}));
