import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<div style={{padding: '4rem 2rem', textAlign: 'center', fontSize: '1.5rem'}}>Browse Page - Coming Soon 🚀</div>} />
          <Route path="/how-it-works" element={<div style={{padding: '4rem 2rem', textAlign: 'center', fontSize: '1.5rem'}}>How It Works Page - Coming Soon 🚀</div>} />
          <Route path="/about" element={<div style={{padding: '4rem 2rem', textAlign: 'center', fontSize: '1.5rem'}}>About Page - Coming Soon 🚀</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
