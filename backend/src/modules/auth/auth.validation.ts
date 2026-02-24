import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Its not a valid email"),
  password: z.string(),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  name: z.string().min(2, "name must be minimum 2 characters long"),
  email: z.email("Its not a valid email"),
  password: z.string().min(4, "password must be minimum 4 characters long"),
});

export type SignupInput = z.infer<typeof signupSchema>;
