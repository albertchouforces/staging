import { useState, useEffect } from 'react';
import { knots } from '@/react-app/data/knots';
import { KnotCard } from '@/react-app/components/KnotCard';
import { Anchor, Filter, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FEATURE_FLAGS } from '@/react-app/config/features';

export const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [availableKnots, setAvailableKnots] = useState(knots);
  const [visibleKnotCount, setVisibleKnotCount] = useState(0);

  // Filter and sort knots based on search term and difficulty
  useEffect(() => {
    const filtered = knots.filter(knot => {
      const matchesSearch = 
        knot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        knot.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        knot.useCases.some(useCase => useCase.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesDifficulty = !difficulty || knot.difficulty === difficulty;
      
      return matchesSearch && matchesDifficulty;
    });
    
    // Sort knots by difficulty (beginner → intermediate → advanced) then alphabetically
    const sorted = [...filtered].sort((a, b) => {
      // First sort by difficulty
      const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 };
      const difficultyComparison = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      
      // If difficulty is the same, sort alphabetically by name
      if (difficultyComparison === 0) {
        return a.name.localeCompare(b.name);
      }
      
      return difficultyComparison;
    });
    
    setAvailableKnots(sorted);
  }, [searchTerm, difficulty]);

  // Animation effect to count visible knots
  useEffect(() => {
    // Small delay to allow the animation to complete
    const timer = setTimeout(() => {
      setVisibleKnotCount(availableKnots.length);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [availableKnots]);

  const clearFilters = () => {
    setSearchTerm('');
    setDifficulty(null);
  };

  const hasActiveFilters = searchTerm !== '' || difficulty !== null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center text-center mb-10">
        <motion.div 
          className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Anchor size={32} className="text-white" strokeWidth={1.5} />
        </motion.div>
        <motion.h1 
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          Naval Knots
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-600 max-w-2xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          Master essential naval knots with step-by-step tutorials and practical use cases
        </motion.p>
        
        {FEATURE_FLAGS.ENABLE_SCENARIOS && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6"
          >
            <Link 
              to="/scenarios" 
              className="group relative overflow-hidden px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-400 inline-block max-w-lg w-full"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-70 transition-opacity duration-300"></span>
              <div className="relative z-10">
                <span className="flex items-center justify-center text-lg">
                  Try Scenarios
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </span>
                <span className="block mt-1 text-sm text-blue-100 font-normal">
                  Are you familiar with all the knots? Test yourself on when to apply each knot for a given scenario.
                </span>
              </div>
            </Link>
          </motion.div>
        )}
      </div>

      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search knots by name, description, or use case..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                onClick={() => setSearchTerm('')}
              >
                <X size={18} />
              </button>
            )}
          </div>
          
          <div className="flex gap-2">
            <div className="relative inline-block">
              <select
                className="appearance-none bg-white pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={difficulty || ''}
                onChange={(e) => setDifficulty(e.target.value || null)}
              >
                <option value="">All difficulties</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={18} className="text-gray-400" />
              </div>
            </div>
            
            {hasActiveFilters && (
              <button 
                className="px-4 py-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 flex items-center gap-1"
                onClick={clearFilters}
              >
                <X size={16} /> Clear
              </button>
            )}
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {visibleKnotCount > 0 ? (
              <span>Showing {visibleKnotCount} {visibleKnotCount === 1 ? 'knot' : 'knots'}</span>
            ) : searchTerm || difficulty ? (
              <span>No knots match your filters</span>
            ) : (
              <span>Loading knots...</span>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {availableKnots.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {availableKnots.map((knot, index) => (
              <motion.div
                key={knot.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <KnotCard knot={knot} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200"
          >
            <p className="text-gray-500 mb-2">No knots found matching your criteria</p>
            <button 
              onClick={clearFilters}
              className="text-blue-500 underline hover:text-blue-700"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
