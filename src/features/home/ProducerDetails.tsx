import type { ProducerInfoDetail, UserDetail } from "@/types";
import {
  Avatar,
  Box,
  Flex,
  Text,
  Icon,
  Stack,
  Divider,
} from "@chakra-ui/react";
import { Mail, MapPin, Phone } from "lucide-react";

interface ProducerDetailsProps {
  user: UserDetail;
  producer: ProducerInfoDetail;
}

export const ProducerDetails = ({ user, producer }: ProducerDetailsProps) => {
  return (
    <Box borderWidth="1px" borderRadius="xl" p={5} shadow="md" mt={6}>
      <Flex align="center" gap={4} mb={4}>
        <Avatar size="lg" src={user.avatar_url || undefined} name={user.name} />
        <Box>
          <Text fontWeight="bold" fontSize="lg">
            {user.name}
          </Text>
          <Stack spacing={1} mt={1}>
            <Flex align="center" gap={2}>
              <Icon as={Mail} boxSize={4} />
              <Text fontSize="sm">{user.email}</Text>
            </Flex>
            {producer.location && (
              <Flex align="center" gap={2}>
                <Icon as={MapPin} boxSize={4} />
                <Text fontSize="sm">{producer.location}</Text>
              </Flex>
            )}
            {producer.phone && (
              <Flex align="center" gap={2}>
                <Icon as={Phone} boxSize={4} />
                <Text fontSize="sm">{producer.phone}</Text>
              </Flex>
            )}
          </Stack>
        </Box>
      </Flex>

      <Divider my={3} />

      {producer.bio && (
        <Box>
          <Text fontWeight="semibold" mb={1}>
            Bio:
          </Text>
          <Text fontSize="sm" color="gray.700">
            {producer.bio}
          </Text>
        </Box>
      )}
    </Box>
  );
};
