import { z } from "zod";
import api from "@/lib/axios";
import {
  type Venture,
  ventureSchema,
  venturesByProducerSchema,
  type VenturesByProducer,
  type VentureFormData,
  type VentureResponse,
  ventureResponseSchema,
} from "@/schemas/venture.schema";
import { messageSchema, type MessageResponse } from "@/schemas/common.schema";

export const getVenturesByProducer = async (): Promise<VenturesByProducer> => {
  const response = await api.get("/ventures/producer");
  return venturesByProducerSchema.parse(response.data);
};

// Obtener todos los ventures
export const getAllVentures = async (): Promise<Venture[]> => {
  const response = await api.get("/ventures");
  return z.array(ventureSchema).parse(response.data);
};

// Obtener un venture por ID
export const getVentureById = async (id: number): Promise<Venture> => {
  const response = await api.get(`/ventures/${id}`);
  return ventureSchema.parse(response.data);
};

// Crear un venture
export const createVenture = async (
  data: VentureFormData,
): Promise<VentureResponse> => {
  const response = await api.post("/ventures", data);
  return ventureResponseSchema.parse(response.data);
};

// Actualizar un venture
export const updateVenture = async (
  id: number,
  data: VentureFormData,
): Promise<MessageResponse> => {
  const response = await api.put(`/ventures/${id}`, data);
  return messageSchema.parse(response.data);
};

// Eliminar un venture
export const deleteVenture = async (id: number): Promise<void> => {
  await api.delete(`/ventures/${id}`);
};
