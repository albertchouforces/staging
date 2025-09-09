import { useState, useEffect } from 'react';
import { X, Trophy, Clock, Target, Calendar, User } from 'lucide-react';
import { useHighScores, HighScore } from '@/react-app/hooks/useHighScores';
import { quizzes } from '@/data/quizData';

interface HighScoresModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HighScoresModal({ isOpen, onClose }: HighScoresModalProps) {
  const [selectedQuizId, setSelectedQuizId] = useState<string>('all');
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const { getHighScores, loading, error } = useHighScores();

  useEffect(() => {
    if (isOpen) {
      fetchHighScores();
    }
  }, [isOpen, selectedQuizId]);

  const fetchHighScores = async () => {
    const quizId = selectedQuizId === 'all' ? undefined : selectedQuizId;
    const scores = await getHighScores(quizId, 50);
    setHighScores(scores);
  };

  const formatTime = (timeMs: number): string => {
    const seconds = (timeMs / 1000).toFixed(2);
    return `${seconds}s`;
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getQuizName = (quizId: string): string => {
    const quiz = quizzes.find(q => q.quizID === quizId);
    return quiz?.quizName || quizId;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">High Scores</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Quiz Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Quiz
            </label>
            <select
              value={selectedQuizId}
              onChange={(e) => setSelectedQuizId(e.target.value)}
              className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
            >
              <option value="all">All Quizzes</option>
              {quizzes.map((quiz) => (
                <option key={quiz.quizID} value={quiz.quizID}>
                  {quiz.quizName}
                </option>
              ))}
            </select>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy-600"></div>
              <span className="ml-2 text-gray-600">Loading high scores...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
              <button
                onClick={fetchHighScores}
                className="mt-2 px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* High Scores Table */}
          {!loading && !error && (
            <div className="overflow-x-auto">
              {highScores.length === 0 ? (
                <div className="text-center py-12">
                  <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No high scores yet!</p>
                  <p className="text-gray-400">Be the first to complete a quiz and set a record.</p>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-navy-600 text-white">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Rank</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Name
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4" />
                            Score
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Time
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Date
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {highScores.map((score, index) => (
                        <tr key={score.id || index} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              {index === 0 ? (
                                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                                  <span className="text-white font-bold text-sm">1</span>
                                </div>
                              ) : index === 1 ? (
                                <div className="w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center">
                                  <span className="text-white font-bold text-sm">2</span>
                                </div>
                              ) : index === 2 ? (
                                <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center">
                                  <span className="text-white font-bold text-sm">3</span>
                                </div>
                              ) : (
                                <span className="text-gray-600 font-medium ml-2">{index + 1}</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div>
                              <div className="font-medium text-gray-900">{score.playerName}</div>
                              {selectedQuizId === 'all' && (
                                <div className="text-sm text-gray-500">{getQuizName(score.quizId)}</div>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {score.correctAnswers}/{score.totalQuestions}
                              </span>
                              <span className="text-sm text-gray-500">
                                ({score.accuracy.toFixed(1)}%)
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                              {formatTime(score.timeMs)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {formatDate(score.completedAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}