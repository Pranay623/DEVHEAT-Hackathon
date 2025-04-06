import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Briefcase, Award, BookOpen, ChevronRight, CheckCircle, Clock, Star, Code, Database, Server, Layout, Settings, Users, FileText } from 'react-feather';
import DashboardLayout from '../components/DashboardLayout';

type CareerPath = 'frontend' | 'backend' | 'fullstack' | 'devops' | 'management';
type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

interface Skill {
  name: string;
  level: number; // 0-100
  category: string;
}

interface Milestone {
  title: string;
  description: string;
  skills: string[];
  resources: {
    title: string;
    type: 'video' | 'article' | 'course' | 'book';
    url: string;
  }[];
  completed?: boolean;
}

interface CareerPathData {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  milestones: Milestone[];
  requiredSkills: Skill[];
}

const CareerRoadmap: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState<CareerPath>('frontend');
  const [userLevel, setUserLevel] = useState<SkillLevel>('intermediate');
  const [expandedMilestone, setExpandedMilestone] = useState<number | null>(null);
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, number[]>>({
    frontend: [0, 1],
    backend: [0],
    fullstack: [],
    devops: [],
    management: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleToggleMilestoneComplete = (index: number) => {
    const newCompletedMilestones = { ...completedMilestones };
    
    if (completedMilestones[selectedPath].includes(index)) {
      // Remove from completed
      newCompletedMilestones[selectedPath] = completedMilestones[selectedPath].filter(i => i !== index);
    } else {
      // Add to completed
      newCompletedMilestones[selectedPath] = [...completedMilestones[selectedPath], index];
    }
    
    setCompletedMilestones(newCompletedMilestones);
  };

  const careerPaths: Record<CareerPath, CareerPathData> = {
    frontend: {
      title: "Frontend Development",
      description: "Master the art of building user interfaces and client-side applications",
      icon: <Layout size={20} />,
      color: "from-purple-700/30 to-purple-900/30 border-purple-900/40",
      requiredSkills: [
        { name: "HTML/CSS", level: 85, category: "Core" },
        { name: "JavaScript", level: 90, category: "Core" },
        { name: "React", level: 75, category: "Framework" },
        { name: "TypeScript", level: 60, category: "Language" },
        { name: "UI/UX Design", level: 40, category: "Design" },
        { name: "Testing", level: 35, category: "Quality" },
      ],
      milestones: [
        {
          title: "The Fundamentals",
          description: "Master HTML, CSS, and JavaScript basics to build simple interactive websites",
          skills: ["HTML5", "CSS3", "JavaScript ES6+", "DOM Manipulation"],
          resources: [
            { title: "MDN Web Docs", type: "article", url: "https://developer.mozilla.org" },
            { title: "Frontend Masters Bootcamp", type: "course", url: "#" },
          ]
        },
        {
          title: "Advanced CSS & Layouts",
          description: "Learn modern CSS techniques for responsive layouts and animations",
          skills: ["Flexbox", "CSS Grid", "CSS Animations", "Media Queries", "SASS/SCSS"],
          resources: [
            { title: "CSS-Tricks Guide to Flexbox", type: "article", url: "#" },
            { title: "Advanced CSS Animations", type: "video", url: "#" },
          ]
        },
        {
          title: "JavaScript Frameworks",
          description: "Build single-page applications with React, Vue, or Angular",
          skills: ["React", "State Management", "Component Architecture", "Hooks"],
          resources: [
            { title: "React Official Docs", type: "article", url: "#" },
            { title: "Building Modern UIs", type: "course", url: "#" },
          ]
        },
        {
          title: "Performance Optimization",
          description: "Optimize your frontend applications for speed and efficiency",
          skills: ["Code Splitting", "Lazy Loading", "Web Performance", "Lighthouse"],
          resources: [
            { title: "Web.dev Performance Guide", type: "article", url: "#" },
            { title: "Frontend Performance Masterclass", type: "course", url: "#" },
          ]
        },
        {
          title: "Advanced Frontend Architecture",
          description: "Master complex state management and architecture patterns",
          skills: ["Redux", "Design Patterns", "Micro-frontends", "Module Federation"],
          resources: [
            { title: "Redux Documentation", type: "article", url: "#" },
            { title: "Micro-frontend Architecture", type: "video", url: "#" },
          ]
        },
      ]
    },
    backend: {
      title: "Backend Development",
      description: "Build robust server-side applications and APIs",
      icon: <Server size={20} />,
      color: "from-blue-700/30 to-blue-900/30 border-blue-900/40",
      requiredSkills: [
        { name: "Node.js", level: 70, category: "Runtime" },
        { name: "Express", level: 65, category: "Framework" },
        { name: "Databases", level: 60, category: "Storage" },
        { name: "API Design", level: 75, category: "Architecture" },
        { name: "Authentication", level: 50, category: "Security" },
        { name: "Testing", level: 45, category: "Quality" },
      ],
      milestones: [
        {
          title: "Server-side Basics",
          description: "Learn server architecture and basic API creation",
          skills: ["Node.js", "Express.js", "HTTP Protocol", "REST APIs"],
          resources: [
            { title: "Node.js Documentation", type: "article", url: "#" },
            { title: "RESTful API Design", type: "course", url: "#" },
          ]
        },
        {
          title: "Databases & Data Modeling",
          description: "Master database operations and data schema design",
          skills: ["SQL", "MongoDB", "Data Modeling", "ORM/ODM"],
          resources: [
            { title: "Database Design Fundamentals", type: "article", url: "#" },
            { title: "MongoDB University", type: "course", url: "#" },
          ]
        },
        // Add more milestones here
      ]
    },
    fullstack: {
      title: "Full Stack Development",
      description: "Master both frontend and backend technologies for end-to-end development",
      icon: <Code size={20} />,
      color: "from-emerald-700/30 to-emerald-900/30 border-emerald-900/40",
      requiredSkills: [
        // Add skills
      ],
      milestones: [
        // Add milestones
      ]
    },
    devops: {
      title: "DevOps & Infrastructure",
      description: "Learn CI/CD, cloud platforms, and infrastructure automation",
      icon: <Settings size={20} />,
      color: "from-orange-700/30 to-orange-900/30 border-orange-900/40",
      requiredSkills: [
        // Add skills
      ],
      milestones: [
        // Add milestones
      ]
    },
    management: {
      title: "Engineering Management",
      description: "Develop leadership skills and technical team management",
      icon: <Users size={20} />,
      color: "from-red-700/30 to-red-900/30 border-red-900/40",
      requiredSkills: [
        // Add skills
      ],
      milestones: [
        // Add milestones
      ]
    },
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <div className="w-12 h-12 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="bg-[#121212] shadow-md p-4 mb-6 rounded-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-purple-900/30 p-2 rounded-lg mr-3">
              <Zap size={20} className="text-purple-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Career Roadmaps</h1>
              <p className="text-gray-400 text-sm">Plan your career progression with personalized pathways</p>
            </div>
          </div>
          
          <div>
            <select 
              className="bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-1.5 text-sm"
              value={userLevel}
              onChange={(e) => setUserLevel(e.target.value as SkillLevel)}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Career Path Selection */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
        {(Object.keys(careerPaths) as CareerPath[]).map(path => (
          <button
            key={path}
            onClick={() => setSelectedPath(path)}
            className={`p-3 rounded-lg transition-all flex flex-col items-center bg-gradient-to-br border ${
              selectedPath === path
                ? `${careerPaths[path].color} ring-2 ring-offset-2 ring-offset-[#0a0a0a] ring-purple-500/50`
                : 'from-gray-800/50 to-gray-900 border-gray-700'
            }`}
          >
            <div className={`p-2 rounded-full ${selectedPath === path ? 'bg-purple-900/40 text-purple-300' : 'bg-gray-800 text-gray-400'}`}>
              {careerPaths[path].icon}
            </div>
            <span className={`mt-2 text-sm font-medium ${selectedPath === path ? 'text-white' : 'text-gray-400'}`}>
              {careerPaths[path].title.split(' ')[0]}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Left column - Path description and skills */}
        <div className="space-y-6">
          {/* Path description */}
          <div className={`bg-gradient-to-br ${careerPaths[selectedPath].color} border rounded-xl shadow-lg p-5`}>
            <h2 className="text-2xl font-bold text-white flex items-center">
              {careerPaths[selectedPath].title}
            </h2>
            <p className="text-gray-200 mt-1">{careerPaths[selectedPath].description}</p>
            
            <div className="mt-4 flex justify-between">
              <div>
                <p className="text-sm text-gray-300">Progress</p>
                <p className="text-lg font-bold text-white">
                  {completedMilestones[selectedPath]?.length || 0}/{careerPaths[selectedPath].milestones.length}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-300">Level</p>
                <p className="text-lg font-bold text-white capitalize">{userLevel}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-300">Est. Time</p>
                <p className="text-lg font-bold text-white">6 months</p>
              </div>
            </div>
          </div>
          
          {/* Skills */}
          <div className="bg-[#121212] border border-gray-800 rounded-xl shadow-lg p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">Required Skills</h3>
              <span className="text-xs text-purple-400 font-medium">
                {careerPaths[selectedPath].requiredSkills.length} skills
              </span>
            </div>
            
            <div className="space-y-4">
              {careerPaths[selectedPath].requiredSkills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className="text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-800 rounded-full">
                    <div 
                      className={`h-1.5 rounded-full ${
                        skill.level >= 80 ? 'bg-green-500' : 
                        skill.level >= 60 ? 'bg-blue-500' : 
                        skill.level >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 bg-gray-800 hover:bg-gray-700 text-sm text-white py-2 rounded-lg">
              Take Skills Assessment
            </button>
          </div>
          
          {/* Resources */}
          <div className="bg-[#121212] border border-gray-800 rounded-xl shadow-lg p-5">
            <div className="flex items-center mb-4">
              <BookOpen size={18} className="text-purple-400 mr-2" />
              <h3 className="text-lg font-bold text-white">Learning Resources</h3>
            </div>
            
            <div className="space-y-3">
              <div className="bg-gray-800/50 p-3 rounded-lg">
                <div className="flex justify-between items-start">
                  <h4 className="text-white font-medium">Frontend Path Bundle</h4>
                  <span className="bg-purple-900/60 text-purple-300 px-1.5 py-0.5 text-xs rounded">Popular</span>
                </div>
                <p className="text-gray-400 text-sm mt-1">Complete collection of resources for mastering frontend</p>
                <button className="mt-2 text-sm text-purple-400 flex items-center">
                  View resources <ChevronRight size={14} className="ml-1" />
                </button>
              </div>
              
              <div className="bg-gray-800/50 p-3 rounded-lg">
                <h4 className="text-white font-medium">JavaScript Mastery</h4>
                <p className="text-gray-400 text-sm mt-1">Advanced JavaScript concepts and patterns</p>
                <button className="mt-2 text-sm text-purple-400 flex items-center">
                  View resources <ChevronRight size={14} className="ml-1" />
                </button>
              </div>
              
              <div className="bg-gray-800/50 p-3 rounded-lg">
                <h4 className="text-white font-medium">Modern React 2025</h4>
                <p className="text-gray-400 text-sm mt-1">Latest React features and best practices</p>
                <button className="mt-2 text-sm text-purple-400 flex items-center">
                  View resources <ChevronRight size={14} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column - Milestones */}
        <div className="lg:col-span-2">
          <div className="bg-[#121212] border border-gray-800 rounded-xl shadow-lg p-5">
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center">
                <div className={`p-1.5 rounded bg-purple-900/30 mr-2`}>
                  <Award size={16} className="text-purple-400" />
                </div>
                <h2 className="text-xl font-bold text-white">Milestone Path</h2>
              </div>
              <span className="text-sm text-gray-400">
                {completedMilestones[selectedPath]?.length || 0}/{careerPaths[selectedPath].milestones.length} completed
              </span>
            </div>
            
            <div className="space-y-8">
              {careerPaths[selectedPath].milestones.map((milestone, index) => {
                const isCompleted = completedMilestones[selectedPath]?.includes(index);
                const isExpanded = expandedMilestone === index;
                
                return (
                  <div key={index} className="relative">
                    {/* Timeline line */}
                    {index < careerPaths[selectedPath].milestones.length - 1 && (
                      <div className={`absolute left-3 top-8 bottom-0 w-0.5 ${isCompleted ? 'bg-purple-500' : 'bg-gray-700'}`} />
                    )}
                    
                    {/* Milestone content */}
                    <div className="flex">
                      {/* Timeline circle */}
                      <div className={`relative z-10 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-4 ${
                        isCompleted 
                          ? 'bg-purple-500 text-white' 
                          : 'bg-gray-800 border border-gray-700 text-gray-500'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle size={14} />
                        ) : (
                          <span className="text-xs font-medium">{index + 1}</span>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className={`flex-grow bg-gradient-to-r p-4 rounded-lg cursor-pointer transition-all ${
                        isCompleted 
                          ? 'from-purple-900/20 to-purple-700/10 border border-purple-700/30' 
                          : 'from-gray-800 to-gray-900 border border-gray-700'
                      }`}>
                        <div 
                          className="flex justify-between items-start"
                          onClick={() => setExpandedMilestone(isExpanded ? null : index)}
                        >
                          <div>
                            <h3 className={`font-bold ${isCompleted ? 'text-purple-300' : 'text-white'}`}>
                              {milestone.title}
                            </h3>
                            <p className="text-gray-400 text-sm mt-1">{milestone.description}</p>
                          </div>
                          
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleMilestoneComplete(index);
                            }}
                            className={`ml-2 p-1 rounded-full flex-shrink-0 ${
                              isCompleted 
                                ? 'bg-purple-900/30 text-purple-300 hover:bg-purple-800/40' 
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle size={16} />
                            ) : (
                              <Clock size={16} />
                            )}
                          </button>
                        </div>
                        
                        {/* Skills list */}
                        <div className="flex flex-wrap gap-1 mt-3">
                          {milestone.skills.map((skill, skillIndex) => (
                            <span 
                              key={skillIndex} 
                              className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                        
                        {/* Expanded content */}
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-4 border-t border-gray-700"
                          >
                            <h4 className="text-white font-medium mb-2">Resources</h4>
                            <div className="space-y-2">
                              {milestone.resources.map((resource, resourceIndex) => (
                                <a 
                                  key={resourceIndex} 
                                  href={resource.url} 
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                                >
                                  {resource.type === 'video' && <Play className="text-red-400 mr-2" size={16} />}
                                  {resource.type === 'article' && <FileText className="text-blue-400 mr-2" size={16} />}
                                  {resource.type === 'course' && <BookOpen className="text-green-400 mr-2" size={16} />}
                                  {resource.type === 'book' && <Book className="text-amber-400 mr-2" size={16} />}
                                  <span className="text-white text-sm">{resource.title}</span>
                                  <ArrowRight size={14} className="text-gray-500 ml-auto" />
                                </a>
                              ))}
                            </div>
                            
                            {/* Start button */}
                            <button 
                              className={`mt-4 px-4 py-2 rounded-lg text-sm w-full ${
                                isCompleted 
                                  ? 'bg-purple-700 hover:bg-purple-600 text-white' 
                                  : 'bg-blue-700 hover:bg-blue-600 text-white'
                              }`}
                            >
                              {isCompleted ? 'Review Again' : 'Start Learning'}
                            </button>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {/* Final milestone - career achievement */}
              <div className="flex">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-4 animate-pulse">
                  <Star size={14} className="text-white" />
                </div>
                
                <div className="flex-grow bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-4 rounded-lg border border-purple-700/30">
                  <h3 className="font-bold text-gradient bg-gradient-to-r from-purple-400 to-pink-400 inline-block">
                    {selectedPath === 'frontend' ? 'Senior Frontend Developer' : 
                     selectedPath === 'backend' ? 'Senior Backend Developer' : 
                     selectedPath === 'fullstack' ? 'Senior Full Stack Developer' : 
                     selectedPath === 'devops' ? 'DevOps Engineer' : 
                     'Engineering Manager'}
                  </h3>
                  <p className="text-gray-300 text-sm mt-1">Complete all milestones to achieve this career level</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Career insights */}
      <div className="bg-[#121212] border border-gray-800 rounded-xl shadow-lg p-5 mb-6">
        <h2 className="text-xl font-bold text-white mb-4">Career Market Insights</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <Briefcase size={18} className="text-blue-400 mr-2" />
              <h3 className="text-lg font-medium text-white">Job Opportunities</h3>
            </div>
            <p className="text-4xl font-bold mb-2 text-white">1,240</p>
            <p className="text-sm text-gray-400">Open positions for {careerPaths[selectedPath].title}</p>
            <div className="mt-3 text-green-400 flex items-center text-sm">
              <ArrowRight size={14} className="mr-1" />
              <span>+12% from last month</span>
            </div>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <Award size={18} className="text-emerald-400 mr-2" />
              <h3 className="text-lg font-medium text-white">Average Salary</h3>
            </div>
            <p className="text-4xl font-bold mb-2 text-white">$110K</p>
            <p className="text-sm text-gray-400">For {userLevel} level in this path</p>
            <div className="mt-3 text-emerald-400 flex items-center text-sm">
              <ArrowRight size={14} className="mr-1" />
              <span>Negotiation tips</span>
            </div>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <Database size={18} className="text-purple-400 mr-2" />
              <h3 className="text-lg font-medium text-white">Top Skills</h3>
            </div>
            <div className="space-y-2 mt-2">
              <div className="flex items-center">
                <div className="w-1 h-4 bg-purple-500 rounded-full mr-2"></div>
                <span className="text-white">React</span>
                <span className="ml-auto text-gray-400 text-sm">62%</span>
              </div>
              <div className="flex items-center">
                <div className="w-1 h-4 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-white">TypeScript</span>
                <span className="ml-auto text-gray-400 text-sm">48%</span>
              </div>
              <div className="flex items-center">
                <div className="w-1 h-4 bg-emerald-500 rounded-full mr-2"></div>
                <span className="text-white">Next.js</span>
                <span className="ml-auto text-gray-400 text-sm">31%</span>
              </div>
            </div>
            <div className="mt-3 text-purple-400 flex items-center text-sm">
              <ArrowRight size={14} className="mr-1" />
              <span>View all in-demand skills</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

// Needed for missing icon imports
const Play = ({ className, size }: { className?: string, size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

const Book = ({ className, size }: { className?: string, size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
  </svg>
);

export default CareerRoadmap;