import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from "chart.js";
import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { useTrainingStore } from "../../store/useTrainingStore";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    y: {
      title: {
        display: true,
        text: "Duration (min)",
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Total duration of activities",
    },
  },
};

export function TrainingBarChart() {
  const { statisticData } = useTrainingStore();
  const labels = useMemo(() => statisticData.labels, [statisticData]);
  const data = {
    labels,
    datasets: [
      {
        label: "Duration",
        data: statisticData.data,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
