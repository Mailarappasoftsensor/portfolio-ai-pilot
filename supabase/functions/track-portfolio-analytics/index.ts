
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AnalyticsEvent {
  portfolioId: string;
  eventType: 'view' | 'contact_click' | 'project_click' | 'download' | 'share';
  metadata?: any;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { portfolioId, eventType, metadata = {} }: AnalyticsEvent = await req.json();

    // Get visitor information from headers
    const visitorIp = req.headers.get('x-forwarded-for') || 
                      req.headers.get('x-real-ip') || 
                      req.headers.get('cf-connecting-ip') || 
                      'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';
    const referrer = req.headers.get('referer') || null;

    console.log('Tracking analytics event:', { portfolioId, eventType, visitorIp });

    // Insert analytics event
    const { error } = await supabaseClient
      .from('portfolio_analytics')
      .insert({
        portfolio_id: portfolioId,
        event_type: eventType,
        visitor_ip: visitorIp,
        user_agent: userAgent,
        referrer: referrer,
        metadata: metadata
      });

    if (error) {
      console.error('Error inserting analytics:', error);
      throw error;
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in track-portfolio-analytics:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
