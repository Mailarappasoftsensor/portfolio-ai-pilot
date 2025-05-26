
import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, Eye, Send, Award, Calendar, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import DashboardSidebar from './DashboardSidebar';

const Analytics = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('analytics');
  const [timeRange, setTimeRange] = useState('30d');

  const portfolioViewsData = [
    { name: 'Week 1', views: 45, applications: 3 },
    { name: 'Week 2', views: 78, applications: 7 },
    { name: 'Week 3', views: 92, applications: 12 },
    { name: 'Week 4', views: 156, applications: 18 }
  ];

  const skillsData = [
    { skill: 'React', matches: 85 },
    { skill: 'TypeScript', matches: 72 },
    { skill: 'Node.js', matches: 65 },
    { skill: 'Python', matches: 58 },
    { skill: 'AWS', matches: 45 }
  ];

  const applicationStatusData = [
    { name: 'Applied', value: 23, color: '#8b5cf6' },
    { name: 'Interviewing', value: 8, color: '#06b6d4' },
    { name: 'Offers', value: 3, color: '#10b981' },
    { name: 'Rejected', value: 12, color: '#ef4444' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="flex">
        <DashboardSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        
        <main className="flex-1 ml-64 p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="border-white/20 hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-4xl font-bold">Career Analytics</h1>
                <p className="text-gray-300">Track your progress and optimize your career strategy</p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <div className="flex space-x-2">
                {['7d', '30d', '90d', '1y'].map((range) => (
                  <Button
                    key={range}
                    variant={timeRange === range ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeRange(range)}
                    className={timeRange === range 
                      ? "bg-gradient-to-r from-purple-500 to-pink-500" 
                      : "border-white/20 hover:bg-white/10"
                    }
                  >
                    {range}
                  </Button>
                ))}
              </div>
              <Button variant="outline" className="border-white/20 hover:bg-white/10">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Eye className="h-8 w-8 text-blue-400" />
                  <span className="text-sm text-green-400 bg-green-500/20 px-2 py-1 rounded">+24%</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">1,247</h3>
                <p className="text-sm text-gray-300">Portfolio Views</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Send className="h-8 w-8 text-green-400" />
                  <span className="text-sm text-green-400 bg-green-500/20 px-2 py-1 rounded">+12%</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">23</h3>
                <p className="text-sm text-gray-300">Applications Sent</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Award className="h-8 w-8 text-yellow-400" />
                  <span className="text-sm text-green-400 bg-green-500/20 px-2 py-1 rounded">+8</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">8</h3>
                <p className="text-sm text-gray-300">Interview Invites</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="h-8 w-8 text-purple-400" />
                  <span className="text-sm text-green-400 bg-green-500/20 px-2 py-1 rounded">+15%</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">87%</h3>
                <p className="text-sm text-gray-300">Skill Match Score</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Portfolio Views Chart */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-6 w-6 text-blue-400" />
                  <span>Portfolio Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={portfolioViewsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="views" 
                      stroke="#06b6d4" 
                      strokeWidth={3}
                      dot={{ fill: '#06b6d4', r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="applications" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      dot={{ fill: '#10b981', r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Skills Demand Chart */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Skills Market Demand</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={skillsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="skill" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="matches" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Application Status */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Application Status</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={applicationStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {applicationStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-4">
                  {applicationStatusData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <span className="text-sm font-semibold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Application submitted</p>
                      <p className="text-xs text-gray-400">Senior Developer at TechCorp</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Portfolio viewed</p>
                      <p className="text-xs text-gray-400">15 new views today</p>
                      <p className="text-xs text-gray-500">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Resume optimized</p>
                      <p className="text-xs text-gray-400">ATS score improved to 89%</p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Interview scheduled</p>
                      <p className="text-xs text-gray-400">Technical interview at StartupXYZ</p>
                      <p className="text-xs text-gray-500">2 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Career Insights */}
            <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-6 w-6 text-purple-400" />
                  <span>AI Career Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-lg p-3">
                    <h4 className="font-semibold mb-1 text-green-400">🎯 Trending Opportunity</h4>
                    <p className="text-sm text-gray-300">
                      Remote React positions increased 30% this month
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <h4 className="font-semibold mb-1 text-blue-400">📊 Profile Strength</h4>
                    <p className="text-sm text-gray-300">
                      Your portfolio outperforms 85% of similar profiles
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <h4 className="font-semibold mb-1 text-yellow-400">💡 Skill Recommendation</h4>
                    <p className="text-sm text-gray-300">
                      Adding "Next.js" could increase matches by 40%
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <h4 className="font-semibold mb-1 text-purple-400">🚀 Application Timing</h4>
                    <p className="text-sm text-gray-300">
                      Tuesday applications have 25% higher response rates
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
