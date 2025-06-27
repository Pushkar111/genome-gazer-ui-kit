
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Download, 
  ExternalLink, 
  Dna,
  BookOpen,
  Database
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';

const DoctorVariantExplorer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock variant data
  const variants = [
    {
      id: 'rs7903146',
      gene: 'TCF7L2',
      chromosome: '10',
      position: '114758349',
      condition: 'Type 2 Diabetes',
      clinicalSignificance: 'Pathogenic',
      frequency: '0.285',
      effect: 'Missense',
      studies: 47,
      patients: 12
    },
    {
      id: 'rs429358',
      gene: 'APOE',
      chromosome: '19',
      position: '45411941',
      condition: 'Alzheimer Disease',
      clinicalSignificance: 'Risk Factor',
      frequency: '0.136',
      effect: 'Missense',
      studies: 89,
      patients: 8
    },
    {
      id: 'rs1799853',
      gene: 'CYP2C9',
      chromosome: '10',
      position: '96540410',
      condition: 'Warfarin Sensitivity',
      clinicalSignificance: 'Drug Response',
      frequency: '0.125',
      effect: 'Missense',
      studies: 156,
      patients: 23
    },
    {
      id: 'rs4244285',
      gene: 'CYP2C19',
      chromosome: '10',
      position: '96522463',
      condition: 'Clopidogrel Response',
      clinicalSignificance: 'Drug Response',
      frequency: '0.155',
      effect: 'Splicing',
      studies: 78,
      patients: 15
    }
  ];

  const filteredVariants = variants.filter(variant => {
    const matchesSearch = variant.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         variant.gene.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         variant.condition.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === 'disease') return matchesSearch && variant.clinicalSignificance !== 'Drug Response';
    if (selectedFilter === 'drug') return matchesSearch && variant.clinicalSignificance === 'Drug Response';
    
    return matchesSearch;
  });

  const getSignificanceBadge = (significance: string) => {
    switch (significance) {
      case 'Pathogenic':
        return 'bg-red-100 text-red-800';
      case 'Risk Factor':
        return 'bg-orange-100 text-orange-800';
      case 'Drug Response':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Dna className="h-8 w-8 text-blue-600" />
            Variant Explorer
          </h1>
          <p className="text-muted-foreground">
            Search and analyze genetic variants with ClinVar integration
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by variant ID, gene, or condition..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select 
                className="px-3 py-2 border rounded-md bg-background"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Variants</option>
                <option value="disease">Disease Risk</option>
                <option value="drug">Drug Response</option>
              </select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glass">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{variants.length}</div>
              <div className="text-sm text-muted-foreground">Total Variants</div>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {variants.reduce((sum, v) => sum + v.patients, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Patients Affected</div>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {variants.reduce((sum, v) => sum + v.studies, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Research Studies</div>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">15</div>
              <div className="text-sm text-muted-foreground">Genes Analyzed</div>
            </CardContent>
          </Card>
        </div>

        {/* Variants Table */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Genetic Variants ({filteredVariants.length})</span>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Results
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredVariants.map((variant) => (
                <div key={variant.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-600">{variant.id}</h3>
                      <p className="text-muted-foreground">
                        {variant.gene} • Chr {variant.chromosome}:{variant.position}
                      </p>
                    </div>
                    <Badge className={getSignificanceBadge(variant.clinicalSignificance)}>
                      {variant.clinicalSignificance}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Condition</p>
                      <p className="font-medium">{variant.condition}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Population Frequency</p>
                      <p className="font-medium">{variant.frequency}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Effect</p>
                      <p className="font-medium">{variant.effect}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Your Patients</p>
                      <p className="font-medium">{variant.patients} affected</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {variant.studies} Studies
                    </Button>
                    <Button variant="outline" size="sm">
                      <Database className="h-4 w-4 mr-1" />
                      ClinVar
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      PubMed
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DoctorVariantExplorer;
