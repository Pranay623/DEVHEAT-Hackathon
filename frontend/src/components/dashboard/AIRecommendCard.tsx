import React from 'react';
import { Zap } from 'react-feather';

const recommendations = [
  {
    id: 1,
    title: "System Design Interview",
    difficulty: "Advanced",
    relevance: "95%",
    topics: ["Scalability", "Database", "API Design"]
  },
  {
    id: 2,
    title: "JavaScript Algorithms",
    difficulty: "Intermediate",
    relevance: "87%",
    topics: ["Sorting", "Trees", "DP"]
  }
];

const AIRecommendCard: React.FC = () => {
  return (
    <div className="bg-[#1e1e1e] p-4 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold text-white">AI Recommended</h3>
        <div className="bg-amber-700/30 p-1 rounded-lg">
          <Zap size={14} className="text-amber-400" />
        </div>
      </div>
      
      <div className="space-y-2">
        {recommendations.map(rec => (
          <div key={rec.id} className="bg-black/20 border border-gray-800 rounded-lg p-2">
            <div className="flex justify-between mb-1">
              <h4 className="font-medium text-white text-sm">{rec.title}</h4>
              <span className="text-md bg-amber-900/50 text-amber-300 px-1.5 py-0.5 rounded">
                {rec.relevance}
              </span>
            </div>
            <div className="text-md text-gray-400 mb-2">
              {rec.difficulty} • {rec.topics.join(", ")}
            </div>
            <button className="w-full text-xs bg-black/30 hover:bg-black/50 text-white py-1 rounded border border-gray-700 transition-all">
              Start Practice
            </button>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-2 text-md text-purple-400 hover:text-purple-300">
        View all recommendations →
      </button>
    </div>
  );
};

export default AIRecommendCard;