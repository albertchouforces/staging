import { X } from 'lucide-react';
import { HighScoresList } from './HighScoresList';

interface HighScoreModalProps {
  quizId: string;
  quizTitle: string;
  onClose: () => void;
}

export function HighScoreModal({ quizId, quizTitle, onClose }: HighScoreModalProps) {
  return (
    <div className="fixed inset-0 bg-navy-800/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 bg-navy-50 border-b border-gray-200 flex items-center justify-between">
          <h2 className="font-semibold text-navy-700 text-xl">High Scores: {quizTitle}</h2>
          <button 
            onClick={onClose}
            className="text-navy-500 hover:text-navy-700 p-1 rounded-full hover:bg-navy-100/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-auto p-4">
          <HighScoresList quizId={quizId} />
        </div>
        
        <div className="p-4 border-t border-gray-200 bg-navy-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
