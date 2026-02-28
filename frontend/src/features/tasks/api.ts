import {
  CreateTaskInput,
  UpdateTaskInput,
} from "../../../../backend/shared/schemas/task";
import { api } from "@/src/api/client";
import {
  AllTasksResponse,
  TaskResponse,
} from "../../../../backend/shared/types/ApiResponseTypes";

export function getAllTasks() {
  return api.get<AllTasksResponse>("/tasks");
}

export function getTask(id: string) {
  return api.get<TaskResponse>(`/task/${id}`);
}

export function createTask(data: CreateTaskInput) {
  return api.post<TaskResponse>("/tasks", data);
}

export function updateTask({
  id,
  data,
}: {
  id: string;
  data: UpdateTaskInput;
}) {
  return api.patch<TaskResponse>(`/tasks/${id}`, data);
}

export function deleteTask(id: string) {
  return api.delete<TaskResponse>(`/tasks/${id}`);
}
