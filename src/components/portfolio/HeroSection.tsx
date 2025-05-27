
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { User, Crown, FileText } from 'lucide-react';
import PortfolioSection from './PortfolioSection';

interface HeroSectionProps {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  onChange: (hero: any) => void;
  onEnhanceWithAI?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ hero, onChange, onEnhanceWithAI }) => {
  const updateHero = (field: string, value: string) => {
    onChange({ ...hero, [field]: value });
  };

  return (
    <PortfolioSection 
      title="Hero Section" 
      icon={<User className="h-5 w-5" />}
      onEnhanceWithAI={onEnhanceWithAI}
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">
            <User className="h-4 w-4 inline mr-1" />
            Your Name
          </label>
          <Input
            placeholder="John Doe"
            value={hero.title}
            onChange={(e) => updateHero('title', e.target.value)}
            className="bg-white/10 border-white/20"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">
            <Crown className="h-4 w-4 inline mr-1" />
            Professional Title
          </label>
          <Input
            placeholder="Full Stack Developer"
            value={hero.subtitle}
            onChange={(e) => updateHero('subtitle', e.target.value)}
            className="bg-white/10 border-white/20"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">
            <FileText className="h-4 w-4 inline mr-1" />
            Professional Summary
          </label>
          <Textarea
            placeholder="Brief, compelling description that highlights your expertise and value proposition..."
            value={hero.description}
            onChange={(e) => updateHero('description', e.target.value)}
            rows={3}
            className="bg-white/10 border-white/20"
          />
        </div>
      </div>
    </PortfolioSection>
  );
};

export default HeroSection;
