// src/components/layout/Topbar.tsx

import {
  Box,
  Flex,
  Heading,
  Spacer,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAuth } from "@/hooks/useAuth";

export const BoardTopbar = () => {
  const bg = useColorModeValue("white", "gray.800");
  const { user, logout } = useAuth();

  return (
    <Box bg={bg} px={6} py={4} borderBottom="1px solid" borderColor="gray.200">
      <Flex align="center">
        <Heading size="md">Panel de Usuario</Heading>
        <Spacer />
        <Flex align="center" gap={4}>
          <Box fontWeight="medium" color="gray.600">
            {user?.name}
          </Box>
          <Button size="sm" colorScheme="red" onClick={logout}>
            Cerrar sesión
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};
