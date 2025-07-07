import { useSidebar } from "@/contexts/SidebarContext";
import { Box, Flex } from "@chakra-ui/react";
import Logo from "../ui/Logo";
import UserMenu from "../ui/UserMenu";

export const Topbar = () => {
  const { isCollapsed } = useSidebar();

  return (
    <Box
      as="header"
      position="fixed"
      top="0"
      left={isCollapsed ? "60px" : "260px"}
      right="0"
      height="64px"
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.300"
      boxShadow="md"
      zIndex={1000}
      transition="left 0.3s ease"
    >
      <Flex h="100%" align="center" justify="space-between" px={6}>
        <Logo />
        <UserMenu />
      </Flex>
    </Box>
  );
};
