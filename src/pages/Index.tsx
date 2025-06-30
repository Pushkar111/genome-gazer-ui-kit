
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dna, Upload, Search, Users, Shield, Zap, Brain, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import EnhancedHero from '@/components/EnhancedHero';
import Enhanced3DDNA from '@/components/Enhanced3DDNA';

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze your genetic variants to predict health risks and drug responses with clinical accuracy.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Heart,
      title: "Health Risk Assessment",
      description: "Get personalized insights about your predisposition to conditions like diabetes, heart disease, and Alzheimer's.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Dna,
      title: "3D Genome Visualization",
      description: "Explore your genetic variants in an interactive 3D environment with real-time data visualization.",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Your genetic data is protected with enterprise-grade security and never shared without your consent.",
      color: "from-emerald-500 to-teal-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <EnhancedHero />
      
      {/* Features Section */}
      <section className="section-medical bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20">
        <div className="container-medical">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-5xl font-bold mb-6 text-medical-gradient">
              Revolutionary Genomic Analysis
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-slate-600 max-w-3xl mx-auto">
              Harness the power of artificial intelligence to unlock the secrets hidden in your DNA
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid-medical"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="hospital-card spacing-medical card-hover h-full">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 animate-pulse-glow`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-slate-800">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="section-medical bg-gradient-to-br from-slate-50 to-blue-50/50">
        <div className="container-medical">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6 text-medical-gradient">
              See Your DNA Come to Life
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Experience our interactive 3D DNA visualization that brings your genetic data to life
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto"
          >
            <Card className="hospital-card p-8">
              <Enhanced3DDNA height="500px" />
            </Card>
          </motion.div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="section-medical bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container-medical text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="glass-medical-dark rounded-3xl spacing-medical max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Unlock Your Genetic Code?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Join thousands of users who've discovered personalized insights about their health, 
                nutrition, and lifestyle through advanced genomic analysis.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/upload">
                  <Button size="lg" className="text-lg px-12 py-6 bg-white text-blue-600 hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-2xl">
                    <Upload className="mr-3 h-6 w-6" />
                    Upload Your DNA
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" size="lg" className="text-lg px-12 py-6 border-white/30 text-white hover:bg-white/10 hover:scale-105 transition-all duration-300">
                    <Users className="mr-3 h-6 w-6" />
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
