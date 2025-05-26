
import React, { useState } from 'react';
import { ArrowLeft, Upload, Zap, Download, Target, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import DashboardSidebar from './DashboardSidebar';

const ResumeOptimizer = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('resume');
  const [jobDescription, setJobDescription] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState(null);
  const [uploadedResume, setUploadedResume] = useState(false);

  const handleOptimize = async () => {
    if (!jobDescription.trim() || !uploadedResume) return;
    
    setIsOptimizing(true);
    // Simulate optimization process
    setTimeout(() => {
      setOptimizationResult({
        score: 89,
        improvements: [
          'Added 5 industry-specific keywords',
          'Improved experience formatting',
          'Enhanced skills section relevance',
          'Optimized for ATS parsing'
        ],
        missingKeywords: ['React', 'TypeScript', 'Node.js', 'AWS'],
        suggestions: [
          'Include more quantifiable achievements',
          'Add relevant certifications section',
          'Optimize bullet points with action verbs'
        ]
      });
      setIsOptimizing(false);
    }, 4000);
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
                  <div 
                    className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-purple-500/50 hover:bg-white/5 transition-all duration-300 cursor-pointer"
                    onClick={() => setUploadedResume(true)}
                  >
                    {uploadedResume ? (
                      <div className="text-green-400">
                        <Upload className="h-12 w-12 mx-auto mb-4" />
                        <p className="font-semibold">Resume Uploaded Successfully</p>
                        <p className="text-sm text-gray-300 mt-2">resume.pdf • 245 KB</p>
                      </div>
                    ) : (
                      <div>
                        <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <p className="font-semibold mb-2">Upload your resume</p>
                        <p className="text-sm text-gray-300">Support for PDF, DOC, DOCX files</p>
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
                    placeholder="Paste the job description here to optimize your resume for this specific role..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows={8}
                    className="bg-white/10 border-white/20"
                  />
                  <Button 
                    onClick={handleOptimize}
                    disabled={isOptimizing || !jobDescription.trim() || !uploadedResume}
                    className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    {isOptimizing ? 'Optimizing...' : 'Optimize Resume'}
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
                        <p className="text-gray-300">Excellent ATS compatibility</p>
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
                        {optimizationResult.improvements.map((improvement, index) => (
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
                        {optimizationResult.missingKeywords.map((keyword, index) => (
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

                  {/* Download Options */}
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Download Optimized Resume</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full bg-white/10 hover:bg-white/20 border border-white/20">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button className="w-full bg-white/10 hover:bg-white/20 border border-white/20">
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
