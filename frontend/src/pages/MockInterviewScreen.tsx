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
type InterviewType = 'logical' | 'voice' | 'behavioral' | 'technical';
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
      const questions: Question[] = [];
  
      // Determine API endpoint based on interviewType
      let apiUrl = 'https://job-e0jn.onrender.com/mock-interview'; // default for technical
      if (data.interviewType === 'behavioral') {
        apiUrl = 'https://behaviouranalysisagent.onrender.com/behavioral-interview';
      } else if (data.interviewType === 'logical') {
        apiUrl = 'https://logiaclagent-1.onrender.com/logical-ability';
      }
  
      // Fetch 5 questions dynamically
      for (let i = 0; i < 5; i++) {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            role: data.role,
            experience_level: data.experience,
            target_company: data.company,
          }),
        });
  
        const result = await response.json();
  
        if (response.ok && result.question) {
          const rawQuestion = result.question;

            // Basic cleanup utility
            const formatQuestionText = (text: string) => {
              // Remove markdown-style **bold** markers
              let cleaned = text.replace(/\*\*(.*?)\*\*/g, '$1');

              // Replace multiple newlines with just two
              cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

              // Trim leading/trailing spaces
              cleaned = cleaned.trim();

              return cleaned;
            };

            const formattedText = formatQuestionText(rawQuestion);

          questions.push({
            id: i + 1,
            text: formattedText,
            category: data.interviewType === 'behavioral' ? 'behavioral' : data.interviewType === 'logical' ? 'logical-thinking' : 'technical',
            difficulty: 'medium',
          });
        } else {
          throw new Error(result.message || 'Failed to fetch a question');
        }
      }
  
      setQuestions(questions);
      setStep('session');
    } catch (err: any) {
      console.error('Error fetching interview questions:', err);
      setError('Failed to fetch interview questions. Please try again.');
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
      const apiKey = 'AIzaSyDm1y_Pjd_SGWoZ0kkyVta8tcsnPjFFCiE'; // Replace with your actual API key
      const geminiEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + apiKey;
  
      let totalScore = 0;
    let detailedFeedback: FeedbackData['detailedFeedback'] = [];
    let laggingAreas: string[] = [];

    for (const answer of answers) {
      const question = questions.find(q => q.id === answer.questionId);
      if (!question) continue;

      const prompt = `
        Analyze the following interview question and user's answer.

        Question: "${question.text}"
        User's Answer: "${answer.text}"

        1. Evaluate the correctness of the answer out of 100% based on how well it responds to the question.
        2. Identify the main area this question belongs to (like algorithms, communication, problem-solving, etc.).
        3. Just output in JSON with fields:
          {
            "score": [number from 0-100],
            "lagging_area": "[if any]",
            "feedback": "[brief reasoning for the score]"
          }
      `;

      const response = await fetch(geminiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      const data = await response.json();
      const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!content) {
        console.warn(`No content returned for question ${question.id}`);
        continue;
      }

      try {
        const parsed = JSON.parse(content.trim());
        totalScore += parsed.score;

        if (parsed.lagging_area && !laggingAreas.includes(parsed.lagging_area)) {
          laggingAreas.push(parsed.lagging_area);
        }

        detailedFeedback.push({
          questionId: answer.questionId,
          feedback: parsed.feedback,
          score: parsed.score,
        });
      } catch (parseError) {
        console.error('Failed to parse Gemini response:', content, parseError);
        continue;
      }
    }

    const averageScore = answers.length > 0 ? Math.round(totalScore / answers.length) : 0;

    const feedbackData: FeedbackData = {
      overallScore: averageScore,
      strengths: [], // You can populate this based on score if needed
      improvements: laggingAreas,
      suggestions: [], // Optional: add suggestions based on categories
      detailedFeedback,
    };

    setFeedback(feedbackData);
    setStep('completion');
  } catch (err) {
    console.error('Error analyzing answers with Gemini:', err);
    setError('Failed to analyze your responses using Gemini. Please try again.');
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