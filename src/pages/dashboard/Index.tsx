import {
  Box,
  Text,
  Heading,
  Avatar,
  Stack,
  SimpleGrid,
  useColorModeValue,
  Spinner,
  Alert,
  AlertIcon,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";
import { useAuth } from "@/hooks/useAuth";
import { useVenturesByProducerQuery } from "@/hooks/useVentureMutation";
import { useMyReviewsQuery } from "@/hooks/useReviewMutation";
import { useProductsByVentures } from "@/hooks/useProductMutation";
import { UserStatsChart } from "@/features/home/UserStatsChart";
import { ReviewBreakdownChart } from "@/features/home/ReviewBreakdownChart";

const Home = () => {
  const { user } = useAuth();
  const bg = useColorModeValue("gray.50", "gray.800");

  const {
    data: ventures,
    isLoading: loadingVentures,
    isError: errorVentures,
  } = useVenturesByProducerQuery({ enabled: user?.is_producer });

  const {
    data: reviews,
    isLoading: loadingReviews,
    isError: errorReviews,
  } = useMyReviewsQuery(user?.id);

  // Obtener productos por venture (si aplica)
  const productsPerVenture = useProductsByVentures(
    ventures,
    !!user?.is_producer,
  );

  const isLoading =
    loadingVentures ||
    loadingReviews ||
    productsPerVenture.some((q) => q.isLoading);

  const isError =
    errorVentures || errorReviews || productsPerVenture.some((q) => q.isError);

  const totalProducts = productsPerVenture.reduce((acc, q) => {
    return acc + (q.data?.length || 0);
  }, 0);

  if (isLoading) {
    return (
      <Box p={8}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert status="error">
        <AlertIcon />
        Error al cargar los datos.
      </Alert>
    );
  }

  return (
    <Box p={8} bg={bg} minH="80vh">
      <Stack direction="row" align="center" spacing={4} mb={8}>
        <Avatar
          name={user?.name}
          src={user?.avatar_url || undefined}
          size="xl"
        />
        <Box>
          <Heading size="lg">¡Bienvenido, {user?.name}!</Heading>
          <Text fontSize="md" color="gray.500">
            {user?.is_producer
              ? "Este es tu resumen como productor"
              : "Este es tu resumen como usuario"}
          </Text>
        </Box>
      </Stack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {user?.is_producer && (
          <>
            <SummaryCard
              title="Emprendimientos"
              value={ventures?.length || 0}
            />
            <SummaryCard title="Productos" value={totalProducts} />
          </>
        )}
        <SummaryCard title="Reseñas" value={reviews?.length || 0} />
      </SimpleGrid>

      <UserStatsChart
        venturesCount={ventures?.length || 0}
        productsCount={totalProducts}
        reviewsCount={reviews?.length || 0}
        isProducer={user!.is_producer}
      />

      <ReviewBreakdownChart reviews={reviews || []} />
    </Box>
  );
};

interface SummaryCardProps {
  title: string;
  value: number;
}

const SummaryCard = ({ title, value }: SummaryCardProps) => (
  <Card>
    <CardHeader>
      <Heading size="md">{title}</Heading>
    </CardHeader>
    <CardBody>
      <Text fontSize="4xl" fontWeight="bold">
        {value}
      </Text>
    </CardBody>
  </Card>
);

export default Home;
