
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  AlertTriangle,
  Search,
  Filter,
  Download,
  Eye
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Patient } from '@/types/auth';
import { Link } from 'react-router-dom';

const DoctorDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  // Mock patient data
  const patients: Patient[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      age: 45,
      gender: 'Male',
      riskScore: 75,
      lastAnalysis: '2024-01-15',
      conditions: ['Type 2 Diabetes', 'Hypertension'],
      variants: ['rs7903146', 'rs12255372']
    },
    {
      id: '2',
      name: 'Emily Johnson',
      email: 'emily@example.com',
      age: 32,
      gender: 'Female',
      riskScore: 35,
      lastAnalysis: '2024-01-10',
      conditions: ['BRCA1 Carrier'],
      variants: ['rs80357382', 'rs28897694']
    },
    {
      id: '3',
      name: 'Michael Davis',
      email: 'michael@example.com',
      age: 58,
      gender: 'Male',
      riskScore: 82,
      lastAnalysis: '2024-01-12',
      conditions: ['Alzheimer\'s Risk', 'CAD'],
      variants: ['rs429358', 'rs7412']
    }
  ];

  const getRiskBadge = (score: number) => {
    if (score < 40) return { color: 'bg-green-100 text-green-800', label: 'Low' };
    if (score < 70) return { color: 'bg-orange-100 text-orange-800', label: 'Medium' };
    return { color: 'bg-red-100 text-red-800', label: 'High' };
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterBy === 'high-risk') return matchesSearch && patient.riskScore >= 70;
    if (filterBy === 'recent') return matchesSearch && new Date(patient.lastAnalysis) > new Date('2024-01-12');
    
    return matchesSearch;
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Doctor Dashboard</h1>
          <p className="text-muted-foreground">Manage your patients and review genetic analysis results</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="glass">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">+12 from last month</p>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reports Generated</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Risk Cases</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.2%</div>
              <p className="text-xs text-muted-foreground">Analysis accuracy</p>
            </CardContent>
          </Card>
        </div>

        {/* Patient Management */}
        <Card className="glass">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="text-xl">Patient Management</CardTitle>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                <select 
                  className="px-3 py-2 border rounded-md bg-background"
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                >
                  <option value="all">All Patients</option>
                  <option value="high-risk">High Risk</option>
                  <option value="recent">Recent Analysis</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPatients.map((patient) => {
                const riskBadge = getRiskBadge(patient.riskScore);
                return (
                  <div key={patient.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold">{patient.name}</h3>
                        <p className="text-sm text-muted-foreground">{patient.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {patient.age}y, {patient.gender}
                          </span>
                          <Badge className={`text-xs ${riskBadge.color}`}>
                            {riskBadge.label} Risk ({patient.riskScore}%)
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="text-right text-sm">
                        <p className="font-medium">Last Analysis</p>
                        <p className="text-muted-foreground">{patient.lastAnalysis}</p>
                      </div>
                      <div className="flex gap-2">
                        <Link to={`/doctor/patient/${patient.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DoctorDashboard;
