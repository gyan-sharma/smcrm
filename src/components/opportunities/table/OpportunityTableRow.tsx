import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Edit2, Trash2 } from 'lucide-react';
import { BlockchainOpportunity, User, FORECAST_CATEGORIES } from '../../../types';
import { getStageColor, getPriorityColor } from '../../../utils/styleHelpers';
import { formatCurrency, formatDate, formatStageValue, formatPriorityValue } from '../../../utils/formatters';

interface OpportunityTableRowProps {
  opportunity: BlockchainOpportunity & { sales_rep?: User };
  onEdit: (opportunity: BlockchainOpportunity) => void;
  onDelete: (opportunity: BlockchainOpportunity) => void;
}

export default function OpportunityTableRow({ opportunity, onEdit, onDelete }: OpportunityTableRowProps) {
  const forecastCategory = opportunity.forecast_category ? 
    FORECAST_CATEGORIES[opportunity.forecast_category as keyof typeof FORECAST_CATEGORIES] : null;

  return (
    <tr>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {opportunity.title || 'Untitled'}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {opportunity.customer_name || 'No Customer'}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {opportunity.industry || 'Not specified'}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStageColor(opportunity.stage)}`}>
          {formatStageValue(opportunity.stage)}
        </span>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getPriorityColor(opportunity.priority)}`}>
          {formatPriorityValue(opportunity.priority)}
        </span>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {forecastCategory ? (
          <span className="inline-flex items-center">
            {forecastCategory.name}
            <span className="ml-1 text-xs text-gray-500">({forecastCategory.probability}%)</span>
          </span>
        ) : 'Not set'}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {formatCurrency(opportunity.estimated_value || 0)}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {formatDate(opportunity.created_at)}
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <Link
          to={`/opportunities/${opportunity.id}`}
          className="text-indigo-600 hover:text-indigo-900 mr-4"
        >
          <Eye className="h-4 w-4" />
        </Link>
        <button
          onClick={() => onEdit(opportunity)}
          className="text-indigo-600 hover:text-indigo-900 mr-4"
        >
          <Edit2 className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(opportunity)}
          className="text-red-600 hover:text-red-900"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </td>
    </tr>
  );
}