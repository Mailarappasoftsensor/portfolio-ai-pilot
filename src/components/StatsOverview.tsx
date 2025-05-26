
import React from 'react';
import { TrendingUp, Eye, Send, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StatsOverview = () => {
  const stats = [
    {
      title: "Portfolio Views",
      value: "1,247",
      change: "+12%",
      icon: Eye,
      color: "text-blue-400"
    },
    {
      title: "Applications Sent",
      value: "23",
      change: "+5 this week",
      icon: Send,
      color: "text-green-400"
    },
    {
      title: "Interview Invites",
      value: "8",
      change: "+3 pending",
      icon: Award,
      color: "text-yellow-400"
    },
    {
      title: "Skill Score",
      value: "87%",
      change: "+15% this month",
      icon: TrendingUp,
      color: "text-purple-400"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
              <span className="text-sm text-green-400">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-300">{stat.title}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsOverview;
