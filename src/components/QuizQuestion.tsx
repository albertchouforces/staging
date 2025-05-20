import { useState, useEffect } from 'react';
import { Question, QuizAnswer } from '../types/quiz';

interface QuizQuestionProps {
  question: Question;
  answers: QuizAnswer[];
  onAnswer: (questionId: string, answer: string) => void;
  selectedAnswer?: string;
  questionNumber: number;
  totalQuestions: number;
  showFeedback: boolean;
}

export default function QuizQuestion({ 
  question, 
  answers, 
  onAnswer, 
  selectedAnswer,
  questionNumber,
  totalQuestions,
  showFeedback
}: QuizQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [animateIn, setAnimateIn] = useState(false);
  
  useEffect(() => {
    setSelectedOption(null);
    setAnimateIn(false);
    
    // Small delay before animating in
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [question.id]);
  
  useEffect(() => {
    if (selectedAnswer) {
      setSelectedOption(selectedAnswer);
    }
  }, [selectedAnswer]);

  const handleSelect = (answer: QuizAnswer) => {
    if (selectedOption) return; // Prevent changing answer after selection
    setSelectedOption(answer.text);
    onAnswer(question.id, answer.text);
  };

  // Determine answer button styling based on selected state and correctness
  const getAnswerButtonStyle = (answer: QuizAnswer) => {
    const isSelected = selectedOption === answer.text;
    
    if (!showFeedback || !selectedOption) {
      return isSelected 
        ? 'border-blue-900 bg-blue-50 text-blue-900' 
        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50';
    }
    
    if (answer.isCorrect) {
      return 'border-green-500 bg-green-50 text-green-700'; // Correct answer
    }
    
    if (isSelected) {
      return 'border-red-500 bg-red-50 text-red-700'; // Selected but incorrect
    }
    
    return 'border-gray-200 opacity-70'; // Unselected and incorrect
  };

  return (
    <div className={`transition-all duration-500 ${animateIn ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-500">Question {questionNumber} of {totalQuestions}</span>
          <div className="h-1 bg-gray-100 rounded-full flex-grow ml-4 overflow-hidden">
            <div 
              className="h-full bg-blue-900 transition-all duration-500 ease-out" 
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {question.imageUrl && (
        <div className="mb-6 rounded-lg overflow-hidden shadow-md">
          <img 
            src={question.imageUrl} 
            alt={`Image for ${question.text}`} 
            className="w-full h-auto object-cover max-h-64"
          />
        </div>
      )}
      
      <h3 className="text-xl font-semibold mb-6 text-gray-800">{question.text}</h3>
      
      <div className="space-y-3">
        {answers.map((answer) => (
          <button
            key={answer.id}
            onClick={() => handleSelect(answer)}
            disabled={!!selectedOption}
            className={`w-full text-left p-4 rounded-lg border transition-all duration-300 relative ${
              getAnswerButtonStyle(answer)
            }`}
          >
            <span className="font-medium">{answer.text}</span>
            
            {showFeedback && selectedOption && answer.isCorrect && (
              <span className="absolute right-4 text-green-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
                <span className="ml-1 text-sm">Correct</span>
              </span>
            )}
            
            {showFeedback && selectedOption === answer.text && !answer.isCorrect && (
              <span className="absolute right-4 text-red-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                <span className="ml-1 text-sm">Incorrect</span>
              </span>
            )}
          </button>
        ))}
      </div>
      
      {showFeedback && selectedOption && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-900 font-medium">
            {selectedOption === question.correctAnswer 
              ? "Great job! That's correct." 
              : `The correct answer is: ${question.correctAnswer}`}
          </p>
        </div>
      )}
    </div>
  );
}
