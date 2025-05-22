import { useState } from 'react';
import { ArrowLeft, RotateCw } from 'lucide-react';
import { ScoreSubmissionForm } from './ScoreSubmissionForm';

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  quizName: string;
  quizID: string;
  timeTaken: number;
  onRestart: () => void;
  onHome: () => void;
}

export function QuizResult({ 
  score, 
  totalQuestions, 
  quizName,
  quizID,
  timeTaken,
  onRestart, 
  onHome 
}: QuizResultProps) {
  const [isScoreSubmitted, setIsScoreSubmitted] = useState(false);
  const percentage = Math.round((score / totalQuestions) * 100);
  
  let message = "Good effort!";
  if (percentage >= 80) {
    message = "Excellent work!";
  } else if (percentage >= 60) {
    message = "Well done!";
  } else if (percentage < 40) {
    message = "Keep practicing!";
  }

  // Format time for display
  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10); // Show only 2 digits
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
  };

  const handleScoreSubmitted = () => {
    setIsScoreSubmitted(true);
  };

  return (
    <div className="bg-white rounded-lg p-8 max-w-md mx-auto shadow-lg text-center">
      <h2 className="text-2xl font-bold text-navy-800 mb-2">{quizName} - Results</h2>
      
      <div className="my-6 flex flex-col items-center">
        <div className="text-5xl font-bold mb-2 text-navy-600">{percentage}%</div>
        <p className="text-navy-700">
          You scored <span className="font-semibold">{score}</span> out of <span className="font-semibold">{totalQuestions}</span>
        </p>
        <p className="text-navy-600 mt-2">{message}</p>
        <p className="text-navy-600 mt-2">
          Time: <span className="font-mono">{formatTime(timeTaken)}</span>
        </p>
      </div>
      
      {!isScoreSubmitted && (
        <ScoreSubmissionForm
          score={score}
          totalQuestions={totalQuestions}
          quizID={quizID}
          timeTaken={timeTaken}
          onSubmitted={handleScoreSubmitted}
        />
      )}
      
      <div className="flex flex-col gap-3 mt-6">
        <button 
          onClick={onRestart}
          className="flex items-center justify-center py-2 px-4 bg-navy-600 text-white rounded-md hover:bg-navy-700 transition-colors"
        >
          <RotateCw className="mr-2 h-4 w-4" /> Try Again
        </button>
        <button 
          onClick={onHome}
          className="flex items-center justify-center py-2 px-4 border border-navy-600 text-navy-600 rounded-md hover:bg-navy-50 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Return to Home
        </button>
      </div>
    </div>
  );
}
