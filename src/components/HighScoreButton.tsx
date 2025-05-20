import { useState } from 'react';
import { Trophy } from 'lucide-react';
import HighScoreModal from './HighScoreModal';

interface HighScoreButtonProps {
  quizId?: string;
}

export default function HighScoreButton({ quizId }: HighScoreButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 text-blue-900 hover:text-blue-700 transition-colors"
        aria-label="View high scores"
      >
        <Trophy size={18} />
        <span className="font-medium">High Scores</span>
      </button>
      
      <HighScoreModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialQuizId={quizId}
      />
    </>
  );
}
