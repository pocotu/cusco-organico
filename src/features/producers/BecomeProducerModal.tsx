import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  useToast,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createProducerSchema,
  type CreateProducerDto,
} from "@/schemas/producer.schema";
import { useAuth } from "@/hooks/useAuth";
import { useUpdateUserMutation } from "@/hooks/useUserMutation";
import { useCreateProducerMutation } from "@/hooks/useProducerMutation";

export const BecomeProducerModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, refreshUser } = useAuth();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateProducerDto>({
    resolver: zodResolver(createProducerSchema),
  });

  const updateUserMutation = useUpdateUserMutation();
  const createProducerMutation = useCreateProducerMutation();

  const onSubmit = async (data: CreateProducerDto) => {
    if (!user?.id) return;

    try {
      await Promise.all([
        updateUserMutation.mutateAsync({
          id: user.id,
          data: { is_producer: true },
        }),
        createProducerMutation.mutateAsync({
          ...data,
        }),
      ]);

      toast({
        title: "Registro exitoso",
        description:
          "¡Ahora eres productor y puedes gestionar tus emprendimientos!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      await refreshUser();

      reset();
      onClose();
    } catch (err) {
      console.log(err);
      toast({
        title: "Error al registrar",
        description: "Verifica los datos e intenta nuevamente.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        Convertirme en productor
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Formulario para ser Productor</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form id="producer-form" onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <FormControl isInvalid={!!errors.bio}>
                  <FormLabel>Biografía</FormLabel>
                  <Input
                    placeholder="Escribe una breve bio"
                    {...register("bio")}
                  />
                </FormControl>

                <FormControl isInvalid={!!errors.location}>
                  <FormLabel>Ubicación</FormLabel>
                  <Input
                    placeholder="Ciudad, Departamento"
                    {...register("location")}
                  />
                </FormControl>

                <FormControl isInvalid={!!errors.phone}>
                  <FormLabel>Teléfono</FormLabel>
                  <Input
                    placeholder="Número de contacto"
                    {...register("phone")}
                  />
                </FormControl>
              </Stack>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancelar
            </Button>
            <Button
              colorScheme="teal"
              type="submit"
              form="producer-form"
              isLoading={isSubmitting}
            >
              Enviar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
