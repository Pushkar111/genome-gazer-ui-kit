
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  FileText, 
  Dna, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Link } from 'react-router-dom';
import RiskGauge from '@/components/RiskGauge';

const UserDashboard = () => {
  // Mock user data
  const userAnalysis = {
    hasUploadedData: true,
    lastAnalysis: '2024-01-15',
    overallRisk: 65,
    conditions: [
      { name: 'Type 2 Diabetes', risk: 75, status: 'high' },
      { name: 'Heart Disease', risk: 45, status: 'medium' },
      { name: 'Alzheimer\'s', risk: 25, status: 'low' }
    ],
    traits: [
      { name: 'Caffeine Metabolism', result: 'Fast metabolizer' },
      { name: 'Lactose Tolerance', result: 'Tolerant' },
      { name: 'Alcohol Sensitivity', result: 'Normal' }
    ],
    drugResponses: [
      { drug: 'Warfarin', response: 'Sensitive - Lower dose needed' },
      { drug: 'Clopidogrel', response: 'Normal response' },
      { drug: 'Simvastatin', response: 'Higher risk of side effects' }
    ]
  };

  const getRiskBadge = (risk: number) => {
    if (risk < 40) return { color: 'bg-green-100 text-green-800', label: 'Low', icon: CheckCircle };
    if (risk < 70) return { color: 'bg-orange-100 text-orange-800', label: 'Medium', icon: Clock };
    return { color: 'bg-red-100 text-red-800', label: 'High', icon: AlertTriangle };
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Your Genetic Dashboard</h1>
          <p className="text-muted-foreground">Explore your personalized genetic insights and health recommendations</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/user/upload">
            <Card className="glass hover:scale-105 transition-transform cursor-pointer">
              <CardContent className="flex items-center justify-center p-6">
                <div className="text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <p className="font-semibold">Upload DNA</p>
                  <p className="text-xs text-muted-foreground">New analysis</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/user/results">
            <Card className="glass hover:scale-105 transition-transform cursor-pointer">
              <CardContent className="flex items-center justify-center p-6">
                <div className="text-center">
                  <FileText className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <p className="font-semibold">View Results</p>
                  <p className="text-xs text-muted-foreground">Latest report</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/user/3d-dna">
            <Card className="glass hover:scale-105 transition-transform cursor-pointer">
              <CardContent className="flex items-center justify-center p-6">
                <div className="text-center">
                  <Dna className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="font-semibold">3D DNA View</p>
                  <p className="text-xs text-muted-foreground">Interactive</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Card className="glass hover:scale-105 transition-transform cursor-pointer">
            <CardContent className="flex items-center justify-center p-6">
              <div className="text-center">
                <Download className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <p className="font-semibold">Download Report</p>
                <p className="text-xs text-muted-foreground">PDF format</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Overall Risk Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="glass lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Overall Health Risk
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <RiskGauge value={userAnalysis.overallRisk} populationValue={40} size={150} />
            </CardContent>
          </Card>

          <Card className="glass lg:col-span-2">
            <CardHeader>
              <CardTitle>Health Risk Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userAnalysis.conditions.map((condition, index) => {
                  const badge = getRiskBadge(condition.risk);
                  const Icon = badge.icon;
                  return (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5" />
                        <div>
                          <p className="font-medium">{condition.name}</p>
                          <p className="text-sm text-muted-foreground">{condition.risk}% risk</p>
                        </div>
                      </div>
                      <Badge className={`${badge.color}`}>
                        {badge.label}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Traits and Drug Response */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Genetic Traits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userAnalysis.traits.map((trait, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="font-medium">{trait.name}</span>
                    <Badge variant="outline">{trait.result}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Drug Response</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userAnalysis.drugResponses.map((drug, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <p className="font-medium">{drug.drug}</p>
                    <p className="text-sm text-muted-foreground mt-1">{drug.response}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Genetic analysis completed</p>
                  <p className="text-sm text-muted-foreground">Your comprehensive report is ready</p>
                </div>
                <span className="text-sm text-muted-foreground">{userAnalysis.lastAnalysis}</span>
              </div>
              
              <div className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Upload className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">DNA data uploaded</p>
                  <p className="text-sm text-muted-foreground">23andMe raw data processed successfully</p>
                </div>
                <span className="text-sm text-muted-foreground">2024-01-14</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
