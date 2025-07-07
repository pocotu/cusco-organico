import { useAuth } from "@/hooks/useAuth";
import { Button } from "@chakra-ui/react";

export const LogoutButton = () => {
  const { logout, user } = useAuth();

  return (
    <Button onClick={logout} colorScheme="red">
      Cerrar sesión ({user?.name})
    </Button>
  );
};
