import { useState } from 'react';
import { Trophy, User, X } from 'lucide-react';
import { submitHighScore } from '@/react-app/hooks/useHighScores';
import { SubmitHighScore } from '@/shared/types';

interface SubmitHighScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  quizId: string;
  quizName: string;
  score: number;
  totalQuestions: number;
  timeMilliseconds: number;
}

export default function SubmitHighScoreModal({
  isOpen,
  onClose,
  quizId,
  quizName,
  score,
  totalQuestions,
  timeMilliseconds,
}: SubmitHighScoreModalProps) {
  const [playerName, setPlayerName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!playerName.trim()) {
      setError('Please enter your name');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const highScoreData: SubmitHighScore = {
        quiz_id: quizId,
        player_name: playerName.trim(),
        score,
        total_questions: totalQuestions,
        time_milliseconds: timeMilliseconds,
      };

      await submitHighScore(highScoreData);
      setSuccess(true);
      
      setTimeout(() => {
        onClose();
        setPlayerName('');
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError('Failed to submit high score. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (milliseconds: number): string => {
    const seconds = milliseconds / 1000;
    return seconds.toFixed(2) + 's';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-navy-600 to-navy-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Submit High Score</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-xl font-semibold text-green-600 mb-2">
                Score Submitted!
              </p>
              <p className="text-gray-600">
                Your high score has been recorded.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1">Quiz</p>
                  <p className="font-semibold text-navy-800">{quizName}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Score</p>
                    <p className="font-semibold text-navy-800">
                      {score}/{totalQuestions}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Time</p>
                    <p className="font-semibold text-navy-800 font-mono">
                      {formatTime(timeMilliseconds)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="playerName"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Enter your name"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    maxLength={50}
                    disabled={submitting}
                  />
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={submitting}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || !playerName.trim()}
                  className="flex-1 px-4 py-3 bg-navy-600 text-white font-medium rounded-lg hover:bg-navy-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Trophy className="w-4 h-4" />
                      Submit Score
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
