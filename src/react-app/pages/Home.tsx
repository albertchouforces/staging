import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Loader2, BookOpen, Trophy } from 'lucide-react';
import type { QuizSummary } from '@/shared/types';
import HighScoresModal from '@/react-app/components/HighScoresModal';

export default function Home() {
  const [quizzes, setQuizzes] = useState<QuizSummary[]>([]);
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
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="animate-spin text-blue-900">
          <Loader2 className="w-10 h-10" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-900 to-blue-700 mb-6 shadow-lg">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-blue-900 mb-4">QuizMaster</h1>
          <p className="text-xl text-gray-600 mb-8">Test your knowledge with our collection of quizzes</p>
          <button
            onClick={() => setShowHighScores(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl font-semibold hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Trophy className="w-5 h-5" />
            View High Scores
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizzes.map((quiz) => (
            <button
              key={quiz.quizID}
              onClick={() => navigate(`/quiz/${quiz.quizID}`)}
              className="group relative bg-white border-2 border-blue-900 rounded-2xl p-8 text-left transition-all hover:shadow-2xl hover:-translate-y-1 hover:bg-blue-900"
            >
              <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-blue-900 group-hover:bg-white flex items-center justify-center transition-colors">
                <span className="text-white group-hover:text-blue-900 font-bold text-lg transition-colors">
                  {quiz.questionCount}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-blue-900 group-hover:text-white mb-3 pr-16 transition-colors">
                {quiz.quizName}
              </h2>
              <p className="text-gray-600 group-hover:text-blue-100 transition-colors">
                {quiz.questionCount} {quiz.questionCount === 1 ? 'question' : 'questions'}
              </p>
              <div className="mt-6 inline-flex items-center text-blue-900 group-hover:text-white font-semibold transition-colors">
                Start Quiz
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        <HighScoresModal
          isOpen={showHighScores}
          onClose={() => setShowHighScores(false)}
          quizzes={quizzes}
        />
      </div>
    </div>
  );
}
