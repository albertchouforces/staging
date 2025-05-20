import { useEffect, useState } from 'react';
import { Question } from '../types/quiz';
import { Link } from 'react-router-dom';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  quizTitle: string;
  onRetry: () => void;
  timeTaken?: number;
  onSubmitScore?: () => void;
}

export default function QuizResults({ 
  score, 
  totalQuestions, 
  questions, 
  selectedAnswers,
  quizTitle,
  onRetry,
  timeTaken = 0,
  onSubmitScore
}: QuizResultsProps) {
  const [mounted, setMounted] = useState(false);
  const percentage = Math.round((score / totalQuestions) * 100);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Determine feedback based on score percentage
  const getFeedback = () => {
    if (percentage >= 90) return "Excellent! You're a master!";
    if (percentage >= 70) return "Great job! You know your stuff!";
    if (percentage >= 50) return "Good effort! Room for improvement.";
    return "Keep practicing! You'll get better.";
  };

  return (
    <div className={`transition-all duration-700 ease-out ${mounted ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Quiz Results</h2>
        <p className="text-gray-600 mb-6">{quizTitle}</p>
        
        <div className="inline-flex items-center justify-center bg-white shadow-md rounded-full px-8 py-4 mb-8">
          <div className="text-4xl font-bold text-blue-900 mr-2">{score}</div>
          <div className="text-lg text-gray-500">/ {totalQuestions}</div>
        </div>
        
        <p className="text-xl font-medium mb-2">{getFeedback()}</p>
        <p className="text-gray-600">You scored {percentage}%</p>
        {timeTaken > 0 && (
          <p className="text-gray-600 mt-1">
            Time: {(timeTaken / 1000).toFixed(2)} seconds
          </p>
        )}
      </div>
      
      <div className="mt-6 space-y-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link 
            to="/" 
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg text-center transition-colors duration-300"
          >
            Back to Quizzes
          </Link>
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={onRetry}
              className="bg-blue-900 hover:bg-blue-800 text-white font-medium py-3 px-4 rounded-lg text-center transition-colors duration-300"
            >
              Try Again
            </button>
            {onSubmitScore && (
              <button 
                onClick={onSubmitScore}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg text-center transition-colors duration-300"
              >
                Submit Score
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
