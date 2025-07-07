import { z } from "zod";

// --- Tipos base ---
export const producerSchema = z.object({
  id: z.number().int().positive(),
  user_id: z.number().int().positive(),
  name: z.string(),
  bio: z.string().optional(),
  location: z.string().max(150).optional(),
  phone: z.string().max(20).optional(),
});

export type Producer = z.infer<typeof producerSchema>;

// --- Para creación (POST) ---
export const createProducerSchema = producerSchema.omit({
  id: true,
  user_id: true,
  name: true,
});
export type CreateProducerDto = z.infer<typeof createProducerSchema>;

// --- Respuesta ---
export const ProducerResponseSchema = producerSchema.omit({
  name: true,
});
export type ProducerResponse = z.infer<typeof ProducerResponseSchema>;

// --- Para actualización (PUT) ---
export const updateProducerSchema = createProducerSchema.partial();
export type UpdateProducerDto = z.infer<typeof updateProducerSchema>;
