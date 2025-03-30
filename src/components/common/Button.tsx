import { ReactNode, MouseEvent } from 'react';

interface ButtonProps {
  text: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  icon?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean
}

const Button = ({ text, icon, onClick, type = 'button', disabled }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full cursor-pointer px-4 py-2 rounded-xl bg-[#FA9E0D] text-white hover:bg-orange-400 transition font-semibold text-md"
      disabled={disabled}
    >
      <div className="flex items-center justify-center gap-2">
        {icon && <span className="flex items-center">{icon}</span>}
        <span>{text}</span>
      </div>
    </button>
  );
};

export default Button;
