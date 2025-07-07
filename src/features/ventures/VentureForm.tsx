import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  ventureFormDataSchema,
  type VentureFormData,
} from "@/schemas/venture.schema";

type Props = {
  defaultValues?: VentureFormData;
  isSubmitting?: boolean;
  onSubmit: (data: VentureFormData) => void;
};

const VentureForm = ({ defaultValues, isSubmitting, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VentureFormData>({
    resolver: zodResolver(ventureFormDataSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4} align="stretch">
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Nombre del emprendimiento</FormLabel>
          <Input {...register("name")} placeholder="Mi emprendimiento" />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.description}>
          <FormLabel>Descripción</FormLabel>
          <Textarea {...register("description")} placeholder="Descripción..." />
          <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.image_url}>
          <FormLabel>URL de imagen</FormLabel>
          <Input {...register("image_url")} placeholder="https://..." />
          <FormErrorMessage>{errors.image_url?.message}</FormErrorMessage>
        </FormControl>

        <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
          Guardar
        </Button>
      </VStack>
    </form>
  );
};

export default VentureForm;
