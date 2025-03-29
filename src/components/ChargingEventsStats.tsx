import DashboardCard from './ui/DashboardCard';
import { Calendar, CalendarCheck2, CalendarDays } from 'lucide-react';

// Dummy counts
const DAILY_EVENTS = 62;
const WEEKLY_EVENTS = 430;
const MONTHLY_EVENTS = 1900;
const YEARLY_EVENTS = 21000;

const ChargingEventsStats = () => {
  return (
    <div className='grid md:grid-cols-4 gap-4 mb-8'>
      {/* Charging Events Summary */}
      <DashboardCard
        title='Charging Events Today'
        icon={<CalendarDays className='text-orange-500' />}
      >
        <span className='text-2xl font-semibold'>{DAILY_EVENTS}</span>
        <p className='text-sm text-gray-500'>Total charging sessions today</p>
      </DashboardCard>

      <DashboardCard
        title='Charging Events This Week'
        icon={<Calendar className='text-indigo-500' />}
      >
        <span className='text-2xl font-semibold'>{WEEKLY_EVENTS}</span>
        <p className='text-sm text-gray-500'>Total this week</p>
      </DashboardCard>

      <DashboardCard
        title='Charging Events This Month'
        icon={<Calendar className='text-indigo-700' />}
      >
        <span className='text-2xl font-semibold'>{MONTHLY_EVENTS}</span>
        <p className='text-sm text-gray-500'>Total this month</p>
      </DashboardCard>

      <DashboardCard
        title='Charging Events This Year'
        icon={<CalendarCheck2 className='text-green-700' />}
      >
        <span className='text-2xl font-semibold'>{YEARLY_EVENTS}</span>
        <p className='text-sm text-gray-500'>Total this year</p>
      </DashboardCard>
    </div>
  );
};

export default ChargingEventsStats;
