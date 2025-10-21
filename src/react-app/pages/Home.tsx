import { useState } from "react";
import { useNavigate } from "react-router";
import { quizData } from "@/data/quizData";
import QuizCard from "@/react-app/components/QuizCard";
import HighScoresModal from "@/react-app/components/HighScoresModal";
import { Quiz } from "@/shared/types";
import { BookOpen, Sparkles, Trophy } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const [showHighScores, setShowHighScores] = useState(false);

  const handleStartQuiz = (quiz: Quiz) => {
    navigate(`/quiz/${quiz.quizID}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-navy-600 via-navy-700 to-navy-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Quiz<span className="text-yellow-300">Master</span>
            </h1>
            <p className="text-xl md:text-2xl text-navy-100 mb-8 leading-relaxed">
              Test your knowledge with our interactive multiple choice quizzes
            </p>
            <div className="flex items-center justify-center space-x-2 text-navy-200 mb-8">
              <Sparkles className="w-5 h-5" />
              <span className="text-lg">Randomized questions • Instant feedback • Track your progress</span>
              <Sparkles className="w-5 h-5" />
            </div>
            
            {/* High Scores Button */}
            <div className="flex justify-center">
              <button
                onClick={() => setShowHighScores(true)}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 border border-white/20 hover:border-white/30 shadow-lg hover:shadow-xl"
              >
                <Trophy className="w-5 h-5" />
                <span>View High Scores</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quizzes Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Challenge
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select a quiz category below and test your knowledge. Each quiz features randomized questions and multiple choice answers to keep you on your toes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {quizData.map((quiz) => (
            <QuizCard
              key={quiz.quizID}
              quiz={quiz}
              onStartQuiz={handleStartQuiz}
            />
          ))}
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-navy-50 rounded-xl">
                <div className="w-8 h-8 bg-navy-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">?</span>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Random Questions</h3>
            <p className="text-gray-600">
              Questions are shuffled each time you take a quiz for a fresh experience.
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-navy-50 rounded-xl">
                <div className="w-8 h-8 bg-navy-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">4</span>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Multiple Choice</h3>
            <p className="text-gray-600">
              Each question has four options with randomized incorrect answers from other questions.
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-navy-50 rounded-xl">
                <div className="w-8 h-8 bg-navy-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">%</span>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Results</h3>
            <p className="text-gray-600">
              Get your score immediately and see how well you performed on each quiz.
            </p>
          </div>
        </div>
      </div>

      {/* High Scores Modal */}
      <HighScoresModal
        isOpen={showHighScores}
        onClose={() => setShowHighScores(false)}
      />
    </div>
  );
}
