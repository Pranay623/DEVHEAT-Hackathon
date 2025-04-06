import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, Award, CheckCircle, Edit, BookOpen, Briefcase } from 'react-feather';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  jobRole: string;
  completedTests: number;
  totalInterviews: number;
  credits: number;
  skills: string[];
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data from API
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const USER_ID = localStorage.getItem('userID');
        if (!USER_ID) throw new Error('User ID not found');
        
        const response = await fetch(`https://devheat-hackathon-14ll.vercel.app/api/getuser/user/${USER_ID}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        
        const userData = await response.json();
        
        // Fetch additional data like credits
        const creditsResponse = await fetch(`https://devheat-hackathon-14ll.vercel.app/api/credits/points/${USER_ID}`);
        const creditsData = await creditsResponse.json();
        
        setProfile({
          name: userData.name || 'User',
          email: userData.email || 'user@example.com',
          phone: userData.phone || '+1 123 456 7890',
          createdAt: userData.createdAt || new Date().toISOString(),
          jobRole: userData.jobRole || 'Software Developer',
          completedTests: userData.completedTests || 5,
          totalInterviews: userData.totalInterviews || 7,
          credits: creditsData?.credits || 300,
          skills: userData.skills || ['React', 'JavaScript', 'TypeScript', 'Node.js', 'CSS']
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
        // Set fallback data for demo
        setProfile({
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+1 234 567 890',
          createdAt: '2023-10-15T00:00:00Z',
          jobRole: 'Frontend Developer',
          completedTests: 5,
          totalInterviews: 7,
          credits: 300,
          skills: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'CSS']
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, []);

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
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left column - Profile info */}
        <div className="w-full md:w-2/3 space-y-6">
          {/* Header */}
          <div className="bg-[#121212] rounded-xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600/80 to-purple-800/80 flex items-center justify-center">
                <User size={40} className="text-white" />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-white">{profile?.name}</h1>
                    <p className="text-purple-400 mt-1">{profile?.jobRole}</p>
                  </div>
                  
                  <button className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg flex items-center gap-2 text-sm">
                    <Edit size={16} /> Edit Profile
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center text-gray-300">
                    <Mail size={16} className="mr-2 text-purple-400" />
                    {profile?.email}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Phone size={16} className="mr-2 text-purple-400" />
                    {profile?.phone}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Calendar size={16} className="mr-2 text-purple-400" />
                    Member since {new Date(profile?.createdAt || '').toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-[#121212] rounded-xl p-4 shadow-lg border border-purple-900/20"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-400 text-sm">Completed Tests</h3>
                <div className="bg-purple-900/30 p-2 rounded-lg">
                  <CheckCircle size={16} className="text-purple-400" />
                </div>
              </div>
              <p className="text-3xl font-bold text-white">{profile?.completedTests}</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-[#121212] rounded-xl p-4 shadow-lg border border-blue-900/20"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-400 text-sm">Mock Interviews</h3>
                <div className="bg-blue-900/30 p-2 rounded-lg">
                  <Briefcase size={16} className="text-blue-400" />
                </div>
              </div>
              <p className="text-3xl font-bold text-white">{profile?.totalInterviews}</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-[#121212] rounded-xl p-4 shadow-lg border border-emerald-900/20"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-400 text-sm">Available Credits</h3>
                <div className="bg-emerald-900/30 p-2 rounded-lg">
                  <Award size={16} className="text-emerald-400" />
                </div>
              </div>
              <p className="text-3xl font-bold text-white">{profile?.credits}</p>
            </motion.div>
          </div>
          
          {/* Skills section */}
          <div className="bg-[#121212] rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Skills</h2>
              <button className="text-sm text-purple-400 hover:text-purple-300">Edit Skills</button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {profile?.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-purple-900/20 border border-purple-900/40 text-purple-200 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right column - Learning path and recent activity */}
        <div className="w-full md:w-1/3 space-y-6">
          <div className="bg-[#121212] rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <BookOpen size={18} className="text-blue-400 mr-2" />
              <h2 className="text-xl font-semibold text-white">Your Learning Path</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center">
                    <CheckCircle size={14} className="text-blue-400" />
                  </div>
                  <div className="absolute left-1/2 top-full h-4 w-0.5 bg-blue-900/30 transform -translate-x-1/2"></div>
                </div>
                <div className="bg-gray-800/50 p-3 rounded-lg w-full">
                  <p className="text-white text-sm font-medium">Fundamentals</p>
                  <p className="text-gray-400 text-xs">Completed 2 weeks ago</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center">
                    <CheckCircle size={14} className="text-blue-400" />
                  </div>
                  <div className="absolute left-1/2 top-full h-4 w-0.5 bg-blue-900/30 transform -translate-x-1/2"></div>
                </div>
                <div className="bg-gray-800/50 p-3 rounded-lg w-full">
                  <p className="text-white text-sm font-medium">Advanced Topics</p>
                  <p className="text-gray-400 text-xs">Completed 5 days ago</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div>
                  <div className="w-8 h-8 rounded-full bg-purple-900/30 border border-purple-500/50 flex items-center justify-center animate-pulse">
                    <span className="text-purple-400 text-xs">3</span>
                  </div>
                </div>
                <div className="bg-purple-900/20 border border-purple-800/30 p-3 rounded-lg w-full">
                  <p className="text-white text-sm font-medium">System Design</p>
                  <p className="text-purple-300 text-xs">In progress - 40% completed</p>
                  <div className="w-full h-1 bg-gray-800 rounded-full mt-2">
                    <div className="w-2/5 h-1 bg-purple-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-4 bg-blue-900/30 border border-blue-800/40 text-blue-300 py-2 rounded-lg text-sm hover:bg-blue-900/40">
              Continue Learning
            </button>
          </div>
          
          <div className="bg-[#121212] rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="border-l-2 border-emerald-500 pl-3">
                <p className="text-white text-sm">Completed AI Learning Session</p>
                <p className="text-gray-400 text-xs">2 hours ago</p>
              </div>
              <div className="border-l-2 border-blue-500 pl-3">
                <p className="text-white text-sm">Took React Fundamentals Test</p>
                <p className="text-gray-400 text-xs">Yesterday</p>
              </div>
              <div className="border-l-2 border-purple-500 pl-3">
                <p className="text-white text-sm">Mock Interview - Frontend Dev</p>
                <p className="text-gray-400 text-xs">3 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
