import {
  Box,
  IconButton,
  VStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSidebar } from "@/contexts/SidebarContext";
import { SidebarNavItems } from "./SidebarNavItems";
import { SIDEBAR_WIDTH } from "@/layouts/DashboardLayout";

export const Sidebar = () => {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const bgColor = useColorModeValue("gray.800", "gray.900");

  return (
    <Box
      as="aside"
      role="navigation"
      position="fixed"
      left="0"
      top="0"
      h="100vh"
      w={isCollapsed ? SIDEBAR_WIDTH.collapsed : SIDEBAR_WIDTH.expanded}
      bg={bgColor}
      color="white"
      p={3}
      transition="width 0.3s ease"
      zIndex="100"
      overflowX="hidden"
    >
      <VStack align="stretch" spacing={4} h="full">
        <Box
          display="flex"
          justifyContent={isCollapsed ? "center" : "flex-end"}
        >
          <IconButton
            aria-label={
              isCollapsed ? "Expandir menú lateral" : "Colapsar menú lateral"
            }
            icon={isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            onClick={toggleSidebar}
            variant="ghost"
            colorScheme="whiteAlpha"
            size="sm"
          />
        </Box>

        {!isCollapsed && (
          <Text whiteSpace="nowrap" fontSize="xl" fontWeight="bold" px={3}>
            Panel de control
          </Text>
        )}

        <SidebarNavItems isCollapsed={isCollapsed} />
      </VStack>
    </Box>
  );
};
