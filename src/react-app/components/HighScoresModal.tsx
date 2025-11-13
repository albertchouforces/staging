import { useState, useEffect } from 'react';
import { X, Trophy, AlertCircle } from 'lucide-react';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config';

interface HighScore {
  id: string;
  name: string;
  score: number;
  totalQuestions: number;
  timeInMs: number;
  timestamp: number;
}

interface HighScoresModalProps {
  isOpen: boolean;
  onClose: () => void;
  quizzes: Array<{ quizID: string; quizName: string }>;
}

export default function HighScoresModal({ isOpen, onClose, quizzes }: HighScoresModalProps) {
  const [selectedQuizID, setSelectedQuizID] = useState(quizzes[0]?.quizID || '');
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && selectedQuizID) {
      loadHighScores(selectedQuizID);
    }
  }, [isOpen, selectedQuizID]);

  const loadHighScores = async (quizID: string) => {
    setLoading(true);
    setError(null);
    try {
      const scoresRef = collection(db, 'highScores');
      const q = query(
        scoresRef,
        where('quizID', '==', quizID),
        orderBy('score', 'desc'),
        orderBy('timeInMs', 'asc'),
        limit(10)
      );
      
      const querySnapshot = await getDocs(q);
      const scores: HighScore[] = [];
      querySnapshot.forEach((doc) => {
        scores.push({ id: doc.id, ...doc.data() } as HighScore);
      });
      
      setHighScores(scores);
    } catch (err) {
      console.error('Error loading high scores:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      
      if (errorMessage.includes('unavailable') || errorMessage.includes('404')) {
        setError('Firestore Database is not enabled. Please enable it in Firebase Console.');
      } else if (errorMessage.includes('index')) {
        setError('Database index required. Please create the composite index in Firebase Console.');
      } else {
        setError('Failed to load high scores. Please check your internet connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (ms: number) => {
    const seconds = ms / 1000;
    return seconds.toFixed(2);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-navy-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-navy-600 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-navy-900">High Scores</h2>
          </div>
          <button
            onClick={onClose}
            className="text-navy-400 hover:text-navy-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-navy-700 mb-2">
              Select Quiz
            </label>
            <select
              value={selectedQuizID}
              onChange={(e) => setSelectedQuizID(e.target.value)}
              className="w-full px-4 py-2 border-2 border-navy-100 rounded-lg focus:outline-none focus:border-navy-600 transition-colors"
            >
              {quizzes.map((quiz) => (
                <option key={quiz.quizID} value={quiz.quizID}>
                  {quiz.quizName}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-red-900 mb-1">Error Loading High Scores</h3>
                  <p className="text-sm text-red-700">{error}</p>
                  {error.includes('Firestore Database') && (
                    <a
                      href="https://console.firebase.google.com/project/test-a29e7/firestore"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-sm text-red-600 hover:text-red-800 underline"
                    >
                      Open Firebase Console →
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-navy-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : highScores.length === 0 && !error ? (
            <div className="text-center py-12 text-navy-500">
              No high scores yet. Be the first to set a record!
            </div>
          ) : !error ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-navy-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-navy-700">Rank</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-navy-700">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-navy-700">Score</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-navy-700">Time (s)</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-navy-700">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {highScores.map((score, index) => {
                    const accuracy = Math.round((score.score / score.totalQuestions) * 100);
                    return (
                      <tr
                        key={score.id}
                        className="border-b border-navy-100 hover:bg-navy-50 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <span className={`font-semibold ${
                            index === 0 ? 'text-yellow-600' :
                            index === 1 ? 'text-gray-400' :
                            index === 2 ? 'text-orange-600' :
                            'text-navy-600'
                          }`}>
                            {index + 1}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-navy-900 font-medium">{score.name}</td>
                        <td className="py-3 px-4 text-navy-700">
                          {score.score}/{score.totalQuestions} ({accuracy}%)
                        </td>
                        <td className="py-3 px-4 text-navy-700">{formatTime(score.timeInMs)}</td>
                        <td className="py-3 px-4 text-navy-600 text-sm">{formatDate(score.timestamp)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
