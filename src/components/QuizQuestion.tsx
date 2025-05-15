import { QuizQuestion } from '../types/quiz';
import { CircleCheck, CircleX } from 'lucide-react';

interface QuizQuestionProps {
  question: QuizQuestion;
  options: string[];
  selectedAnswer: string | undefined;
  onSelectAnswer: (answer: string) => void;
  questionNumber: number;
  totalQuestions: number;
  showFeedback?: boolean;
}

export function QuizQuestionComponent({
  question,
  options,
  selectedAnswer,
  onSelectAnswer,
  questionNumber,
  totalQuestions,
  showFeedback = false,
}: QuizQuestionProps) {

  // Determine if an option is correct
  const isCorrectOption = (option: string) => option === question.correctAnswer;
  
  // Determine if user selected the correct answer
  const isCorrectSelection = selectedAnswer === question.correctAnswer;
  
  // Get button styles based on selected status and feedback
  const getButtonStyles = (option: string) => {
    // If no answer selected yet, show default styles
    if (!selectedAnswer) {
      return 'bg-white text-navy-700 hover:bg-navy-50 border-gray-200';
    }
    
    const isSelected = selectedAnswer === option;
    
    // If showing feedback after selection
    if (showFeedback) {
      // Correct answer is always highlighted in green
      if (isCorrectOption(option)) {
        return 'bg-green-100 text-green-800 border-green-500';
      }
      
      // Selected wrong answer is highlighted in red
      if (isSelected && !isCorrectOption(option)) {
        return 'bg-red-100 text-red-800 border-red-500';
      }
    }
    
    // Default selected style (when not showing feedback)
    if (isSelected) {
      return 'bg-navy-600 text-white border-navy-700';
    }
    
    // Unselected options during feedback
    return showFeedback 
      ? 'bg-white text-navy-700 border-gray-200 opacity-60' 
      : 'bg-white text-navy-700 hover:bg-navy-50 border-gray-200';
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-navy-700">Question {questionNumber} of {totalQuestions}</h2>
        <span className="text-sm text-navy-500/70">{questionNumber}/{totalQuestions}</span>
      </div>
      
      {question.imageUrl && (
        <div className="w-full h-56 overflow-hidden rounded-lg">
          <img 
            src={question.imageUrl} 
            alt="Question illustration" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
        <p className="text-navy-800 text-lg">{question.question}</p>
      </div>
      
      <div className="flex flex-col gap-3">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => !showFeedback && onSelectAnswer(option)}
            disabled={showFeedback}
            className={`p-4 rounded-lg text-left transition-all flex justify-between items-center border ${getButtonStyles(option)}`}
          >
            <span>{option}</span>
            {showFeedback && isCorrectOption(option) && (
              <CircleCheck className="w-5 h-5 text-green-600" />
            )}
            {showFeedback && selectedAnswer === option && !isCorrectOption(option) && (
              <CircleX className="w-5 h-5 text-red-600" />
            )}
          </button>
        ))}
      </div>
      
      {showFeedback && (
        <div className={`mt-2 p-3 rounded-lg ${isCorrectSelection ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {isCorrectSelection ? (
            <p className="flex items-center gap-2">
              <CircleCheck className="w-5 h-5" /> 
              Correct! Well done.
            </p>
          ) : (
            <p className="flex items-center gap-2">
              <CircleX className="w-5 h-5" /> 
              Incorrect. The correct answer is: {question.correctAnswer}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
