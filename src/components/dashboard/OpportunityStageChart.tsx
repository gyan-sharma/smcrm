import React from 'react';
import { BlockchainOpportunity } from '../../types';

interface OpportunityStageChartProps {
  opportunities: BlockchainOpportunity[];
}

export default function OpportunityStageChart({ opportunities }: OpportunityStageChartProps) {
  const stages = ['new', 'qualification', 'proposal', 'negotiation', 'closed'];
  const stageColors = {
    new: 'bg-blue-500',
    qualification: 'bg-purple-500',
    proposal: 'bg-indigo-500',
    negotiation: 'bg-orange-500',
    closed: 'bg-green-500'
  };

  const stageCounts = stages.reduce((acc, stage) => {
    acc[stage] = opportunities.filter(opp => opp.stage === stage).length;
    return acc;
  }, {} as Record<string, number>);

  const total = opportunities.length;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Pipeline by Stage</h3>
      <div className="space-y-4">
        {stages.map(stage => {
          const count = stageCounts[stage];
          const percentage = total > 0 ? (count / total) * 100 : 0;
          
          return (
            <div key={stage} className="relative">
              <div className="flex items-center justify-between text-sm font-medium">
                <span className="capitalize">{stage}</span>
                <span>{count} ({percentage.toFixed(1)}%)</span>
              </div>
              <div className="mt-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className={`h-2 rounded-full ${stageColors[stage as keyof typeof stageColors]}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}