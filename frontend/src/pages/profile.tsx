import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Clock,
  Briefcase,
  Rocket,
  BarChart3,
  Star,
  Target,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  TooltipProps,
} from "recharts";

// Replace with real chart data or fetch it
const performanceData = [
  { name: "Jan", score: 65 },
  { name: "Feb", score: 59 },
  { name: "Mar", score: 80 },
  { name: "Apr", score: 81 },
  { name: "May", score: 76 },
  { name: "Jun", score: 85 },
  { name: "Jul", score: 90 },
];

export default function Profile() {
  const USER_ID = localStorage.getItem("userID");
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://devheat-hackathon-14ll.vercel.app/api/getuser/user/${USER_ID}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };
    fetchUserData();
  }, []);

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c0f1c] via-[#090c19] to-[#0c0c0c] text-white px-[8rem] py-16 font-sans flex flex-col lg:flex-row gap-16">
      {/* Left Panel */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 space-y-10 max-w-2xl"
      >
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-teal-300 to-purple-300 bg-clip-text text-transparent">
          Hello, {userData.name?.toUpperCase()}
        </h1>
        <p className="text-2xl text-gray-300">
          Ready to grow your skills and reach{" "}
          <span className="text-teal-300 font-bold">
            {userData.targetCompany || "your dream company"}
          </span>
          ?
        </p>
        <p className="text-lg text-gray-400 border-l-4 border-purple-500 pl-4 leading-relaxed">
          Continuous learning is your superpower. Let’s make progress every day
          with a clear focus and passion.
        </p>

        <Section title="👤 Personal Info">
          <InfoRow
            icon={<Mail size={18} />}
            label="Email"
            value={userData.email}
          />
          <InfoRow
            icon={<Clock size={18} />}
            label="Joined On"
            value={new Date(userData.createdAt).toLocaleDateString()}
          />
        </Section>

        <Section title="🎯 Career Goals">
          <InfoRow
            icon={<Briefcase size={18} />}
            label="Role"
            value={userData.jobRole}
          />
          <InfoRow
            icon={<BarChart3 size={18} />}
            label="Experience"
            value={`${userData.experience || 0} year(s)`}
          />
          <InfoRow
            icon={<Rocket size={18} />}
            label="Target Company"
            value={userData.targetCompany}
          />
          <InfoRow
            icon={<Star size={18} />}
            label="Skill Level"
            value={userData.level}
          />
        </Section>

        <Section title="📊 Account Stats">
          <InfoRow
            icon={<CheckIcon profileCompleted={userData.profileCompleted} />}
            label="Profile Status"
            value={userData.profileCompleted ? "Completed" : "Incomplete"}
          />
          <InfoRow
            icon={<Target size={18} />}
            label="Credits"
            value={`${userData.credits || 0} pts`}
          />
        </Section>
      </motion.div>

      {/* Right Panel */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 max-w-xl space-y-8 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-2xl"
      >
        <div>
          <p className="text-sm uppercase text-gray-400 mb-2">
            Quote of the Day
          </p>
          <p className="text-2xl italic text-purple-100 leading-relaxed">
            “Success isn’t always about greatness. It’s about consistency.
            Consistent hard work leads to success.”
          </p>
        </div>

        {/* Profile Completion Bar */}
        <div className="mt-4">
          <p className="text-sm mb-2 text-gray-400">Profile Completion</p>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                userData.profileCompleted
                  ? "bg-gradient-to-r from-green-400 to-teal-400"
                  : "bg-gradient-to-r from-red-400 to-yellow-400"
              }`}
              style={{
                width: userData.profileCompleted ? "100%" : "40%",
              }}
            ></div>
          </div>
        </div>

        {/* Chart */}
        <StatsChart />
      </motion.div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md space-y-4 shadow-md">
      <h3 className="text-lg text-purple-300 font-bold">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between items-center text-gray-200">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <span className="text-sm font-semibold text-white">{value}</span>
    </div>
  );
}

function CheckIcon({ profileCompleted }: { profileCompleted: boolean }) {
  return profileCompleted ? (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="limegreen">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  ) : (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="red">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#121212] p-2 border border-gray-700 rounded-md shadow-lg">
        <p className="text-xs text-gray-300">{`${label} : ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

function StatsChart() {
  return (
    <div className="bg-[#1a1a1a] p-4 rounded-xl shadow-lg mt-[5rem]">
      <h3 className="text-lg font-bold mb-3 text-white">Performance Trends</h3>
      <div className="h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={performanceData}
            margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              stroke="#444"
              tick={{ fill: "#bbb", fontSize: 10 }}
              axisLine={{ stroke: "#333" }}
            />
            <YAxis
              stroke="#444"
              tick={{ fill: "#bbb", fontSize: 10 }}
              axisLine={{ stroke: "#333" }}
              domain={[0, 100]}
            />
            <CartesianGrid strokeDasharray="3 3" stroke="#2e2e2e" vertical={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#38bdf8"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorScore)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between mt-2 text-xs">
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
}
