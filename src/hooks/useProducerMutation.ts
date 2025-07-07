import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllProducers,
  getProducerById,
  createProducer,
  updateProducer,
  deleteProducer,
} from "@/services/producer.service";
import { type UpdateProducerDto } from "@/schemas/producer.schema";

// Obtener todos los productores
export const useProducersQuery = () => {
  return useQuery({
    queryKey: ["producers"],
    queryFn: getAllProducers,
  });
};

// Obtener un productor por ID
export const useProducerQuery = (id?: number, isProducer?: boolean) => {
  return useQuery({
    queryKey: ["producers", id],
    queryFn: () => getProducerById(id!),
    enabled: !!id && !!isProducer,
  });
};

// Crear perfil de productor
export const useCreateProducerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProducer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["producers"] });
    },
  });
};

// Actualizar perfil
export const useUpdateProducerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateProducerDto }) =>
      updateProducer(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["producers", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["producers"] });
    },
  });
};

// Eliminar perfil
export const useDeleteProducerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProducer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["producers"] });
    },
  });
};
