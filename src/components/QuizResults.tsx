import React from 'react';
import { Quiz } from '../types/quiz';
import { ArrowLeft, Award, ClipboardList, Clock, RotateCcw } from 'lucide-react';

interface QuizResultsProps {
  quiz: Quiz;
  score: number;
  timeInSeconds: number;
  onRetakeQuiz: () => void;
  onBackToQuizzes: () => void;
  onToggleHighScores: () => void;
  showHighScores: boolean;
  scoreSaved: boolean;
}

export function QuizResults({ 
  quiz, 
  score, 
  timeInSeconds, 
  onRetakeQuiz, 
  onBackToQuizzes, 
  onToggleHighScores,
  showHighScores,
  scoreSaved
}: QuizResultsProps) {
  // Format time string with milliseconds
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 1000);
    return `${mins}m ${secs}s ${ms}ms`;
  };
  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <h2 className="text-2xl font-bold text-navy-700">Quiz Completed!</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center gap-4">
        <Award className="w-16 h-16 text-navy-500" />
        <h3 className="text-xl font-medium text-navy-700">{quiz.title} Results</h3>
        
        <div className="flex items-center justify-center w-28 h-28 rounded-full bg-navy-50 border-4 border-navy-100">
          <span className="text-3xl font-bold text-navy-700">{Math.round(score)}%</span>
        </div>
        
        <div className="flex items-center gap-2 p-2 bg-navy-50 rounded-lg text-navy-700">
          <Clock className="w-5 h-5" />
          <span className="font-medium">Time: {formatTime(timeInSeconds)}</span>
        </div>
        
        <p className="text-navy-600">
          {score >= 80 
            ? 'Excellent! You really know your stuff!' 
            : score >= 60 
            ? 'Good job! Keep learning to improve your score.'
            : 'Keep practicing to improve your knowledge.'}
        </p>
      </div>
      
      <button
        onClick={onToggleHighScores}
        className="flex items-center justify-center gap-2 p-3 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors"
      >
        <ClipboardList className="w-5 h-5" />
        <span>{showHighScores ? 'Hide High Scores' : 'View High Scores'}</span>
      </button>
      
      <div className="flex flex-col gap-3">
        <button
          onClick={onRetakeQuiz}
          className="flex items-center justify-center gap-2 p-3 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Retake Quiz</span>
        </button>
        
        <button
          onClick={onBackToQuizzes}
          className="flex items-center justify-center gap-2 p-3 bg-white text-navy-700 border border-gray-200 rounded-lg hover:border-navy-400 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Quiz Selection</span>
        </button>
      </div>
    </div>
  );
}
