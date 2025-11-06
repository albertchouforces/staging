import { useEffect, useState } from 'react';
import { X, Trophy, Clock, Target, Calendar } from 'lucide-react';

interface HighScore {
  id: number;
  quiz_id: string;
  player_name: string;
  correct_answers: number;
  total_questions: number;
  accuracy_percentage: number;
  time_taken_ms: number;
  created_at: string;
}

interface QuizSummary {
  quizID: string;
  quizName: string;
  questionCount: number;
}

interface HighScoresModalProps {
  isOpen: boolean;
  onClose: () => void;
  quizzes: QuizSummary[];
}

export default function HighScoresModal({ isOpen, onClose, quizzes }: HighScoresModalProps) {
  const [selectedQuiz, setSelectedQuiz] = useState<string>('');
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && quizzes.length > 0 && !selectedQuiz) {
      setSelectedQuiz(quizzes[0].quizID);
    }
  }, [isOpen, quizzes, selectedQuiz]);

  useEffect(() => {
    if (selectedQuiz) {
      setLoading(true);
      fetch(`/api/high-scores/${selectedQuiz}`)
        .then((res) => res.json())
        .then((data) => {
          // Ensure data is an array before setting highScores
          if (Array.isArray(data)) {
            setHighScores(data);
          } else {
            console.error('Expected array from high scores API, received:', data);
            setHighScores([]);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching high scores:', error);
          setHighScores([]);
          setLoading(false);
        });
    }
  }, [selectedQuiz]);

  const formatTime = (ms: number) => {
    const seconds = ms / 1000;
    return `${seconds.toFixed(2)}s`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (!isOpen) return null;

  const selectedQuizName = quizzes.find(q => q.quizID === selectedQuiz)?.quizName || '';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-900 to-blue-700">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">High Scores</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-blue-900 mb-2">
              Select Quiz
            </label>
            <select
              value={selectedQuiz}
              onChange={(e) => setSelectedQuiz(e.target.value)}
              className="w-full p-3 border-2 border-blue-900 rounded-xl font-semibold text-blue-900 bg-white"
            >
              {quizzes.map((quiz) => (
                <option key={quiz.quizID} value={quiz.quizID}>
                  {quiz.quizName}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 mb-4">
            <h3 className="text-lg font-bold text-blue-900 mb-2">{selectedQuizName}</h3>
            <p className="text-blue-700">
              Rankings are sorted by fastest time, then by accuracy
            </p>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin text-blue-900">
                  <Trophy className="w-8 h-8" />
                </div>
              </div>
            ) : highScores.length === 0 ? (
              <div className="text-center py-12">
                <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-xl text-gray-500">No high scores yet</p>
                <p className="text-gray-400">Be the first to complete this quiz!</p>
              </div>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-900 text-white">
                    <th className="text-left p-4 rounded-tl-xl font-bold">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4" />
                        Rank
                      </div>
                    </th>
                    <th className="text-left p-4 font-bold">Name</th>
                    <th className="text-left p-4 font-bold">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Score
                      </div>
                    </th>
                    <th className="text-left p-4 font-bold">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Time
                      </div>
                    </th>
                    <th className="text-left p-4 rounded-tr-xl font-bold">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Date
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {highScores.map((score, index) => (
                    <tr
                      key={score.id}
                      className={`border-b border-gray-200 hover:bg-blue-50 transition-colors ${
                        index === 0 ? 'bg-yellow-50' : index === 1 ? 'bg-gray-50' : ''
                      }`}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {index === 0 && <span className="text-2xl">🥇</span>}
                          {index === 1 && <span className="text-2xl">🥈</span>}
                          {index === 2 && <span className="text-2xl">🥉</span>}
                          <span className="font-bold text-blue-900">#{index + 1}</span>
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-gray-900">
                        {score.player_name}
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-blue-900">
                          {score.correct_answers}/{score.total_questions}
                        </div>
                        <div className="text-sm text-gray-600">
                          ({score.accuracy_percentage.toFixed(0)}%)
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-mono font-bold text-green-600">
                          {formatTime(score.time_taken_ms)}
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        {formatDate(score.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
