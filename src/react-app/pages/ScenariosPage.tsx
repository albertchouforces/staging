import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, ChevronRight, CircleHelp, LifeBuoy, Lightbulb, X } from 'lucide-react';
import { scenarios as allScenarios } from '@/react-app/data/scenarios';
import { knots as allKnots } from '@/react-app/data/knots';
import { Scenario, Knot } from '@/react-app/types';
import { KnotDetailsModal } from '@/react-app/components/KnotDetailsModal';
import ScenarioImage from '@/react-app/components/ScenarioImage';
import ScenarioSummaryModal from '@/react-app/components/ScenarioSummaryModal';

// Function to shuffle an array (Fisher-Yates algorithm)
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const ScenariosPage = () => {
  // Shuffle scenarios on initial load and extract only the knots used in scenarios
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  // State variables for scenarios page
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  // Removed unused hoveredKnotId state
  const [selectedKnotId, setSelectedKnotId] = useState<string | null>(null);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalKnotId, setModalKnotId] = useState<string>('');
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [hasCompletedAllScenarios, setHasCompletedAllScenarios] = useState<boolean>(false);
  const [currentKnotOptions, setCurrentKnotOptions] = useState<Knot[]>([]);

  // Get all knots data directly when needed instead of storing in state

  // Initialize shuffled scenarios - only run once on mount
  useEffect(() => {
    // Only set scenarios if they haven't been set yet
    if (scenarios.length === 0) {
      setScenarios(shuffleArray(allScenarios));
    }
    
    // Simulate loading to ensure animations work properly
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures this only runs once on mount

  // Generate 4 knot options (1 correct, 3 random) whenever the current scenario changes
  useEffect(() => {
    if (scenarios.length > 0 && currentScenarioIndex < scenarios.length) {
      const currentScenario = scenarios[currentScenarioIndex];
      const correctKnot = allKnots.find(k => k.id === currentScenario.knot);
      
      if (correctKnot) {
        // Get all incorrect knots (filter out the correct one)
        const incorrectKnots = allKnots.filter(k => k.id !== currentScenario.knot);
        
        // Randomly select 3 incorrect knots
        const randomIncorrectKnots = shuffleArray(incorrectKnots).slice(0, 3);
        
        // Combine and shuffle all options
        const options = shuffleArray([correctKnot, ...randomIncorrectKnots]);
        
        setCurrentKnotOptions(options);
      }
    }
  }, [scenarios, currentScenarioIndex]);

  const currentScenario = scenarios[currentScenarioIndex];

  const handleKnotSelect = (knotId: string) => {
    setSelectedKnotId(knotId);
    setFeedbackVisible(true);
    
    const isAnswerCorrect = knotId === currentScenario.knot;
    setIsCorrect(isAnswerCorrect);
    
    // Track correct and incorrect answers
    if (isAnswerCorrect) {
      setCorrectAnswers(prev => prev + 1);
    } else {
      setIncorrectAnswers(prev => prev + 1);
    }
  };

  const handleNextScenario = () => {
    setSelectedKnotId(null);
    setFeedbackVisible(false);
    setIsHintVisible(false);
    
    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
    } else {
      // Completed all scenarios, show summary
      setHasCompletedAllScenarios(true);
      setShowSummary(true);
    }
  };

  const toggleHint = () => {
    setIsHintVisible(!isHintVisible);
  };

  const resetProgress = () => {
    // Close the summary modal first
    setShowSummary(false);
    
    // Reset UI state
    setSelectedKnotId(null);
    setFeedbackVisible(false);
    setIsHintVisible(false);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setHasCompletedAllScenarios(false);
    
    // Reset to first scenario first
    setCurrentScenarioIndex(0);
    
    // Then reshuffle scenarios in a controlled way with a slight delay
    // to prevent state update conflicts
    setTimeout(() => {
      const newScenarios = shuffleArray(allScenarios);
      setScenarios(newScenarios);
      
      // Force a re-render to ensure clean state
      window.scrollTo(0, 0);
    }, 50);
  };
  
  const navigate = useNavigate();
  
  const handleSummaryClose = () => {
    setShowSummary(false);
    // Reset state if user was at the end of scenarios
    if (hasCompletedAllScenarios) {
      // Navigate back to home
      navigate('/');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading scenarios...</p>
        </div>
      </div>
    );
  }

  // Calculate progress based on current question position
  // Add safety check to prevent NaN
  const progressPercentage = scenarios.length > 0 
    ? Math.round(((currentScenarioIndex + 1) / scenarios.length) * 100)
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-col items-center text-center">
          <motion.div 
            className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Lightbulb size={32} className="text-white" strokeWidth={1.5} />
          </motion.div>
          <motion.h1 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Knot Scenarios
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            Test your knowledge by choosing the right knot for each practical scenario
          </motion.p>
        
          <motion.div 
            className="mt-4 w-full max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Scenario {currentScenarioIndex + 1} of {scenarios.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 relative">
              {/* Progress bar showing current question */}
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-500" 
                style={{ width: `${progressPercentage}%` }}
              />
              
              {/* Current scenario indicator - aligned with progress percentage */}
              <div 
                className="absolute top-0 h-3 w-1.5 bg-white border-2 border-blue-700 rounded-full transition-all duration-300"
                style={{ 
                  left: `${progressPercentage}%`,
                  transform: 'translateX(-50%)'
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="mb-6 flex justify-between items-center">
            <Link 
              to="/" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              <ArrowLeft size={18} className="mr-1" /> 
              Back to Knots
            </Link>
            <button 
              onClick={resetProgress}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Reset Progress
            </button>
          </div>
          
          <motion.div
            key={`scenario-${currentScenarioIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            {/* Display scenario image if available */}
            {currentScenario && currentScenario.image && (
              <ScenarioImage 
                src={currentScenario.image} 
                alt={`Scenario illustration for ${currentScenario.use}`} 
              />
            )}
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Scenario:</h2>
              <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                <p className="text-gray-800 leading-relaxed">{currentScenario?.scenario}</p>
              </div>
              
              <div className="mt-6 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-700">Which knot would you use?</h3>
                <button 
                  onClick={toggleHint}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  <CircleHelp size={16} />
                  {isHintVisible ? "Hide hint" : "Show hint"}
                </button>
              </div>
              
              <AnimatePresence>
                {isHintVisible && (
                  <motion.div 
                    className="mt-3 bg-yellow-50 p-4 rounded-md border border-yellow-100"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-yellow-800">
                      <span className="font-medium">Hint:</span> You need a knot that's suitable for {currentScenario?.use.toLowerCase().replace(/\.$/, '')}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {currentKnotOptions.map((knot) => {
                return (
                  <button
                    key={knot.id}
                    onClick={() => handleKnotSelect(knot.id)}
                    
                    disabled={feedbackVisible}
                    className={`p-4 text-left rounded-md border transition-colors duration-200 ${
                      selectedKnotId === knot.id 
                        ? isCorrect 
                          ? 'bg-green-50 border-green-300 ring-2 ring-green-300' 
                          : 'bg-red-50 border-red-300 ring-2 ring-red-300'
                        : feedbackVisible && knot.id === currentScenario?.knot
                          ? 'bg-green-50 border-green-300 ring-2 ring-green-300' // Highlight correct answer only after user has made a selection
                          : 'bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 text-lg">{knot.name}</h4>
                      {selectedKnotId === knot.id && (
                        <div className={`flex-shrink-0 ml-2 ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                          {isCorrect ? <Check size={20} /> : <X size={20} />}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            
            <AnimatePresence>
              {feedbackVisible && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`p-5 rounded-lg mb-6 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 p-1.5 rounded-full ${isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {isCorrect ? <Check size={20} /> : <X size={20} />}
                    </div>
                    <div>
                      <h4 className={`font-semibold text-lg ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                        {isCorrect ? 'Correct!' : 'Not quite right'}
                      </h4>
                      <div className="mt-2">
                        <p className="text-gray-700 mb-2">
                          <span className="font-medium">Best knot:</span> {allKnots.find(k => k.id === currentScenario?.knot)?.name}
                        </p>
                        <p className="text-gray-700 mb-2">
                          <span className="font-medium">Primary use:</span> {currentScenario?.use}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">Why it's best for this scenario:</span> {currentScenario?.why}
                        </p>
                      </div>
                      
                      <div className="mt-4 pt-2 border-t border-gray-200">
                        <button 
                          onClick={() => {
                            setModalKnotId(currentScenario?.knot || '');
                            setIsModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                        >
                          Learn more about this knot <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={handleNextScenario}
                className={`flex items-center gap-1 px-6 py-2 rounded-lg ${
                  feedbackVisible
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!feedbackVisible}
              >
                {currentScenarioIndex === scenarios.length - 1 ? 'Finish Scenarios' : 'Next Scenario'} <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        </div>
        
        <div className="mt-8 bg-blue-50 p-5 rounded-lg border border-blue-100">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <LifeBuoy size={24} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Learning Tip</h3>
              <p className="text-blue-800">
                Remember that in real maritime situations, the choice of knot depends on many factors including 
                the specific application, expected load, and conditions. Always practice knots regularly 
                to build muscle memory and ensure you can tie them quickly when needed.
              </p>
            </div>
          </div>
        </div>
        
        {/* Bottom navigation removed as it's now in the header */}
      </div>
      
      {/* Knot Details Modal */}
      <KnotDetailsModal 
        knotId={modalKnotId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      
      {/* Scenario Summary Modal */}
      <ScenarioSummaryModal
        isOpen={showSummary}
        onClose={handleSummaryClose}
        onRestart={resetProgress}
        correctCount={correctAnswers}
        totalCount={correctAnswers + incorrectAnswers}
      />
    </div>
  );
};

export default ScenariosPage;
