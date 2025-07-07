import { z } from "zod";
import { userSchema } from "./user.schema";

/**
 * Login de usuario
 */
export const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

export const authenticatedUserSchema = userSchema.omit({ created_at: true });

/**
 * Respuesta del login
 */
export const loginResponseSchema = z.object({
  message: z.string({
    required_error: "El mensaje de respuesta es obligatorio",
    invalid_type_error: "El mensaje debe ser una cadena de texto",
  }),
  token: z.string({
    required_error: "El token es obligatorio",
    invalid_type_error: "El token debe ser una cadena de texto",
  }),
  user: authenticatedUserSchema,
});

/**
 * Registro de nuevo usuario
 */

const baseRegisterSchema = z.object({
  name: z.string().min(2, "El nombre es muy corto"),
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: z.string(),
});

export const registerSchema = baseRegisterSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  },
);

export const registerResponseSchema = z.object({
  message: z.string({
    required_error: "El mensaje de respuesta es obligatorio",
    invalid_type_error: "El mensaje debe ser una cadena de texto",
  }),
  user: authenticatedUserSchema,
});

/**
 * Tipos inferidos
 */
export type AuthenticatedUser = z.infer<typeof authenticatedUserSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type RegisterData = z.infer<
  ReturnType<typeof baseRegisterSchema.omit<{ confirmPassword: true }>>
>;
export type registerResponse = z.infer<typeof registerResponseSchema>;
