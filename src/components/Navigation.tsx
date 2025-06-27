
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dna, Home, FileUpload, Search, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform">
            <div className="w-8 h-8 dna-gradient rounded-lg flex items-center justify-center animate-pulse-glow">
              <Dna className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              GenomeAI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-1 text-foreground/80 hover:text-foreground transition-colors">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link to="/upload" className="flex items-center space-x-1 text-foreground/80 hover:text-foreground transition-colors">
              <FileUpload className="h-4 w-4" />
              <span>Upload</span>
            </Link>
            <Link to="/results" className="flex items-center space-x-1 text-foreground/80 hover:text-foreground transition-colors">
              <Search className="h-4 w-4" />
              <span>Results</span>
            </Link>
            <Link to="/settings" className="flex items-center space-x-1 text-foreground/80 hover:text-foreground transition-colors">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/upload">
              <Button className="dna-gradient border-0 text-white hover:scale-105 transition-transform">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg glass"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <div className={`h-0.5 bg-foreground transition-all ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
              <div className={`h-0.5 bg-foreground transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
              <div className={`h-0.5 bg-foreground transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="flex items-center space-x-2 py-2 text-foreground/80 hover:text-foreground">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link to="/upload" className="flex items-center space-x-2 py-2 text-foreground/80 hover:text-foreground">
                <FileUpload className="h-4 w-4" />
                <span>Upload DNA</span>
              </Link>
              <Link to="/results" className="flex items-center space-x-2 py-2 text-foreground/80 hover:text-foreground">
                <Search className="h-4 w-4" />
                <span>View Results</span>
              </Link>
              <Link to="/settings" className="flex items-center space-x-2 py-2 text-foreground/80 hover:text-foreground">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
