import { LoginForm } from "@/features/auth/LoginForm";
import {
  Box,
  Heading,
  Flex,
  useColorModeValue,
  Stack,
  Divider,
  Text,
} from "@chakra-ui/react";

export const LoginPage = () => {
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
          <Heading size="lg" color="teal.600">
            Inicio de Sesión
          </Heading>
          <Text fontSize="sm" color="gray.500">
            Ingresa tus credenciales
          </Text>
          <Divider />
        </Stack>

        <LoginForm />
      </Box>
    </Flex>
  );
};
