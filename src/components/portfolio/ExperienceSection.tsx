
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Briefcase, Trash2, Building2, Calendar, FileText } from 'lucide-react';
import PortfolioSection from './PortfolioSection';

interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
}

interface ExperienceSectionProps {
  experience: Experience[];
  onChange: (experience: Experience[]) => void;
  onEnhanceWithAI?: () => void;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experience, onChange, onEnhanceWithAI }) => {
  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      duration: '',
      description: ''
    };
    onChange([...experience, newExp]);
  };

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const updated = [...experience];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeExperience = (id: string) => {
    onChange(experience.filter(exp => exp.id !== id));
  };

  return (
    <PortfolioSection 
      title="Experience" 
      icon={<Briefcase className="h-5 w-5" />}
      onAddItem={addExperience}
      onEnhanceWithAI={onEnhanceWithAI}
      addButtonText="Add Experience"
    >
      <div className="space-y-4">
        {experience.map((exp, index) => (
          <div key={exp.id} className="p-4 bg-white/5 rounded-lg space-y-3 border border-white/10">
            <div className="flex justify-between items-start">
              <h4 className="text-sm font-medium text-purple-300">Experience {index + 1}</h4>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeExperience(exp.id)}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-400 mb-1 block">
                  <Briefcase className="h-3 w-3 inline mr-1" />
                  Job Title
                </label>
                <Input
                  placeholder="Senior Developer"
                  value={exp.title}
                  onChange={(e) => updateExperience(index, 'title', e.target.value)}
                  className="bg-white/10 border-white/20"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-400 mb-1 block">
                  <Building2 className="h-3 w-3 inline mr-1" />
                  Company
                </label>
                <Input
                  placeholder="Tech Corp"
                  value={exp.company}
                  onChange={(e) => updateExperience(index, 'company', e.target.value)}
                  className="bg-white/10 border-white/20"
                />
              </div>
            </div>
            
            <div>
              <label className="text-xs font-medium text-gray-400 mb-1 block">
                <Calendar className="h-3 w-3 inline mr-1" />
                Duration
              </label>
              <Input
                placeholder="Jan 2020 - Present"
                value={exp.duration}
                onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                className="bg-white/10 border-white/20"
              />
            </div>
            
            <div>
              <label className="text-xs font-medium text-gray-400 mb-1 block">
                <FileText className="h-3 w-3 inline mr-1" />
                Description & Achievements
              </label>
              <Textarea
                placeholder="Describe your role, key responsibilities, and quantifiable achievements..."
                value={exp.description}
                onChange={(e) => updateExperience(index, 'description', e.target.value)}
                rows={3}
                className="bg-white/10 border-white/20"
              />
            </div>
          </div>
        ))}
        
        {experience.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <Briefcase className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No experience added yet. Click "Add Experience" to get started.</p>
          </div>
        )}
      </div>
    </PortfolioSection>
  );
};

export default ExperienceSection;
