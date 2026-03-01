import { SelectTask } from "../db/schema/task.schema";

export type TaskStatus = SelectTask["status"];
export type TaskPriority = SelectTask["priority"];
