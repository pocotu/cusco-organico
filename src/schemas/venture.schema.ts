import { z } from "zod";

// --- Tipos base ---
export const ventureSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  image_url: z.string().url().optional(),
  producer_id: z.number().int().positive(),
  created_at: z.string(),
  producer_name: z.string(),
});

// --- Para creación (POST) ---
export const createVentureSchema = ventureSchema.omit({
  id: true,
  created_at: true,
  producer_name: true,
});
export type CreateVentureDto = z.infer<typeof createVentureSchema>;

// --- Para actualización (PUT) ---
export const updateVentureSchema = createVentureSchema.partial();
export type UpdateVentureDto = z.infer<typeof updateVentureSchema>;

// --- Respuesta ---
export type Venture = z.infer<typeof ventureSchema>;

// -----------------------------------------------------------------------

export const ventureByProducerSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  description: z.string().nullable(),
  image_url: z.string().url().nullable(),
  producer_id: z.number(),
  created_at: z.string(),
});
export type VentureByProducer = z.infer<typeof ventureByProducerSchema>;

export const venturesByProducerSchema = z.array(ventureByProducerSchema);
export type VenturesByProducer = z.infer<typeof venturesByProducerSchema>;

export const ventureFormDataSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  image_url: z.string().url().optional(),
});
export type VentureFormData = z.infer<typeof ventureFormDataSchema>;

export const ventureResponseSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  description: z.string().nullable(),
  image_url: z.string().url().nullable(),
  producer_id: z.number(),
});
export type VentureResponse = z.infer<typeof ventureResponseSchema>;
