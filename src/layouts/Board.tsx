import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import { BoardSidebar } from "./BoardSidebar";
import { BoardTopbar } from "./BoardTopbar";

export const Board = () => {
  return (
    <Flex h="100vh" overflow="hidden" flexDirection="column">
      <BoardTopbar />

      <Flex flex="1">
        <BoardSidebar />

        <Box as="main" flex="1" p={6} overflowY="auto">
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
};
