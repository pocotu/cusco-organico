import { Box, Button, Flex, HStack, Spacer } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Logo from "@/components/ui/Logo";
import UserMenu from "@/components/ui/UserMenu";

const Header = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <Box
      as="header"
      bg="white"
      boxShadow="md"
      px={6}
      py={3}
      position="sticky"
      top={0}
      zIndex={1000}
    >
      <Flex align="center">
        <Logo />

        <Spacer />

        <HStack spacing={4}>
          <Button
            variant="ghost"
            colorScheme="teal"
            onClick={() => navigate("/about")}
          >
            Sobre nosotros
          </Button>

          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <>
              <Button
                as={RouterLink}
                to="/login"
                variant="outline"
                colorScheme="teal"
              >
                Iniciar sesión
              </Button>
              <Button as={RouterLink} to="/register" colorScheme="teal">
                Registrarse
              </Button>
            </>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
