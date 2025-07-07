import {
  Box,
  Heading,
  useDisclosure,
  useToast,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

import { useAuth } from "@/hooks/useAuth";
import { ReviewList } from "@/features/reviews/ReviewList";
import { ReviewFormModal } from "@/features/reviews/ReviewFormModal";
import {
  useDeleteReviewMutation,
  useMyReviewsQuery,
  useUpdateReviewMutation,
} from "@/hooks/useReviewMutation";
import type { ReviewFormData, UserReview } from "@/schemas/review.schema";

const Reviews = () => {
  const { user } = useAuth();
  const toast = useToast();

  const { data: reviews, isLoading, isError } = useMyReviewsQuery(user?.id);
  const { mutateAsync: updateReview } = useUpdateReviewMutation();
  const { mutateAsync: deleteReview } = useDeleteReviewMutation();

  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();

  const [selectedReview, setSelectedReview] = useState<UserReview | null>(null);

  const handleEdit = (review: UserReview) => {
    setSelectedReview(review);
    openModal();
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteReview(id);
      toast({
        title: "Reseña eliminada",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Error al eliminar",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSubmitReview = async (data: ReviewFormData) => {
    if (!selectedReview) return;
    try {
      const dataReview = {
        ...data,
      };
      await updateReview({ id: selectedReview.id, data: dataReview });
      toast({
        title: "Reseña actualizada",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      closeModal();
      setSelectedReview(null);
    } catch (err) {
      console.log(err);
      toast({
        title: "Error al actualizar",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (isLoading) return <Spinner />;
  if (isError) return <Text>Ocurrió un error al cargar las reseñas.</Text>;

  return (
    <Box>
      <Heading size="md" mb={4}>
        Mis reseñas
      </Heading>

      {reviews && reviews.length > 0 ? (
        <ReviewList
          reviews={reviews}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <Text>No has dejado reseñas aún.</Text>
      )}

      {selectedReview && (
        <ReviewFormModal
          isOpen={isModalOpen}
          onClose={() => {
            closeModal();
            setSelectedReview(null);
          }}
          isEditing
          defaultValues={{
            rating: selectedReview.rating,
            comment: selectedReview.comment ?? "",
          }}
          onSubmitReview={handleSubmitReview}
        />
      )}
    </Box>
  );
};

export default Reviews;
