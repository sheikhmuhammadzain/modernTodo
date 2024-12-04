import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Zap } from 'lucide-react';
import { useTodoStore } from '../store/todo-store';
import { format, isToday, isTomorrow } from 'date-fns';

export function SmartSuggestions() {
  const todos = useTodoStore((state) => state.todos);
  
  const suggestions = React.useMemo(() => {
    const overdueTasks = todos.filter(
      todo => todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed
    );
    
    const todayTasks = todos.filter(
      todo => todo.dueDate && isToday(new Date(todo.dueDate)) && !todo.completed
    );
    
    const tomorrowTasks = todos.filter(
      todo => todo.dueDate && isTomorrow(new Date(todo.dueDate)) && !todo.completed
    );
    
    return {
      overdue: overdueTasks,
      today: todayTasks,
      tomorrow: tomorrowTasks
    };
  }, [todos]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 mb-8"
    >
      <div className="flex items-center gap-3 mb-4">
        <Lightbulb className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold">Smart Suggestions</h3>
      </div>

      <div className="space-y-4">
        {suggestions.overdue.length > 0 && (
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-3 text-red-600"
          >
            <Zap className="w-4 h-4" />
            <p>You have {suggestions.overdue.length} overdue tasks!</p>
          </motion.div>
        )}

        {suggestions.today.length > 0 && (
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3 text-purple-600"
          >
            <Zap className="w-4 h-4" />
            <p>Focus on your {suggestions.today.length} tasks for today</p>
          </motion.div>
        )}

        {suggestions.tomorrow.length > 0 && (
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 text-blue-600"
          >
            <Zap className="w-4 h-4" />
            <p>Plan ahead: {suggestions.tomorrow.length} tasks due tomorrow</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}