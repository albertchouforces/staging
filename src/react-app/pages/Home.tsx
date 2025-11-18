import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Loader2, BookOpen, Trophy } from 'lucide-react';
import HighScoresModal from '@/react-app/components/HighScoresModal';

interface QuizListItem {
  quizID: string;
  quizName: string;
  questionCount: number;
}

export default function Home() {
  const [quizzes, setQuizzes] = useState<QuizListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showHighScores, setShowHighScores] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/quizzes')
      .then((res) => res.json())
      .then((data) => {
        setQuizzes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching quizzes:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="animate-spin text-navy-600">
          <Loader2 className="w-10 h-10" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-navy-600 mb-6">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-navy-900 mb-3">QuizMaster</h1>
          <p className="text-lg text-navy-600">Test your knowledge with our curated quizzes</p>
          <button
            onClick={() => setShowHighScores(true)}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors font-medium"
          >
            <Trophy className="w-5 h-5" />
            View High Scores
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {quizzes.map((quiz) => (
            <button
              key={quiz.quizID}
              onClick={() => navigate(`/quiz/${quiz.quizID}`)}
              className="group relative overflow-hidden bg-white border-2 border-navy-200 rounded-xl p-8 text-left transition-all hover:border-navy-600 hover:shadow-lg"
            >
              <div className="relative z-10">
                <h2 className="text-2xl font-semibold text-navy-900 mb-2 group-hover:text-navy-700 transition-colors">
                  {quiz.quizName}
                </h2>
                <p className="text-navy-600">{quiz.questionCount} questions</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-navy-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>

        <HighScoresModal
          isOpen={showHighScores}
          onClose={() => setShowHighScores(false)}
          quizzes={quizzes.map((q) => ({ quizID: q.quizID, quizName: q.quizName }))}
        />
      </div>
    </div>
  );
}
