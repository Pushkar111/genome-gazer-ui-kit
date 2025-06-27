
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  TrendingUp,
  Pill,
  Utensils,
  Activity
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import RiskGauge from '@/components/RiskGauge';

const UserResults = () => {
  const [activeTab, setActiveTab] = useState('health-risks');

  // Mock data
  const healthRisks = [
    { condition: 'Type 2 Diabetes', risk: 75, population: 45, status: 'high' },
    { condition: 'Heart Disease', risk: 35, population: 40, status: 'low' },
    { condition: 'Alzheimer\'s', risk: 55, population: 35, status: 'medium' }
  ];

  const drugResponses = [
    { drug: 'Warfarin', response: 'Sensitive - Lower dose needed', type: 'warning' },
    { drug: 'Clopidogrel', response: 'Normal response expected', type: 'normal' },
    { drug: 'Simvastatin', response: 'Higher risk of side effects', type: 'caution' }
  ];

  const nutritionTraits = [
    { trait: 'Lactose Tolerance', result: 'Tolerant', description: 'Can digest dairy normally' },
    { trait: 'Caffeine Metabolism', result: 'Slow', description: 'More sensitive to caffeine' },
    { trait: 'Alcohol Sensitivity', result: 'Normal', description: 'Standard alcohol processing' }
  ];

  const lifestyleRecommendations = [
    { category: 'Exercise', recommendation: 'High-intensity cardio 3x/week', priority: 'high' },
    { category: 'Diet', recommendation: 'Mediterranean diet recommended', priority: 'medium' },
    { category: 'Sleep', recommendation: 'Maintain 7-8 hours nightly', priority: 'high' },
    { category: 'Stress', recommendation: 'Regular meditation practice', priority: 'medium' }
  ];

  const traits = [
    { trait: 'Eye Color Prediction', result: 'Brown (92% confidence)' },
    { trait: 'Hair Type', result: 'Straight' },
    { trait: 'Height Potential', result: 'Above Average' },
    { trait: 'Muscle Fiber Type', result: 'Fast-twitch dominant' }
  ];

  const getRiskBadge = (risk: number) => {
    if (risk < 40) return { color: 'bg-green-100 text-green-800', label: 'Low', icon: CheckCircle };
    if (risk < 70) return { color: 'bg-orange-100 text-orange-800', label: 'Medium', icon: Clock };
    return { color: 'bg-red-100 text-red-800', label: 'High', icon: AlertTriangle };
  };

  const downloadReport = () => {
    // Mock PDF download
    console.log('Downloading comprehensive genetic report...');
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Genetic Report</h1>
            <p className="text-muted-foreground">Comprehensive analysis of your genetic variants</p>
          </div>
          <Button onClick={downloadReport} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download PDF Report
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">847,293</div>
              <div className="text-sm text-muted-foreground">SNPs Analyzed</div>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">156</div>
              <div className="text-sm text-muted-foreground">Health Conditions</div>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">23</div>
              <div className="text-sm text-muted-foreground">Drug Responses</div>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-2">45</div>
              <div className="text-sm text-muted-foreground">Traits Analyzed</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Report Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="health-risks" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Health Risks
            </TabsTrigger>
            <TabsTrigger value="drug-response" className="flex items-center gap-2">
              <Pill className="h-4 w-4" />
              Drug Response
            </TabsTrigger>
            <TabsTrigger value="nutrition" className="flex items-center gap-2">
              <Utensils className="h-4 w-4" />
              Nutrition
            </TabsTrigger>
            <TabsTrigger value="lifestyle" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Lifestyle
            </TabsTrigger>
            <TabsTrigger value="traits" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Traits
            </TabsTrigger>
          </TabsList>

          <TabsContent value="health-risks" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {healthRisks.map((risk, index) => {
                const badge = getRiskBadge(risk.risk);
                const Icon = badge.icon;
                return (
                  <Card key={index} className="glass">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{risk.condition}</span>
                        <Badge className={badge.color}>
                          {badge.label}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <RiskGauge value={risk.risk} populationValue={risk.population} size={120} />
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                          Your risk: {risk.risk}% | Population avg: {risk.population}%
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="drug-response" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {drugResponses.map((drug, index) => (
                <Card key={index} className="glass">
                  <CardHeader>
                    <CardTitle>{drug.drug}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{drug.response}</p>
                    <Badge className={`mt-2 ${
                      drug.type === 'warning' ? 'bg-orange-100 text-orange-800' :
                      drug.type === 'caution' ? 'bg-red-100 text-red-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {drug.type === 'warning' ? 'Dosage Adjustment' :
                       drug.type === 'caution' ? 'Monitor Closely' : 'Normal Response'}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="nutrition" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nutritionTraits.map((nutrition, index) => (
                <Card key={index} className="glass">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{nutrition.trait}</span>
                      <Badge variant="outline">{nutrition.result}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{nutrition.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="lifestyle" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {lifestyleRecommendations.map((lifestyle, index) => (
                <Card key={index} className="glass">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{lifestyle.category}</span>
                      <Badge className={lifestyle.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}>
                        {lifestyle.priority} priority
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{lifestyle.recommendation}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="traits" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {traits.map((trait, index) => (
                <Card key={index} className="glass">
                  <CardHeader>
                    <CardTitle>{trait.trait}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="outline">{trait.result}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default UserResults;
