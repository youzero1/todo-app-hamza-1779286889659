import { CheckCircle2, Circle, ListTodo } from 'lucide-react';

type StatsBarProps = {
  stats: { total: number; active: number; completed: number };
};

export default function StatsBar({ stats }: StatsBarProps) {
  const percentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="bg-[#1e1e2e] rounded-2xl p-5 border border-white/5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-[#9090b0] uppercase tracking-wider">Progress</h2>
        <span className="text-2xl font-bold text-white">{percentage}%</span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-[#2a2a3e] rounded-full h-2 mb-4 overflow-hidden">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-500 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col items-center gap-1 bg-[#2a2a3e] rounded-xl p-3">
          <ListTodo size={18} className="text-indigo-400" />
          <span className="text-xl font-bold text-white">{stats.total}</span>
          <span className="text-[10px] text-[#9090b0] uppercase tracking-wider">Total</span>
        </div>
        <div className="flex flex-col items-center gap-1 bg-[#2a2a3e] rounded-xl p-3">
          <Circle size={18} className="text-yellow-400" />
          <span className="text-xl font-bold text-white">{stats.active}</span>
          <span className="text-[10px] text-[#9090b0] uppercase tracking-wider">Active</span>
        </div>
        <div className="flex flex-col items-center gap-1 bg-[#2a2a3e] rounded-xl p-3">
          <CheckCircle2 size={18} className="text-green-400" />
          <span className="text-xl font-bold text-white">{stats.completed}</span>
          <span className="text-[10px] text-[#9090b0] uppercase tracking-wider">Done</span>
        </div>
      </div>
    </div>
  );
}
