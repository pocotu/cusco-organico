import { z } from "zod";

// --- Tipos base ---
export const reviewSchema = z.object({
  id: z.number(),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
  created_at: z.string(),
  product_id: z.number(),
  product_name: z.string(),
  user_id: z.number(),
  user_name: z.string(),
});

// --- Para creación (POST) ---
export const createReviewSchema = reviewSchema.omit({
  id: true,
  created_at: true,
  product_name: true,
  user_name: true,
  user_id: true,
});
export type CreateReviewDto = z.infer<typeof createReviewSchema>;

// --- Para actualización (PUT) ---
export const updateReviewSchema = createReviewSchema.partial();
export type UpdateReviewDto = z.infer<typeof updateReviewSchema>;

// --- Respuesta ---
export type Review = z.infer<typeof reviewSchema>;

// -- Dashboard Profile
export const userReviewWithProductSchema = z.object({
  id: z.number(),
  rating: z.number().min(1).max(5),
  comment: z.string().nullable(),
  created_at: z.string(),
  product_id: z.number(),
  product_name: z.string(),
  product_image_url: z.string().nullable(),
});

export const userReviewListSchema = z.array(userReviewWithProductSchema);

export type UserReview = z.infer<typeof userReviewWithProductSchema>;

export const reviewFormSchema = z.object({
  rating: z
    .number({ invalid_type_error: "La calificación debe ser un número" })
    .min(1, "La calificación mínima es 1")
    .max(5, "La calificación máxima es 5"),
  comment: z.string().optional(),
});

export type ReviewFormData = z.infer<typeof reviewFormSchema>;

export const reviewResponseSchema = z.object({
  id: z.number(),
  product_id: z.number(),
  user_id: z.number(),
  rating: z.number().min(1).max(5),
  comment: z.string().nullable(),
});

export type ReviewResponse = z.infer<typeof reviewFormSchema>;

export const averageRatingSchema = z.object({
  average: z.number().min(0).max(5),
});

export type AverageRating = z.infer<typeof averageRatingSchema>;
