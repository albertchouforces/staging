import { useState, useEffect } from 'react';
import { getGlobalScores, type GlobalScoreEntry } from '@/react-app/lib/supabase';
import { Medal } from '@/react-app/components/Medal';
import { Trophy, Loader2, X, Info } from 'lucide-react';
import { QUIZ_COLLECTION } from '@/react-app/data/quizData';
import type { QuizConfig } from '@/react-app/types';
import { getThemeColor } from '@/react-app/lib/themeColors';

interface GlobalLeaderboardProps {
  onClose: () => void;
}

export function GlobalLeaderboard({ onClose }: GlobalLeaderboardProps) {
  const [scores, setScores] = useState<GlobalScoreEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedQuizIndex, setSelectedQuizIndex] = useState<number>(0);
  const [showTooltip, setShowTooltip] = useState(false);

  const currentQuizConfig = QUIZ_COLLECTION[selectedQuizIndex]?.config || QUIZ_COLLECTION[0].config;
  const currentThemeColors = getThemeColor(currentQuizConfig.themeColor);

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true);
      setError(null);
      try {
        const quizKey = currentQuizConfig.quizKey;
        const data = await getGlobalScores(quizKey);
        setScores(data);
      } catch (err) {
        setError('Failed to load global scores. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, [selectedQuizIndex, currentQuizConfig.quizKey]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const getPositionDisplay = (index: number) => {
    switch (index) {
      case 0: return <Medal position={1} color="gold" />;
      case 1: return <Medal position={2} color="silver" />;
      case 2: return <Medal position={3} color="bronze" />;
      default: return <span className="w-7 h-7 flex items-center justify-center">{index + 1}</span>;
    }
  };

  const QuizSelector = ({ 
    config, 
    isSelected, 
    onClick 
  }: { 
    config: QuizConfig; 
    isSelected: boolean; 
    onClick: () => void;
  }) => {
    const colors = getThemeColor(config.themeColor);
    
    return (
      <button
        onPointerDown={(e) => {
          e.preventDefault();
          onClick();
        }}
        type="button"
        className="px-4 py-2 rounded-lg font-medium transition-all hover:brightness-110"
        style={{
          backgroundColor: isSelected ? colors.primary : 'transparent',
          color: isSelected ? 'white' : colors.primary,
          border: isSelected ? 'none' : `1px solid ${colors.primary}`
        }}
      >
        {config.title}
      </button>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="text-yellow-500" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">Global Leaderboard</h2>
              <div className="relative">
                <button
                  onClick={() => setShowTooltip(prev => !prev)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Information about global leaderboard"
                >
                  <Info size={20} />
                </button>
                {showTooltip && (
                  <div className="absolute left-0 top-full mt-2 w-80 bg-gray-800 text-white text-sm rounded-lg shadow-lg p-3 z-10">
                    <p className="mb-2">
                      <strong>How it works:</strong> The global leaderboard shows the top scores from all players worldwide. Scores are ranked first by highest score, then by fastest time.
                    </p>
                    <p className="text-gray-300">
                      Your score will appear here if you submit your name after completing a quiz.
                    </p>
                    <div className="absolute -top-2 left-4 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-gray-800"></div>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close leaderboard"
            >
              <X size={28} className="text-gray-600 hover:text-gray-800" />
            </button>
          </div>

          <div className="flex gap-4 flex-wrap">
            {QUIZ_COLLECTION.map((quiz, index) => (
              <QuizSelector 
                key={quiz.config.id}
                config={quiz.config}
                isSelected={selectedQuizIndex === index} 
                onClick={() => setSelectedQuizIndex(index)} 
              />
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="animate-spin" style={{ color: currentThemeColors.primary }} size={32} />
            </div>
          ) : error ? (
            <div className="text-center text-red-600 p-4">
              {error}
            </div>
          ) : scores.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-600">
                  <th className="pb-2">Rank</th>
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Score</th>
                  <th className="pb-2">Accuracy</th>
                  <th className="pb-2">Time</th>
                  <th className="pb-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((score, index) => (
                  <tr 
                    key={`${score.user_name}-${index}`} 
                    className="border-t border-gray-100 transition-colors hover:bg-gray-50"
                  >
                    <td className="py-2">{getPositionDisplay(index)}</td>
                    <td className="py-2 font-medium">{score.user_name}</td>
                    <td className="py-2">{score.score}</td>
                    <td className="py-2">{score.accuracy}%</td>
                    <td className="py-2 font-mono">{formatTime(score.time)}</td>
                    <td className="py-2 text-gray-500">
                      {new Date(score.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center text-gray-500 p-4">
              No scores recorded yet for this quiz
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
