import { useState } from 'react';
import { RotateCcw, Home, Trophy, Target, Award } from 'lucide-react';
import SubmitHighScoreModal from '@/react-app/components/SubmitHighScoreModal';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  quizId: string;
  quizName: string;
  timeMilliseconds: number;
  onRetakeQuiz: () => void;
  onReturnHome: () => void;
}

export default function QuizResults({
  score,
  totalQuestions,
  quizId,
  quizName,
  timeMilliseconds,
  onRetakeQuiz,
  onReturnHome,
}: QuizResultsProps) {
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getScoreMessage = () => {
    if (percentage >= 90) return "Outstanding! 🎉";
    if (percentage >= 80) return "Great job! 👏";
    if (percentage >= 70) return "Well done! 👍";
    if (percentage >= 60) return "Good effort! 💪";
    return "Keep practicing! 📚";
  };

  const getScoreColor = () => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const formatTime = (milliseconds: number): string => {
    const seconds = milliseconds / 1000;
    return seconds.toFixed(2) + 's';
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-10 h-10 text-navy-600" />
          </div>
          
          <h2 className="text-3xl font-bold text-navy-900 mb-2">
            Quiz Complete!
          </h2>
          <p className="text-gray-600 text-lg">
            {quizName}
          </p>
        </div>

        <div className="mb-8">
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Target className="w-6 h-6 text-navy-600" />
              <span className="text-lg font-medium text-gray-700">Your Score</span>
            </div>
            
            <div className={`text-6xl font-bold mb-2 ${getScoreColor()}`}>
              {score}/{totalQuestions}
            </div>
            
            <div className={`text-2xl font-semibold ${getScoreColor()}`}>
              {percentage}%
            </div>
            
            <p className="text-xl font-medium text-gray-700 mt-4">
              {getScoreMessage()}
            </p>
          </div>

          <div className="bg-navy-50 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-navy-100 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5 text-navy-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completion Time</p>
                <p className="text-lg font-mono font-bold text-navy-700">
                  {formatTime(timeMilliseconds)}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div
              className={`h-3 rounded-full transition-all duration-1000 ${
                percentage >= 80 ? 'bg-green-500' : 
                percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => setShowSubmitModal(true)}
            className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            <Award className="w-5 h-5" />
            Submit High Score
          </button>

          <div className="flex gap-3">
            <button
              onClick={onRetakeQuiz}
              className="flex-1 flex items-center justify-center gap-2 bg-navy-600 hover:bg-navy-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Quiz
            </button>
            
            <button
              onClick={onReturnHome}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              <Home className="w-4 h-4" />
              Return Home
            </button>
          </div>
        </div>
      </div>

      <SubmitHighScoreModal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        quizId={quizId}
        quizName={quizName}
        score={score}
        totalQuestions={totalQuestions}
        timeMilliseconds={timeMilliseconds}
      />
    </div>
  );
}
