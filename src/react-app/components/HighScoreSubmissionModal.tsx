import { useState } from 'react';
import { Trophy, User, Clock, Target } from 'lucide-react';
import { useHighScores } from '@/react-app/hooks/useHighScores';

interface HighScoreSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  quizId: string;
  quizName: string;
  score: number;
  totalQuestions: number;
  timeMs: number;
}

export default function HighScoreSubmissionModal({
  isOpen,
  onClose,
  quizId,
  quizName,
  score,
  totalQuestions,
  timeMs
}: HighScoreSubmissionModalProps) {
  const [playerName, setPlayerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { saveHighScore } = useHighScores();

  const accuracy = Math.round((score / totalQuestions) * 100);
  const timeSeconds = (timeMs / 1000).toFixed(2);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) return;

    try {
      setIsSubmitting(true);
      await saveHighScore({
        quizId,
        playerName: playerName.trim(),
        correctAnswers: score,
        totalQuestions,
        accuracy,
        timeMs
      });
      onClose();
    } catch (error) {
      console.error('Failed to save high score:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Great Job!</h2>
          <p className="text-gray-600">Submit your score to the leaderboard</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 mb-3">{quizName}</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
                  <Target className="w-4 h-4" />
                  <span className="text-sm">Score</span>
                </div>
                <div className="font-bold text-gray-900">
                  {score}/{totalQuestions}
                </div>
                <div className="text-sm text-gray-500">({accuracy}%)</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Time</span>
                </div>
                <div className="font-bold text-gray-900 font-mono">{timeSeconds}s</div>
              </div>
              <div className="text-center">
                <div className="text-gray-500 mb-1">
                  <span className="text-sm">Rank</span>
                </div>
                <div className="text-2xl">🏆</div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Enter your name
              </div>
            </label>
            <input
              type="text"
              id="playerName"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
              maxLength={50}
              disabled={isSubmitting}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleSkip}
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors disabled:opacity-50"
            >
              Skip
            </button>
            <button
              type="submit"
              disabled={!playerName.trim() || isSubmitting}
              className="flex-1 px-4 py-3 bg-navy-600 hover:bg-navy-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : 'Submit Score'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}