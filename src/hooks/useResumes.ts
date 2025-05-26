
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Resume {
  id: string;
  title: string;
  content: any;
  file_url?: string;
  ats_score?: number;
  created_at: string;
  updated_at: string;
}

export const useResumes = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchResumes = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResumes(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch resumes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createResume = async (resumeData: Partial<Resume> & { title: string }) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('resumes')
        .insert({
          user_id: user.id,
          title: resumeData.title,
          content: resumeData.content || {},
          file_url: resumeData.file_url,
          ats_score: resumeData.ats_score,
        })
        .select()
        .single();

      if (error) throw error;

      setResumes(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Resume created successfully",
      });

      return data;
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to create resume",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateResume = async (id: string, updates: Partial<Resume>) => {
    try {
      const { data, error } = await supabase
        .from('resumes')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setResumes(prev => 
        prev.map(r => r.id === id ? data : r)
      );

      toast({
        title: "Success",
        description: "Resume updated successfully",
      });

      return data;
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update resume",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteResume = async (id: string) => {
    try {
      const { error } = await supabase
        .from('resumes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setResumes(prev => prev.filter(r => r.id !== id));
      toast({
        title: "Success",
        description: "Resume deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete resume",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchResumes();
  }, [user]);

  return {
    resumes,
    loading,
    createResume,
    updateResume,
    deleteResume,
    refetch: fetchResumes,
  };
};
