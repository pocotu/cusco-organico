import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, LayoutDashboard, LucideStore } from "lucide-react";

const UserMenu = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;

  const isInDashboard = location.pathname.startsWith("/dashboard");
  const menuTarget = isInDashboard ? "/" : "/dashboard";
  const menuLabel = isInDashboard ? "Tienda" : "Panel de control";
  const menuIcon = isInDashboard ? (
    <LucideStore size={16} />
  ) : (
    <LayoutDashboard size={16} />
  );

  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded="lg"
        variant="ghost"
        cursor="pointer"
        minW={0}
        rightIcon={<ChevronDownIcon />}
        aria-label="Opciones de usuario"
      >
        <Avatar
          size="sm"
          name={user.name}
          src={user.avatar_url ?? undefined}
          bg="teal.500"
          color="white"
        />
      </MenuButton>

      <MenuList>
        <Box px={4} py={2}>
          <VStack align="start" spacing={0}>
            <Text fontWeight="bold">{user.name}</Text>
            <Text fontSize="sm" color="gray.500">
              {user.email}
            </Text>
          </VStack>
        </Box>

        <MenuDivider />

        <MenuItem
          icon={menuIcon}
          onClick={() => navigate(menuTarget)}
          color="teal.700"
        >
          {menuLabel}
        </MenuItem>

        <MenuDivider />

        <MenuItem icon={<LogOut size={16} />} onClick={logout} color="red.500">
          Cerrar sesión
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
