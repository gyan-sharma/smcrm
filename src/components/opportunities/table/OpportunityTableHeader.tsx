import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

type SortField = 'title' | 'customer_name' | 'stage' | 'priority' | 'estimated_value' | 'created_at' | 'industry' | 'forecast_category';
type SortDirection = 'asc' | 'desc';

interface OpportunityTableHeaderProps {
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

export default function OpportunityTableHeader({ sortField, sortDirection, onSort }: OpportunityTableHeaderProps) {
  const SortIcon = sortDirection === 'asc' ? ArrowUp : ArrowDown;

  const renderSortableHeader = (field: SortField, label: string) => (
    <th
      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-50"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-1">
        {label}
        {sortField === field && (
          <SortIcon className="h-4 w-4 text-gray-500" />
        )}
      </div>
    </th>
  );

  return (
    <thead>
      <tr>
        {renderSortableHeader('title', 'Title')}
        {renderSortableHeader('customer_name', 'Customer')}
        {renderSortableHeader('industry', 'Industry')}
        {renderSortableHeader('stage', 'Stage')}
        {renderSortableHeader('priority', 'Priority')}
        {renderSortableHeader('forecast_category', 'Forecast')}
        {renderSortableHeader('estimated_value', 'Value')}
        {renderSortableHeader('created_at', 'Created')}
        <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
          <span className="sr-only">Actions</span>
        </th>
      </tr>
    </thead>
  );
}