import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, Loader, ArrowLeft } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { Input } from '../components/ui/input';

interface Message {
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

const LearnWithAI: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: "Hi there! I'm your AI interview coach. What topic would you like to learn about today? I can help with technical concepts, behavioral questions, or interview strategies.",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Precisely adjust layout to prevent scrolling
  useEffect(() => {
    const adjustHeight = () => {
      if (rootRef.current && chatContainerRef.current) {
        // Get exact viewport height
        const vh = window.innerHeight;
        
        // Set the root container to exact viewport height
        rootRef.current.style.height = `${vh}px`;
        
        // Calculate remaining space for chat container
        const headerElement = document.querySelector('.header-container') as HTMLElement;
        const inputElement = document.querySelector('.input-container') as HTMLElement;
        
        const headerHeight = headerElement?.offsetHeight || 64;
        const inputHeight = inputElement?.offsetHeight || 76;
        
        // Set precise height to chat container
        chatContainerRef.current.style.height = `${vh - headerHeight - inputHeight}px`;
      }
    };

    adjustHeight();
    
    // Use ResizeObserver for more reliable size monitoring
    const resizeObserver = new ResizeObserver(adjustHeight);
    
    if (rootRef.current) {
      resizeObserver.observe(rootRef.current);
    }
    
    window.addEventListener('resize', adjustHeight);
    
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', adjustHeight);
    };
  }, []);

  const fetchAIResponse = async (question: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('https://ai-assistant-rf4d.onrender.com/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data.answer;
    } catch (error) {
      console.error('Error fetching AI response:', error);
      return "I'm having trouble connecting right now. Please try again in a moment.";
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      sender: 'user',
      text: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const questionText = inputMessage;
    setInputMessage('');

    // Get AI response from the API
    const aiResponseText = await fetchAIResponse(questionText);
    
    const aiResponse: Message = {
      sender: 'ai',
      text: aiResponseText,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, aiResponse]);
  };

  return (
    <DashboardLayout fullScreen>
      {/* Full-screen container with ref for exact sizing */}
      <div 
        ref={rootRef}
        className="flex flex-col w-full bg-[#0a0a0a] overflow-hidden"
        style={{ height: '100vh' }}
      >
        {/* Header - more compact on mobile */}
        <div className="header-container bg-[#121212] shadow-md p-3 sm:p-4 flex items-center sticky top-0 z-10">
          <button 
            onClick={() => navigate('/dashboard')}
            className="mr-3 p-1.5 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          
          <div className="flex-grow">
            <h1 className="text-lg sm:text-xl font-bold text-white flex items-center">
              <MessageCircle size={20} className="text-emerald-400 mr-2 hidden sm:inline" />
              Learn with AI
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
              Your AI interview assistant
            </p>
          </div>
        </div>

        {/* Chat area - precisely sized to prevent scrolling */}
        <div 
          ref={chatContainerRef}
          className="bg-[#121212] overflow-hidden"
          style={{ height: 'calc(100vh - 140px)' }}
        >
          {/* Messages - reversed for better mobile UX */}
          <div className="h-full p-3 sm:p-4 overflow-y-auto flex flex-col-reverse">
            <div ref={messagesEndRef} />
            {messages.slice().reverse().map((msg, index) => (
              <motion.div
                key={messages.length - 1 - index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`mb-3 sm:mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-900/60 flex items-center justify-center flex-shrink-0 mr-2">
                    <span className="text-sm sm:text-base text-emerald-300 font-medium">AI</span>
                  </div>
                )}
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-lg p-2.5 sm:p-3 ${
                    msg.sender === 'user'
                      ? 'bg-emerald-700/40 text-white border border-emerald-600/30'
                      : 'bg-gray-800 text-gray-200 border border-gray-700'
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm sm:text-base">{msg.text}</p>
                  <p className="text-[10px] sm:text-xs mt-1 opacity-60">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {msg.sender === 'user' && (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-700/60 flex items-center justify-center flex-shrink-0 ml-2">
                    <span className="text-sm sm:text-base text-emerald-100 font-medium">You</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Input area - fixed at bottom */}
        <div className="input-container bg-gray-900 border-t border-gray-800 p-2 sm:p-3 sticky bottom-0 z-10">
          <div className="flex">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
              placeholder="Ask any interview question..."
              className="flex-grow bg-gray-800 border-gray-700 focus:border-emerald-500 text-sm sm:text-base h-10 sm:h-12"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 bg-emerald-700 hover:bg-emerald-600 text-white p-2 rounded-md flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12"
              disabled={!inputMessage.trim() || isLoading}
            >
              {isLoading ? <Loader size={16} className="animate-spin" /> : <Send size={16} />}
            </button>
          </div>
          <p className="text-[10px] sm:text-xs text-gray-400 mt-1.5">
            {isLoading 
              ? "AI is thinking..." 
              : "Example questions: 'Explain closures in JavaScript', 'How to prepare for behavioral questions?'"}
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LearnWithAI;