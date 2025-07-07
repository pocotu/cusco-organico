import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { ReviewForm } from "./ReviewForm";
import type { ReviewFormData } from "@/schemas/review.schema";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isEditing?: boolean;
  defaultValues?: Partial<ReviewFormData>;
  onSubmitReview: (data: ReviewFormData) => void | Promise<void>;
}

export const ReviewFormModal = ({
  isOpen,
  onClose,
  isEditing,
  defaultValues,
  onSubmitReview,
}: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isEditing ? "Editar Reseña" : "Nueva Reseña"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <ReviewForm
            onSubmitReview={onSubmitReview}
            defaultValues={defaultValues}
            isEditing={isEditing}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
