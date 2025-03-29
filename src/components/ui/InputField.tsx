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
}: InputFieldProps) => {
  return (
    <div className='mb-4'>
      <label
        className='block text-sm font-medium text-gray-700 mb-1'
        htmlFor={name}
      >
        {label}
      </label>
      <div className='relative'>
        {icon && (
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400'>
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
          className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400 ${
            icon ? 'pl-10' : ''
          }`}
        />
      </div>
    </div>
  );
};

export default InputField;
