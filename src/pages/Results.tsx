
import React from 'react';
import Navigation from '@/components/Navigation';
import ResultsCard from '@/components/ResultsCard';
import RiskGauge from '@/components/RiskGauge';
import DNAViewer3D from '@/components/DNAViewer3D';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dna, FileUpload } from 'lucide-react';

const Results = () => {
  const riskData = [
    { 
      condition: "Type 2 Diabetes", 
      risk: 75, 
      population: 45, 
      confidence: 92,
      description: "Based on genetic variants in TCF7L2, PPARG, and other diabetes-associated genes.",
      recommendations: ["Monitor blood sugar regularly", "Maintain healthy weight", "Regular exercise routine"]
    },
    { 
      condition: "Heart Disease", 
      risk: 30, 
      population: 40, 
      confidence: 88,
      description: "Your genetic profile shows lower risk for coronary artery disease.",
      recommendations: ["Continue heart-healthy diet", "Regular cardio exercise", "Monitor cholesterol"]
    },
    { 
      condition: "Alzheimer's Disease", 
      risk: 25, 
      population: 35, 
      confidence: 85,
      description: "APOE genotype indicates lower than average risk.",
      recommendations: ["Mental stimulation activities", "Mediterranean diet", "Regular social interaction"]
    }
  ];

  const drugResponses = [
    {
      drug: "Warfarin",
      dosage: "Low",
      confidence: 95,
      description: "CYP2C9 and VKORC1 variants suggest you may need lower doses."
    },
    {
      drug: "Clopidogrel",
      dosage: "Standard",
      confidence: 90,
      description: "Normal CYP2C19 metabolism for this blood thinner."
    }
  ];

  const nutritionTraits = [
    {
      trait: "Lactose Tolerance",
      status: "Tolerant",
      confidence: 99,
      description: "You can digest dairy products normally."
    },
    {
      trait: "Caffeine Metabolism",
      status: "Slow",
      confidence: 94,
      description: "You may be more sensitive to caffeine effects."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Genetic Report
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive analysis of your genetic variants and personalized health insights.
            </p>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="glass p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">847,293</div>
              <div className="text-sm text-muted-foreground">SNPs Analyzed</div>
            </Card>
            <Card className="glass p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">156</div>
              <div className="text-sm text-muted-foreground">Health Conditions</div>
            </Card>
            <Card className="glass p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">23</div>
              <div className="text-sm text-muted-foreground">Drug Responses</div>
            </Card>
            <Card className="glass p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">45</div>
              <div className="text-sm text-muted-foreground">Nutrition Traits</div>
            </Card>
          </div>

          {/* 3D DNA Viewer */}
          <Card className="glass p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Dna className="mr-3 h-6 w-6 text-blue-600" />
              Interactive Genome Viewer
            </h2>
            <DNAViewer3D />
            <p className="text-muted-foreground mt-4 text-center">
              Click and drag to rotate • Scroll to zoom • Explore your genetic variants in 3D
            </p>
          </Card>

          {/* Disease Risk Analysis */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Disease Risk Analysis
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {riskData.map((risk, index) => (
                <ResultsCard
                  key={index}
                  title={risk.condition}
                  risk={risk.risk}
                  populationRisk={risk.population}
                  confidence={risk.confidence}
                  description={risk.description}
                  recommendations={risk.recommendations}
                />
              ))}
            </div>
          </div>

          {/* Drug Response */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Pharmacogenomics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {drugResponses.map((drug, index) => (
                <Card key={index} className="glass p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">{drug.drug}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      drug.dosage === 'Low' ? 'bg-orange-100 text-orange-800' :
                      drug.dosage === 'High' ? 'bg-red-100 text-red-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {drug.dosage} Dosage
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">{drug.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Confidence:</span>
                    <span className="font-medium">{drug.confidence}%</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Nutrition Traits */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Nutrition & Metabolism
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nutritionTraits.map((trait, index) => (
                <Card key={index} className="glass p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">{trait.trait}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      trait.status === 'Tolerant' || trait.status === 'Fast' ? 'bg-green-100 text-green-800' :
                      trait.status === 'Slow' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {trait.status}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">{trait.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Confidence:</span>
                    <span className="font-medium">{trait.confidence}%</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <Card className="glass p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Want More Detailed Analysis?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Upgrade to our premium plan for detailed lifestyle recommendations, 
              family planning insights, and continuous genetic research updates.
            </p>
            <Button className="dna-gradient border-0 text-white hover:scale-105 transition-transform">
              Upgrade to Premium
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Results;
