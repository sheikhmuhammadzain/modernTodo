import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { parseDate } from 'chrono-node';
import { Category, Priority, SubTask, Todo, ViewMode } from '../types/todo';

interface TodoState {
  todos: Todo[];
  viewMode: ViewMode;
  labels: string[];
  addTodo: (input: string | Partial<Todo>) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  addSubTask: (todoId: string, title: string) => void;
  toggleSubTask: (todoId: string, subtaskId: string) => void;
  removeSubTask: (todoId: string, subtaskId: string) => void;
  setViewMode: (mode: ViewMode) => void;
  addLabel: (label: string) => void;
  removeLabel: (label: string) => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      viewMode: 'list',
      labels: [],

      addTodo: (input) => {
        const now = new Date();
        if (typeof input === 'string') {
          const parsed = parseDate(input);
          const title = input.replace(parsed?.text || '', '').trim();
          
          const newTodo: Todo = {
            id: Math.random().toString(36).slice(2),
            title,
            completed: false,
            category: 'immediate',
            priority: 'medium',
            dueDate: parsed?.date(),
            subtasks: [],
            labels: [],
            createdAt: now,
            updatedAt: now,
          };
          
          set((state) => ({ todos: [...state.todos, newTodo] }));
        } else {
          const newTodo: Todo = {
            id: Math.random().toString(36).slice(2),
            title: input.title || 'New Task',
            description: input.description,
            completed: false,
            category: input.category || 'immediate',
            priority: input.priority || 'medium',
            dueDate: input.dueDate,
            subtasks: input.subtasks || [],
            labels: input.labels || [],
            recurring: input.recurring,
            createdAt: now,
            updatedAt: now,
          };
          
          set((state) => ({ todos: [...state.todos, newTodo] }));
        }
      },

      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed, updatedAt: new Date() } : todo
          ),
        })),

      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),

      updateTodo: (id, updates) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? { ...todo, ...updates, updatedAt: new Date() }
              : todo
          ),
        })),

      addSubTask: (todoId, title) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === todoId
              ? {
                  ...todo,
                  subtasks: [
                    ...todo.subtasks,
                    {
                      id: Math.random().toString(36).slice(2),
                      title,
                      completed: false,
                    },
                  ],
                  updatedAt: new Date(),
                }
              : todo
          ),
        })),

      toggleSubTask: (todoId, subtaskId) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === todoId
              ? {
                  ...todo,
                  subtasks: todo.subtasks.map((subtask) =>
                    subtask.id === subtaskId
                      ? { ...subtask, completed: !subtask.completed }
                      : subtask
                  ),
                  updatedAt: new Date(),
                }
              : todo
          ),
        })),

      removeSubTask: (todoId, subtaskId) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === todoId
              ? {
                  ...todo,
                  subtasks: todo.subtasks.filter(
                    (subtask) => subtask.id !== subtaskId
                  ),
                  updatedAt: new Date(),
                }
              : todo
          ),
        })),

      setViewMode: (mode) => set({ viewMode: mode }),
      addLabel: (label) =>
        set((state) => ({ labels: [...state.labels, label] })),
      removeLabel: (label) =>
        set((state) => ({ labels: state.labels.filter((l) => l !== label) })),
    }),
    {
      name: 'todo-storage',
    }
  )
);