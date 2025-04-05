import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, Activity, FileText, Command, Zap } from 'react-feather';
import DashboardLayout from '../components/DashboardLayout';
import StatsChart from '../components/dashboard/StatsChart';
import FeatureCard from '../components/dashboard/FeatureCard';
import CreditsCard from '../components/dashboard/CreditsCard';
import MockTestCard from '../components/dashboard/MockTestCard';
import LearnWithAICard from '../components/dashboard/LearnWithAICard';
import AIRecommendCard from '../components/dashboard/AIRecommendCard';
import UserProfileCard from '../components/dashboard/UserProfileCard';
import WizardModal from '@/components/WizardModal';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [wizardCompleted, setWizardCompleted] = useState<boolean | null>(null);

  useEffect(() => {
    const wizardValue = localStorage.getItem('wizard'); // expects 'true' or 'false'
    if (wizardValue === 'true') {
      setWizardCompleted(true);
    } else {
      setWizardCompleted(false);
    }
  }, []);

  const handleWizardComplete = (answers: any) => {
    console.log('Wizard answers:', answers);
    localStorage.setItem('wizard', 'true');
    setWizardCompleted(true);
    // You can also POST `answers` to your backend API here.
  };

  if (wizardCompleted === null) return null;

  // Show Wizard Modal if not completed
  if (!wizardCompleted) {
    return <WizardModal onComplete={handleWizardComplete} />;
  }

  return (
    <DashboardLayout>
      {/* Top Navigation Bar */}
      <div className="bg-[#121212] shadow-md p-3 mb-4 rounded-lg">
        <div className="flex justify-between items-center">
          {/* Page title */}
          <h1 className="text-lg font-bold text-white">Dashboard</h1>
          
          {/* Search and notification */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search..."
                className="bg-[#1e1e1e] text-white placeholder-gray-400 rounded-full py-1.5 px-4 pl-8 focus:outline-none focus:ring-1 focus:ring-white/30 w-48 text-sm"
              />
              <Search size={14} className="absolute left-2.5 top-[50%] transform -translate-y-1/2 text-gray-400" />
            </div>
            
            <button className="text-gray-300 hover:text-white relative">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-3.5 h-3.5 flex items-center justify-center text-xs">
                3
              </span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Left Column - User Profile & Credits */}
        <div className="space-y-4">
          <UserProfileCard />
          <CreditsCard />
        </div>
        
        {/* Middle Column - Stats Chart & Mock Tests */}
        <div className="space-y-4">
          <StatsChart />
          <MockTestCard />
        </div>
        
        {/* Right Column - Learn with AI & AI Recommendations */}
        <div className="space-y-4">
          <LearnWithAICard />
          <AIRecommendCard />
        </div>
      </div>
      
      {/* Feature Cards Row */}
      <div>
        <h2 className="text-xl font-bold text-white mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <FeatureCard 
            title="Practice Questions" 
            description="Access thousands of interview questions across various domains and difficulty levels."
            icon={<Activity size={20} />}
            to="/practice"
            buttonText="Start Practicing"
          />
          
          <FeatureCard 
            title="Mock Interviews" 
            description="Schedule real-time mock interviews with AI or expert reviewers."
            icon={<FileText size={20} />}
            to="/mock-interviews"
            buttonText="Book a Session"
            bgColor="bg-gradient-to-br from-blue-900/30 to-[#1e1e1e]"
            borderColor="border-blue-900/30"
          />
          
          <FeatureCard 
            title="Interview Resources" 
            description="Discover helpful articles, tutorials, and guides for your specific role."
            icon={<Command size={20} />}
            to="/resources"
            buttonText="Browse Resources"
            bgColor="bg-gradient-to-br from-emerald-900/30 to-[#1e1e1e]"
            borderColor="border-emerald-900/30"
          />
          
          <FeatureCard 
            title="Career Roadmaps" 
            description="Get customized career paths and skills development recommendations."
            icon={<Zap size={20} />}
            to="/roadmaps"
            buttonText="View Roadmaps"
            bgColor="bg-gradient-to-br from-purple-900/30 to-[#1e1e1e]"
            borderColor="border-purple-900/30"
          />
        </div>
      </div>
      
      {/* Recent Activity Section (Now at the bottom) */}
      <div className="mt-4 bg-[#1e1e1e] p-4 rounded-xl shadow-lg">
        <h3 className="text-lg font-bold mb-3 text-white">Recent Activity</h3>
        <div className="space-y-2">
          {[
            { id: 1, action: 'Completed Test', name: 'Web Accessibility', score: '85%', date: '2024-03-30' },
            { id: 2, action: 'Started Learning', name: 'TypeScript Basics', progress: '30%', date: '2024-03-28' },
            { id: 3, action: 'Earned Badge', name: 'JavaScript Expert', date: '2024-03-25' },
          ].map(activity => (
            <div key={activity.id} className="flex items-center justify-between border-b border-gray-800 pb-2">
              <div>
                <div className="font-medium text-white text-sm">{activity.name}</div>
                <div className="text-xs text-gray-400">
                  {activity.action} • {activity.date}
                </div>
              </div>
              {activity.score && (
                <div className="text-green-400 font-medium text-sm">{activity.score}</div>
              )}
              {activity.progress && (
                <div className="w-16 bg-gray-700 rounded-full h-1.5">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: activity.progress }}></div>
                </div>
              )}
              {!activity.score && !activity.progress && (
                <div className="bg-purple-900 text-purple-300 px-2 py-0.5 rounded-full text-xs">Badge</div>
              )}
            </div>
          ))}
          <button 
            className="text-xs text-purple-400 hover:text-purple-300 mt-1"
            onClick={() => navigate('/activity')}
          >
            View all activity →
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;