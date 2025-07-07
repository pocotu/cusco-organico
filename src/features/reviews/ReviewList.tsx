import type { UserReview } from "@/schemas/review.schema";
import { SimpleGrid, Text } from "@chakra-ui/react";
import { ReviewCard } from "./ReviewCard";

interface Props {
  reviews: UserReview[];
  onEdit?: (review: UserReview) => void;
  onDelete?: (id: number) => void;
}

export const ReviewList = ({ reviews, onEdit, onDelete }: Props) => {
  if (!reviews || reviews.length === 0) {
    return <Text>No has dejado reseñas aún.</Text>;
  }

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </SimpleGrid>
    </>
  );
};
