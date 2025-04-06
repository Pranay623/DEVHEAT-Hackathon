import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Check, } from 'react-feather';
import { Link } from 'react-router-dom';
import { QuestionItem } from '../types/question';
import { RELATED_QUESTIONS_BY_TAG, RELATED_QUESTIONS_BY_CATEGORY } from '../constants/relatedQuestions';

interface RelatedQuestionsProps {
  currentQuestionId?: string;
  tag?: string;
  category?: string;
  limit?: number;
  onClose?: () => void;
}

const RelatedQuestions: React.FC<RelatedQuestionsProps> = ({
  currentQuestionId,
  tag,
  category,
  limit = 3,
  onClose
}) => {
  // Get related questions based on tag or category
  const relatedQuestions = useMemo(() => {
    let questions: QuestionItem[] = [];
    
    if (tag && RELATED_QUESTIONS_BY_TAG[tag]) {
      questions = RELATED_QUESTIONS_BY_TAG[tag];
    } else if (category && RELATED_QUESTIONS_BY_CATEGORY[category]) {
      questions = RELATED_QUESTIONS_BY_CATEGORY[category];
    }
    
    // Filter out the current question if we have an ID
    if (currentQuestionId) {
      questions = questions.filter(q => q.id !== currentQuestionId);
    }
    
    // Limit the number of questions shown
    return questions.slice(0, limit);
  }, [tag, category, currentQuestionId, limit]);
  
  if (relatedQuestions.length === 0) {
    return null;
  }
  
  const getDifficultyBadgeColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-900/30 text-green-400 border-green-900/40';
      case 'Medium': return 'bg-yellow-900/30 text-yellow-400 border-yellow-900/40';
      case 'Hard': return 'bg-red-900/30 text-red-400 border-red-900/40';
      default: return 'bg-gray-800 text-gray-400 border-gray-700';
    }
  };

  return (
    <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-medium flex items-center">
          <BookOpen size={16} className="text-purple-400 mr-2" />
          Related {tag ? `"${tag}"` : 'Questions'}
        </h3>
        {onClose && (
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-300"
            aria-label="Close related questions"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>
      
      <div className="space-y-3">
        {relatedQuestions.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800 rounded-lg p-3 border border-gray-700 hover:border-gray-600 transition-colors"
          >
            <Link 
              to={`/practice/question/${question.id}`}
              className="block"
            >
              <h4 className="text-white text-sm font-medium mb-2 line-clamp-2 hover:text-purple-300 transition-colors">
                {question.question}
              </h4>
              
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex items-center gap-2 mb-2 sm:mb-0">
                  <span className={`${getDifficultyBadgeColor(question.difficulty)} text-xs px-1.5 py-0.5 rounded-full border`}>
                    {question.difficulty}
                  </span>
                  <span className="text-gray-400 text-xs flex items-center">
                    <Check size={10} className="mr-1" />
                    {question.answeredCount.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {question.tags.slice(0, 2).map(tagName => (
                    <span 
                      key={tagName} 
                      className="bg-gray-700 text-gray-300 text-xs px-1.5 py-0.5 rounded"
                    >
                      {tagName}
                    </span>
                  ))}
                  {question.tags.length > 2 && (
                    <span className="bg-gray-700 text-gray-300 text-xs px-1.5 py-0.5 rounded">
                      +{question.tags.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      
      <Link 
        to={tag ? `/practice-questions?tag=${tag}` : `/practice-questions?category=${category}`}
        className="mt-3 text-sm text-purple-400 hover:text-purple-300 flex items-center justify-center w-full py-2 border border-gray-700 hover:border-purple-700/30 rounded-lg transition-all"
      >
        View all related questions <ArrowRight size={14} className="ml-1" />
      </Link>
    </div>
  );
};

export default RelatedQuestions;