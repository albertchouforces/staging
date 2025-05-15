import { useEffect, useState } from 'react';
import { HighScore } from '../types/quiz';
import { getHighScores } from '../firebase/highScoreService';
import { Calendar, Clock, Medal, Percent, Trophy } from 'lucide-react';

interface HighScoresListProps {
  quizId: string;
}

export function HighScoresList({ quizId }: HighScoresListProps) {
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHighScores() {
      try {
        setLoading(true);
        const scores = await getHighScores(quizId);
        setHighScores(scores);
        setError(null);
        console.log('Fetched high scores:', scores); // Debug log to verify scores
      } catch (err) {
        console.error('Error fetching high scores:', err);
        setError('Failed to load high scores. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchHighScores();
  }, [quizId]);

  // Format seconds to MM:SS.ms
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 1000);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
  };

  // Format date to readable string
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-pulse text-navy-500">Loading high scores...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-600 text-center">
        {error}
      </div>
    );
  }

  if (highScores.length === 0) {
    return (
      <div className="bg-navy-50 p-6 rounded-lg text-navy-600 text-center">
        <Trophy className="w-10 h-10 mx-auto mb-3 text-navy-400" />
        <p>No high scores yet. Be the first to set a record!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 bg-navy-50 border-b border-gray-200">
        <h3 className="font-semibold text-navy-700 text-lg">High Scores</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-navy-50">
              <th className="p-3 text-navy-600 font-medium text-sm border-b border-gray-200 w-12">#</th>
              <th className="p-3 text-navy-600 font-medium text-sm border-b border-gray-200">Player</th>
              <th className="p-3 text-navy-600 font-medium text-sm border-b border-gray-200 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Medal className="w-4 h-4" />
                  <span>Score</span>
                </div>
              </th>
              <th className="p-3 text-navy-600 font-medium text-sm border-b border-gray-200 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Percent className="w-4 h-4" />
                  <span>Accuracy</span>
                </div>
              </th>
              <th className="p-3 text-navy-600 font-medium text-sm border-b border-gray-200 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Time</span>
                </div>
              </th>
              <th className="p-3 text-navy-600 font-medium text-sm border-b border-gray-200 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Date</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {highScores.map((score, index) => (
              <tr key={score.id} className="border-b border-gray-100 hover:bg-navy-50/30">
                <td className="p-3 text-navy-700 font-medium">{index + 1}</td>
                <td className="p-3 text-navy-700">{score.playerName}</td>
                <td className="p-3 text-navy-700 text-center">{Math.round(score.score)}%</td>
                <td className="p-3 text-navy-700 text-center">{Math.round(score.accuracy)}%</td>
                <td className="p-3 text-navy-700 text-center font-mono text-xs">{formatTime(score.timeInSeconds)}</td>
                <td className="p-3 text-navy-600 text-center">{formatDate(score.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
