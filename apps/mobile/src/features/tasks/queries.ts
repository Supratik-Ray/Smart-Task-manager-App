import { useQuery } from "@tanstack/react-query";
import { getAllTasks, getHomeBuckets, getTask, getTasksByDate } from "./api";

export function useAllTasks() {
  return useQuery({
    queryFn: getAllTasks,
    queryKey: ["tasks"],
  });
}

export function useTasksByDate(date: string) {
  return useQuery({
    queryFn: () => getTasksByDate(date),
    queryKey: ["tasks", "date", date],
  });
}

export function useTask(id?: string) {
  return useQuery({
    queryFn: () => getTask(id),
    queryKey: ["task", id],
    enabled: !!id,
  });
}

export function useHomeBuckets() {
  return useQuery({
    queryFn: getHomeBuckets,
    queryKey: ["tasks", "homebuckets"],
  });
}
