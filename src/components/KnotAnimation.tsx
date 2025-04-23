import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KnotIllustration } from './KnotIllustrations';

interface KnotAnimationProps {
  currentStep: number;
  knotId: string;
}

export const KnotAnimation = ({ currentStep, knotId }: KnotAnimationProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevStep = useRef(currentStep);
  
  useEffect(() => {
    // Handle step transitions with loading states
    if (prevStep.current !== currentStep) {
      setIsLoading(true);
      setIsAnimating(true);
      
      // Short delay to show loading state before showing the new illustration
      const timeout = setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => setIsAnimating(false), 600);
      }, 500);
      
      prevStep.current = currentStep;
      return () => clearTimeout(timeout);
    } else {
      setIsLoading(false);
    }
  }, [currentStep]);

  return (
    <motion.div 
      className="relative w-full h-64 md:h-96 lg:h-[28rem] rounded-lg overflow-hidden shadow-lg knot-animation-container bg-gray-50"
      initial={{ opacity: 0.8 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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
            <div className="w-full h-full relative flex items-center justify-center p-2">
              <KnotIllustration 
                knotId={knotId} 
                stepNumber={currentStep} 
                className="w-full h-full" 
              />
              <div 
                className={`absolute top-4 right-4 bg-blue-600 bg-opacity-80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium border border-blue-400 border-opacity-30 shadow-md ${isAnimating ? 'animate-pulse' : ''}`}
              >
                Step {currentStep}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
