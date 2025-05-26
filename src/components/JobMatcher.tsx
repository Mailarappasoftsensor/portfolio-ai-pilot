
import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, MapPin, Clock, ExternalLink, Heart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import DashboardSidebar from './DashboardSidebar';

const JobMatcher = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('jobs');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);

  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp",
      location: "San Francisco, CA",
      type: "Full-time",
      postedTime: "2 days ago",
      matchScore: 92,
      salary: "$120k - $160k",
      description: "We're looking for a Senior Frontend Developer to join our team and help build the next generation of web applications...",
      requirements: ["React", "TypeScript", "Node.js", "CSS", "JavaScript"],
      saved: false
    },
    {
      id: 2,
      title: "Full-Stack Engineer",
      company: "StartupXYZ",
      location: "Remote",
      type: "Full-time",
      postedTime: "1 day ago",
      matchScore: 88,
      salary: "$100k - $140k",
      description: "Join our fast-growing startup as a Full-Stack Engineer and work on cutting-edge technologies...",
      requirements: ["React", "Python", "PostgreSQL", "AWS", "Docker"],
      saved: true
    },
    {
      id: 3,
      title: "Software Engineer",
      company: "BigTech Inc",
      location: "Seattle, WA",
      type: "Full-time",
      postedTime: "3 days ago",
      matchScore: 85,
      salary: "$110k - $150k",
      description: "Looking for a talented Software Engineer to contribute to our flagship products...",
      requirements: ["JavaScript", "React", "Node.js", "MongoDB", "Git"],
      saved: false
    },
    {
      id: 4,
      title: "Frontend Developer",
      company: "Design Studio",
      location: "New York, NY",
      type: "Contract",
      postedTime: "1 week ago",
      matchScore: 78,
      salary: "$80k - $100k",
      description: "We need a creative Frontend Developer to help us build beautiful user interfaces...",
      requirements: ["React", "CSS", "JavaScript", "Figma", "HTML"],
      saved: false
    }
  ];

  const getMatchScoreColor = (score) => {
    if (score >= 90) return "text-green-400";
    if (score >= 80) return "text-yellow-400";
    return "text-orange-400";
  };

  const getMatchScoreBg = (score) => {
    if (score >= 90) return "bg-green-500/20 border-green-500/30";
    if (score >= 80) return "bg-yellow-500/20 border-yellow-500/30";
    return "bg-orange-500/20 border-orange-500/30";
  };

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
                <h1 className="text-4xl font-bold">Job Matcher</h1>
                <p className="text-gray-300">Discover opportunities perfectly matched to your skills and experience</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Search and Filters */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex space-x-4 mb-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search jobs by title, company, or keywords..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-white/10 border-white/20"
                      />
                    </div>
                    <Button variant="outline" className="border-white/20 hover:bg-white/10">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-300">
                    <span>Found {jobs.length} matching opportunities</span>
                    <span>•</span>
                    <span>Sorted by match score</span>
                  </div>
                </CardContent>
              </Card>

              {/* Job Listings */}
              <div className="space-y-4">
                {jobs.map((job) => (
                  <Card 
                    key={job.id} 
                    className={`bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer ${
                      selectedJob?.id === job.id ? 'ring-2 ring-purple-500' : ''
                    }`}
                    onClick={() => setSelectedJob(job)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchScoreBg(job.matchScore)}`}>
                              <span className={getMatchScoreColor(job.matchScore)}>{job.matchScore}% Match</span>
                            </div>
                          </div>
                          <p className="text-lg text-purple-400 mb-2">{job.company}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-300 mb-3">
                            <span className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {job.location}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {job.postedTime}
                            </span>
                            <span>{job.type}</span>
                            <span className="font-semibold text-green-400">{job.salary}</span>
                          </div>
                          <p className="text-gray-300 mb-4">{job.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {job.requirements.map((req, index) => (
                              <Badge key={index} variant="outline" className="border-purple-500/30 text-purple-300">
                                {req}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col items-center space-y-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-500/50 text-red-400 hover:bg-red-500/20"
                          >
                            <Heart className={`h-4 w-4 ${job.saved ? 'fill-current' : ''}`} />
                          </Button>
                          <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                            Apply
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Match Insights */}
              <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="h-6 w-6 text-purple-400" />
                    <span>Match Insights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-lg p-3">
                      <h4 className="font-semibold mb-1">Top Skill Match</h4>
                      <p className="text-sm text-gray-300">React (95% of relevant jobs)</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <h4 className="font-semibold mb-1">Trending Skill</h4>
                      <p className="text-sm text-gray-300">TypeScript (+25% demand)</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <h4 className="font-semibold mb-1">Salary Range</h4>
                      <p className="text-sm text-gray-300">$110k - $150k average</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Job Alerts */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Job Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300 mb-4">
                    Get notified when new jobs matching your profile are posted
                  </p>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                    Create Alert
                  </Button>
                </CardContent>
              </Card>

              {/* Application Tracker */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Application Tracker</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Applied</span>
                      <span className="font-semibold">12</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Interviews</span>
                      <span className="font-semibold text-green-400">5</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Offers</span>
                      <span className="font-semibold text-purple-400">2</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Career Resources */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Career Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <a href="#" className="block text-sm text-purple-400 hover:text-purple-300 transition-colors">
                      Interview Preparation Guide
                    </a>
                    <a href="#" className="block text-sm text-purple-400 hover:text-purple-300 transition-colors">
                      Salary Negotiation Tips
                    </a>
                    <a href="#" className="block text-sm text-purple-400 hover:text-purple-300 transition-colors">
                      Industry Trends Report
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default JobMatcher;
