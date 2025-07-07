import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByVenture,
  getProductDetails,
} from "@/services/product.service";
import { type UpdateProductDto } from "@/schemas/product.schema";
import type { VentureByProducer } from "@/schemas/venture.schema";

export const useProductDetails = (productId: number) => {
  return useQuery({
    queryKey: ["productDetails", productId],
    queryFn: () => getProductDetails(productId),
    enabled: !!productId,
  });
};

export const useProductsByVentures = (
  ventures: VentureByProducer[] | undefined,
  enabled: boolean = true,
) => {
  const queries = useQueries({
    queries: (ventures ?? []).map((venture) => ({
      queryKey: ["products", venture.id],
      queryFn: () => getProductsByVenture(venture.id),
      enabled,
      staleTime: 5 * 60 * 1000,
    })),
  });

  return queries;
};

export const useProductsByVenture = (id: number) =>
  useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductsByVenture(id),
  });

// Obtener todos
export const useProductsQuery = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
};

// Obtener uno
export const useProductQuery = (id: number) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};

// Crear
export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

// Actualizar
export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateProductDto }) =>
      updateProduct(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

// Eliminar
export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
