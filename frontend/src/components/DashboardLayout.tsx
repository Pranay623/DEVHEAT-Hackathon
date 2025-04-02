import React from 'react';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="bg-black min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area - with left margin to accommodate sidebar, and scrollable */}
      <div className="flex-1 ml-[70px] lg:ml-[240px] min-h-screen transition-all duration-300">
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;