import React from 'react';
import { useNavigate } from 'react-router-dom';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
  buttonText?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon, 
  to,
  bgColor = "bg-[#1e1e1e]",
  borderColor = "border-gray-800",
  textColor = "text-white",
  buttonText = "Get Started"
}) => {
  const navigate = useNavigate();

  return (
    <div className={`${bgColor} p-3 rounded-xl shadow-lg border ${borderColor} hover:border-gray-700 transition-all duration-300 flex flex-col h-full`}>
      <div className="mb-2 text-purple-400">
        {icon}
      </div>
      <h3 className={`text-base font-bold mb-1 ${textColor}`}>{title}</h3>
      <p className="text-gray-400 text-md mb-2 flex-grow line-clamp-2">{description}</p>
      <button
        onClick={() => navigate(to)}
        className="mt-auto w-full bg-black/30 hover:bg-black/50 text-white py-1.5 px-3 text-xs rounded-lg border border-gray-700 transition-all duration-300"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default FeatureCard;