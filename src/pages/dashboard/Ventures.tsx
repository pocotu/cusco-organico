import { VentureList } from "@/features/ventures/VentureList";
import VentureModal from "@/features/ventures/VentureModal";
import {
  useDeleteVentureMutation,
  useVenturesByProducerQuery,
} from "@/hooks/useVentureMutation";
import type { VentureByProducer } from "@/schemas/venture.schema";
import {
  Box,
  Heading,
  Spinner,
  Alert,
  AlertIcon,
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

const Ventures = () => {
  const { data: ventures, isLoading, isError } = useVenturesByProducerQuery();
  const { mutateAsync: deleteVenture } = useDeleteVentureMutation();
  const toast = useToast();

  const {
    isOpen: isAlertOpen,
    onOpen: openAlert,
    onClose: closeAlert,
  } = useDisclosure();
  const cancelRef = useRef(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();
  const [selectedVenture, setSelectedVenture] =
    useState<VentureByProducer | null>(null);

  const handleEdit = (venture: VentureByProducer) => {
    setSelectedVenture(venture);
    openModal();
  };

  const handleDelete = (id: number) => {
    setSelectedId(id);
    openAlert();
  };

  const confirmDelete = async () => {
    if (selectedId === null) return;
    try {
      await deleteVenture(selectedId);
      toast({
        title: "Emprendimiento eliminado",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error al eliminar",
        description: "Inténtalo nuevamente.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setSelectedId(null);
      closeAlert();
    }
  };

  const handleCreate = () => {
    setSelectedVenture(null); // modo creación
    openModal();
  };

  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Mis Emprendimientos</Heading>
        <Button colorScheme="teal" onClick={handleCreate}>
          Nuevo emprendimiento
        </Button>
      </Flex>

      {isLoading && <Spinner size="lg" />}
      {isError && (
        <Alert status="error">
          <AlertIcon />
          Error al cargar tus emprendimientos.
        </Alert>
      )}

      {!isLoading && !isError && (
        <VentureList
          ventures={ventures ?? []}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Modal Crear / Editar */}
      <VentureModal
        isOpen={isModalOpen}
        onClose={closeModal}
        initialData={selectedVenture ?? undefined}
      />

      {/* AlertDialog Eliminar */}
      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={closeAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Eliminar Emprendimiento
            </AlertDialogHeader>
            <AlertDialogBody>
              ¿Estás seguro de que deseas eliminar este emprendimiento? Esta
              acción no se puede deshacer.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={closeAlert}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Ventures;
