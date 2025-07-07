import { z } from "zod";

// --- Tipos base ---
export const userSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(100),
  email: z.string().email().max(100),
  is_producer: z.boolean().optional().default(false),
  avatar_url: z.string().url().optional().nullable(),
  created_at: z.string(),
});

// --- Para creación (POST) ---
export const createUserSchema = userSchema
  .omit({
    id: true,
    created_at: true,
  })
  .extend({ password: z.string().min(6).max(100) });

export type CreateUserDto = z.infer<typeof createUserSchema>;

// --- Para actualización (PUT) ---
export const updateUserSchema = createUserSchema.partial();
export type UpdateUserDto = z.infer<typeof updateUserSchema>;

// --- Respuesta ---
export type User = z.infer<typeof userSchema>;
