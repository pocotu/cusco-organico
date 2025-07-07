// src/components/SidebarNavItems.tsx
import { useAuth } from "@/hooks/useAuth";
import {
  VStack,
  Text,
  Icon,
  Link as ChakraLink,
  Tooltip,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "./NavItems";

type Props = {
  isCollapsed: boolean;
};

export const SidebarNavItems = ({ isCollapsed }: Props) => {
  const { user } = useAuth();
  const location = useLocation();
  const isProducer = user?.is_producer ?? false;

  return (
    <VStack as="nav" align="stretch" spacing={1}>
      {navItems
        .filter((item) => item.isVisible(isProducer))
        .map(({ label, path, icon, exact }) => {
          const isActive = exact
            ? location.pathname === path
            : location.pathname.startsWith(path);

          return (
            <Tooltip
              key={path}
              label={label}
              placement="right"
              isDisabled={!isCollapsed}
            >
              <ChakraLink
                as={Link}
                to={path}
                display="flex"
                alignItems="center"
                px={3}
                py={2}
                borderRadius="md"
                bg={isActive ? "gray.700" : "transparent"}
                _hover={{ bg: "gray.700" }}
                color="white"
                fontWeight="medium"
                gap={isCollapsed ? 0 : 3}
                justifyContent={isCollapsed ? "center" : "flex-start"}
                whiteSpace="nowrap"
              >
                <Icon as={icon} boxSize={5} />
                {!isCollapsed && <Text fontSize="sm">{label}</Text>}
              </ChakraLink>
            </Tooltip>
          );
        })}
    </VStack>
  );
};
