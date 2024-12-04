import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Todo, Priority, Category } from '../types/todo';
import { format } from 'date-fns';

interface TaskDialogProps {
  todo?: Partial<Todo>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (todo: Partial<Todo>) => void;
}

export function TaskDialog({ todo, open, onOpenChange, onSave }: TaskDialogProps) {
  const [title, setTitle] = React.useState(todo?.title || '');
  const [description, setDescription] = React.useState(todo?.description || '');
  const [priority, setPriority] = React.useState<Priority>(todo?.priority || 'medium');
  const [category, setCategory] = React.useState<Category>(todo?.category || 'immediate');
  const [dueDate, setDueDate] = React.useState(todo?.dueDate ? format(todo.dueDate, 'yyyy-MM-dd') : '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...todo,
      title,
      description,
      priority,
      category,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    });
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 w-[90vw] max-w-lg max-h-[85vh] overflow-y-auto">
          <Dialog.Title className="text-xl font-semibold mb-4">
            {todo ? 'Edit Task' : 'New Task'}
          </Dialog.Title>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Priority)}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="immediate">Immediate</option>
                  <option value="due-soon">Due Soon</option>
                  <option value="favorite">Favorite</option>
                  <option value="personal">Personal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Save
              </button>
            </div>
          </form>
          <Dialog.Close asChild>
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}