import { z } from "zod";

export const createTaskSchema = z.object({
  name: z.string().min(2, "name must be minimum 2 characters long"),
  description: z
    .string()
    .min(5, "description must be minimum 5 characters long")
    .max(30, "description must be maximum 50 characters long")
    .optional(),
  status: z.enum(
    ["TODO", "IN_PROGRESS", "COMPLETED"],
    "status must be either 'TODO','IN-PROGRESS' or 'COMPLETED' ",
  ),
  priority: z.enum(
    ["LOW", "MEDIUM", "HIGH"],
    "priority must be either 'LOW','MEDIUM' or 'HIGH' ",
  ),
  dueDate: z.coerce.date("Its not a valid date object"),
});

export const updateTaskSchema = createTaskSchema.partial();

export const taskIdSchema = z.object({
  id: z.uuid("id is not a valid task id!"),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
