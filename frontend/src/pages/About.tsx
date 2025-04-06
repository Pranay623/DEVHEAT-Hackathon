// AboutUs.tsx
import React from "react";
import { motion } from "framer-motion";
import { Users, Star, Globe, Heart, ArrowLeftCircle, Cpu, Shield } from "react-feather";
import { Link } from "react-router-dom";

const AboutUs: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mx-auto px-4 py-10 relative w-full min-h-screen overflow-hidden"
    >
      {/* Glowing Particle Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="animate-pulse-slow absolute w-40 h-40 bg-purple-800/20 rounded-full filter blur-2xl top-1/4 left-1/4"></div>
        <div className="animate-pulse-slow absolute w-32 h-32 bg-indigo-700/20 rounded-full filter blur-2xl top-1/2 right-1/4"></div>
      </div>

      {/* Back to Home Button */}
      <Link
        to="/"
        className="absolute top-4 left-4 z-10 text-purple-300 hover:text-white transition flex items-center space-x-1"
      >
        <ArrowLeftCircle size={20} />
        <span className="text-sm">Home</span>
      </Link>

      {/* Main Card with Animated Border */}
      <div className="relative z-10 rounded-xl overflow-hidden p-[1px] bg-gradient-to-br from-purple-600/40 via-indigo-800/40 to-black/40 shadow-xl">
        <div className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-inner border border-gray-800/50">

          {/* Header */}
          <div className="bg-gradient-to-r from-purple-900/60 to-indigo-900/60 p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">About MockPrep</h2>
            <p className="text-gray-300 text-sm max-w-xl mx-auto">
              MockPrep is built using the MERN Stack, enhanced with powerful AI/ML technologies to simulate real-world interview environments and deliver personalized feedback.
            </p>
          </div>

          {/* Highlights */}
          <div className="px-8 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              {
                icon: <Users size={28} className="text-purple-400 animate-pulse" />,
                title: "10K+ Users",
                desc: "Globally trusted by learners"
              },
              {
                icon: <Star size={28} className="text-indigo-400 animate-pulse" />,
                title: "AI-Driven Insights",
                desc: "Personalized feedback & guidance"
              },
              {
                icon: <Heart size={28} className="text-pink-400 animate-pulse" />,
                title: "Community First",
                desc: "Built with love by developers"
              },
              {
                icon: <Globe size={28} className="text-blue-400 animate-pulse" />,
                title: "Global Reach",
                desc: "Accessible anytime, anywhere"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.2 }}
                className="flex flex-col items-center hover:scale-105 transition-transform duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 border border-gray-700 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-white mt-4 font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* User Journey Infographic */}
          <div className="px-8 pb-8">
            <h3 className="text-center text-xl font-bold text-indigo-300 mb-6">Your Journey with MockPrep</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              {["Sign Up", "Set Preferences", "Take Interviews", "Get Insights"].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 + i * 0.3 }}
                  className="bg-[#2a2a2a] px-6 py-4 rounded-xl text-white border border-gray-700 shadow hover:shadow-lg transition"
                >
                  <div className="text-sm font-medium text-purple-300">{`Step ${i + 1}`}</div>
                  <div className="font-bold">{step}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Problem & Solution */}
          <div className="border-t border-gray-800 px-8 py-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="max-w-3xl mx-auto"
            >
              <h3 className="text-xl font-bold text-purple-400 mb-2">Problem Statement</h3>
              <p className="text-gray-300 text-sm mb-6">
                Interview preparation is often generic and lacks personalization. Most candidates don’t get targeted feedback based on their role, level, or dream company.
              </p>

              <h3 className="text-xl font-bold text-indigo-400 mb-2">Our Solution</h3>
              <p className="text-gray-300 text-sm">
                We’ve built an AI-powered Mock Interview Platform that adapts to user inputs and provides meaningful evaluations, creating a more effective and engaging prep experience.
              </p>
            </motion.div>
          </div>

          {/* Key Features */}
          <div className="border-t border-gray-800 px-8 py-10">
            <h3 className="text-center text-xl font-bold text-pink-400 mb-8">Key Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
              {[
                { icon: <Cpu size={26} className="text-purple-400" />, title: "AI Interview Questions", desc: "Tailored to your role, experience & goals" },
                { icon: <Shield size={26} className="text-indigo-400" />, title: "Secure Auth System", desc: "JWT-secured logins & profile data" },
                { icon: <Star size={26} className="text-yellow-400" />, title: "Real-Time Feedback", desc: "AI evaluates and gives performance scores" },
                { icon: <Users size={26} className="text-pink-400" />, title: "Progress Tracking", desc: "Dashboard to monitor interview performance" },
                { icon: <Globe size={26} className="text-blue-400" />, title: "Company Insights", desc: "Role/company-specific preparation tips" },
                { icon: <Heart size={26} className="text-green-400" />, title: "Personalized Guidance", desc: "Gemini/OpenAI driven improvement advice" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + i * 0.15 }}
                  className="bg-[#2a2a2a] p-5 rounded-xl border border-gray-700 shadow-lg hover:scale-105 transition-transform"
                >
                  <div className="w-12 h-12 mx-auto rounded-full bg-white/5 border border-gray-600 flex items-center justify-center mb-3">
                    {item.icon}
                  </div>
                  <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mission */}
          <div className="border-t border-gray-800 px-8 py-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h3 className="text-xl font-bold text-purple-400 mb-3">Our Mission</h3>
              <p className="text-gray-300 text-sm">
                We're on a mission to democratize interview prep using cutting-edge AI, making quality preparation accessible and efficient for everyone — whether you're a student or a working professional.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutUs;
