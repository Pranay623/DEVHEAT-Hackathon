import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DevIoLanding from './pages/Landing';
import Login from './pages/Login';
import './App.css';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/profile';
import SpinWheel from './components/Spinthewheel';


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DevIoLanding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/spinwheel" element={<SpinWheel />} />
      

        {/* Add other routes as needed */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
