
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FolderOpen, Trash2, ExternalLink, Code2, FileText } from 'lucide-react';
import PortfolioSection from './PortfolioSection';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  url: string;
}

interface ProjectsSectionProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
  onEnhanceWithAI?: () => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, onChange, onEnhanceWithAI }) => {
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: '',
      description: '',
      technologies: [],
      url: ''
    };
    onChange([...projects, newProject]);
  };

  const updateProject = (index: number, field: keyof Project, value: string | string[]) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeProject = (id: string) => {
    onChange(projects.filter(proj => proj.id !== id));
  };

  const addTechnology = (index: number, tech: string) => {
    if (tech.trim() && !projects[index].technologies.includes(tech.trim())) {
      const updated = [...projects];
      updated[index].technologies = [...updated[index].technologies, tech.trim()];
      onChange(updated);
    }
  };

  const removeTechnology = (index: number, techToRemove: string) => {
    const updated = [...projects];
    updated[index].technologies = updated[index].technologies.filter(tech => tech !== techToRemove);
    onChange(updated);
  };

  return (
    <PortfolioSection 
      title="Projects" 
      icon={<FolderOpen className="h-5 w-5" />}
      onAddItem={addProject}
      onEnhanceWithAI={onEnhanceWithAI}
      addButtonText="Add Project"
    >
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div key={project.id} className="p-4 bg-white/5 rounded-lg space-y-3 border border-white/10">
            <div className="flex justify-between items-start">
              <h4 className="text-sm font-medium text-purple-300">Project {index + 1}</h4>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeProject(project.id)}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div>
              <label className="text-xs font-medium text-gray-400 mb-1 block">
                <FolderOpen className="h-3 w-3 inline mr-1" />
                Project Name
              </label>
              <Input
                placeholder="Awesome Web App"
                value={project.title}
                onChange={(e) => updateProject(index, 'title', e.target.value)}
                className="bg-white/10 border-white/20"
              />
            </div>
            
            <div>
              <label className="text-xs font-medium text-gray-400 mb-1 block">
                <ExternalLink className="h-3 w-3 inline mr-1" />
                Project URL
              </label>
              <Input
                placeholder="https://github.com/username/project"
                value={project.url}
                onChange={(e) => updateProject(index, 'url', e.target.value)}
                className="bg-white/10 border-white/20"
              />
            </div>
            
            <div>
              <label className="text-xs font-medium text-gray-400 mb-1 block">
                <FileText className="h-3 w-3 inline mr-1" />
                Description
              </label>
              <Textarea
                placeholder="Describe the project, its purpose, key features, and your role in its development..."
                value={project.description}
                onChange={(e) => updateProject(index, 'description', e.target.value)}
                rows={3}
                className="bg-white/10 border-white/20"
              />
            </div>
            
            <div>
              <label className="text-xs font-medium text-gray-400 mb-1 block">
                <Code2 className="h-3 w-3 inline mr-1" />
                Technologies
              </label>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="Add technology..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addTechnology(index, e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                  className="bg-white/10 border-white/20 flex-1"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <Badge 
                    key={techIndex} 
                    variant="secondary" 
                    className="bg-blue-500/20 hover:bg-blue-500/30 cursor-pointer"
                    onClick={() => removeTechnology(index, tech)}
                  >
                    {tech} ×
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
        
        {projects.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <FolderOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No projects added yet. Click "Add Project" to showcase your work.</p>
          </div>
        )}
      </div>
    </PortfolioSection>
  );
};

export default ProjectsSection;
