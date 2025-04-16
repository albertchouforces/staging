import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { knots } from '../data/knots';
import { KnotStep } from '../components/KnotStep';
import { KnotAnimation } from '../components/KnotAnimation';
import { UseCasesList } from '../components/UseCasesList';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

export const KnotDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [currentStep, setCurrentStep] = useState(1);
  const knot = knots.find(k => k.id === id);

  useEffect(() => {
    setCurrentStep(1);
  }, [id]);

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
      <Link to="/" className="inline-flex items-center text-blue-600 hover:underline mb-6">
        <ArrowLeft size={18} className="mr-1" /> Back to all knots
      </Link>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-display">{knot.name}</h1>
          <p className="text-gray-700 mb-6">{knot.description}</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:items-start">
            <div>
              <KnotAnimation 
                currentStep={currentStep} 
                imagePosition={knot.steps[currentStep - 1].imagePosition}
                knotId={knot.id}
                key={`${knot.id}-animation-${currentStep}`}
              />
              
              <div className="flex justify-between items-center mt-4">
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
    </div>
  );
};
