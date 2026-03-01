import {
  CreateTaskInput,
  AllTasksResponse,
  HomeBuckets,
  TaskResponse,
  UpdateTaskInput,
} from "@smart-task-manager/shared";
import { api } from "@/src/api/client";

export function getAllTasks() {
  return api.get<AllTasksResponse>("/tasks");
}

export function getTasksByDate(date: string) {
  return api.get<AllTasksResponse>(`/tasks?date=${date}`);
}

export function getHomeBuckets() {
  return api.get<HomeBuckets>("/tasks/home-buckets");
}

export async function getTask(id?: string) {
  const res = await api.get<TaskResponse>(`/tasks/${id}`);

  return res;
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
