import { Priority } from '@/types';

export function priorityColor(priority: Priority): string {
  if (priority === 'high') return 'text-red-400';
  if (priority === 'medium') return 'text-yellow-400';
  return 'text-green-400';
}

export function priorityBadge(priority: Priority): string {
  if (priority === 'high') return 'bg-red-500/20 text-red-400 border border-red-500/30';
  if (priority === 'medium') return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
  return 'bg-green-500/20 text-green-400 border border-green-500/30';
}

export function categoryColor(category: string): string {
  const colors: Record<string, string> = {
    Work: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    Personal: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
    Health: 'bg-green-500/20 text-green-400 border border-green-500/30',
    Finance: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    Learning: 'bg-pink-500/20 text-pink-400 border border-pink-500/30',
    Other: 'bg-gray-500/20 text-gray-400 border border-gray-500/30',
  };
  return colors[category] || 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
}
