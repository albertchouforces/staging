import { useState } from 'react';
import { BookOpen, Globe, NotebookText } from 'lucide-react';
import type { QuizStats } from '@/react-app/types';
import { QuizCard } from '@/react-app/components/QuizCard';
import { GlobalLeaderboard } from '@/react-app/components/GlobalLeaderboard';
import { ENABLE_GLOBAL_LEADERBOARD } from '@/react-app/config/features';
import { QUIZ_COLLECTION } from '@/react-app/data/quizData';

interface StartScreenProps {
  onSelectQuiz: (quizId: string) => void;
  getStatsForQuiz: (quizName: string) => QuizStats;
  onResetScores: (quizName: string) => void;
}

export function StartScreen({ 
  onSelectQuiz,
  getStatsForQuiz,
  onResetScores
}: StartScreenProps) {
  const [showGlobalLeaderboard, setShowGlobalLeaderboard] = useState(false);

  const handleResetScores = (quizKey: string) => {
    onResetScores(quizKey);
    // Add reload as fallback
    window.location.reload();
  };

  // Filter out hidden quizzes and then separate regular quizzes from advanced challenges
  const visibleQuizzes = QUIZ_COLLECTION.filter(quiz => !quiz.config.hidden);
  const regularQuizzes = visibleQuizzes.filter(quiz => !quiz.config.advancedChallenge);
  const advancedQuizzes = visibleQuizzes.filter(quiz => quiz.config.advancedChallenge);

  // Get grid columns based on number of items
  const getGridColumns = (count: number): string => {
    switch (count) {
      case 0:
        return '';
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  // Get grid width based on number of items
  const getGridWidth = (count: number): string => {
    switch (count) {
      case 0:
        return '';
      case 1:
        return 'max-w-md';
      case 2:
        return 'max-w-3xl';
      default:
        return 'max-w-6xl';
    }
  };

  return (
    <div className="max-w-6xl w-full mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <NotebookText className="text-blue-600" size={32} />
          <h1 className="text-4xl font-bold text-gray-800">
            NWO Quiz Collection
          </h1>
        </div>
        <h2 className="text-xl text-gray-600">
          Choose a quiz to test your knowledge
        </h2>
      </div>

      {/* Regular Quizzes Grid */}
      {regularQuizzes.length > 0 && (
        <div className="flex justify-center mb-12">
          <div className={`grid ${getGridColumns(regularQuizzes.length)} gap-8 w-full ${getGridWidth(regularQuizzes.length)} mx-auto grid-flow-row auto-rows-fr`}>
            {regularQuizzes.map((quiz) => (
              <QuizCard
                key={quiz.config.id}
                config={quiz.config}
                stats={getStatsForQuiz(quiz.config.quizKey)}
                onStart={() => onSelectQuiz(quiz.config.id)}
                onResetScores={() => handleResetScores(quiz.config.quizKey)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Global Leaderboard Button */}
      {ENABLE_GLOBAL_LEADERBOARD && visibleQuizzes.length > 0 && (
        <div className="flex justify-center mb-12">
          <button
            onClick={() => setShowGlobalLeaderboard(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors font-semibold shadow-md"
          >
            <Globe size={20} />
            View Global Leaderboard
          </button>
        </div>
      )}

      {/* Advanced Challenges Section */}
      {advancedQuizzes.length > 0 && (
        <>
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-gray-200" />
            <div className="flex items-center gap-2 text-gray-600 font-semibold">
              Advanced Challenges
            </div>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="flex justify-center mb-12">
            <div className={`grid ${getGridColumns(advancedQuizzes.length)} gap-8 w-full ${getGridWidth(advancedQuizzes.length)} mx-auto grid-flow-row auto-rows-fr`}>
              {advancedQuizzes.map((quiz) => (
                <QuizCard
                  key={quiz.config.id}
                  config={quiz.config}
                  stats={getStatsForQuiz(quiz.config.quizKey)}
                  onStart={() => onSelectQuiz(quiz.config.id)}
                  onResetScores={() => handleResetScores(quiz.config.quizKey)}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Global Leaderboard Modal */}
      {showGlobalLeaderboard && (
        <GlobalLeaderboard 
          onClose={() => setShowGlobalLeaderboard(false)}
          quizzes={visibleQuizzes}
        />
      )}
    </div>
  );
}
