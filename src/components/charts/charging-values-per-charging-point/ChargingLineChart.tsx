import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { FC } from "react";
import { chargingTimeSeriesData, TimeSeriesDataPoint } from "../../../data/dummyData";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title
);

const colors = ["#16a34a", "#2563eb", "#f59e0b", "#dc2626"];

export const ChargingLineChart: FC = () => {
  const data: TimeSeriesDataPoint[] = chargingTimeSeriesData;

  const labels = data.map((d) => d.time);
  const chargepointIds = Object.keys(data[0].chargepoints);

  const datasets = chargepointIds.map((id, idx) => ({
    label: id,
    data: data.map((point) => point.chargepoints[id]),
    borderColor: colors[idx % colors.length],
    backgroundColor: colors[idx % colors.length],
    fill: false,
    tension: 0.3,
    pointRadius: 0,
  }));

  return (
    <div className=" bg-white rounded-2xl w-full">
      <Line
        data={{ labels, datasets }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top" as const,
            },
            title: {
              display: true,
              text: "Charging Power (kW) Over 24h (15-min intervals)",
            },
          },
          scales: {
            y: {
              title: {
                display: true,
                text: "kW",
              },
              min: 0,
              max: 11,
            },
            x: {
              title: {
                display: true,
                text: "Time",
              },
              ticks: {
                maxTicksLimit: 12,
              },
            },
          },
        }}
        height={400}
      />
    </div>
  );
};
