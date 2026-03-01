import { and, eq, gte, lt, ne } from "drizzle-orm";
import db from "../../config/db";
import { SelectTask, taskTable } from "../../db/schema/task.schema";
import { NotFoundError } from "../../errors/NotFoundError";
import { CreateTaskData, UpdateTaskInput } from "@smart-task-manager/shared";
import { InternalServerError } from "../../errors/InternalServerError";
import { BadRequestError } from "../../errors/BadRequestError";

export async function getAllTasks(userId: string, date?: string) {
  let tasks: SelectTask[];
  if (date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    tasks = await db.query.taskTable.findMany({
      where: and(
        eq(taskTable.userId, userId),
        gte(taskTable.dueDate, start),
        lt(taskTable.dueDate, end),
      ),
    });
  } else {
    tasks = await db.query.taskTable.findMany({
      where: eq(taskTable.userId, userId),
    });
  }

  return tasks;
}
export async function getTask(taskId: string) {
  const task = await db.query.taskTable.findFirst({
    where: eq(taskTable.id, taskId),
  });

  if (!task) throw new NotFoundError("Task with this id doesn't exist!");

  return task;
}
export async function createTask(data: CreateTaskData, userId: string) {
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

// export async function getCalendarSummary(
//   userId: string,
//   month: number,
//   year: number,
// ) {
//   const summary = await db.query.taskTable.findMany({
//     where: eq(taskTable.userId, userId),
//   });
// }

export async function getHomeTaskBuckets(userId: string) {
  const now = new Date();

  // Start of today
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );

  // Start of tomorrow
  const startOfTomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
  );

  // Start of foruth day
  const startOfFourthDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 4,
  );

  const overdue = await db.query.taskTable.findMany({
    where: and(
      eq(taskTable.userId, userId),
      lt(taskTable.dueDate, startOfToday),
      ne(taskTable.status, "COMPLETED"),
    ),
    orderBy: (tasks, { asc }) => [asc(tasks.dueDate)],
  });

  const today = await db.query.taskTable.findMany({
    where: and(
      eq(taskTable.userId, userId),
      gte(taskTable.dueDate, startOfToday),
      lt(taskTable.dueDate, startOfTomorrow),
    ),
    orderBy: (tasks, { asc }) => [asc(tasks.dueDate)],
  });

  const upcoming = await db.query.taskTable.findMany({
    where: and(
      eq(taskTable.userId, userId),
      gte(taskTable.dueDate, startOfTomorrow),
      lt(taskTable.dueDate, startOfFourthDay),
      ne(taskTable.status, "COMPLETED"),
    ),
    orderBy: (tasks, { asc }) => [asc(tasks.dueDate)],
  });

  return [
    { title: "Overdue", data: overdue },
    { title: "Today", data: today },
    { title: "Upcoming", data: upcoming },
  ];
}
