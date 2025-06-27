
import React from 'react';
import { Card } from '@/components/ui/card';
import { Dna, Users, Settings, Search } from 'lucide-react';

const FeatureGrid = () => {
  const features = [
    {
      icon: <Dna className="h-8 w-8" />,
      title: "Disease Risk Analysis",
      description: "Get personalized risk assessments for genetic conditions and common diseases",
      gradient: "from-blue-500 to-cyan-500",
      emoji: "🧬"
    },
    {
      icon: <span className="text-2xl">💊</span>,
      title: "Drug Response Prediction",
      description: "Understand how your genetics affect medication effectiveness and dosing",
      gradient: "from-purple-500 to-pink-500",
      emoji: "💊"
    },
    {
      icon: <span className="text-2xl">🥗</span>,
      title: "Personalized Nutrition",
      description: "Receive diet recommendations based on your genetic predispositions",
      gradient: "from-green-500 to-emerald-500",
      emoji: "🥗"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Family Planning",
      description: "Explore genetic traits and carrier status for informed family decisions",
      gradient: "from-orange-500 to-red-500",
      emoji: "👨‍👩‍👧‍👦"
    },
    {
      icon: <span className="text-2xl">🏃‍♂️</span>,
      title: "Fitness & Performance",
      description: "Optimize your exercise routine based on genetic muscle fiber types",
      gradient: "from-indigo-500 to-blue-500",
      emoji: "🏃‍♂️"
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: "Interactive 3D Genome",
      description: "Explore your genetic variants in an immersive 3D chromosome viewer",
      gradient: "from-teal-500 to-green-500",
      emoji: "🔬"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Comprehensive{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Genetic Insights
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI analyzes millions of genetic variants to provide actionable insights 
            across health, nutrition, fitness, and family planning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="glass border-0 p-8 hover:scale-105 transition-all duration-300 group cursor-pointer"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{feature.emoji}</span>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              <div className="mt-6 pt-4 border-t border-gray-200/50">
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  AI-Powered Analysis
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
