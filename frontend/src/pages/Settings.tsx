import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
//   Globe, 
  Moon, 
  Sun,
  User, 
  CreditCard, 
  LogOut, 
  ChevronRight, 
  Save, 
//   Toggle,
  Eye,
  EyeOff
} from 'react-feather';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'account' | 'notifications' | 'appearance' | 'privacy' | 'subscription' | 'security'>('account');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: 'test_reminders',
      title: 'Test Reminders',
      description: 'Receive reminders for upcoming mock tests',
      enabled: true,
    },
    {
      id: 'new_features',
      title: 'New Features',
      description: 'Be notified when we add new features or content',
      enabled: true,
    },
    {
      id: 'progress_updates',
      title: 'Progress Updates',
      description: 'Weekly summary of your learning progress',
      enabled: false,
    },
    {
      id: 'interview_tips',
      title: 'Interview Tips',
      description: 'Receive tips for your upcoming interviews',
      enabled: true,
    },
  ]);
  const [userSettings, setUserSettings] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 890',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    language: 'en',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleSaveAccountSettings = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would call your API to save settings
    alert('Account settings saved successfully');
  };

  const toggleNotification = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id 
        ? { ...notification, enabled: !notification.enabled }
        : notification
    ));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    // Fetch user settings from API
    // This is where you would load persisted settings from your backend
  }, []);

  // Toggle password visibility
  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field]
    });
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="bg-[#121212] rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-white flex items-center">
            <SettingsIcon size={24} className="text-purple-400 mr-3" />
            Settings
          </h1>
          <p className="text-gray-400 mt-1">Manage your account preferences and settings</p>
        </div>

        {/* Settings Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-64 bg-[#121212] rounded-xl shadow-lg p-2">
            <nav className="space-y-1">
              {[
                { id: 'account', label: 'Account', icon: <User size={18} /> },
                { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
                { id: 'appearance', label: 'Appearance', icon: <Moon size={18} /> },
                { id: 'privacy', label: 'Privacy & Security', icon: <Shield size={18} /> },
                { id: 'subscription', label: 'Subscription', icon: <CreditCard size={18} /> },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-purple-900/30 text-purple-200 border-l-2 border-purple-500'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <span className="flex items-center">
                    <span className={`mr-3 ${activeTab === item.id ? 'text-purple-400' : 'text-gray-400'}`}>{item.icon}</span>
                    {item.label}
                  </span>
                  {activeTab === item.id && <ChevronRight size={16} className="text-purple-400" />}
                </button>
              ))}

              <div className="pt-4 mt-4 border-t border-gray-800">
                <button className="flex items-center w-full p-3 rounded-lg text-red-400 hover:bg-gray-800 transition-colors">
                  <LogOut size={18} className="mr-3" />
                  Log Out
                </button>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-[#121212] rounded-xl shadow-lg p-6">
            <AnimatedTabContent activeTab={activeTab} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );

  function AnimatedTabContent({ activeTab }: { activeTab: string }) {
    return (
      <div className="relative overflow-hidden">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="w-full"
        >
          {/* Account Settings */}
          {activeTab === 'account' && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">Account Settings</h2>
              <form onSubmit={handleSaveAccountSettings}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={userSettings.name}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={userSettings.email}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      value={userSettings.phone}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="language" className="block text-sm font-medium text-gray-300 mb-1">Language</label>
                    <select
                      id="language"
                      name="language"
                      value={userSettings.language}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-medium text-white mb-3">Change Password</h3>
                  <div className="space-y-4">
                    <div className="relative">
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300 mb-1">Current Password</label>
                      <div className="relative">
                        <input
                          id="currentPassword"
                          name="currentPassword"
                          type={showPasswords.current ? "text" : "password"}
                          value={userSettings.currentPassword}
                          onChange={handleInputChange}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white focus:ring-purple-500 focus:border-purple-500"
                        />
                        <button 
                          type="button" 
                          onClick={() => togglePasswordVisibility('current')}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                        >
                          {showPasswords.current ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                    <div className="relative">
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-1">New Password</label>
                      <div className="relative">
                        <input
                          id="newPassword"
                          name="newPassword"
                          type={showPasswords.new ? "text" : "password"}
                          value={userSettings.newPassword}
                          onChange={handleInputChange}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white focus:ring-purple-500 focus:border-purple-500"
                        />
                        <button 
                          type="button" 
                          onClick={() => togglePasswordVisibility('new')}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                        >
                          {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                    <div className="relative">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
                      <div className="relative">
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showPasswords.confirm ? "text" : "password"}
                          value={userSettings.confirmPassword}
                          onChange={handleInputChange}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-white focus:ring-purple-500 focus:border-purple-500"
                        />
                        <button 
                          type="button" 
                          onClick={() => togglePasswordVisibility('confirm')}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                        >
                          {showPasswords.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button 
                    type="submit" 
                    className="flex items-center bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Save size={16} className="mr-2" />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">Notification Settings</h2>
              <div className="space-y-6">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                  >
                    <div>
                      <h3 className="text-white font-medium">{notification.title}</h3>
                      <p className="text-gray-400 text-sm">{notification.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notification.enabled}
                        onChange={() => toggleNotification(notification.id)}
                      />
                      <div className={`w-11 h-6 rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${notification.enabled ? 'bg-purple-600' : 'bg-gray-700'}`}></div>
                    </label>
                  </div>
                ))}

                <div className="flex justify-end mt-6">
                  <button className="flex items-center bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors">
                    <Save size={16} className="mr-2" />
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">Appearance Settings</h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-white mb-3">Theme</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    className={`p-4 bg-gray-900 border rounded-lg cursor-pointer transition-all hover:border-purple-500 ${darkMode ? 'border-purple-500 ring-2 ring-purple-500/20' : 'border-gray-700'}`}
                    onClick={() => setDarkMode(true)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-medium">Dark Theme</h4>
                      <Moon size={18} className="text-purple-400" />
                    </div>
                    <div className="h-24 bg-gray-900 rounded-md border border-gray-800 flex items-center justify-center">
                      <div className="w-3/4 h-4 bg-gray-800 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div 
                    className={`p-4 bg-gray-200 border rounded-lg cursor-pointer transition-all hover:border-blue-500 ${!darkMode ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-gray-300'}`}
                    onClick={() => setDarkMode(false)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-gray-800 font-medium">Light Theme</h4>
                      <Sun size={18} className="text-amber-500" />
                    </div>
                    <div className="h-24 bg-white rounded-md border border-gray-300 flex items-center justify-center">
                      <div className="w-3/4 h-4 bg-gray-200 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-white mb-3">Font Size</h3>
                <div className="flex space-x-4">
                  {['Small', 'Medium', 'Large'].map((size, index) => (
                    <button 
                      key={size}
                      className={`px-4 py-2 rounded-lg ${index === 1 ? 'bg-purple-700 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button className="flex items-center bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors">
                  <Save size={16} className="mr-2" />
                  Save Appearance
                </button>
              </div>
            </div>
          )}

          {/* Privacy & Security */}
          {activeTab === 'privacy' && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">Privacy & Security Settings</h2>
              
              <div className="space-y-6">
                <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">Two-Factor Authentication</h3>
                    <div className="bg-amber-900/30 text-amber-300 text-xs px-2 py-0.5 rounded-full">Not Enabled</div>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">Add an extra layer of security to your account by requiring a verification code in addition to your password.</p>
                  <button className="bg-purple-700 hover:bg-purple-600 text-white px-3 py-1 rounded-lg text-sm transition-colors">
                    Enable 2FA
                  </button>
                </div>
                
                <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">Data Sharing</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={true} />
                      <div className="w-11 h-6 rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all bg-purple-600"></div>
                    </label>
                  </div>
                  <p className="text-gray-400 text-sm">Allow us to use your test results and learning patterns to improve our platform and recommendations.</p>
                </div>
                
                <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">Email Privacy</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={false} />
                      <div className="w-11 h-6 rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all bg-gray-700"></div>
                    </label>
                  </div>
                  <p className="text-gray-400 text-sm">Hide your email from other users on the platform.</p>
                </div>
                
                <div className="p-4 bg-red-900/10 rounded-lg border border-red-900/30">
                  <h3 className="text-red-400 font-medium mb-2">Danger Zone</h3>
                  <p className="text-gray-400 text-sm mb-3">Permanently delete your account and all associated data. This action cannot be undone.</p>
                  <button className="bg-red-700 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Subscription */}
          {activeTab === 'subscription' && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">Subscription Settings</h2>
              
              <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-4 rounded-lg border border-purple-900/30 mb-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-purple-300 font-semibold">Premium Plan</h3>
                    <p className="text-white font-bold text-2xl mt-1">$9.99 / month</p>
                    <p className="text-gray-400 text-sm mt-1">Renews on May 15, 2025</p>
                  </div>
                  <div className="bg-purple-900/40 px-3 py-1 rounded-full text-purple-300 text-sm">
                    Active
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium text-white mb-3">Payment Method</h3>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="bg-blue-900/30 p-2 rounded-lg mr-3">
                      <CreditCard size={20} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white">•••• •••• •••• 4242</p>
                      <p className="text-gray-400 text-sm">Expires 12/25</p>
                    </div>
                  </div>
                  <button className="text-purple-400 hover:text-purple-300 text-sm">
                    Update
                  </button>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium text-white mb-3">Billing History</h3>
                <div className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-900/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Invoice</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {[
                        { date: 'Apr 15, 2025', amount: '$9.99', status: 'Paid', invoice: '#INV-1234' },
                        { date: 'Mar 15, 2025', amount: '$9.99', status: 'Paid', invoice: '#INV-1233' },
                        { date: 'Feb 15, 2025', amount: '$9.99', status: 'Paid', invoice: '#INV-1232' },
                      ].map((item, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-3 text-sm text-gray-300">{item.date}</td>
                          <td className="px-4 py-3 text-sm text-gray-300">{item.amount}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className="bg-green-900/20 text-green-400 px-2 py-0.5 rounded-full text-xs">
                              {item.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-purple-400 hover:text-purple-300 cursor-pointer">
                            {item.invoice}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-8">
                <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Cancel Subscription
                </button>
                <button className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors">
                  Upgrade Plan
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    );
  }
};

export default Settings;