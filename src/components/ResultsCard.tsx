
import React from 'react';
import { Card } from '@/components/ui/card';
import RiskGauge from './RiskGauge';

interface ResultsCardProps {
  title: string;
  risk: number;
  populationRisk: number;
  confidence: number;
  description: string;
  recommendations: string[];
}

const ResultsCard: React.FC<ResultsCardProps> = ({
  title,
  risk,
  populationRisk,
  confidence,
  description,
  recommendations
}) => {
  const getRiskLevel = (risk: number) => {
    if (risk < 30) return { label: 'Low', color: 'text-green-600', bg: 'bg-green-100' };
    if (risk < 60) return { label: 'Medium', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { label: 'High', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const riskLevel = getRiskLevel(risk);

  return (
    <Card className="glass p-6 hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${riskLevel.bg} ${riskLevel.color}`}>
          {riskLevel.label} Risk
        </span>
      </div>

      <div className="mb-6">
        <RiskGauge value={risk} populationValue={populationRisk} />
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Genetic Analysis</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Your Risk:</span>
          <span className="font-medium">{risk}%</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Population Average:</span>
          <span className="font-medium">{populationRisk}%</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Confidence:</span>
          <span className="font-medium">{confidence}%</span>
        </div>

        <div className="pt-4 border-t border-gray-200/50">
          <h4 className="font-medium mb-2 text-sm">Recommendations:</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            {recommendations.map((rec, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default ResultsCard;
