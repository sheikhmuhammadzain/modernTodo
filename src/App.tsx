import React from 'react';
import { Bell, Calendar, Heart, ListTodo, Menu, Plus, User, Layout, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CategoryCard } from './components/CategoryCard';
import { TaskCard } from './components/TaskCard';
import { TaskDialog } from './components/TaskDialog';
import { Analytics } from './components/Analytics';
import { SmartSuggestions } from './components/SmartSuggestions';
import { useTodoStore } from './store/todo-store';
import { ViewMode } from './types/todo';

import zain from './zain.jpg';

function App() {
  const {
    todos,
    viewMode,
    addTodo,
    toggleTodo,
    removeTodo,
    updateTodo,
    setViewMode,
  } = useTodoStore();
  
  const [quote, setQuote] = React.useState('');
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingTodo, setEditingTodo] = React.useState<string | null>(null);
  const [showAnalytics, setShowAnalytics] = React.useState(false);

  React.useEffect(() => {
    fetch('https://api.quotable.io/random')
      .then((res) => res.json())
      .then((data) => setQuote(data.content));
  }, []);

  const handleEdit = (id: string) => {
    setEditingTodo(id);
    setIsDialogOpen(true);
  };

  const handleSave = (todo: any) => {
    if (editingTodo) {
      updateTodo(editingTodo, todo);
      setEditingTodo(null);
    } else {
      addTodo(todo);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto p-4 pb-20">
        <header className="flex items-center justify-between mb-8">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">ZainSheikhTodo</h1>
          <img
            src={zain}
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-purple-600"
          />
        </header>

        <div className="mb-6">
          <p className="text-gray-600 italic text-sm">{quote}</p>
        </div>

        <SmartSuggestions />

        <div className="grid grid-cols-2 gap-4 mb-8">
          <CategoryCard
            icon={Bell}
            title="Immediate Tasks"
            count={todos.filter((t) => t.category === 'immediate').length}
            color="bg-blue-400"
          />
          <CategoryCard
            icon={Calendar}
            title="Task Due Soon"
            count={todos.filter((t) => t.category === 'due-soon').length}
            color="bg-pink-400"
          />
          <CategoryCard
            icon={Heart}
            title="Favourite Tasks"
            count={todos.filter((t) => t.category === 'favorite').length}
            color="bg-green-400"
          />
          <CategoryCard
            icon={ListTodo}
            title="Personal Tasks"
            count={todos.filter((t) => t.category === 'personal').length}
            color="bg-orange-400"
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Ongoing Tasks</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAnalytics(!showAnalytics)}
              className={`p-2 rounded-lg ${
                showAnalytics
                  ? 'bg-purple-100 text-purple-600'
                  : 'text-gray-400 hover:bg-gray-100'
              }`}
            >
              <BarChart2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${
                viewMode === 'list'
                  ? 'bg-purple-100 text-purple-600'
                  : 'text-gray-400 hover:bg-gray-100'
              }`}
            >
              <ListTodo className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-2 rounded-lg ${
                viewMode === 'kanban'
                  ? 'bg-purple-100 text-purple-600'
                  : 'text-gray-400 hover:bg-gray-100'
              }`}
            >
              <Layout className="w-5 h-5" />
            </button>
          </div>
        </div>

        {showAnalytics ? (
          <Analytics />
        ) : (
          <AnimatePresence>
            {todos.map((todo) => (
              <TaskCard
                key={todo.id}
                todo={todo}
                onToggle={() => toggleTodo(todo.id)}
                onDelete={() => removeTodo(todo.id)}
                onEdit={() => handleEdit(todo.id)}
              />
            ))}
          </AnimatePresence>
        )}

        <TaskDialog
          todo={editingTodo ? todos.find((t) => t.id === editingTodo) : undefined}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSave={handleSave}
        />

        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
          <div className="max-w-lg mx-auto px-6 py-2 flex items-center justify-between">
            <button className="p-2 text-purple-600">
              <motion.div whileTap={{ scale: 0.9 }}>
                <User className="w-6 h-6" />
              </motion.div>
            </button>
            <button
              onClick={() => {
                setEditingTodo(null);
                setIsDialogOpen(true);
              }}
              className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg"
            >
              <motion.div whileTap={{ scale: 0.9 }}>
                <Plus className="w-6 h-6" />
              </motion.div>
            </button>
            <button className="p-2 text-purple-600">
              <motion.div whileTap={{ scale: 0.9 }}>
                <Calendar className="w-6 h-6" />
              </motion.div>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default App;