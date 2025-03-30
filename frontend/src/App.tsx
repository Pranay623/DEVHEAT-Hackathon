import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DevIoLanding from './pages/DevIoLanding';
import Login from './pages/Login';
import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DevIoLanding />} />
        <Route path="/login" element={<Login />} />
        {/* Add other routes as needed */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
