import { useState, useEffect } from 'react';
import { QuizSet } from '../types/quiz';
import { Link } from 'react-router-dom';
import HighScoreButton from './HighScoreButton';

interface QuizSelectionProps {
  quizSets: QuizSet[];
}

export default function QuizSelection({ quizSets }: QuizSelectionProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // Font loading
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    // Animation on mount
    setMounted(true);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className={`max-w-3xl w-full transition-all duration-700 ease-out ${mounted ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
        <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-center text-blue-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Quizster
        </h1>
        <p className="text-gray-600 text-center mb-6">Select a quiz to begin your challenge</p>
        <div className="flex justify-center mb-8">
          <HighScoreButton />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quizSets.map((quizSet, index) => (
            <Link 
              to={`/quiz/${quizSet.id}`} 
              key={quizSet.id}
              className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-48 relative transition-opacity ease-out duration-700`}
              style={{ 
                opacity: mounted ? 1 : 0, 
                transitionDelay: `${index * 100}ms`,
                borderTop: `4px solid ${quizSet.color}`
              }}
            >
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-bold text-xl mb-2">{quizSet.title}</h3>
                <p className="text-gray-600 text-sm flex-grow">{quizSet.description}</p>
                <div className="mt-4 text-sm flex items-center justify-between">
                  <span className="text-gray-500">{quizSet.questions.length} questions</span>
                  <span className="bg-blue-900 rounded-full px-3 py-1 text-white">Start Quiz</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
