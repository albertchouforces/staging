import { useState } from 'react';
import { Globe2, ImageOff, Goal, Play } from 'lucide-react';
import { QuizStats, QuizDefinition } from '@/react-app/types';
import { HighScoresList } from '@/react-app/components/HighScoresList';
import { GlobalLeaderboard } from '@/react-app/components/GlobalLeaderboard';
import { ENABLE_GLOBAL_LEADERBOARD } from '@/react-app/config/features';
import { getThemeColor } from '@/react-app/lib/themeColors';

const INITIAL_QUIZ_STATS: QuizStats = {
  highScore: 0,
  bestRun: null,
  highScores: []
};

interface StartScreenProps {
  onQuizSelect: (quizIndex: number) => void;
  onResetScores: (quizKey: string) => void;
  quizzes: QuizDefinition[];
}

export function StartScreen({ 
  onQuizSelect,
  onResetScores,
  quizzes
}: StartScreenProps) {
  const [showGlobalLeaderboard, setShowGlobalLeaderboard] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({});

  const getQuizStats = (quizKey: string): QuizStats => {
    const statsKey = `quiz_stats_${quizKey}`;
    const storedStats = localStorage.getItem(statsKey);
    if (storedStats) {
      return JSON.parse(storedStats);
    }
    return INITIAL_QUIZ_STATS;
  };

  const QuizCard = ({ 
    quiz,
    quizIndex
  }: {
    quiz: QuizDefinition;
    quizIndex: number;
  }) => {
    const config = quiz.config;
    const stats = getQuizStats(config.quizKey);
    const colors = getThemeColor(config.themeColor);
    const hasImageError = imageErrors[config.id] || false;
    const hasImageLoaded = imageLoaded[config.id] || false;
    
    return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Image Section - Moved above title */}
      {config.startScreenImage && (
        <div className="relative w-full h-48 mb-4 bg-transparent rounded-lg overflow-hidden flex items-center justify-center" style={{ pointerEvents: 'none' }}>
          {!hasImageLoaded && !hasImageError && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: 'none' }}>
              <div className="text-gray-400">Loading...</div>
            </div>
          )}
          {hasImageError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400" style={{ pointerEvents: 'none' }}>
              <ImageOff size={32} />
              <p className="text-sm mt-2">Image not available</p>
            </div>
          ) : (
            <img
              src={config.startScreenImage}
              alt={config.title}
              className={`
                ${hasImageLoaded ? 'opacity-100' : 'opacity-0'}
                transition-opacity duration-200
                w-full h-full
                object-contain
                mix-blend-multiply
              `}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                pointerEvents: 'none'
              }}
              onLoad={() => setImageLoaded(prev => ({ ...prev, [config.id]: true }))}
              onError={() => setImageErrors(prev => ({ ...prev, [config.id]: true }))}
            />
          )}
        </div>
      )}

      {/* Title Section - Moved below image */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold" style={{ color: colors.primary }}>
          {config.title}
        </h2>
      </div>

      <p className="text-gray-600 mb-4 text-center">{config.description}</p>

      <HighScoresList 
        scores={stats.highScores}
        onReset={() => onResetScores(config.quizKey)}
        quizConfig={config}
      />
      
      <button
        onClick={() => onQuizSelect(quizIndex)}
        type="button"
        className="w-full mt-4 px-6 py-3 text-white rounded-lg transition-all font-semibold flex items-center justify-center gap-2 hover:brightness-110 hover:shadow-lg active:brightness-95"
        style={{ 
          backgroundColor: colors.primary,
          touchAction: 'manipulation',
          position: 'relative',
          zIndex: 10
        }}
      >
        <Play size={20} />
        Start Quiz
      </button>
    </div>
  );
  };

  return (
    <div className="max-w-4xl w-full flex flex-col items-center">
      <div className="text-center mb-8 w-full">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Goal size={32} className="text-purple-800" />
          <h1 className="text-4xl font-bold text-gray-800">Navy Signal Flags and Pennants</h1>
        </div>
        <p className="text-xl text-gray-600">
          Test your knowledge of signal flags and pennants
        </p>
      </div>

      {/* Centered Choose Your Challenge title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6 w-full text-center">Choose Your Challenge</h2>

      {/* Regular quizzes in a grid */}
      {quizzes.filter(q => !q.config.isAdvanced).length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-12">
          {quizzes.map((quiz, index) => 
            !quiz.config.isAdvanced ? (
              <QuizCard key={quiz.config.id} quiz={quiz} quizIndex={index} />
            ) : null
          )}
        </div>
      )}

      {ENABLE_GLOBAL_LEADERBOARD && (
        <button
          onClick={() => setShowGlobalLeaderboard(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors font-semibold shadow-md mb-12"
        >
          <Globe2 size={20} />
          View Global Leaderboard
        </button>
      )}

      {/* Advanced quizzes - shown below divider */}
      {quizzes.filter(q => q.config.isAdvanced).length > 0 && (
        <>
          <div className="w-full flex items-center gap-4 mb-8">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="text-lg font-semibold text-gray-600">Advanced Challenge</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {quizzes.map((quiz, index) => 
            quiz.config.isAdvanced ? (
              <div key={quiz.config.id} className="w-full max-w-2xl mb-8">
                <QuizCard quiz={quiz} quizIndex={index} />
              </div>
            ) : null
          )}
        </>
      )}

      {showGlobalLeaderboard && (
        <GlobalLeaderboard onClose={() => setShowGlobalLeaderboard(false)} />
      )}
    </div>
  );
}
