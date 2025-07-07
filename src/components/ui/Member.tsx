// src/components/ui/Member.tsx
import {
  Avatar,
  Box,
  Button,
  Center,
  Circle,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IoLogoGithub } from "react-icons/io";
import logoInfo from "@/assets/logo-info.png";

type MemberProps = {
  member: {
    name: string;
    role: string;
    img: string | null;
    email: string;
    github: string;
  };
};

const Member = ({ member }: MemberProps) => {
  const { name, role, img, email, github } = member;

  return (
    <Center py={6}>
      <Box
        maxW="270px"
        w="full"
        bg="white"
        boxShadow="2xl"
        rounded="md"
        overflow="hidden"
        border="1px solid"
        borderColor="gray.100"
      >
        {/* Imagen decorativa o logo si aplica */}
        <Image h="120px" w="full" src={logoInfo} objectFit="contain" />

        {/* Avatar */}
        <Flex justify="center" mt={-12}>
          <Avatar
            size="xl"
            name={name}
            src={img ?? undefined}
            border="4px solid white"
            bg="green.500"
            color="white"
          />
        </Flex>

        {/* Info del miembro */}
        <Box p={6}>
          <VStack spacing={2} align="center" textAlign="center" mb={4}>
            <Heading fontSize="xl" fontWeight="semibold">
              {name}
            </Heading>
            <Text color="gray.600" fontSize="sm">
              {role}
            </Text>
          </VStack>

          <VStack spacing={2}>
            <Text fontSize="sm" color="gray.800" fontWeight="medium">
              {email}
            </Text>

            <Link href={github} target="_blank" rel="noopener noreferrer">
              <Circle size="10" borderWidth="2px" borderColor="gray.300">
                <IoLogoGithub size={20} />
              </Circle>
            </Link>
          </VStack>

          <Button
            as={Link}
            href={github}
            target="_blank"
            mt={4}
            w="full"
            bg="green.500"
            color="white"
            rounded="md"
            _hover={{
              bg: "green.600",
              transform: "translateY(-2px)",
              boxShadow: "md",
            }}
          >
            Seguir
          </Button>
        </Box>
      </Box>
    </Center>
  );
};

export default Member;
