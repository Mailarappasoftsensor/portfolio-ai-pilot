
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Zap, Target, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Create Portfolio",
      description: "Build a stunning AI-powered portfolio in minutes",
      icon: Plus,
      color: "from-blue-500 to-cyan-500",
      path: "/portfolio"
    },
    {
      title: "Optimize Resume",
      description: "Enhance your resume for better ATS performance",
      icon: Zap,
      color: "from-green-500 to-emerald-500",
      path: "/resume"
    },
    {
      title: "Find Jobs",
      description: "Discover opportunities that match your skills",
      icon: Target,
      color: "from-orange-500 to-red-500",
      path: "/jobs"
    },
    {
      title: "Practice Interview",
      description: "Sharpen your interview skills with AI coaching",
      icon: Users,
      color: "from-purple-500 to-pink-500",
      path: "/interview"
    }
  ];

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <div
              key={index}
              onClick={() => navigate(action.path)}
              className="p-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 cursor-pointer transition-all duration-300 group"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">{action.title}</h3>
              <p className="text-sm text-gray-300">{action.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
