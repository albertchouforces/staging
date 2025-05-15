import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { HighScoresList } from './HighScoresList';
import { Quiz } from '../types/quiz';

interface AllHighScoresModalProps {
  quizzes: Quiz[];
  onClose: () => void;
}

export function AllHighScoresModal({ quizzes, onClose }: AllHighScoresModalProps) {
  const [selectedQuizId, setSelectedQuizId] = useState<string>(quizzes[0]?.id || '');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectedQuiz = quizzes.find(quiz => quiz.id === selectedQuizId);

  return (
    <div className="fixed inset-0 bg-navy-800/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 bg-navy-50 border-b border-gray-200 flex items-center justify-between">
          <h2 className="font-semibold text-navy-700 text-xl">Quiz High Scores</h2>
          <button 
            onClick={onClose}
            className="text-navy-500 hover:text-navy-700 p-1 rounded-full hover:bg-navy-100/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 bg-navy-50 border-b border-gray-200">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full p-2.5 bg-white text-navy-700 border border-gray-200 rounded-lg flex items-center justify-between"
            >
              <span>{selectedQuiz?.title || 'Select a quiz'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'transform rotate-180' : ''}`} />
            </button>
            
            {dropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                {quizzes.map(quiz => (
                  <button
                    key={quiz.id}
                    onClick={() => {
                      setSelectedQuizId(quiz.id);
                      setDropdownOpen(false);
                    }}
                    className={`w-full p-3 text-left hover:bg-navy-50 transition-colors ${
                      selectedQuizId === quiz.id ? 'bg-navy-50 font-medium' : ''
                    }`}
                  >
                    {quiz.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex-1 overflow-auto p-4">
          {selectedQuizId && <HighScoresList quizId={selectedQuizId} />}
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
