import api from "@/lib/axios";
import { z } from "zod";
import {
  averageRatingSchema,
  reviewFormSchema,
  reviewSchema,
  userReviewListSchema,
  type CreateReviewDto,
  type Review,
  type ReviewFormData,
  type ReviewResponse,
  type UserReview,
} from "@/schemas/review.schema";
import { messageSchema, type MessageResponse } from "@/schemas/common.schema";

export const fetchAverageRating = async (productId: number) => {
  const response = await api.get(`/reviews/average/${productId}`);
  return averageRatingSchema.parse(response.data);
};

// -- Reseñas de usuario
export const getUserReviews = async (userId: number): Promise<UserReview[]> => {
  const response = await api.get(`/reviews/user/${userId}`);
  const parsed = userReviewListSchema.safeParse(response.data);

  if (!parsed.success) {
    console.error("Invalid response from /reviews/user/:userId", parsed.error);
    throw new Error("Invalid response format");
  }

  return parsed.data;
};

// Obtener todas las reseñas
export const getAllReviews = async (): Promise<Review[]> => {
  const response = await api.get("/reviews");
  return z.array(reviewSchema).parse(response.data);
};

// Obtener una reseña por ID
export const getReviewById = async (id: number): Promise<Review> => {
  const response = await api.get(`/reviews/${id}`);
  return reviewSchema.parse(response.data);
};

// Crear una nueva reseña
export const createReview = async (
  data: CreateReviewDto,
): Promise<ReviewResponse> => {
  const response = await api.post("/reviews", data);

  return reviewFormSchema.parse(response.data);
};

// Actualizar reseña
export const updateReview = async (
  id: number,
  data: ReviewFormData,
): Promise<MessageResponse> => {
  const response = await api.put(`/reviews/${id}`, data);
  return messageSchema.parse(response.data);
};

// Eliminar reseña
export const deleteReview = async (id: number): Promise<MessageResponse> => {
  const response = await api.delete(`/reviews/${id}`);
  return messageSchema.parse(response.data);
};
