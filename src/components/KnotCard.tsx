import { Knot } from '../types';
import { Anchor, ArrowRight} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface KnotCardProps {
  knot: Knot;
}

export const KnotCard = ({ knot }: KnotCardProps) => {
  const difficultyColor = {
    beginner: 'bg-green-100 text-green-800 border-green-200',
    intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    advanced: 'bg-red-100 text-red-800 border-red-200',
  }[knot.difficulty];

  const difficultyIcon = {
    beginner: '●',
    intermediate: '●●',
    advanced: '●●●',
  }[knot.difficulty];

  return (
    <Link
      to={`/knot/${knot.id}`}
      className="flex flex-col bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 h-full group hover:border-blue-200"
    >
      <div className="px-6 py-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{knot.name}</h3>
          <motion.div 
            className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
          >
            <Anchor size={18} className="text-blue-600" />
          </motion.div>
        </div>
        
        <div className="mt-2 flex items-center gap-2">
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${difficultyColor}`}>
            {knot.difficulty.charAt(0).toUpperCase() + knot.difficulty.slice(1)}
          </span>
          <span className="text-xs text-gray-400" title="Difficulty level">
            {difficultyIcon}
          </span>
        </div>
        
        <p className="mt-3 text-gray-600 text-sm line-clamp-3 flex-grow">{knot.description}</p>
        
        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-sm text-gray-700 font-medium">{knot.steps.length} steps</span>
            <span className="text-xs text-gray-500">{Math.ceil(knot.steps.length * 1.5)} min to learn</span>
          </div>
          <motion.div 
            className="flex items-center gap-1 text-blue-600 text-sm font-medium group-hover:translate-x-1 transition-transform"
            whileHover={{ x: 3 }}
          >
            Learn<span className="hidden sm:inline"> more</span> <ArrowRight size={16} />
          </motion.div>
        </div>
      </div>
    </Link>
  );
};
