import { useMemo, useState } from "react";
import { Link } from "react-router";
import { BookOpen, ChevronRight, Trophy } from "lucide-react";
import HighScoresModal from "@/react-app/components/HighScoresModal";
import { quizzes as quizData } from "@/data/quizData";

interface QuizListItem {
  quizID: string;
  quizName: string;
  questionCount: number;
}

export default function Home() {
  const [showHighScores, setShowHighScores] = useState(false);

  const quizzes = useMemo<QuizListItem[]>(() => {
    return quizData.map((quiz) => ({
      quizID: quiz.quizID,
      quizName: quiz.quizName,
      questionCount: quiz.questions.length,
    }));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <HighScoresModal
        isOpen={showHighScores}
        onClose={() => setShowHighScores(false)}
        quizzes={quizzes}
      />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-600 rounded-2xl mb-6">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-navy-900 mb-3">Quiz Master</h1>
          <p className="text-lg text-navy-600">
            Test your knowledge with our collection of quizzes
          </p>
          <button
            onClick={() => setShowHighScores(true)}
            className="mt-6 inline-flex items-center gap-2 bg-navy-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-navy-700 transition-colors"
          >
            <Trophy className="w-5 h-5" />
            View High Scores
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {quizzes.map((quiz) => (
            <Link
              key={quiz.quizID}
              to={`/quiz/${quiz.quizID}`}
              className="group relative bg-white border-2 border-navy-100 rounded-xl p-6 hover:border-navy-600 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-navy-900 mb-2 group-hover:text-navy-600 transition-colors">
                    {quiz.quizName}
                  </h3>
                  <p className="text-sm text-navy-500">
                    {quiz.questionCount} questions
                  </p>
                </div>
                <ChevronRight className="w-6 h-6 text-navy-400 group-hover:text-navy-600 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
