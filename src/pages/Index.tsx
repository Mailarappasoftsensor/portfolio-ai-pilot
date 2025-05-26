
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LandingPage from '../components/LandingPage';
import Dashboard from '../components/Dashboard';
import PortfolioBuilder from '../components/PortfolioBuilder';
import ResumeOptimizer from '../components/ResumeOptimizer';
import InterviewPrep from '../components/InterviewPrep';
import JobMatcher from '../components/JobMatcher';
import Analytics from '../components/Analytics';
import Profile from '../components/Profile';

const Index = () => {
  const { user } = useAuth();
  const location = useLocation();

  // If user is not authenticated and trying to access protected routes, show landing page
  if (!user && location.pathname !== '/') {
    return <LandingPage />;
  }

  // If user is authenticated but on root path, redirect to dashboard
  if (user && location.pathname === '/') {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <LandingPage />} />
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
