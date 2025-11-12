import { useState, useEffect } from 'react';
import { ArrowRight, Home, Clock } from 'lucide-react';

interface QuizQuestionProps {
  question: string;
  image?: string;
  options: string[];
  correctAnswer: string;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (selectedAnswer: string, isCorrect: boolean) => void;
  onReturnHome: () => void;
  onPauseTimer: () => void;
  onResumeTimer: () => void;
  elapsedTime: number;
}

export default function QuizQuestion({
  question,
  image,
  options,
  correctAnswer,
  currentQuestion,
  totalQuestions,
  onAnswer,
  onReturnHome,
  onPauseTimer,
  onResumeTimer,
  elapsedTime,
}: QuizQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [displayTime, setDisplayTime] = useState(0);

  // Update display time every 10ms for smooth animation
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayTime(elapsedTime);
    }, 10);

    return () => clearInterval(interval);
  }, [elapsedTime]);

  const handleOptionSelect = (option: string) => {
    if (hasAnswered) return;
    
    setSelectedOption(option);
    setHasAnswered(true);
    setShowNextButton(true);
    onPauseTimer();
  };

  const handleNextQuestion = () => {
    const isCorrect = selectedOption === correctAnswer;
    onResumeTimer();
    onAnswer(selectedOption!, isCorrect);
    setSelectedOption(null);
    setHasAnswered(false);
    setShowNextButton(false);
  };

  const formatTime = (milliseconds: number): string => {
    const seconds = milliseconds / 1000;
    return seconds.toFixed(2);
  };

  const getOptionStyle = (option: string) => {
    if (!hasAnswered) {
      return selectedOption === option
        ? 'bg-navy-100 border-navy-300 text-navy-800'
        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50';
    }
    
    if (option === correctAnswer) {
      return 'bg-green-100 border-green-300 text-green-800';
    }
    
    if (option === selectedOption && option !== correctAnswer) {
      return 'bg-red-100 border-red-300 text-red-800';
    }
    
    return 'bg-gray-100 border-gray-200 text-gray-500';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="bg-navy-100 px-4 py-2 rounded-full">
              <span className="text-navy-700 font-medium">
                Question {currentQuestion} of {totalQuestions}
              </span>
            </div>
            <div className="bg-green-100 px-4 py-2 rounded-full flex items-center gap-2">
              <Clock className="w-4 h-4 text-green-700" />
              <span className="text-green-700 font-mono font-medium">
                {formatTime(displayTime)}s
              </span>
            </div>
          </div>
          <button
            onClick={onReturnHome}
            className="flex items-center gap-2 text-gray-600 hover:text-navy-600 transition-colors"
          >
            <Home className="w-4 h-4" />
            Return to Home
          </button>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-navy-900 mb-6 leading-relaxed">
            {question}
          </h2>

          {image && (
            <div className="mb-6 flex justify-center">
              <img
                src={image}
                alt="Quiz question"
                className="max-w-full max-h-80 object-contain rounded-lg shadow-md"
              />
            </div>
          )}

          <div className="grid gap-4 mb-6">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(option)}
                disabled={hasAnswered}
                className={`
                  p-4 rounded-lg border-2 text-left transition-all duration-200 font-medium
                  ${getOptionStyle(option)}
                  ${!hasAnswered ? 'hover:scale-[1.02] cursor-pointer' : 'cursor-not-allowed'}
                `}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {selectedOption === option && !hasAnswered && (
                    <ArrowRight className="w-5 h-5 text-navy-600" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {showNextButton && (
            <div className="flex justify-center mb-6">
              <button
                onClick={handleNextQuestion}
                className="bg-navy-600 hover:bg-navy-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                {currentQuestion === totalQuestions ? 'Finish Quiz' : 'Next Question'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-navy-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
