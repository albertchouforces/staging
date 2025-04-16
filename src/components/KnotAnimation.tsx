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
      }, 300);
      
      prevStep.current = currentStep;
      return () => clearTimeout(timeout);
    } else {
      setIsLoading(false);
    }
  }, [currentStep]);

  return (
    <motion.div 
      className="relative w-full h-64 md:h-96 lg:h-[28rem] bg-gradient-to-br from-blue-950 to-blue-600 rounded-lg overflow-hidden shadow-lg knot-animation-container"
      initial={{ opacity: 0.8 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div 
            key="loading"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-16 h-16 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
          </motion.div>
        ) : (
          <motion.div 
            key={`content-${currentStep}`}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="w-full h-full relative flex items-center justify-center">
              <KnotIllustration 
                knotId={knotId} 
                stepNumber={currentStep} 
                className="w-full h-full svg-container" 
              />
              <div 
                className={`absolute top-4 right-4 bg-white bg-opacity-15 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium border border-white border-opacity-20 ${isAnimating ? 'animate-pulse' : ''}`}
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
