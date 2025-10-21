import { Quiz } from "@/shared/types";
import { Trophy, RotateCcw, Home, Clock } from "lucide-react";

interface QuizResultsProps {
  quiz: Quiz;
  score: number;
  totalQuestions: number;
  timeMs: number;
  onReturnHome: () => void;
  onRetakeQuiz: () => void;
}

export default function QuizResults({
  quiz,
  score,
  totalQuestions,
  timeMs,
  onReturnHome,
  onRetakeQuiz,
}: QuizResultsProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getScoreColor = () => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreMessage = () => {
    if (percentage >= 80) return "Excellent work! 🎉";
    if (percentage >= 60) return "Good job! 👍";
    return "Keep practicing! 💪";
  };

  const formatTime = (timeMs: number): string => {
    const seconds = timeMs / 1000;
    return `${seconds.toFixed(2)}s`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 max-w-2xl mx-auto">
      <div className="p-8 text-center">
        {/* Trophy icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-navy-50 rounded-full">
            <Trophy className="w-12 h-12 text-navy-600" />
          </div>
        </div>

        {/* Quiz completed message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Quiz Complete!
        </h1>
        <p className="text-gray-600 mb-8">
          You finished "{quiz.quizName}"
        </p>

        {/* Score display */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <div className="text-6xl font-bold mb-2 text-gray-900">
            {score}<span className="text-2xl text-gray-600">/{totalQuestions}</span>
          </div>
          <div className={`text-2xl font-semibold mb-2 ${getScoreColor()}`}>
            {percentage}%
          </div>
          
          {/* Time display */}
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="text-lg font-medium text-gray-700">
              Completed in {formatTime(timeMs)}
            </span>
          </div>
          
          <p className="text-gray-600 text-lg">
            {getScoreMessage()}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onRetakeQuiz}
            className="flex items-center justify-center space-x-2 bg-navy-600 hover:bg-navy-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Quiz</span>
          </button>
          
          <button
            onClick={onReturnHome}
            className="flex items-center justify-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </button>
        </div>
      </div>
    </div>
  );
}
