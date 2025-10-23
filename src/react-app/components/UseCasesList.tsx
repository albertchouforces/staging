import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface UseCasesListProps {
  useCases: string[];
}

export const UseCasesList = ({ useCases }: UseCasesListProps) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Common Uses:</h3>
      <div className="space-y-2">
        {useCases.map((useCase, index) => (
          <motion.div 
            key={index}
            className="flex items-start gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Check className="text-green-600 mt-0.5 flex-shrink-0" size={18} />
            <p className="text-gray-700">{useCase}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
