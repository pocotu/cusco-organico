import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Card,
  CardBody,
  CardHeader,
} from "@chakra-ui/react";
import Member from "@/components/ui/Member";
import { members } from "@/services/team.service";

const AboutPage = () => {
  return (
    <Box py={10}>
      <Container maxW="6xl">
        <VStack spacing={12}>
          {/* Hero Section */}
          <Card
            borderLeft="8px solid"
            borderColor="green.600"
            rounded="2xl"
            shadow="xl"
            p={6}
            textAlign="center"
          >
            <CardHeader>
              <Heading size="xl" fontWeight="bold" color="green.600">
                Cusco Orgánico
              </Heading>
            </CardHeader>
            <CardBody>
              <Text fontSize="lg" maxW="4xl" mx="auto">
                En Cusco Orgánico creemos en el poder de los pequeños
                emprendimientos agronómicos para transformar comunidades.
                Conectamos a productores locales con clientes mediante una
                plataforma accesible, gratuita y pensada para el desarrollo
                rural.
              </Text>
            </CardBody>
          </Card>

          {/* Objetivo Section */}
          <Card
            borderLeft="8px solid"
            borderColor="green.600"
            rounded="2xl"
            shadow="xl"
            p={6}
            textAlign="center"
          >
            <CardHeader>
              <Heading size="xl" fontWeight="bold" color="green.600">
                Nuestro Objetivo
              </Heading>
            </CardHeader>
            <CardBody>
              <Text fontSize="lg" maxW="4xl" mx="auto">
                Impulsar la economía agronómica local conectando directamente a
                los emprendedores rurales con potenciales clientes mediante una
                plataforma accesible, intuitiva y gratuita.
                <br />
                <br />
                Buscamos digitalizar a pequeños productores, facilitar la
                difusión de productos orgánicos, fomentar la confianza del
                consumidor y construir una red sostenible de comercio justo.
              </Text>
            </CardBody>
          </Card>

          {/* Equipo Section */}
          <Box w="full">
            <Heading
              size="xl"
              fontWeight="bold"
              color="green.600"
              textAlign="center"
              mb={8}
            >
              Nuestro Equipo
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
              {members.map((member, index) => (
                <Member key={index} member={member} />
              ))}
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default AboutPage;
