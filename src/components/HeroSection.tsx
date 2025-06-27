
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dna, Upload, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Badge */}
          <div className="inline-flex items-center space-x-2 glass rounded-full px-6 py-3 mb-8 animate-float">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">AI-Powered Genomic Analysis</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Unlock Your{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse-glow">
              Genetic Code
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover personalized insights about your health, drug responses, and nutrition 
            through advanced AI analysis of your genetic data.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link to="/upload">
              <Button size="lg" className="text-lg px-10 py-6 dna-gradient border-0 text-white hover:scale-105 transition-all duration-300 shadow-2xl">
                <Upload className="mr-3 h-6 w-6" />
                Upload Your DNA Data
              </Button>
            </Link>
            <Link to="/demo">
              <Button variant="outline" size="lg" className="text-lg px-10 py-6 glass hover:scale-105 transition-all duration-300">
                <Search className="mr-3 h-6 w-6" />
                Explore Demo
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="glass rounded-2xl p-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 dna-gradient rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Dna className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">99.9% Accuracy</h3>
              <p className="text-sm text-muted-foreground">
                Clinical-grade analysis powered by the latest genomic research
              </p>
            </div>

            <div className="glass rounded-2xl p-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-white font-bold">🔒</span>
              </div>
              <h3 className="font-semibold mb-2">Private & Secure</h3>
              <p className="text-sm text-muted-foreground">
                Your genetic data is encrypted and never shared with third parties
              </p>
            </div>

            <div className="glass rounded-2xl p-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-white font-bold">⚡</span>
              </div>
              <h3 className="font-semibold mb-2">Instant Results</h3>
              <p className="text-sm text-muted-foreground">
                Get comprehensive reports in minutes, not weeks
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
