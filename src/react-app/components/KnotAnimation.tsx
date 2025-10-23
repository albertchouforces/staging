import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KnotIllustration } from '@/react-app/components/KnotIllustrations';

interface KnotAnimationProps {
  currentStep: number;
  knotId: string;
  totalSteps: number;
  onStepChange: (step: number) => void;
}

export const KnotAnimation = ({ currentStep, knotId, totalSteps, onStepChange }: KnotAnimationProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Handle loading state during transitions
  useEffect(() => {
    setIsLoading(true);
    setIsAnimating(true);
    
    // Short delay for smoother transitions
    const timeout = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setIsAnimating(false), 400);
      
      // Notify parent about step change completion
      onStepChange(currentStep);
    }, 300);
    
    return () => clearTimeout(timeout);
  }, [currentStep, onStepChange]);

  return (
    <div className="w-full h-64 md:h-96 lg:h-[28rem] relative flex items-center justify-center">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div 
            key="loading"
            className="absolute inset-0 flex items-center justify-center bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </motion.div>
        ) : (
          <motion.div 
            key={`content-${currentStep}`}
            className="absolute inset-0 flex items-center justify-center bg-white"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="w-full h-full relative flex items-center justify-center p-4">
              <div className="w-full h-full flex items-center justify-center">
                <KnotIllustration 
                  knotId={knotId} 
                  stepNumber={currentStep} 
                  className="w-full h-full flex items-center justify-center" 
                />
              </div>
              <div 
                className={`absolute top-4 right-4 bg-blue-600 bg-opacity-80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium border border-blue-400 border-opacity-30 shadow-md ${isAnimating ? 'animate-pulse' : ''}`}
              >
                Step {currentStep} of {totalSteps}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
