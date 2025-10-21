import { Quiz } from "@/shared/types";
import { Play, BookOpen } from "lucide-react";

interface QuizCardProps {
  quiz: Quiz;
  onStartQuiz: (quiz: Quiz) => void;
}

export default function QuizCard({ quiz, onStartQuiz }: QuizCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-navy-50 rounded-lg">
              <BookOpen className="w-5 h-5 text-navy-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">{quiz.quizName}</h3>
          </div>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-600 text-sm mb-2">
            {quiz.questions.length} questions
          </p>
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div className="bg-navy-600 h-1 rounded-full w-full"></div>
          </div>
        </div>
        
        <button
          onClick={() => onStartQuiz(quiz)}
          className="w-full bg-navy-600 hover:bg-navy-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
        >
          <Play className="w-4 h-4" />
          <span>Start Quiz</span>
        </button>
      </div>
    </div>
  );
}
