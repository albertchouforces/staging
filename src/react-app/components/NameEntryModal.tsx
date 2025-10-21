import { useState } from 'react';
import { User, Save } from 'lucide-react';

interface NameEntryModalProps {
  isOpen: boolean;
  onSubmit: (name: string) => void;
  onSkip: () => void;
}

export default function NameEntryModal({ isOpen, onSubmit, onSkip }: NameEntryModalProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
      setName('');
    }
  };

  const handleSkip = () => {
    setName('');
    onSkip();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-navy-50 rounded-full">
                <User className="w-8 h-8 text-navy-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Save Your Score!</h2>
            <p className="text-gray-600">
              Enter your name to save your score to the leaderboard.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="playerName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name..."
                maxLength={50}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-navy-500 outline-none transition-colors duration-200"
                autoFocus
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={!name.trim()}
                className="flex-1 flex items-center justify-center space-x-2 bg-navy-600 hover:bg-navy-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <Save className="w-4 h-4" />
                <span>Save Score</span>
              </button>
              
              <button
                type="button"
                onClick={handleSkip}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Skip
              </button>
            </div>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            Your score will be visible on the public leaderboard.
          </p>
        </div>
      </div>
    </div>
  );
}
