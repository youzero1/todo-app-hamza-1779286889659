import { Search, SortAsc } from 'lucide-react';
import { Filter, SortBy } from '@/types';
import clsx from 'clsx';

type FilterBarProps = {
  filter: Filter;
  setFilter: (f: Filter) => void;
  sortBy: SortBy;
  setSortBy: (s: SortBy) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  stats: { total: number; active: number; completed: number };
};

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

const SORTS: { value: SortBy; label: string }[] = [
  { value: 'created', label: 'Newest' },
  { value: 'priority', label: 'Priority' },
  { value: 'alphabetical', label: 'A–Z' },
];

export default function FilterBar({
  filter,
  setFilter,
  sortBy,
  setSortBy,
  searchQuery,
  setSearchQuery,
  stats,
}: FilterBarProps) {
  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9090b0]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          placeholder="Search tasks..."
          className="w-full bg-[#1e1e2e] text-white placeholder-[#9090b0] rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none border border-white/5 focus:border-indigo-500/50 transition-colors"
        />
      </div>

      {/* Filters + Sort */}
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <div className="flex gap-1">
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={clsx(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                filter === f.value
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/5 text-[#9090b0] hover:bg-white/10 hover:text-white'
              )}
            >
              {f.label}
              {f.value === 'all' && (
                <span className="ml-1.5 bg-white/10 text-xs px-1.5 py-0.5 rounded-full">{stats.total}</span>
              )}
              {f.value === 'active' && (
                <span className="ml-1.5 bg-white/10 text-xs px-1.5 py-0.5 rounded-full">{stats.active}</span>
              )}
              {f.value === 'completed' && (
                <span className="ml-1.5 bg-white/10 text-xs px-1.5 py-0.5 rounded-full">{stats.completed}</span>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <SortAsc size={14} className="text-[#9090b0]" />
          {SORTS.map(s => (
            <button
              key={s.value}
              onClick={() => setSortBy(s.value)}
              className={clsx(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                sortBy === s.value
                  ? 'bg-[#2a2a3e] text-white border border-indigo-500/40'
                  : 'text-[#9090b0] hover:text-white'
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
