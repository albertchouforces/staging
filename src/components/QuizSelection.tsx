import React from 'react';
import { Quiz } from '../types/quiz';
import { ChevronRight } from 'lucide-react';

interface QuizSelectionProps {
  quizzes: Quiz[];
  onSelectQuiz: (quiz: Quiz) => void;
}

export function QuizSelection({ quizzes, onSelectQuiz }: QuizSelectionProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-navy-600">Select a quiz to begin:</p>
      
      <div className="flex flex-col gap-3">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <button
              onClick={() => onSelectQuiz(quiz)}
              className="group flex items-center justify-between p-4 w-full hover:bg-navy-50/30 transition-colors"
            >
              <div className="flex flex-col items-start">
                <h3 className="text-lg font-medium text-navy-700">{quiz.title}</h3>
                <p className="text-sm text-navy-500/70">{quiz.description}</p>
              </div>
              <ChevronRight className="text-navy-400 group-hover:text-navy-700 transition-colors" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
