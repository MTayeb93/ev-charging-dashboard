import { ReactNode, MouseEvent } from 'react';

interface ButtonProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  icon?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({ icon, onClick, type = 'button' }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full cursor-pointer px-4 py-2 rounded-xl bg-[#FA9E0D] text-white hover:bg-orange-400 transition font-semibold text-md"
    >
      <div className="flex items-center justify-center gap-2">
        {icon && <span className="flex items-center">{icon}</span>}
        <span>Submit Simulation Data</span>
      </div>
    </button>
  );
};

export default Button;
