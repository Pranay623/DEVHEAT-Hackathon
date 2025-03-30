import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
        // Close the mobile menu if it's open
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-20 py-4 relative">
            {/* Desktop Navigation */}
            <div className="hidden md:flex justify-between items-center">
                <div className="flex items-center space-x-4 lg:space-x-8">
                    <div className="flex items-center space-x-1 lg:space-x-2">
                        <span className="font-medium text-sm lg:text-base">Practice</span>
                        <svg className="w-3 h-3 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                    <span className="text-sm lg:text-base">Resources</span>
                    <span className="text-sm lg:text-base">Pricing</span>
                </div>
                
                <div className="text-xl lg:text-2xl font-bold">MOCKPREP</div>
                
                <button 
                    className="border-2 border-white rounded-full px-4 py-1 lg:px-6 lg:py-2 text-sm lg:text-base font-medium"
                    onClick={handleLoginClick}
                >
                    START PREPARING
                </button>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
                <div className="flex justify-between items-center py-2">
                    <div className="text-xl font-bold">MockPrep</div>
                    
                    {/* Hamburger menu button */}
                    <button 
                        className="text-white focus:outline-none z-10"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
                
                {/* Mobile menu dropdown - absolute positioned to not shift content */}
                {isMenuOpen && (
                    <div className="absolute left-0 right-0 top-full bg-black z-50 shadow-lg px-4 py-5 border-t border-gray-700">
                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center space-x-2">
                                <span className="font-medium">Practice</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                            <span>Resources</span>
                            <span>Pricing</span>
                            <button 
                                className="border-2 border-white rounded-full px-6 py-2 font-medium w-full mt-2"
                                onClick={handleLoginClick}
                            >
                                START PREPARING
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;