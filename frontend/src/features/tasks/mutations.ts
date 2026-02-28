import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, deleteTask, updateTask } from "./api";

function useTaskMutation<TVars>(mutationFn: (vars: TVars) => Promise<any>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export const useCreateTask = () => useTaskMutation(createTask);

export const useUpdateTask = () => useTaskMutation(updateTask);

export const useDeleteTask = () => useTaskMutation(deleteTask);
