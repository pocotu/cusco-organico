import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Box, Heading, Text } from "@chakra-ui/react";
import type { UserReview } from "@/schemas/review.schema";

interface Props {
  reviews: UserReview[];
}

export const ReviewBreakdownChart = ({ reviews }: Props) => {
  // Agrupar reseñas por producto
  const grouped = reviews.reduce<Record<string, number>>((acc, review) => {
    const name = review.product_name;
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(grouped).map(([name, count]) => ({
    name,
    reviews: count,
  }));

  if (chartData.length === 0) {
    return (
      <Box mt={10}>
        <Text>No hay suficientes reseñas para mostrar este gráfico.</Text>
      </Box>
    );
  }

  return (
    <Box mt={10}>
      <Heading size="md" mb={4}>
        Reseñas por Producto
      </Heading>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="reviews" fill="#38A169" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};
