
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileUpload, X } from 'lucide-react';
import Navigation from '@/components/Navigation';

const Upload = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

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
    // Simulate upload and analysis
    setTimeout(() => {
      setIsUploading(false);
      // Redirect to results page
      window.location.href = '/results';
    }, 3000);
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Upload Your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Genetic Data
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Upload your 23andMe, AncestryDNA, or VCF file to get started with personalized genomic analysis.
            </p>
          </div>

          {/* Supported Formats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
          <Card className="glass p-8 mb-8">
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
                    <FileUpload className="h-8 w-8 text-white" />
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
                    <FileUpload className="h-8 w-8 text-white" />
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
                  disabled={isUploading}
                  className="px-12 py-6 text-lg dna-gradient border-0 text-white hover:scale-105 transition-transform"
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Analyzing Your DNA...
                    </>
                  ) : (
                    <>
                      <Search className="mr-3 h-5 w-5" />
                      Start Analysis
                    </>
                  )}
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
        </div>
      </div>
    </div>
  );
};

export default Upload;
