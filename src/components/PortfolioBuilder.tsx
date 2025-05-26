
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Eye, Share, Wand2, Upload, Download, Plus, Trash2 } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { usePortfolios } from '@/hooks/usePortfolios';
import DashboardSidebar from './DashboardSidebar';

const PortfolioBuilder = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const portfolioId = searchParams.get('id');
  const { toast } = useToast();
  const { portfolios, createPortfolio, updatePortfolio, publishPortfolio, loading } = usePortfolios();
  
  const [activeSection, setActiveSection] = useState('portfolio');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [currentPortfolio, setCurrentPortfolio] = useState(null);
  
  const [portfolio, setPortfolio] = useState({
    id: '',
    title: 'My Portfolio',
    theme: 'modern',
    is_published: false,
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

  // Load existing portfolio if ID is provided
  useEffect(() => {
    if (portfolioId && portfolios.length > 0) {
      const existingPortfolio = portfolios.find(p => p.id === portfolioId);
      if (existingPortfolio) {
        setCurrentPortfolio(existingPortfolio);
        setPortfolio({
          id: existingPortfolio.id,
          title: existingPortfolio.title,
          theme: existingPortfolio.content?.theme || 'modern',
          is_published: existingPortfolio.is_published,
          sections: existingPortfolio.content?.sections || {
            hero: { title: '', subtitle: '', description: '' },
            about: { content: '' },
            experience: [],
            projects: [],
            skills: [],
            education: [],
            contact: { email: '', phone: '', location: '', linkedin: '', github: '' }
          }
        });
      }
    }
  }, [portfolioId, portfolios]);

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
          },
          skills: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker'],
          projects: [
            {
              id: '1',
              title: 'E-commerce Platform',
              description: 'Built a full-stack e-commerce solution with React and Node.js',
              technologies: ['React', 'Node.js', 'MongoDB'],
              url: 'https://example.com'
            }
          ]
        }
      }));
      setIsGenerating(false);
      toast({
        title: "Content Generated",
        description: "AI has generated portfolio content for you!",
      });
    }, 3000);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const portfolioData = {
        title: portfolio.title,
        content: {
          theme: portfolio.theme,
          sections: portfolio.sections
        },
        is_published: portfolio.is_published
      };

      if (currentPortfolio) {
        await updatePortfolio(currentPortfolio.id, portfolioData);
        toast({
          title: "Portfolio Updated",
          description: "Your portfolio has been saved successfully.",
        });
      } else {
        const newPortfolio = await createPortfolio(portfolioData);
        if (newPortfolio) {
          setCurrentPortfolio(newPortfolio);
          setPortfolio(prev => ({ ...prev, id: newPortfolio.id }));
          // Update URL to include the new portfolio ID
          navigate(`/portfolio?id=${newPortfolio.id}`, { replace: true });
        }
      }
    } catch (error) {
      console.error('Error saving portfolio:', error);
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!currentPortfolio) {
      await handleSave();
      return;
    }

    try {
      await publishPortfolio(currentPortfolio.id, !portfolio.is_published);
      setPortfolio(prev => ({ ...prev, is_published: !prev.is_published }));
      toast({
        title: portfolio.is_published ? "Portfolio Unpublished" : "Portfolio Published",
        description: portfolio.is_published ? "Your portfolio is now private." : "Your portfolio is now live!",
      });
    } catch (error) {
      console.error('Error publishing portfolio:', error);
    }
  };

  const addExperience = () => {
    setPortfolio(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        experience: [...prev.sections.experience, {
          id: Date.now().toString(),
          title: '',
          company: '',
          duration: '',
          description: ''
        }]
      }
    }));
  };

  const addProject = () => {
    setPortfolio(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        projects: [...prev.sections.projects, {
          id: Date.now().toString(),
          title: '',
          description: '',
          technologies: [],
          url: ''
        }]
      }
    }));
  };

  const removeExperience = (id) => {
    setPortfolio(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        experience: prev.sections.experience.filter(exp => exp.id !== id)
      }
    }));
  };

  const removeProject = (id) => {
    setPortfolio(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        projects: prev.sections.projects.filter(proj => proj.id !== id)
      }
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

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
                <p className="text-gray-300">
                  {currentPortfolio ? 'Edit your portfolio' : 'Create a stunning portfolio that showcases your skills'}
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Input
                value={portfolio.title}
                onChange={(e) => setPortfolio(prev => ({ ...prev, title: e.target.value }))}
                className="bg-white/10 border-white/20 text-white w-48"
                placeholder="Portfolio Title"
              />
              <Button 
                variant="outline" 
                className="border-white/20 hover:bg-white/10"
                onClick={() => window.open('#', '_blank')}
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button 
                variant="outline" 
                className="border-white/20 hover:bg-white/10"
                onClick={handleSave}
                disabled={isSaving}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Draft'}
              </Button>
              <Button 
                className={`${portfolio.is_published ? 'bg-red-500 hover:bg-red-600' : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'}`}
                onClick={handlePublish}
              >
                <Share className="h-4 w-4 mr-2" />
                {portfolio.is_published ? 'Unpublish' : 'Publish'}
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
                    Generate portfolio content automatically with AI
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

              {/* Hero Section */}
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

              {/* About Section */}
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

              {/* Experience Section */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Experience
                    <Button
                      size="sm"
                      onClick={addExperience}
                      className="bg-white/10 hover:bg-white/20"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {portfolio.sections.experience.map((exp, index) => (
                    <div key={exp.id} className="p-4 bg-white/5 rounded-lg space-y-3">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-medium">Experience {index + 1}</h4>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeExperience(exp.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          placeholder="Job Title"
                          value={exp.title}
                          onChange={(e) => {
                            const newExp = [...portfolio.sections.experience];
                            newExp[index] = { ...newExp[index], title: e.target.value };
                            setPortfolio(prev => ({
                              ...prev,
                              sections: { ...prev.sections, experience: newExp }
                            }));
                          }}
                          className="bg-white/10 border-white/20"
                        />
                        <Input
                          placeholder="Company"
                          value={exp.company}
                          onChange={(e) => {
                            const newExp = [...portfolio.sections.experience];
                            newExp[index] = { ...newExp[index], company: e.target.value };
                            setPortfolio(prev => ({
                              ...prev,
                              sections: { ...prev.sections, experience: newExp }
                            }));
                          }}
                          className="bg-white/10 border-white/20"
                        />
                      </div>
                      <Input
                        placeholder="Duration (e.g., Jan 2020 - Present)"
                        value={exp.duration}
                        onChange={(e) => {
                          const newExp = [...portfolio.sections.experience];
                          newExp[index] = { ...newExp[index], duration: e.target.value };
                          setPortfolio(prev => ({
                            ...prev,
                            sections: { ...prev.sections, experience: newExp }
                          }));
                        }}
                        className="bg-white/10 border-white/20"
                      />
                      <Textarea
                        placeholder="Description of your role and achievements"
                        value={exp.description}
                        onChange={(e) => {
                          const newExp = [...portfolio.sections.experience];
                          newExp[index] = { ...newExp[index], description: e.target.value };
                          setPortfolio(prev => ({
                            ...prev,
                            sections: { ...prev.sections, experience: newExp }
                          }));
                        }}
                        rows={3}
                        className="bg-white/10 border-white/20"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Projects Section */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Projects
                    <Button
                      size="sm"
                      onClick={addProject}
                      className="bg-white/10 hover:bg-white/20"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {portfolio.sections.projects.map((project, index) => (
                    <div key={project.id} className="p-4 bg-white/5 rounded-lg space-y-3">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-medium">Project {index + 1}</h4>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeProject(project.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <Input
                        placeholder="Project Title"
                        value={project.title}
                        onChange={(e) => {
                          const newProjects = [...portfolio.sections.projects];
                          newProjects[index] = { ...newProjects[index], title: e.target.value };
                          setPortfolio(prev => ({
                            ...prev,
                            sections: { ...prev.sections, projects: newProjects }
                          }));
                        }}
                        className="bg-white/10 border-white/20"
                      />
                      <Input
                        placeholder="Project URL"
                        value={project.url}
                        onChange={(e) => {
                          const newProjects = [...portfolio.sections.projects];
                          newProjects[index] = { ...newProjects[index], url: e.target.value };
                          setPortfolio(prev => ({
                            ...prev,
                            sections: { ...prev.sections, projects: newProjects }
                          }));
                        }}
                        className="bg-white/10 border-white/20"
                      />
                      <Textarea
                        placeholder="Project description"
                        value={project.description}
                        onChange={(e) => {
                          const newProjects = [...portfolio.sections.projects];
                          newProjects[index] = { ...newProjects[index], description: e.target.value };
                          setPortfolio(prev => ({
                            ...prev,
                            sections: { ...prev.sections, projects: newProjects }
                          }));
                        }}
                        rows={3}
                        className="bg-white/10 border-white/20"
                      />
                    </div>
                  ))}
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

                    {/* Experience Preview */}
                    {portfolio.sections.experience.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-3">Experience</h3>
                        <div className="space-y-3">
                          {portfolio.sections.experience.map((exp, index) => (
                            <div key={index} className="border-l-2 border-purple-500 pl-3">
                              <h4 className="font-medium">{exp.title} at {exp.company}</h4>
                              <p className="text-sm text-gray-400">{exp.duration}</p>
                              <p className="text-sm text-gray-300 mt-1">{exp.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Projects Preview */}
                    {portfolio.sections.projects.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-3">Projects</h3>
                        <div className="space-y-3">
                          {portfolio.sections.projects.map((project, index) => (
                            <div key={index} className="bg-white/5 p-3 rounded">
                              <h4 className="font-medium">{project.title}</h4>
                              <p className="text-sm text-gray-300 mt-1">{project.description}</p>
                              {project.url && (
                                <a href={project.url} className="text-purple-400 text-sm">View Project</a>
                              )}
                            </div>
                          ))}
                        </div>
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
