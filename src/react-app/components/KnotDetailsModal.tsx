import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { knots } from '@/react-app/data/knots';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { KnotAnimation } from '@/react-app/components/KnotAnimation';
import { KnotStep } from '@/react-app/components/KnotStep';
import { UseCasesList } from '@/react-app/components/UseCasesList';

interface KnotDetailsModalProps {
  knotId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const KnotDetailsModal = ({ knotId, isOpen, onClose }: KnotDetailsModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const knot = knots.find(k => k.id === knotId);

  // Reset state when knot changes or modal opens/closes
  useEffect(() => {
    setCurrentStep(1);
  }, [knotId, isOpen]);

  // Prevent scrolling of the background when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!knot) {
    return null;
  }

  const handleStepChange = () => {
    // This is called when the animation completes a step change
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if the backdrop itself is clicked, not its children
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleNextStep = () => {
    if (currentStep < knot.steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">{knot.name}</h2>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            
            <div className="overflow-y-auto p-5">
              <p className="text-gray-600 mb-6">{knot.description}</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:items-start">
                <div>
                  <div className="relative w-full rounded-lg overflow-hidden shadow-lg knot-animation-container bg-gray-50 flex flex-col">
                    <KnotAnimation 
                      currentStep={currentStep}
                      knotId={knot.id}
                      totalSteps={knot.steps.length}
                      onStepChange={handleStepChange}
                    />
                    
                    {/* Navigation step counter */}
                    <div className="flex justify-between items-center p-3 bg-gray-50 border-t border-gray-200">
                      <div className="text-sm font-medium text-gray-600">
                        Step {currentStep} of {knot.steps.length}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <button 
                      onClick={handlePreviousStep}
                      disabled={currentStep === 1}
                      className={`px-4 py-2 rounded-md flex items-center gap-1 transition-all duration-200 ${
                        currentStep === 1 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200 hover:shadow-md'
                      }`}
                    >
                      <ChevronLeft size={18} /> Previous
                    </button>
                    
                    <div className="flex items-center gap-1">
                      {Array.from({length: knot.steps.length}).map((_, idx) => (
                        <button 
                          key={idx}
                          onClick={() => setCurrentStep(idx + 1)}
                          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                            idx + 1 === currentStep 
                              ? 'bg-blue-600 scale-125' 
                              : idx + 1 < currentStep 
                                ? 'bg-blue-300' 
                                : 'bg-gray-300'
                          }`}
                          aria-label={`Go to step ${idx + 1}`}
                        />
                      ))}
                    </div>
                    
                    <button 
                      onClick={handleNextStep}
                      disabled={currentStep === knot.steps.length}
                      className={`px-4 py-2 rounded-md flex items-center gap-1 transition-all duration-200 ${
                        currentStep === knot.steps.length 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200 hover:shadow-md'
                      }`}
                    >
                      Next <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Instructions</h3>
                  
                  <div className="space-y-3">
                    {knot.steps.map((step, index) => (
                      <div 
                        key={index}
                        className="cursor-pointer"
                        onClick={() => setCurrentStep(index + 1)}
                      >
                        <KnotStep 
                          stepNumber={index + 1}
                          totalSteps={knot.steps.length}
                          description={step.description}
                          isActive={currentStep === index + 1}
                        />
                      </div>
                    ))}
                  </div>
                  
                  <UseCasesList useCases={knot.useCases} />
                </div>
              </div>
            </div>
            
            <div className="p-5 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">
                  Difficulty: <span className="font-medium capitalize">{knot.difficulty}</span>
                </span>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Continue Practice
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
