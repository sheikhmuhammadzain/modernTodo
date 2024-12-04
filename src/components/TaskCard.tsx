import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Clock, Edit2, Flag, Trash2 } from 'lucide-react';
import { Todo } from '../types/todo';
import { format } from 'date-fns';

interface TaskCardProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export function TaskCard({ todo, onToggle, onDelete, onEdit }: TaskCardProps) {
  const priorityColors = {
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      whileHover={{ scale: 1.01 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30
      }}
      className="bg-white rounded-xl p-5 shadow-sm mb-4 border border-gray-100 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4 flex-1">
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={onToggle}
            className="mt-1 text-purple-600 hover:text-purple-700 transition-colors"
          >
            {todo.completed ? (
              <CheckCircle2 className="w-6 h-6" />
            ) : (
              <Circle className="w-6 h-6" />
            )}
          </motion.button>
          <div className="flex-1">
            <motion.h3
              layout
              className={`text-gray-800 text-lg font-medium ${
                todo.completed ? 'line-through text-gray-400' : ''
              }`}
            >
              {todo.title}
            </motion.h3>
            {todo.description && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-500 text-sm mt-2"
              >
                {todo.description}
              </motion.p>
            )}
            <motion.div 
              layout
              className="flex flex-wrap gap-2 mt-3"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                className={`text-xs px-3 py-1.5 rounded-full border ${
                  priorityColors[todo.priority]
                }`}
              >
                <Flag className="w-3 h-3 inline-block mr-1" />
                {todo.priority}
              </motion.span>
              {todo.dueDate && (
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="text-xs px-3 py-1.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200"
                >
                  <Clock className="w-3 h-3 inline-block mr-1" />
                  {format(todo.dueDate, 'MMM d, yyyy')}
                </motion.span>
              )}
              <AnimatePresence>
                {todo.labels.map((label) => (
                  <motion.span
                    key={label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-xs px-3 py-1.5 rounded-full bg-gray-50 text-gray-600 border border-gray-200"
                  >
                    {label}
                  </motion.span>
                ))}
              </AnimatePresence>
            </motion.div>
            {todo.subtasks.length > 0 && (
              <motion.div 
                layout
                className="mt-4 space-y-2"
              >
                {todo.subtasks.map((subtask) => (
                  <motion.div
                    key={subtask.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2"
                  >
                    <motion.div
                      animate={{
                        scale: subtask.completed ? 1.2 : 1,
                        backgroundColor: subtask.completed ? '#22c55e' : '#d1d5db'
                      }}
                      className={`w-2 h-2 rounded-full`}
                    />
                    <span
                      className={`text-sm ${
                        subtask.completed ? 'line-through text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {subtask.title}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onEdit}
            className="text-gray-400 hover:text-blue-500 transition-colors"
          >
            <Edit2 className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onDelete}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}