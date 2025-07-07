// components/SummaryChart.tsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Box, Heading, useColorModeValue } from "@chakra-ui/react";

interface SummaryChartProps {
  isProducer: boolean;
  venturesCount: number;
  productsCount: number;
  reviewsCount: number;
}

export const SummaryChart = ({
  isProducer,
  venturesCount,
  productsCount,
  reviewsCount,
}: SummaryChartProps) => {
  const chartColor = useColorModeValue("#3182ce", "#90cdf4");

  const data = isProducer
    ? [
        { name: "Emprendimientos", value: venturesCount },
        { name: "Productos", value: productsCount },
        { name: "Reseñas", value: reviewsCount },
      ]
    : [{ name: "Reseñas", value: reviewsCount }];

  return (
    <Box mt={12}>
      <Heading size="md" mb={4}>
        Resumen gráfico
      </Heading>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill={chartColor} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};
