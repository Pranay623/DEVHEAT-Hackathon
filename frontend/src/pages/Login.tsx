import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const LoginSignup: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Login attempt with:', { email, password });
      navigate('/dashboard');
    } else {
      console.log('Signup attempt with:', { name, email, password });
      navigate('/welcome');
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white flex items-center">
      <div className="flex flex-col md:flex-row w-full mx-auto lg:mx-20 ">
        {/* Left Section: Image */}
        <div className="hidden md:flex flex-1">
          <img
            src="/images/login/ref2x.webp"
            alt="Background"
            className="w-full h-full object-cover rounded-l-md"
          />
        </div>

        {/* Right Section: Animated Form */}
        <div className="flex-1 bg-[#050505] rounded-md p-8 md:p-12 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div
                key="login"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl font-bold text-center mb-8">Login to MockPrep</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-2">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
                      required
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        type="checkbox"
                        className="h-4 w-4 bg-gray-900 border-gray-700 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm">
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <a href="#" className="text-gray-400 hover:text-white">
                        Forgot password?
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full bg-white text-black rounded-full px-4 py-3 font-semibold"
                    >
                      LOGIN
                    </button>
                  </div>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-gray-400">
                    Don't have an account?{' '}
                    <button
                      onClick={() => setIsLogin(false)}
                      className="text-white font-medium hover:underline"
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl font-bold text-center mb-8">Sign Up for MockPrep</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-2">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
                      required
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full bg-white text-black rounded-full px-4 py-3 font-semibold"
                    >
                      SIGN UP
                    </button>
                  </div>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-gray-400">
                    Already have an account?{' '}
                    <button
                      onClick={() => setIsLogin(true)}
                      className="text-white font-medium hover:underline"
                    >
                      Login
                    </button>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
