
import React from 'react';
import { Clock, FileText, Users, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RecentActivity = () => {
  const activities = [
    {
      title: "Portfolio updated",
      description: "Added new project: E-commerce Platform",
      time: "2 hours ago",
      icon: FileText,
      color: "text-blue-400"
    },
    {
      title: "Interview completed",
      description: "Mock interview for Senior Developer role",
      time: "1 day ago",
      icon: Users,
      color: "text-green-400"
    },
    {
      title: "Job application",
      description: "Applied to Software Engineer at TechCorp",
      time: "2 days ago",
      icon: Target,
      color: "text-orange-400"
    },
    {
      title: "Resume optimized",
      description: "ATS score improved from 78% to 92%",
      time: "3 days ago",
      icon: FileText,
      color: "text-purple-400"
    }
  ];

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5" />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
              <div className={`mt-1 ${activity.color}`}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-white">{activity.title}</h4>
                <p className="text-sm text-gray-300">{activity.description}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
