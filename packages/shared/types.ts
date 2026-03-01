export type User = {
  id: string;
  name: string;
  email: string;
};

export type Task = {
  id: string;
  name: string;
  title: string;
  description: string;
  dueDate: string;
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  createdAt: string;
};

export type Status = Task["status"];
export type Priority = Task["priority"];

export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};

export type AuthResponse = ApiResponse<{
  user: User;
  token: string;
}>;
export type UserInfoResponse = ApiResponse<User>;
export type AllTasksResponse = ApiResponse<Task[]>;
export type TaskResponse = ApiResponse<Task>;
export type HomeBuckets = ApiResponse<
  {
    title: string;
    data: Task[];
  }[]
>;
