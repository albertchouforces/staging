import { type Quiz } from '../data/quizData';
import { ArrowRight } from 'lucide-react';

interface QuizCardProps {
  quiz: Quiz;
  onStart: (quizID: string) => void;
}

export function QuizCard({ quiz, onStart }: QuizCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-navy-100 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold text-navy-800 mb-2">{quiz.quizName}</h2>
      <p className="text-navy-600 mb-4">{quiz.questions.length} questions</p>
      <button 
        onClick={() => onStart(quiz.quizID)}
        className="flex items-center justify-center w-full py-2 px-4 bg-navy-600 text-white rounded-md hover:bg-navy-700 transition-colors"
      >
        Start Quiz <ArrowRight className="ml-2 h-4 w-4" />
      </button>
    </div>
  );
}
