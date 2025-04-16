import { Knot } from '../types';
import { Anchor, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface KnotCardProps {
  knot: Knot;
}

export const KnotCard = ({ knot }: KnotCardProps) => {
  const difficultyColor = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
  }[knot.difficulty];

  return (
    <Link
      to={`/knot/${knot.id}`}
      className="flex flex-col bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
    >
      <div className="px-6 py-5 flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-800">{knot.name}</h3>
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <Anchor size={18} className="text-blue-600" />
          </div>
        </div>
        
        <div className="mt-2">
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${difficultyColor}`}>
            {knot.difficulty.charAt(0).toUpperCase() + knot.difficulty.slice(1)}
          </span>
        </div>
        
        <p className="mt-4 text-gray-600 text-sm line-clamp-3">{knot.description}</p>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">{knot.steps.length} steps</span>
          <span className="text-blue-600 text-sm font-medium flex items-center gap-1">
            Learn more <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
};
