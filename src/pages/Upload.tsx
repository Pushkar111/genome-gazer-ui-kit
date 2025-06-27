
import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, X, Search, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';

const UploadPage = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();

  const analysisSteps = [
    'Uploading genetic data...',
    'Validating file format...',
    'Processing SNP variants...',
    'Running ML algorithms...',
    'Calculating disease risks...',
    'Analyzing drug responses...',
    'Generating personalized report...',
    'Analysis complete!'
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const file = files[0];
    
    if (file && (file.name.endsWith('.txt') || file.name.endsWith('.vcf') || file.name.endsWith('.csv'))) {
      setUploadedFile(file);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) return;
    
    setIsUploading(true);
    setAnalysisStep(0);

    // Simulate analysis process
    for (let i = 0; i < analysisSteps.length; i++) {
      setAnalysisStep(i);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Redirect to results page
    const redirectPath = user?.role === 'patient' ? '/user/results' : '/results';
    navigate(redirectPath);
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  const content = (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Upload Genetic Data</h1>
          <p className="text-muted-foreground">
            Upload your 23andMe, AncestryDNA, or VCF file for personalized genomic analysis
          </p>
        </div>
        {user?.role === 'patient' && (
          <Link to="/user/dashboard">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        )}
      </div>

      {/* Analysis Progress */}
      {isUploading && (
        <Card className="glass p-8">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <Search className="h-10 w-10 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Analyzing Your DNA</h3>
              <p className="text-muted-foreground mb-4">{analysisSteps[analysisStep]}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${((analysisStep + 1) / analysisSteps.length) * 100}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Step {analysisStep + 1} of {analysisSteps.length}
              </p>
            </div>
          </div>
        </Card>
      )}

      {!isUploading && (
        <>
          {/* Supported Formats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass p-6 text-center hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">23</span>
              </div>
              <h3 className="font-semibold mb-2">23andMe</h3>
              <p className="text-sm text-muted-foreground">.txt raw data file</p>
            </Card>

            <Card className="glass p-6 text-center hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">A</span>
              </div>
              <h3 className="font-semibold mb-2">AncestryDNA</h3>
              <p className="text-sm text-muted-foreground">.txt raw data file</p>
            </Card>

            <Card className="glass p-6 text-center hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">VCF</span>
              </div>
              <h3 className="font-semibold mb-2">VCF Format</h3>
              <p className="text-sm text-muted-foreground">.vcf clinical data</p>
            </Card>
          </div>

          {/* Upload Area */}
          <Card className="glass p-8">
            <div
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                isDragOver 
                  ? 'border-blue-500 bg-blue-50/50 scale-105' 
                  : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/30'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {uploadedFile ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                    <Upload className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-green-600 mb-2">File Ready!</h3>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="font-medium">{uploadedFile.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={removeFile}
                        className="h-6 w-6 p-0 hover:bg-red-100"
                      >
                        <X className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Size: {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 dna-gradient rounded-full flex items-center justify-center mx-auto animate-pulse-glow">
                    <Upload className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Drop your genetic data file here</h3>
                    <p className="text-muted-foreground mb-4">
                      or click to browse files
                    </p>
                    <input
                      type="file"
                      accept=".txt,.vcf,.csv"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button className="dna-gradient border-0 text-white cursor-pointer">
                        Choose File
                      </Button>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {uploadedFile && (
              <div className="flex justify-center mt-6">
                <Button
                  size="lg"
                  onClick={handleAnalyze}
                  className="px-12 py-6 text-lg dna-gradient border-0 text-white hover:scale-105 transition-transform"
                >
                  <Search className="mr-3 h-5 w-5" />
                  Start Analysis
                </Button>
              </div>
            )}
          </Card>

          {/* Security Notice */}
          <Card className="glass p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 text-xl">🔒</span>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Your Privacy is Protected</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Your genetic data is encrypted end-to-end</li>
                  <li>• We never share your data with third parties</li>
                  <li>• You can delete your data at any time</li>
                  <li>• Processing happens on secure, HIPAA-compliant servers</li>
                </ul>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );

  // If user is authenticated, show content within dashboard layout for patients
  if (user?.role === 'patient') {
    return <DashboardLayout>{content}</DashboardLayout>;
  }

  // For non-patient users or public access, show standalone layout
  return (
    <div className="min-h-screen pt-8 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {content}
      </div>
    </div>
  );
};

export default UploadPage;
