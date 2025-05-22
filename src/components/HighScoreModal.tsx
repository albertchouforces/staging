import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { quizData } from '../data/quizData';
import { HighScore } from '../types/highScore';
import { X } from 'lucide-react';

// Make sure to bind modal to your app element for accessibility
Modal.setAppElement('#root');

interface HighScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HighScoreModal({ isOpen, onClose }: HighScoreModalProps) {
  const [selectedQuizID, setSelectedQuizID] = useState<string>('');
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Initialize with the first quiz
  useEffect(() => {
    if (quizData.length > 0 && isOpen) {
      setSelectedQuizID(quizData[0].quizID);
    }
  }, [isOpen]);

  // Fetch high scores when quiz changes
  useEffect(() => {
    async function fetchHighScores() {
      if (!selectedQuizID) return;
      
      setLoading(true);
      try {
        const q = query(
          collection(db, 'highScores'),
          where('quizID', '==', selectedQuizID),
          orderBy('timeTaken', 'asc')
        );
        
        const querySnapshot = await getDocs(q);
        const scores: HighScore[] = [];
        
        querySnapshot.forEach((doc) => {
          scores.push({
            id: doc.id,
            ...doc.data() as Omit<HighScore, 'id'>
          });
        });
        
        setHighScores(scores);
      } catch (error) {
        console.error('Error fetching high scores:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchHighScores();
  }, [selectedQuizID]);

  // Format time from milliseconds
  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10); // Convert to 2 digits
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
  };

  // Calculate accuracy percentage
  const calculateAccuracy = (score: number, total: number) => {
    return Math.round((score / total) * 100);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="High Scores"
      className="bg-white max-w-3xl mx-auto mt-20 p-6 rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-navy-900 bg-opacity-75 flex"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-navy-800">High Scores</h2>
        <button 
          onClick={onClose}
          className="text-navy-600 hover:text-navy-800"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      
      <div className="mb-6">
        <label htmlFor="quizSelect" className="block mb-2 text-navy-700 font-medium">
          Select Quiz:
        </label>
        <select
          id="quizSelect"
          value={selectedQuizID}
          onChange={(e) => setSelectedQuizID(e.target.value)}
          className="w-full p-2 border border-navy-200 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
        >
          {quizData.map((quiz) => (
            <option key={quiz.quizID} value={quiz.quizID}>
              {quiz.quizName}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-navy-600 border-r-transparent"></div>
          <p className="mt-2 text-navy-600">Loading high scores...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-navy-50 text-navy-700">
                <th className="py-3 px-4 text-left">Rank</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Score</th>
                <th className="py-3 px-4 text-left">Time</th>
                <th className="py-3 px-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {highScores.length > 0 ? (
                highScores.map((score, index) => (
                  <tr key={score.id} className={index % 2 === 0 ? 'bg-white' : 'bg-navy-50'}>
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{score.name}</td>
                    <td className="py-3 px-4">
                      {score.score}/{score.totalQuestions} ({calculateAccuracy(score.score, score.totalQuestions)}%)
                    </td>
                    <td className="py-3 px-4">{formatTime(score.timeTaken)}</td>
                    <td className="py-3 px-4">{new Date(score.date).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-navy-600">
                    No high scores found for this quiz yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </Modal>
  );
}
