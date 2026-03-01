import { relations } from "drizzle-orm";
import { userTable } from "./user.schema";
import { taskTable } from "./task.schema";

export const usersRelations = relations(userTable, ({ many }) => ({
  tasks: many(taskTable),
}));

export const taskRelations = relations(taskTable, ({ one }) => ({
  user: one(userTable, {
    fields: [taskTable.userId],
    references: [userTable.id],
  }),
}));
