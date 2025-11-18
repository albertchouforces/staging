import { useState } from 'react';
import { X, Trophy, Loader2 } from 'lucide-react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/firebase/config';

interface SubmitScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  quizID: string;
  score: number;
  totalQuestions: number;
  timeMs: number;
}

export default function SubmitScoreModal({
  isOpen,
  onClose,
  quizID,
  score,
  totalQuestions,
  timeMs,
}: SubmitScoreModalProps) {
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    if (name.length > 50) {
      setError('Name must be 50 characters or less');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await addDoc(collection(db, 'highScores'), {
        quizID,
        name: name.trim(),
        score,
        totalQuestions,
        timeMs,
        createdAt: Timestamp.now(),
      });

      onClose();
    } catch (err) {
      console.error('Error submitting score:', err);
      setError('Failed to submit score. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (ms: number): string => {
    const seconds = ms / 1000;
    return seconds.toFixed(2) + 's';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-navy-600 rounded-full flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-navy-900">Submit Your Score</h2>
          </div>
          <button
            onClick={onClose}
            className="text-navy-600 hover:text-navy-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-navy-50 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-sm text-navy-600 mb-1">Score</div>
              <div className="text-xl font-bold text-navy-900">
                {score}/{totalQuestions}
              </div>
              <div className="text-sm text-navy-600">
                ({Math.round((score / totalQuestions) * 100)}%)
              </div>
            </div>
            <div>
              <div className="text-sm text-navy-600 mb-1">Time</div>
              <div className="text-xl font-bold text-navy-900 font-mono">
                {formatTime(timeMs)}
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-navy-900 mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              maxLength={50}
              className="w-full px-4 py-3 border-2 border-navy-200 rounded-lg focus:outline-none focus:border-navy-600 transition-colors"
              disabled={submitting}
            />
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-6 py-3 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Score'
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-6 py-3 border-2 border-navy-200 text-navy-900 rounded-lg hover:bg-navy-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Skip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
