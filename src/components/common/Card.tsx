interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Card = ({ title, children, className = "" }: CardProps) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 border border-gray-200 w-full ${className}`}>
      {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
      {children}
    </div>
  );
};

export default Card;
