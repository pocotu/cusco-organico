import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { ProductForm } from "./ProductForm";
import type { Product, ProductFormData } from "@/schemas/product.schema";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/hooks/useProductMutation";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  defaultValues?: Partial<Product>;
  ventureId: number;
}

export const ProductFormModal = ({
  isOpen,
  onClose,
  onSuccess,
  defaultValues,
  ventureId,
}: Props) => {
  const toast = useToast();
  const isEditing = !!defaultValues?.id;

  const { mutateAsync: createProduct } = useCreateProductMutation();
  const { mutateAsync: updateProduct } = useUpdateProductMutation();

  const handleSubmit = async (data: ProductFormData) => {
    try {
      if (isEditing && defaultValues?.id) {
        await updateProduct({ id: defaultValues.id, data });
        toast({ title: "Producto actualizado", status: "success" });
      } else {
        await createProduct({ ...data, venture_id: ventureId });
        toast({ title: "Producto creado", status: "success" });
      }
      onSuccess();
    } catch (error) {
      console.log(error);
      toast({ title: "Error al guardar producto", status: "error" });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isEditing ? "Editar producto" : "Nuevo producto"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <ProductForm
            defaultValues={defaultValues}
            onSubmitProduct={handleSubmit}
            isEditing={isEditing}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
