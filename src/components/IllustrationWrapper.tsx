import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface IllustrationWrapperProps {
  children: ReactNode;
  title: string;
  stepNumber: number;
  className?: string;
}

export const IllustrationWrapper: FC<IllustrationWrapperProps> = ({ 
  children, 
  title, 
  stepNumber,
  className = ""
}) => {
  return (
    <motion.div 
      className={`relative w-full h-full flex items-center justify-center ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key={`${title}-step-${stepNumber}`}
      transition={{ duration: 0.3 }}
    >
      {children}
      <div className="absolute bottom-4 left-4 z-10">
        <motion.div 
          className="bg-white bg-opacity-70 backdrop-blur-sm text-blue-900 px-3 py-2 rounded-md text-sm inline-block shadow-lg"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {title} - Step {stepNumber}
        </motion.div>
      </div>
    </motion.div>
  );
};
