import { Request, Response } from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getHomeTaskBuckets,
  getTask,
  updateTask,
} from "./task.service";
import { AuthError } from "../../errors/AuthError";
import { sendResponse } from "../../utils/apiResponse";
import { StatusCodes } from "http-status-codes";

export async function getAllTasksController(req: Request, res: Response) {
  if (!req.user?.id) {
    throw new AuthError("user is unauthenticated");
  }

  const { date } = req.query;

  const tasks = await getAllTasks(req.user.id, date as string | undefined);
  sendResponse({ res, statusCode: StatusCodes.OK, data: tasks });
}
export async function getTaskController(req: Request, res: Response) {
  const taskId = req.params.id as string;
  const task = await getTask(taskId);
  sendResponse({ res, statusCode: StatusCodes.OK, data: task });
}
export async function createTaskController(req: Request, res: Response) {
  if (!req.user?.id) {
    throw new AuthError("user is unauthenticated");
  }
  const data = req.body;
  const createdTask = await createTask(data, req.user.id);
  sendResponse({
    res,
    statusCode: StatusCodes.CREATED,
    message: "Successfully created task!",
    data: createdTask,
  });
}
export async function updateTaskController(req: Request, res: Response) {
  const data = req.body;
  const taskId = req.params.id as string;

  const updatedTask = await updateTask(data, taskId);
  sendResponse({
    res,
    statusCode: StatusCodes.OK,
    message: "Successfully updated task!",
    data: updatedTask,
  });
}
export async function deleteTaskController(req: Request, res: Response) {
  const taskId = req.params.id as string;
  const deletedTask = await deleteTask(taskId);
  sendResponse({
    res,
    statusCode: StatusCodes.OK,
    message: "Successfully deleted task!",
    data: deletedTask,
  });
}

export async function getHomeTaskBucketsController(
  req: Request,
  res: Response,
) {
  const buckets = await getHomeTaskBuckets(req.user?.id!);

  sendResponse({ res, statusCode: 200, data: buckets });
}

// export async function getCalendarSummaryController(
//   req: Request,
//   res: Response,
// ) {
//   const { month, year } = req.query;
// }
