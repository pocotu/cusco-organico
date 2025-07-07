import {
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { registerSchema, type RegisterFormData } from "@/schemas/auth.schema";
import { useRegisterMutation } from "@/hooks/useAuthMutation";
import { AxiosError } from "axios";
import { z } from "zod";

export const RegisterForm = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const mutation = useRegisterMutation();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { confirmPassword, ...cleanData } = data;
      void confirmPassword;
      await mutation.mutateAsync(cleanData);

      toast({
        title: "Registro exitoso",
        description: "Ahora puedes iniciar sesión.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/login");
    } catch (error) {
      let description = "Ocurrió un error inesperado. Inténtalo de nuevo.";

      if (error instanceof AxiosError) {
        const axiosError = error as AxiosError<{ message?: string }>;
        description =
          axiosError.response?.data?.message || "Error en el registro";
      } else if (error instanceof z.ZodError) {
        const errorMessage = error.errors.map((err) => err.message).join(", ");
        description = `Error de validación: ${errorMessage}`;
      } else {
        description = `Error inesperado: ${error}`;
      }

      toast({
        title: "Error al registrarse",
        description,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4} align="stretch">
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Nombre</FormLabel>
          <Input type="text" {...register("name")} />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Correo electrónico</FormLabel>
          <Input type="email" {...register("email")} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Contraseña</FormLabel>
          <Input type="password" {...register("password")} />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.confirmPassword}>
          <FormLabel>Confirmar contraseña</FormLabel>
          <Input type="password" {...register("confirmPassword")} />
          <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          colorScheme="teal"
          isLoading={mutation.isPending || isSubmitting}
        >
          Registrarse
        </Button>
      </VStack>
    </form>
  );
};
