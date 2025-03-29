import { useState, lazy, Suspense } from 'react';
import InputForm from './components/InputForm';
import PageLayout from './components/Layout';
import Card from './components/ui/Card';

const OutputModal = lazy(() => import('./components/OutputModal'));

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = () => {
    setIsModalOpen(true);
  };

  return (
    <PageLayout>
      <div className='flex flex-col items-center gap-8 px-4 sm:px-8 md:px-16 w-full max-w-xl mx-auto'>
        <Card title='Simulation Parameters' className='self-start'>
          <InputForm onSubmit={handleSubmit} />
        </Card>
        <Suspense fallback={null}>
          <OutputModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </Suspense>
      </div>
    </PageLayout>
  );
}

export default App;