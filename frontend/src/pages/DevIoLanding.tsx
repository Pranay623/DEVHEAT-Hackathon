import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';

// Define TypeScript interfaces
interface Developer {
  name: string;
  role: string;
  color: string;
  image: string;
  isLarge?: boolean;
}

const DevIoLanding: React.FC = () => {
  const navigate = useNavigate();

  // Developer data
  const developers: Developer[] = [
    {
      name: "ANNA DEAN",
      role: "React engineer",
      color: "bg-pink-200",
      image: "/images/landing/elon.png",
      isLarge: true
    },
    {
      name: "CHRIS MEZY",
      role: "Data engineer",
      color: "bg-blue-100",
      image: "/images/landing/mark.png",
    },
    {
      name: "LESLIE SCHNIDER",
      role: "Backend developer",
      color: "bg-stone-200",
      image: "/images/landing/steve.png",
      isLarge: true
    },
    {
      name: "JIM BRICKTON",
      role: "AI specialist",
      color: "bg-yellow-200",
      image: "/images/landing/jenson.png",
    }
  ];

  // Animation variants for the developer profiles
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column - Headline */}
          <div className="mb-">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-4xl font-bold leading-tight mt-10">
              ACE YOUR INTERVIEWS <br />
              WITH THE BEST <br />
              PREPARATION PLATFORM
            </h1>
          </div>

          {/* Right Column - Description */}
          <div className="flex flex-col justify-center mt-10">
            <p className="text-sm sm:text-md mb-6 sm:mb-8">
              Tired of endless preparation and uncertainty? We've got you covered. 
              Master your interviews with tailored resources, expert guidance, 
              and real-world practice scenarios. Your dream job is just a step away.
            </p>
            <button 
              className="bg-white  text-black rounded-full px-4 py-3 sm:py-4 font-semibold text-sm sm:text-md w-fit"
              onClick={handleLoginClick}
            >
              START YOUR PREPARATION
            </button>
          </div>
        </div>

        {/* Developer Profiles Section */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 sm:mt-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {developers.map((dev, index) => (
            <motion.div
              key={index}
              className={`${dev.color} rounded-t-2xl sm:rounded-t-4xl overflow-hidden 
                          h-[50vh] sm:h-[40vh] md:h-[45vh] 
                          ${dev.isLarge ? 'lg:mt-0 lg:h-[60vh]' : 'lg:mt-20 lg:h-[50vh]'} 
                          relative flex flex-col items-center`}
              variants={itemVariants}
            >
              <div className="absolute top-4 text-center text-black w-full px-4">
                <h3 className="font-bold text-xs sm:text-sm">{dev.name}</h3>
                <p className="text-xs">{dev.role}</p>
              </div>
              <img 
                src={dev.image}
                alt={dev.name}
                className={`absolute bottom-0 w-full object-cover
                            h-[70%]
                            ${dev.isLarge ? 'lg:h-80' : 'lg:h-80'}`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default DevIoLanding;