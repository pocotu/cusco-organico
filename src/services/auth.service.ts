import api from "@/lib/axios";
import {
  loginResponseSchema,
  registerResponseSchema,
  type LoginFormData,
  type LoginResponse,
  type RegisterData,
  type registerResponse,
} from "@/schemas/auth.schema";

export const register = async (
  data: RegisterData,
): Promise<registerResponse> => {
  const response = await api.post("/auth/register", data);

  return registerResponseSchema.parse(response.data);
};

export const login = async (data: LoginFormData): Promise<LoginResponse> => {
  const response = await api.post("/auth/login", data);
  return loginResponseSchema.parse(response.data);
};
