import { useState } from 'react';
import { knots } from '../data/knots';
import { KnotCard } from '../components/KnotCard';
import { Anchor, Search } from 'lucide-react';

export const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredKnots = knots.filter(knot => 
    knot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    knot.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center text-center mb-10">
        <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
          <Anchor size={32} className="text-white" strokeWidth={1.5} />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">KnotCraft</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Master essential naval knots with step-by-step tutorials and practical use cases
        </p>
      </div>

      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search knots..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredKnots.map(knot => (
          <KnotCard key={knot.id} knot={knot} />
        ))}
      </div>

      {filteredKnots.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No knots found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};
