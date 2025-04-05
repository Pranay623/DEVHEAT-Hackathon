import React from "react";
import { Zap } from "react-feather";
import { motion } from "framer-motion";

const recommendations = [
  {
    id: 1,
    title: "Mastering System Design",
    difficulty: "Advanced",
    relevance: "95% Match",
    topics: ["Scalability", "Database Optimization", "API Architecture"],
    link: "https://github.com/donnemartin/system-design-primer",
  },
  {
    id: 2,
    title: "Ace JavaScript Algorithms",
    difficulty: "Intermediate",
    relevance: "87% Match",
    topics: ["Sorting Techniques", "Binary Trees", "Dynamic Programming"],
    link: "https://leetcode.com/problemset/all/",
  },
];

const AIRecommendCard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-br from-[#1b1d24] to-[#111111] px-6 py-8 sm:px-8 rounded-3xl shadow-[0_0_60px_rgba(255,255,255,0.05)] border border-white/10 backdrop-blur-xl overflow-hidden w-full max-w-[80vw] mx-auto m-9"
    >
      {/* Top glowing bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-amber-400 to-pink-500 rounded-t-3xl animate-pulse" />

      {/* Glowing blobs for aura effect */}
      <div className="absolute -top-32 -left-24 w-72 h-72 bg-amber-500/20 blur-[120px] rounded-full z-0 animate-pulse" />
      <div className="absolute bottom-[-80px] right-[-40px] w-60 h-60 bg-purple-500/20 blur-[100px] rounded-full z-0 animate-pulse" />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white tracking-tight">
            ✨ Your AI-Powered Roadmap
          </h3>
          <div className="bg-amber-700/20 p-2 rounded-lg shadow-md shadow-amber-500/10">
            <Zap size={18} className="text-amber-400" />
          </div>
        </div>

        <div className="space-y-6">
          {recommendations.map((rec, i) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -3, scale: 1.01 }}
              className="bg-gradient-to-r from-white/5 to-white/2 border border-white/10 rounded-2xl p-5 transition duration-300 backdrop-blur-md hover:shadow-[0_0_20px_rgba(251,191,36,0.15)]"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-semibold text-white">
                  {rec.title}
                </h4>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-800/30 text-amber-300 border border-amber-500/30">
                  {rec.relevance}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                <span className="italic">{rec.difficulty}</span> • Dive into:{" "}
                {rec.topics.join(", ")}
              </p>
              <a
                href={rec.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full"
              >
                <button className="w-full text-sm py-2 rounded-xl bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 hover:text-white border border-amber-400/30 transition-all duration-200 font-medium tracking-wide">
                  🌟 Start This Journey
                </button>
              </a>
            </motion.div>
          ))}
        </div>

        <motion.a
          whileHover={{ scale: 1.05 }}
          href="https://roadmap.sh"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center mt-8 text-sm text-purple-400 hover:text-purple-300 transition-all underline underline-offset-4"
        >
          Explore More Smart Suggestions →
        </motion.a>
      </div>
    </motion.div>
  );
};

export default AIRecommendCard;
