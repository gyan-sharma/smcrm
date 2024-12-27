import React, { useState, useEffect } from 'react';
import { BlockchainOpportunity, User, INDUSTRIES, LEAD_SOURCES, FORECAST_CATEGORIES } from '../../../types';
import StageAndPriority from './StageAndPriority';

interface BasicInfoProps {
  initialData?: Partial<BlockchainOpportunity>;
  salesReps: User[];
  isLoading?: boolean;
}

export default function BasicInfo({ initialData, salesReps, isLoading }: BasicInfoProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    customer_name: initialData?.customer_name || '',
    industry: initialData?.industry || '',
    lead_source: initialData?.lead_source || '',
    forecast_category: initialData?.forecast_category || '',
    sales_rep_id: initialData?.sales_rep_id || ''
  });

  useEffect(() => {
    setFormData({
      title: initialData?.title || '',
      customer_name: initialData?.customer_name || '',
      industry: initialData?.industry || '',
      lead_source: initialData?.lead_source || '',
      forecast_category: initialData?.forecast_category || '',
      sales_rep_id: initialData?.sales_rep_id || ''
    });
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700">Customer Name</label>
          <input
            type="text"
            name="customer_name"
            id="customer_name"
            value={formData.customer_name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            disabled={isLoading}
          />
        </div>

        <StageAndPriority initialData={initialData} isLoading={isLoading} />

        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industry</label>
          <select
            name="industry"
            id="industry"
            value={formData.industry}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            disabled={isLoading}
          >
            <option value="">Select Industry</option>
            {INDUSTRIES.map((industry) => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="lead_source" className="block text-sm font-medium text-gray-700">Lead Source</label>
          <select
            name="lead_source"
            id="lead_source"
            value={formData.lead_source}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            disabled={isLoading}
          >
            <option value="">Select Lead Source</option>
            {LEAD_SOURCES.map((source) => (
              <option key={source} value={source}>{source}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="forecast_category" className="block text-sm font-medium text-gray-700">Forecast Category</label>
          <select
            name="forecast_category"
            id="forecast_category"
            value={formData.forecast_category}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            disabled={isLoading}
          >
            <option value="">Select Forecast Category</option>
            {Object.entries(FORECAST_CATEGORIES).map(([key, { name, probability }]) => (
              <option key={key} value={key}>{name} ({probability}%)</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="sales_rep_id" className="block text-sm font-medium text-gray-700">Sales Representative</label>
          <select
            name="sales_rep_id"
            id="sales_rep_id"
            value={formData.sales_rep_id}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            disabled={isLoading}
          >
            <option value="">Select Sales Rep</option>
            {salesReps.map((rep) => (
              <option key={rep.id} value={rep.id}>{rep.name}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}