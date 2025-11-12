import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Brain, Zap, Trophy } from 'lucide-react';
import { Quiz } from '@/shared/types';
import { quizData } from '@/data/quizData';
import QuizCard from '@/react-app/components/QuizCard';
import HighScoresModal from '@/react-app/components/HighScoresModal';

export default function Home() {
  const navigate = useNavigate();
  const [showHighScores, setShowHighScores] = useState(false);

  const handleStartQuiz = (quiz: Quiz) => {
    navigate('/quiz', { state: { quiz } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-navy-600 rounded-2xl flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-navy-900">
              QuizMaster
            </h1>
          </div>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Challenge yourself with interactive multiple choice quizzes. 
            Test your knowledge across various topics and track your progress.
          </p>
          
          <div className="flex items-center justify-center gap-4 mt-6 flex-wrap">
            <div className="flex items-center gap-2 text-navy-600">
              <Zap className="w-5 h-5" />
              <span className="font-medium">Randomized questions and answers every time</span>
            </div>
            <button
              onClick={() => setShowHighScores(true)}
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200 shadow-md"
            >
              <Trophy className="w-5 h-5" />
              View High Scores
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-navy-900 mb-8 text-center">
            Choose Your Challenge
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quizData.map((quiz) => (
              <QuizCard
                key={quiz.quizID}
                quiz={quiz}
                onStart={handleStartQuiz}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-navy-900 mb-4">
              How It Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-navy-600 font-bold text-lg">1</span>
                </div>
                <p className="text-gray-600">Choose a quiz topic</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-navy-600 font-bold text-lg">2</span>
                </div>
                <p className="text-gray-600">Answer randomized questions</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-navy-600 font-bold text-lg">3</span>
                </div>
                <p className="text-gray-600">See your results</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <HighScoresModal
        isOpen={showHighScores}
        onClose={() => setShowHighScores(false)}
      />
    </div>
  );
}
