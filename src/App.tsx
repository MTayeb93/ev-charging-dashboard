// React
import { useState, useEffect, lazy, Suspense } from 'react';

// Icons
import { Loader } from 'lucide-react';

// Components
import PageLayout from './components/layout/Layout';
import Card from './components/common/Card';
import InputForm, { FormValues } from './components/form/InputForm';

const OutputModal = lazy(() => import('./components/output/OutputModal'));

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = (formData: FormValues) => {
    console.log('Submitted form data:', formData);
    setIsLoading(true);
    setProgress(0);
    setIsModalOpen(false);
  };

  // Simulate loading progress
  useEffect(() => {
    if (isLoading && progress < 100) {
      const timeout = setTimeout(() => {
        setProgress((prev) => Math.min(prev + Math.random() * 10 + 5, 100));
      }, 120);
      return () => clearTimeout(timeout);
    } else if (isLoading && progress >= 100) {
      setTimeout(() => {
        setIsLoading(false);
        setIsModalOpen(true);
      }, 300);
    }
  }, [isLoading, progress]);

  return (
    <PageLayout>
      <div className='items-center gap-8 px-4 sm:px-8 md:px-16 w-full lg:max-w-6/12 mx-auto'>
        {/* Progress bar to simulate generating report simulation */}
        {isLoading && (
          <div className='flex flex-col items-center gap-3 w-full mt-4'>
            <div className='relative w-full h-3 bg-gray-200 rounded'>
              <div
                className='absolute top-0 left-0 h-full bg-blue-500 rounded transition-all duration-100'
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className='flex items-center gap-2 text-gray-700 text-sm font-medium'>
              <Loader className='w-4 h-4 animate-spin text-blue-600' />
              Generating Report... {Math.round(progress)}%
            </div>
          </div>
        )}
        {/* Input Form */}
        {!isLoading && (
          <Card title='Simulation Parameters' className='self-start'>
            <InputForm onSubmit={handleSubmit} isLoading={isLoading} />
          </Card>
        )}
        {/* Of course the modal is in lazy loading so it won't be rendered unless needed / opened */}
        {/* Output Modal */}
        <Suspense fallback={null}>
          <OutputModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </Suspense>
      </div>
    </PageLayout>
  );
}

export default App;
