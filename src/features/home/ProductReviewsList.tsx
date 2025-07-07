import {
  Button,
  Divider,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ReviewCard } from "./ReviewCard";
import type { ReviewDetail } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { ReviewDetailForm } from "./ReviewDetailForm";
import { useNavigate } from "react-router-dom";

interface ProductReviewsListProps {
  reviews: ReviewDetail[];
  productId: number;
}

export const ProductReviewsList = ({
  reviews,
  productId,
}: ProductReviewsListProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);

  const userReview = user
    ? reviews.find((r) => r.user_id === user.id)
    : undefined;
  const otherReviews = user
    ? reviews.filter((r) => r.user_id !== user.id)
    : reviews;

  const hasUserReview = !!userReview;
  const hasOtherReviews = otherReviews.length > 0;

  const handleWriteReviewClick = () => {
    if (!user) {
      navigate("/login");
    }
  };

  return (
    <VStack align="stretch" spacing={4} mt={6}>
      <Heading size="md" mb={4}>
        Reseñas del producto
      </Heading>
      <Divider />

      {/* Reseña del usuario autenticado */}
      {user && hasUserReview ? (
        <>
          <ReviewCard review={userReview} />
          <Button size="sm" onClick={() => setEditing((e) => !e)}>
            {editing ? "Cancelar edición" : "Editar reseña"}
          </Button>
          {editing && (
            <ReviewDetailForm
              productId={productId}
              initialData={userReview}
              onSuccess={() => setEditing(false)}
            />
          )}
        </>
      ) : user ? (
        // Usuario autenticado pero no ha dejado reseña
        <ReviewDetailForm productId={productId} onSuccess={() => null} />
      ) : (
        // Usuario no autenticado
        <Button size="sm" colorScheme="blue" onClick={handleWriteReviewClick}>
          Inicia sesión para dejar una reseña
        </Button>
      )}

      <Divider />

      {/* Otras reseñas */}
      {hasOtherReviews ? (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {otherReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </SimpleGrid>
      ) : hasUserReview ? (
        <Text color="gray.500">
          Aún no hay reseñas de otros usuarios para este producto.
        </Text>
      ) : (
        <Text color="gray.500">
          Este producto aún no tiene ninguna reseña. Sé el primero en opinar.
        </Text>
      )}
    </VStack>
  );
};
