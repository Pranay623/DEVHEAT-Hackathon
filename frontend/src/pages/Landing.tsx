import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

// Define TypeScript interfaces
interface Developer {
  name: string;
  role: string;
  color: string;
  image: string;
  isLarge?: boolean;
  alt: string;
}

const DevIoLanding: React.FC = () => {
  const navigate = useNavigate();

  // Developer data
  const developers: Developer[] = [
    {
      name: "Elon Musk",
      role: "Tesla Inc",
      color: "bg-pink-200",
      image: "/images/landing/elon.webp",
      isLarge: true,
      alt: "Elon Musk - CEO of Tesla Inc and SpaceX"
    },
    {
      name: "Mark Zuckerberg",
      role: "Meta",
      color: "bg-blue-100",
      image: "/images/landing/mark.webp",
      alt: "Mark Zuckerberg - CEO of Meta (formerly Facebook)"
    },
    {
      name: "Steve Jobs",
      role: "Apple Inc",
      color: "bg-stone-200",
      image: "/images/landing/steve.webp",
      isLarge: true,
      alt: "Steve Jobs - Co-founder of Apple Inc"
    },
    {
      name: "Jensen Huang",
      role: "NVIDIA",
      color: "bg-yellow-200",
      image: "/images/landing/jenson.webp",
      alt: "Jensen Huang - CEO of NVIDIA"
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

  // Track page view
  useEffect(() => {
    // Google Analytics tracking example (if implemented)
    // gtag('event', 'page_view', { page_title: 'Homepage', page_location: window.location.href });
    
    // Add page-specific metadata
    document.title = "MockPrep | Ace Your Interview Preparation";
  }, []);

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
          <div className="mb-8 md:mb-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-bold leading-tight mt-10">
              ACE YOUR INTERVIEWS <br />
              WITH THE BEST <br />
              PREPARATION PLATFORM
            </h1>
          </div>

          {/* Right Column - Description */}
          <div className="flex flex-col justify-center mt-10">
            <p className="text-md sm:text-lg mb-6 sm:mb-8 leading-relaxed">
              Tired of endless preparation and uncertainty? We've got you covered. 
              Master your interviews with tailored resources, expert guidance, 
              and real-world practice scenarios. Your dream job is just a step away.
            </p>
            <button 
              className="bg-white cursor-pointer text-black rounded-full px-6 py-3 sm:py-4 font-semibold text-sm sm:text-md w-fit hover:bg-gray-100 transition-colors duration-300"
              onClick={handleLoginClick}
              aria-label="Start your interview preparation"
            >
              START YOUR PREPARATION
            </button>
          </div>
        </div>

        {/* Developer Profiles Section */}
        <section aria-labelledby="industry-leaders">
          <h2 id="industry-leaders" className="sr-only">Industry Leaders</h2>
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
                            relative flex flex-col items-center shadow-lg`}
                variants={itemVariants}
              >
                <div className="absolute top-4 text-center text-black w-full px-4 z-10">
                  <h3 className="font-bold text-xs sm:text-sm">{dev.name}</h3>
                  <p className="text-xs">{dev.role}</p>
                </div>
                <img 
                  src={dev.image}
                  alt={dev.alt}
                  width="300"
                  height="400"
                  loading={index < 2 ? "eager" : "lazy"}
                  className={`absolute bottom-0 w-full object-cover
                              h-[70%]
                              ${dev.isLarge ? 'lg:h-80' : 'lg:h-80'}`}
                />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Testimonials or CTA Section */}
        <section className="mt-20 text-center px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Ready to Elevate Your Career?</h2>
          <p className="max-w-2xl mx-auto mb-10 text-gray-300">
            Join thousands of successful professionals who aced their interviews with MockPrep.
            Start your journey today.
          </p>
          <button 
            onClick={handleLoginClick}
            className="bg-white mb-8 text-black rounded-full px-8 py-4 font-bold hover:bg-gray-100 transition-colors duration-300"
            aria-label="Begin your preparation journey"
          >
            GET STARTED NOW
          </button>
        </section>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DevIoLanding;