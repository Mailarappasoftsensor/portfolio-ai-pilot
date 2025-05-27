
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface PortfolioTheme {
  id: string;
  name: string;
  display_name: string;
  description: string | null;
  config: any;
  is_premium: boolean;
  preview_url: string | null;
  created_at: string;
}

export const usePortfolioThemes = () => {
  const [themes, setThemes] = useState<PortfolioTheme[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchThemes = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('get-portfolio-themes');

      if (error) throw error;

      setThemes(data.themes || []);
    } catch (error: any) {
      console.error('Error fetching themes:', error);
      toast({
        title: "Error",
        description: "Failed to fetch portfolio themes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThemes();
  }, []);

  return {
    themes,
    loading,
    refetch: fetchThemes,
  };
};
