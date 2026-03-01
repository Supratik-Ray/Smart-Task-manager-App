"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskIdSchema = exports.updateTaskSchema = exports.createTaskSchema = void 0;
const zod_1 = require("zod");
exports.createTaskSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "name must be minimum 2 characters long"),
    description: zod_1.z
        .string()
        .min(5, "description must be minimum 5 characters long")
        .max(30, "description must be maximum 50 characters long")
        .optional(),
    status: zod_1.z.enum(["TODO", "IN_PROGRESS", "COMPLETED"], "status must be either 'TODO','IN-PROGRESS' or 'COMPLETED' "),
    priority: zod_1.z.enum(["LOW", "MEDIUM", "HIGH"], "priority must be either 'LOW','MEDIUM' or 'HIGH' "),
    dueDate: zod_1.z.coerce.date("Its not a valid date object"),
});
exports.updateTaskSchema = exports.createTaskSchema.partial();
exports.taskIdSchema = zod_1.z.object({
    id: zod_1.z.uuid("id is not a valid task id!"),
});
