import { z } from "zod";

// --- Tipos base ---
export const productSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(1, "El nombre del producto es muy corto")
    .max(100, "El nombre debe tener máximo 100 caracteres"),
  description: z
    .string()
    .max(1000, "La descripción es demasiado larga")
    .optional(),
  price: z
    .number({ invalid_type_error: "El precio debe ser un número" })
    .positive("El precio debe ser mayor a 0"),
  stock: z
    .number({ invalid_type_error: "El stock debe ser un número" })
    .int("El stock debe ser un número entero")
    .min(0, "El stock no puede ser negativo")
    .optional(),
  image_url: z.string().url("Debe ser una URL válida de imagen").optional(),
  created_at: z.string().optional(),
  venture_id: z.number().int().positive(),
  venture_name: z.string(),
});

// --- Para creación (POST) ---
export const createProductSchema = productSchema.omit({
  id: true,
  created_at: true,
  venture_name: true,
});
export type CreateProductDto = z.infer<typeof createProductSchema>;

export const createProductResponseSchema = productSchema.omit({
  created_at: true,
  venture_name: true,
});
export type CreateProductResponse = z.infer<typeof createProductResponseSchema>;

// --- Para actualización (PUT) ---
export const updateProductSchema = createProductSchema.partial();
export type UpdateProductDto = z.infer<typeof updateProductSchema>;

// --- Respuesta ---
export type Product = z.infer<typeof productSchema>;

// ------------------------------------------------------------------------------
export const productFormSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre del producto es muy corto")
    .max(100, "El nombre debe tener máximo 100 caracteres"),
  description: z
    .string()
    .max(1000, "La descripción es demasiado larga")
    .optional(),
  price: z
    .number({ invalid_type_error: "El precio debe ser un número" })
    .positive("El precio debe ser mayor a 0"),
  stock: z
    .number({ invalid_type_error: "El stock debe ser un número" })
    .int("El stock debe ser un número entero")
    .min(0, "El stock no puede ser negativo")
    .optional(),
  image_url: z.string().url("Debe ser una URL válida de imagen").optional(),
});

export type ProductFormData = z.infer<typeof productFormSchema>;
