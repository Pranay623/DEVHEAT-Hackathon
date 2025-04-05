import React from 'react';
import { motion } from 'framer-motion';
import { Award, BarChart2, Home } from 'react-feather';
import { Button } from '../ui/button';
import confetti from 'canvas-confetti';

interface InterviewCompletionProps {
  score: number;
  onViewFeedback: () => void;
  onRetry: () => void;
  onGoToDashboard: () => void;
}

const InterviewCompletion: React.FC<InterviewCompletionProps> = ({ 
  score, 
  onViewFeedback, 
  onRetry, 
  onGoToDashboard 
}) => {
  // Trigger confetti effect on component mount
  React.useEffect(() => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const runConfetti = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#9333ea', '#8b5cf6', '#c084fc']
      });
      
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#9333ea', '#8b5cf6', '#c084fc']
      });

      if (Date.now() < end) {
        requestAnimationFrame(runConfetti);
      }
    };

    runConfetti();
  }, []);

  // Determine score level
  const getScoreLevel = () => {
    if (score >= 90) return { text: 'Excellent!', class: 'text-green-400' };
    if (score >= 75) return { text: 'Great job!', class: 'text-blue-400' };
    if (score >= 60) return { text: 'Good effort!', class: 'text-amber-400' };
    return { text: 'Keep practicing!', class: 'text-gray-400' };
  };

  const scoreLevel = getScoreLevel();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-xl mx-auto"
    >
      <div className="bg-[#1e1e1e] rounded-xl shadow-lg border border-gray-800/50 overflow-hidden">
        {/* Colorful header */}
        <div className="bg-gradient-to-r from-purple-900/60 to-indigo-900/60 p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Interview Complete!</h2>
          <p className="text-gray-200 text-sm">
            Great job completing your mock interview. Here's your performance summary.
          </p>
        </div>
        
        {/* Score circle */}
        <div className="flex flex-col items-center py-8">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="relative w-40 h-40 flex items-center justify-center"
          >
            {/* Circular progress */}
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#1a1a1a"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="8"
                strokeDasharray={2 * Math.PI * 40}
                strokeDashoffset={2 * Math.PI * 40 * (1 - score / 100)}
                transform="rotate(-90 50 50)"
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-white">{score}</span>
              <span className="text-gray-400 text-sm">Score</span>
            </div>
          </motion.div>
          
          <h3 className={`text-xl font-bold mt-4 ${scoreLevel.class}`}>
            {scoreLevel.text}
          </h3>
        </div>
        
        {/* Badges/achievements */}
        <div className="px-8 pb-4">
          <div className="flex justify-center space-x-4 mb-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-purple-900/20 border border-purple-500/30 flex items-center justify-center">
                <Award size={24} className="text-purple-400" />
              </div>
              <span className="text-xs text-gray-400 mt-2">Completed Interview</span>
            </motion.div>
            
            {score >= 70 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-blue-900/20 border border-blue-500/30 flex items-center justify-center">
                  <BarChart2 size={24} className="text-blue-400" />
                </div>
                <span className="text-xs text-gray-400 mt-2">High Performance</span>
              </motion.div>
            )}
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="border-t border-gray-800 px-8 py-6">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={onViewFeedback}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium"
            >
              View Detailed Feedback
            </Button>
            
            <Button
              onClick={onRetry}
              className="bg-transparent border border-gray-700 hover:bg-gray-800 text-gray-200"
            >
              Try Another Interview
            </Button>
            
            <Button
              onClick={onGoToDashboard}
              className="bg-transparent hover:bg-gray-800 text-gray-400"
            >
              <Home size={16} className="mr-1" /> Dashboard
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InterviewCompletion;