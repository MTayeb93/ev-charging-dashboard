import { useState } from 'react';
import * as yup from 'yup';
import InputField from './ui/InputField';
import { Zap, Car, BatteryCharging, TrendingUp } from 'lucide-react';
import SliderField from './ui/ٍSliderField';
import Button from './ui/Button';
import { FormValues } from '../types/index';

const schema = yup.object().shape({
  numberOfChargePoints: yup
    .number()
    .typeError('Please enter a valid number')
    .required('This field is required')
    .min(1, 'Must be greater than 0')
    .max(10, 'Cannot exceed 10'),

  probability: yup.number().min(20).max(200),
  consumption: yup.number().min(10).max(40),
  chargingPower: yup.number().min(3).max(22),
});

interface InputFormProps {
  onSubmit: (data: FormValues) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormValues>({
    numberOfChargePoints: 1,
    probability: 20,
    consumption: 18,
    chargingPower: 11,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof FormValues, string>>
  >({});

  const handleChange = (field: keyof FormValues, value: number | string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: typeof value === 'string' ? Number(value) : value,
    }));
    setErrors((prev) => ({
      ...prev,
      [field]: '',
    }));
  };

  const handleSubmit = async () => {
    try {
      const validData = await schema.validate(formData, { abortEarly: false });
      onSubmit(validData);
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
    <div className='space-y-6'>
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

      <Button icon={<TrendingUp size={18} />} onClick={handleSubmit} />
    </div>
  );
};

export default InputForm;
