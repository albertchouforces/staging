import { useState } from 'react';
import { quizzes, Quiz as QuizType } from '@/data/quizData';
import QuizCard from '@/react-app/components/QuizCard';
import Quiz from '@/react-app/components/Quiz';
import HighScoresModal from '@/react-app/components/HighScoresModal';
import { Brain, Zap, Trophy } from 'lucide-react';

export default function Home() {
  const [selectedQuiz, setSelectedQuiz] = useState<QuizType | null>(null);
  const [showHighScores, setShowHighScores] = useState(false);

  const handleStartQuiz = (quizId: string) => {
    const quiz = quizzes.find(q => q.quizID === quizId);
    if (quiz) {
      setSelectedQuiz(quiz);
    }
  };

  const handleReturnHome = () => {
    setSelectedQuiz(null);
  };

  if (selectedQuiz) {
    return <Quiz quiz={selectedQuiz} onReturnHome={handleReturnHome} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-navy-600 to-navy-800 rounded-2xl flex items-center justify-center">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-navy-700 to-navy-900 bg-clip-text text-transparent">
                QuizCraft
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Test your knowledge with our collection of interactive quizzes. Challenge yourself and learn something new!
            </p>
            
            <button
              onClick={() => setShowHighScores(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <Trophy className="w-5 h-5" />
              View High Scores
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <Zap className="w-6 h-6 text-navy-600" />
          <h2 className="text-2xl font-bold text-gray-900">Available Quizzes</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <QuizCard
              key={quiz.quizID}
              quiz={quiz}
              onStartQuiz={handleStartQuiz}
            />
          ))}
        </div>
      </div>

      {/* High Scores Modal */}
      <HighScoresModal
        isOpen={showHighScores}
        onClose={() => setShowHighScores(false)}
      />

      {/* Footer */}
      <div className="bg-white border-t border-gray-100 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <p className="text-gray-500">
            Built with QuizCraft - Test your knowledge, expand your mind
          </p>
        </div>
      </div>
    </div>
  );
}
