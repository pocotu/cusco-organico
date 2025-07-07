import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Spinner,
  Box,
  Center,
} from "@chakra-ui/react";
import { VentureHeader } from "./VentureHeader";
import { ProducerDetails } from "./ProducerDetails";
import { ProductReviewsList } from "./ProductReviewsList";
import { useProductDetails } from "@/hooks/useProductMutation";

interface ProductDetailsModalProps {
  productId: number;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetailsModal = ({
  productId,
  isOpen,
  onClose,
}: ProductDetailsModalProps) => {
  const { data, isLoading, isError } = useProductDetails(productId);

  return (
    <Modal size="4xl" isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Detalles del producto</ModalHeader>
        <ModalCloseButton />

        <ModalBody py={4}>
          {isLoading ? (
            <Center py={10}>
              <Spinner size="xl" />
            </Center>
          ) : isError || !data ? (
            <Box color="red.500" textAlign="center">
              Error al cargar los detalles del producto.
            </Box>
          ) : (
            <>
              {/* Sección del emprendimiento */}
              <VentureHeader venture={data.venture} />

              {/* Sección del productor */}
              <ProducerDetails
                user={data.producerUser}
                producer={data.producerInfo}
              />

              {/* Sección de reseñas */}
              <ProductReviewsList
                reviews={data.reviews}
                productId={productId}
              />
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
