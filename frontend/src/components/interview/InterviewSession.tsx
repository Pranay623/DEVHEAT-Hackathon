import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, AlertCircle, ChevronLeft, ChevronRight, Clock, Send } from 'react-feather';
import ReactMarkdown from 'react-markdown';

interface Question {
  id: number;
  text: string;
  category: string;
  difficulty: string;
}

interface InterviewSessionProps {
  questions: Question[];
  interviewType: string;
  onAnswerSubmit: (questionId: number, text: string, timeSpent: number) => void;
  onComplete: () => void;
}

const InterviewSession: React.FC<InterviewSessionProps> = ({ 
  questions, 
  interviewType, 
  onAnswerSubmit, 
  onComplete 
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answer, setAnswer] = useState<string>('');
  const [timer, setTimer] = useState<number>(0);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const answerRef = useRef<HTMLTextAreaElement>(null);
  
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  
  useEffect(() => {
    // Start the timer when a new question appears
    timerRef.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    
    // Focus the answer field
    if (answerRef.current) {
      answerRef.current.focus();
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentQuestionIndex]);
  
  const handleSubmit = () => {
    if (answer.trim()) {
      onAnswerSubmit(currentQuestion.id, answer, timer);
      setHasAnswered(true);
      setCompletedQuestions(prev => [...prev, currentQuestion.id]);
      
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };
  
  const handleNext = () => {
    // If not answered yet, submit the current answer
    if (!hasAnswered) {
      handleSubmit();
    }
    
    // If last question, complete the interview
    if (isLastQuestion) {
      onComplete();
      return;
    }
    
    // Move to next question
    setCurrentQuestionIndex(prev => prev + 1);
    setAnswer('');
    setTimer(0);
    setHasAnswered(false);
  };
  
  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setAnswer('');
      setTimer(0);
      setHasAnswered(false);
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty.toLowerCase()) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };
  
  // Mock voice recording function
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // Simulate voice recording
      setTimeout(() => {
        setAnswer(prev => prev + " [Voice transcription would appear here]");
        setIsRecording(false);
      }, 3000);
    }
  };

  return (
    <div className="bg-[#1e1e1e] rounded-xl shadow-lg border border-gray-800/50 overflow-hidden">
      {/* Progress header */}
      <div className="bg-[#121212] px-5 py-3 border-b border-gray-800">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-white text-sm font-medium">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <div className="ml-4 flex items-center">
              <Clock size={14} className="mr-1 text-amber-400" />
              <span className="text-amber-400 text-xs font-medium">{formatTime(timer)}</span>
            </div>
          </div>
          
          {/* Progress indicators */}
          <div className="flex space-x-1">
            {questions.map((q, index) => (
              <div 
                key={q.id}
                className={`h-1.5 w-6 rounded-full ${
                  completedQuestions.includes(q.id) 
                    ? 'bg-purple-500' 
                    : currentQuestionIndex === index 
                    ? 'bg-amber-500' 
                    : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            {/* Question difficulty and category */}
            <div className="flex mb-2 text-xs">
              <span className={`${getDifficultyColor(currentQuestion.difficulty)} font-medium mr-2`}>
                {currentQuestion.difficulty.toUpperCase()}
              </span>
              <span className="text-gray-400">
                {currentQuestion.category.split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </span>
            </div>
            
            {/* Question text */}
            <div className="prose prose-invert max-w-none text-white">
  <ReactMarkdown>{currentQuestion.text}</ReactMarkdown>
</div>
          </motion.div>
        </AnimatePresence>
        
        {/* Guidance text */}
        <div className="mb-4 text-sm text-gray-400">
          <p>
            {hasAnswered 
              ? "You've submitted your answer. Review or continue to the next question."
              : "Take your time to formulate a comprehensive answer. Aim for clarity and structure."}
          </p>
        </div>
        
        {/* Answer textarea */}
        <div className="relative mb-4">
          <textarea
            ref={answerRef}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            disabled={hasAnswered}
            className={`w-full min-h-[200px] bg-[#0f0f0f] text-white rounded-lg border border-gray-700 p-4 focus:outline-none focus:border-purple-500 transition-all ${
              hasAnswered ? 'bg-[#0f0f0f]/50 border-gray-700/50' : ''
            }`}
          />
          
          {/* Character count */}
          <div className="absolute bottom-3 right-3 text-xs text-gray-500">
            {answer.length} chars
          </div>
        </div>
        
        {/* Voice recording button (for voice interviews) */}
        {interviewType === 'voice' && (
          <div className="mb-4 flex justify-center">
            <button
              className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-full ${
                isRecording
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-[#0f0f0f] border border-gray-700 hover:border-gray-500'
              }`}
              onClick={toggleRecording}
              disabled={hasAnswered}
            >
              <Mic size={16} className={isRecording ? 'animate-pulse' : ''} />
              <span>{isRecording ? 'Recording...' : 'Record Answer'}</span>
            </button>
          </div>
        )}
        
        {/* Timer warning */}
        {timer > 180 && !hasAnswered && (
          <div className="mb-4 flex items-start p-3 bg-amber-900/20 border border-amber-500/30 rounded">
            <AlertCircle size={16} className="text-amber-400 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-sm text-amber-200">
              You've spent {formatTime(timer)} on this question. It's good to be thorough, but also practice being concise.
            </p>
          </div>
        )}
        
        {/* Navigation buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className={`flex items-center space-x-1 px-4 py-2 rounded-lg ${
              currentQuestionIndex === 0 
                ? 'text-gray-500 cursor-not-allowed' 
                : 'text-white hover:bg-[#0f0f0f]'
            }`}
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>
          
          <div className="space-x-3">
            {!hasAnswered && (
              <button
                onClick={handleSubmit}
                disabled={!answer.trim()}
                className={`flex items-center space-x-1 px-4 py-2 rounded-lg ${
                  !answer.trim()
                    ? 'bg-gray-800 text-gray-400 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                <span>Submit</span>
                <Send size={16} />
              </button>
            )}
            
            <button
              onClick={handleNext}
              className={`flex items-center space-x-1 px-4 py-2 rounded-lg ${
                isLastQuestion 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isLastQuestion ? (
                <span>Complete Interview</span>
              ) : (
                <>
                  <span>Next Question</span>
                  <ChevronRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewSession;