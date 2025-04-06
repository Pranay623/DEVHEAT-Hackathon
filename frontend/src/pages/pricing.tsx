import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const monthlyPlans = [
  {
    name: "Creator",
    price: 0,
    description: "Ideal for solo creators and small teams",
    features: [
      "One user",
      "Basic AI Assistant",
      "Limited Brand Voice",
      "Email support",
      "Basic analytics",
    ],
    button: "Start for Free",
  },
  {
    name: "Professional",
    price: 449,
    description: "Best for growing startups and teams",
    features: [
      "Everything in Creator, plus:",
      "3 user seats, expandable to 5",
      "5 Custom Brand Voices",
      "Content performance insights",
      "Team collaboration tools",
    ],
    button: "Sign Up with Professional",
  },
  {
    name: "Enterprise",
    price: 999,
    description:
      "Perfect for large enterprises needing advanced features and support",
    features: [
      "Everything in Pro, plus:",
      "Unlimited user seats",
      "Dedicated account manager",
      "Advanced analytics dashboard",
      "Customizable workflows",
    ],
    button: "Sign Up with Enterprise",
  },
];

const PricingSection: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);
  const navigate = useNavigate();

  const plans = monthlyPlans.map((plan) => {
    const yearlyPrice = plan.price * 12 * 0.85; // 15% discount on yearly
    return {
      ...plan,
      displayPrice: isYearly
        ? `$${yearlyPrice.toFixed(2)}`
        : `$${plan.price}`,
      period: isYearly ? "/year (15% off)" : "/month",
    };
  });

  return (
    <div className="min-h-screen w-full bg-[#0f0f0f] py-20 px-4 text-white flex flex-col items-center">
      {/* Back to Home Button */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-4 left-4 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg shadow-lg transition-all duration-300 z-50"
      >
        ← Back to Home
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Discover the perfect AI plan for your business
        </h1>
        <p className="text-gray-400 text-sm md:text-base">
          Explore our AI plans for your business growth and success.
        </p>
        <div className="mt-4 inline-flex bg-[#1e1e1e] rounded-full border border-gray-700 p-1">
          <button
            className={`text-xs md:text-sm px-4 py-1 rounded-full transition-all duration-200 ${
              !isYearly
                ? "bg-[#3b3b3b] text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setIsYearly(false)}
          >
            Monthly
          </button>
          <button
            className={`text-xs md:text-sm px-4 py-1 rounded-full transition-all duration-200 ${
              isYearly
                ? "bg-[#3b3b3b] text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setIsYearly(true)}
          >
            Yearly
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {plans.map((plan, idx) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            whileHover={{ scale: 1.03 }}
            className="relative bg-white/5 backdrop-blur-xl border border-gray-800 p-6 md:p-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-purple-600/10 hover:border-purple-500/30"
          >
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
              <p className="text-gray-400 text-sm mt-1">{plan.description}</p>
            </div>

            <div className="mb-6">
              <span className="text-3xl font-bold text-purple-400">
                {plan.displayPrice}
              </span>
              <span className="text-gray-400 ml-1">{plan.period}</span>
            </div>

            <ul className="space-y-2 text-sm text-gray-300 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-purple-500">✔</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button className="w-full bg-purple-700/20 hover:bg-purple-700/30 text-purple-300 font-medium py-2 rounded-xl border border-purple-600 transition-all duration-200">
              {plan.button}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PricingSection;
