import { SimpleGrid, Text } from "@chakra-ui/react";
import type {
  VentureByProducer,
  VenturesByProducer,
} from "@/schemas/venture.schema";
import { VentureCard } from "./VentureCard";

interface Props {
  ventures: VenturesByProducer;
  onEdit?: (venture: VentureByProducer) => void;
  onDelete?: (id: number) => void;
}

export const VentureList = ({ ventures, onEdit, onDelete }: Props) => {
  if (!ventures || ventures.length === 0) {
    return <Text color="gray.500">No tienes emprendimientos registrados.</Text>;
  }

  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={6}>
      {ventures.map((venture) => (
        <VentureCard
          key={venture.id}
          venture={venture}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </SimpleGrid>
  );
};
