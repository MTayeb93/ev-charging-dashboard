// React
import { useState } from 'react';

// Form Validation
import * as yup from 'yup';

// UI Components
import InputField from '../common/InputField';
import SliderField from '../common/SliderField';
import Button from '../common/Button';

// Icons
import { Car, BatteryCharging, Zap, TrendingUp } from 'lucide-react';

// Types - Exporting form data type from yup to make sure that we are sending the exact same validated data to the backend
export type FormValues = yup.InferType<typeof schema>;

// Schema
const schema = yup.object().shape({
  numberOfChargePoints: yup
    .number()
    .typeError('Please enter a valid number')
    .required('This field is required')
    .min(1, 'Must be greater than 0')
    .max(10, 'Cannot exceed 10'),

  probability: yup.number().required().min(20).max(200),
  consumption: yup.number().required().min(10).max(40),
  chargingPower: yup.number().required().min(3).max(22),
});

interface InputFormProps {
  onSubmit: (data: FormValues) => void;
  isLoading: boolean;
}

// Creating form data object
const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<Record<keyof FormValues, number | string>>({
    numberOfChargePoints: 1,
    probability: 20,
    consumption: 18,
    chargingPower: 11,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof FormValues, string>>
  >({});

  // Filling out input data in the data form (preparing API payload with validated entries)
  const handleChange = (field: keyof FormValues, value: number | string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value === '' ? '' : Number(value),
    }));
    setErrors((prev) => ({
      ...prev,
      [field]: '',
    }));
  };

  // Handle Form Submission
  const handleSubmit = async () => {
    try {
      const validData = await schema.validate(formData, { abortEarly: false });
      //api call lands here
      onSubmit(validData as FormValues);
    } catch (validationError) {
      const errorMap: Partial<Record<keyof FormValues, string>> = {};
      if (validationError instanceof yup.ValidationError) {
        validationError.inner.forEach((err) => {
          if (err.path) errorMap[err.path as keyof FormValues] = err.message;
        });
      }
      setErrors(errorMap);
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <InputField
        label='Number of charge points'
        name='numberOfChargePoints'
        type='number'
        value={formData.numberOfChargePoints}
        onChange={(e) => handleChange('numberOfChargePoints', e.target.value)}
        placeholder='Please enter a valid number...'
        icon={<Car />}
        min={1}
        max={10}
        error={errors.numberOfChargePoints}
      />

      <SliderField
        label='Arrival probability multiplier (20–200%)'
        name='probability'
        value={formData.probability}
        min={20}
        max={200}
        step={2}
        unit='%'
        onChange={(e) => handleChange('probability', parseInt(e.target.value))}
        error={errors.probability}
      />

      <SliderField
        label='Consumption of the cars (default: 18 kWh)'
        name='consumption'
        value={formData.consumption}
        min={10}
        max={40}
        step={1}
        unit='kWh'
        icon={<BatteryCharging size={16} />}
        onChange={(e) => handleChange('consumption', parseInt(e.target.value))}
        error={errors.consumption}
      />

      <SliderField
        label='Charging power per charge point (default: 11 kW)'
        name='chargingPower'
        value={formData.chargingPower}
        min={3}
        max={22}
        step={1}
        unit='kW'
        icon={<Zap size={16} />}
        onChange={(e) =>
          handleChange('chargingPower', parseInt(e.target.value))
        }
        error={errors.chargingPower}
      />

      <Button
        icon={<TrendingUp size={18} />}
        onClick={handleSubmit}
        disabled={isLoading}
      />
    </div>
  );
};

export default InputForm;
