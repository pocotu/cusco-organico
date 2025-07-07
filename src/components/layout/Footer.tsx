// src/components/Footer.tsx
import { Box, Text, Flex, Link, Stack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  return (
    <Box bg="gray.100" color="gray.700" py={6} px={8} mt="auto">
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "flex-start", md: "center" }}
        gap={4}
      >
        {/* Nombre de la plataforma */}
        <Text fontWeight="bold" fontSize="lg">
          Cusco Orgánico
        </Text>

        {/* Enlaces útiles (pueden expandirse luego) */}
        <Stack direction="row" spacing={6}>
          <Link as={RouterLink} to="/" _hover={{ textDecoration: "underline" }}>
            Inicio
          </Link>
          <Link as={RouterLink} to="#" _hover={{ textDecoration: "underline" }}>
            Sobre nosotros
          </Link>
        </Stack>

        {/* Créditos */}
        <Text fontSize="sm" textAlign={{ base: "left", md: "right" }}>
          © {new Date().getFullYear()} Cusco Orgánico
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
