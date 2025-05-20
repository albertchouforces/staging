import { useState, useEffect } from 'react';
import { getHighScores, getAllHighScores } from '../utils/firebase';
import { QuizScore } from '../types/quiz';
import { quizSets } from '../data/quizData';
import { X } from 'lucide-react';

interface HighScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuizId?: string;
}

export default function HighScoreModal({ 
  isOpen, 
  onClose,
  initialQuizId 
}: HighScoreModalProps) {
  const [selectedQuizId, setSelectedQuizId] = useState(initialQuizId || (quizSets.length > 0 ? quizSets[0].id : ''));
  const [scores, setScores] = useState<Record<string, QuizScore[]>>({});
  const [loading, setLoading] = useState(true);
  
  // Format time in mm:ss.ms format
  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = Math.floor(milliseconds % 1000);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
  };
  
  // Format date
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Load scores
  useEffect(() => {
    if (!isOpen) return;
    
    setLoading(true);
    
    const fetchScores = async () => {
      try {
        const quizScores = await getHighScores(selectedQuizId);
        setScores({ [selectedQuizId]: quizScores });
      } catch (error) {
        console.error('Error fetching scores:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchScores();
  }, [isOpen, selectedQuizId]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl p-6 max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-900">High Scores</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="mb-6">
          <select
            value={selectedQuizId}
            onChange={(e) => setSelectedQuizId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            {quizSets.map(quiz => (
              <option key={quiz.id} value={quiz.id}>{quiz.title}</option>
            ))}
          </select>
        </div>
        
        <div className="flex-grow overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-900"></div>
            </div>
          ) : (
            <div>
              {scores[selectedQuizId]?.length > 0 ? (
                <HighScoreTable 
                  scores={scores[selectedQuizId]} 
                  formatTime={formatTime} 
                  formatDate={formatDate}
                />
              ) : (
                <div className="text-center text-gray-500 py-10">No high scores recorded for this quiz yet</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface HighScoreTableProps {
  scores: QuizScore[];
  formatTime: (milliseconds: number) => string;
  formatDate: (isoString: string) => string;
}

function HighScoreTable({ scores, formatTime, formatDate }: HighScoreTableProps) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-3 text-left font-semibold text-gray-600">Rank</th>
          <th className="p-3 text-left font-semibold text-gray-600">Name</th>
          <th className="p-3 text-left font-semibold text-gray-600">Score</th>
          <th className="p-3 text-left font-semibold text-gray-600">Time</th>
          <th className="p-3 text-left font-semibold text-gray-600">Date</th>
        </tr>
      </thead>
      <tbody>
        {scores.map((score, index) => (
          <tr key={score.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
            <td className="p-3 font-medium">{index + 1}</td>
            <td className="p-3">{score.playerName}</td>
            <td className="p-3">
              {score.correctAnswers}/{score.totalQuestions} ({Math.round((score.correctAnswers / score.totalQuestions) * 100)}%)
            </td>
            <td className="p-3">{formatTime(score.timeTaken)}</td>
            <td className="p-3">{formatDate(score.timestamp)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
