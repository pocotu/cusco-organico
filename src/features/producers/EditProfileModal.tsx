import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Textarea,
  useToast,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { updateUserSchema, type UpdateUserDto } from "@/schemas/user.schema";
import {
  updateProducerSchema,
  type UpdateProducerDto,
} from "@/schemas/producer.schema";
import { useAuth } from "@/hooks/useAuth";
import { useUpdateUserMutation } from "@/hooks/useUserMutation";
import { useUpdateProducerMutation } from "@/hooks/useProducerMutation";

type Props = {
  defaultUserData: UpdateUserDto;
  defaultProducerData?: UpdateProducerDto;
  producerId?: number;
};

export const EditProfileModal = ({
  defaultUserData,
  defaultProducerData,
  producerId,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { refreshUser, user } = useAuth();

  const {
    register: registerUser,
    getValues: getUserValues,
    trigger: triggerUser,
    formState: { errors: userErrors, isSubmitting: isSubmittingUser },
    reset: resetUser,
  } = useForm<UpdateUserDto>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: defaultUserData,
  });

  const {
    register: registerProducer,
    getValues: getProducerValues,
    trigger: triggerProducer,
    formState: { errors: producerErrors, isSubmitting: isSubmittingProducer },
    reset: resetProducer,
  } = useForm<UpdateProducerDto>({
    resolver: zodResolver(updateProducerSchema),
    defaultValues: defaultProducerData,
  });

  const updateUserMutation = useUpdateUserMutation();
  const updateProducerMutation = useUpdateProducerMutation();

  useEffect(() => {
    resetUser(defaultUserData);
    if (defaultProducerData) resetProducer(defaultProducerData);
  }, [defaultUserData, defaultProducerData, isOpen, resetProducer, resetUser]);

  const onSubmit = async () => {
    const userData = getUserValues();
    const producerData = getProducerValues();

    const userIsValid = await triggerUser();
    const producerIsValid = defaultProducerData
      ? await triggerProducer()
      : true;

    if (!userIsValid || !producerIsValid) return;

    try {
      await updateUserMutation.mutateAsync({ id: user!.id, data: userData });

      if (defaultProducerData) {
        await updateProducerMutation.mutateAsync({
          id: producerId!,
          data: producerData,
        });
      }

      await refreshUser();
      toast({
        title: "Perfil actualizado.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error al actualizar.",
        description: "Verifica los campos e intenta nuevamente.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button colorScheme="teal" variant={"outline"} onClick={onOpen}>
        Editar Perfil
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent
          as="form"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <ModalHeader>Editar Perfil</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <VStack spacing={4}>
              <FormControl isInvalid={!!userErrors.name}>
                <FormLabel>Nombre</FormLabel>
                <Input {...registerUser("name")} />
                <FormErrorMessage>{userErrors.name?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!userErrors.email}>
                <FormLabel>Email</FormLabel>
                <Input type="email" {...registerUser("email")} />
                <FormErrorMessage>{userErrors.email?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!userErrors.avatar_url}>
                <FormLabel>Avatar URL</FormLabel>
                <Input {...registerUser("avatar_url")} />
                <FormErrorMessage>
                  {userErrors.avatar_url?.message}
                </FormErrorMessage>
              </FormControl>

              {defaultProducerData && (
                <>
                  <FormControl isInvalid={!!producerErrors.bio}>
                    <FormLabel>Bio</FormLabel>
                    <Textarea {...registerProducer("bio")} />
                    <FormErrorMessage>
                      {producerErrors.bio?.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!producerErrors.location}>
                    <FormLabel>Ubicación</FormLabel>
                    <Input {...registerProducer("location")} />
                    <FormErrorMessage>
                      {producerErrors.location?.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!producerErrors.phone}>
                    <FormLabel>Teléfono</FormLabel>
                    <Input {...registerProducer("phone")} />
                    <FormErrorMessage>
                      {producerErrors.phone?.message}
                    </FormErrorMessage>
                  </FormControl>
                </>
              )}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              colorScheme="teal"
              type="submit"
              isLoading={isSubmittingUser || isSubmittingProducer}
            >
              Guardar Cambios
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
