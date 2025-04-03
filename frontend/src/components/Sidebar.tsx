import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, BarChart2, FileText, Award, User, Settings, 
  LogOut, ChevronLeft, ChevronRight
} from 'react-feather';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const location = useLocation();
  
  // Check screen size on mount and when resized
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
      if (window.innerWidth >= 1024) {
        setCollapsed(false); // Ensure sidebar is expanded on large screens
      }
    };
    
    // Initial check
    checkScreenSize();
    
    // Add resize listener
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  const menuItems = [
    {
      name: 'Dashboard',
      icon: <Home size={20} />,
      path: '/dashboard',
    },
    {
      name: 'Stats',
      icon: <BarChart2 size={20} />,
      path: '/stats',
    },
    {
      name: 'Tests',
      icon: <FileText size={20} />,
      path: '/tests',
    },
    {
      name: 'Credits',
      icon: <Award size={20} />,
      path: '/credits',
    },
    {
      name: 'Settings',
      icon: <Settings size={20} />,
      path: '/settings',
    },
  ];

  const toggleSidebar = () => {
    if (!isLargeScreen) {
      setCollapsed(!collapsed);
    }
  };

  // Determine if text should be shown (always on large screens, or when not collapsed on small screens)
  const shouldShowText = isLargeScreen || !collapsed;

  return (
    <>
      {/* Mobile overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300 lg:hidden ${collapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        onClick={() => setCollapsed(true)}
      />

      {/* Fixed Sidebar */}
      <div className={`
        fixed top-0 left-0 h-screen bg-[#121212] text-white z-30
        flex flex-col transition-all duration-300
        ${isLargeScreen ? 'w-[240px]' : collapsed ? 'w-[70px]' : 'w-[240px]'}
        shadow-xl
      `}>
        {/* Toggle button - only visible on small/medium screens */}
        <button 
          className="lg:hidden absolute -right-3 top-9 bg-[#121212] rounded-full p-1 shadow-md flex justify-center items-center"
          onClick={toggleSidebar}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        {/* Logo */}
        <div className="py-6 px-4 border-b border-gray-800">
          {collapsed && !isLargeScreen ? (
            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold text-lg mx-auto">
              M
            </div>
          ) : (
            <h1 className="text-xl font-bold">MockPrep</h1>
          )}
        </div>

        {/* Menu items - with overflow scrolling */}
        <div className="flex-1 py-6 overflow-y-auto">
          <ul>
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center px-4 py-3 mb-2 transition-colors hover:bg-white/10
                    ${location.pathname === item.path ? 'bg-white/10 border-l-4 border-white' : ''}
                  `}
                >
                  <span className="text-gray-300">{item.icon}</span>
                  {shouldShowText && <span className="ml-4">{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* User profile - at bottom */}
        <div className="mt-auto border-t border-gray-800 py-4 px-4">
          <div className={`
              flex items-center transition-colors rounded-md p-2
            `}>
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
              <User size={16} />
            </div>
            {shouldShowText && (
              <div className="ml-3">
                <div className="font-medium">John Doe</div>
                <div className="text-xs text-gray-400">Premium Member</div>
              </div>
            )}
          </div>
          
          {/* Logout button */}
          <Link 
            to="/logout"
            className="flex items-center mt-4 text-gray-400 hover:text-white transition-colors px-2"
          >
            <LogOut size={16} />
            {shouldShowText && <span className="ml-4 text-sm">Log out</span>}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;