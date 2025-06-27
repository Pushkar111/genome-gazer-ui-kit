
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dna, RotateCcw, ZoomIn, ZoomOut, Info } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import DNAViewer3D from '@/components/DNAViewer3D';

const User3DDNA = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Dna className="h-8 w-8 text-blue-600" />
            3D DNA Visualization
          </h1>
          <p className="text-muted-foreground">
            Explore your genetic variants in an interactive 3D environment
          </p>
        </div>

        {/* Controls */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Viewer Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Reset View
                </Button>
                <Button variant="outline" size="sm">
                  <ZoomIn className="h-4 w-4 mr-1" />
                  Zoom In
                </Button>
                <Button variant="outline" size="sm">
                  <ZoomOut className="h-4 w-4 mr-1" />
                  Zoom Out
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>• Click and drag to rotate • Scroll to zoom • Click variants for details</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3D Viewer */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Interactive Genome Viewer</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="h-96 rounded-lg overflow-hidden">
              <DNAViewer3D />
            </div>
          </CardContent>
        </Card>

        {/* Variant Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Highlighted Variants</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-red-600">rs7903146 (TCF7L2)</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Associated with Type 2 Diabetes risk
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Chromosome 10 • Position 114,758,349
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-orange-600">rs429358 (APOE)</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Related to Alzheimer's disease risk
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Chromosome 19 • Position 45,411,941
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-blue-600">rs1799853 (CYP2C9)</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Affects warfarin metabolism
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Chromosome 10 • Position 96,540,410
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Chromosomal Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">23</div>
                  <div className="text-sm text-muted-foreground">Chromosome Pairs</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">3.2B</div>
                  <div className="text-sm text-muted-foreground">Base Pairs</div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <strong>Viewing:</strong> High-impact variants affecting health and drug response
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Color coding:</strong> Red (Disease risk), Orange (Moderate risk), Blue (Drug response)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default User3DDNA;
