import { useState } from 'react';
import { quizData } from '../data/quizData';
import { QuizCard } from '../components/QuizCard';
import { HighScoreModal } from '../components/HighScoreModal';
import { Trophy } from 'lucide-react';

interface HomePageProps {
  onStartQuiz: (quizID: string) => void;
}

export function HomePage({ onStartQuiz }: HomePageProps) {
  const [isHighScoreModalOpen, setIsHighScoreModalOpen] = useState(false);
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-navy-800 mb-2">Quiz Master</h1>
        <p className="text-navy-600">Test your knowledge with our selection of quizzes</p>
        <button 
          onClick={() => setIsHighScoreModalOpen(true)}
          className="mt-4 inline-flex items-center px-4 py-2 bg-navy-600 text-white rounded-md hover:bg-navy-700 transition-colors"
        >
          <Trophy className="mr-2 h-4 w-4" /> View High Scores
        </button>
      </div>
      
      <HighScoreModal 
        isOpen={isHighScoreModalOpen} 
        onClose={() => setIsHighScoreModalOpen(false)} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizData.map((quiz) => (
          <QuizCard 
            key={quiz.quizID} 
            quiz={quiz} 
            onStart={onStartQuiz} 
          />
        ))}
      </div>
    </div>
  );
}
