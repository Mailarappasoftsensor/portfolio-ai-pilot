
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AnalyticsEvent {
  id: string;
  portfolio_id: string;
  event_type: string;
  visitor_ip: string | null;
  user_agent: string | null;
  referrer: string | null;
  metadata: any;
  created_at: string;
}

export const usePortfolioAnalytics = (portfolioId?: string) => {
  const [analytics, setAnalytics] = useState<AnalyticsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAnalytics = async () => {
    if (!portfolioId) return;

    try {
      const { data, error } = await supabase
        .from('portfolio_analytics')
        .select('*')
        .eq('portfolio_id', portfolioId)
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      setAnalytics(data || []);
    } catch (error: any) {
      console.error('Error fetching analytics:', error);
      toast({
        title: "Error",
        description: "Failed to fetch portfolio analytics",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const trackEvent = async (eventType: string, metadata?: any) => {
    if (!portfolioId) return;

    try {
      const { error } = await supabase.functions.invoke('track-portfolio-analytics', {
        body: {
          portfolioId,
          eventType,
          metadata: metadata || {}
        }
      });

      if (error) throw error;

      // Refresh analytics after tracking
      setTimeout(fetchAnalytics, 1000);
    } catch (error: any) {
      console.error('Error tracking event:', error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [portfolioId]);

  const getEventCounts = () => {
    const counts = analytics.reduce((acc, event) => {
      acc[event.event_type] = (acc[event.event_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      views: counts.view || 0,
      contactClicks: counts.contact_click || 0,
      projectClicks: counts.project_click || 0,
      downloads: counts.download || 0,
      shares: counts.share || 0,
      total: analytics.length
    };
  };

  return {
    analytics,
    loading,
    trackEvent,
    getEventCounts,
    refetch: fetchAnalytics,
  };
};
