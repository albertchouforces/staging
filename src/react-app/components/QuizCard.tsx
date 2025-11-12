import { Quiz } from '@/shared/types';
import { Play } from 'lucide-react';

interface QuizCardProps {
  quiz: Quiz;
  onStart: (quiz: Quiz) => void;
}

export default function QuizCard({ quiz, onStart }: QuizCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group hover:scale-105">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-navy-900 mb-2">
            {quiz.quizName}
          </h3>
          <p className="text-gray-600">
            {quiz.questions.length} questions
          </p>
        </div>
        <div className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center group-hover:bg-navy-200 transition-colors">
          <Play className="w-5 h-5 text-navy-600 ml-0.5" />
        </div>
      </div>
      
      <button
        onClick={() => onStart(quiz)}
        className="w-full bg-navy-600 hover:bg-navy-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <Play className="w-4 h-4" />
        Start Quiz
      </button>
    </div>
  );
}
