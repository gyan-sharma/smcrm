import React, { useEffect, useState } from 'react';
import { Target, TrendingUp, Users, DollarSign, BarChart3 } from 'lucide-react';
import { BlockchainOpportunity, User } from '../types';
import { seedDummyData } from '../utils/seedData';
import db from '../lib/db';
import MetricsGrid from '../components/dashboard/MetricsGrid';
import OpportunityStageChart from '../components/dashboard/OpportunityStageChart';
import RecentOpportunities from '../components/dashboard/RecentOpportunities';
import ForecastChart from '../components/dashboard/ForecastChart';

export default function Dashboard() {
  const [opportunities, setOpportunities] = useState<(BlockchainOpportunity & { sales_rep?: User })[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        await seedDummyData();
        
        const allOpportunities = await db.opportunities
          .orderBy('created_at')
          .reverse()
          .toArray();
        
        const salesReps = await db.users.toArray();
        
        const opportunitiesWithSalesRep = allOpportunities.map(opportunity => ({
          ...opportunity,
          sales_rep: salesReps.find(rep => rep.id === opportunity.sales_rep_id)
        }));
        
        setOpportunities(opportunitiesWithSalesRep);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const closedWonOpps = opportunities.filter(opp => opp.stage === 'closed_won');
  const totalClosedWonValue = closedWonOpps.reduce((sum, opp) => sum + opp.estimated_value, 0);
  const winRate = opportunities.length > 0 
    ? (closedWonOpps.length / opportunities.length) * 100 
    : 0;

  const metrics = [
    {
      name: 'Total Opportunities',
      value: opportunities.length.toString(),
      change: '+20.1%',
      changeType: 'increase' as const,
      icon: Target
    },
    {
      name: 'Pipeline Value',
      value: `€${opportunities.reduce((sum, opp) => sum + opp.estimated_value, 0).toLocaleString()}`,
      change: '+15.5%',
      changeType: 'increase' as const,
      icon: DollarSign
    },
    {
      name: 'Win Rate',
      value: `${winRate.toFixed(1)}%`,
      change: '+4.75%',
      changeType: 'increase' as const,
      icon: TrendingUp
    },
    {
      name: 'Closed Won Value',
      value: `€${totalClosedWonValue.toLocaleString()}`,
      change: '+25.2%',
      changeType: 'increase' as const,
      icon: BarChart3
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-700">
          Track your sales pipeline and performance metrics.
        </p>
      </div>

      <MetricsGrid metrics={metrics} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <OpportunityStageChart opportunities={opportunities} />
        <ForecastChart opportunities={opportunities} />
      </div>

      <RecentOpportunities opportunities={opportunities.slice(0, 5)} />
    </div>
  );
}