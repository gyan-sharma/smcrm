export function getStageColor(stage: string | null | undefined): string {
  switch (stage) {
    case 'new': return 'bg-blue-100 text-blue-800';
    case 'qualification': return 'bg-purple-100 text-purple-800';
    case 'proposal': return 'bg-indigo-100 text-indigo-800';
    case 'negotiation': return 'bg-orange-100 text-orange-800';
    case 'closed_won': return 'bg-green-100 text-green-800';
    case 'closed_lost': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export function getPriorityColor(priority: string | null | undefined): string {
  switch (priority) {
    case 'high': return 'bg-red-100 text-red-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'low': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export function formatStage(stage: string | null | undefined): string {
  if (!stage) return 'Unknown';
  return stage.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

export function formatPriority(priority: string | null | undefined): string {
  if (!priority) return 'Unknown';
  return priority.charAt(0).toUpperCase() + priority.slice(1);
}

export function getForecastCategoryColor(category: string): string {
  switch (category) {
    case 'pipeline': return 'bg-blue-500';
    case 'best_case': return 'bg-indigo-500';
    case 'commit': return 'bg-purple-500';
    case 'closed': return 'bg-green-500';
    case 'omitted': return 'bg-gray-500';
    default: return 'bg-gray-500';
  }
}