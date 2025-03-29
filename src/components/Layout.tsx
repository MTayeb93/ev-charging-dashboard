import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function PageLayout({ children }: Props) {
  return (
    <div className='min-h-screen w-full overflow-x-hidden bg-gray-50 text-gray-800'>
      <header className='text-center py-6 border-b border-gray-200 shadow-sm'>
        <h1 className='sm:text-3xl text-xl font-bold'>
          EV's Charging Spots Simulation
        </h1>
      </header>
      <main className='my-8'>
        <div className='mx-auto'>{children}</div>
      </main>
    </div>
  );
}
