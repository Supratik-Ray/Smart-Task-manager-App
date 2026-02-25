import express, { Request, Response } from "express";
import { errorMiddleware } from "./middlewares/error.middleware.ts";
import AuthRouter from "./modules/auth/auth.routes.ts";
import TaskRouter from "./modules/task/task.routes.ts";
import { requireAuth } from "./middlewares/auth.middleware.ts";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/tasks", requireAuth, TaskRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "success" });
});

app.use(errorMiddleware);

export default app;
