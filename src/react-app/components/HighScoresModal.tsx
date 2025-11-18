import { useEffect, useState } from 'react';
import { X, Trophy, Loader2 } from 'lucide-react';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { HighScore, HighScoreDisplay } from '@/shared/highScoreTypes';

interface HighScoresModalProps {
  isOpen: boolean;
  onClose: () => void;
  quizzes: { quizID: string; quizName: string }[];
}

export default function HighScoresModal({ isOpen, onClose, quizzes }: HighScoresModalProps) {
  const [selectedQuizID, setSelectedQuizID] = useState<string>('');
  const [highScores, setHighScores] = useState<HighScoreDisplay[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (quizzes.length > 0 && !selectedQuizID) {
      setSelectedQuizID(quizzes[0].quizID);
    }
  }, [quizzes, selectedQuizID]);

  useEffect(() => {
    if (!selectedQuizID) return;

    const fetchHighScores = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, 'highScores'),
          where('quizID', '==', selectedQuizID),
          orderBy('timeMs', 'asc'),
          orderBy('score', 'desc'),
          limit(100)
        );

        const querySnapshot = await getDocs(q);
        const scores: HighScoreDisplay[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data() as HighScore;
          scores.push({
            rank: 0,
            name: data.name,
            score: data.score,
            totalQuestions: data.totalQuestions,
            accuracy: Math.round((data.score / data.totalQuestions) * 100),
            timeMs: data.timeMs,
            createdAt: data.createdAt.toDate(),
          });
        });

        // Assign ranks
        scores.forEach((score, index) => {
          score.rank = index + 1;
        });

        setHighScores(scores);
      } catch (error) {
        console.error('Error fetching high scores:', error);
        setHighScores([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHighScores();
  }, [selectedQuizID]);

  const formatTime = (ms: number): string => {
    const seconds = ms / 1000;
    return seconds.toFixed(2) + 's';
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-navy-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-navy-600 rounded-full flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-navy-900">High Scores</h2>
          </div>
          <button
            onClick={onClose}
            className="text-navy-600 hover:text-navy-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 border-b border-navy-200">
          <div className="flex gap-2 flex-wrap">
            {quizzes.map((quiz) => (
              <button
                key={quiz.quizID}
                onClick={() => setSelectedQuizID(quiz.quizID)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedQuizID === quiz.quizID
                    ? 'bg-navy-600 text-white'
                    : 'bg-navy-100 text-navy-700 hover:bg-navy-200'
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
              <Loader2 className="w-8 h-8 animate-spin text-navy-600" />
            </div>
          ) : highScores.length === 0 ? (
            <div className="text-center py-12 text-navy-600">
              No high scores yet. Be the first to set a record!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-navy-200">
                    <th className="text-left py-3 px-4 font-semibold text-navy-900">Rank</th>
                    <th className="text-left py-3 px-4 font-semibold text-navy-900">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-navy-900">Score</th>
                    <th className="text-left py-3 px-4 font-semibold text-navy-900">Time</th>
                    <th className="text-left py-3 px-4 font-semibold text-navy-900">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {highScores.map((score, index) => (
                    <tr
                      key={index}
                      className={`border-b border-navy-100 ${
                        score.rank <= 3 ? 'bg-navy-50' : ''
                      }`}
                    >
                      <td className="py-3 px-4">
                        <span
                          className={`font-semibold ${
                            score.rank === 1
                              ? 'text-yellow-600'
                              : score.rank === 2
                              ? 'text-gray-400'
                              : score.rank === 3
                              ? 'text-orange-700'
                              : 'text-navy-900'
                          }`}
                        >
                          {score.rank}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-navy-900 font-medium">
                        {score.name}
                      </td>
                      <td className="py-3 px-4 text-navy-900">
                        {score.score}/{score.totalQuestions} ({score.accuracy}%)
                      </td>
                      <td className="py-3 px-4 text-navy-900 font-mono">
                        {formatTime(score.timeMs)}
                      </td>
                      <td className="py-3 px-4 text-navy-600 text-sm">
                        {formatDate(score.createdAt)}
                      </td>
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
