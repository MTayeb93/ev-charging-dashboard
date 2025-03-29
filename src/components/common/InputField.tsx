import { ReactNode } from 'react';

interface InputFieldProps {
  label: string;
  type?: string;
  name?: string;
  value?: string | number;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  placeholder?: string;
  icon?: ReactNode;
  min?: number;
  max?: number;
  error?: string;
}

const InputField = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  icon,
  min,
  max,
  error,
}: InputFieldProps) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>

      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            {icon}
          </div>
        )}

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          max={max}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 ${
            icon ? 'pl-10' : ''
          } ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-400'}`}
        />
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
