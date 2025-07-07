import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllVentures,
  getVentureById,
  createVenture,
  updateVenture,
  deleteVenture,
  getVenturesByProducer,
} from "@/services/venture.service";
import { type VentureFormData } from "@/schemas/venture.schema";

export const useVenturesByProducerQuery = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["ventures"],
    queryFn: getVenturesByProducer,
    enabled: options?.enabled,
  });
};

// Obtener todos los ventures
export const useVenturesQuery = () => {
  return useQuery({
    queryKey: ["ventures"],
    queryFn: getAllVentures,
  });
};

// Obtener un venture por ID
export const useVentureQuery = (id: number) => {
  return useQuery({
    queryKey: ["ventures", id],
    queryFn: () => getVentureById(id),
    enabled: !!id,
  });
};

// Crear venture
export const useCreateVentureMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createVenture,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ventures"] });
    },
  });
};

// Actualizar venture
export const useUpdateVentureMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: VentureFormData }) =>
      updateVenture(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["ventures", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["ventures"] });
    },
  });
};

// Eliminar venture
export const useDeleteVentureMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteVenture,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ventures"] });
    },
  });
};
