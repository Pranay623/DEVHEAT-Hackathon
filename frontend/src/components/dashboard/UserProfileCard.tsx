import React from 'react';
import { User, Award, Calendar, ChevronRight } from 'react-feather';

const UserProfileCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-[#1e1e1e] p-4 rounded-xl shadow-lg border border-gray-800/50 h-[232px] flex flex-col">
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
          <User size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">John Doe</h3>
          <div className="flex items-center flex-wrap">
            <span className="text-xs bg-purple-800/70 text-purple-300 px-1.5 py-0.5 rounded mr-1">
              Premium
            </span>
            <span className="text-gray-400 text-xs">Full Stack Dev</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-3 flex-grow">
        <div className="bg-black/20 p-2 rounded-lg border border-gray-800/50 flex flex-col justify-center">
          <div className="flex items-center text-gray-400 text-xs mb-0.5">
            <Award size={10} className="mr-1" />
            Achievements
          </div>
          <div className="text-white text-sm font-bold">12 Badges</div>
        </div>
        
        <div className="bg-black/20 p-2 rounded-lg border border-gray-800/50 flex flex-col justify-center">
          <div className="flex items-center text-gray-400 text-xs mb-0.5">
            <Calendar size={10} className="mr-1" />
            Practice Streak
          </div>
          <div className="text-white text-sm font-bold">5 Days</div>
        </div>
      </div>
      
      <button className="w-full flex justify-between items-center bg-black/30 hover:bg-black/50 text-white py-1.5 px-3 rounded-lg border border-gray-700 transition-all text-sm mt-auto">
        <span className="font-medium">Go to Profile</span>
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default UserProfileCard;