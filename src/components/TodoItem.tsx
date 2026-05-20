import { useState } from 'react';
import { Trash2, Pencil, Check, X, Flag } from 'lucide-react';
import { Todo } from '@/types';
import { priorityBadge, categoryColor } from '@/lib/utils';
import clsx from 'clsx';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  function handleEditSubmit(): void {
    if (editText.trim()) {
      onEdit(todo.id, editText);
    }
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') handleEditSubmit();
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setEditing(false);
    }
  }

  return (
    <div
      className={clsx(
        'group flex items-start gap-3 p-4 rounded-xl border transition-all duration-200',
        todo.completed
          ? 'bg-[#1e1e2e]/50 border-white/3 opacity-60'
          : 'bg-[#1e1e2e] border-white/5 hover:border-indigo-500/30'
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={clsx(
          'mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all',
          todo.completed
            ? 'bg-indigo-600 border-indigo-600'
            : 'border-white/20 hover:border-indigo-500'
        )}
      >
        {todo.completed && <Check size={11} className="text-white" />}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            autoFocus
            value={editText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleEditSubmit}
            className="w-full bg-[#2a2a3e] text-white rounded-lg px-3 py-1.5 text-sm outline-none border border-indigo-500/50"
          />
        ) : (
          <p
            className={clsx(
              'text-sm leading-relaxed break-words',
              todo.completed ? 'line-through text-[#9090b0]' : 'text-white'
            )}
          >
            {todo.text}
          </p>
        )}

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span className={clsx('text-[10px] font-medium px-2 py-0.5 rounded-full capitalize', priorityBadge(todo.priority))}>
            <Flag size={8} className="inline mr-1" />
            {todo.priority}
          </span>
          <span className={clsx('text-[10px] font-medium px-2 py-0.5 rounded-full', categoryColor(todo.category))}>
            {todo.category}
          </span>
          <span className="text-[10px] text-[#9090b0]">
            {new Date(todo.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        {editing ? (
          <>
            <button
              onClick={handleEditSubmit}
              className="p-1.5 rounded-lg hover:bg-green-500/20 text-green-400 transition-colors"
            >
              <Check size={14} />
            </button>
            <button
              onClick={() => { setEditText(todo.text); setEditing(false); }}
              className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-[#9090b0] hover:text-white transition-colors"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1.5 rounded-lg hover:bg-red-500/20 text-[#9090b0] hover:text-red-400 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
