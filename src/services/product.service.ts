import api from "@/lib/axios";
import { z } from "zod";
import {
  type Product,
  type CreateProductDto,
  type UpdateProductDto,
  productSchema,
  type CreateProductResponse,
  createProductResponseSchema,
} from "@/schemas/product.schema";
import { messageSchema, type MessageResponse } from "@/schemas/common.schema";
import type { ProductDetailsResponse } from "@/types";

export const getProductDetails = async (
  id: number,
): Promise<ProductDetailsResponse> => {
  const response = await api.get<ProductDetailsResponse>(
    `/products/${id}/details`,
  );
  return response.data;
};

export const getProductsByVenture = async (id: number): Promise<Product[]> => {
  const response = await api.get(`/products/venture/${id}`);

  return z.array(productSchema).parse(response.data);
};

// Obtener todos los productos
export const getAllProducts = async (): Promise<Product[]> => {
  const response = await api.get("/products");
  return z.array(productSchema).parse(response.data);
};

// Obtener un producto por ID
export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  return productSchema.parse(response.data);
};

// Crear un producto
export const createProduct = async (
  data: CreateProductDto,
): Promise<CreateProductResponse> => {
  const response = await api.post("/products", data);
  return createProductResponseSchema.parse(response.data);
};

// Actualizar producto
export const updateProduct = async (
  id: number,
  data: UpdateProductDto,
): Promise<MessageResponse> => {
  const response = await api.put(`/products/${id}`, data);
  return messageSchema.parse(response.data);
};

// Eliminar producto
export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};
