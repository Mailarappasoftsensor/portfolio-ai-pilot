
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { usePortfolios } from '@/hooks/usePortfolios';

export interface PortfolioSection {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  about: {
    content: string;
  };
  experience: Array<{
    id: string;
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  projects: Array<{
    id: string;
    title: string;
    description: string;
    technologies: string[];
    url: string;
  }>;
  skills: string[];
  education: Array<{
    id: string;
    degree: string;
    school: string;
    year: string;
  }>;
  contact: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
  };
}

export interface PortfolioData {
  id: string;
  title: string;
  theme: string;
  is_published: boolean;
  sections: PortfolioSection;
}

export const usePortfolioEditor = (portfolioId?: string) => {
  const { toast } = useToast();
  const { portfolios, createPortfolio, updatePortfolio, publishPortfolio, loading } = usePortfolios();
  
  const [portfolio, setPortfolio] = useState<PortfolioData>({
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

  const [currentPortfolio, setCurrentPortfolio] = useState(null);
  const [isSaving, setSaving] = useState(false);

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
          sections: existingPortfolio.content?.sections || portfolio.sections
        });
      }
    }
  }, [portfolioId, portfolios]);

  const updateSection = (sectionName: keyof PortfolioSection, data: any) => {
    setPortfolio(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionName]: data
      }
    }));
  };

  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      duration: '',
      description: ''
    };
    
    setPortfolio(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        experience: [...prev.sections.experience, newExperience]
      }
    }));
  };

  const updateExperience = (index: number, field: string, value: string) => {
    setPortfolio(prev => {
      const newExperience = [...prev.sections.experience];
      newExperience[index] = { ...newExperience[index], [field]: value };
      return {
        ...prev,
        sections: {
          ...prev.sections,
          experience: newExperience
        }
      };
    });
  };

  const removeExperience = (id: string) => {
    setPortfolio(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        experience: prev.sections.experience.filter(exp => exp.id !== id)
      }
    }));
  };

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: '',
      description: '',
      technologies: [],
      url: ''
    };
    
    setPortfolio(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        projects: [...prev.sections.projects, newProject]
      }
    }));
  };

  const updateProject = (index: number, field: string, value: string | string[]) => {
    setPortfolio(prev => {
      const newProjects = [...prev.sections.projects];
      newProjects[index] = { ...newProjects[index], [field]: value };
      return {
        ...prev,
        sections: {
          ...prev.sections,
          projects: newProjects
        }
      };
    });
  };

  const removeProject = (id: string) => {
    setPortfolio(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        projects: prev.sections.projects.filter(proj => proj.id !== id)
      }
    }));
  };

  const save = async () => {
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
          return newPortfolio;
        }
      }
    } catch (error) {
      console.error('Error saving portfolio:', error);
      toast({
        title: "Error",
        description: "Failed to save portfolio. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setSaving(false);
    }
  };

  const publish = async () => {
    if (!currentPortfolio) {
      await save();
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
      toast({
        title: "Error",
        description: "Failed to publish portfolio. Please try again.",
        variant: "destructive",
      });
    }
  };

  const generateWithAI = async () => {
    // Simulate AI generation
    const aiContent = {
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
          id: Date.now().toString(),
          title: 'E-commerce Platform',
          description: 'Built a full-stack e-commerce solution with React and Node.js, featuring user authentication, payment processing, and inventory management.',
          technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
          url: 'https://example-ecommerce.com'
        },
        {
          id: (Date.now() + 1).toString(),
          title: 'Task Management App',
          description: 'Developed a collaborative task management application with real-time updates and team collaboration features.',
          technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
          url: 'https://example-tasks.com'
        }
      ],
      experience: [
        {
          id: Date.now().toString(),
          title: 'Senior Frontend Developer',
          company: 'Tech Solutions Inc.',
          duration: 'Jan 2022 - Present',
          description: 'Lead frontend development for multiple client projects, mentored junior developers, and implemented modern React patterns and best practices.'
        },
        {
          id: (Date.now() + 1).toString(),
          title: 'Full Stack Developer',
          company: 'StartupXYZ',
          duration: 'Jun 2020 - Dec 2021',
          description: 'Built and maintained full-stack applications using React, Node.js, and PostgreSQL. Collaborated with design team to implement responsive UI components.'
        }
      ]
    };

    setPortfolio(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        ...aiContent
      }
    }));

    toast({
      title: "Content Generated",
      description: "AI has generated portfolio content for you!",
    });
  };

  return {
    portfolio,
    setPortfolio,
    currentPortfolio,
    isSaving,
    loading,
    updateSection,
    addExperience,
    updateExperience,
    removeExperience,
    addProject,
    updateProject,
    removeProject,
    save,
    publish,
    generateWithAI
  };
};
