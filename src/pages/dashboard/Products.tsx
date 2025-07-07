import { ProductFormModal } from "@/features/products/ProductFormModal";
import { ProductGrid } from "@/features/products/ProductGrid";
import {
  useDeleteProductMutation,
  useProductsByVenture,
} from "@/hooks/useProductMutation";
import { useVentureQuery } from "@/hooks/useVentureMutation";
import type { Product } from "@/schemas/product.schema";
import {
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Products = () => {
  const { ventureId } = useParams<{ ventureId: string }>();
  const toast = useToast();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const {
    isLoading: isLoadingVenture,
    data: venture,
    isError: isVentureError,
  } = useVentureQuery(Number(ventureId));

  const {
    isLoading: isLoadingProducts,
    data: products,
    refetch: refetchProducts,
    isError: isProductsError,
  } = useProductsByVenture(Number(ventureId));

  const {
    isOpen: isFormOpen,
    onOpen: openForm,
    onClose: closeForm,
  } = useDisclosure();

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    openForm();
  };

  const handleNewProduct = () => {
    setSelectedProduct(null);
    openForm();
  };

  const { mutateAsync } = useDeleteProductMutation();

  const handleDeleteProduct = async (id: number) => {
    try {
      // usa mutateAsync si ya lo tienes configurado
      await mutateAsync(id);
      toast({
        title: "Producto eliminado",
        status: "success",
      });
      await refetchProducts();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error al eliminar",
        status: "error",
      });
    }
  };

  if (isLoadingVenture || isLoadingProducts) return <Spinner />;
  if (isVentureError || isProductsError)
    return <Text>Error al cargar datos</Text>;
  if (!venture) return <Text>Emprendimiento no encontrado</Text>;

  return (
    <Box p={4}>
      <Heading size="lg" mb={2}>
        {venture.name}
      </Heading>

      {venture.description && (
        <Text mb={6} color="gray.600">
          {venture.description}
        </Text>
      )}

      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="md">Productos</Heading>
        <Button onClick={handleNewProduct} colorScheme="teal">
          + Agregar producto
        </Button>
      </Flex>

      <ProductGrid
        products={products ?? []}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />

      <ProductFormModal
        isOpen={isFormOpen}
        onClose={closeForm}
        defaultValues={selectedProduct ?? {}}
        ventureId={venture.id}
        onSuccess={() => {
          closeForm();
          refetchProducts();
        }}
      />
    </Box>
  );
};

export default Products;
