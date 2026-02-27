import { SelectTask } from "../db/schema/task.schema.ts";

export type TaskStatus = SelectTask["status"];
export type TaskPriority = SelectTask["priority"];
