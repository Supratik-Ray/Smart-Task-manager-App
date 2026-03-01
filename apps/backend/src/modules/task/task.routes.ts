import express from "express";
import {
  createTaskController,
  deleteTaskController,
  getAllTasksController,
  getHomeTaskBucketsController,
  getTaskController,
  updateTaskController,
} from "./task.controller";
import { validate } from "../../middlewares/validation.middleware";
import {
  createTaskSchema,
  taskIdSchema,
  updateTaskSchema,
} from "@smart-task-manager/shared";

const router = express.Router();

router
  .route("/")
  .get(getAllTasksController)
  .post(validate(createTaskSchema, "body"), createTaskController);
router.route("/home-buckets").get(getHomeTaskBucketsController);
router
  .route("/:id")
  .get(validate(taskIdSchema, "params"), getTaskController)
  .patch(validate(updateTaskSchema, "body"), updateTaskController)
  .delete(validate(taskIdSchema, "params"), deleteTaskController);

export default router;
