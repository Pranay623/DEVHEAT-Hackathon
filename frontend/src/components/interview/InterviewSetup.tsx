import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, HelpCircle } from 'react-feather';
import { Button } from '../ui/button';

type InterviewType = 'text' | 'voice' | 'behavioral' | 'technical';
type ExperienceLevel = 'fresher' | 'intermediate' | 'experienced';

interface InterviewSetupProps {
  onComplete: (data: {
    role: string;
    experience: ExperienceLevel;
    company: string;
    interviewType: InterviewType;
  }) => void;
  remainingCredits: number;
}

const InterviewSetup: React.FC<InterviewSetupProps> = ({ onComplete, remainingCredits }) => {
  const [role, setRole] = useState<string>('');
  const [experience, setExperience] = useState<ExperienceLevel>('intermediate');
  const [company, setCompany] = useState<string>('');
  const [interviewType, setInterviewType] = useState<InterviewType>('behavioral');
  const [step, setStep] = useState<number>(1);
  
  const handleNextStep = () => {
    if (step === 1 && role && experience && company) {
      setStep(2);
    }
  };
  
  const handleSubmit = () => {
    onComplete({
      role,
      experience,
      company,
      interviewType
    });
  };
  
  const jobRoles = [
    'Software Engineer',
    'Data Scientist',
    'Product Manager',
    'UX Designer',
    'DevOps Engineer',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Mobile Developer',
    'ML Engineer',
    'AI Researcher',
    'Cloud Engineer'
  ];
  
  const popularCompanies = [
    'Google',
    'Microsoft',
    'Amazon',
    'Apple',
    'Meta',
    'Netflix',
    'Salesforce',
    'Adobe',
    'IBM',
    'Oracle',
    'Intel',
    'Uber',
    'Airbnb'
  ];
  
  return (
    <div>
      {/* Credit notice */}
      <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 mb-6">
        <p className="text-purple-200 text-sm flex items-center">
          <HelpCircle size={16} className="mr-2 text-purple-400" />
          <span>This interview will use <span className="font-bold">30 credits</span>. You have {remainingCredits} credits available.</span>
        </p>
      </div>
      
      {/* Card container */}
      <div className="bg-[#1e1e1e] rounded-xl shadow-lg border border-gray-800/50 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 p-5 border-b border-purple-900/20">
          <h2 className="text-xl font-bold text-white">Let's customize your mock interview</h2>
          <p className="text-gray-300 text-sm mt-1">
            We'll generate AI-powered questions tailored to your specific needs
          </p>
        </div>
        
        {/* Step indicator */}
        <div className="bg-[#121212] px-5 py-2 flex justify-between">
          <div className="flex items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              step === 1 ? 'bg-purple-600' : 'bg-purple-600'
            } text-xs font-bold`}>
              1
            </div>
            <span className="ml-2 text-sm text-white">Role & Company</span>
          </div>
          
          <div className="flex items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              step === 2 ? 'bg-purple-600' : 'bg-gray-700'
            } text-xs font-bold`}>
              2
            </div>
            <span className={`ml-2 text-sm ${step === 2 ? 'text-white' : 'text-gray-400'}`}>
              Interview Type
            </span>
          </div>
        </div>
        
        {/* Main content */}
        <div className="p-6">
          {step === 1 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Role Selection */}
              <div className="mb-5">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Job Role
                </label>
                <div className="relative">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="block w-full bg-[#121212] text-white rounded-lg border border-gray-700 px-4 py-2.5 appearance-none focus:outline-none focus:border-purple-500"
                    required
                  >
                    <option value="" disabled>Select your target role</option>
                    {jobRoles.map((job) => (
                      <option key={job} value={job}>{job}</option>
                    ))}
                    <option value="other">Other (Custom)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                    <ChevronRight size={16} className="transform rotate-90" />
                  </div>
                </div>
                {role === 'other' && (
                  <input
                    type="text"
                    placeholder="Enter your job role"
                    className="mt-2 block w-full bg-[#121212] text-white rounded-lg border border-gray-700 px-4 py-2.5 focus:outline-none focus:border-purple-500"
                    onChange={(e) => setRole(e.target.value)}
                  />
                )}
              </div>
              
              {/* Experience Level */}
              <div className="mb-5">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Experience Level
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['fresher', 'intermediate', 'experienced'] as ExperienceLevel[]).map((exp) => (
                    <button
                      key={exp}
                      type="button"
                      className={`py-2 px-4 rounded-lg border focus:outline-none transition-colors ${
                        experience === exp 
                          ? 'bg-purple-900/40 border-purple-500 text-white' 
                          : 'bg-[#121212] border-gray-700 text-gray-300 hover:border-gray-500'
                      }`}
                      onClick={() => setExperience(exp)}
                    >
                      {exp.charAt(0).toUpperCase() + exp.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Target Company */}
              <div className="mb-5">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Target Company (Optional)
                </label>
                <div className="relative">
                  <select
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="block w-full bg-[#121212] text-white rounded-lg border border-gray-700 px-4 py-2.5 appearance-none focus:outline-none focus:border-purple-500"
                  >
                    <option value="">Any company</option>
                    {popularCompanies.map((comp) => (
                      <option key={comp} value={comp}>{comp}</option>
                    ))}
                    <option value="other">Other (Custom)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                    <ChevronRight size={16} className="transform rotate-90" />
                  </div>
                </div>
                {company === 'other' && (
                  <input
                    type="text"
                    placeholder="Enter company name"
                    className="mt-2 block w-full bg-[#121212] text-white rounded-lg border border-gray-700 px-4 py-2.5 focus:outline-none focus:border-purple-500"
                    onChange={(e) => setCompany(e.target.value)}
                  />
                )}
              </div>
              
              <div className="mt-8 flex justify-end">
                <Button
                  onClick={handleNextStep}
                  disabled={!role || !experience}
                  className={`px-6 py-2 rounded-lg flex items-center ${
                    !role || !experience 
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  <span>Next: Select Interview Type</span>
                  <ChevronRight size={16} className="ml-1" />
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h3 className="text-white font-medium text-lg mb-4">Select Interview Type</h3>
              
              <div className="space-y-4">
                {/* Text-based interview */}
                <label className={`block rounded-lg p-4 border cursor-pointer transition-colors ${
                  interviewType === 'text' 
                    ? 'bg-purple-900/20 border-purple-500' 
                    : 'bg-[#121212] border-gray-700 hover:border-gray-500'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">Text-Based Mock Interview</div>
                      <div className="text-gray-400 text-sm mt-1">Type your answers to the questions</div>
                    </div>
                    <input
                      type="radio"
                      name="interviewType"
                      checked={interviewType === 'text'}
                      onChange={() => setInterviewType('text')}
                      className="text-purple-600 focus:ring-purple-500 h-4 w-4"
                    />
                  </div>
                </label>
                
                {/* Voice-based interview */}
                <label className={`block rounded-lg p-4 border cursor-pointer transition-colors ${
                  interviewType === 'voice' 
                    ? 'bg-purple-900/20 border-purple-500' 
                    : 'bg-[#121212] border-gray-700 hover:border-gray-500'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">Voice-Based Mock Interview</div>
                      <div className="text-gray-400 text-sm mt-1">
                        Respond via audio for realistic practice
                        <span className="ml-2 text-purple-400 text-xs border border-purple-500 rounded px-1">PRO</span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="interviewType"
                      checked={interviewType === 'voice'}
                      onChange={() => setInterviewType('voice')}
                      className="text-purple-600 focus:ring-purple-500 h-4 w-4"
                      disabled={remainingCredits < 50}
                    />
                  </div>
                </label>
                
                {/* Behavioral interview */}
                <label className={`block rounded-lg p-4 border cursor-pointer transition-colors ${
                  interviewType === 'behavioral' 
                    ? 'bg-purple-900/20 border-purple-500' 
                    : 'bg-[#121212] border-gray-700 hover:border-gray-500'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">Behavioral Interview</div>
                      <div className="text-gray-400 text-sm mt-1">Practice HR and situational questions</div>
                    </div>
                    <input
                      type="radio"
                      name="interviewType"
                      checked={interviewType === 'behavioral'}
                      onChange={() => setInterviewType('behavioral')}
                      className="text-purple-600 focus:ring-purple-500 h-4 w-4"
                    />
                  </div>
                </label>
                
                {/* Technical interview */}
                <label className={`block rounded-lg p-4 border cursor-pointer transition-colors ${
                  interviewType === 'technical' 
                    ? 'bg-purple-900/20 border-purple-500' 
                    : 'bg-[#121212] border-gray-700 hover:border-gray-500'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">Technical Interview</div>
                      <div className="text-gray-400 text-sm mt-1">Focus on technical skills and problem-solving</div>
                    </div>
                    <input
                      type="radio"
                      name="interviewType"
                      checked={interviewType === 'technical'}
                      onChange={() => setInterviewType('technical')}
                      className="text-purple-600 focus:ring-purple-500 h-4 w-4"
                    />
                  </div>
                </label>
              </div>
              
              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-2 rounded-lg text-white border border-gray-700 hover:border-gray-500"
                >
                  Back
                </button>
                
                <Button
                  onClick={handleSubmit}
                  className="px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium"
                >
                  Start Interview
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewSetup;