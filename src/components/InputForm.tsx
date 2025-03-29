import { useState } from 'react';
import InputField from './ui/InputField';
import { Zap, Car, BatteryCharging, TrendingUp } from 'lucide-react';
import SliderField from './ui/ٍSliderField';
import Button from './ui/Button';

const InputForm = ({onSubmit}) => {
  const [probability, setProbability] = useState(20);
  const [consumption, setConsumption] = useState(18);
  const [chargingPower, setChargingPower] = useState(11);

  return (
    <div>
      <InputField
        label="Number of charge points"
        type="number"
        placeholder="Please enter a valid number..."
        icon={<Car />}
        min={0}
        max={10}
      />

      <SliderField
        label="Arrival probability multiplier (20–200%)"
        name="probability"
        value={probability}
        min={20}
        max={200}
        step={2}
        unit="%"
        onChange={(e) => {
          const newValue = parseInt(e.target.value);
          setProbability(newValue);
          console.log('Probability changed to:', newValue);
        }}
      />

      <SliderField
        label="Consumption of the cars (default: 18 kWh)"
        name="consumption"
        value={consumption}
        min={10}
        max={40}
        step={1}
        unit="kWh"
        icon={<BatteryCharging size={16} />}
        onChange={(e) => {
          const newValue = parseInt(e.target.value);
          setConsumption(newValue);
          console.log('Consumption changed to:', newValue);
        }}
      />

      <SliderField
        label="Charging power per charge point (default: 11 kW)"
        name="chargingPower"
        value={chargingPower}
        min={3}
        max={22}
        step={1}
        unit="kW"
        icon={<Zap size={16} />}
        onChange={(e) => {
          const newValue = parseInt(e.target.value);
          setChargingPower(newValue);
          console.log('Charging Power changed to:', newValue);
        }}
      />
      <Button icon={<TrendingUp size={18} />} onClick={onSubmit} />
    </div>
  );
};

export default InputForm;
