
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Upload, Search, Activity, Dna, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import Enhanced3DDNA from './Enhanced3DDNA';

const EnhancedHero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const stats = [
    { icon: Activity, label: "99.9% Accuracy", value: "Clinical Grade", color: "text-emerald-600" },
    { icon: Shield, label: "HIPAA Compliant", value: "Secure & Private", color: "text-blue-600" },
    { icon: Zap, label: "Instant Analysis", value: "Results in Minutes", color: "text-purple-600" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-20">
        <Enhanced3DDNA height="100vh" animated={true} showControls={false} />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-indigo-50/80 to-purple-50/90 backdrop-blur-sm"></div>
      
      <div className="relative z-10 container-medical section-medical">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-6xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 glass-medical rounded-full px-8 py-4 mb-8 animate-float">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-slate-700">AI-Powered Genomic Analysis Platform</span>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            Decode Your{' '}
            <span className="text-medical-gradient animate-pulse-glow">
              Genetic Future
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Unlock personalized insights about your health, drug responses, and genetic predispositions 
            through cutting-edge AI analysis powered by clinical-grade genomic research.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Link to="/upload">
              <Button size="lg" className="text-lg px-12 py-6 medical-gradient border-0 text-white hover:scale-105 transition-all duration-300 shadow-2xl shadow-blue-500/25">
                <Upload className="mr-3 h-6 w-6" />
                Upload Genetic Data
              </Button>
            </Link>
            <Link to="/demo">
              <Button variant="outline" size="lg" className="text-lg px-12 py-6 glass-medical border-blue-200 hover:scale-105 transition-all duration-300">
                <Search className="mr-3 h-6 w-6" />
                Explore Demo Analysis
              </Button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="hospital-card p-8 card-hover"
                >
                  <div className={`w-16 h-16 medical-gradient rounded-2xl flex items-center justify-center mb-6 mx-auto animate-pulse-glow`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-800">{stat.label}</h3>
                  <p className={`text-sm font-medium ${stat.color} mb-2`}>{stat.value}</p>
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Floating DNA Helix */}
          <motion.div
            variants={itemVariants}
            className="mt-20 max-w-2xl mx-auto"
          >
            <div className="hospital-card p-8">
              <h3 className="text-2xl font-bold mb-6 text-slate-800 flex items-center justify-center gap-3">
                <Dna className="h-8 w-8 text-blue-600" />
                Interactive Genome Visualization
              </h3>
              <Enhanced3DDNA height="300px" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm text-slate-500 font-medium">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default EnhancedHero;
