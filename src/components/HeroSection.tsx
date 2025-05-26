
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-32 pb-20 px-6">
      <div className="container mx-auto text-center">
        <div className="inline-flex items-center space-x-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-8">
          <Sparkles className="h-4 w-4 text-purple-400" />
          <span className="text-sm text-purple-300">AI-Powered Career Success</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Build Your Dream Career with{' '}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            AI Precision
          </span>
        </h1>
        
        <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
          Transform your career journey with our revolutionary AI platform. Create stunning portfolios, 
          optimize resumes for ATS systems, and master interviews with personalized coaching.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-6 h-auto"
            onClick={() => navigate('/dashboard')}
          >
            Start Building for Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-white/20 hover:bg-white/10 text-lg px-8 py-6 h-auto"
          >
            <Play className="mr-2 h-5 w-5" />
            Watch Demo
          </Button>
        </div>

        {/* Hero Image/Demo */}
        <div className="relative max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg mb-4"></div>
                <h3 className="font-semibold mb-2">AI Portfolio Builder</h3>
                <p className="text-sm text-gray-300">Create stunning portfolios in minutes</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg mb-4"></div>
                <h3 className="font-semibold mb-2">Smart Resume Optimizer</h3>
                <p className="text-sm text-gray-300">Beat ATS systems with AI optimization</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg mb-4"></div>
                <h3 className="font-semibold mb-2">Interview Coach</h3>
                <p className="text-sm text-gray-300">Practice with AI-powered feedback</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
