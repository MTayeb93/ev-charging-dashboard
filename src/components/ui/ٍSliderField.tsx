import { ReactNode } from 'react';

interface SliderFieldProps {
  label: string;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number;
  icon?: ReactNode;
  unit?: string;
  error?: string;
}

const getColor = (value: number) => {
  if (value <= 39) return 'bg-gray-100 text-gray-500 border-gray-300';
  if (value <= 70) return 'bg-gray-200 text-gray-700';
  if (value <= 100) return 'bg-green-200 text-green-700';
  if (value <= 140) return 'bg-green-400 text-green-900';
  if (value <= 180) return 'bg-orange-300 text-orange-800';
  return 'bg-red-300 text-red-900';
};

const SliderField = ({
  label,
  name,
  value,
  onChange,
  min = 20,
  max = 200,
  step = 10,
  icon,
  unit = '%',
  error,
}: SliderFieldProps) => {
  const colorClass = getColor(value);

  const intermediatePoints = [0.25, 0.5, 0.75].map((fraction) => {
    const val = Math.round(min + (max - min) * fraction);
    const left = fraction * 100;
    return { val, left };
  });

  return (
    <div className="mb-8">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <div className="flex items-center gap-2">
        {icon && <div className="text-gray-400">{icon}</div>}
        <div
          className={`text-sm font-semibold px-2 py-1 rounded transition-all duration-300 ${colorClass}`}
        >
          {value}{unit}
        </div>
      </div>

      <div className="relative w-full">
        <div className="absolute top-1/2 transform -translate-y-1/2 h-3 w-full bg-gray-200 rounded" />
        <div
          className="absolute top-1/2 transform -translate-y-1/2 h-2 bg-[#FA9E0D] rounded"
          style={{ width: `${((value - min) / (max - min)) * 100}%` }}
        />

        <input
          id={name}
          name={name}
          type="range"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={onChange}
          className="relative w-full bg-transparent appearance-none z-10 cursor-pointer mb-4"
          style={{
            WebkitAppearance: 'none',
            appearance: 'none',
          }}
        />

        <div className="relative flex justify-between text-xs text-gray-500 mt-1">
          <span>{min}{unit}</span>

          {intermediatePoints.map(({ val, left }, i) => (
            <span
              key={i}
              className="absolute -translate-x-1/2"
              style={{ left: `${left}%` }}
            >
              {val}{unit}
            </span>
          ))}

          <span>{max}{unit}</span>
        </div>
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default SliderField;
