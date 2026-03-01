import { Task, Priority, Status } from "@smart-task-manager/shared";

type Bucket = {
  title: string;
  data: Task[];
};

type Filters = {
  status: Status | "ALL";
  priority: Priority | "ALL";
};

export function filterBuckets(buckets: Bucket[] | undefined, filters: Filters) {
  if (!buckets?.length) return [];

  const { status, priority } = filters;

  return buckets
    .map((bucket) => {
      let tasks = bucket.data;

      // Always hide completed in Today bucket
      if (bucket.title === "Today") {
        tasks = tasks.filter((t) => t.status !== "COMPLETED");
      }

      // Status filter
      if (status !== "ALL") {
        tasks = tasks.filter((t) => t.status === status);
      }

      // Priority filter
      if (priority !== "ALL") {
        tasks = tasks.filter((t) => t.priority === priority);
      }

      return { ...bucket, data: tasks };
    })
    .filter((bucket) => bucket.data.length > 0);
}
