import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-800 py-10">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold">MockPrep</h2>
            <p className="text-gray-400 text-sm mt-2">Preparing tomorrow's leaders today</p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end space-x-4 sm:space-x-8">
            <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms</Link>
            <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} MockPrep. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;