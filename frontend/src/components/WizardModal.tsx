import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WizardQuestion } from "../types/wizard";

interface WizardModalProps {
  onComplete: (answers: Record<string, string>) => void;
}

const questions: WizardQuestion[] = [
  {
    id: "jobRole",
    question: "What is your current job role?",
    type: "text",
  },
  {
    id: "experience",
    question: "How many years of professional experience do you have?",
    type: "number",
  },
  {
    id: "targetCompany",
    question: "Which company are you targeting for your next opportunity?",
    type: "text",
  },
  {
    id: "level",
    question: "How would you rate your current skill level?",
    type: "select",
    options: ["beginner", "intermediate", "advanced"],
  },
];

const WizardModal: React.FC<WizardModalProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = questions[step];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setAnswers({ ...answers, [currentQuestion.id]: e.target.value });
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep((prev) => prev + 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const userId = localStorage.getItem("userID"); // ⬅️ Get userId from localStorage (or however you're storing it)
      if (!userId) {
        console.error("User ID is missing");
        return;
      }
  
      const payload = {
        ...answers,
        userId, // ⬅️ Add userId to payload
      };
  
      const res = await fetch("https://devheat-hackathon-14ll.vercel.app/api/wizard/complete-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (res.ok) {
        onComplete(answers);
      } else {
        const errorData = await res.json();
        console.error("Failed to submit wizard:", errorData.message);
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  };
  
  const renderInput = () => {
    if (currentQuestion.type === "select") {
      return (
        <select
          value={answers[currentQuestion.id] || ""}
          onChange={handleChange}
          className="w-full bg-[#1e1e30]/60 border border-purple-500/30 focus:border-purple-500 focus:ring-2 focus:ring-purple-600 outline-none px-5 py-3 rounded-xl placeholder:text-purple-400 text-white mb-6 transition"
        >
          <option value="" disabled>
            Select your skill level
          </option>
          {currentQuestion.options?.map((option) => (
            <option key={option} value={option}>
              {option[0].toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={currentQuestion.type}
        placeholder="Your answer..."
        className="w-full bg-[#1e1e30]/60 border border-purple-500/30 focus:border-purple-500 focus:ring-2 focus:ring-purple-600 outline-none px-5 py-3 rounded-xl placeholder:text-purple-400 text-white mb-6 transition"
        value={answers[currentQuestion.id] || ""}
        onChange={handleChange}
      />
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <div className="absolute w-[600px] h-[600px] bg-purple-500 blur-[120px] rounded-full opacity-20 animate-pulse -z-10"></div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-[#121218]/60 backdrop-blur-2xl border border-purple-600/40 shadow-[0_0_40px_5px_rgba(192,132,252,0.15)] rounded-3xl w-[90%] max-w-xl px-10 py-12 text-white overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-pulse" />

          <h2 className="text-2xl font-bold mb-6 tracking-wide text-purple-300 drop-shadow">
            {currentQuestion.question}
          </h2>

          {renderInput()}

          <div className="flex justify-end gap-4">
            {step < questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-gradient-to-tr from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-gradient-to-tr from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                Finish
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default WizardModal;
