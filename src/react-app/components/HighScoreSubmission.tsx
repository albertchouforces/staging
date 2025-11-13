import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';

interface HighScoreSubmissionProps {
  quizID: string;
  score: number;
  totalQuestions: number;
  timeInMs: number;
  onSubmit: () => void;
}

export default function HighScoreSubmission({
  quizID,
  score,
  totalQuestions,
  timeInMs,
  onSubmit,
}: HighScoreSubmissionProps) {
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitting(true);
    setError(null);
    try {
      await addDoc(collection(db, 'highScores'), {
        quizID,
        name: name.trim(),
        score,
        totalQuestions,
        timeInMs,
        timestamp: Date.now(),
      });
      onSubmit();
    } catch (err) {
      console.error('Error submitting high score:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      
      if (errorMessage.includes('unavailable') || errorMessage.includes('404')) {
        setError('Firestore Database is not enabled. Please enable it in Firebase Console.');
      } else if (errorMessage.includes('permission')) {
        setError('Permission denied. Please check Firestore security rules.');
      } else {
        setError('Failed to submit high score. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-8 bg-navy-50 border-2 border-navy-200 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-navy-900 mb-4">
        Submit Your High Score
      </h3>
      
      {error && (
        <div className="mb-4 bg-red-50 border-2 border-red-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-red-700">{error}</p>
              {error.includes('Firestore Database') && (
                <a
                  href="https://console.firebase.google.com/project/test-a29e7/firestore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-1 text-sm text-red-600 hover:text-red-800 underline"
                >
                  Open Firebase Console →
                </a>
              )}
            </div>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-navy-700 mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            maxLength={50}
            className="w-full px-4 py-2 border-2 border-navy-200 rounded-lg focus:outline-none focus:border-navy-600 transition-colors"
            required
          />
        </div>
        <button
          type="submit"
          disabled={submitting || !name.trim()}
          className="w-full bg-navy-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-navy-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? 'Submitting...' : 'Submit High Score'}
        </button>
      </form>
    </div>
  );
}
