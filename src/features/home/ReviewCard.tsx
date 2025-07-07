import { Box, Flex, Avatar, Text, HStack } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import type { ReviewDetail } from "@/types";

interface ReviewCardProps {
  review: ReviewDetail;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <Box borderWidth="1px" borderRadius="xl" p={4} shadow="sm" bg="white">
      <Flex align="center" mb={2}>
        <Avatar
          name={review.user_name}
          src={review.avatar_url || undefined}
          size="sm"
          mr={3}
        />
        <Text fontWeight="medium">{review.user_name}</Text>
      </Flex>

      <HStack spacing={1} mb={2}>
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon
            key={i}
            color={i < review.rating ? "yellow.400" : "gray.300"}
            boxSize={4}
          />
        ))}
      </HStack>

      <Text fontSize="sm" color="gray.700">
        {review.comment}
      </Text>
    </Box>
  );
};
