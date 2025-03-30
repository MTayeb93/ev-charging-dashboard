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

const intervals = {
  day: {
    label: 'Last 30 Days',
    points: 30,
    getLabel: (i: number) => `Day ${i + 1}`,
    min: 40,
    max: 100,
  },
  week: {
    label: 'Last 4 Weeks',
    points: 4,
    getLabel: (i: number) => `Week ${i + 1}`,
    min: 300,
    max: 600,
  },
  month: {
    label: 'Last 12 Months',
    points: 12,
    getLabel: (i: number) =>
      new Date(0, i).toLocaleString('default', { month: 'short' }),
    min: 1200,
    max: 2400,
  },
  year: {
    label: 'Last 5 Years',
    points: 5,
    getLabel: (i: number) => `${new Date().getFullYear() - 4 + i}`,
    min: 15000,
    max: 25000,
  },
};

type IntervalKey = keyof typeof intervals;

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

export const ChargingEventsBarChart: FC = () => {
  const [interval, setInterval] = useState<IntervalKey>('day');

  const { labels, data } = useMemo(() => {
    const config = intervals[interval];
    const labels = Array.from({ length: config.points }, (_, i) =>
      config.getLabel(i)
    );
    const data = Array.from({ length: config.points }, () =>
      Math.floor(Math.random() * (config.max - config.min + 1) + config.min)
    );
    return { labels, data };
  }, [interval]);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Charging Events',
        data,
        backgroundColor: '#3b82f6',
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: `Charging Events — ${intervals[interval].label}`,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Events',
        },
      },
      x: {
        title: {
          display: true,
          text:
            interval === 'day'
              ? 'Day'
              : interval === 'week'
              ? 'Week'
              : interval === 'month'
              ? 'Month'
              : 'Year',
        },
      },
    },
  };

  return (
    <div className='bg-white rounded-2xl p-4 shadow-md w-full'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold'>Charging Event Trends</h2>
        <select
          className='border px-2 py-1 rounded text-sm'
          value={interval}
          onChange={(e) => setInterval(e.target.value as IntervalKey)}
        >
          <option value='day'>Daily (30 days)</option>
          <option value='week'>Weekly (4 weeks)</option>
          <option value='month'>Monthly (12 months)</option>
          <option value='year'>Yearly (5 years)</option>
        </select>
      </div>
      <div className='relative h-[300px] sm:h-[400px]'>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};
