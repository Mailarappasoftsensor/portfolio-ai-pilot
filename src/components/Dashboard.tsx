
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, FileText, Users, Target, BarChart3, Settings, 
  Plus, ArrowRight, TrendingUp, Clock, Award, Zap 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardSidebar from './DashboardSidebar';
import QuickActions from './QuickActions';
import StatsOverview from './StatsOverview';
import RecentActivity from './RecentActivity';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="flex">
        <DashboardSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        
        <main className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              Welcome back, <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Alex</span>
            </h1>
            <p className="text-gray-300">Let's accelerate your career growth today</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <QuickActions />
              <div className="mt-8">
                <StatsOverview />
              </div>
            </div>
            
            <div>
              <RecentActivity />
            </div>
          </div>

          {/* AI Insights Card */}
          <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-purple-400" />
                <span>AI Career Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-green-400" />
                    Market Trends
                  </h4>
                  <p className="text-sm text-gray-300">
                    React and TypeScript skills are trending +25% in your target market
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Award className="h-4 w-4 mr-2 text-yellow-400" />
                    Skill Recommendation
                  </h4>
                  <p className="text-sm text-gray-300">
                    Consider adding "Next.js" to boost your profile by 40%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
