import {
  Box,
  Button,
  HStack,
  Textarea,
  useToast,
  IconButton,
} from "@chakra-ui/react";
import { StarIcon, DeleteIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} from "@/hooks/useReviewMutation";

const reviewDetailSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(3),
});

type ReviewFormData = z.infer<typeof reviewDetailSchema>;

interface ReviewFormProps {
  productId: number;
  initialData?: {
    id: number;
    rating: number;
    comment: string;
  };
  onSuccess: () => void;
}

export const ReviewDetailForm = ({
  productId,
  initialData,
  onSuccess,
}: ReviewFormProps) => {
  const toast = useToast();
  const { register, handleSubmit, setValue, watch } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewDetailSchema),
    defaultValues: {
      rating: initialData?.rating ?? 0,
      comment: initialData?.comment ?? "",
    },
  });

  const rating = watch("rating");

  const { mutateAsync: createReview } = useCreateReviewMutation();
  const { mutateAsync: updateReview } = useUpdateReviewMutation();
  const { mutateAsync: deleteReview } = useDeleteReviewMutation();

  const handleSave = async (data: ReviewFormData) => {
    try {
      if (initialData) {
        await updateReview({ id: initialData.id, data });
        toast({ title: "Reseña actualizada", status: "success" });
      } else {
        await createReview({
          product_id: productId,
          rating: data.rating,
          comment: data.comment,
        });
        toast({ title: "Reseña creada", status: "success" });
      }
      onSuccess();
    } catch (error) {
      console.log(error);
      toast({ title: "Error al guardar", status: "error" });
    }
  };

  const handleDelete = async () => {
    if (!initialData) return;
    try {
      await deleteReview(initialData.id);
      toast({ title: "Reseña eliminada", status: "info" });
      onSuccess();
    } catch (error) {
      console.log(error);
      toast({ title: "Error al eliminar", status: "error" });
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit(handleSave)}>
      <HStack spacing={1} mb={2}>
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon
            key={i}
            boxSize={6}
            color={i < rating ? "yellow.400" : "gray.300"}
            cursor="pointer"
            onClick={() => setValue("rating", i + 1)}
          />
        ))}
      </HStack>

      <Textarea
        placeholder="Escribe tu comentario..."
        {...register("comment")}
        mb={2}
      />

      <HStack justify="space-between">
        <Button type="submit" colorScheme="green" size="sm">
          {initialData ? "Actualizar" : "Enviar"}
        </Button>
        {initialData && (
          <IconButton
            icon={<DeleteIcon />}
            colorScheme="red"
            aria-label="Eliminar reseña"
            onClick={handleDelete}
            size="sm"
          />
        )}
      </HStack>
    </Box>
  );
};
