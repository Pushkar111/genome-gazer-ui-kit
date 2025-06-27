
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  AlertTriangle,
  Activity,
  BarChart3,
  PieChart,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Heart,
  Brain,
  Pill
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart as RechartsPieChart, Cell, LineChart, Line, AreaChart, Area, ResponsiveContainer, Pie } from 'recharts';
import DashboardLayout from '@/components/DashboardLayout';

const DoctorAnalytics = () => {
  const [dateRange, setDateRange] = useState('last30days');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for charts
  const patientGrowthData = [
    { month: 'Jan', patients: 145, newPatients: 23 },
    { month: 'Feb', patients: 168, newPatients: 31 },
    { month: 'Mar', patients: 192, newPatients: 28 },
    { month: 'Apr', patients: 220, newPatients: 35 },
    { month: 'May', patients: 248, newPatients: 29 },
    { month: 'Jun', patients: 276, newPatients: 42 }
  ];

  const riskDistributionData = [
    { name: 'Low Risk', value: 45, color: '#10B981' },
    { name: 'Medium Risk', value: 30, color: '#F59E0B' },
    { name: 'High Risk', value: 20, color: '#EF4444' },
    { name: 'Critical Risk', value: 5, color: '#7C2D12' }
  ];

  const diseasePrevalenceData = [
    { disease: 'Type 2 Diabetes', cases: 89, percentage: 32 },
    { disease: 'Cardiovascular', cases: 76, percentage: 27 },
    { disease: 'Alzheimer\'s', cases: 45, percentage: 16 },
    { disease: 'Cancer Risk', cases: 38, percentage: 14 },
    { disease: 'Hypertension', cases: 31, percentage: 11 }
  ];

  const weeklyActivityData = [
    { day: 'Mon', reports: 12, consultations: 8, uploads: 15 },
    { day: 'Tue', reports: 19, consultations: 12, uploads: 22 },
    { day: 'Wed', reports: 15, consultations: 10, uploads: 18 },
    { day: 'Thu', reports: 22, consultations: 15, uploads: 25 },
    { day: 'Fri', reports: 18, consultations: 13, uploads: 20 },
    { day: 'Sat', reports: 8, consultations: 5, uploads: 10 },
    { day: 'Sun', reports: 6, consultations: 3, uploads: 7 }
  ];

  const handleRefreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="container-responsive space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-3">
              <div className="w-10 h-10 medical-gradient rounded-xl flex items-center justify-center animate-pulse-medical">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              Clinical Analytics
            </h1>
            <p className="text-muted-foreground text-responsive">
              Comprehensive insights into patient data and genetic analysis trends
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <select title='Select Date Range'
              className="px-3 py-2 border border-blue-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="last3months">Last 3 Months</option>
              <option value="last6months">Last 6 Months</option>
              <option value="lastyear">Last Year</option>
            </select>
            
            <Button 
              onClick={handleRefreshData}
              disabled={isLoading}
              className="btn-medical"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid-responsive">
          <Card className="hospital-card">
            <CardContent className="spacing-responsive">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Patients</p>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-600">276</p>
                  <p className="text-xs text-green-600 mt-1">+42 this month</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hospital-card">
            <CardContent className="spacing-responsive">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Reports Generated</p>
                  <p className="text-2xl sm:text-3xl font-bold text-teal-600">1,247</p>
                  <p className="text-xs text-green-600 mt-1">+18% vs last month</p>
                </div>
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                  <FileText className="h-6 w-6 text-teal-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hospital-card">
            <CardContent className="spacing-responsive">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">High Risk Cases</p>
                  <p className="text-2xl sm:text-3xl font-bold text-orange-600">69</p>
                  <p className="text-xs text-red-600 mt-1">25% of total patients</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hospital-card">
            <CardContent className="spacing-responsive">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Risk Score</p>
                  <p className="text-2xl sm:text-3xl font-bold text-purple-600">64.2</p>
                  <p className="text-xs text-yellow-600 mt-1">Medium risk range</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Activity className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-blue-50 border border-blue-200">
            <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
            <TabsTrigger value="patients" className="text-sm">Patients</TabsTrigger>
            <TabsTrigger value="diseases" className="text-sm">Diseases</TabsTrigger>
            <TabsTrigger value="activity" className="text-sm">Activity</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Patient Growth Chart */}
              <Card className="hospital-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    Patient Growth Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={patientGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E0F2FE" />
                      <XAxis dataKey="month" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#F0F9FF', 
                          border: '1px solid #0EA5E9',
                          borderRadius: '8px'
                        }}
                      />
                      <Area type="monotone" dataKey="patients" stroke="#0EA5E9" fill="#0EA5E9" fillOpacity={0.3} />
                      <Area type="monotone" dataKey="newPatients" stroke="#14B8A6" fill="#14B8A6" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Risk Distribution */}
              <Card className="hospital-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-purple-600" />
                    Risk Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={riskDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {riskDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Patients Tab */}
          <TabsContent value="patients" className="space-y-6">
            <Card className="hospital-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Patient Demographics & Risk Analysis</CardTitle>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-blue-600">Age Distribution</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>18-30 years</span>
                        <span className="font-medium">45 patients</span>
                      </div>
                      <div className="w-full bg-blue-100 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{width: '16%'}}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>31-50 years</span>
                        <span className="font-medium">128 patients</span>
                      </div>
                      <div className="w-full bg-blue-100 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{width: '46%'}}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>51+ years</span>
                        <span className="font-medium">103 patients</span>
                      </div>
                      <div className="w-full bg-blue-100 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{width: '37%'}}></div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-teal-600">Gender Distribution</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Female</span>
                        <span className="text-sm font-medium">148 (54%)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Male</span>
                        <span className="text-sm font-medium">128 (46%)</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-purple-600">Recent Activity</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>23 new reports today</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>15 consultations scheduled</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span>8 high-risk alerts</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Diseases Tab */}
          <TabsContent value="diseases" className="space-y-6">
            <Card className="hospital-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Disease Prevalence Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={diseasePrevalenceData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#E0F2FE" />
                    <XAxis type="number" fontSize={12} />
                    <YAxis dataKey="disease" type="category" width={120} fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#F0F9FF', 
                        border: '1px solid #0EA5E9',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="cases" fill="#0EA5E9" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hospital-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Brain className="h-5 w-5 text-purple-600" />
                    Neurological Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-blue-100">
                    <span className="text-sm">Alzheimer's Risk</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">45 cases</span>
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">16%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-blue-100">
                    <span className="text-sm">Parkinson's Risk</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">23 cases</span>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">8%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm">Cognitive Decline</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">34 cases</span>
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">12%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hospital-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Pill className="h-5 w-5 text-green-600" />
                    Drug Response Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-blue-100">
                    <span className="text-sm">Warfarin Sensitivity</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">67 patients</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">24%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-blue-100">
                    <span className="text-sm">Clopidogrel Response</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">52 patients</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">19%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm">Statin Metabolism</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">89 patients</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">32%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card className="hospital-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-600" />
                  Weekly Activity Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyActivityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E0F2FE" />
                    <XAxis dataKey="day" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#F0F9FF', 
                        border: '1px solid #0EA5E9',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="reports" stroke="#0EA5E9" strokeWidth={2} />
                    <Line type="monotone" dataKey="consultations" stroke="#14B8A6" strokeWidth={2} />
                    <Line type="monotone" dataKey="uploads" stroke="#8B5CF6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hospital-card">
                <CardContent className="spacing-responsive text-center">
                  <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-lg">This Week</h3>
                  <p className="text-2xl font-bold text-blue-600">127</p>
                  <p className="text-sm text-muted-foreground">Total Activities</p>
                </CardContent>
              </Card>

              <Card className="hospital-card">
                <CardContent className="spacing-responsive text-center">
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-lg">Efficiency</h3>
                  <p className="text-2xl font-bold text-green-600">94%</p>
                  <p className="text-sm text-muted-foreground">Report Completion</p>
                </CardContent>
              </Card>

              <Card className="hospital-card">
                <CardContent className="spacing-responsive text-center">
                  <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-lg">Consultations</h3>
                  <p className="text-2xl font-bold text-purple-600">68</p>
                  <p className="text-sm text-muted-foreground">This Month</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DoctorAnalytics;
