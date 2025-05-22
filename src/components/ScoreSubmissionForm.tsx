import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { HighScore } from '../types/highScore';
import { RotateCw } from 'lucide-react';

interface ScoreSubmissionFormProps {
  score: number;
  totalQuestions: number;
  quizID: string;
  timeTaken: number;
  onSubmitted: () => void;
}

export function ScoreSubmissionForm({ 
  score, 
  totalQuestions, 
  quizID, 
  timeTaken,
  onSubmitted 
}: ScoreSubmissionFormProps) {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const highScore: Omit<HighScore, 'id'> = {
        name: name.trim(),
        quizID,
        score,
        totalQuestions,
        timeTaken,
        date: new Date().toISOString()
      };
      
      await addDoc(collection(db, 'highScores'), highScore);
      setSubmitted(true);
      onSubmitted();
    } catch (error) {
      console.error('Error submitting score:', error);
      setError('Failed to submit score. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center p-4 bg-green-50 rounded-md border border-green-200 mb-4">
        <p className="text-green-700 font-medium">Your score has been submitted!</p>
      </div>
    );
  }

  return (
    <div className="mt-6 p-4 bg-navy-50 rounded-md border border-navy-100">
      <h3 className="text-lg font-medium text-navy-800 mb-3">Submit Your Score</h3>
      
      {error && (
        <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 text-navy-700">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-navy-200 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
            placeholder="Enter your name"
            disabled={isSubmitting}
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-navy-600 text-white rounded-md hover:bg-navy-700 transition-colors disabled:opacity-70"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <RotateCw className="mr-2 h-4 w-4 animate-spin" /> Submitting...
            </span>
          ) : (
            'Submit Score'
          )}
        </button>
      </form>
    </div>
  );
}
