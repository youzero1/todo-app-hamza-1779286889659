import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Priority } from '@/types';
import clsx from 'clsx';

type AddTodoFormProps = {
  onAdd: (text: string, priority: Priority, category: string) => void;
};

const CATEGORIES = ['Work', 'Personal', 'Health', 'Finance', 'Learning', 'Other'];
const PRIORITIES: Priority[] = ['low', 'medium', 'high'];

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState('Work');
  const [expanded, setExpanded] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, priority, category);
    setText('');
    setPriority('medium');
    setCategory('Work');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#1e1e2e] rounded-2xl p-5 shadow-lg border border-white/5"
    >
      <div className="flex gap-3 items-center">
        <input
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          onFocus={() => setExpanded(true)}
          placeholder="Add a new task..."
          className="flex-1 bg-[#2a2a3e] text-white placeholder-[#9090b0] rounded-xl px-4 py-3 outline-none border border-white/5 focus:border-indigo-500/50 transition-colors text-sm"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl px-4 py-3 flex items-center gap-2 transition-colors text-sm font-medium"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Add Task</span>
        </button>
      </div>

      {expanded && (
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-[#9090b0] font-medium uppercase tracking-wider">Priority</label>
            <div className="flex gap-2">
              {PRIORITIES.map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={clsx(
                    'px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors',
                    priority === p
                      ? p === 'high'
                        ? 'bg-red-500 text-white'
                        : p === 'medium'
                        ? 'bg-yellow-500 text-black'
                        : 'bg-green-500 text-black'
                      : 'bg-white/5 text-[#9090b0] hover:bg-white/10'
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-[#9090b0] font-medium uppercase tracking-wider">Category</label>
            <select
              value={category}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
              className="bg-[#2a2a3e] text-white text-sm rounded-lg px-3 py-1.5 border border-white/5 outline-none focus:border-indigo-500/50 transition-colors"
            >
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => setExpanded(false)}
            className="mt-auto text-xs text-[#9090b0] hover:text-white transition-colors"
          >
            Collapse
          </button>
        </div>
      )}
    </form>
  );
}
