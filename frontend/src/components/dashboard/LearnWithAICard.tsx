import React from 'react';
import { MessageCircle } from 'react-feather';

const LearnWithAICard: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-emerald-900/30 to-teal-700/30 p-4 rounded-xl shadow-lg border border-emerald-900/50 h-[232px] flex flex-col">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-lg font-bold text-white">Learn with AI</h3>
          <p className="text-gray-300 text-xs">Personalized guidance</p>
        </div>
        <div className="bg-emerald-900/60 p-1.5 rounded-lg">
          <MessageCircle size={16} className="text-emerald-300" />
        </div>
      </div>
      
      <div className="space-y-2 mb- flex-grow">
        <div className="flex items-start space-x-2">
          <div className="w-6 h-6 rounded-full bg-emerald-900/60 flex items-center justify-center flex-shrink-0 mt-1">
            <span className="text-md text-emerald-300">AI</span>
          </div>
          <div className="bg-black/20 rounded-lg p-2 text-md text-gray-300 border border-emerald-900/30 flex-1">
            I can help you prepare for your upcoming interview. What area would you like to focus on?
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-1 mb-3">
        <button className="bg-black/30 hover:bg-black/50 text-white text-xs px-2 py-1 rounded-full border border-emerald-900/40 transition-all">
          System
        </button>
        <button className="bg-black/30 hover:bg-black/50 text-white text-xs px-2 py-1 rounded-full border border-emerald-900/40 transition-all">
          Data
        </button>
        <button className="bg-black/30 hover:bg-black/50 text-white text-xs px-2 py-1 rounded-full border border-emerald-900/40 transition-all">
          JavaScript
        </button>
        <button className="bg-black/30 hover:bg-black/50 text-white text-xs px-2 py-1 rounded-full border border-emerald-900/40 transition-all">
          Behavior
        </button>
      </div>
      
      <button className="w-full bg-emerald-700 hover:bg-emerald-600 text-white text-sm py-1.5 rounded-lg transition-colors">
        Start Learning Session
      </button>
    </div>
  );
};

export default LearnWithAICard;