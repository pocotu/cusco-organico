import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useToast,
} from "@chakra-ui/react";
import VentureForm from "./VentureForm";
import type {
  VentureByProducer,
  VentureFormData,
} from "@/schemas/venture.schema";
import {
  useCreateVentureMutation,
  useUpdateVentureMutation,
} from "@/hooks/useVentureMutation";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  initialData?: VentureByProducer;
};

const VentureModal = ({ isOpen, onClose, initialData }: Props) => {
  const toast = useToast();
  const isEditing = !!initialData;

  const buildDefaultFormData = (
    data?: VentureByProducer,
  ): VentureFormData | undefined => {
    if (!data) return undefined;
    return {
      name: data.name,
      description: data.description ?? "",
      image_url: data.image_url ?? "",
    };
  };

  const { mutateAsync: createVenture, isPending: isCreating } =
    useCreateVentureMutation();
  const { mutateAsync: updateVenture, isPending: isUpdating } =
    useUpdateVentureMutation();

  const handleSubmit = async (data: VentureFormData) => {
    try {
      if (isEditing && initialData) {
        await updateVenture({ id: initialData.id, data });
        toast({
          title: "Emprendimiento actualizado",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        await createVenture(data);
        toast({
          title: "Emprendimiento creado",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      onClose();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "No se pudo guardar el emprendimiento.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isEditing ? "Editar Emprendimiento" : "Nuevo Emprendimiento"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VentureForm
            defaultValues={buildDefaultFormData(initialData)}
            isSubmitting={isCreating || isUpdating}
            onSubmit={handleSubmit}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default VentureModal;
