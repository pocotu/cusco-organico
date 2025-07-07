import {
  Box,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export interface Venture {
  id: number;
  name: string;
  description: string;
  image_url: string;
  producer_id: number;
  created_at: string;
}

interface Props {
  venture: Venture;
}

export const VentureHeader = ({ venture }: Props) => {
  const bg = useColorModeValue("gray.50", "gray.700");

  return (
    <Box bg={bg} p={4} rounded="xl" shadow="sm" mb={6}>
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={4}
        align={{ base: "center", md: "flex-start" }}
      >
        <Image
          src={venture.image_url}
          alt={venture.name}
          boxSize="120px"
          objectFit="cover"
          rounded="lg"
          border="1px solid"
          borderColor="gray.200"
        />
        <Box textAlign={{ base: "center", md: "left" }}>
          <Heading size="md" mb={2}>
            {venture.name}
          </Heading>
          <Text color="gray.600" fontSize="sm">
            {venture.description}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};
