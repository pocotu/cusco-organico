import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
  Legend,
} from "recharts";
import { Box, Heading } from "@chakra-ui/react";

interface Props {
  venturesCount: number;
  productsCount: number;
  reviewsCount: number;
  isProducer: boolean;
}

const COLORS = ["#3182CE", "#38A169", "#DD6B20"];

export const UserStatsChart = ({
  venturesCount,
  productsCount,
  reviewsCount,
  isProducer,
}: Props) => {
  const data = isProducer
    ? [
        { name: "Emprendimientos", value: venturesCount },
        { name: "Productos", value: productsCount },
        { name: "Reseñas", value: reviewsCount },
      ]
    : [{ name: "Reseñas", value: reviewsCount }];

  return (
    <Box mt={10}>
      <Heading size="md" mb={4}>
        Tu Actividad Visualizada
      </Heading>
      <ResponsiveContainer width="100%" height={300}>
        {isProducer ? (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#3182CE" />
          </BarChart>
        ) : (
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        )}
      </ResponsiveContainer>
    </Box>
  );
};
