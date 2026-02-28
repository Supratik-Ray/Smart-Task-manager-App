import { useQuery } from "@tanstack/react-query";
import { getAllTasks, getTask } from "./api";

export function useAllTasks() {
  return useQuery({
    queryFn: getAllTasks,
    queryKey: ["tasks"],
  });
}

export function useTask(id: string) {
  return useQuery({
    queryFn: () => getTask(id),
    queryKey: ["task", id],
    enabled: !!id,
  });
}
