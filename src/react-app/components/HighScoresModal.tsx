import { useState, useEffect } from 'react';
import { X, Trophy, Clock, Target, Calendar } from 'lucide-react';
import { HighScore } from '@/shared/types';
import { getHighScores, getAllHighScores } from '@/firebase/highScores';
import { quizData } from '@/data/quizData';

interface HighScoresModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HighScoresModal({ isOpen, onClose }: HighScoresModalProps) {
  const [selectedQuizId, setSelectedQuizId] = useState<string>('all');
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [loading, setLoading] = useState(false);

  const formatTime = (timeMs: number): string => {
    const seconds = timeMs / 1000;
    return `${seconds.toFixed(2)}s`;
  };

  const formatDateTime = (dateTime: string): string => {
    const date = new Date(dateTime);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const loadHighScores = async (quizId: string) => {
    setLoading(true);
    try {
      let scores: HighScore[] = [];
      if (quizId === 'all') {
        scores = await getAllHighScores(50);
      } else {
        scores = await getHighScores(quizId, 20);
      }
      setHighScores(scores);
    } catch (error) {
      console.error('Failed to load high scores:', error);
      setHighScores([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadHighScores(selectedQuizId);
    }
  }, [isOpen, selectedQuizId]);

  const handleQuizChange = (quizId: string) => {
    setSelectedQuizId(quizId);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-navy-600 to-navy-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <Trophy className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold">High Scores</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Quiz Selector */}
          <div className="mt-4">
            <select
              value={selectedQuizId}
              onChange={(e) => handleQuizChange(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <option value="all" className="text-gray-900">All Quizzes</option>
              {quizData.map((quiz) => (
                <option key={quiz.quizID} value={quiz.quizID} className="text-gray-900">
                  {quiz.quizName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy-600"></div>
              <span className="ml-3 text-gray-600">Loading high scores...</span>
            </div>
          ) : highScores.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No high scores yet!</p>
              <p className="text-gray-500">Be the first to complete a quiz and set a record.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Rank</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Score</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Time</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                    {selectedQuizId === 'all' && (
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Quiz</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {highScores.map((score, index) => (
                    <tr
                      key={score.id}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 ${
                        index < 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : ''
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          {index === 0 && <span className="text-yellow-500 text-lg">🥇</span>}
                          {index === 1 && <span className="text-gray-400 text-lg">🥈</span>}
                          {index === 2 && <span className="text-yellow-600 text-lg">🥉</span>}
                          <span className="font-semibold text-gray-900">#{index + 1}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-gray-900">{score.playerName}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Target className="w-4 h-4 text-green-600" />
                          <span className="font-medium text-gray-900">
                            {score.score}/{score.totalQuestions}
                          </span>
                          <span className="text-sm text-gray-600">
                            ({score.accuracy.toFixed(1)}%)
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span className="font-medium text-gray-900">
                            {formatTime(score.timeMs)}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-purple-600" />
                          <span className="text-sm text-gray-700">
                            {formatDateTime(score.dateTime)}
                          </span>
                        </div>
                      </td>
                      {selectedQuizId === 'all' && (
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-navy-100 text-navy-800">
                            {score.quizName}
                          </span>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
