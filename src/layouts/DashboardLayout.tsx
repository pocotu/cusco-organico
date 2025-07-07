import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export const SIDEBAR_WIDTH = {
  expanded: "260px",
  collapsed: "60px",
};

export const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <LayoutStructure />
    </SidebarProvider>
  );
};

const LayoutStructure = () => {
  const { isCollapsed } = useSidebar();

  return (
    <Flex>
      <Sidebar />

      <Box
        flex="1"
        ml={isCollapsed ? SIDEBAR_WIDTH.collapsed : SIDEBAR_WIDTH.expanded}
        transition="margin-left 0.3s ease"
        bg={"gray.50"}
      >
        <Topbar />

        <Box as="main" mt="64px" p={4}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
};
