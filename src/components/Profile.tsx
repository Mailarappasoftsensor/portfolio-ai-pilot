
import React, { useState } from 'react';
import { ArrowLeft, User, Mail, MapPin, Phone, Github, Linkedin, Save, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import DashboardSidebar from './DashboardSidebar';

const Profile = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    title: 'Full-Stack Developer',
    bio: 'Passionate full-stack developer with 3+ years of experience building scalable web applications. Specializing in React, Node.js, and cloud technologies.',
    github: 'alexjohnson',
    linkedin: 'alexjohnson-dev',
    website: 'alexjohnson.dev',
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'PostgreSQL', 'Docker'],
    experience: [
      {
        company: 'TechCorp',
        position: 'Frontend Developer',
        duration: '2022 - Present',
        description: 'Developed responsive web applications using React and TypeScript'
      },
      {
        company: 'StartupXYZ',
        position: 'Junior Developer',
        duration: '2021 - 2022',
        description: 'Built full-stack features and collaborated with design team'
      }
    ],
    education: [
      {
        institution: 'University of California',
        degree: 'Bachelor of Science in Computer Science',
        year: '2021'
      }
    ]
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save profile data
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
                <h1 className="text-4xl font-bold">Profile Settings</h1>
                <p className="text-gray-300">Manage your personal information and career details</p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              {isEditing ? (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                    className="border-white/20 hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSave}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={() => setIsEditing(true)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Overview */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="h-12 w-12 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-1">{profile.firstName} {profile.lastName}</h2>
                  <p className="text-purple-400 mb-2">{profile.title}</p>
                  <p className="text-sm text-gray-300 flex items-center justify-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {profile.location}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Profile Completeness</span>
                      <span className="text-green-400 font-semibold">95%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Portfolio Views</span>
                      <span className="text-blue-400 font-semibold">1,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Applications</span>
                      <span className="text-yellow-400 font-semibold">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Interview Invites</span>
                      <span className="text-purple-400 font-semibold">8</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    {isEditing ? (
                      <Input
                        value={profile.firstName}
                        onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                        className="bg-white/10 border-white/20"
                      />
                    ) : (
                      <p className="text-gray-300">{profile.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    {isEditing ? (
                      <Input
                        value={profile.lastName}
                        onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                        className="bg-white/10 border-white/20"
                      />
                    ) : (
                      <p className="text-gray-300">{profile.lastName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    {isEditing ? (
                      <Input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                        className="bg-white/10 border-white/20"
                      />
                    ) : (
                      <p className="text-gray-300 flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        {profile.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    {isEditing ? (
                      <Input
                        value={profile.phone}
                        onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                        className="bg-white/10 border-white/20"
                      />
                    ) : (
                      <p className="text-gray-300 flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        {profile.phone}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Location</label>
                    {isEditing ? (
                      <Input
                        value={profile.location}
                        onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                        className="bg-white/10 border-white/20"
                      />
                    ) : (
                      <p className="text-gray-300">{profile.location}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Professional Information */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Professional Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Professional Title</label>
                    {isEditing ? (
                      <Input
                        value={profile.title}
                        onChange={(e) => setProfile(prev => ({ ...prev, title: e.target.value }))}
                        className="bg-white/10 border-white/20"
                      />
                    ) : (
                      <p className="text-gray-300">{profile.title}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Bio</label>
                    {isEditing ? (
                      <Textarea
                        value={profile.bio}
                        onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                        rows={3}
                        className="bg-white/10 border-white/20"
                      />
                    ) : (
                      <p className="text-gray-300">{profile.bio}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Skills</label>
                    {isEditing ? (
                      <div className="space-y-2">
                        <Input
                          placeholder="Add a skill and press Enter"
                          className="bg-white/10 border-white/20"
                        />
                        <div className="flex flex-wrap gap-2">
                          {profile.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="border-purple-500/30 text-purple-300">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {profile.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="border-purple-500/30 text-purple-300">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Social Links</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">GitHub</label>
                    {isEditing ? (
                      <Input
                        value={profile.github}
                        onChange={(e) => setProfile(prev => ({ ...prev, github: e.target.value }))}
                        className="bg-white/10 border-white/20"
                      />
                    ) : (
                      <p className="text-gray-300 flex items-center">
                        <Github className="h-4 w-4 mr-2" />
                        {profile.github}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">LinkedIn</label>
                    {isEditing ? (
                      <Input
                        value={profile.linkedin}
                        onChange={(e) => setProfile(prev => ({ ...prev, linkedin: e.target.value }))}
                        className="bg-white/10 border-white/20"
                      />
                    ) : (
                      <p className="text-gray-300 flex items-center">
                        <Linkedin className="h-4 w-4 mr-2" />
                        {profile.linkedin}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Website</label>
                    {isEditing ? (
                      <Input
                        value={profile.website}
                        onChange={(e) => setProfile(prev => ({ ...prev, website: e.target.value }))}
                        className="bg-white/10 border-white/20"
                      />
                    ) : (
                      <p className="text-gray-300">{profile.website}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Experience */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {profile.experience.map((exp, index) => (
                      <div key={index} className="border-l-2 border-purple-500/30 pl-4">
                        <h4 className="font-semibold text-white">{exp.position}</h4>
                        <p className="text-purple-400">{exp.company}</p>
                        <p className="text-sm text-gray-400 mb-2">{exp.duration}</p>
                        <p className="text-sm text-gray-300">{exp.description}</p>
                      </div>
                    ))}
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

export default Profile;
