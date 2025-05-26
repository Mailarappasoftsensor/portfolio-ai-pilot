
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Job {
  id: string;
  title: string;
  company: string;
  location?: string;
  description?: string;
  url?: string;
  status?: string;
  created_at: string;
  updated_at: string;
}

export const useJobs = () => {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchSavedJobs = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('saved_jobs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSavedJobs(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch saved jobs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveJob = async (jobData: Partial<Job>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('saved_jobs')
        .insert({
          user_id: user.id,
          ...jobData,
        })
        .select()
        .single();

      if (error) throw error;

      setSavedJobs(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Job saved successfully",
      });

      return data;
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to save job",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateJobStatus = async (id: string, status: string) => {
    try {
      const { data, error } = await supabase
        .from('saved_jobs')
        .update({
          status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setSavedJobs(prev => 
        prev.map(job => job.id === id ? data : job)
      );

      toast({
        title: "Success",
        description: "Job status updated successfully",
      });

      return data;
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update job status",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteJob = async (id: string) => {
    try {
      const { error } = await supabase
        .from('saved_jobs')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setSavedJobs(prev => prev.filter(job => job.id !== id));
      toast({
        title: "Success",
        description: "Job deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete job",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, [user]);

  return {
    savedJobs,
    loading,
    saveJob,
    updateJobStatus,
    deleteJob,
    refetch: fetchSavedJobs,
  };
};
