import { motion } from 'framer-motion';

interface KnotStepProps {
  stepNumber: number;
  totalSteps: number;
  description: string;
  isActive: boolean;
}

export const KnotStep = ({ stepNumber, totalSteps, description, isActive }: KnotStepProps) => {
  return (
    <motion.div 
      className={`p-4 rounded-lg mb-3 border ${isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: isActive ? 1.02 : 1,
        boxShadow: isActive ? '0 4px 12px rgba(59, 130, 246, 0.15)' : '0 1px 3px rgba(0, 0, 0, 0.05)'
      }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-center gap-3">
        <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
          {stepNumber}
        </div>
        <div className="flex-1">
          <p className={`${isActive ? 'text-blue-800' : 'text-gray-700'}`}>{description}</p>
        </div>
      </div>
      <div className="ml-11 mt-1">
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${(stepNumber / totalSteps) * 100}%` }}></div>
        </div>
      </div>
    </motion.div>
  );
};
