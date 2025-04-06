import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { motion } from 'framer-motion';
import { BarChart2, TrendingUp, Award, Clock, ArrowUp, ArrowDown } from 'react-feather';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Stats: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  // Sample data - in production, you would fetch this from your API
  const performanceData = {
    week: [
      { day: 'Mon', score: 72 },
      { day: 'Tue', score: 68 },
      { day: 'Wed', score: 75 },
      { day: 'Thu', score: 80 },
      { day: 'Fri', score: 85 },
      { day: 'Sat', score: 78 },
      { day: 'Sun', score: 82 },
    ],
    month: [
      { date: '01', score: 65 },
      { date: '05', score: 70 },
      { date: '10', score: 72 },
      { date: '15', score: 68 },
      { date: '20', score: 75 },
      { date: '25', score: 80 },
      { date: '30', score: 85 },
    ],
    year: [
      { month: 'Jan', score: 65 },
      { month: 'Feb', score: 68 },
      { month: 'Mar', score: 70 },
      { month: 'Apr', score: 75 },
      { month: 'May', score: 78 },
      { month: 'Jun', score: 82 },
      { month: 'Jul', score: 80 },
      { month: 'Aug', score: 85 },
      { month: 'Sep', score: 88 },
      { month: 'Oct', score: 85 },
      { month: 'Nov', score: 90 },
      { month: 'Dec', score: 92 },
    ],
  };
  
  const subjectData = [
    { subject: 'React', score: 85, fullScore: 100, color: '#8884d8' },
    { subject: 'JavaScript', score: 78, fullScore: 100, color: '#83a6ed' },
    { subject: 'System Design', score: 65, fullScore: 100, color: '#8dd1e1' },
    { subject: 'Data Structures', score: 72, fullScore: 100, color: '#82ca9d' },
    { subject: 'Algorithms', score: 68, fullScore: 100, color: '#a4de6c' },
  ];
  
  const interviewDistribution = [
    { name: 'Technical', value: 12 },
    { name: 'Behavioral', value: 8 },
    { name: 'System Design', value: 5 },
    { name: 'Mixed', value: 3 },
  ];

  const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d'];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center">
              <BarChart2 size={24} className="text-purple-400 mr-2" />
              Performance Analytics
            </h1>
            <p className="text-gray-400 mt-1">Track your progress and identify improvement areas</p>
          </div>
          
          <div className="flex bg-[#1a1a1a] rounded-lg p-1">
            {(['week', 'month', 'year'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  timeRange === range 
                    ? 'bg-purple-900/50 text-purple-200' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-[#121212] rounded-xl p-4 shadow-lg border border-gray-800"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-gray-400 text-sm">Average Score</h3>
              <div className="bg-purple-900/30 p-1.5 rounded-lg">
                <TrendingUp size={16} className="text-purple-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white mt-2">78%</p>
            <div className="flex items-center mt-2 text-xs">
              <ArrowUp size={12} className="text-green-400 mr-1" />
              <span className="text-green-400">+5%</span>
              <span className="text-gray-400 ml-1">vs. last {timeRange}</span>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-[#121212] rounded-xl p-4 shadow-lg border border-gray-800"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-gray-400 text-sm">Highest Score</h3>
              <div className="bg-blue-900/30 p-1.5 rounded-lg">
                <Award size={16} className="text-blue-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white mt-2">92%</p>
            <div className="flex items-center mt-2 text-xs text-gray-400">
              <span>React Fundamentals Test</span>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-[#121212] rounded-xl p-4 shadow-lg border border-gray-800"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-gray-400 text-sm">Tests Completed</h3>
              <div className="bg-emerald-900/30 p-1.5 rounded-lg">
                <BarChart2 size={16} className="text-emerald-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white mt-2">15</p>
            <div className="flex items-center mt-2 text-xs">
              <ArrowUp size={12} className="text-green-400 mr-1" />
              <span className="text-green-400">+3</span>
              <span className="text-gray-400 ml-1">vs. last {timeRange}</span>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-[#121212] rounded-xl p-4 shadow-lg border border-gray-800"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-gray-400 text-sm">Time Spent</h3>
              <div className="bg-amber-900/30 p-1.5 rounded-lg">
                <Clock size={16} className="text-amber-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white mt-2">8.5h</p>
            <div className="flex items-center mt-2 text-xs">
              <ArrowDown size={12} className="text-red-400 mr-1" />
              <span className="text-red-400">-1.2h</span>
              <span className="text-gray-400 ml-1">vs. last {timeRange}</span>
            </div>
          </motion.div>
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Performance Trend */}
          <div className="lg:col-span-2 bg-[#121212] rounded-xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-white mb-4">Performance Trend</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={performanceData[timeRange]}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <CartesianGrid stroke="#333" strokeDasharray="3 3" />
                  <XAxis 
                    dataKey={timeRange === 'week' ? 'day' : timeRange === 'month' ? 'date' : 'month'} 
                    stroke="#666" 
                  />
                  <YAxis stroke="#666" domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333', borderRadius: '4px' }}
                    labelStyle={{ color: '#aaa' }}
                    itemStyle={{ color: '#8884d8' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#8884d8" 
                    strokeWidth={2} 
                    dot={{ r: 4, fill: '#8884d8', strokeWidth: 0 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Interview Distribution */}
          <div className="bg-[#121212] rounded-xl p-6 shadow-lg flex flex-col">
            <h2 className="text-lg font-semibold text-white mb-4">Interview Type Distribution</h2>
            <div className="flex-grow flex items-center justify-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={interviewDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {interviewDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333', borderRadius: '4px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Subject Performance */}
        <div className="bg-[#121212] rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-white mb-4">Subject Performance</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={subjectData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#333" />
                <XAxis type="number" domain={[0, 100]} stroke="#666" />
                <YAxis dataKey="subject" type="category" stroke="#666" width={100} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333', borderRadius: '4px' }}
                  labelStyle={{ color: '#aaa' }}
                />
                <Bar 
                  dataKey="score" 
                  background={{ fill: '#444' }}
                  radius={[0, 4, 4, 0]}
                >
                  {subjectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Stats;