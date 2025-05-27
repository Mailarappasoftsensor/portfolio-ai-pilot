
import React, { useState } from 'react';
import { Wand2, Upload, FileText, Briefcase, Users, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useAIGeneration } from '@/hooks/useAIGeneration';

interface AIGenerationCardProps {
  onContentGenerated: (content: any) => void;
  portfolioId?: string;
}

const AIGenerationCard: React.FC<AIGenerationCardProps> = ({ onContentGenerated, portfolioId }) => {
  const { loading, generatePortfolioContent } = useAIGeneration();
  const [formData, setFormData] = useState({
    jobTitle: '',
    industry: '',
    experience: '',
    skills: [] as string[],
    resumeText: '',
    tone: 'professional' as const,
  });
  const [currentSkill, setCurrentSkill] = useState('');

  const handleGenerate = async () => {
    if (!formData.jobTitle) {
      return;
    }

    try {
      const content = await generatePortfolioContent({
        generationType: 'full_portfolio',
        inputData: formData,
        portfolioId,
      });
      onContentGenerated(content);
    } catch (error) {
      console.error('Generation failed:', error);
    }
  };

  const addSkill = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()]
      }));
      setCurrentSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  return (
    <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Wand2 className="h-6 w-6 text-purple-400" />
          <span>AI Portfolio Generator</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              <Briefcase className="h-4 w-4 inline mr-1" />
              Job Title *
            </label>
            <Input
              placeholder="e.g., Full Stack Developer"
              value={formData.jobTitle}
              onChange={(e) => setFormData(prev => ({ ...prev, jobTitle: e.target.value }))}
              className="bg-white/10 border-white/20"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Industry</label>
            <Input
              placeholder="e.g., Technology, Healthcare"
              value={formData.industry}
              onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
              className="bg-white/10 border-white/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Years of Experience</label>
            <Select value={formData.experience} onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}>
              <SelectTrigger className="bg-white/10 border-white/20">
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-1">0-1 years (Entry Level)</SelectItem>
                <SelectItem value="2-3">2-3 years (Junior)</SelectItem>
                <SelectItem value="4-6">4-6 years (Mid-Level)</SelectItem>
                <SelectItem value="7-10">7-10 years (Senior)</SelectItem>
                <SelectItem value="10+">10+ years (Expert)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              <Palette className="h-4 w-4 inline mr-1" />
              Tone
            </label>
            <Select value={formData.tone} onValueChange={(value: any) => setFormData(prev => ({ ...prev, tone: value }))}>
              <SelectTrigger className="bg-white/10 border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="creative">Creative</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">Skills</label>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Add a skill..."
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              className="bg-white/10 border-white/20 flex-1"
            />
            <Button onClick={addSkill} size="sm" variant="outline" className="border-white/20">
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="bg-purple-500/20 hover:bg-purple-500/30 cursor-pointer"
                onClick={() => removeSkill(skill)}
              >
                {skill} ×
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">
            <FileText className="h-4 w-4 inline mr-1" />
            Resume/Background (Optional)
          </label>
          <Textarea
            placeholder="Paste your resume or describe your background to get more personalized content..."
            value={formData.resumeText}
            onChange={(e) => setFormData(prev => ({ ...prev, resumeText: e.target.value }))}
            rows={4}
            className="bg-white/10 border-white/20"
          />
        </div>

        <div className="flex space-x-4 pt-4">
          <Button 
            onClick={handleGenerate}
            disabled={loading || !formData.jobTitle}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 flex-1"
          >
            <Wand2 className="h-4 w-4 mr-2" />
            {loading ? 'Generating...' : 'Generate Portfolio'}
          </Button>
        </div>

        <div className="text-xs text-gray-400 border-t border-white/10 pt-4">
          <p>💡 Tip: The more details you provide, the more personalized your portfolio will be!</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIGenerationCard;
