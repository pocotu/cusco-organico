import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createReview,
  updateReview,
  deleteReview,
  getAllReviews,
  getReviewById,
  getUserReviews,
  fetchAverageRating,
} from "@/services/review.service";
import type { AverageRating, ReviewFormData } from "@/schemas/review.schema";

export const useAverageRating = (productId: number) => {
  return useQuery<AverageRating>({
    queryKey: ["averageRating", productId],
    queryFn: () => fetchAverageRating(productId),
    enabled: !!productId,
  });
};

export const useMyReviewsQuery = (id?: number) => {
  return useQuery({
    queryKey: ["reviews", id],
    queryFn: () => getUserReviews(id!),
    enabled: !!id,
  });
};

export const useAllReviews = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: getAllReviews,
  });
};

export const useReviewById = (id: number) => {
  return useQuery({
    queryKey: ["review", id],
    queryFn: () => getReviewById(id),
    enabled: !!id,
  });
};

export const useCreateReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["productDetails"] });
    },
  });
};

export const useUpdateReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ReviewFormData }) =>
      updateReview(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["reviews", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["productDetails"] });
    },
  });
};

export const useDeleteReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["productDetails"] });
    },
  });
};
