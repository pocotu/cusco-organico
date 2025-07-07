import {
  Box,
  Image,
  Text,
  Stack,
  Heading,
  HStack,
  Icon,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import type { Product } from "@/schemas/product.schema";
import { Edit, Trash2 } from "lucide-react";
import { useAverageRating } from "@/hooks/useReviewMutation";

interface Props {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (id: number) => void;
}

export const ProductCard = ({ product, onEdit, onDelete }: Props) => {
  const { data, isPending } = useAverageRating(product.id);
  const averageRating = data?.average;

  const roundedRating = averageRating ? Math.round(averageRating) : 0;

  return (
    <Box
      borderWidth="1px"
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="md"
      _hover={{ boxShadow: "xl" }}
      bg="white"
      maxW={"xl"}
      w="100%"
      h="100%"
      display="flex"
      flexDirection="column"
    >
      {product.image_url && (
        <Image
          src={product.image_url}
          alt={product.name}
          objectFit="cover"
          w="100%"
          h="200px"
        />
      )}

      <Flex direction="column" flex="1" p={4} justify="space-between">
        <Stack spacing={3} flex="1">
          <Heading size="md" noOfLines={2} minH="3.5rem">
            {product.name}
          </Heading>

          {product.description && (
            <Text fontSize="sm" color="gray.600" noOfLines={3} minH="4.5rem">
              {product.description}
            </Text>
          )}

          <Text fontWeight="bold" fontSize="lg" color="green.500">
            S/ {product.price.toFixed(2)}
          </Text>

          <HStack spacing={1}>
            {/* Mostrar estrellas */}
            {Array.from({ length: 5 }).map((_, i) => (
              <Icon
                key={i}
                as={StarIcon}
                color={i < roundedRating ? "yellow.400" : "gray.300"}
              />
            ))}

            {/* Mostrar texto de calificación o carga */}
            <Text fontSize="sm" color="gray.500">
              {isPending
                ? "Cargando..."
                : averageRating !== undefined
                  ? `(${averageRating.toFixed(1)})`
                  : "(Sin reseñas)"}
            </Text>
          </HStack>
        </Stack>

        <HStack justifyContent="flex-end" mt={4} spacing={2}>
          {onEdit && (
            <IconButton
              aria-label="Editar producto"
              icon={<Edit size={18} />}
              size="sm"
              variant="outline"
              onClick={() => onEdit(product)}
            />
          )}
          {onDelete && (
            <IconButton
              aria-label="Eliminar producto"
              icon={<Trash2 size={18} />}
              size="sm"
              colorScheme="red"
              variant="outline"
              onClick={() => onDelete(product.id)}
            />
          )}
        </HStack>
      </Flex>
    </Box>
  );
};
