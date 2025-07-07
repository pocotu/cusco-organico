// src/components/ui/Logo.tsx
import { Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo-rev.jpeg";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <Image
      src={logo}
      alt="Logo"
      h="40px"
      cursor="pointer"
      rounded={"lg"}
      onClick={() => navigate("/")}
    />
  );
};

export default Logo;
