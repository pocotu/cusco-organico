import {
  Box,
  Flex,
  Text,
  Image,
  IconButton,
  Heading,
  Stack,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { StarIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import type { UserReview } from "@/schemas/review.schema";

interface Props {
  review: UserReview;
  onEdit?: (review: UserReview) => void;
  onDelete?: (id: number) => void;
}

export const ReviewCard = ({ review, onEdit, onDelete }: Props) => {
  const { id, rating, comment, created_at, product_name, product_image_url } =
    review;

  const bg = useColorModeValue("white", "gray.800");
  const formattedDate = new Date(created_at).toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Box bg={bg} borderRadius="xl" boxShadow="md" p={4} w="full" maxW="lg">
      <Flex gap={4} align="flex-start">
        <Image
          src={product_image_url || "https://via.placeholder.com/80"}
          alt={product_name}
          boxSize="80px"
          objectFit="cover"
          borderRadius="lg"
        />

        <Box flex="1">
          <Flex justify="space-between" align="center">
            <Heading size="sm">{product_name}</Heading>
            <Text fontSize="sm" color="gray.500">
              {formattedDate}
            </Text>
          </Flex>

          <HStack mt={1} spacing={0.5}>
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                color={i < rating ? "yellow.400" : "gray.300"}
                boxSize={4}
              />
            ))}
          </HStack>

          <Text mt={2} fontSize="sm">
            {comment || (
              <Text as="i" color="gray.500">
                Sin comentario
              </Text>
            )}
          </Text>

          <Stack direction="row" mt={3} spacing={2} justify={"end"}>
            {onEdit && (
              <IconButton
                aria-label="Editar reseña"
                icon={<EditIcon />}
                size="sm"
                onClick={() => onEdit(review)}
              />
            )}
            {onDelete && (
              <IconButton
                aria-label="Eliminar reseña"
                icon={<DeleteIcon />}
                size="sm"
                colorScheme="red"
                onClick={() => onDelete(id)}
              />
            )}
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};
