import {
  Box,
  Heading,
  Text,
  Image,
  IconButton,
  HStack,
  Button,
} from "@chakra-ui/react";
import { Edit, ShoppingBag, Trash2 } from "lucide-react";
import type { VentureByProducer } from "@/schemas/venture.schema";
import { useNavigate } from "react-router-dom";

interface Props {
  venture: VentureByProducer;
  onEdit?: (venture: VentureByProducer) => void;
  onDelete?: (id: number) => void;
}

export const VentureCard = ({ venture, onEdit, onDelete }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/dashboard/ventures/${venture.id}/products`);
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="md"
      p={4}
      _hover={{ boxShadow: "lg" }}
      transition="all 0.2s"
    >
      {venture.image_url && (
        <Image
          src={venture.image_url}
          alt={venture.name}
          borderRadius="xl"
          mb={4}
          objectFit="cover"
          w="100%"
          h="180px"
        />
      )}

      <Heading size="md" mb={2}>
        {venture.name}
      </Heading>

      {venture.description && (
        <Text fontSize="sm" color="gray.600" noOfLines={3}>
          {venture.description}
        </Text>
      )}

      <HStack justifyContent={"space-between"} mt={4} spacing={2}>
        <Button
          size="sm"
          colorScheme="teal"
          leftIcon={<ShoppingBag size={16} />}
          onClick={handleClick}
        >
          Productos
        </Button>
        <Box>
          <HStack spacing={2}>
            {onEdit && (
              <IconButton
                aria-label="Editar"
                icon={<Edit size={18} />}
                size="sm"
                variant="outline"
                onClick={() => onEdit(venture)}
              />
            )}
            {onDelete && (
              <IconButton
                aria-label="Eliminar"
                icon={<Trash2 size={18} />}
                size="sm"
                colorScheme="red"
                variant="outline"
                onClick={() => onDelete(venture.id)}
              />
            )}
          </HStack>
        </Box>
      </HStack>
    </Box>
  );
};
