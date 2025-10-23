import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CircleCheck, CircleX, House, RefreshCw, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ScenarioSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
  correctCount: number;
  totalCount: number;
}

export const ScenarioSummaryModal: FC<ScenarioSummaryModalProps> = ({
  isOpen,
  onClose,
  onRestart,
  correctCount,
  totalCount
}) => {
  const [isRestarting, setIsRestarting] = useState(false);
  
  // Safety check for invalid data
  if (!isOpen) return null;
  
  const incorrectCount = totalCount - correctCount;
  
  // Calculate percentage with safeguards to prevent NaN
  let percentCorrect = 0;
  if (totalCount > 0) {
    percentCorrect = Math.round((correctCount / totalCount) * 100);
  }
  
  const handleRestart = () => {
    setIsRestarting(true);
    // Add a slight delay for animation
    setTimeout(() => {
      // Call the restart function passed from parent
      onRestart();
      // Reset local state
      setIsRestarting(false);
    }, 400);
  };

  // Determine feedback message based on score
  const getFeedbackMessage = () => {
    if (percentCorrect >= 90) {
      return "Outstanding! You're a knot-tying expert!";
    } else if (percentCorrect >= 75) {
      return "Great job! You've mastered most of the knots.";
    } else if (percentCorrect >= 50) {
      return "Good work! Keep practicing to improve your knot selection.";
    } else {
      return "Keep practicing! Knot selection takes time to master.";
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
        >
          <motion.div
            className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            <div className="p-6 text-center">
              <motion.div 
                className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 360 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <Trophy size={40} className="text-blue-600" />
              </motion.div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Scenarios Complete!</h2>
              <p className="text-gray-600 mb-6">{getFeedbackMessage()}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                  <div className="flex items-center justify-center mb-2">
                    <CircleCheck className="text-green-500 mr-2" size={24} />
                    <span className="text-2xl font-bold text-green-700">{correctCount}</span>
                  </div>
                  <p className="text-green-800 text-sm">Correct</p>
                </div>
                
                <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                  <div className="flex items-center justify-center mb-2">
                    <CircleX className="text-red-500 mr-2" size={24} />
                    <span className="text-2xl font-bold text-red-700">{incorrectCount}</span>
                  </div>
                  <p className="text-red-800 text-sm">Incorrect</p>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-blue-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentCorrect}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
                <p className="text-lg font-medium text-gray-700 mt-2">
                  {percentCorrect}% Success Rate
                </p>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={handleRestart}
                  disabled={isRestarting}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  <RefreshCw size={18} className={isRestarting ? "animate-spin" : ""} />
                  Restart Scenarios
                </button>
                
                <Link
                  to="/"
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  onClick={onClose}
                >
                  <House size={18} />
                  Back to Knots
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScenarioSummaryModal;
