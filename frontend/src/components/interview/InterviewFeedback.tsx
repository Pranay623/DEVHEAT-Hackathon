import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronDown, ChevronRight, ExternalLink, ThumbsDown, ThumbsUp } from 'react-feather';
import { Button } from '../ui/button';

interface Question {
  id: number;
  text: string;
  category: string;
  difficulty: string;
}

interface Answer {
  questionId: number;
  text: string;
  timeSpent: number;
}

interface FeedbackData {
  overallScore: number;
  strengths: string[];
  improvements: string[];
  suggestions: { title: string; url: string }[];
  detailedFeedback: { questionId: number; feedback: string; score: number }[];
}

interface InterviewFeedbackProps {
  feedback: FeedbackData;
  questions: Question[];
  answers: Answer[];
  onRetry: () => void;
  onGoToDashboard: () => void;
}

const InterviewFeedback: React.FC<InterviewFeedbackProps> = ({ 
  feedback, 
  questions, 
  answers, 
  onRetry, 
  onGoToDashboard 
}) => {
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'summary' | 'detailed'>('summary');
  
  const toggleExpandQuestion = (questionId: number) => {
    setExpandedQuestions(prev => 
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 70) return 'text-blue-400';
    if (score >= 60) return 'text-amber-400';
    return 'text-red-400';
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#1e1e1e] rounded-xl shadow-lg border border-gray-800/50 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-5 border-b border-gray-800">
        <h2 className="text-xl font-bold text-white">Interview Feedback</h2>
        <p className="text-gray-300 text-sm mt-1">
          Review your performance and get personalized suggestions
        </p>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-800 bg-[#121212]">
        <div className="flex">
          <button
            className={`px-5 py-3 text-sm font-medium ${
              activeTab === 'summary' 
                ? 'text-white border-b-2 border-purple-500' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('summary')}
          >
            Summary
          </button>
          <button
            className={`px-5 py-3 text-sm font-medium ${
              activeTab === 'detailed' 
                ? 'text-white border-b-2 border-purple-500' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('detailed')}
          >
            Question Details
          </button>
        </div>
      </div>
      
      {/* Tab content */}
      <div className="p-6">
        {activeTab === 'summary' ? (
          <div className="space-y-6">
            {/* Score summary */}
            <div className="flex items-center p-4 bg-[#0f0f0f] rounded-lg">
              <div className="mr-6">
                <div className="text-lg text-gray-400">Overall Score</div>
                <div className={`text-4xl font-bold ${getScoreColor(feedback.overallScore)}`}>
                  {feedback.overallScore}
                </div>
              </div>
              <div className="flex-1">
                <div className="h-3 bg-gray-800 rounded-full">
                  <div 
                    className="h-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
                    style={{ width: `${feedback.overallScore}%` }}
                  />
                </div>
              </div>
            </div>
            
            {/* Strengths */}
            <div>
              <h3 className="text-lg font-medium text-white mb-2 flex items-center">
                <ThumbsUp size={16} className="mr-2 text-green-400" />
                Strengths
              </h3>
              <ul className="space-y-2">
                {feedback.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-2 mt-1 text-green-500">•</div>
                    <span className="text-gray-300">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Areas for improvement */}
            <div>
              <h3 className="text-lg font-medium text-white mb-2 flex items-center">
                <ThumbsDown size={16} className="mr-2 text-amber-400" />
                Areas for Improvement
              </h3>
              <ul className="space-y-2">
                {feedback.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-2 mt-1 text-amber-500">•</div>
                    <span className="text-gray-300">{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Recommended resources */}
            <div>
              <h3 className="text-lg font-medium text-white mb-2">
                Recommended Resources
              </h3>
              <div className="grid gap-2">
                {feedback.suggestions.map((suggestion, index) => (
                  <a 
                    key={index} 
                    href={suggestion.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-[#0f0f0f] border border-gray-800 hover:border-gray-700 rounded-lg text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span>{suggestion.title}</span>
                    <ExternalLink size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-gray-400 mb-6 text-sm">
              Expand each question to see your answer and specific feedback.
            </p>
            
            <div className="space-y-4">
              {questions.map((question, index) => {
                const answer = answers.find(a => a.questionId === question.id);
                const questionFeedback = feedback.detailedFeedback.find(f => f.questionId === question.id);
                const isExpanded = expandedQuestions.includes(question.id);
                
                return (
                  <div 
                    key={question.id} 
                    className="border border-gray-800 rounded-lg overflow-hidden bg-[#0f0f0f]"
                  >
                    {/* Question header - always visible */}
                    <div 
                      className="p-4 flex items-center justify-between cursor-pointer"
                      onClick={() => toggleExpandQuestion(question.id)}
                    >
                      <div>
                        <div className="flex items-center">
                          <span className="text-gray-400 mr-2">Q{index + 1}.</span>
                          <span className="text-white font-medium">
                            {question.text.length > 60 
                              ? question.text.substring(0, 60) + '...' 
                              : question.text}
                          </span>
                        </div>
                        <div className="flex items-center mt-1 text-xs">
                          <span className={`mr-3 ${getScoreColor(questionFeedback?.score || 0)}`}>
                            {questionFeedback?.score || 0}/100
                          </span>
                          <span className="text-gray-500">
                            Response time: {formatTime(answer?.timeSpent || 0)}
                          </span>
                        </div>
                      </div>
                      {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </div>
                    
                    {/* Expanded content */}
                    {isExpanded && (
                      <div className="bg-[#121212] p-4 border-t border-gray-800">
                        {/* Question */}
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-400 mb-2">Question:</h4>
                          <p className="text-white">{question.text}</p>
                        </div>
                        
                        {/* Your answer */}
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-400 mb-2">Your Answer:</h4>
                          <div className="p-3 bg-[#0a0a0a] border border-gray-800 rounded-lg">
                            <p className="text-gray-300 whitespace-pre-wrap">
                              {answer?.text || 'No answer provided'}
                            </p>
                          </div>
                        </div>
                        
                        {/* Feedback */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-400 mb-2">Feedback:</h4>
                          <div className="p-3 bg-[#0a0a0a] border border-gray-800 rounded-lg">
                            <p className="text-gray-300">
                              {questionFeedback?.feedback || 'No feedback available'}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      
      {/* Footer actions */}
      <div className="border-t border-gray-800 bg-[#121212] p-4 flex justify-between">
        <Button
          onClick={onGoToDashboard}
          className="px-5 text-sm flex items-center bg-transparent hover:bg-gray-800"
        >
          <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
        </Button>
        <Button
          onClick={onRetry}
          className="px-5 py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white"
        >
          Try Another Interview
        </Button>
      </div>
    </motion.div>
  );
};

export default InterviewFeedback;