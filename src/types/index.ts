export type Priority = 'low' | 'medium' | 'high';

export type Filter = 'all' | 'active' | 'completed';

export type SortBy = 'created' | 'priority' | 'alphabetical';

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  createdAt: number;
  category: string;
};
