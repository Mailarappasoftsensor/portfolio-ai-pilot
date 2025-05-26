
import React, { useState } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw, Brain, Award, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import DashboardSidebar from './DashboardSidebar';

const InterviewPrep = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('interview');
  const [interviewConfig, setInterviewConfig] = useState({
    role: '',
    type: '',
    difficulty: ''
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [userResponse, setUserResponse] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [sessionComplete, setSessionComplete] = useState(false);

  const questions = [
    "Tell me about yourself and your background in software development.",
    "Describe a challenging project you've worked on and how you overcame obstacles.",
    "How do you stay updated with the latest technology trends?",
    "Explain a time when you had to work with a difficult team member.",
    "What interests you most about this role and our company?"
  ];

  const startInterview = () => {
    if (interviewConfig.role && interviewConfig.type && interviewConfig.difficulty) {
      setIsInterviewActive(true);
      setCurrentQuestion(0);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setUserResponse('');
    } else {
      completeInterview();
    }
  };

  const completeInterview = () => {
    setIsInterviewActive(false);
    setSessionComplete(true);
    setFeedback({
      overallScore: 85,
      contentScore: 88,
      deliveryScore: 82,
      confidenceScore: 87,
      strengths: [
        'Clear and structured responses',
        'Good use of specific examples',
        'Professional communication style'
      ],
      improvements: [
        'Include more quantifiable achievements',
        'Reduce filler words',
        'Maintain better eye contact'
      ]
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
                <h1 className="text-4xl font-bold">Interview Preparation</h1>
                <p className="text-gray-300">Practice with AI-powered mock interviews and get detailed feedback</p>
              </div>
            </div>
          </div>

          {!isInterviewActive && !sessionComplete && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Setup Panel */}
              <div className="space-y-6">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="h-6 w-6 text-purple-400" />
                      <span>Interview Setup</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Target Role</label>
                      <Select onValueChange={(value) => setInterviewConfig(prev => ({ ...prev, role: value }))}>
                        <SelectTrigger className="bg-white/10 border-white/20">
                          <SelectValue placeholder="Select your target role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="frontend">Frontend Developer</SelectItem>
                          <SelectItem value="backend">Backend Developer</SelectItem>
                          <SelectItem value="fullstack">Full-Stack Developer</SelectItem>
                          <SelectItem value="devops">DevOps Engineer</SelectItem>
                          <SelectItem value="product">Product Manager</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Interview Type</label>
                      <Select onValueChange={(value) => setInterviewConfig(prev => ({ ...prev, type: value }))}>
                        <SelectTrigger className="bg-white/10 border-white/20">
                          <SelectValue placeholder="Select interview type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="behavioral">Behavioral</SelectItem>
                          <SelectItem value="technical">Technical</SelectItem>
                          <SelectItem value="mixed">Mixed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Difficulty Level</label>
                      <Select onValueChange={(value) => setInterviewConfig(prev => ({ ...prev, difficulty: value }))}>
                        <SelectTrigger className="bg-white/10 border-white/20">
                          <SelectValue placeholder="Select difficulty level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="junior">Junior Level</SelectItem>
                          <SelectItem value="mid">Mid Level</SelectItem>
                          <SelectItem value="senior">Senior Level</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      onClick={startInterview}
                      disabled={!interviewConfig.role || !interviewConfig.type || !interviewConfig.difficulty}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Mock Interview
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Tips Panel */}
              <div className="space-y-6">
                <Card className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Interview Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                        <span>Use the STAR method (Situation, Task, Action, Result) for behavioral questions</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                        <span>Be specific with examples and include quantifiable results</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                        <span>Speak clearly and maintain a confident tone</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                        <span>Ask clarifying questions when needed</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Recent Sessions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <p className="font-medium">Frontend Developer - Behavioral</p>
                          <p className="text-sm text-gray-400">Score: 87% • 2 days ago</p>
                        </div>
                        <Button variant="outline" size="sm" className="border-white/20">
                          Review
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <p className="font-medium">Full-Stack Developer - Mixed</p>
                          <p className="text-sm text-gray-400">Score: 82% • 1 week ago</p>
                        </div>
                        <Button variant="outline" size="sm" className="border-white/20">
                          Review
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {isInterviewActive && (
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 backdrop-blur-sm mb-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="h-6 w-6 text-purple-400" />
                      <span>Question {currentQuestion + 1} of {questions.length}</span>
                    </CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsInterviewActive(false)}
                      className="border-red-500/50 text-red-400 hover:bg-red-500/20"
                    >
                      End Session
                    </Button>
                  </div>
                  <Progress value={(currentQuestion + 1) / questions.length * 100} className="mt-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-semibold mb-4">{questions[currentQuestion]}</h3>
                    <p className="text-gray-300">Take your time to think, then provide a detailed response</p>
                  </div>

                  <Textarea
                    placeholder="Type your response here..."
                    value={userResponse}
                    onChange={(e) => setUserResponse(e.target.value)}
                    rows={6}
                    className="bg-white/10 border-white/20 mb-6"
                  />

                  <div className="flex justify-center space-x-4">
                    <Button 
                      variant="outline" 
                      className="border-white/20 hover:bg-white/10"
                    >
                      <Pause className="h-4 w-4 mr-2" />
                      Pause
                    </Button>
                    <Button 
                      onClick={nextQuestion}
                      disabled={!userResponse.trim()}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      {currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete Interview'}
                      <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {sessionComplete && feedback && (
            <div className="max-w-4xl mx-auto space-y-6">
              <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-6 w-6 text-green-400" />
                    <span>Interview Complete!</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-6xl font-bold text-green-400 mb-2">{feedback.overallScore}%</div>
                    <p className="text-xl">Overall Performance Score</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-400 mb-1">{feedback.contentScore}%</div>
                      <p className="text-sm text-gray-300">Content Quality</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-400 mb-1">{feedback.deliveryScore}%</div>
                      <p className="text-sm text-gray-300">Delivery</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-pink-400 mb-1">{feedback.confidenceScore}%</div>
                      <p className="text-sm text-gray-300">Confidence</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-green-400">Strengths</h4>
                      <ul className="space-y-2">
                        {feedback.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                            <span className="text-sm">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-orange-400">Areas for Improvement</h4>
                      <ul className="space-y-2">
                        {feedback.improvements.map((improvement, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                            <span className="text-sm">{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex justify-center space-x-4 mt-8">
                    <Button 
                      onClick={() => {
                        setSessionComplete(false);
                        setFeedback(null);
                        setCurrentQuestion(0);
                        setUserResponse('');
                      }}
                      variant="outline" 
                      className="border-white/20 hover:bg-white/10"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Practice Again
                    </Button>
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      Share Results
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default InterviewPrep;
