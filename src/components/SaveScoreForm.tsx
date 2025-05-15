import React, { useState } from 'react';
import { addHighScore } from '../firebase/highScoreService';
import { Save, Trophy } from 'lucide-react';

interface SaveScoreFormProps {
  quizId: string;
  score: number;
  accuracy: number;
  timeInSeconds: number;
  onSaveComplete: () => void;
}

export function SaveScoreForm({ 
  quizId, 
  score, 
  accuracy, 
  timeInSeconds, 
  onSaveComplete 
}: SaveScoreFormProps) {
  const [playerName, setPlayerName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!playerName.trim()) {
      setError('Please enter your name');
      return;
    }
    
    try {
      setIsSaving(true);
      setError(null);
      
      await addHighScore({
        quizId,
        playerName: playerName.trim(),
        score,
        accuracy,
        timeInSeconds
      });
      
      setIsSaved(true);
      onSaveComplete();
    } catch (err) {
      console.error('Error saving score:', err);
      setError('Failed to save your score. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isSaved) {
    return (
      <div className="bg-green-50 p-4 rounded-lg text-green-700 text-center animate-pulse">
        Score saved successfully!
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <Trophy className="w-6 h-6 text-navy-500" />
        <h3 className="text-lg font-semibold text-navy-700">Save Your Score</h3>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="playerName" className="block text-navy-600 mb-1 text-sm">
            Enter Your Name
          </label>
          <input
            type="text"
            id="playerName"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-navy-500"
            placeholder="Your name"
            maxLength={20}
            disabled={isSaving}
          />
        </div>
        
        {error && (
          <div className="mb-4 text-red-600 text-sm">
            {error}
          </div>
        )}
        
        <button
          type="submit"
          disabled={isSaving}
          className={`w-full p-3 rounded-lg flex items-center justify-center gap-2 ${
            isSaving
              ? 'bg-navy-300 cursor-not-allowed'
              : 'bg-navy-600 hover:bg-navy-700'
          } text-white transition-colors`}
        >
          {isSaving ? (
            <>Saving...</>
          ) : (
            <>
              <Save className="w-5 h-5" />
              <span>Save Score</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
