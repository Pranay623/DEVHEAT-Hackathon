import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, BookOpen, Star, Check, Code, CheckCircle, FileText, ArrowRight } from 'react-feather';
import DashboardLayout from '../components/DashboardLayout';

interface QuestionCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
  color: string;
}

interface QuestionItem {
  id: string;
  question: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  answeredCount: number;
  tags: string[];
  isBookmarked: boolean;
  isCompleted: boolean;
}

const PracticeQuestions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'Easy' | 'Medium' | 'Hard' | null>(null);
  const [showCompleted, setShowCompleted] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

  const categories: QuestionCategory[] = [
    { id: 'frontend', name: 'Frontend', icon: <Code size={16} />, count: 128, color: 'text-blue-400' },
    { id: 'backend', name: 'Backend', icon: <FileText size={16} />, count: 96, color: 'text-green-400' },
    { id: 'system-design', name: 'System Design', icon: <BookOpen size={16} />, count: 64, color: 'text-purple-400' },
    { id: 'behavioral', name: 'Behavioral', icon: <Star size={16} />, count: 72, color: 'text-yellow-400' },
    { id: 'data-structures', name: 'Data Structures', icon: <Code size={16} />, count: 110, color: 'text-pink-400' },
  ];

  const questions: QuestionItem[] = [
    {
      id: '1',
      question: 'Explain the concept of closures in JavaScript and provide a practical example.',
      category: 'frontend',
      difficulty: 'Medium',
      answeredCount: 3247,
      tags: ['JavaScript', 'Fundamentals'],
      isBookmarked: true,
      isCompleted: true,
    },
    {
      id: '2',
      question: 'What are React hooks and how do they improve component logic organization?',
      category: 'frontend',
      difficulty: 'Medium',
      answeredCount: 2130,
      tags: ['React', 'Hooks'],
      isBookmarked: false,
      isCompleted: false,
    },
    {
      id: '3',
      question: 'Design a scalable system for a social media platform that supports millions of active users',
      category: 'system-design',
      difficulty: 'Hard',
      answeredCount: 1752,
      tags: ['Scaling', 'Database'],
      isBookmarked: true,
      isCompleted: false,
    },
    {
      id: '4',
      question: 'Implement a function to check if a binary tree is balanced',
      category: 'data-structures',
      difficulty: 'Medium',
      answeredCount: 1985,
      tags: ['Tree', 'Recursion'],
      isBookmarked: false,
      isCompleted: false,
    },
    {
      id: '5',
      question: 'Describe a situation where you had to handle a difficult team conflict and how you resolved it',
      category: 'behavioral',
      difficulty: 'Medium',
      answeredCount: 3421,
      tags: ['Teamwork', 'Conflict'],
      isBookmarked: false,
      isCompleted: true,
    },
    {
      id: '6',
      question: 'Explain RESTful API design principles and best practices',
      category: 'backend',
      difficulty: 'Easy',
      answeredCount: 2890,
      tags: ['API', 'REST'],
      isBookmarked: true,
      isCompleted: false,
    },
  ];

  // Filter questions based on search term, category, difficulty, and completion status
  const filteredQuestions = questions.filter((question) => {
    const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === null || question.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === null || question.difficulty === selectedDifficulty;
    const matchesCompletion = !showCompleted || question.isCompleted === showCompleted;
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesCompletion;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Easy': return 'text-green-500';
      case 'Medium': return 'text-yellow-500';
      case 'Hard': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.color || 'text-gray-400';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-[#121212] shadow-md p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center">
              <BookOpen size={24} className="text-purple-400 mr-2" />
              Practice Questions
            </h1>
            <p className="text-gray-400 mt-1">Sharpen your skills with our curated collection of interview questions</p>
          </div>
          
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search questions..."
                aria-label="Search questions"
                className="w-full bg-[#1a1a1a] text-white border border-gray-800 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:border-purple-500"
              />
            </div>
            
            <div className="relative">
              <button 
                className="bg-[#1a1a1a] text-white border border-gray-800 rounded-lg p-2 flex items-center justify-center hover:border-gray-700"
                aria-label="Filter questions"
                aria-expanded={filterMenuOpen}
                onClick={() => setFilterMenuOpen(!filterMenuOpen)}
              >
                <Filter size={16} className="text-gray-400" />
              </button>
              
              {filterMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-0 mt-2 w-64 bg-[#1a1a1a] border border-gray-800 rounded-lg shadow-lg p-3 z-10"
                >
                  <div className="mb-3">
                    <p className="text-gray-400 text-xs mb-1">Category</p>
                    <div className="grid grid-cols-2 gap-1">
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className={`text-xs px-2 py-1 rounded ${!selectedCategory ? 'bg-purple-900/40 text-purple-300' : 'bg-gray-800 text-gray-300'}`}
                        aria-pressed={selectedCategory === null}
                      >
                        All
                      </button>
                      {categories.map(category => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`text-xs px-2 py-1 rounded ${selectedCategory === category.id ? 'bg-purple-900/40 text-purple-300' : 'bg-gray-800 text-gray-300'}`}
                          aria-pressed={selectedCategory === category.id}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-gray-400 text-xs mb-1">Difficulty</p>
                    <div className="flex flex-wrap gap-1">
                      <button
                        onClick={() => setSelectedDifficulty(null)}
                        className={`text-xs px-2 py-1 rounded ${!selectedDifficulty ? 'bg-purple-900/40 text-purple-300' : 'bg-gray-800 text-gray-300'}`}
                        aria-pressed={selectedDifficulty === null}
                      >
                        All
                      </button>
                      {(['Easy', 'Medium', 'Hard'] as const).map(difficulty => (
                        <button
                          key={difficulty}
                          onClick={() => setSelectedDifficulty(difficulty)}
                          className={`text-xs px-2 py-1 rounded ${selectedDifficulty === difficulty ? 'bg-purple-900/40 text-purple-300' : 'bg-gray-800 text-gray-300'}`}
                          aria-pressed={selectedDifficulty === difficulty}
                        >
                          {difficulty}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <label className="flex items-center text-gray-300 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showCompleted}
                      onChange={() => setShowCompleted(!showCompleted)}
                      className="rounded bg-gray-800 border-gray-700 text-purple-600 mr-2"
                      aria-label="Show only completed questions"
                    />
                    Show only completed
                  </label>
                  
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedDifficulty(null);
                      setShowCompleted(false);
                      setSearchTerm('');
                      setFilterMenuOpen(false);
                    }}
                    className="mt-3 w-full text-xs text-purple-400 hover:text-purple-300"
                    aria-label="Clear all filters"
                  >
                    Clear all filters
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      
        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
              className={`p-4 rounded-lg flex flex-col items-center justify-center transition-all ${
                category.id === selectedCategory 
                  ? 'bg-purple-900/30 border border-purple-500/50' 
                  : 'bg-[#121212] border border-gray-800 hover:border-gray-700'
              }`}
              aria-pressed={category.id === selectedCategory}
            >
              <div className={`p-3 rounded-full ${category.id === selectedCategory ? 'bg-purple-900/30' : 'bg-gray-800'} mb-2`}>
                <span className={category.color}>{category.icon}</span>
              </div>
              <span className="text-white font-medium text-sm">{category.name}</span>
              <span className="text-gray-400 text-xs">{category.count} questions</span>
            </button>
          ))}
        </div>
      
        {/* Questions */}
        <div className="bg-[#121212] rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-purple-900/30 to-purple-700/10 p-4 border-b border-gray-800 flex justify-between items-center">
            <h2 className="text-white font-semibold">Questions</h2>
            <span className="text-gray-400 text-sm">{filteredQuestions.length} questions found</span>
          </div>
          
          {filteredQuestions.length > 0 ? (
            <div className="divide-y divide-gray-800">
              {filteredQuestions.map(question => (
                <div 
                  key={question.id}
                  className="p-4 hover:bg-gray-900/30 transition-colors"
                >
                  <div className="flex items-start mb-2">
                    <div className="flex-grow">
                      <h3 className="text-white font-medium text-lg group">
                        <a href={`/practice/question/${question.id}`} className="hover:text-purple-400 focus:text-purple-400 focus:outline-none">
                          {question.question}
                          <ArrowRight size={16} className="ml-1 inline-block opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </h3>
                    </div>
                    <div className="flex items-center space-x-2 ml-2">
                      {question.isBookmarked && (
                        <span className="text-yellow-400" aria-label="Bookmarked question">
                          <Star size={16} fill="currentColor" />
                        </span>
                      )}
                      {question.isCompleted && (
                        <span className="text-green-500" aria-label="Completed question">
                          <CheckCircle size={16} />
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-between">
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <span className={`${getCategoryColor(question.category)} bg-gray-800 px-2 py-0.5 rounded-full text-xs`}>
                        {categories.find(c => c.id === question.category)?.name}
                      </span>
                      <span className={`${getDifficultyColor(question.difficulty)} text-xs`}>
                        {question.difficulty}
                      </span>
                      <span className="text-gray-400 text-xs flex items-center">
                        <Check size={12} className="mr-1" /> 
                        {question.answeredCount.toLocaleString()} answers
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-2 sm:mt-0">
                      {question.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="bg-gray-800 text-gray-300 text-xs px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-gray-400">No questions found matching your criteria</p>
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedDifficulty(null);
                  setShowCompleted(false);
                  setSearchTerm('');
                }}
                className="mt-2 text-sm text-purple-400 hover:text-purple-300"
              >
                Clear filters and try again
              </button>
            </div>
          )}
          
          {filteredQuestions.length > 0 && (
            <div className="p-4 border-t border-gray-800 flex justify-center">
              <button className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center">
                Load more questions <ArrowRight size={14} className="ml-1" />
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PracticeQuestions;