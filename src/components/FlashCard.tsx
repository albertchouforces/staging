import { useState, useEffect } from 'react';
import type { QuestionData } from '../types';
import { Check, X, ImageOff, BookOpen } from 'lucide-react';

interface FlashCardProps {
  question: QuestionData;
  options: string[];
  onAnswer: (correct: boolean) => void;
  onNext: () => void;
  questionNumber: number;
  totalQuestions: number;
}

export function FlashCard({ 
  question, 
  options: initialOptions, 
  onAnswer, 
  onNext,
  questionNumber,
  totalQuestions
}: FlashCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageNaturalSize, setImageNaturalSize] = useState<{ width: number; height: number } | null>(null);
  const [options, setOptions] = useState<string[]>([]);

  // Set options only when question changes, ensuring uniqueness
  useEffect(() => {
    const uniqueOptions = Array.from(new Set(initialOptions));
    if (uniqueOptions.length < 4) {
      console.warn('Duplicate options detected, filling with placeholders');
      const placeholders = ['Option A', 'Option B', 'Option C', 'Option D']
        .slice(0, 4 - uniqueOptions.length);
      setOptions([...uniqueOptions, ...placeholders]);
    } else {
      setOptions(uniqueOptions);
    }
  }, [question.id, initialOptions]);

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setShowResult(false);
    setImageLoaded(false);
    setImageError(false);
    setImageNaturalSize(null);
  }, [question]);

  const handleAnswer = (answer: string) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    const correct = answer === question.correctAnswer;
    onAnswer(correct);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.target as HTMLImageElement;
    setImageNaturalSize({
      width: img.naturalWidth,
      height: img.naturalHeight
    });
    setImageLoaded(true);
  };

  const getImageStyle = () => {
    if (!imageNaturalSize) return {};
    
    const aspectRatio = imageNaturalSize.width / imageNaturalSize.height;
    const maxWidth = 800; // Maximum width we want to allow
    const maxHeight = 600; // Maximum height we want to allow

    let finalWidth = imageNaturalSize.width;
    let finalHeight = imageNaturalSize.height;

    // If the image is larger than our maximums, scale it down proportionally
    if (finalWidth > maxWidth) {
      finalWidth = maxWidth;
      finalHeight = finalWidth / aspectRatio;
    }

    if (finalHeight > maxHeight) {
      finalHeight = maxHeight;
      finalWidth = finalHeight * aspectRatio;
    }

    return {
      width: `${finalWidth}px`,
      height: `${finalHeight}px`,
      objectFit: 'contain' as const,
      mixBlendMode: 'multiply' as const, // Helps with transparency
      margin: '0 auto' // Centers the image horizontally
    };
  };

  const getOptionStyles = (option: string) => {
    if (!showResult) {
      return "bg-gray-100 hover:bg-gray-200";
    }
    if (option === question.correctAnswer) {
      return "bg-green-100 border-2 border-green-500";
    }
    if (selectedAnswer === option) {
      return "bg-red-100 border-2 border-red-500";
    }
    return "bg-gray-100";
  };

  return (
    <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg">
      <div className="flex flex-col w-full">
        {/* Question Section */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">{question.question}</h3>
            <span className="text-sm text-gray-500">Question {questionNumber} of {totalQuestions}</span>
          </div>
          <div className="flex flex-col items-center mb-4">
            <div className="w-full flex items-center justify-center mb-4 p-4 min-h-[200px]">
              {!imageLoaded && !imageError && (
                <div className="w-full h-48 flex flex-col items-center justify-center bg-transparent rounded-lg border-2 border-dashed border-gray-300">
                  <div className="text-gray-400 text-center px-4">
                    <div className="text-sm font-medium mb-1">Loading Image</div>
                  </div>
                </div>
              )}
              {imageError ? (
                <div className="w-full h-48 flex flex-col items-center justify-center text-gray-400">
                  <ImageOff size={32} />
                  <p className="text-sm mt-2">Image not available</p>
                </div>
              ) : (
                <img
                  src={question.imageUrl}
                  alt="Question"
                  className={`${imageLoaded ? 'block' : 'hidden'} bg-transparent rounded-lg transition-opacity duration-200`}
                  style={getImageStyle()}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              )}
            </div>
            {question.description && (
              <p className="text-xl text-gray-600 italic text-center max-w-xl">
                {question.description}
              </p>
            )}
          </div>
        </div>

        {/* Options Section */}
        <div className="w-full p-6 border-b border-gray-100">
          <div className="grid grid-cols-1 gap-3 w-full max-w-xl mx-auto">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={showResult}
                className={`w-full min-h-[60px] p-4 text-left rounded-lg transition-colors flex items-center justify-between ${getOptionStyles(option)}`}
              >
                <span>{option}</span>
                {showResult && (
                  <span>
                    {option === question.correctAnswer && (
                      <Check className="text-green-600" size={20} />
                    )}
                    {selectedAnswer === option && option !== question.correctAnswer && (
                      <X className="text-red-600" size={20} />
                    )}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Result Section */}
        {showResult && (
          <div className="w-full p-6 flex flex-col gap-6">
            <div className="flex justify-center w-full">
              <button
                onClick={onNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {questionNumber === totalQuestions ? 'Finish Quiz' : 'Next Question'}
              </button>
            </div>

            {/* Only show "Did you know" section if there's a fact */}
            {question.fact && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 max-w-xl mx-auto">
                <div className="flex items-center gap-2 text-blue-800 mb-2">
                  <BookOpen size={20} />
                  <span className="font-semibold">Did you know?</span>
                </div>
                <p className="text-blue-900">{question.fact}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
