// Charts – Charging Values
import { ChargingLineChart } from '../charts/charging-values-per-charging-point/ChargingLineChart';
import { HeatmapChargepointUsage } from '../charts/charging-values-per-charging-point/HeatmapChargepointUsage';

// Charts – Exemplary Day
import { AggregatedBarChart } from '../charts/exemplary-day/AggregatedBarChart';
import { DailySummaryCards } from '../charts/exemplary-day/DailySummaryCard';

// Charts – Stats & Demand
import { ChargingEventsBarChart } from '../charts/ChargingEventsChart';
import ChargingEventsStats from '../charts/ChargingEventsStats';
import PowerDemandChart from '../charts/PowerDemandChart';

// Components
import Card from '../common/Card';

const OutputCharts = () => {
  // render output charts as per tasked
  return (
    <div className='grid md:gap-8 gap-4 pb-20'>
      <h2 className='text-xl md:text-2xl font-bold text-green-700 border-b pb-2'>
        Charging Values (kW) per Charge Point
      </h2>
      {/* Charge Points Values */}
      <div className='flex flex-col gap-8'>
        <Card title='Charging Values through 15-min Intervals'>
          <ChargingLineChart />
        </Card>
        <Card title='Charging Points Heatmap'>
          <HeatmapChargepointUsage />
        </Card>
      </div>

      {/* Exemplary day */}
      <h2 className='text-xl md:text-2xl font-bold text-blue-700 border-b pb-2 mt-8'>
        An Exemplary Day
      </h2>
      <div className='grid gap-8'>
        <Card title='Total Charging Power Over 24 Hours'>
          <AggregatedBarChart />
        </Card>
        <DailySummaryCards />
      </div>

      {/* Stats */}
      <h2 className='text-xl md:text-2xl font-bold text-purple-700 border-b pb-2 mt-8'>
        Charging Events Stats
      </h2>
      <ChargingEventsStats />
      <ChargingEventsBarChart />

      {/* Power Demand */}
      <h2 className='text-xl md:text-2xl font-bold text-yellow-700 border-b pb-2 mt-4'>
        Power Demand
      </h2>
      <PowerDemandChart />
    </div>
  );
};

export default OutputCharts;
