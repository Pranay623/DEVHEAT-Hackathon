import React from 'react';
import { Plus, Gift } from 'react-feather';

const CreditsCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-purple-900/30 to-purple-700/30 p-4 rounded-xl shadow-lg border border-purple-900/50 h-[232px]">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-bold text-white">Your Credits</h3>
          <p className="text-gray-300 text-xs">Premium features available</p>
        </div>
        <div className="bg-purple-900/60 p-1.5 rounded-lg">
          <Gift size={16} className="text-purple-300" />
        </div>
      </div>
      
      <div className="text-2xl font-bold text-white mb-2 mt-6">
        250 <span className="text-md font-normal text-purple-200">credits</span>
      </div>
      
      <div className="h-1.5 bg-gray-700 rounded-full mb-1">
        <div className="h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-purple-300" style={{ width: '45%' }}></div>
      </div>
      
      <div className="flex justify-between text-md text-gray-300 mb-6">
        <span>0</span>
        <span>500 credits</span>
      </div>
      
      <button className="flex items-center justify-center w-full bg-purple-700 hover:bg-purple-600 text-white py-1.5 px-3 text-sm rounded-lg transition-colors mt-auto">
        <Plus size={14} className="mr-1" />
        Purchase Credits
      </button>
    </div>
  );
};

export default CreditsCard;