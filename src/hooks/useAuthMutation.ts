import { useMutation } from "@tanstack/react-query";
import type { LoginFormData, RegisterData } from "@/schemas/auth.schema";
import { login, register } from "@/services/auth.service";

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (data: RegisterData) => register(data),
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: LoginFormData) => login(data),
  });
};
