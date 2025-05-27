
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, enhancementType, context } = await req.json();

    const groqApiKey = Deno.env.get('GROQ_API_KEY');
    if (!groqApiKey) {
      throw new Error('Groq API key not configured');
    }

    const prompt = buildEnhancementPrompt(content, enhancementType, context);
    
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are an expert content enhancer. Improve the given content while maintaining its core message and authenticity.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.6,
        max_tokens: 2000,
      }),
    });

    if (!groqResponse.ok) {
      throw new Error(`Groq API error: ${groqResponse.statusText}`);
    }

    const groqData = await groqResponse.json();
    const enhancedContent = groqData.choices[0].message.content;

    return new Response(
      JSON.stringify({
        success: true,
        enhancedContent: enhancedContent.trim()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in enhance-content-ai:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

function buildEnhancementPrompt(content: string, enhancementType: string, context: any): string {
  switch (enhancementType) {
    case 'improve_clarity':
      return `Improve the clarity and readability of this content while maintaining its core message:\n\n"${content}"\n\nMake it more clear, concise, and impactful. Return only the improved version.`;
    
    case 'add_metrics':
      return `Enhance this content by suggesting specific metrics and quantifiable achievements that could be added:\n\n"${content}"\n\nReturn the enhanced version with realistic metrics and numbers that make the content more compelling.`;
    
    case 'professional_tone':
      return `Rewrite this content in a more professional tone while keeping the same information:\n\n"${content}"\n\nReturn only the professionally rewritten version.`;
    
    case 'action_oriented':
      return `Rewrite this content to be more action-oriented and achievement-focused:\n\n"${content}"\n\nUse strong action verbs and focus on accomplishments. Return only the improved version.`;
    
    default:
      return `Improve and enhance this content:\n\n"${content}"\n\nMake it more engaging, professional, and impactful. Return only the enhanced version.`;
  }
}
