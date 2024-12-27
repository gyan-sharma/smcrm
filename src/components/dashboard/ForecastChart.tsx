import React from 'react';
import { BlockchainOpportunity } from '../../types';
import { FORECAST_CATEGORIES } from '../../types';

interface ForecastChartProps {
  opportunities: BlockchainOpportunity[];
}

export default function ForecastChart({ opportunities }: ForecastChartProps) {
  const forecastData = Object.entries(FORECAST_CATEGORIES).map(([category, { name, probability }]) => {
    const opps = opportunities.filter(opp => opp.forecast_category === category);
    const totalValue = opps.reduce((sum, opp) => sum + opp.estimated_value, 0);
    const weightedValue = totalValue * (probability / 100);
    
    return {
      category,
      name,
      probability,
      count: opps.length,
      totalValue,
      weightedValue
    };
  });

  const totalWeightedValue = forecastData.reduce((sum, data) => sum + data.weightedValue, 0);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Forecast Overview</h3>
      <div className="space-y-4">
        {forecastData.map(({ category, name, probability, count, totalValue, weightedValue }) => (
          <div key={category} className="relative">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{name} ({probability}%)</span>
              <span>€{totalValue.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{count} opportunities</span>
              <span>Weighted: €{weightedValue.toLocaleString()}</span>
            </div>
            <div className="mt-2 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-indigo-500"
                style={{ width: `${(weightedValue / totalWeightedValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
        
        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm font-medium">
            <span>Total Weighted Pipeline</span>
            <span>€{totalWeightedValue.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}