import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Image,
  Text,
  Box,
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, StarIcon } from "@chakra-ui/icons";
import type { UserReview } from "@/schemas/review.schema";

interface Props {
  reviews: UserReview[];
  onEdit?: (review: UserReview) => void;
  onDelete?: (id: number) => void;
}

export const ReviewTable = ({ reviews, onEdit, onDelete }: Props) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (isMobile) {
    return (
      <Box>
        {reviews.map((review) => (
          <Box
            key={review.id}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            mb={4}
            shadow="sm"
          >
            <HStack align="start" spacing={4}>
              <Image
                src={
                  review.product_image_url || "https://via.placeholder.com/60"
                }
                alt={review.product_name}
                boxSize="60px"
                objectFit="cover"
                borderRadius="md"
              />

              <Box flex="1">
                <Text fontWeight="bold">{review.product_name}</Text>

                <HStack spacing={0.5} mt={1}>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      boxSize={4}
                      color={i < review.rating ? "yellow.400" : "gray.300"}
                    />
                  ))}
                </HStack>

                <Text mt={2} fontSize="sm">
                  {review.comment || <i>Sin comentario</i>}
                </Text>

                <HStack mt={3} spacing={2}>
                  {onEdit && (
                    <IconButton
                      aria-label="Editar"
                      icon={<EditIcon />}
                      size="sm"
                      onClick={() => onEdit(review)}
                    />
                  )}
                  {onDelete && (
                    <IconButton
                      aria-label="Eliminar"
                      icon={<DeleteIcon />}
                      size="sm"
                      colorScheme="red"
                      onClick={() => onDelete(review.id)}
                    />
                  )}
                </HStack>
              </Box>
            </HStack>
          </Box>
        ))}
      </Box>
    );
  }

  // Vista de escritorio (tabla)
  return (
    <Table variant="simple" size="md">
      <Thead>
        <Tr>
          <Th>Producto</Th>
          <Th>Comentario</Th>
          <Th>Puntuación</Th>
          <Th>Acciones</Th>
        </Tr>
      </Thead>
      <Tbody>
        {reviews.map((review) => (
          <Tr key={review.id}>
            <Td>
              <HStack>
                <Image
                  src={
                    review.product_image_url || "https://via.placeholder.com/40"
                  }
                  alt={review.product_name}
                  boxSize="40px"
                  objectFit="cover"
                  borderRadius="md"
                />
                <Text>{review.product_name}</Text>
              </HStack>
            </Td>
            <Td>{review.comment || <i>Sin comentario</i>}</Td>
            <Td>
              <HStack spacing={0.5}>
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    boxSize={4}
                    color={i < review.rating ? "yellow.400" : "gray.300"}
                  />
                ))}
              </HStack>
            </Td>
            <Td>
              <HStack spacing={2}>
                {onEdit && (
                  <IconButton
                    aria-label="Editar"
                    icon={<EditIcon />}
                    size="sm"
                    onClick={() => onEdit(review)}
                  />
                )}
                {onDelete && (
                  <IconButton
                    aria-label="Eliminar"
                    icon={<DeleteIcon />}
                    size="sm"
                    colorScheme="red"
                    onClick={() => onDelete(review.id)}
                  />
                )}
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
