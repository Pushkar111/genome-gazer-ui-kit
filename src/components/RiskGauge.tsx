
import React from 'react';

interface RiskGaugeProps {
  value: number;
  populationValue: number;
  size?: number;
}

const RiskGauge: React.FC<RiskGaugeProps> = ({ 
  value, 
  populationValue, 
  size = 120 
}) => {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  const populationOffset = circumference - (populationValue / 100) * circumference;

  const getColor = (risk: number) => {
    if (risk < 30) return '#10b981'; // green
    if (risk < 60) return '#f59e0b'; // orange
    return '#ef4444'; // red
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          className="transform -rotate-90"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
          />
          
          {/* Population average circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#9ca3af"
            strokeWidth="4"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={populationOffset}
            strokeLinecap="round"
            className="opacity-50"
          />
          
          {/* Your risk circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={getColor(value)}
            strokeWidth="8"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold" style={{ color: getColor(value) }}>
            {value}%
          </span>
          <span className="text-xs text-muted-foreground">Risk</span>
        </div>
      </div>
      
      <div className="mt-2 text-center">
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-1 rounded-full" style={{ backgroundColor: getColor(value) }}></div>
            <span>You</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-1 rounded-full bg-gray-400"></div>
            <span>Average</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskGauge;
