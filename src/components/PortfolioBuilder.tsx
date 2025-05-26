
import React, { useState } from 'react';
import { ArrowLeft, Save, Eye, Share, Wand2, Upload, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import DashboardSidebar from './DashboardSidebar';

const PortfolioBuilder = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('portfolio');
  const [isGenerating, setIsGenerating] = useState(false);
  const [portfolio, setPortfolio] = useState({
    title: '',
    theme: 'modern',
    sections: {
      hero: { title: '', subtitle: '', description: '' },
      about: { content: '' },
      experience: [],
      projects: [],
      skills: [],
      education: [],
      contact: { email: '', phone: '', location: '', linkedin: '', github: '' }
    }
  });

  const themes = [
    { id: 'modern', name: 'Modern', color: 'from-blue-500 to-cyan-500' },
    { id: 'minimal', name: 'Minimal', color: 'from-gray-600 to-gray-800' },
    { id: 'creative', name: 'Creative', color: 'from-purple-500 to-pink-500' },
    { id: 'professional', name: 'Professional', color: 'from-green-500 to-emerald-500' }
  ];

  const handleGenerateWithAI = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setPortfolio(prev => ({
        ...prev,
        sections: {
          ...prev.sections,
          hero: {
            title: 'Alex Johnson',
            subtitle: 'Full-Stack Developer',
            description: 'Passionate about creating innovative web solutions that drive business growth and enhance user experiences.'
          },
          about: {
            content: 'I am a dedicated full-stack developer with 3+ years of experience in building scalable web applications. My expertise spans across React, Node.js, and cloud technologies. I thrive in collaborative environments and am committed to writing clean, maintainable code that solves real-world problems.'
          }
        }
      }));
      setIsGenerating(false);
    }, 3000);
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
                <h1 className="text-4xl font-bold">Portfolio Builder</h1>
                <p className="text-gray-300">Create a stunning portfolio that showcases your skills</p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button variant="outline" className="border-white/20 hover:bg-white/10">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" className="border-white/20 hover:bg-white/10">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Share className="h-4 w-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Editor Panel */}
            <div className="lg:col-span-2 space-y-6">
              {/* AI Generation Card */}
              <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Wand2 className="h-6 w-6 text-purple-400" />
                    <span>AI Portfolio Generator</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    Upload your resume or provide your LinkedIn profile to generate portfolio content automatically
                  </p>
                  <div className="flex space-x-4">
                    <Button 
                      variant="outline" 
                      className="border-purple-500/50 hover:bg-purple-500/20"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Resume
                    </Button>
                    <Button 
                      onClick={handleGenerateWithAI}
                      disabled={isGenerating}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      <Wand2 className="h-4 w-4 mr-2" />
                      {isGenerating ? 'Generating...' : 'Generate with AI'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Theme Selection */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Choose Theme</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {themes.map((theme) => (
                      <div
                        key={theme.id}
                        onClick={() => setPortfolio(prev => ({ ...prev, theme: theme.id }))}
                        className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                          portfolio.theme === theme.id 
                            ? 'ring-2 ring-purple-500 bg-white/10' 
                            : 'bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <div className={`w-full h-16 bg-gradient-to-r ${theme.color} rounded-lg mb-2`}></div>
                        <p className="text-sm font-medium text-center">{theme.name}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Content Editor */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Hero Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Your Name"
                    value={portfolio.sections.hero.title}
                    onChange={(e) => setPortfolio(prev => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        hero: { ...prev.sections.hero, title: e.target.value }
                      }
                    }))}
                    className="bg-white/10 border-white/20"
                  />
                  <Input
                    placeholder="Your Title/Role"
                    value={portfolio.sections.hero.subtitle}
                    onChange={(e) => setPortfolio(prev => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        hero: { ...prev.sections.hero, subtitle: e.target.value }
                      }
                    }))}
                    className="bg-white/10 border-white/20"
                  />
                  <Textarea
                    placeholder="Brief description about yourself"
                    value={portfolio.sections.hero.description}
                    onChange={(e) => setPortfolio(prev => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        hero: { ...prev.sections.hero, description: e.target.value }
                      }
                    }))}
                    rows={3}
                    className="bg-white/10 border-white/20"
                  />
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>About Section</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Tell your story, highlight your expertise and passion"
                    value={portfolio.sections.about.content}
                    onChange={(e) => setPortfolio(prev => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        about: { content: e.target.value }
                      }
                    }))}
                    rows={6}
                    className="bg-white/10 border-white/20"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Preview Panel */}
            <div className="space-y-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Live Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white/5 rounded-lg p-6 min-h-96">
                    {/* Hero Preview */}
                    {portfolio.sections.hero.title && (
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold mb-2">{portfolio.sections.hero.title}</h2>
                        <p className="text-purple-400 mb-3">{portfolio.sections.hero.subtitle}</p>
                        <p className="text-sm text-gray-300">{portfolio.sections.hero.description}</p>
                      </div>
                    )}
                    
                    {/* About Preview */}
                    {portfolio.sections.about.content && (
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-3">About Me</h3>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {portfolio.sections.about.content}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Export Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-white/10 hover:bg-white/20 border border-white/20">
                    <Download className="h-4 w-4 mr-2" />
                    Download HTML
                  </Button>
                  <Button className="w-full bg-white/10 hover:bg-white/20 border border-white/20">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    <Share className="h-4 w-4 mr-2" />
                    Get Custom Domain
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PortfolioBuilder;
