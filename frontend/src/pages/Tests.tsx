import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock, ChevronRight, Search, Filter, Star } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

interface TestItem {
  id: string;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: number;
  questions: number;
  rating: number;
  topics: string[];
}

const testData: TestItem[] = [
  {
    id: 'react-basics',
    title: 'React Fundamentals',
    category: 'Frontend',
    difficulty: 'Medium',
    duration: 60,
    questions: 20,
    rating: 4.8,
    topics: ['React', 'JSX', 'Hooks', 'Components'],
  },
  {
    id: 'js-advanced',
    title: 'JavaScript Advanced',
    category: 'Frontend',
    difficulty: 'Hard',
    duration: 45,
    questions: 15,
    rating: 4.5,
    topics: ['Closures', 'Promises', 'ES6+', 'Async'],
  },
  {
    id: 'node-express',
    title: 'Node.js & Express',
    category: 'Backend',
    difficulty: 'Medium',
    duration: 60,
    questions: 20,
    rating: 4.3,
    topics: ['Node', 'Express', 'RESTful API', 'Middleware'],
  },
  {
    id: 'database-design',
    title: 'Database Design & SQL',
    category: 'Backend',
    difficulty: 'Medium',
    duration: 45,
    questions: 15,
    rating: 4.2,
    topics: ['SQL', 'NoSQL', 'Indexing', 'Normalization'],
  },
  {
    id: 'dsa-basics',
    title: 'DSA Fundamentals',
    category: 'Algorithms',
    difficulty: 'Medium',
    duration: 90,
    questions: 25,
    rating: 4.7,
    topics: ['Arrays', 'Linked Lists', 'Trees', 'Sorting'],
  },
  {
    id: 'leetcode-medium',
    title: 'LeetCode Medium Problems',
    category: 'Algorithms',
    difficulty: 'Hard',
    duration: 120,
    questions: 10,
    rating: 4.9,
    topics: ['DP', 'Graphs', 'Greedy', 'Binary Search'],
  },
  {
    id: 'system-basics',
    title: 'System Design Basics',
    category: 'System Design',
    difficulty: 'Medium',
    duration: 75,
    questions: 15,
    rating: 4.6,
    topics: ['Scaling', 'API Design', 'Caching', 'Load Balancing'],
  },
  {
    id: 'distributed-systems',
    title: 'Distributed Systems',
    category: 'System Design',
    difficulty: 'Hard',
    duration: 90,
    questions: 20,
    rating: 4.4,
    topics: ['Consensus', 'Sharding', 'Load Balancing', 'CAP Theorem'],
  },
];

const Tests: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'Easy' | 'Medium' | 'Hard' | null>(null);
  
  const categories = [...new Set(testData.map(test => test.category))];
  const difficulties: ('Easy' | 'Medium' | 'Hard')[] = ['Easy', 'Medium', 'Hard'];
  
  const filteredTests = testData.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === null || test.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === null || test.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });
  
  const handleStartTest = (testId: string) => {
    navigate('/free-mock-test');
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center">
              <FileText size={24} className="text-blue-400 mr-2" />
              Mock Tests
            </h1>
            <p className="text-gray-400 mt-1">Practice with real interview questions</p>
          </div>
          
          <div className="relative flex w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search size={16} className="text-gray-500" />
              </div>
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tests..."
                className="w-full bg-[#1a1a1a] text-white border border-gray-800 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>
            
            <div className="relative ml-2 group">
              <button className="bg-[#1a1a1a] text-white border border-gray-800 rounded-lg p-2">
                <Filter size={18} className="text-gray-400" />
              </button>
              
              <div className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] border border-gray-800 rounded-lg shadow-lg p-2 z-10 invisible group-hover:visible">
                <div className="mb-3">
                  <p className="text-gray-400 text-xs mb-1">Category</p>
                  <div className="flex flex-wrap gap-1">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`text-xs px-2 py-0.5 rounded ${!selectedCategory ? 'bg-blue-900/40 text-blue-300' : 'bg-gray-800 text-gray-300'}`}
                    >
                      All
                    </button>
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`text-xs px-2 py-0.5 rounded ${selectedCategory === category ? 'bg-blue-900/40 text-blue-300' : 'bg-gray-800 text-gray-300'}`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-gray-400 text-xs mb-1">Difficulty</p>
                  <div className="flex flex-wrap gap-1">
                    <button
                      onClick={() => setSelectedDifficulty(null)}
                      className={`text-xs px-2 py-0.5 rounded ${!selectedDifficulty ? 'bg-blue-900/40 text-blue-300' : 'bg-gray-800 text-gray-300'}`}
                    >
                      All
                    </button>
                    {difficulties.map(difficulty => (
                      <button
                        key={difficulty}
                        onClick={() => setSelectedDifficulty(difficulty)}
                        className={`text-xs px-2 py-0.5 rounded ${selectedDifficulty === difficulty ? 'bg-blue-900/40 text-blue-300' : 'bg-gray-800 text-gray-300'}`}
                      >
                        {difficulty}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Test Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTests.map(test => (
            <motion.div
              key={test.id}
              whileHover={{ scale: 1.01 }}
              className="bg-[#121212] rounded-xl shadow-lg border border-gray-800 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-900/20 to-blue-700/20 p-4 border-b border-gray-800">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-white">{test.title}</h3>
                    <div className="flex items-center text-sm text-gray-400 mt-1">
                      <span className="mr-2">{test.category}</span>
                      <span className="mx-2">•</span>
                      <span 
                        className={
                          test.difficulty === 'Easy'
                            ? 'text-green-400'
                            : test.difficulty === 'Medium'
                            ? 'text-yellow-400'
                            : 'text-red-400'
                        }
                      >
                        {test.difficulty}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star size={14} className="text-yellow-400" />
                    <span className="ml-1 text-white">{test.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    <span>{test.duration} minutes</span>
                  </div>
                  <span>{test.questions} questions</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {test.topics.map((topic, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-blue-900/30 text-blue-300 px-2 py-0.5 rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                
                <button
                  onClick={() => handleStartTest(test.id)}
                  className="w-full bg-blue-700 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors flex items-center justify-center"
                >
                  Start Test
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredTests.length === 0 && (
          <div className="bg-[#121212] rounded-xl p-8 text-center">
            <p className="text-gray-400">No tests found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory(null);
                setSelectedDifficulty(null);
              }}
              className="mt-4 text-blue-400 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Tests;