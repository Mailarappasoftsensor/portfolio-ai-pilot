
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Brain, Wand2, Upload, Sparkles, Loader2 } from 'lucide-react';
import { useAIGeneration } from '@/hooks/useAIGeneration';
import { useToast } from '@/hooks/use-toast';

interface AIGenerationCardProps {
  onContentGenerated: (content: any) => void;
  portfolioId?: string;
}

const AIGenerationCard: React.FC<AIGenerationCardProps> = ({ onContentGenerated, portfolioId }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [industry, setIndustry] = useState('tech');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [tone, setTone] = useState<'professional' | 'creative' | 'casual' | 'technical'>('professional');
  const [generationType, setGenerationType] = useState<'full_portfolio' | 'section'>('full_portfolio');
  const [sectionType, setSectionType] = useState('hero');

  const { loading, generatePortfolioContent } = useAIGeneration();
  const { toast } = useToast();

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleGenerate = async () => {
    if (!jobTitle.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide your job title to generate content.",
        variant: "destructive",
      });
      return;
    }

    try {
      const inputData = {
        jobTitle: jobTitle.trim(),
        industry,
        experience,
        skills,
        resumeText: resumeText.trim() || undefined,
        tone,
        ...(generationType === 'section' && { sectionType })
      };

      console.log('Generating content with data:', inputData);

      const content = await generatePortfolioContent({
        generationType,
        inputData,
        portfolioId
      });

      if (content) {
        onContentGenerated(content);
        toast({
          title: "Content Generated!",
          description: `AI has generated ${generationType === 'full_portfolio' ? 'complete portfolio' : sectionType + ' section'} content for you.`,
        });
      }
    } catch (error) {
      console.error('Generation failed:', error);
      toast({
        title: "Generation Failed",
        description: "Please try again or contact support if the issue persists.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-6 w-6 text-purple-400" />
          <span>AI Portfolio Generator</span>
          <Sparkles className="h-5 w-5 text-yellow-400" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Generation Type Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Generation Type</label>
          <Select value={generationType} onValueChange={(value: any) => setGenerationType(value)}>
            <SelectTrigger className="bg-white/10 border-white/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full_portfolio">Complete Portfolio</SelectItem>
              <SelectItem value="section">Specific Section</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {generationType === 'section' && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Section Type</label>
            <Select value={sectionType} onValueChange={setSectionType}>
              <SelectTrigger className="bg-white/10 border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hero">Hero Section</SelectItem>
                <SelectItem value="about">About Section</SelectItem>
                <SelectItem value="experience">Experience</SelectItem>
                <SelectItem value="projects">Projects</SelectItem>
                <SelectItem value="skills">Skills</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Job Title *</label>
            <Input
              placeholder="e.g., Full Stack Developer"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="bg-white/10 border-white/20"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Industry</label>
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger className="bg-white/10 border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tech">Technology</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Years of Experience</label>
            <Input
              placeholder="e.g., 3"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="bg-white/10 border-white/20"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Tone</label>
            <Select value={tone} onValueChange={(value: any) => setTone(value)}>
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

        {/* Skills */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Skills</label>
          <div className="flex space-x-2">
            <Input
              placeholder="Add a skill..."
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              className="bg-white/10 border-white/20"
            />
            <Button 
              onClick={addSkill}
              variant="outline"
              className="border-white/20 hover:bg-white/10"
            >
              Add
            </Button>
          </div>
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="bg-purple-500/20 text-purple-200 cursor-pointer"
                  onClick={() => removeSkill(skill)}
                >
                  {skill} ×
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Resume Upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
            <Upload className="h-4 w-4" />
            <span>Resume/CV Text (Optional)</span>
          </label>
          <Textarea
            placeholder="Paste your resume content here to help AI generate more accurate content..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            rows={4}
            className="bg-white/10 border-white/20"
          />
        </div>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={loading || !jobTitle.trim()}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating with AI...
            </>
          ) : (
            <>
              <Wand2 className="h-4 w-4 mr-2" />
              Generate {generationType === 'full_portfolio' ? 'Portfolio' : 'Section'} Content
            </>
          )}
        </Button>

        <p className="text-xs text-gray-400 text-center">
          AI will generate professional content based on your inputs. You can edit and customize everything afterwards.
        </p>
      </CardContent>
    </Card>
  );
};

export default AIGenerationCard;
