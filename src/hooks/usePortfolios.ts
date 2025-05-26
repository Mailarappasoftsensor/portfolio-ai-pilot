
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Portfolio {
  id: string;
  title: string;
  content: any;
  template_id?: string;
  subdomain?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export const usePortfolios = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchPortfolios = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('portfolios')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPortfolios(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch portfolios",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createPortfolio = async (portfolioData: Partial<Portfolio>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('portfolios')
        .insert({
          user_id: user.id,
          ...portfolioData,
        })
        .select()
        .single();

      if (error) throw error;

      setPortfolios(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Portfolio created successfully",
      });

      return data;
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to create portfolio",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updatePortfolio = async (id: string, updates: Partial<Portfolio>) => {
    try {
      const { data, error } = await supabase
        .from('portfolios')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setPortfolios(prev => 
        prev.map(p => p.id === id ? data : p)
      );

      toast({
        title: "Success",
        description: "Portfolio updated successfully",
      });

      return data;
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update portfolio",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deletePortfolio = async (id: string) => {
    try {
      const { error } = await supabase
        .from('portfolios')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPortfolios(prev => prev.filter(p => p.id !== id));
      toast({
        title: "Success",
        description: "Portfolio deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete portfolio",
        variant: "destructive",
      });
      throw error;
    }
  };

  const publishPortfolio = async (id: string, publish: boolean) => {
    return updatePortfolio(id, { is_published: publish });
  };

  useEffect(() => {
    fetchPortfolios();
  }, [user]);

  return {
    portfolios,
    loading,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
    publishPortfolio,
    refetch: fetchPortfolios,
  };
};
