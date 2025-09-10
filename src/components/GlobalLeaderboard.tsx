import { useState, useEffect } from 'react';
import { getGlobalScores, type GlobalScoreEntry } from '../lib/supabase';
import { Medal } from './Medal';
import { Loader, Trophy, X } from 'lucide-react';
import { QUIZ_CONFIG, SECOND_QUIZ_CONFIG, COMBINED_QUIZ_CONFIG } from '../data/templateQuiz';
import type { QuizConfig } from '../types';

interface GlobalLeaderboardProps {
  onClose: () => void;
}

export function GlobalLeaderboard({ onClose }: GlobalLeaderboardProps) {
  const [scores, setScores] = useState<GlobalScoreEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<'quiz1' | 'quiz2' | 'combined'>('quiz1');

  const currentQuizConfig = 
    selectedQuiz === 'quiz2' ? SECOND_QUIZ_CONFIG : 
    selectedQuiz === 'combined' ? COMBINED_QUIZ_CONFIG : 
    QUIZ_CONFIG;

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true);
      setError(null);
      try {
        const quizName = 
          selectedQuiz === 'quiz2' ? SECOND_QUIZ_CONFIG.quiz_name : 
          selectedQuiz === 'combined' ? COMBINED_QUIZ_CONFIG.quiz_name :
          QUIZ_CONFIG.quiz_name;
          
        try {
          const data = await getGlobalScores(quizName);
          setScores(data);
        } catch (firebaseError) {
          console.error('Firebase error:', firebaseError);
          setError('Failed to connect to Firebase. Make sure Firebase is properly configured.');
        }
      } catch (err) {
        setError('Failed to load global scores. Please try again later.');
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

  const QuizSelector = ({ config, isSelected, onClick }: { 
    config: QuizConfig; 
    isSelected: boolean; 
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        isSelected 
          ? `bg-${config.themeColor}-600 text-white` 
          : `text-${config.themeColor}-600 hover:bg-${config.themeColor}-50`
      }`}
    >
      {config.title}
    </button>
  );

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

          <div className="flex gap-4">
            <QuizSelector 
              config={QUIZ_CONFIG} 
              isSelected={selectedQuiz === 'quiz1'} 
              onClick={() => setSelectedQuiz('quiz1')} 
            />
            <QuizSelector 
              config={SECOND_QUIZ_CONFIG} 
              isSelected={selectedQuiz === 'quiz2'} 
              onClick={() => setSelectedQuiz('quiz2')} 
            />
            <QuizSelector 
              config={COMBINED_QUIZ_CONFIG} 
              isSelected={selectedQuiz === 'combined'} 
              onClick={() => setSelectedQuiz('combined')} 
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Loader className={`animate-spin text-${currentQuizConfig.themeColor}-500`} size={32} />
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
                    className={`border-t border-gray-100 hover:bg-${currentQuizConfig.themeColor}-50 transition-colors`}
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
