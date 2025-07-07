import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  Button,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  productFormSchema,
  type CreateProductDto,
  type ProductFormData,
} from "@/schemas/product.schema";

interface Props {
  defaultValues?: Partial<CreateProductDto>;
  onSubmitProduct: (data: ProductFormData) => void;
  isEditing?: boolean;
}

export const ProductForm = ({
  defaultValues,
  onSubmitProduct,
  isEditing = false,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(
        (data) => {
          console.log("Formulario válido:", data);
          onSubmitProduct(data);
        },
        (errors) => {
          console.log("Errores de validación:", errors);
        },
      )}
    >
      <VStack spacing={4} align="stretch">
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Nombre</FormLabel>
          <Input {...register("name")} />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.description}>
          <FormLabel>Descripción</FormLabel>
          <Textarea {...register("description")} />
          <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.price}>
          <FormLabel>Precio</FormLabel>
          <Input
            type="number"
            step="0.01"
            {...register("price", { valueAsNumber: true })}
          />
          <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.stock}>
          <FormLabel>Stock</FormLabel>
          <Input
            type="number"
            {...register("stock", { valueAsNumber: true })}
          />
          <FormErrorMessage>{errors.stock?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.image_url}>
          <FormLabel>URL de la imagen</FormLabel>
          <Input {...register("image_url")} />
          <FormErrorMessage>{errors.image_url?.message}</FormErrorMessage>
        </FormControl>

        <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
          {isEditing ? "Actualizar producto" : "Crear producto"}
        </Button>
      </VStack>
    </form>
  );
};
