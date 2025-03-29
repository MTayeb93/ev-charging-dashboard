import { FC, JSX } from 'react';

const DashboardCard: FC<{
  title: string;
  icon: JSX.Element;
  children: React.ReactNode;
  className?: string;
}> = ({ title, icon, children, className = '' }) => (
  <div className={`${className} bg-white rounded-2xl p-4 shadow-md`}>
    <div className='flex items-center gap-2 mb-2'>
      {icon}
      <h3 className='text-lg font-semibold text-gray-800'>{title}</h3>
    </div>
    <div>{children}</div>
  </div>
);

export default DashboardCard;
