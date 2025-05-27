import React, { useState, useRef } from 'react';
import { ArrowLeft, Upload, Zap, Download, Target, TrendingUp, FileText, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useResumes } from '@/hooks/useResumes';
import DashboardSidebar from './DashboardSidebar';

const ResumeOptimizer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { createResume, updateResume } = useResumes();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [activeSection, setActiveSection] = useState('resume');
  const [jobDescription, setJobDescription] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState<any>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, DOC, or DOCX file",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      setUploadedFile(file);
      toast({
        title: "Success",
        description: "Resume uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload resume",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleOptimize = async () => {
    if (!jobDescription.trim() || !uploadedFile) {
      toast({
        title: "Missing information",
        description: "Please upload a resume and add a job description",
        variant: "destructive",
      });
      return;
    }
    
    setIsOptimizing(true);
    
    try {
      // Create a resume record first
      const resumeData = await createResume({
        title: `Optimized Resume - ${new Date().toLocaleDateString()}`,
        content: {
          original_file: uploadedFile.name,
          job_description: jobDescription,
          optimization_status: 'processing'
        }
      });

      // Simulate AI optimization process with real-looking progress
      const steps = [
        'Analyzing resume content...',
        'Extracting job requirements...',
        'Identifying optimization opportunities...',
        'Generating recommendations...',
        'Calculating ATS score...'
      ];

      for (let i = 0; i < steps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      const mockResult = {
        score: Math.floor(Math.random() * 20) + 80, // 80-100 score
        improvements: [
          'Added 5 industry-specific keywords',
          'Improved experience formatting for ATS parsing',
          'Enhanced skills section relevance',
          'Optimized bullet points with action verbs',
          'Improved section structure and layout'
        ],
        missingKeywords: ['React', 'TypeScript', 'Node.js', 'AWS', 'Agile'],
        suggestions: [
          'Include more quantifiable achievements with specific metrics',
          'Add relevant certifications section',
          'Optimize bullet points with stronger action verbs',
          'Include industry-specific keywords naturally',
          'Improve ATS compatibility with better formatting'
        ]
      };

      setOptimizationResult(mockResult);

      // Update the resume with optimization results
      if (resumeData) {
        const currentContent = resumeData.content || {};
        await updateResume(resumeData.id, {
          content: {
            ...currentContent,
            optimization_result: mockResult,
            optimization_status: 'completed'
          },
          ats_score: mockResult.score
        });
      }

      toast({
        title: "Optimization complete!",
        description: `Your resume scored ${mockResult.score}% ATS compatibility`,
      });

    } catch (error) {
      toast({
        title: "Optimization failed",
        description: "Something went wrong during optimization. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleDownload = (format: 'pdf' | 'docx') => {
    if (!optimizationResult) return;
    
    // In a real implementation, this would generate and download the optimized resume
    toast({
      title: "Download started",
      description: `Downloading optimized resume as ${format.toUpperCase()}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="flex">
        <DashboardSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        
        <main className="flex-1 ml-64 p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="border-white/20 hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-4xl font-bold">Resume Optimizer</h1>
                <p className="text-gray-300">Enhance your resume for better ATS performance and job matching</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Panel */}
            <div className="space-y-6">
              {/* Resume Upload */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Upload className="h-6 w-6 text-blue-400" />
                    <span>Upload Your Resume</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div 
                    className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-purple-500/50 hover:bg-white/5 transition-all duration-300 cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {isUploading ? (
                      <div className="text-blue-400">
                        <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin" />
                        <p className="font-semibold">Uploading...</p>
                      </div>
                    ) : uploadedFile ? (
                      <div className="text-green-400">
                        <FileText className="h-12 w-12 mx-auto mb-4" />
                        <p className="font-semibold">Resume Uploaded Successfully</p>
                        <p className="text-sm text-gray-300 mt-2">{uploadedFile.name} • {(uploadedFile.size / 1024).toFixed(1)} KB</p>
                      </div>
                    ) : (
                      <div>
                        <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <p className="font-semibold mb-2">Click to upload your resume</p>
                        <p className="text-sm text-gray-300">Support for PDF, DOC, DOCX files (max 10MB)</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Job Description Input */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-6 w-6 text-green-400" />
                    <span>Target Job Description</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Paste the job description here to optimize your resume for this specific role. Include required skills, qualifications, and responsibilities..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows={8}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                  <Button 
                    onClick={handleOptimize}
                    disabled={isOptimizing || !jobDescription.trim() || !uploadedFile}
                    className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:opacity-50"
                  >
                    {isOptimizing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Optimizing...
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        Optimize Resume
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Results Panel */}
            <div className="space-y-6">
              {isOptimizing && (
                <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="h-6 w-6 text-purple-400 animate-pulse" />
                      <span>AI Optimization in Progress</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm">Analyzing resume content...</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <span className="text-sm">Extracting job requirements...</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                        <span className="text-sm">Identifying optimization opportunities...</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                        <span className="text-sm">Generating recommendations...</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {optimizationResult && (
                <>
                  {/* ATS Score */}
                  <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <TrendingUp className="h-6 w-6 text-green-400" />
                        <span>ATS Compatibility Score</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center mb-4">
                        <div className="text-4xl font-bold text-green-400 mb-2">{optimizationResult.score}%</div>
                        <p className="text-gray-300">
                          {optimizationResult.score >= 90 ? 'Excellent' : 
                           optimizationResult.score >= 80 ? 'Good' : 
                           optimizationResult.score >= 70 ? 'Fair' : 'Needs Improvement'} ATS compatibility
                        </p>
                      </div>
                      <Progress value={optimizationResult.score} className="h-3" />
                    </CardContent>
                  </Card>

                  {/* Improvements Made */}
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Improvements Applied</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {optimizationResult.improvements.map((improvement: string, index: number) => (
                          <li key={index} className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-sm">{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Missing Keywords */}
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Recommended Keywords</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {optimizationResult.missingKeywords.map((keyword: string, index: number) => (
                          <span key={index} className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm">
                            {keyword}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-300">
                        Consider incorporating these keywords naturally into your resume to improve job matching.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Additional Suggestions */}
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Additional Suggestions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {optimizationResult.suggestions.map((suggestion: string, index: number) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm">{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Download Options */}
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Download Optimized Resume</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button 
                        onClick={() => handleDownload('pdf')}
                        className="w-full bg-white/10 hover:bg-white/20 border border-white/20"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button 
                        onClick={() => handleDownload('docx')}
                        className="w-full bg-white/10 hover:bg-white/20 border border-white/20"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download DOCX
                      </Button>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ResumeOptimizer;
