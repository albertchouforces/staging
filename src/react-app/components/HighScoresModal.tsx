import { useState } from 'react';
import { X, Trophy, Clock, Target } from 'lucide-react';
import { quizData } from '@/data/quizData';
import { useHighScores } from '@/react-app/hooks/useHighScores';

interface HighScoresModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HighScoresModal({ isOpen, onClose }: HighScoresModalProps) {
  const [selectedQuizId, setSelectedQuizId] = useState<string>(quizData[0]?.quizID || '');
  const { highScores, loading, error } = useHighScores(selectedQuizId);

  if (!isOpen) return null;

  const selectedQuiz = quizData.find(q => q.quizID === selectedQuizId);

  const formatTime = (milliseconds: number): string => {
    const seconds = milliseconds / 1000;
    return seconds.toFixed(2) + 's';
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const calculateAccuracy = (score: number, total: number): number => {
    return Math.round((score / total) * 100);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-navy-600 to-navy-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">High Scores</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-wrap gap-2">
            {quizData.map((quiz) => (
              <button
                key={quiz.quizID}
                onClick={() => setSelectedQuizId(quiz.quizID)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedQuizId === quiz.quizID
                    ? 'bg-navy-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {quiz.quizName}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-navy-600 border-t-transparent rounded-full"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          ) : highScores.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No high scores yet for {selectedQuiz?.quizName}</p>
              <p className="text-gray-500 mt-2">Be the first to set a record!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Rank</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Score
                      </div>
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Time
                      </div>
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {highScores.map((highScore, index) => {
                    const accuracy = calculateAccuracy(highScore.score, highScore.total_questions);
                    const isTopThree = index < 3;
                    
                    return (
                      <tr
                        key={highScore.id}
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                          isTopThree ? 'bg-yellow-50' : ''
                        }`}
                      >
                        <td className="py-3 px-4">
                          <div className={`font-bold ${
                            index === 0 ? 'text-yellow-600 text-lg' :
                            index === 1 ? 'text-gray-400 text-lg' :
                            index === 2 ? 'text-orange-600 text-lg' :
                            'text-gray-600'
                          }`}>
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`}
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium text-gray-800">
                          {highScore.player_name}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-baseline gap-2">
                            <span className="font-semibold text-navy-700">
                              {highScore.score}/{highScore.total_questions}
                            </span>
                            <span className="text-sm text-gray-600">
                              ({accuracy}%)
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono text-navy-700 font-medium">
                          {formatTime(highScore.time_milliseconds)}
                        </td>
                        <td className="py-3 px-4 text-gray-600 text-sm">
                          {formatDate(highScore.created_at)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50 text-center text-sm text-gray-600">
          Showing top {highScores.length} scores for {selectedQuiz?.quizName}
        </div>
      </div>
    </div>
  );
}
