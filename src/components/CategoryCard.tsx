import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  count: number;
  color: string;
}

export function CategoryCard({ icon: Icon, title, count, color }: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.2)'
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      className={`${color} rounded-2xl p-6 cursor-pointer relative overflow-hidden backdrop-blur-sm`}
    >
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_0%_0%,_transparent_50%,_white_100%)]" />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Icon className="w-8 h-8 text-white mb-3" />
      </motion.div>
      <motion.h3 
        className="text-white font-semibold text-lg"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {title}
      </motion.h3>
      <motion.div 
        className="flex items-center mt-3"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <span className="text-white/90 font-medium">{count} tasks</span>
      </motion.div>
    </motion.div>
  );
}