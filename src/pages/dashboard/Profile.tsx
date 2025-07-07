import {
  Box,
  Button,
  Heading,
  Text,
  Avatar,
  useToast,
  Spinner,
  Flex,
  Badge,
  Divider,
  Grid,
  GridItem,
  HStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useAuth } from "@/hooks/useAuth";

import { useDeleteUserMutation, useUserQuery } from "@/hooks/useUserMutation";
import { useNavigate } from "react-router-dom";
import { BecomeProducerModal } from "@/features/producers/BecomeProducerModal";
import { useProducerQuery } from "@/hooks/useProducerMutation";
import { EditProfileModal } from "@/features/producers/EditProfileModal";

const DashboardProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  if (!user) throw new Error("Usuario no autenticado");
  const { data: userData, isPending, isError } = useUserQuery(user.id);

  const {
    data: producerData,
    isPending: isPendingProducer,
    isError: isErrorProducer,
  } = useProducerQuery(user.id, userData?.is_producer);

  const deleteMutation = useDeleteUserMutation();

  const handleDeleteAccount = () => {
    if (!user?.id) return;
    deleteMutation.mutate(user.id, {
      onSuccess: () => {
        toast({
          title: "Cuenta eliminada",
          description: "Tu cuenta ha sido eliminada exitosamente.",
          status: "info",
          duration: 4000,
          isClosable: true,
        });
        logout();
        navigate("/");
      },
      onError: () => {
        toast({
          title: "Error",
          description: "No se pudo eliminar la cuenta.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      },
    });
  };

  if (isPending) {
    return <Spinner size="xl" />;
  }

  if (isError || !userData) {
    return <Text>Ocurrió un error al cargar los datos del usuario.</Text>;
  }

  return (
    <Box
      maxW="3xl"
      mx="auto"
      mt={8}
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      bg={"white"}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        alignItems="center"
        mb={6}
        gap={6}
      >
        <Avatar
          size="2xl"
          src={userData.avatar_url ?? undefined}
          name={userData.name}
        />
        <Box>
          <Heading size="lg" mb={1}>
            {userData.name}
          </Heading>
          <Text fontSize="md" color="gray.600">
            {userData.email}
          </Text>
          <Badge mt={2} colorScheme={userData.is_producer ? "green" : "gray"}>
            {userData.is_producer ? "Productor" : "Usuario"}
          </Badge>
        </Box>
      </Flex>

      <Divider mb={4} />

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
        <GridItem>
          <Text fontWeight="medium">Fecha de registro:</Text>
          <Text>{dayjs(userData.created_at).format("DD/MM/YYYY")}</Text>
        </GridItem>
        <GridItem>
          <Text fontWeight="medium">ID del usuario:</Text>
          <Text>{userData.id}</Text>
        </GridItem>
      </Grid>

      {userData.is_producer && (
        <Box mt={8}>
          <Heading size="md" mb={4}>
            Información como Productor
          </Heading>

          {isPendingProducer && <Spinner />}
          {isErrorProducer && (
            <Text color="red.500">
              Error al cargar información del productor.
            </Text>
          )}

          {producerData && (
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
              {/* Primera fila: Bio ocupa las dos columnas */}
              <GridItem colSpan={2}>
                <Text fontWeight="medium">Bio:</Text>
                <Text whiteSpace="pre-wrap">
                  {producerData.bio || "No especificado"}
                </Text>
              </GridItem>

              {/* Segunda fila: ubicación y teléfono, una en cada columna */}
              <GridItem>
                <Text fontWeight="medium">Ubicación:</Text>
                <Text>{producerData.location || "No especificado"}</Text>
              </GridItem>

              <GridItem>
                <Text fontWeight="medium">Teléfono:</Text>
                <Text>{producerData.phone || "No especificado"}</Text>
              </GridItem>
            </Grid>
          )}
        </Box>
      )}

      <HStack mt={8} justifyContent={"space-between"}>
        <EditProfileModal
          defaultUserData={{
            name: userData.name,
            email: userData.email,
            avatar_url: userData.avatar_url ?? "",
          }}
          defaultProducerData={
            userData.is_producer && producerData
              ? {
                  bio: producerData.bio ?? "",
                  location: producerData.location ?? "",
                  phone: producerData.phone ?? "",
                }
              : undefined
          }
          producerId={producerData?.id}
        />

        {!userData.is_producer && <BecomeProducerModal />}

        <Button
          colorScheme="red"
          variant="outline"
          onClick={handleDeleteAccount}
          isLoading={deleteMutation.isPending}
        >
          Eliminar mi cuenta
        </Button>
      </HStack>
    </Box>
  );
};

export default DashboardProfile;
