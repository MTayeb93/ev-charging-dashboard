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

const levels = {
  day: {
    label: 'Last 30 Days',
    points: 30,
    getLabel: (i: number) => `Day ${i + 1}`,
  },
  week: {
    label: 'Last 4 Weeks',
    points: 4,
    getLabel: (i: number) => `Week ${i + 1}`,
  },
  month: {
    label: 'Last 12 Months',
    points: 12,
    getLabel: (i: number) =>
      new Date(0, i).toLocaleString('default', { month: 'short' }),
  },
};

type LevelKey = keyof typeof levels;

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

const PowerDemandChart: FC = () => {
  const [level, setLevel] = useState<LevelKey>('day');

  const { labels, maxDemand, energyUsed } = useMemo(() => {
    const config = levels[level];
    const labels = Array.from({ length: config.points }, (_, i) =>
      config.getLabel(i)
    );
    const maxDemand = Array.from({ length: config.points }, () =>
      Math.floor(Math.random() * 80 + 120)
    ); // 120–200 kW
    const energyUsed = Array.from({ length: config.points }, () =>
      Math.floor(Math.random() * 800 + 1200)
    ); // 1200–2000 kWh
    return { labels, maxDemand, energyUsed };
  }, [level]);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Max Power Demand (kW)',
        data: maxDemand,
        backgroundColor: '#facc15',
        borderRadius: 4,
      },
      {
        label: 'Energy Consumed (kWh)',
        data: energyUsed,
        backgroundColor: '#10b981',
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
        text: `Max Power Demand & Energy Consumed — ${levels[level].label}`,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'kW / kWh',
        },
      },
    },
  };

  return (
    <div className='bg-white rounded-2xl p-4 shadow-md w-full max-w-full overflow-x-auto'>
      <div className='md:flex md:justify-between items-center mb-4'>
        <h2 className='text-lg md:text-xl font-semibold'>
          Power Demand & Energy Use
        </h2>
        <select
          className='border px-2 py-1 rounded text-sm'
          value={level}
          onChange={(e) => setLevel(e.target.value as LevelKey)}
        >
          <option value='day'>Daily (30 days)</option>
          <option value='week'>Weekly (4 weeks)</option>
          <option value='month'>Monthly (12 months)</option>
        </select>
      </div>
      <div className='relative h-[300px] sm:h-[400px]'>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PowerDemandChart;
