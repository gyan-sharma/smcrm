import React from 'react';
import { BlockchainOpportunity } from '../../../types';

interface CommercialDetailsProps {
  initialData?: Partial<BlockchainOpportunity>;
  isLoading?: boolean;
}

export default function CommercialDetails({ initialData, isLoading }: CommercialDetailsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Commercial Details</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="license_type" className="block text-sm font-medium text-gray-700">
            License Type
          </label>
          <select
            name="license_type"
            id="license_type"
            defaultValue={initialData?.license_type || 'subscription'}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            disabled={isLoading}
          >
            <option value="perpetual">Perpetual</option>
            <option value="subscription">Subscription</option>
            <option value="usage-based">Usage-based</option>
          </select>
        </div>

        <div>
          <label htmlFor="budget_license" className="block text-sm font-medium text-gray-700">
            License Budget
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">€</span>
            </div>
            <input
              type="number"
              name="budget_license"
              id="budget_license"
              min="0"
              defaultValue={initialData?.budget?.license || 0}
              required
              className="mt-1 block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label htmlFor="budget_services" className="block text-sm font-medium text-gray-700">
            Services Budget
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">€</span>
            </div>
            <input
              type="number"
              name="budget_services"
              id="budget_services"
              min="0"
              defaultValue={initialData?.budget?.services || 0}
              required
              className="mt-1 block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label htmlFor="budget_maintenance" className="block text-sm font-medium text-gray-700">
            Annual Maintenance Budget
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">€</span>
            </div>
            <input
              type="number"
              name="budget_maintenance"
              id="budget_maintenance"
              min="0"
              defaultValue={initialData?.budget?.maintenance || 0}
              required
              className="mt-1 block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}