import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { knots } from '@/react-app/data/knots';
import { KnotStep } from '@/react-app/components/KnotStep';
import { KnotAnimation } from '@/react-app/components/KnotAnimation';
import { UseCasesList } from '@/react-app/components/UseCasesList';
import { AutoPlayControls } from '@/react-app/components/AutoPlayControls';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

export const KnotDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [currentStep, setCurrentStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalTime, setIntervalTime] = useState(() => {
    // Load saved interval time from localStorage
    const savedTime = localStorage.getItem('knotIntervalTime');
    return savedTime ? parseInt(savedTime, 10) : 10; // Default 10 seconds
  });
  const [timeLeft, setTimeLeft] = useState(intervalTime);
  
  // Use refs to maintain state during renders
  const isPlayingRef = useRef(false);
  const timerRef = useRef<number | null>(null);
  const lastStateChangeTimeRef = useRef(Date.now());
  
  const knot = knots.find(k => k.id === id);

  // Toggle play/pause state
  const togglePlay = () => {
    const now = Date.now();
    // Prevent rapid state changes (debounce-like behavior)
    if (now - lastStateChangeTimeRef.current < 300) return;
    
    lastStateChangeTimeRef.current = now;
    
    // Toggle the play state in both the ref and state
    isPlayingRef.current = !isPlayingRef.current;
    setIsPlaying(!isPlaying);
    
    if (!isPlaying) {
      // Reset timer when starting
      setTimeLeft(intervalTime);
    }
  };

  // Handle the auto-play timer logic
  useEffect(() => {
    // Clear any existing timer first
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    // Only set up timer if we're playing
    if (isPlayingRef.current) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Move to next step when timer reaches 0
            if (currentStep < (knot?.steps.length || 0)) {
              setCurrentStep(currentStep + 1);
            } else {
              // Loop back to step 1 when reaching the end
              setCurrentStep(1);
            }
            return intervalTime; // Reset timer for next step
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    // Clean up timer on unmount
    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying, currentStep, intervalTime, knot?.steps.length]);

  // Make sure isPlayingRef and isPlaying stay in sync
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Handle step transitions without resetting play state
  useEffect(() => {
    setTimeLeft(intervalTime);
  }, [currentStep, intervalTime]);

  // Reset state when knot changes
  useEffect(() => {
    setCurrentStep(1);
    setIsPlaying(false);
    isPlayingRef.current = false;
    setTimeLeft(intervalTime);
    
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [id, intervalTime]);

  // Save interval time to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('knotIntervalTime', intervalTime.toString());
  }, [intervalTime]);

  if (!knot) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Knot not found</h2>
        <Link to="/" className="text-blue-600 hover:underline flex items-center justify-center gap-1">
          <ArrowLeft size={16} /> Back to all knots
        </Link>
      </div>
    );
  }

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
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-display">{knot.name}</h1>
          <p className="text-gray-700 mb-6">{knot.description}</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:items-start">
            <div>
              {/* Animation component - now without built-in controls */}
              <div className="relative w-full rounded-lg overflow-hidden shadow-lg knot-animation-container bg-gray-50 flex flex-col">
                <KnotAnimation 
                  currentStep={currentStep}
                  knotId={knot.id}
                  totalSteps={knot.steps.length}
                  onStepChange={setCurrentStep}
                  key={`${knot.id}-animation`}
                />
                
                {/* Detached controls with its own state */}
                <AutoPlayControls 
                  isPlaying={isPlaying}
                  togglePlay={togglePlay}
                  intervalTime={intervalTime}
                  setIntervalTime={setIntervalTime}
                  currentStep={currentStep}
                  totalSteps={knot.steps.length}
                  timeLeft={timeLeft}
                  looping={true}
                />
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
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Step-by-Step Instructions</h2>
              
              <div className="space-y-3">
                {knot.steps.map((step, index) => (
                  <KnotStep 
                    key={index}
                    stepNumber={index + 1}
                    totalSteps={knot.steps.length}
                    description={step.description}
                    isActive={currentStep === index + 1}
                  />
                ))}
              </div>
              
              <UseCasesList useCases={knot.useCases} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-8 mb-4">
        <Link 
          to="/" 
          className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 group"
        >
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" /> 
          Back to all knots
        </Link>
      </div>
    </div>
  );
};
