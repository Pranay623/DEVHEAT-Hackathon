import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import InterviewSetup from '../components/interview/InterviewSetup';
import InterviewSession from '../components/interview/InterviewSession';
import InterviewCompletion from '../components/interview/InterviewCompletion';
import InterviewFeedback from '../components/interview/InterviewFeedback';
import { Clock, AlertCircle } from 'react-feather';

// Types
type InterviewStep = 'setup' | 'session' | 'completion' | 'feedback';
type InterviewType = 'text' | 'voice' | 'behavioral' | 'technical';
type ExperienceLevel = 'fresher' | 'intermediate' | 'experienced';

interface SetupData {
  role: string;
  experience: ExperienceLevel;
  company: string;
  interviewType: InterviewType;
}

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

const MockInterviewScreen: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<InterviewStep>('setup');
  const [setupData, setSetupData] = useState<SetupData | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [remainingCredits, setRemainingCredits] = useState<number>(300);
  
  const userId = localStorage.getItem('userID');

  // Fetch user credits on component mount
  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const response = await fetch(`https://devheat-hackathon-14ll.vercel.app/api/credits/points/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setRemainingCredits(data.credits);
        }
      } catch (err) {
        console.error('Failed to fetch credits:', err);
      }
    };
    
    if (userId) fetchCredits();
  }, [userId]);

  const handleSetupComplete = async (data: SetupData) => {
    setSetupData(data);
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, you'd call your ML service here
      // For demo purposes, we'll simulate an API call with mock data
      const mockQuestions: Question[] = [
        {
          id: 1,
          text: `As a ${data.role} at ${data.company}, can you explain a complex technical challenge you faced and how you resolved it?`,
          category: 'problem-solving',
          difficulty: 'medium'
        },
        {
          id: 2,
          text: `Describe your experience with ${data.interviewType === 'technical' ? 'system design principles' : 'team conflicts'} and how you've applied them in your previous roles.`,
          category: data.interviewType === 'technical' ? 'system-design' : 'behavioral',
          difficulty: 'hard'
        },
        {
          id: 3,
          text: `What do you consider your biggest achievement in your previous ${data.experience} level role?`,
          category: 'experience',
          difficulty: 'medium'
        },
        {
          id: 4,
          text: `How do you stay updated with the latest trends in ${data.role}?`,
          category: 'professional-growth',
          difficulty: 'easy'
        },
        {
          id: 5,
          text: `Given your ${data.experience} experience level, how would you approach mentoring junior team members at ${data.company}?`,
          category: 'leadership',
          difficulty: 'medium'
        }
      ];
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setQuestions(mockQuestions);
      setStep('session');
    } catch (err) {
      console.error('Error generating questions:', err);
      setError('Failed to generate interview questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSubmit = (questionId: number, text: string, timeSpent: number) => {
    setAnswers(prev => [...prev, { questionId, text, timeSpent }]);
  };

  const handleSessionComplete = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, you'd call your API to analyze answers here
      // For demo purposes, we'll simulate an API call with mock feedback
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockFeedback: FeedbackData = {
        overallScore: 78,
        strengths: [
          'Clear communication of technical concepts',
          'Good examples of past experience',
          'Demonstrated problem-solving abilities'
        ],
        improvements: [
          'Be more concise in responses',
          'Provide more quantifiable results',
          'Include more company-specific knowledge'
        ],
        suggestions: [
          { 
            title: 'Advanced System Design Patterns', 
            url: 'https://github.com/donnemartin/system-design-primer' 
          },
          { 
            title: 'Behavioral Interview Techniques', 
            url: 'https://leetcode.com/discuss/interview-experience/' 
          }
        ],
        detailedFeedback: questions.map(question => ({
          questionId: question.id,
          feedback: `Your answer was ${Math.random() > 0.5 ? 'well-structured' : 'informative'} but could benefit from more ${Math.random() > 0.5 ? 'specific examples' : 'technical details'}.`,
          score: Math.floor(Math.random() * 30) + 65 // Random score between 65-95
        }))
      };
      
      setFeedback(mockFeedback);
      setStep('completion');
    } catch (err) {
      console.error('Error analyzing answers:', err);
      setError('Failed to analyze your responses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewFeedback = () => {
    setStep('feedback');
  };

  const handleRetryInterview = () => {
    setStep('setup');
    setQuestions([]);
    setAnswers([]);
    setFeedback(null);
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="bg-[#121212] shadow-md p-4 mb-6 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">Mock Interview</h1>
          
          <div className="flex items-center">
            <div className="text-sm text-gray-300 mr-6 hidden sm:block">
              <span className="mr-1">Available Credits:</span>
              <span className="font-semibold text-purple-300">{remainingCredits}</span>
            </div>
            
            {step === 'session' && (
              <div className="flex items-center text-amber-400">
                <Clock size={16} className="mr-1" />
                <span className="text-sm">Time tracked per question</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Loading/Error States */}
      {loading && (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-300">
            {step === 'setup' ? 'Generating your personalized interview...' : 'Analyzing your responses...'}
          </p>
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-900/30 border border-red-500/50 p-4 rounded-lg flex items-start mb-6">
          <AlertCircle size={20} className="text-red-400 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-white font-medium">Something went wrong</p>
            <p className="text-red-200 text-sm">{error}</p>
            <button 
              onClick={() => setError(null)}
              className="mt-2 text-red-300 text-sm underline hover:text-red-200"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {/* Main Content - Different steps of the interview process */}
      <AnimatePresence mode="wait">
        {!loading && !error && (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {step === 'setup' && (
              <InterviewSetup 
                onComplete={handleSetupComplete} 
                remainingCredits={remainingCredits}
              />
            )}

            {step === 'session' && setupData && questions.length > 0 && (
              <InterviewSession 
                questions={questions} 
                onAnswerSubmit={handleAnswerSubmit} 
                onComplete={handleSessionComplete} 
                interviewType={setupData.interviewType} 
              />
            )}

            {step === 'completion' && feedback && (
              <InterviewCompletion 
                score={feedback.overallScore} 
                onViewFeedback={handleViewFeedback} 
                onRetry={handleRetryInterview} 
                onGoToDashboard={handleGoToDashboard} 
              />
            )}

            {step === 'feedback' && feedback && questions && answers && (
              <InterviewFeedback 
                feedback={feedback} 
                questions={questions}
                answers={answers}
                onRetry={handleRetryInterview} 
                onGoToDashboard={handleGoToDashboard} 
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default MockInterviewScreen;