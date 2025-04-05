import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, ChevronRight } from 'react-feather';
import DashboardLayout from '../components/DashboardLayout';
import { Input } from '../components/ui/input';

interface Message {
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

const topicSuggestions = [
  { name: 'System Design', topics: ['Scalability', 'Database Design', 'Microservices'] },
  { name: 'Data Structures', topics: ['Arrays', 'Trees', 'Graphs', 'Hash Tables'] },
  { name: 'JavaScript', topics: ['Closures', 'Promises', 'ES6 Features', 'React Hooks'] },
  { name: 'Behavioral', topics: ['Leadership', 'Conflict Resolution', 'Project Management'] },
];

const LearnWithAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: "Hi there! I'm your AI interview coach. What topic would you like to learn about today? I can help with technical concepts, behavioral questions, or interview strategies.",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      sender: 'user',
      text: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');

    // Simulate AI response (in a real app, this would call your AI backend)
    setTimeout(() => {
      const aiResponse: Message = {
        sender: 'ai',
        text: generateAIResponse(inputMessage),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleTopicClick = (topic: string) => {
    setSelectedTopic(topic);
    const userMessage: Message = {
      sender: 'user',
      text: `Tell me about ${topic}`,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        sender: 'ai',
        text: generateTopicResponse(topic),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  // Mock AI response generator
  const generateAIResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('react')) {
      return "React is a popular JavaScript library for building user interfaces. Key concepts include components, props, state, and hooks. Would you like me to explain any of these concepts in more detail?";
    } else if (lowerMessage.includes('algorithm')) {
      return "Algorithms are step-by-step procedures for solving problems. Common algorithms include sorting (like quicksort, mergesort), searching (binary search), and graph algorithms (BFS, DFS). Which specific algorithm would you like to learn about?";
    } else if (lowerMessage.includes('behavioral')) {
      return "Behavioral questions assess how you've handled situations in the past. Use the STAR method (Situation, Task, Action, Result) to structure your answers. Would you like to practice with some common behavioral questions?";
    } else {
      return "That's an interesting topic. Would you like me to explain specific concepts, provide examples, or help you practice interview questions related to this?";
    }
  };

  const generateTopicResponse = (topic: string): string => {
    switch (topic) {
      case 'Scalability':
        return "Scalability refers to a system's ability to handle growing amounts of work by adding resources. There are two main types: Vertical scaling (adding more power to existing machines) and horizontal scaling (adding more machines). For interviews, focus on discussing tradeoffs, how to identify bottlenecks, and strategies like caching, load balancing, and database sharding.";
      case 'Promises':
        return "JavaScript Promises represent a value that may be available now, in the future, or never. They're used for asynchronous operations and have three states: pending, fulfilled, or rejected. The .then() method is used to handle the fulfilled state, and .catch() handles rejections. Would you like to see some code examples?";
      case 'Leadership':
        return "Leadership questions assess your ability to guide and influence others. Prepare stories about times you've led projects, resolved conflicts, or mentored colleagues. Focus on your communication style, decision-making process, and how you motivate team members. Would you like to practice answering some common leadership questions?";
      default:
        return `${topic} is an important concept in technical interviews. Would you like me to explain specific aspects of it, provide examples, or help you practice related interview questions?`;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-120px)]">
        {/* Header */}
        <div className="bg-[#121212] shadow-md p-4 mb-6 rounded-lg">
          <h1 className="text-xl font-bold text-white flex items-center">
            <MessageCircle size={20} className="text-emerald-400 mr-2" />
            Learn with AI
          </h1>
        </div>

        <div className="flex flex-grow overflow-hidden">
          {/* Topic sidebar */}
          <div className="hidden md:block w-64 bg-[#121212] rounded-lg p-4 mr-4 overflow-y-auto">
            <h3 className="text-white font-medium mb-3">Popular Topics</h3>
            {topicSuggestions.map((category) => (
              <div key={category.name} className="mb-4">
                <h4 className="text-emerald-400 text-sm font-medium mb-2">{category.name}</h4>
                <div className="space-y-1.5">
                  {category.topics.map((topic) => (
                    <button
                      key={topic}
                      onClick={() => handleTopicClick(topic)}
                      className={`w-full text-left text-sm py-1 px-2 rounded transition-colors ${
                        selectedTopic === topic
                          ? 'bg-emerald-900/30 text-emerald-200 border-l-2 border-emerald-500'
                          : 'text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Chat area */}
          <div className="flex-grow flex flex-col bg-[#121212] rounded-lg overflow-hidden">
            {/* Messages */}
            <div className="flex-grow p-4 overflow-y-auto">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-8 h-8 rounded-full bg-emerald-900/60 flex items-center justify-center flex-shrink-0 mr-2">
                      <span className="text-emerald-300 font-medium">AI</span>
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.sender === 'user'
                        ? 'bg-emerald-700/40 text-white border border-emerald-600/30'
                        : 'bg-gray-800 text-gray-200 border border-gray-700'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <p className="text-xs mt-1 opacity-60">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-emerald-700/60 flex items-center justify-center flex-shrink-0 ml-2">
                      <span className="text-emerald-100 font-medium">You</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Topic suggestions (mobile only) */}
            <div className="md:hidden p-3 bg-gray-900 overflow-x-auto">
              <div className="flex space-x-2">
                {topicSuggestions.flatMap((category) => 
                  category.topics.slice(0, 2).map((topic) => (
                    <button
                      key={topic}
                      onClick={() => handleTopicClick(topic)}
                      className="whitespace-nowrap bg-gray-800 hover:bg-gray-700 text-white text-xs px-3 py-1.5 rounded-full flex-shrink-0"
                    >
                      {topic}
                    </button>
                  ))
                )}
                <button className="whitespace-nowrap bg-gray-800 hover:bg-gray-700 text-white text-xs px-3 py-1.5 rounded-full flex-shrink-0">
                  More <ChevronRight size={12} className="inline" />
                </button>
              </div>
            </div>

            {/* Input area */}
            <div className="p-3 bg-gray-900 border-t border-gray-800">
              <div className="flex">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask a question about any interview topic..."
                  className="flex-grow bg-gray-800 border-gray-700 focus:border-emerald-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="ml-2 bg-emerald-700 hover:bg-emerald-600 text-white p-2 rounded-md"
                  disabled={!inputMessage.trim()}
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Ask about technical concepts, practice questions, or interview strategies
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LearnWithAI;