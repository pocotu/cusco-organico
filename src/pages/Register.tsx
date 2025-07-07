import { RegisterForm } from "@/features/auth/RegisterForm";
import {
  Box,
  Heading,
  Flex,
  useColorModeValue,
  Stack,
  Divider,
  Text,
} from "@chakra-ui/react";

export const RegisterPage = () => {
  return (
    <Flex
      minH="70vh"
      align="center"
      justify="center"
      bg={useColorModeValue("gray.50", "gray.900")}
    >
      <Box
        w="full"
        maxW="md"
        bg={useColorModeValue("white", "gray.800")}
        boxShadow="xl"
        rounded="xl"
        p={8}
      >
        <Stack spacing={4} mb={6} textAlign="center">
          <Heading size="lg" color="teal.500">
            Crear una cuenta
          </Heading>
          <Text fontSize="sm" color="gray.500">
            Únete a la comunidad
          </Text>
          <Divider />
        </Stack>

        <RegisterForm />
      </Box>
    </Flex>
  );
};
