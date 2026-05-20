import { Trash2, Sparkles } from 'lucide-react';
import { useTodos } from '@/hooks/useTodos';
import AddTodoForm from '@/components/AddTodoForm';
import TodoItem from '@/components/TodoItem';
import FilterBar from '@/components/FilterBar';
import StatsBar from '@/components/StatsBar';

export default function TodoPage() {
  const {
    filtered,
    filter,
    setFilter,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    stats,
  } = useTodos();

  return (
    <div className="min-h-screen bg-[#13131f] px-4 py-10">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2.5">
            <Sparkles size={28} className="text-indigo-400" />
            <h1 className="text-3xl font-bold text-white tracking-tight">My Tasks</h1>
          </div>
          <p className="text-[#9090b0] text-sm">Stay focused, stay productive.</p>
        </div>

        {/* Stats */}
        <StatsBar stats={stats} />

        {/* Add Form */}
        <AddTodoForm onAdd={addTodo} />

        {/* Filter Bar */}
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          stats={stats}
        />

        {/* Todo List */}
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="text-5xl">✨</div>
              <p className="text-[#9090b0] text-sm">
                {searchQuery
                  ? 'No tasks match your search.'
                  : filter === 'completed'
                  ? 'No completed tasks yet.'
                  : filter === 'active'
                  ? 'No active tasks. Great job!'
                  : 'No tasks yet. Add one above!'}
              </p>
            </div>
          ) : (
            filtered.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))
          )}
        </div>

        {/* Clear Completed */}
        {stats.completed > 0 && (
          <div className="flex justify-end">
            <button
              onClick={clearCompleted}
              className="flex items-center gap-2 text-xs text-[#9090b0] hover:text-red-400 transition-colors px-3 py-2 rounded-lg hover:bg-red-500/10"
            >
              <Trash2 size={13} />
              Clear {stats.completed} completed task{stats.completed !== 1 ? 's' : ''}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
