
import React from 'react';
import { Brain, Target, Users, Award, Zap, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Content Generation",
      description: "Our advanced AI analyzes your background and creates compelling portfolio content that showcases your unique strengths.",
      gradient: "from-purple-500 to-blue-500"
    },
    {
      icon: Target,
      title: "ATS-Optimized Resumes",
      description: "Beat applicant tracking systems with resumes optimized for specific job descriptions and industry standards.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Mock Interview Training",
      description: "Practice with AI-powered interview simulations that adapt to your field and provide detailed feedback.",
      gradient: "from-cyan-500 to-green-500"
    },
    {
      icon: Award,
      title: "Industry-Specific Templates",
      description: "Choose from professionally designed templates tailored to your industry and career level.",
      gradient: "from-green-500 to-yellow-500"
    },
    {
      icon: Zap,
      title: "Real-time Job Matching",
      description: "Get matched with relevant job opportunities based on your skills, experience, and career goals.",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: Shield,
      title: "Career Success Analytics",
      description: "Track your application success rate and get insights to improve your career advancement strategy.",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="features" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Supercharge Your Career with{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Cutting-Edge AI
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our comprehensive suite of AI-powered tools transforms how you present yourself to employers
            and accelerates your career growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
