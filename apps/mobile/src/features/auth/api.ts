import { AxiosResponse } from "axios";
import {
  LoginInput,
  SignupInput,
  AuthResponse,
} from "@smart-task-manager/shared";

import { api } from "@/src/api/client";

export function loginRequest(data: LoginInput) {
  return api.post<AuthResponse>("/auth/login", data);
}

export function signupRequest(data: SignupInput) {
  return api.post<AuthResponse>("/auth/signup", data);
}
