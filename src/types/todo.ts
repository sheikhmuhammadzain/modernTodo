export type Priority = 'low' | 'medium' | 'high';
export type Category = 'immediate' | 'due-soon' | 'favorite' | 'personal';
export type ViewMode = 'list' | 'kanban' | 'calendar';

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  category: Category;
  priority: Priority;
  dueDate?: Date;
  subtasks: SubTask[];
  labels: string[];
  recurring?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    interval: number;
  };
  createdAt: Date;
  updatedAt: Date;
}