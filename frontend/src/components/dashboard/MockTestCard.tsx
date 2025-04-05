import React from 'react';
import { FileText, Clock } from 'react-feather';
import { useNavigate } from 'react-router-dom';

const MockTestCard: React.FC = () => {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate('/free-mock-test');
  };
  return (
    <div className="bg-gradient-to-r from-blue-900/30 to-blue-700/30 p-4 rounded-xl shadow-lg border border-blue-900/50">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-white">Free Mock Tests</h3>
          <p className="text-gray-300 text-xs">Practice with real scenarios</p>
        </div>
        <div className="bg-blue-900/60 p-1.5 rounded-lg">
          <FileText size={16} className="text-blue-300" />
        </div>
      </div>
      
      <div className="bg-black/20 border border-blue-900/30 rounded-lg p-3 mb-3">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium text-white text-sm">Frontend React Interview</h4>
          <span className="flex items-center text-xs text-blue-300">
            <Clock size={10} className="mr-1" />
            60 min
          </span>
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          <span className="text-xs bg-blue-900/40 text-blue-300 px-1.5 py-0.5 rounded-full">React</span>
          <span className="text-xs bg-blue-900/40 text-blue-300 px-1.5 py-0.5 rounded-full">JS</span>
          <span className="text-xs bg-blue-900/40 text-blue-300 px-1.5 py-0.5 rounded-full">Design</span>
        </div>
        <button
        onClick={handleStartTest}
        className="w-full bg-blue-700 hover:bg-blue-600 text-white text-sm py-1.5 rounded-lg transition-colors">
          Start Test Now
        </button>
      </div>
      
      <div className="flex justify-between text-md">
        <div>
          <p className="text-gray-400">Available</p>
          <p className="text-white font-bold">12</p>
        </div>
        <div>
          <p className="text-gray-400">Completed</p>
          <p className="text-white font-bold">5</p>
        </div>
        <div>
          <p className="text-gray-400">Avg. Score</p>
          <p className="text-white font-bold">72%</p>
        </div>
      </div>
    </div>
  );
};

export default MockTestCard;