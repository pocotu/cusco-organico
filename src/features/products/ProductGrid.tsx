import { SimpleGrid, Text, Box } from "@chakra-ui/react";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/schemas/product.schema";

interface Props {
  products: Product[];
  onEdit?: (product: Product) => void;
  onDelete?: (id: number) => void;
}

export const ProductGrid = ({ products, onEdit, onDelete }: Props) => {
  if (products.length === 0) {
    return <Text>No hay productos registrados para este emprendimiento.</Text>;
  }

  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 3 }} spacing={6}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};
