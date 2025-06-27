
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Download, 
  FileText, 
  AlertTriangle, 
  User,
  Calendar,
  Mail,
  Phone,
  Save
} from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import RiskGauge from '@/components/RiskGauge';

const DoctorPatientDetail = () => {
  const { id } = useParams();
  const [clinicalNotes, setClinicalNotes] = useState('');

  // Mock patient data
  const patient = {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    age: 45,
    gender: 'Male',
    dateOfBirth: '1979-03-15',
    lastAnalysis: '2024-01-15',
    riskScore: 75,
    conditions: [
      { name: 'Type 2 Diabetes', risk: 75, variants: ['rs7903146', 'rs12255372'] },
      { name: 'Hypertension', risk: 65, variants: ['rs699'] },
      { name: 'Heart Disease', risk: 45, variants: ['rs1333049'] }
    ],
    drugResponses: [
      { drug: 'Warfarin', response: 'Sensitive - Lower dose needed', variants: ['rs1799853'] },
      { drug: 'Clopidogrel', response: 'Normal response', variants: ['rs4244285'] },
      { drug: 'Simvastatin', response: 'Higher risk of side effects', variants: ['rs4363657'] }
    ],
    clinicalHistory: [
      { date: '2024-01-15', event: 'Genetic analysis completed', type: 'analysis' },
      { date: '2024-01-10', event: 'Initial consultation', type: 'consultation' },
      { date: '2024-01-05', event: 'DNA sample received', type: 'sample' }
    ]
  };

  const handleSaveNotes = () => {
    console.log('Saving clinical notes:', clinicalNotes);
    // Implementation for saving notes
  };

  const handleDownloadReport = () => {
    console.log('Downloading patient report');
    // Implementation for PDF download
  };

  const getRiskColor = (risk: number) => {
    if (risk < 40) return 'text-green-600';
    if (risk < 70) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/doctor/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Patients
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">{patient.name}</h1>
              <p className="text-muted-foreground">Patient ID: {patient.id}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleDownloadReport}>
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Generate New Report
            </Button>
          </div>
        </div>

        {/* Patient Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="glass">
            <CardContent className="p-4 flex items-center gap-3">
              <User className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Age</p>
                <p className="font-semibold">{patient.age} years</p>
              </div>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="p-4 flex items-center gap-3">
              <Mail className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-semibold text-sm">{patient.email}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="p-4 flex items-center gap-3">
              <Phone className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-semibold text-sm">{patient.phone}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="p-4 flex items-center gap-3">
              <Calendar className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Last Analysis</p>
                <p className="font-semibold text-sm">{patient.lastAnalysis}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="conditions">Health Conditions</TabsTrigger>
            <TabsTrigger value="drugs">Drug Responses</TabsTrigger>
            <TabsTrigger value="history">Clinical History</TabsTrigger>
            <TabsTrigger value="notes">Clinical Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Overall Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <RiskGauge value={patient.riskScore} populationValue={40} size={150} />
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle>Top Risk Conditions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {patient.conditions.slice(0, 3).map((condition, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{condition.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {condition.variants.join(', ')}
                        </p>
                      </div>
                      <div className={`text-lg font-bold ${getRiskColor(condition.risk)}`}>
                        {condition.risk}%
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="conditions" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {patient.conditions.map((condition, index) => (
                <Card key={index} className="glass">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{condition.name}</span>
                      <Badge className={`${
                        condition.risk < 40 ? 'bg-green-100 text-green-800' :
                        condition.risk < 70 ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {condition.risk}% Risk
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Associated variants:</p>
                      <div className="flex flex-wrap gap-1">
                        {condition.variants.map((variant, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {variant}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="drugs" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {patient.drugResponses.map((drug, index) => (
                <Card key={index} className="glass">
                  <CardHeader>
                    <CardTitle>{drug.drug}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">{drug.response}</p>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Related variants:</p>
                      <div className="flex flex-wrap gap-1">
                        {drug.variants.map((variant, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {variant}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Clinical Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patient.clinicalHistory.map((event, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className={`w-3 h-3 rounded-full ${
                        event.type === 'analysis' ? 'bg-blue-500' :
                        event.type === 'consultation' ? 'bg-green-500' :
                        'bg-purple-500'
                      }`} />
                      <div className="flex-1">
                        <p className="font-medium">{event.event}</p>
                        <p className="text-sm text-muted-foreground">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="space-y-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Clinical Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Add clinical notes, observations, or recommendations..."
                  value={clinicalNotes}
                  onChange={(e) => setClinicalNotes(e.target.value)}
                  className="min-h-32"
                />
                <Button onClick={handleSaveNotes} className="dna-gradient">
                  <Save className="h-4 w-4 mr-2" />
                  Save Notes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DoctorPatientDetail;
