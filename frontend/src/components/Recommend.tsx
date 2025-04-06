import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, ChevronRight, BookOpen, Code, Database, Server, Cpu, ArrowRight, Clock, CheckCircle, Star } from 'react-feather';
import DashboardLayout from '../components/DashboardLayout';

interface Recommendation {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  relevance: number; // 0-100
  topics: string[];
  description: string;
  estimatedTime: string;
  link: string;
  popularity: number; // 0-100
  category: 'frontend' | 'backend' | 'system-design' | 'algorithms' | 'behavioral' | 'cloud';
  isNew?: boolean;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
}

const RecommendPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('relevance');
  
  // Categories for filtering
  const categories: Category[] = [
    { id: 'frontend', name: 'Frontend', icon: <Code size={16} />, count: 12 },
    { id: 'backend', name: 'Backend', icon: <Server size={16} />, count: 9 },
    { id: 'system-design', name: 'System Design', icon: <Database size={16} />, count: 8 },
    { id: 'algorithms', name: 'Algorithms & DS', icon: <Cpu size={16} />, count: 14 },
    { id: 'behavioral', name: 'Behavioral', icon: <BookOpen size={16} />, count: 6 }
  ];

  // Mock recommendations data
  const recommendations: Recommendation[] = [
    {
      id: "sys-design-1",
      title: "System Design Mastery: Building Scalable Applications",
      difficulty: "Advanced",
      relevance: 95,
      topics: ["Scalability", "Database Optimization", "API Architecture", "Load Balancing"],
      description: "Master system design principles that will help you architect resilient and scalable applications. Covers distributed systems, database sharding, caching strategies and more.",
      estimatedTime: "3 weeks",
      link: "https://github.com/donnemartin/system-design-primer",
      popularity: 98,
      category: 'system-design',
      isNew: true
    },
    {
      id: "algo-js-1",
      title: "JavaScript Algorithms Intensive",
      difficulty: "Intermediate",
      relevance: 87,
      topics: ["Sorting Techniques", "Binary Trees", "Dynamic Programming", "Graph Traversal"],
      description: "A comprehensive collection of algorithm challenges specifically for JavaScript developers. Includes interactive exercises, solutions, and complexity analysis.",
      estimatedTime: "4 weeks",
      link: "https://leetcode.com/problemset/all/",
      popularity: 92,
      category: 'algorithms'
    },
    {
      id: "frontend-react-1",
      title: "React Performance Optimization Workshop",
      difficulty: "Advanced",
      relevance: 90,
      topics: ["Memoization", "Lazy Loading", "State Management", "Rendering Strategies"],
      description: "Learn advanced techniques to optimize React applications for maximum performance. Cover common pitfalls and master optimization strategies used by top companies.",
      estimatedTime: "2 weeks",
      link: "https://reactjs.org/docs/optimizing-performance.html",
      popularity: 89,
      category: 'frontend'
    },
    {
      id: "backend-node-1",
      title: "Node.js Microservices Architecture",
      difficulty: "Advanced",
      relevance: 82,
      topics: ["Microservices", "API Gateway", "Service Discovery", "Message Queues"],
      description: "Build robust backend systems using Node.js microservices architecture. Learn deployment strategies, inter-service communication, and monitoring techniques.",
      estimatedTime: "5 weeks",
      link: "https://microservices.io/",
      popularity: 86,
      category: 'backend'
    },
    {
      id: "behavioral-1",
      title: "Behavioral Interview Preparation Toolkit",
      difficulty: "Intermediate",
      relevance: 78,
      topics: ["STAR Method", "Leadership Principles", "Conflict Resolution", "Team Dynamics"],
      description: "Prepare for behavioral interviews with structured approaches to answering questions about your past experiences, challenges faced, and leadership skills.",
      estimatedTime: "1 week",
      link: "https://www.amazon.jobs/en/landing_pages/in-person-interview",
      popularity: 94,
      category: 'behavioral'
    },
    {
      id: "frontend-design-1",
      title: "Frontend System Design for Senior Engineers",
      difficulty: "Expert",
      relevance: 88,
      topics: ["Component Architecture", "State Management", "Design Systems", "Performance"],
      description: "Learn how to design complex frontend systems that scale. Covers component design, state management strategies, and building reusable design systems.",
      estimatedTime: "3 weeks",
      link: "https://frontendmastery.com/",
      popularity: 85,
      category: 'frontend',
      isNew: true
    },
    {
      id: "algo-dsa-2",
      title: "Data Structures Deep Dive",
      difficulty: "Intermediate",
      relevance: 75,
      topics: ["Hash Tables", "Trees", "Graphs", "Heaps"],
      description: "Strengthen your understanding of fundamental data structures with practical applications. Master implementation details and optimization techniques.",
      estimatedTime: "4 weeks",
      link: "https://www.geeksforgeeks.org/data-structures/",
      popularity: 88,
      category: 'algorithms'
    },
    {
      id: "backend-db-1",
      title: "Database Performance Optimization",
      difficulty: "Advanced",
      relevance: 79,
      topics: ["Indexing Strategies", "Query Optimization", "Database Sharding", "Caching"],
      description: "Learn advanced techniques to optimize database performance, from query tuning to data partitioning and caching strategies for high-load environments.",
      estimatedTime: "3 weeks",
      link: "https://use-the-index-luke.com/",
      popularity: 82,
      category: 'backend'
    }
  ];

  // Filter recommendations based on selected filters
  const filteredRecommendations = recommendations
    .filter(rec => selectedCategory ? rec.category === selectedCategory : true)
    .filter(rec => selectedDifficulty ? rec.difficulty === selectedDifficulty : true)
    .sort((a, b) => {
      switch (sortBy) {
        case 'relevance':
          return b.relevance - a.relevance;
        case 'popularity':
          return b.popularity - a.popularity;
        case 'difficulty':
          const difficultyOrder = { Beginner: 1, Intermediate: 2, Advanced: 3, Expert: 4 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        default:
          return 0;
      }
    });

  // Simulate loading state
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Calculate popularity color based on value
  const getPopularityColor = (popularity: number) => {
    if (popularity >= 90) return 'text-green-400';
    if (popularity >= 75) return 'text-blue-400';
    if (popularity >= 60) return 'text-yellow-400';
    return 'text-gray-400';
  };

  // Calculate relevance color based on value
  const getRelevanceColor = (relevance: number) => {
    if (relevance >= 90) return 'from-emerald-500/20 to-emerald-700/20 border-emerald-500/30';
    if (relevance >= 80) return 'from-blue-500/20 to-blue-700/20 border-blue-500/30';
    if (relevance >= 70) return 'from-purple-500/20 to-purple-700/20 border-purple-500/30';
    if (relevance >= 60) return 'from-amber-500/20 to-amber-700/20 border-amber-500/30';
    return 'from-gray-500/20 to-gray-700/20 border-gray-500/30';
  };

  // Get icon for difficulty level
  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return <span className="w-2 h-2 rounded-full bg-green-400 mr-1.5"></span>;
      case 'Intermediate':
        return <span className="w-2 h-2 rounded-full bg-blue-400 mr-1.5"></span>;
      case 'Advanced':
        return <span className="w-2 h-2 rounded-full bg-purple-400 mr-1.5"></span>;
      case 'Expert':
        return <span className="w-2 h-2 rounded-full bg-red-400 mr-1.5"></span>;
      default:
        return null;
    }
  };

  // Get icon for category
  const getCategoryIcon = (category: string) => {
    const found = categories.find(c => c.id === category);
    return found ? found.icon : null;
  };

  return (
    <DashboardLayout>
      {/* Header section */}
      <div className="bg-[#121212] shadow-md p-4 mb-6 rounded-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center">
            <div className="bg-gradient-to-br from-amber-600/30 to-amber-800/30 p-2.5 rounded-lg mr-3 border border-amber-700/30">
              <Zap size={20} className="text-amber-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">AI-Powered Recommendations</h1>
              <p className="text-gray-400 mt-0.5">Personalized learning paths based on your profile and goals</p>
            </div>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <select 
              className="bg-[#1a1a1a] text-white border border-gray-800 rounded-lg p-2 text-sm flex-grow md:flex-grow-0 focus:outline-none focus:border-amber-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort recommendations"
            >
              <option value="relevance">Sort by: Relevance</option>
              <option value="popularity">Sort by: Popularity</option>
              <option value="difficulty">Sort by: Difficulty</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left sidebar - filters */}
        <div className="lg:col-span-1">
          <div className="bg-[#121212] rounded-lg p-4 shadow-lg mb-4">
            <h2 className="text-white font-bold mb-3 flex items-center">
              <Cpu size={16} className="text-amber-400 mr-2" />
              Categories
            </h2>

            <div className="space-y-2">
              <button 
                className={`w-full py-2 px-3 flex justify-between items-center rounded-lg text-left text-sm ${
                  selectedCategory === null 
                    ? 'bg-amber-900/30 text-amber-300 border border-amber-700/40' 
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800 border border-transparent'
                }`}
                onClick={() => setSelectedCategory(null)}
              >
                <span>All Categories</span>
                <span className="text-xs opacity-70">{recommendations.length}</span>
              </button>
              
              {categories.map(category => (
                <button 
                  key={category.id}
                  className={`w-full py-2 px-3 flex justify-between items-center rounded-lg text-left text-sm ${
                    selectedCategory === category.id 
                      ? 'bg-amber-900/30 text-amber-300 border border-amber-700/40' 
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800 border border-transparent'
                  }`}
                  onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
                >
                  <span className="flex items-center">
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </span>
                  <span className="text-xs opacity-70">{category.count}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-[#121212] rounded-lg p-4 shadow-lg">
            <h2 className="text-white font-bold mb-3 flex items-center">
              <Star size={16} className="text-amber-400 mr-2" />
              Difficulty Level
            </h2>
            
            <div className="space-y-2">
              <button 
                className={`w-full py-2 px-3 flex items-center rounded-lg text-left text-sm ${
                  selectedDifficulty === null 
                    ? 'bg-amber-900/30 text-amber-300 border border-amber-700/40' 
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800 border border-transparent'
                }`}
                onClick={() => setSelectedDifficulty(null)}
              >
                All Levels
              </button>
              
              {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map(difficulty => (
                <button 
                  key={difficulty}
                  className={`w-full py-2 px-3 flex items-center rounded-lg text-left text-sm ${
                    selectedDifficulty === difficulty 
                      ? 'bg-amber-900/30 text-amber-300 border border-amber-700/40' 
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800 border border-transparent'
                  }`}
                  onClick={() => setSelectedDifficulty(difficulty === selectedDifficulty ? null : difficulty)}
                >
                  {getDifficultyIcon(difficulty)}
                  {difficulty}
                </button>
              ))}
            </div>
          </div>
          
          <div className="hidden lg:block mt-4 bg-[#121212] rounded-lg p-4 shadow-lg">
            <div className="bg-gradient-to-br from-amber-900/20 to-amber-700/10 border border-amber-700/30 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2 flex items-center">
                <CheckCircle size={16} className="text-amber-400 mr-2" />
                Your Progress
              </h3>
              <p className="text-gray-300 text-sm mb-3">You've completed 3 out of 8 recommended resources.</p>
              <div className="w-full h-2 bg-gray-800 rounded-full">
                <div className="w-[37.5%] h-2 bg-amber-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right content area - recommendations list */}
        <div className="lg:col-span-3">
          {loading ? (
            // Loading state
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-t-amber-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredRecommendations.length > 0 ? (
            // Recommendations grid
            <div className="space-y-5">
              {filteredRecommendations.map((recommendation, index) => (
                <motion.div
                  key={recommendation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className={`bg-[#121212] rounded-lg shadow-lg overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300`}
                >
                  <div className={`bg-gradient-to-r ${getRelevanceColor(recommendation.relevance)} p-5 relative`}>
                    {recommendation.isNew && (
                      <span className="absolute top-3 right-3 bg-purple-900/80 text-purple-200 text-xs font-medium px-2 py-1 rounded-md">
                        NEW
                      </span>
                    )}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-3">
                      <h3 className="text-lg font-bold text-white">{recommendation.title}</h3>
                      <div className="flex items-center">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium bg-amber-900/40 text-amber-300 border border-amber-700/30`}>
                          {recommendation.relevance}% Match
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4 line-clamp-2">{recommendation.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {recommendation.topics.map(topic => (
                        <span 
                          key={topic} 
                          className="text-xs px-2 py-1 rounded-full bg-gray-900/70 text-gray-300 border border-gray-700"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="flex items-center text-gray-300">
                          {getCategoryIcon(recommendation.category)}
                          <span className="ml-1">{categories.find(c => c.id === recommendation.category)?.name}</span>
                        </span>
                        
                        <span className="flex items-center text-gray-300">
                          {getDifficultyIcon(recommendation.difficulty)}
                          {recommendation.difficulty}
                        </span>
                        
                        <span className="flex items-center text-gray-300">
                          <Clock size={14} className="mr-1.5" />
                          {recommendation.estimatedTime}
                        </span>
                        
                        <span className={`flex items-center ${getPopularityColor(recommendation.popularity)}`}>
                          <Star size={14} className="mr-1.5" fill="currentColor" />
                          {recommendation.popularity}% Popular
                        </span>
                      </div>
                      
                      <a 
                        href={recommendation.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white rounded-lg text-sm font-medium flex items-center transition-colors"
                      >
                        Start Learning <ArrowRight size={16} className="ml-2" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              <div className="flex justify-center mt-6">
                <button className="px-5 py-2.5 bg-amber-900/30 hover:bg-amber-900/50 text-amber-300 border border-amber-700/30 rounded-lg text-sm font-medium flex items-center transition-colors">
                  Load More Recommendations <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          ) : (
            // No results state
            <div className="bg-[#121212] rounded-lg p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
                <Zap size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">No recommendations found</h3>
              <p className="text-gray-400 mb-4">Try adjusting your filters to see more results.</p>
              <button 
                className="px-4 py-2 bg-amber-900/30 hover:bg-amber-900/50 text-amber-300 border border-amber-700/30 rounded-lg"
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedDifficulty(null);
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom stats section */}
      {!loading && (
        <div className="bg-[#121212] rounded-lg p-5 mt-6 shadow-lg">
          <h2 className="text-white font-bold mb-4">Learning Stats</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
              <h3 className="text-gray-400 text-sm mb-1">Completed Resources</h3>
              <p className="text-2xl font-bold text-white">3</p>
            </div>
            
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
              <h3 className="text-gray-400 text-sm mb-1">Current Progress</h3>
              <p className="text-2xl font-bold text-white">2 In Progress</p>
            </div>
            
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
              <h3 className="text-gray-400 text-sm mb-1">Learning Streak</h3>
              <p className="text-2xl font-bold text-white">5 Days</p>
            </div>
            
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
              <h3 className="text-gray-400 text-sm mb-1">Time Invested</h3>
              <p className="text-2xl font-bold text-white">14.5 Hours</p>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default RecommendPage;
