import api from "@/lib/axios";
import { messageSchema, type MessageResponse } from "@/schemas/common.schema";
import {
  type Producer,
  type CreateProducerDto,
  type UpdateProducerDto,
  producerSchema,
  type ProducerResponse,
  ProducerResponseSchema,
} from "@/schemas/producer.schema";
import { z } from "zod";

// Obtener todos los productores
export const getAllProducers = async (): Promise<Producer[]> => {
  const response = await api.get("/producers");
  return z.array(producerSchema).parse(response.data);
};

// Obtener un productor por ID
export const getProducerById = async (id: number): Promise<Producer> => {
  const response = await api.get(`/producers/user/${id}`);
  return producerSchema.parse(response.data);
};

// Crear perfil de productor
export const createProducer = async (
  data: CreateProducerDto,
): Promise<ProducerResponse> => {
  console.log({ data });
  const response = await api.post("/producers", data);
  console.log(response.data);
  return ProducerResponseSchema.parse(response.data);
};

// Actualizar perfil del productor
export const updateProducer = async (
  id: number,
  data: UpdateProducerDto,
): Promise<MessageResponse> => {
  console.log("Antes", id, data);
  const response = await api.put(`/producers/${id}`, data);
  console.log("Después", response.data);
  return messageSchema.parse(response.data);
};

// Eliminar perfil de productor
export const deleteProducer = async (id: number): Promise<void> => {
  await api.delete(`/producers/${id}`);
};
