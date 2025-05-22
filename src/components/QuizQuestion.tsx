import { useState } from 'react';

interface QuizQuestionProps {
  question: string;
  correctAnswer: string;
  options: string[];
  image?: string;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
}

export function QuizQuestion({ 
  question, 
  correctAnswer, 
  options, 
  image,
  onAnswer, 
  onNext
}: QuizQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleOptionClick = (option: string) => {
    if (isAnswered) return;
    
    setSelectedOption(option);
    setIsAnswered(true);
    onAnswer(option === correctAnswer);
  };

  const getOptionClass = (option: string) => {
    if (!isAnswered) {
      return "border border-navy-200 bg-white text-navy-800 hover:bg-navy-50";
    }
    
    if (option === correctAnswer) {
      return "border border-green-500 bg-green-50 text-green-700";
    }
    
    if (option === selectedOption) {
      return "border border-red-500 bg-red-50 text-red-700";
    }
    
    return "border border-navy-200 bg-white text-navy-800 opacity-70";
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-medium text-navy-800 mb-4">{question}</h3>
      
      {image && (
        <div className="mb-6 flex justify-center">
          <img 
            src={image} 
            alt="Question visual" 
            className="rounded-lg max-h-60 object-cover shadow-sm" 
          />
        </div>
      )}
      
      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            disabled={isAnswered}
            className={`w-full text-left p-3 rounded-md transition-colors ${getOptionClass(option)}`}
          >
            <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
          </button>
        ))}
      </div>

      {isAnswered && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={onNext}
            className="py-2 px-6 bg-navy-600 text-white rounded-md hover:bg-navy-700 transition-colors"
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  );
}
