
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface GenerateRequest {
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
    sectionType?: string;
  };
  portfolioId?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Get user from JWT
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);
    
    if (authError || !user) {
      throw new Error('Authentication required');
    }

    const { generationType, inputData, portfolioId }: GenerateRequest = await req.json();

    console.log('Generation request:', { generationType, inputData: { ...inputData, resumeText: inputData.resumeText ? '[RESUME_PROVIDED]' : 'none' } });

    // Create AI generation record
    const { data: aiGeneration, error: insertError } = await supabaseClient
      .from('ai_generations')
      .insert({
        user_id: user.id,
        portfolio_id: portfolioId,
        generation_type: generationType,
        input_data: inputData,
        status: 'processing'
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error creating AI generation record:', insertError);
      throw insertError;
    }

    console.log('Created AI generation record:', aiGeneration.id);

    // Generate content using Groq
    const groqApiKey = Deno.env.get('GROQ_API_KEY');
    if (!groqApiKey) {
      throw new Error('Groq API key not configured');
    }

    let generatedContent;

    if (generationType === 'full_portfolio') {
      generatedContent = await generateFullPortfolio(supabaseClient, groqApiKey, inputData);
    } else if (generationType === 'section') {
      generatedContent = await generateSection(supabaseClient, groqApiKey, inputData);
    } else {
      generatedContent = await enhanceContent(groqApiKey, inputData);
    }

    console.log('Generated content keys:', Object.keys(generatedContent || {}));

    // Update AI generation record with results
    const { error: updateError } = await supabaseClient
      .from('ai_generations')
      .update({
        generated_content: generatedContent,
        status: 'completed',
        updated_at: new Date().toISOString()
      })
      .eq('id', aiGeneration.id);

    if (updateError) {
      console.error('Error updating AI generation record:', updateError);
      throw updateError;
    }

    return new Response(
      JSON.stringify({
        success: true,
        generationId: aiGeneration.id,
        content: generatedContent
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in generate-portfolio-ai:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

async function generateFullPortfolio(supabaseClient: any, groqApiKey: string, inputData: any) {
  const { jobTitle, industry, experience, skills, resumeText, tone = 'professional' } = inputData;

  // Get AI prompt template for full portfolio
  const prompt = `Generate a complete portfolio content in JSON format for a ${jobTitle} in ${industry} with ${experience} years of experience.

Skills: ${skills?.join(', ') || 'Not specified'}
Resume content: ${resumeText ? 'Provided - use relevant information' : 'Not provided'}
Tone: ${tone}

Return JSON with this exact structure:
{
  "hero": {
    "title": "Full Name",
    "subtitle": "Professional Title",
    "description": "Compelling 2-3 sentence elevator pitch highlighting expertise and value proposition"
  },
  "about": {
    "content": "Detailed 2-3 paragraph professional summary highlighting expertise, achievements, and career goals. Make it personal yet professional."
  },
  "experience": [
    {
      "id": "1",
      "title": "Job Title",
      "company": "Company Name",
      "duration": "Start Date - End Date",
      "description": "Detailed description of role, responsibilities, and key achievements with specific metrics where possible"
    }
  ],
  "projects": [
    {
      "id": "1",
      "title": "Project Name",
      "description": "Detailed project description highlighting technologies used, challenges solved, and impact",
      "technologies": ["Tech1", "Tech2", "Tech3"],
      "url": "https://example.com"
    }
  ],
  "skills": ["Skill1", "Skill2", "Skill3", "Skill4", "Skill5"],
  "education": [
    {
      "id": "1",
      "degree": "Degree Type and Field",
      "school": "Institution Name",
      "year": "Graduation Year"
    }
  ],
  "contact": {
    "email": "email@example.com",
    "phone": "+1-XXX-XXX-XXXX",
    "location": "City, State",
    "linkedin": "https://linkedin.com/in/username",
    "github": "https://github.com/username"
  }
}

Make the content specific, professional, and achievement-focused. Include realistic but impressive details that align with the provided skills and experience level.`;

  return await callGroqAPI(groqApiKey, prompt);
}

async function generateSection(supabaseClient: any, groqApiKey: string, inputData: any) {
  const { sectionType, jobTitle, industry, skills, experience, tone = 'professional' } = inputData;

  // Get specific prompt for the section type
  const { data: promptData } = await supabaseClient
    .rpc('get_ai_prompt', { 
      p_category: sectionType, 
      p_industry: industry?.toLowerCase() 
    });

  let prompt = '';
  if (promptData && promptData.length > 0) {
    prompt = promptData[0].prompt_template;
    // Replace variables in the template
    prompt = prompt.replace(/{jobTitle}/g, jobTitle || 'Professional');
    prompt = prompt.replace(/{industry}/g, industry || 'Technology');
    prompt = prompt.replace(/{experience}/g, experience || '3');
    prompt = prompt.replace(/{skills}/g, skills?.join(', ') || 'Various skills');
  } else {
    // Fallback prompt
    prompt = `Generate professional ${sectionType} content for a ${jobTitle} in ${industry}. Make it ${tone} and engaging.`;
  }

  prompt += `\n\nReturn the result as JSON in the format appropriate for the ${sectionType} section.`;

  return await callGroqAPI(groqApiKey, prompt);
}

async function enhanceContent(groqApiKey: string, inputData: any) {
  const { existingContent, tone = 'professional' } = inputData;

  const prompt = `Enhance and improve the following content to make it more engaging, professional, and impactful. Maintain the same structure but improve clarity, impact, and ${tone} tone:

${JSON.stringify(existingContent)}

Return the enhanced content in the same JSON format.`;

  return await callGroqAPI(groqApiKey, prompt);
}

async function callGroqAPI(apiKey: string, prompt: string) {
  const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.1-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are an expert portfolio and resume writer. Generate professional, engaging content that highlights achievements and skills. Always respond with valid JSON format. Be specific and use realistic details.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 4000,
    }),
  });

  if (!groqResponse.ok) {
    const errorText = await groqResponse.text();
    console.error('Groq API error:', groqResponse.status, errorText);
    throw new Error(`Groq API error: ${groqResponse.statusText}`);
  }

  const groqData = await groqResponse.json();
  console.log('Groq response received, parsing...');
  
  try {
    return JSON.parse(groqData.choices[0].message.content);
  } catch (parseError) {
    console.error('Failed to parse Groq response:', groqData.choices[0].message.content);
    throw new Error('Failed to parse AI response as JSON');
  }
}
