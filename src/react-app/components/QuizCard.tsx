import { Quiz } from '@/data/quizData';
import { Play, BookOpen } from 'lucide-react';

interface QuizCardProps {
  quiz: Quiz;
  onStartQuiz: (quizId: string) => void;
}

export default function QuizCard({ quiz, onStartQuiz }: QuizCardProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-navy-600 to-navy-800 rounded-xl flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{quiz.quizName}</h3>
          <p className="text-sm text-gray-500">{quiz.questions.length} questions</p>
        </div>
      </div>
      
      <button
        onClick={() => onStartQuiz(quiz.quizID)}
        className="w-full bg-navy-700 hover:bg-navy-800 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 group"
      >
        <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
        Start Quiz
      </button>
    </div>
  );
}
