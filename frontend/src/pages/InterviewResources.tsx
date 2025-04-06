import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Video, Bookmark, ExternalLink, Search, Star, Play, Clock, Download, Heart, ChevronRight } from 'react-feather';
import DashboardLayout from '../components/DashboardLayout';

interface ResourceCategory {
  id: string;
  name: string;
  count: number;
}

interface Resource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'ebook' | 'course';
  description: string;
  author: string;
  imageUrl: string;
  category: string;
  tags: string[];
  rating: number;
  duration: string;
  isFavorite: boolean;
  isBookmarked: boolean;
  url: string;
}

const InterviewResources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedResourceType, setSelectedResourceType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Categories
  const categories: ResourceCategory[] = [
    { id: 'all', name: 'All Resources', count: 235 },
    { id: 'technical', name: 'Technical', count: 124 },
    { id: 'behavioral', name: 'Behavioral', count: 53 },
    { id: 'system-design', name: 'System Design', count: 42 },
    { id: 'career-guides', name: 'Career Guides', count: 16 },
  ];
  
  // Resource Types
  const resourceTypes = [
    { id: 'all', name: 'All Types' },
    { id: 'article', name: 'Articles', icon: <BookOpen size={14} /> },
    { id: 'video', name: 'Videos', icon: <Video size={14} /> },
    { id: 'ebook', name: 'Ebooks', icon: <Download size={14} /> },
    { id: 'course', name: 'Courses', icon: <Play size={14} /> },
  ];

  // Mock resource data
  const mockResources: Resource[] = [
    {
      id: '1',
      title: 'Cracking the System Design Interview: A Complete Guide',
      type: 'article',
      description: 'A comprehensive guide to tackling system design questions, covering scalability, database choices, and common architectures.',
      author: 'Alex Johnson',
      imageUrl: 'https://picsum.photos/seed/system1/400/200',
      category: 'system-design',
      tags: ['Architecture', 'Scaling', 'Databases'],
      rating: 4.8,
      duration: '15 min read',
      isFavorite: true,
      isBookmarked: true,
      url: '#'
    },
    {
      id: '2',
      title: 'Behavioral Interview Masterclass',
      type: 'video',
      description: 'Learn how to structure your responses using the STAR method and practice with common behavioral questions.',
      author: 'Career Insights',
      imageUrl: 'https://picsum.photos/seed/behavioral1/400/200',
      category: 'behavioral',
      tags: ['STAR Method', 'Leadership', 'Communication'],
      rating: 4.6,
      duration: '45 min',
      isFavorite: false,
      isBookmarked: true,
      url: '#'
    },
    {
      id: '3',
      title: 'Modern JavaScript for Technical Interviews',
      type: 'ebook',
      description: 'Master JavaScript concepts frequently asked in technical interviews with practical examples and exercises.',
      author: 'Maria Santos',
      imageUrl: 'https://picsum.photos/seed/javascript1/400/200',
      category: 'technical',
      tags: ['JavaScript', 'ES6', 'Algorithms'],
      rating: 4.9,
      duration: '112 pages',
      isFavorite: true,
      isBookmarked: false,
      url: '#'
    },
    {
      id: '4',
      title: 'Complete Data Structures & Algorithms Course',
      type: 'course',
      description: 'Comprehensive course covering all essential data structures and algorithms with practice problems.',
      author: 'CodeMasters Academy',
      imageUrl: 'https://picsum.photos/seed/dsa1/400/200',
      category: 'technical',
      tags: ['DSA', 'Problem Solving', 'Optimization'],
      rating: 4.7,
      duration: '15 hours',
      isFavorite: false,
      isBookmarked: false,
      url: '#'
    },
    {
      id: '5',
      title: 'Crafting Your Tech Career: From Junior to Senior',
      type: 'ebook',
      description: 'A strategic guide for navigating your career path in the tech industry with actionable advice.',
      author: 'Priya Sharma',
      imageUrl: 'https://picsum.photos/seed/career1/400/200',
      category: 'career-guides',
      tags: ['Career Growth', 'Mentorship', 'Networking'],
      rating: 4.5,
      duration: '156 pages',
      isFavorite: false,
      isBookmarked: true,
      url: '#'
    },
    {
      id: '6',
      title: 'Distributed Systems Architecture Explained',
      type: 'video',
      description: 'Detailed explanation of distributed systems concepts with real-world examples from tech giants.',
      author: 'Tech Architect',
      imageUrl: 'https://picsum.photos/seed/distributed1/400/200',
      category: 'system-design',
      tags: ['Microservices', 'Consensus', 'Fault Tolerance'],
      rating: 4.9,
      duration: '90 min',
      isFavorite: true,
      isBookmarked: false,
      url: '#'
    }
  ];

  // Load resources on component mount
  useEffect(() => {
    const loadResources = () => {
      // Simulating API fetch delay
      setTimeout(() => {
        setResources(mockResources);
        setFilteredResources(mockResources);
        setIsLoading(false);
      }, 600);
    };

    loadResources();
  }, []);

  // Filter resources based on search, category, and type
  useEffect(() => {
    let result = [...resources];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(resource => 
        resource.title.toLowerCase().includes(query) || 
        resource.description.toLowerCase().includes(query) || 
        resource.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter(resource => resource.category === selectedCategory);
    }
    
    if (selectedResourceType && selectedResourceType !== 'all') {
      result = result.filter(resource => resource.type === selectedResourceType);
    }
    
    setFilteredResources(result);
  }, [searchQuery, selectedCategory, selectedResourceType, resources]);
  
  // Handle category selection
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  // Handle resource type selection
  const handleResourceTypeChange = (typeId: string) => {
    setSelectedResourceType(typeId === selectedResourceType ? null : typeId);
  };

  // Toggle favorite status
  const toggleFavorite = (resourceId: string) => {
    setResources(resources.map(resource => 
      resource.id === resourceId 
        ? { ...resource, isFavorite: !resource.isFavorite }
        : resource
    ));
  };

  // Toggle bookmark status
  const toggleBookmark = (resourceId: string) => {
    setResources(resources.map(resource => 
      resource.id === resourceId
        ? { ...resource, isBookmarked: !resource.isBookmarked }
        : resource
    ));
  };

  // Get icon based on resource type
  const getResourceTypeIcon = (type: string) => {
    switch(type) {
      case 'article': return <BookOpen size={16} className="mr-1 text-blue-400" />;
      case 'video': return <Video size={16} className="mr-1 text-red-400" />;
      case 'ebook': return <Download size={16} className="mr-1 text-purple-400" />;
      case 'course': return <Play size={16} className="mr-1 text-green-400" />;
      default: return null;
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="bg-[#121212] shadow-md p-4 mb-6 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center">
            <BookOpen size={24} className="text-blue-400 mr-2" />
            Interview Resources
          </h1>
          <p className="text-gray-400 mt-1">
            Explore our curated collection of articles, videos, and courses
          </p>
        </div>
        
        <div className="relative w-full md:w-64">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources..."
            aria-label="Search resources"
            className="w-full bg-[#1a1a1a] text-white border border-gray-800 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
      
      {/* Categories */}
      <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
        <div className="flex space-x-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              aria-pressed={selectedCategory === category.id}
              className={`whitespace-nowrap px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-900/40 text-blue-300 border border-blue-900/60'
                  : 'bg-[#1a1a1a] text-gray-300 hover:bg-gray-800 border border-transparent'
              }`}
            >
              {category.name} <span className="text-xs ml-1 opacity-70">({category.count})</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Resource Type Filter */}
      <div className="flex overflow-x-auto pb-2 mb-6">
        <div className="flex space-x-2">
          {resourceTypes.map(type => (
            <button
              key={type.id}
              onClick={() => handleResourceTypeChange(type.id)}
              aria-pressed={selectedResourceType === type.id}
              className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center ${
                selectedResourceType === type.id
                  ? 'bg-[#121212] text-white border border-gray-700'
                  : 'bg-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              {type.icon && <span className="mr-1">{type.icon}</span>}
              {type.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Resources Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map(resource => (
            <motion.div
              key={resource.id}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-[#121212] rounded-lg overflow-hidden shadow-lg border border-gray-800 focus-within:ring-2 focus-within:ring-blue-500"
            >
              <div className="relative h-48">
                <img
                  src={resource.imageUrl}
                  alt={resource.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#121212] to-transparent opacity-60"></div>
                <div className="absolute top-3 right-3 flex space-x-2">
                  <button 
                    onClick={() => toggleFavorite(resource.id)}
                    aria-label={resource.isFavorite ? "Remove from favorites" : "Add to favorites"}
                    className={`p-1.5 rounded-full ${resource.isFavorite ? 'bg-red-900/60 text-red-400' : 'bg-gray-900/60 text-gray-400 hover:text-red-400'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-red-500`}
                  >
                    <Heart size={16} fill={resource.isFavorite ? "currentColor" : "none"} />
                  </button>
                  <button 
                    onClick={() => toggleBookmark(resource.id)}
                    aria-label={resource.isBookmarked ? "Remove bookmark" : "Bookmark this resource"}
                    className={`p-1.5 rounded-full ${resource.isBookmarked ? 'bg-yellow-900/60 text-yellow-400' : 'bg-gray-900/60 text-gray-400 hover:text-yellow-400'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-yellow-500`}
                  >
                    <Bookmark size={16} fill={resource.isBookmarked ? "currentColor" : "none"} />
                  </button>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-900/80 text-white">
                    {getResourceTypeIcon(resource.type)}
                    {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-white font-medium text-lg leading-tight">
                    <a 
                      href={resource.url}
                      className="hover:text-blue-400 focus:outline-none focus:text-blue-400"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {resource.title}
                    </a>
                  </h3>
                </div>
                
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{resource.description}</p>
                
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {resource.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="text-xs px-2 py-0.5 rounded-full bg-blue-900/20 text-blue-300 border border-blue-900/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-800">
                  <div className="flex items-center">
                    <Star size={12} className="text-yellow-400 mr-1" />
                    <span>{resource.rating}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock size={12} className="mr-1" />
                    <span>{resource.duration}</span>
                  </div>
                  
                  <div className="text-gray-400">
                    By {resource.author}
                  </div>
                </div>
              </div>
              
              <div className="px-4 pb-4">
                <a 
                  href={resource.url}
                  className="flex items-center justify-center w-full py-2 bg-blue-900/30 hover:bg-blue-900/50 text-blue-300 rounded-lg border border-blue-900/30 transition-colors text-sm font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Access ${resource.title}`}
                >
                  Access Resource <ExternalLink size={14} className="ml-1.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-[#121212] rounded-lg p-8 text-center">
          <p className="text-gray-400 mb-2">No resources found matching your criteria</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory(null);
              setSelectedResourceType(null);
            }}
            className="text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-2 py-1"
          >
            Clear filters and try again
          </button>
        </div>
      )}
      
      {filteredResources.length > 0 && (
        <div className="flex justify-center mt-8">
          <button className="px-6 py-2 bg-blue-900/30 hover:bg-blue-900/50 text-blue-300 rounded-lg border border-blue-900/30 flex items-center">
            Load More Resources <ChevronRight size={16} className="ml-2" />
          </button>
        </div>
      )}
    </DashboardLayout>
  );
};

export default InterviewResources;