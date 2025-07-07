import {
  Box,
  Flex,
  Image,
  Text,
  Heading,
  Icon,
  HStack,
  Button,
  Stack,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { type FC } from "react";
import type { Product } from "@/schemas/product.schema";
import { useAverageRating } from "@/hooks/useReviewMutation";

interface ProductCardHorizontalProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

export const ProductCardHorizontal: FC<ProductCardHorizontalProps> = ({
  product,
  onViewDetails,
}) => {
  const { data, isPending } = useAverageRating(product.id);
  const averageRating = data?.average;

  return (
    <Flex
      borderWidth="1px"
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="md"
      _hover={{ boxShadow: "lg" }}
      bg="white"
      w="100%"
      direction={{ base: "column", md: "row" }}
    >
      {/* Imagen del producto */}
      {product.image_url && (
        <Image
          src={product.image_url}
          alt={product.name}
          objectFit="cover"
          w={{ base: "100%", md: "220px" }}
          h={{ base: "180px", md: "220px" }}
        />
      )}

      {/* Contenido textual */}
      <Flex p={4} direction="column" flex="1">
        {/* Título y descripción: parte superior */}
        <Stack spacing={2} flex="1">
          <Heading size="md" noOfLines={2}>
            {product.name}
          </Heading>

          {product.description && (
            <Text fontSize="sm" color="gray.600" noOfLines={3}>
              {product.description}
            </Text>
          )}
        </Stack>

        {/* Valoración + grupo precio + botón: parte inferior fija */}
        <Box mt={4}>
          <HStack spacing={1} mb={2}>
            {isPending ? (
              "Cargando..."
            ) : (
              <>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon
                    key={i}
                    as={StarIcon}
                    color={
                      i < Math.round(averageRating ?? 0)
                        ? "yellow.400"
                        : "gray.300"
                    }
                  />
                ))}
                <Text fontSize="sm" color="gray.500">
                  ({averageRating?.toFixed(1)})
                </Text>
              </>
            )}
          </HStack>

          <HStack justify="space-between">
            <Text fontWeight="bold" fontSize="lg" color="green.500">
              S/ {product.price.toFixed(2)}
            </Text>
            <Button
              size="sm"
              colorScheme="teal"
              onClick={() => onViewDetails?.(product)}
            >
              Ver más
            </Button>
          </HStack>
        </Box>
      </Flex>
    </Flex>
  );
};
