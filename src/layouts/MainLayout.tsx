// src/layouts/PublicLayout.tsx
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const MainLayout = () => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Header />

      <Box
        as="main"
        flex="1"
        w="100%"
        px={{ base: 4, md: 8 }}
        py={6}
        bg={"gray.50"}
      >
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
};

export default MainLayout;
