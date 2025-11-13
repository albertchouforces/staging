import { useState } from 'react';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitting(true);
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
    } catch (error) {
      console.error('Error submitting high score:', error);
      alert('Failed to submit high score. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-8 bg-navy-50 border-2 border-navy-200 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-navy-900 mb-4">
        Submit Your High Score
      </h3>
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
