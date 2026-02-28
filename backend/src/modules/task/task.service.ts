import { eq } from "drizzle-orm";
import db from "../../config/db.ts";
import { taskTable } from "../../db/schema/task.schema.ts";
import { NotFoundError } from "../../errors/NotFoundError.ts";
import {
  CreateTaskInput,
  UpdateTaskInput,
} from "../../../shared/schemas/task.ts";
import { InternalServerError } from "../../errors/InternalServerError.ts";
import { BadRequestError } from "../../errors/BadRequestError.ts";

export async function getAllTasks(userId: string) {
  const tasks = await db.query.taskTable.findMany({
    where: eq(taskTable.userId, userId),
  });

  return tasks;
}
export async function getTask(taskId: string) {
  const task = await db.query.taskTable.findFirst({
    where: eq(taskTable.id, taskId),
  });

  if (!task) throw new NotFoundError("Task with this id doesn't exist!");

  return task;
}
export async function createTask(data: CreateTaskInput, userId: string) {
  try {
    const [newTask] = await db
      .insert(taskTable)
      .values({ ...data, userId })
      .returning();
    return newTask;
  } catch (error) {
    throw new InternalServerError("Error creating new task!");
  }
}
export async function updateTask(data: UpdateTaskInput, taskId: string) {
  const [updatedTask] = await db
    .update(taskTable)
    .set(data)
    .where(eq(taskTable.id, taskId))
    .returning();

  if (!updatedTask)
    throw new BadRequestError("task with this id doesn't exist");

  return updatedTask;
}
export async function deleteTask(taskId: string) {
  const [deletedTask] = await db
    .delete(taskTable)
    .where(eq(taskTable.id, taskId))
    .returning();

  if (!deletedTask)
    throw new BadRequestError("task with this id doesn't exist");

  return deletedTask;
}
