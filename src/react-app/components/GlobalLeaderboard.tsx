import { useState, useEffect } from 'react';
import { getGlobalScores, type GlobalScoreEntry } from '@/react-app/lib/firebase';
import { Medal } from '@/react-app/components/Medal';
import { Loader, Trophy, X, ChevronDown } from 'lucide-react';
import type { QuizDefinition } from '@/react-app/types';
import { ENABLE_TIME_TRACKING, USE_DROPDOWN_QUIZ_SELECTOR } from '@/react-app/config/features';

interface GlobalLeaderboardProps {
  onClose: () => void;
  quizzes: QuizDefinition[];
}

export function GlobalLeaderboard({ onClose, quizzes }: GlobalLeaderboardProps) {
  const [scores, setScores] = useState<GlobalScoreEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<string>(quizzes[0]?.config.quizKey || '');

  // Helper to check if a quiz title is duplicated
  const hasDuplicateTitle = (title: string) => {
    return quizzes.filter(q => q.config.title === title).length > 1;
  };

  // Get display name for a quiz (title + description if title is duplicated)
  const getQuizDisplayName = (quiz: QuizDefinition) => {
    if (hasDuplicateTitle(quiz.config.title)) {
      return `${quiz.config.title} - ${quiz.config.description}`;
    }
    return quiz.config.title;
  };

  // Map theme color names to actual RGB values for inline styles
  const getColorValue = (themeColor: string): string => {
    const colorMap: Record<string, string> = {
      blue: 'rgb(37, 99, 235)',
      green: 'rgb(22, 163, 74)',
      red: 'rgb(220, 38, 38)',
      purple: 'rgb(147, 51, 234)',
      orange: 'rgb(234, 88, 12)',
      pink: 'rgb(219, 39, 119)',
      sky: 'rgb(14, 165, 233)',
      cyan: 'rgb(6, 182, 212)',
      teal: 'rgb(20, 184, 166)',
      indigo: 'rgb(99, 102, 241)',
      violet: 'rgb(139, 92, 246)',
      rose: 'rgb(225, 29, 72)',
      amber: 'rgb(245, 158, 11)',
      fuchsia: 'rgb(217, 70, 239)',
      lime: 'rgb(132, 204, 22)',
      emerald: 'rgb(16, 185, 129)'
    };
    return colorMap[themeColor] || 'rgb(37, 99, 235)'; // default to blue
  };

  useEffect(() => {
    const fetchScores = async () => {
      if (!selectedQuiz) return;
      
      setLoading(true);
      setError(null);
      try {
        const data = await getGlobalScores(selectedQuiz);
        setScores(data);
      } catch (err) {
        setError('Failed to load global scores. Please try again later.');
        console.error('Error fetching global scores:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, [selectedQuiz]);

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

  const getSelectedQuizConfig = () => {
    return quizzes.find(quiz => quiz.config.quizKey === selectedQuiz)?.config;
  };

  const selectedQuizConfig = getSelectedQuizConfig();
  const accentColor = selectedQuizConfig?.themeColor || 'blue';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="text-yellow-500" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">Global Leaderboard</h2>
            </div>
            <button
              onClick={onClose}
              className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close leaderboard"
            >
              <X size={28} className="text-gray-600 hover:text-gray-800" />
            </button>
          </div>

          {/* Quiz Selection */}
          {USE_DROPDOWN_QUIZ_SELECTOR ? (
            <div className="relative inline-block">
              <select
                value={selectedQuiz}
                onChange={(e) => setSelectedQuiz(e.target.value)}
                className="w-full md:w-auto pl-4 pr-9 py-2 rounded-lg border-2 border-gray-200 text-sm font-medium appearance-none cursor-pointer hover:border-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
                style={{
                  color: selectedQuizConfig?.themeColor ? getColorValue(selectedQuizConfig.themeColor) : '#374151'
                }}
              >
                {quizzes.map((quiz) => (
                  <option
                    key={quiz.config.quizKey}
                    value={quiz.config.quizKey}
                    style={{
                      color: getColorValue(quiz.config.themeColor)
                    }}
                  >
                    {getQuizDisplayName(quiz)}
                  </option>
                ))}
              </select>
              <ChevronDown 
                className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" 
                size={18} 
              />
            </div>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {quizzes.map((quiz) => (
                <button
                  key={quiz.config.quizKey}
                  onClick={() => setSelectedQuiz(quiz.config.quizKey)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedQuiz === quiz.config.quizKey
                      ? `bg-${quiz.config.themeColor}-600 text-white`
                      : `text-${quiz.config.themeColor}-600 hover:bg-${quiz.config.themeColor}-50`
                  }`}
                >
                  {getQuizDisplayName(quiz)}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 overflow-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Loader className="animate-spin text-gray-500" size={32} />
            </div>
          ) : error ? (
            <div className="text-center text-red-600 p-4">
              {error}
            </div>
          ) : scores.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-600">
                  <th className="pb-2 pl-2">Rank</th>
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Score</th>
                  <th className="pb-2">Accuracy</th>
                  {ENABLE_TIME_TRACKING && <th className="pb-2">Time</th>}
                  <th className="pb-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((score, index) => (
                  <tr 
                    key={`${score.user_name}-${index}`} 
                    className={`border-t border-gray-100 transition-colors hover:bg-${accentColor}-50 hover:shadow-sm cursor-pointer`}
                  >
                    <td className="py-2 pl-2">{getPositionDisplay(index)}</td>
                    <td className="py-2 font-medium">{score.user_name}</td>
                    <td className="py-2">{score.score}</td>
                    <td className="py-2">{score.accuracy}%</td>
                    {ENABLE_TIME_TRACKING && (
                      <td className="py-2 font-mono">{formatTime(score.time)}</td>
                    )}
                    <td className="py-2 text-gray-500">
                      {new Date(score.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className={`w-16 h-16 rounded-full bg-${accentColor}-50 flex items-center justify-center mb-4`}>
                <Trophy className={`text-${accentColor}-600`} size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Be the First Champion!
              </h3>
              <p className="text-gray-600 max-w-md">
                No scores have been recorded yet for this quiz. Complete the challenge and claim your spot at the top of the leaderboard!
              </p>
              <div className={`mt-6 text-${accentColor}-600 text-sm font-medium`}>
                Your score could be the first one here
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
