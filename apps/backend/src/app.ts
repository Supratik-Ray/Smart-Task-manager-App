import express, { Request, Response } from "express";
import { errorMiddleware } from "./middlewares/error.middleware";
import AuthRouter from "./modules/auth/auth.routes";
import TaskRouter from "./modules/task/task.routes";
import { requireAuth } from "./middlewares/auth.middleware";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log("LOG:", req.path, req.method);
  next();
});
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/tasks", requireAuth, TaskRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "success" });
});

app.use(errorMiddleware);

export default app;
