
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AIGenerationRequest {
  generationType: 'full_portfolio' | 'section' | 'content_enhancement';
  inputData: {
    resumeText?: string;
    jobTitle?: string;
    industry?: string;
    experience?: string;
    skills?: string[];
    existingContent?: any;
    targetAudience?: string;
    tone?: 'professional' | 'creative' | 'casual' | 'technical';
  };
  portfolioId?: string;
}

export const useAIGeneration = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const generatePortfolioContent = async (request: AIGenerationRequest) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-portfolio-ai', {
        body: request,
      });

      if (error) throw error;

      toast({
        title: "Content Generated",
        description: "AI has successfully generated your portfolio content!",
      });

      return data.content;
    } catch (error: any) {
      console.error('Error generating content:', error);
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate content. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const enhanceContent = async (content: string, enhancementType: string, context?: any) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('enhance-content-ai', {
        body: { content, enhancementType, context },
      });

      if (error) throw error;

      return data.enhancedContent;
    } catch (error: any) {
      console.error('Error enhancing content:', error);
      toast({
        title: "Enhancement Failed",
        description: error.message || "Failed to enhance content. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    generatePortfolioContent,
    enhanceContent,
  };
};
