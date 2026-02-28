import { useMutation } from "@tanstack/react-query";
import { createTask, deleteTask, updateTask } from "./api";

export function useCreateTask() {
  return useMutation({
    mutationFn: createTask,
  });
}

export function useUpdateTask() {
  return useMutation({
    mutationFn: updateTask,
  });
}

export function useDeleteTask() {
  return useMutation({
    mutationFn: deleteTask,
  });
}
