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
      
      // Map database fields to interface fields
      const mappedJobs = (data || []).map(job => ({
        id: job.id,
        title: job.job_title,
        company: job.company,
        description: job.description || undefined,
        url: job.url || undefined,
        status: job.status || undefined,
        created_at: job.created_at,
        updated_at: job.updated_at
      }));
      
      setSavedJobs(mappedJobs);
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
      // Map interface fields to database fields
      const dbJobData = {
        user_id: user.id,
        job_title: jobData.title || '',
        company: jobData.company || '',
        description: jobData.description,
        url: jobData.url,
        status: jobData.status,
      };

      const { data, error } = await supabase
        .from('saved_jobs')
        .insert(dbJobData)
        .select()
        .single();

      if (error) throw error;

      // Map back to interface format
      const mappedJob = {
        id: data.id,
        title: data.job_title,
        company: data.company,
        description: data.description || undefined,
        url: data.url || undefined,
        status: data.status || undefined,
        created_at: data.created_at,
        updated_at: data.updated_at
      };

      setSavedJobs(prev => [mappedJob, ...prev]);
      toast({
        title: "Success",
        description: "Job saved successfully",
      });

      return mappedJob;
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

      // Map back to interface format
      const mappedJob = {
        id: data.id,
        title: data.job_title,
        company: data.company,
        description: data.description || undefined,
        url: data.url || undefined,
        status: data.status || undefined,
        created_at: data.created_at,
        updated_at: data.updated_at
      };

      setSavedJobs(prev => 
        prev.map(job => job.id === id ? mappedJob : job)
      );

      toast({
        title: "Success",
        description: "Job status updated successfully",
      });

      return mappedJob;
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
