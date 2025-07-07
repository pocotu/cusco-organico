import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  HStack,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewFormSchema, type ReviewFormData } from "@/schemas/review.schema";

interface Props {
  onSubmitReview: (data: ReviewFormData) => void | Promise<void>;
  defaultValues?: Partial<ReviewFormData>;
  isEditing?: boolean;
}

export const ReviewForm = ({
  onSubmitReview,
  defaultValues = { rating: 1, comment: "" },
  isEditing = false,
}: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues,
  });

  const rating = watch("rating");

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmitReview)}
      p={4}
      bg={useColorModeValue("white", "gray.800")}
      rounded="xl"
      shadow="md"
    >
      <FormControl isInvalid={!!errors.rating} mb={4}>
        <FormLabel>Calificación</FormLabel>
        <HStack>
          {[1, 2, 3, 4, 5].map((value) => (
            <IconButton
              key={value}
              icon={<StarIcon />}
              aria-label={`Calificación ${value}`}
              onClick={() => setValue("rating", value)}
              colorScheme={value <= rating ? "yellow" : "gray"}
              variant={value <= rating ? "solid" : "outline"}
              size="sm"
            />
          ))}
        </HStack>
        <FormErrorMessage>{errors.rating?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.comment} mb={4}>
        <FormLabel>Comentario (opcional)</FormLabel>
        <Textarea
          {...register("comment")}
          placeholder="¿Qué te pareció el producto?"
          resize="vertical"
        />
        <FormErrorMessage>{errors.comment?.message}</FormErrorMessage>
      </FormControl>

      <Button
        type="submit"
        colorScheme={isEditing ? "blue" : "green"}
        isLoading={isSubmitting}
        w="full"
      >
        {isEditing ? "Guardar cambios" : "Enviar reseña"}
      </Button>
    </Box>
  );
};
