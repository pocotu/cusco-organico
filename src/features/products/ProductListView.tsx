import {
  Box,
  Spinner,
  Text,
  SimpleGrid,
  useToast,
  Input,
  VStack,
  InputGroup,
  InputLeftElement,
  Icon,
} from "@chakra-ui/react";
import { ProductCardHorizontal } from "./ProductCardHorizontal";
import { useMemo, useState } from "react";
import { useProductsQuery } from "@/hooks/useProductMutation";
import type { Product } from "@/schemas/product.schema";
import { ProductDetailsModal } from "../home/ProductDetailsModal";
import queryClient from "@/lib/queryClient";
import { SearchIcon } from "lucide-react";

export const ProductListView = () => {
  const toast = useToast();
  const { data: products, isLoading, isError } = useProductsQuery();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    toast({
      title: "Ver más",
      description: `Producto seleccionado: ${product.name}`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    queryClient.invalidateQueries({ queryKey: ["averageRating"] });
  };

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [products, searchQuery]);

  if (isLoading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
        <Text mt={2}>Cargando productos...</Text>
      </Box>
    );
  }

  if (isError || !products) {
    return (
      <Box textAlign="center" mt={10}>
        <Text color="red.500">Error al cargar los productos.</Text>
      </Box>
    );
  }

  return (
    <>
      <VStack spacing={6} mt={4}>
        <InputGroup maxW="450px" mx="auto">
          <InputLeftElement pointerEvents="none">
            <Icon as={SearchIcon} color="gray.500" boxSize={5} />
          </InputLeftElement>
          <Input
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            bg="white"
            borderRadius="full"
            boxShadow="md"
            _focus={{
              borderColor: "teal.800",
              boxShadow: "0 0 0 2px rgba(56, 178, 172, 0.4)",
            }}
            _placeholder={{ color: "gray.400" }}
          />
        </InputGroup>

        {filteredProducts.length === 0 ? (
          <Text color="gray.600">No se encontraron productos.</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="full">
            {filteredProducts.map((product) => (
              <ProductCardHorizontal
                key={product.id}
                product={product}
                onViewDetails={handleViewDetails}
              />
            ))}
          </SimpleGrid>
        )}
      </VStack>

      {selectedProduct && (
        <ProductDetailsModal
          productId={selectedProduct.id}
          isOpen={!!selectedProduct}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
