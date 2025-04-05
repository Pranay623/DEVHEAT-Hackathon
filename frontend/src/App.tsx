import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DevIoLanding from './pages/Landing';
import Login from './pages/Login';
import './App.css';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/profile';
import SpinWheel from './components/Spinthewheel';
import Recommend from './components/Recommend';
import PricingPlans from './pages/pricing';
import MockInterviewScreen from './pages/MockInterviewScreen';
import LearnWithAI from './pages/LearnWithAI';
import FreeMockTest from './pages/FreeMockTest';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DevIoLanding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/spinwheel" element={<SpinWheel />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/pricing" element={<PricingPlans />} />
        <Route path="/mock-interviews" element={<MockInterviewScreen />} />
        <Route path="/learn-with-ai" element={<LearnWithAI />} />
        <Route path="/free-mock-test" element={<FreeMockTest />} />
        {/* Add other routes as needed */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
