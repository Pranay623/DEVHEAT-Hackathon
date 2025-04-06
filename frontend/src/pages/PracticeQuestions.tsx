import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, BookOpen, Star, Check, Code, CheckCircle, FileText, ArrowRight, 
  Bookmark, Clock, Eye, Award, HelpCircle, BarChart2, Plus, 
} from 'react-feather';
import { Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import RelatedQuestions from '../components/RelatedQuestions';
import { RELATED_QUESTIONS_BY_TAG } from '../constants/relatedQuestions';

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
  timesAttempted?: number;
  lastAttempted?: string;
  avgTimeToSolve?: string;
  hasHints?: boolean;
  sampleAnswer?: string;
}

const PracticeQuestions: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'Easy' | 'Medium' | 'Hard' | null>(null);
  const [showCompleted, setShowCompleted] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'difficulty'>('popular');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [previewQuestion, setPreviewQuestion] = useState<QuestionItem | null>(null);
  const [showRelatedQuestions, setShowRelatedQuestions] = useState<boolean>(false);
  const [relatedTag, setRelatedTag] = useState<string | null>(null);
  
  const filterRef = useRef<HTMLDivElement>(null);
  
  // Close filter menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setFilterMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const categories: QuestionCategory[] = [
    { id: 'frontend', name: 'Frontend', icon: <Code size={16} />, count: 128, color: 'text-blue-400' },
    { id: 'backend', name: 'Backend', icon: <FileText size={16} />, count: 96, color: 'text-green-400' },
    { id: 'system-design', name: 'System Design', icon: <BookOpen size={16} />, count: 64, color: 'text-purple-400' },
    { id: 'behavioral', name: 'Behavioral', icon: <Star size={16} />, count: 72, color: 'text-yellow-400' },
    { id: 'data-structures', name: 'Data Structures', icon: <Code size={16} />, count: 110, color: 'text-pink-400' },
  ];

  const allTags = ['JavaScript', 'React', 'TypeScript', 'API', 'REST', 'Hooks', 'CSS', 'HTML', 'Node.js', 'Recursion', 
                 'Tree', 'Array', 'Optimization', 'Database', 'Scaling', 'Teamwork', 'Conflict', 'Leadership', 
                 'Communication', 'System Design', 'Fundamentals'];

  // Enhanced questions with more details
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
      timesAttempted: 2,
      lastAttempted: '2025-03-18T14:30:00Z',
      avgTimeToSolve: '4m 30s',
      hasHints: true,
      sampleAnswer: 'A closure is a function that has access to its outer function scope even after the outer function has returned. This means a closure can remember and access variables and arguments of its outer function even after the function has finished. Example: A counter function that increments on each call.'
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
      hasHints: true,
    },
    {
      id: '3',
      question: 'Design a scalable system for a social media platform that supports millions of active users',
      category: 'system-design',
      difficulty: 'Hard',
      answeredCount: 1752,
      tags: ['Scaling', 'Database', 'System Design'],
      isBookmarked: true,
      isCompleted: false,
      timesAttempted: 1,
      lastAttempted: '2025-04-01T09:15:00Z',
      hasHints: true,
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
      hasHints: true,
    },
    {
      id: '5',
      question: 'Describe a situation where you had to handle a difficult team conflict and how you resolved it',
      category: 'behavioral',
      difficulty: 'Medium',
      answeredCount: 3421,
      tags: ['Teamwork', 'Conflict', 'Communication'],
      isBookmarked: false,
      isCompleted: true,
      timesAttempted: 3,
      lastAttempted: '2025-03-25T16:45:00Z',
      avgTimeToSolve: '6m 15s',
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
      hasHints: true,
    },
    {
      id: '7',
      question: 'Implement a debounce function in JavaScript',
      category: 'frontend',
      difficulty: 'Medium',
      answeredCount: 1842,
      tags: ['JavaScript', 'Performance', 'Optimization'],
      isBookmarked: false,
      isCompleted: false,
      hasHints: true,
    },
    {
      id: '8',
      question: 'Compare and contrast CSS Grid and Flexbox with examples',
      category: 'frontend',
      difficulty: 'Easy',
      answeredCount: 1564,
      tags: ['CSS', 'Layout', 'HTML'],
      isBookmarked: false,
      isCompleted: false,
    },
  ];

  // Filter questions based on multiple criteria
  const filteredQuestions = questions.filter((question) => {
    const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === null || question.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === null || question.difficulty === selectedDifficulty;
    const matchesCompletion = !showCompleted || question.isCompleted === showCompleted;
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => question.tags.includes(tag));
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesCompletion && matchesTags;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        // Simulated sorting by "newness" - in a real app would use creation date
        return parseInt(b.id) - parseInt(a.id);
      case 'difficulty':
        const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
        return difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty];
      case 'popular':
      default:
        return b.answeredCount - a.answeredCount;
    }
  });

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Easy': return 'text-green-500';
      case 'Medium': return 'text-yellow-500';
      case 'Hard': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getDifficultyBadgeColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-900/30 text-green-400 border-green-900/40';
      case 'Medium': return 'bg-yellow-900/30 text-yellow-400 border-yellow-900/40';
      case 'Hard': return 'bg-red-900/30 text-red-400 border-red-900/40';
      default: return 'bg-gray-800 text-gray-400 border-gray-700';
    }
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.color || 'text-gray-400';
  };
  
  const toggleBookmark = (questionId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    // In a real app, update the bookmark status in the database
    console.log(`Toggle bookmark for question ${questionId}`);
  };
  
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const handleLoadMore = () => {
    setLoadingMore(true);
    // Simulate loading more questions
    setTimeout(() => {
      setLoadingMore(false);
    }, 1000);
  };
  
  const showQuestionPreview = (question: QuestionItem) => {
    setPreviewQuestion(question);
  };
  
  const hideQuestionPreview = () => {
    setPreviewQuestion(null);
  };

  const handleShowRelatedQuestions = (tag: string) => {
    setRelatedTag(tag);
    setShowRelatedQuestions(true);
  };

  const handleTagClick = (tag: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (selectedTags.includes(tag)) {
      // If already in filter, just remove it
      toggleTag(tag);
    } else {
      // Show related questions for this tag
      handleShowRelatedQuestions(tag);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header with accessibility enhancements */}
        <div className="bg-[#121212] shadow-md p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center" id="page-heading">
              <BookOpen size={24} className="text-purple-400 mr-2" aria-hidden="true" />
              Practice Questions
            </h1>
            <p className="text-gray-400 mt-1">Sharpen your skills with our curated collection of interview questions</p>
          </div>
          
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" aria-hidden="true" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search questions..."
                aria-label="Search questions"
                className="w-full bg-[#1a1a1a] text-white border border-gray-800 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:border-purple-500"
              />
            </div>
            
            <div className="relative" ref={filterRef}>
              <button 
                className="bg-[#1a1a1a] text-white border border-gray-800 rounded-lg p-2 flex items-center justify-center hover:border-gray-700"
                aria-label="Filter questions"
                aria-expanded={filterMenuOpen}
                onClick={() => setFilterMenuOpen(!filterMenuOpen)}
              >
                <Filter size={16} className="text-gray-400" aria-hidden="true" />
              </button>
              
              <AnimatePresence>
                {filterMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 bg-[#1a1a1a] border border-gray-800 rounded-lg shadow-lg p-4 z-10"
                    role="dialog"
                    aria-label="Filter options"
                  >
                    <div className="mb-4">
                      <p className="text-gray-300 text-sm font-medium mb-2">Sort by</p>
                      <div className="grid grid-cols-3 gap-1">
                        <button
                          onClick={() => setSortBy('popular')}
                          className={`text-xs px-2 py-1 rounded ${sortBy === 'popular' ? 'bg-purple-900/40 text-purple-300' : 'bg-gray-800 text-gray-300'}`}
                          aria-pressed={sortBy === 'popular'}
                        >
                          Popular
                        </button>
                        <button
                          onClick={() => setSortBy('newest')}
                          className={`text-xs px-2 py-1 rounded ${sortBy === 'newest' ? 'bg-purple-900/40 text-purple-300' : 'bg-gray-800 text-gray-300'}`}
                          aria-pressed={sortBy === 'newest'}
                        >
                          Newest
                        </button>
                        <button
                          onClick={() => setSortBy('difficulty')}
                          className={`text-xs px-2 py-1 rounded ${sortBy === 'difficulty' ? 'bg-purple-900/40 text-purple-300' : 'bg-gray-800 text-gray-300'}`}
                          aria-pressed={sortBy === 'difficulty'}
                        >
                          Difficulty
                        </button>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-gray-300 text-sm font-medium mb-2">Category</p>
                      <div className="grid grid-cols-2 gap-1">
                        <button
                          onClick={() => setSelectedCategory(null)}
                          className={`text-xs px-2 py-1 rounded ${!selectedCategory ? 'bg-purple-900/40 text-purple-300' : 'bg-gray-800 text-gray-300'}`}
                          aria-pressed={selectedCategory === null}
                        >
                          All Categories
                        </button>
                        {categories.map(category => (
                          <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`text-xs px-2 py-1 rounded flex items-center justify-center ${selectedCategory === category.id ? 'bg-purple-900/40 text-purple-300' : 'bg-gray-800 text-gray-300'}`}
                            aria-pressed={selectedCategory === category.id}
                          >
                            <span className={`mr-1 ${category.color}`} aria-hidden="true">{category.icon}</span>
                            {category.name}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-gray-300 text-sm font-medium mb-2">Difficulty</p>
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
                            <span className={`w-2 h-2 rounded-full ${getDifficultyColor(difficulty)} inline-block mr-1`} aria-hidden="true"></span>
                            {difficulty}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-gray-300 text-sm font-medium mb-2">Popular Tags</p>
                      <div className="flex flex-wrap gap-1">
                        {allTags.slice(0, 8).map(tag => (
                          <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              selectedTags.includes(tag) 
                                ? 'bg-purple-900/40 text-purple-300 border border-purple-700/40' 
                                : 'bg-gray-800 text-gray-300 border border-transparent'
                            }`}
                            aria-pressed={selectedTags.includes(tag)}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-800 pt-3 mt-3">
                      <label className="flex items-center text-gray-300 text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={showCompleted}
                          onChange={() => setShowCompleted(!showCompleted)}
                          className="rounded bg-gray-800 border-gray-700 text-purple-600 mr-2 focus:ring-purple-500 focus:ring-offset-gray-900"
                          aria-label="Show only completed questions"
                        />
                        Show only completed
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-800">
                      <button
                        onClick={() => {
                          setSelectedCategory(null);
                          setSelectedDifficulty(null);
                          setShowCompleted(false);
                          setSearchTerm('');
                          setSelectedTags([]);
                          setSortBy('popular');
                        }}
                        className="text-xs text-purple-400 hover:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded px-2 py-1"
                        aria-label="Clear all filters"
                      >
                        Clear all filters
                      </button>
                      
                      <button
                        onClick={() => setFilterMenuOpen(false)}
                        className="bg-purple-600 hover:bg-purple-500 text-white py-1 px-3 rounded-md text-sm"
                      >
                        Apply
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* View toggle buttons */}
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg flex overflow-hidden">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-gray-300'}`}
                aria-label="List view"
                aria-pressed={viewMode === 'list'}
                title="List view"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-gray-300'}`}
                aria-label="Grid view"
                aria-pressed={viewMode === 'grid'}
                title="Grid view"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Skills progress (new feature) */}
        <div className="bg-[#121212] rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-white font-semibold flex items-center">
              <Award size={16} className="text-purple-400 mr-2" aria-hidden="true" />
              Your Question Skills
            </h2>
            <Link to="/skill-progress" className="text-sm text-purple-400 hover:text-purple-300">
              View detailed progress
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map(category => (
              <div key={category.id} className="bg-[#1a1a1a] rounded-lg p-3 border border-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <span className={`${category.color}`} aria-hidden="true">{category.icon}</span>
                  <span className="text-white text-xs font-medium">
                    {category.id === 'frontend' ? '24/128' : 
                     category.id === 'backend' ? '12/96' : 
                     category.id === 'system-design' ? '8/64' : 
                     category.id === 'behavioral' ? '18/72' : '6/110'}
                  </span>
                </div>
                <p className="text-sm text-white">{category.name}</p>
                <div className="w-full h-1.5 bg-gray-800 rounded-full mt-1.5">
                  <div 
                    className={`h-1.5 rounded-full bg-gradient-to-r ${
                      category.id === 'frontend' ? 'from-blue-500 to-blue-400' : 
                      category.id === 'backend' ? 'from-green-500 to-green-400' :
                      category.id === 'system-design' ? 'from-purple-500 to-purple-400' :
                      category.id === 'behavioral' ? 'from-yellow-500 to-yellow-400' :
                      'from-pink-500 to-pink-400'
                    }`}
                    style={{ 
                      width: 
                        category.id === 'frontend' ? '19%' : 
                        category.id === 'backend' ? '12%' : 
                        category.id === 'system-design' ? '12%' : 
                        category.id === 'behavioral' ? '25%' : '5%'
                    }}
                    aria-hidden="true"
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      
        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {categories.map(category => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
              className={`p-4 rounded-lg flex flex-col items-center justify-center transition-all ${
                category.id === selectedCategory 
                  ? 'bg-purple-900/30 border border-purple-500/50' 
                  : 'bg-[#121212] border border-gray-800 hover:border-gray-700'
              }`}
              aria-pressed={category.id === selectedCategory}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`p-3 rounded-full ${category.id === selectedCategory ? 'bg-purple-900/30' : 'bg-gray-800'} mb-2`}>
                <span className={category.color} aria-hidden="true">{category.icon}</span>
              </div>
              <span className="text-white font-medium text-sm">{category.name}</span>
              <span className="text-gray-400 text-xs">{category.count} questions</span>
            </motion.button>
          ))}
        </div>
        
        {/* Selected tags display */}
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-gray-400 text-sm">Filtered by tags:</span>
            {selectedTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className="bg-purple-900/30 text-purple-300 text-xs px-2 py-0.5 rounded-full border border-purple-700/40 flex items-center"
                aria-label={`Remove ${tag} tag filter`}
              >
                {tag}
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            ))}
            <button
              onClick={() => setSelectedTags([])}
              className="text-purple-400 hover:text-purple-300 text-xs underline"
              aria-label="Clear all selected tags"
            >
              Clear all
            </button>
          </div>
        )}
      
        {/* Questions - with grid/list view toggle */}
        <div className="bg-[#121212] rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-purple-900/30 to-purple-700/10 p-4 border-b border-gray-800 flex justify-between items-center">
            <h2 className="text-white font-semibold flex items-center gap-2">
              Questions
              <span className="bg-gray-800 text-xs px-2 py-0.5 rounded-full text-gray-300">{filteredQuestions.length}</span>
            </h2>
            
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-sm hidden sm:block">
                {filteredQuestions.length} questions found
              </span>
              <button 
                className="text-purple-400 hover:text-purple-300 text-sm flex items-center"
                onClick={() => navigate('/create-question')}
              >
                <Plus size={14} className="mr-1" aria-hidden="true" />
                Add Question
              </button>
            </div>
          </div>
          
          {filteredQuestions.length > 0 ? (
            <>
              {viewMode === 'list' ? (
                /* List View */
                <div className="divide-y divide-gray-800">
                  {filteredQuestions.map(question => (
                    <div 
                      key={question.id}
                      className="p-4 hover:bg-gray-900/30 transition-colors relative"
                    >
                      <div className="flex items-start mb-2">
                        <div className="flex-grow">
                          <h3 className="text-white font-medium text-lg group">
                            <Link 
                              to={`/practice/question/${question.id}`} 
                              className="hover:text-purple-400 focus:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                              onMouseEnter={() => showQuestionPreview(question)}
                              onMouseLeave={hideQuestionPreview}
                            >
                              {question.question}
                              <ArrowRight size={16} className="ml-1 inline-block opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                            </Link>
                          </h3>
                        </div>
                        <div className="flex items-center space-x-2 ml-2">
                          <button 
                            onClick={(e) => toggleBookmark(question.id, e)}
                            className={`p-1 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                            aria-label={question.isBookmarked ? "Remove bookmark" : "Add bookmark"}
                            title={question.isBookmarked ? "Remove bookmark" : "Add bookmark"}
                          >
                            {question.isBookmarked ? (
                              <Star size={16} fill="currentColor" className="text-yellow-400" aria-hidden="true" />
                            ) : (
                              <Star size={16} className="text-gray-400" aria-hidden="true" />
                            )}
                          </button>
                          {question.isCompleted && (
                            <span className="text-green-500" aria-label="Completed question">
                              <CheckCircle size={16} aria-hidden="true" />
                            </span>
                          )}
                          {question.hasHints && (
                            <div className="relative">
                              <button 
                                className="text-blue-400 hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                                onMouseEnter={() => setActiveTooltip(`hints-${question.id}`)}
                                onMouseLeave={() => setActiveTooltip(null)}
                                aria-label="This question has hints available"
                                title="This question has hints available"
                              >
                                <HelpCircle size={15} aria-hidden="true" />
                              </button>
                              {activeTooltip === `hints-${question.id}` && (
                                <div className="absolute right-0 top-6 w-40 bg-gray-900 p-2 rounded text-xs text-gray-300 z-10 border border-gray-700">
                                  This question has hints available to help guide your answer.
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center justify-between">
                        <div className="flex flex-wrap items-center gap-2 text-sm">
                          <span className={`${getCategoryColor(question.category)} bg-gray-800 px-2 py-0.5 rounded-full text-xs flex items-center`}>
                            {getCategoryIcon(question.category)}
                            {getCategoryName(question.category)}
                          </span>
                          <span className={`${getDifficultyBadgeColor(question.difficulty)} text-xs px-2 py-0.5 rounded-full border`}>
                            {question.difficulty}
                          </span>
                          <span className="text-gray-400 text-xs flex items-center">
                            <Check size={12} className="mr-1" aria-hidden="true" /> 
                            {question.answeredCount.toLocaleString()} answers
                          </span>
                          
                          {question.timesAttempted && (
                            <span className="text-gray-400 text-xs flex items-center">
                              <Clock size={12} className="mr-1" aria-hidden="true" />
                              {question.timesAttempted} attempts
                            </span>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-2 sm:mt-0">
                          {question.tags.map(tag => (
                            <button 
                              key={tag} 
                              className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded transition-colors"
                              onClick={(e) => handleTagClick(tag, e)}
                              aria-pressed={selectedTags.includes(tag)}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {expandedQuestion === question.id && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-3 border-t border-gray-800"
                        >
                          <div className="bg-gray-900 rounded-lg p-3">
                            <div className="flex justify-between items-start">
                              <h4 className="text-white font-medium text-sm mb-2">Sample Approach</h4>
                              <button className="text-xs text-purple-400 hover:text-purple-300" onClick={() => setExpandedQuestion(null)}>
                                Hide
                              </button>
                            </div>
                            <p className="text-gray-300 text-xs">
                              {question.sampleAnswer || "Start by understanding the core concepts involved. Break down the question into smaller parts and address each systematically."}
                            </p>
                            <div className="mt-3 flex space-x-2">
                              <Link 
                                to={`/practice/question/${question.id}`}
                                className="text-xs bg-purple-900/40 text-purple-300 px-3 py-1 rounded-lg border border-purple-800/30 hover:bg-purple-900/60"
                              >
                                Start Practice
                              </Link>
                              <button 
                                className="text-xs bg-gray-800 text-gray-300 px-3 py-1 rounded-lg border border-gray-700 hover:bg-gray-700"
                                onClick={() => {
                                  // Find the first tag that has related questions
                                  const tagWithRelated = question.tags.find(tag => RELATED_QUESTIONS_BY_TAG[tag]);
                                  if (tagWithRelated) {
                                    handleShowRelatedQuestions(tagWithRelated);
                                  } else {
                                    // Fallback to category
                                    setRelatedTag(null);
                                    setShowRelatedQuestions(true);
                                  }
                                }}
                              >
                                See Related Questions
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                      
                      {/* Quick action buttons */}
                      <div className={`absolute bottom-4 right-4 transition-opacity ${expandedQuestion === question.id ? 'opacity-0' : 'opacity-100'}`}>
                        <button 
                          className="bg-gray-900 hover:bg-gray-800 rounded-lg px-2 py-1 text-xs text-white flex items-center"
                          onClick={() => setExpandedQuestion(expandedQuestion === question.id ? null : question.id)}
                          aria-expanded={expandedQuestion === question.id}
                        >
                          <Eye size={12} className="mr-1" aria-hidden="true" />
                          Quick View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Grid View */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                  {filteredQuestions.map(question => (
                    <motion.div
                      key={question.id}
                      className="bg-gray-900/30 border border-gray-800 hover:border-gray-700 rounded-lg overflow-hidden"
                      whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <span className={`${getDifficultyBadgeColor(question.difficulty)} text-xs px-2 py-0.5 rounded-full border`}>
                            {question.difficulty}
                          </span>
                          <button 
                            onClick={(e) => toggleBookmark(question.id, e)}
                            aria-label={question.isBookmarked ? "Remove bookmark" : "Add bookmark"}
                            className="text-gray-400 hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-full p-1"
                          >
                            {question.isBookmarked ? (
                              <Bookmark size={14} fill="currentColor" className="text-yellow-400" />
                            ) : (
                              <Bookmark size={14} />
                            )}
                          </button>
                        </div>
                        
                        <Link to={`/practice/question/${question.id}`} className="block">
                          <h3 className="text-white font-medium text-md leading-tight line-clamp-2 mb-2 hover:text-purple-400 transition-colors">
                            {question.question}
                          </h3>
                        </Link>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {question.tags.slice(0, 3).map(tag => (
                            <button
                              key={tag} 
                              className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs px-1.5 py-0.5 rounded transition-colors"
                              onClick={(e) => handleTagClick(tag, e)}
                            >
                              {tag}
                            </button>
                          ))}
                          {question.tags.length > 3 && (
                            <span className="bg-gray-800 text-gray-300 text-xs px-1.5 py-0.5 rounded">
                              +{question.tags.length - 3}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex justify-between items-center text-xs text-gray-400 mt-3 pt-3 border-t border-gray-800">
                          <span className="flex items-center">
                            <Check size={12} className="mr-1" />
                            {question.answeredCount.toLocaleString()}
                          </span>
                          
                          <span className={`${getCategoryColor(question.category)} flex items-center`}>
                            {getCategoryIcon(question.category, 12)}
                            {getCategoryName(question.category)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-900 px-4 py-2 flex justify-between items-center">
                        <div>
                          {question.isCompleted && (
                            <span className="flex items-center text-green-400 text-xs">
                              <CheckCircle size={12} className="mr-1" />
                              Completed
                            </span>
                          )}
                        </div>
                        <Link 
                          to={`/practice/question/${question.id}`}
                          className="text-xs bg-purple-900/40 text-purple-300 px-2 py-1 rounded border border-purple-800/30 hover:bg-purple-900/60 transition-colors flex items-center"
                        >
                          Practice <ArrowRight size={12} className="ml-1" />
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="py-12 text-center">
              <div className="w-16 h-16 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <Search size={24} className="text-gray-500" aria-hidden="true" />
              </div>
              <p className="text-gray-400 mb-2">No questions found matching your criteria</p>
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedDifficulty(null);
                  setShowCompleted(false);
                  setSearchTerm('');
                  setSelectedTags([]);
                }}
                className="mt-2 text-sm text-purple-400 hover:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md px-4 py-2"
              >
                Clear filters and try again
              </button>
            </div>
          )}
          
          {/* Load more button */}
          {filteredQuestions.length > 0 && (
            <div className="p-4 border-t border-gray-800 flex justify-center">
              <button 
                className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md px-4 py-2"
                onClick={handleLoadMore}
                disabled={loadingMore}
              >
                {loadingMore ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                  </>
                ) : (
                  <>
                    Load more questions <ArrowRight size={14} className="ml-1" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
        
        {/* Stats section */}
        <div className="bg-[#121212] rounded-lg p-4">
          <h2 className="text-white font-semibold flex items-center mb-4">
            <BarChart2 size={16} className="text-purple-400 mr-2" aria-hidden="true" />
            Your Progress Stats
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-gray-900/30 rounded-lg p-3 border border-gray-800">
              <p className="text-gray-400 text-xs mb-1">Questions Completed</p>
              <p className="text-2xl font-bold text-white">26</p>
              <div className="flex items-center text-green-400 text-xs mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
                +5 this week
              </div>
            </div>
            
            <div className="bg-gray-900/30 rounded-lg p-3 border border-gray-800">
              <p className="text-gray-400 text-xs mb-1">Current Streak</p>
              <p className="text-2xl font-bold text-white">3 days</p>
              <p className="text-gray-400 text-xs mt-1">Keep it going!</p>
            </div>
            
            <div className="bg-gray-900/30 rounded-lg p-3 border border-gray-800">
              <p className="text-gray-400 text-xs mb-1">Practice Duration</p>
              <p className="text-2xl font-bold text-white">5.2 hrs</p>
              <p className="text-gray-400 text-xs mt-1">Total practice time</p>
            </div>
            
            <div className="bg-gray-900/30 rounded-lg p-3 border border-gray-800">
              <p className="text-gray-400 text-xs mb-1">Performance</p>
              <p className="text-2xl font-bold text-white">78%</p>
              <div className="w-full h-1.5 bg-gray-800 rounded-full mt-2">
                <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '78%' }} aria-hidden="true"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Question preview card */}
      <AnimatePresence>
        {previewQuestion && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-4 right-4 w-96 bg-[#121212] rounded-lg shadow-2xl border border-gray-700 z-50"
          >
            <div className="flex justify-between items-center p-3 border-b border-gray-800 bg-gradient-to-r from-purple-900/30 to-purple-700/10">
              <h4 className="text-white font-medium text-sm">Question Preview</h4>
              <button 
                onClick={hideQuestionPreview}
                className="text-gray-400 hover:text-white"
                aria-label="Close preview"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-white text-md font-medium mb-2">{previewQuestion.question}</h3>
              <div className="flex flex-wrap gap-1 mb-3">
                {previewQuestion.tags.map(tag => (
                  <span key={tag} className="bg-gray-800 text-gray-300 text-xs px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 mb-4">
                <span className={`${getDifficultyBadgeColor(previewQuestion.difficulty)} text-xs px-2 py-0.5 rounded-full border`}>
                  {previewQuestion.difficulty}
                </span>
                <span className="text-gray-400 text-xs flex items-center">
                  <Check size={12} className="mr-1" /> 
                  {previewQuestion.answeredCount.toLocaleString()} answers
                </span>
              </div>
              
              {previewQuestion.sampleAnswer && (
                <div className="bg-gray-900/50 rounded-lg p-3 mb-3 border border-gray-800">
                  <h4 className="text-gray-300 text-xs font-medium mb-1">Sample approach:</h4>
                  <p className="text-gray-400 text-xs line-clamp-3">{previewQuestion.sampleAnswer}</p>
                </div>
              )}
              
              <Link
                to={`/practice/question/${previewQuestion.id}`}
                className="w-full bg-purple-700 hover:bg-purple-600 text-white py-2 rounded-lg text-sm flex items-center justify-center"
              >
                Practice This Question <ArrowRight size={14} className="ml-1" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Related Questions Modal */}
      {showRelatedQuestions && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-[#121212] rounded-xl shadow-xl max-w-xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#121212] p-4 border-b border-gray-800 flex justify-between items-center">
              <h2 className="text-lg font-bold text-white">Related Questions</h2>
              <button 
                onClick={() => setShowRelatedQuestions(false)}
                className="p-1.5 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="p-4">
              <RelatedQuestions 
                tag={relatedTag || undefined}
                category={!relatedTag && selectedCategory ? selectedCategory : undefined}
                limit={8}
              />
            </div>
            
            <div className="sticky bottom-0 bg-[#121212] p-4 border-t border-gray-800 flex justify-end">
              <button 
                onClick={() => setShowRelatedQuestions(false)}
                className="px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-lg text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

// Helper function to get category icon
function getCategoryIcon(categoryId: string, size: number = 14) {
  switch(categoryId) {
    case 'frontend': return <Code size={size} className="mr-1" />;
    case 'backend': return <FileText size={size} className="mr-1" />;
    case 'system-design': return <BookOpen size={size} className="mr-1" />;
    case 'behavioral': return <Star size={size} className="mr-1" />;
    case 'data-structures': return <Code size={size} className="mr-1" />;
    default: return null;
  }
}

// Helper function to get category name
function getCategoryName(categoryId: string) {
  switch(categoryId) {
    case 'frontend': return 'Frontend';
    case 'backend': return 'Backend';
    case 'system-design': return 'System Design';
    case 'behavioral': return 'Behavioral';
    case 'data-structures': return 'Data Structures';
    default: return categoryId;
  }
}

export default PracticeQuestions;