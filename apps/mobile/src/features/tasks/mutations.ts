import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, deleteTask, updateTask } from "./api";

function useTaskMutation<TVars>(
  mutationFn: (vars: TVars) => Promise<any>,
  successCallback: () => void,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      successCallback();
    },
  });
}

export const useCreateTask = (successCallback: () => void) =>
  useTaskMutation(createTask, successCallback);

export const useUpdateTask = (successCallback: () => void) =>
  useTaskMutation(updateTask, successCallback);

export const useDeleteTask = (successCallback: () => void) =>
  useTaskMutation(deleteTask, successCallback);
