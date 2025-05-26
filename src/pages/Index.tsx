
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import Dashboard from '../components/Dashboard';
import PortfolioBuilder from '../components/PortfolioBuilder';
import ResumeOptimizer from '../components/ResumeOptimizer';
import InterviewPrep from '../components/InterviewPrep';
import JobMatcher from '../components/JobMatcher';
import Analytics from '../components/Analytics';
import Profile from '../components/Profile';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/portfolio" element={<PortfolioBuilder />} />
        <Route path="/resume" element={<ResumeOptimizer />} />
        <Route path="/interview" element={<InterviewPrep />} />
        <Route path="/jobs" element={<JobMatcher />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default Index;
