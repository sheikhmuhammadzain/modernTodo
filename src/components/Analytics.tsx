import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format, startOfWeek, endOfWeek } from 'date-fns';
import CalendarHeatmap from 'react-calendar-heatmap';
import { useTodoStore } from '../store/todo-store';
import { motion } from 'framer-motion';

export function Analytics() {
  const todos = useTodoStore((state) => state.todos);
  
  // Calculate completion rate by category
  const categoryData = React.useMemo(() => {
    const categories = ['immediate', 'due-soon', 'favorite', 'personal'];
    return categories.map(category => {
      const tasksInCategory = todos.filter(todo => todo.category === category);
      const completedTasks = tasksInCategory.filter(todo => todo.completed);
      return {
        category,
        total: tasksInCategory.length,
        completed: completedTasks.length,
        rate: tasksInCategory.length ? (completedTasks.length / tasksInCategory.length) * 100 : 0
      };
    });
  }, [todos]);

  // Calculate daily activity
  const dailyActivity = React.useMemo(() => {
    const today = new Date();
    const startDate = startOfWeek(today);
    const endDate = endOfWeek(today);
    
    const activityMap = new Map();
    todos.forEach(todo => {
      const date = format(todo.updatedAt, 'yyyy-MM-dd');
      activityMap.set(date, (activityMap.get(date) || 0) + 1);
    });

    return Array.from(activityMap.entries()).map(([date, count]) => ({
      date,
      count
    }));
  }, [todos]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h3 className="text-lg font-semibold mb-4">Task Completion by Category</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="rate" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Activity Heatmap</h3>
        <CalendarHeatmap
          startDate={startOfWeek(new Date())}
          endDate={endOfWeek(new Date())}
          values={dailyActivity}
          classForValue={(value) => {
            if (!value) return 'color-empty';
            return `color-scale-${Math.min(Math.floor(value.count / 2), 4)}`;
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Total Tasks</h4>
          <p className="text-3xl font-bold text-gray-900">{todos.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Completion Rate</h4>
          <p className="text-3xl font-bold text-gray-900">
            {Math.round((todos.filter(t => t.completed).length / todos.length) * 100)}%
          </p>
        </div>
      </div>
    </motion.div>
  );
}