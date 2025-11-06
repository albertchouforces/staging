import { useState } from 'react';
import { Trophy, User, Save } from 'lucide-react';

interface SaveHighScoreModalProps {
  isOpen: boolean;
  onSave: (playerName: string) => void;
  onSkip: () => void;
  score: number;
  totalQuestions: number;
  timeMs: number;
  accuracy: number;
}

export default function SaveHighScoreModal({
  isOpen,
  onSave,
  onSkip,
  score,
  totalQuestions,
  timeMs,
  accuracy
}: SaveHighScoreModalProps) {
  const [playerName, setPlayerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    if (!playerName.trim()) return;
    
    setIsSubmitting(true);
    await onSave(playerName.trim());
    setIsSubmitting(false);
  };

  const formatTime = (ms: number) => {
    const seconds = ms / 1000;
    return `${seconds.toFixed(2)}s`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
        <div className="p-6 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Great Job!</h2>
          <p className="text-gray-600 mb-6">Save your score to the leaderboard</p>
          
          <div className="bg-blue-50 rounded-xl p-4 mb-6 space-y-2">
            <div className="flex justify-between">
              <span className="font-semibold text-blue-900">Score:</span>
              <span className="text-blue-700">{score}/{totalQuestions} ({accuracy}%)</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-blue-900">Time:</span>
              <span className="text-blue-700 font-mono">{formatTime(timeMs)}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-900 focus:outline-none"
                maxLength={50}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && playerName.trim()) {
                    handleSave();
                  }
                }}
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={!playerName.trim() || isSubmitting}
                className="flex-1 bg-blue-900 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                {isSubmitting ? 'Saving...' : 'Save Score'}
              </button>
              <button
                onClick={onSkip}
                disabled={isSubmitting}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
