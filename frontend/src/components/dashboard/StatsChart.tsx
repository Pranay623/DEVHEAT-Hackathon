import React from 'react';
import { 
  XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, TooltipProps 
} from 'recharts';
import { AreaChart, Area } from 'recharts';

const data = [
  { name: 'Jan', score: 65 },
  { name: 'Feb', score: 59 },
  { name: 'Mar', score: 80 },
  { name: 'Apr', score: 81 },
  { name: 'May', score: 76 },
  { name: 'Jun', score: 85 },
  { name: 'Jul', score: 90 },
];

interface CustomTooltipProps extends TooltipProps<number, string> {}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#121212] p-2 border border-gray-800 rounded-md shadow-lg">
        <p className="text-xs text-gray-300">{`${label} : ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

const StatsChart: React.FC = () => {
  return (
    <div className="bg-[#1e1e1e] p-4 rounded-xl shadow-lg">
      <h3 className="text-lg font-bold mb-3 text-white">Performance Trends</h3>
      <div className="h-[180px]"> {/* Reduced height */}
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}
            margin={{ top: 5, right: 5, left: -20, bottom: 0 }}> {/* Reduced margins */}
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name" 
              stroke="#444" 
              tick={{ fill: '#999', fontSize: 10 }} 
              axisLine={{ stroke: '#333' }}
            />
            <YAxis 
              stroke="#444" 
              tick={{ fill: '#999', fontSize: 10 }} 
              axisLine={{ stroke: '#333' }}
              domain={[0, 100]}
            />
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="score" 
              stroke="#8884d8" 
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorScore)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between mt-2 text-xs"> {/* Smaller text and reduced margin */}
        <div className="text-center">
          <p className="text-gray-400">Average</p>
          <p className="text-white font-bold">76%</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400">Highest</p>
          <p className="text-white font-bold">90%</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400">Improvement</p>
          <p className="text-green-400 font-bold">+25%</p>
        </div>
      </div>
    </div>
  );
};

export default StatsChart;