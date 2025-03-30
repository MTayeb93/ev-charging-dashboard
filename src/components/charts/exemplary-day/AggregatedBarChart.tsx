import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FC, useMemo, useState } from 'react';
import { chargingEvents } from '../../../data';
import { aggregateChargingData, AggregationType } from '../../../utils/helpers';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

export const AggregatedBarChart: FC = () => {
  const [aggregation, setAggregation] = useState<AggregationType>('hourly');

  const aggregatedData = useMemo(() => {
    return aggregateChargingData(chargingEvents, aggregation);
  }, [aggregation]);

  const labels = aggregatedData.map((d) => d.label);
  const totals = aggregatedData.map((d) => d.total);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Total kW',
        data: totals,
        backgroundColor: '#3b82f6',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: `Total Charging Power (${aggregation})`,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Total (kW)',
        },
        beginAtZero: true,
      },
      x: {
        title: {
          display: true,
          text:
            aggregation === '15min'
              ? 'Time (15-minute intervals)'
              : 'Hour of Day',
        },
      },
    },
  };

  return (
    <div className=' bg-white rounded-2xl w-full'>
      <div className='flex justify-between items-center'>
        <select
          className='border px-2 py-1 rounded text-sm ml-auto'
          value={aggregation}
          onChange={(e) => setAggregation(e.target.value as AggregationType)}
        >
          <option value='15min'>15-Minute</option>
          <option value='hourly'>Hourly</option>
        </select>
      </div>
      <div className='relative h-[300px] sm:h-[400px]'>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};
