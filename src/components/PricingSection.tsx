
import React from 'react';
import { Check, Sparkles, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const PricingSection = () => {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "forever",
      description: "Perfect for getting started with AI-powered career tools",
      features: [
        "1 AI-generated portfolio",
        "Basic resume optimizer",
        "5 cover letters per month",
        "Community support",
        "Basic analytics"
      ],
      buttonText: "Get Started Free",
      popular: false,
      icon: Sparkles
    },
    {
      name: "Professional",
      price: "$19",
      period: "per month",
      description: "Advanced features for serious career advancement",
      features: [
        "Unlimited portfolios",
        "Advanced ATS optimization",
        "Unlimited cover letters",
        "Mock interview sessions",
        "Job matching & alerts",
        "Priority support",
        "Advanced analytics",
        "Custom domains"
      ],
      buttonText: "Start Free Trial",
      popular: true,
      icon: Crown
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "Tailored solutions for teams and organizations",
      features: [
        "Everything in Professional",
        "Team collaboration",
        "Custom integrations",
        "Dedicated support",
        "Training sessions",
        "Analytics dashboard",
        "White-label options"
      ],
      buttonText: "Contact Sales",
      popular: false,
      icon: Crown
    }
  ];

  return (
    <section id="pricing" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Career Growth Plan
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Start free and upgrade as your career accelerates. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${
                plan.popular 
                  ? 'bg-gradient-to-b from-purple-500/20 to-pink-500/20 border-purple-500/50 scale-105' 
                  : 'bg-white/5 border-white/10'
              } backdrop-blur-sm hover:bg-white/10 transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                    : 'bg-gradient-to-r from-gray-600 to-gray-700'
                }`}>
                  <plan.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-300 mb-4">{plan.description}</p>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.period !== "pricing" && (
                    <span className="text-gray-400 ml-2">/{plan.period}</span>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                      : 'bg-white/10 hover:bg-white/20 border border-white/20'
                  }`}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
