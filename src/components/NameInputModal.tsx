import { useState } from 'react';
import { addHighScore } from '../utils/firebase';
import { QuizScore } from '../types/quiz';

interface NameInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  quizId: string;
  score: number;
  totalQuestions: number;
  timeTaken: number;
}

export default function NameInputModal({
  isOpen,
  onClose,
  quizId,
  score,
  totalQuestions,
  timeTaken
}: NameInputModalProps) {
  const [playerName, setPlayerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  if (!isOpen) return null;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!playerName.trim()) {
      setError('Please enter your name');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const scoreData: QuizScore = {
        quizId,
        playerName: playerName.trim(),
        score,
        correctAnswers: score,
        totalQuestions,
        timeTaken,
        timestamp: new Date().toISOString()
      };
      
      await addHighScore(scoreData);
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      console.error('Error submitting score:', error);
      setError('Failed to submit score. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">
          {success ? 'Score Submitted!' : 'Submit Your Score'}
        </h2>
        
        {success ? (
          <div className="text-center py-4">
            <div className="mb-4 text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <p className="text-gray-700">Your score has been successfully submitted!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                You scored {score}/{totalQuestions} in {(timeTaken / 1000).toFixed(2)} seconds.
              </p>
              
              <label className="block text-gray-700 mb-2">Enter your name:</label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
                maxLength={20}
                autoFocus
              />
              
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors flex items-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="mr-2">Submitting</span>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  </>
                ) : (
                  'Submit Score'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
