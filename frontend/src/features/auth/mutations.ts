import { useAuth } from "@/src/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { loginRequest, signupRequest } from "./api";
import { Toast } from "toastify-react-native";

export function useLogin() {
  const { login } = useAuth();
  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (res) => {
      const { token, user } = res.data.data;
      login(token, user);
      if (res.data.message) {
        Toast.success(res.data.message);
      }
    },
  });
}

export function useSignup() {
  const { login } = useAuth();
  return useMutation({
    mutationFn: signupRequest,
    onSuccess: (res) => {
      const { token, user } = res.data.data;
      login(token, user);
      if (res.data.message) {
        Toast.success(res.data.message);
      }
    },
  });
}
