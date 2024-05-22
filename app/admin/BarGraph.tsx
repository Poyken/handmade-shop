"use client";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  LineController,
  LineElement,
  PointElement,
  Title,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title
);
interface BarGraphProps {
  data: GraphData[];
}
type GraphData = {
  day: string;
  date: string;
  totalAmount: number;
};
const BarGraph: React.FC<BarGraphProps> = ({ data }) => {
  const labels = data.map((item) => item.day);
  const amount = data.map((item) => item.totalAmount);
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Doanh thu theo ngày",
        data: amount,
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    scales: { y: { beginAtZero: true } },
  };
  return (
    <div>
      <Chart type="bar" options={options} data={chartData} />
    </div>
  );
};

export default BarGraph;
