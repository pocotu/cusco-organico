// src/components/layout/Sidebar.tsx

import {
  Box,
  VStack,
  Icon,
  Text,
  Link as ChakraLink,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiHome, FiUser, FiBox, FiBriefcase, FiStar } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Inicio", icon: FiHome, to: "/dashboard" },
  { label: "Perfil", icon: FiUser, to: "/dashboard/profile" },
  { label: "Emprendimientos", icon: FiBriefcase, to: "/dashboard/ventures" },
  { label: "Productos", icon: FiBox, to: "/dashboard/products" },
  { label: "Reseñas", icon: FiStar, to: "/dashboard/reviews" },
];

export const BoardSidebar = () => {
  const bg = useColorModeValue("gray.100", "gray.900");

  return (
    <Box
      w={{ base: "full", md: 64 }}
      bg={bg}
      borderRight="1px"
      borderColor="gray.200"
      p={5}
    >
      <VStack align="start" spacing={4}>
        {navItems.map((item) => (
          <ChakraLink
            as={NavLink}
            to={item.to}
            key={item.to}
            display="flex"
            alignItems="center"
            gap={3}
            fontWeight="medium"
            color="gray.700"
            _activeLink={{ color: "blue.500", fontWeight: "bold" }}
            _hover={{ textDecoration: "none", color: "blue.600" }}
            w="full"
          >
            <Icon as={item.icon} boxSize={5} />
            <Text>{item.label}</Text>
          </ChakraLink>
        ))}
      </VStack>
    </Box>
  );
};
