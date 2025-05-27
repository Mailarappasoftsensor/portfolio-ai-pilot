
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Eye, Share, Download } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { usePortfolios } from '@/hooks/usePortfolios';
import { usePortfolioEditor } from '@/hooks/usePortfolioEditor';
import DashboardSidebar from './DashboardSidebar';
import AIGenerationCard from './portfolio/AIGenerationCard';
import HeroSection from './portfolio/HeroSection';
import ExperienceSection from './portfolio/ExperienceSection';
import ProjectsSection from './portfolio/ProjectsSection';
import PortfolioPreview from './portfolio/PortfolioPreview';
import PortfolioSection from './portfolio/PortfolioSection';

const PortfolioBuilder = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const portfolioId = searchParams.get('id');
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState('portfolio');

  const {
    portfolio,
    setPortfolio,
    currentPortfolio,
    isSaving,
    loading,
    save,
    publish
  } = usePortfolioEditor(portfolioId || undefined);

  const handleSave = async () => {
    try {
      const savedPortfolio = await save();
      if (savedPortfolio && !portfolioId) {
        navigate(`/portfolio?id=${savedPortfolio.id}`, { replace: true });
      }
    } catch (error) {
      console.error('Error saving portfolio:', error);
    }
  };

  const handleContentGenerated = (generatedContent: any) => {
    setPortfolio(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        ...generatedContent
      }
    }));
    
    toast({
      title: "Content Applied",
      description: "AI-generated content has been applied to your portfolio!",
    });
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
                  {currentPortfolio ? 'Edit your portfolio' : 'Create a stunning AI-powered portfolio'}
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
                onClick={publish}
              >
                <Share className="h-4 w-4 mr-2" />
                {portfolio.is_published ? 'Unpublish' : 'Publish'}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <AIGenerationCard 
                onContentGenerated={handleContentGenerated}
                portfolioId={currentPortfolio?.id}
              />

              <HeroSection 
                hero={portfolio.sections.hero}
                onChange={(hero) => setPortfolio(prev => ({
                  ...prev,
                  sections: { ...prev.sections, hero }
                }))}
              />

              <ExperienceSection 
                experience={portfolio.sections.experience}
                onChange={(experience) => setPortfolio(prev => ({
                  ...prev,
                  sections: { ...prev.sections, experience }
                }))}
              />

              <ProjectsSection 
                projects={portfolio.sections.projects}
                onChange={(projects) => setPortfolio(prev => ({
                  ...prev,
                  sections: { ...prev.sections, projects }
                }))}
              />
            </div>

            <div className="space-y-6">
              <PortfolioPreview portfolio={portfolio} />

              <PortfolioSection title="Export Options">
                <div className="space-y-3">
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
                </div>
              </PortfolioSection>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PortfolioBuilder;
