import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router";
import { Home, CheckCircle2, XCircle, Clock } from "lucide-react";
import { QuizQuestionWithOptions } from "@/shared/types";
import { useTimer } from "@/react-app/hooks/useTimer";
import HighScoreSubmission from "@/react-app/components/HighScoreSubmission";
import { quizzes as quizData } from "@/data/quizData";

interface QuizData {
  quizID: string;
  quizName: string;
  questions: QuizQuestionWithOptions[];
}

export default function Quiz() {
  const { quizID } = useParams<{ quizID: string }>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showHighScoreSubmission, setShowHighScoreSubmission] = useState(false);
  const { elapsedTime, start } = useTimer();

  const quiz = useMemo<QuizData | null>(() => {
    const foundQuiz = quizData.find((q) => q.quizID === quizID);
    if (!foundQuiz) return null;

    // Randomize question order
    const shuffledQuestions = [...foundQuiz.questions].sort(() => Math.random() - 0.5);

    // Collect all answers from all questions for wrong options
    const allAnswers = foundQuiz.questions.map((q) => q.answer);

    // For each question, create 3 wrong options from other questions' answers
    const questionsWithOptions = shuffledQuestions.map((question, index) => {
      const wrongOptions = allAnswers
        .filter((ans) => ans !== question.answer)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      const options = [...wrongOptions, question.answer].sort(
        () => Math.random() - 0.5
      );

      return {
        question: question.question,
        answer: question.answer,
        image: question.image,
        options,
        questionIndex: index,
      };
    });

    return {
      quizID: foundQuiz.quizID,
      quizName: foundQuiz.quizName,
      questions: questionsWithOptions,
    };
  }, [quizID]);

  useEffect(() => {
    // Start timer when quiz loads
    if (quiz) {
      start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quiz]);

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;

    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (answer === quiz?.questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
      setShowHighScoreSubmission(true);
    }
  };

  const formatTime = (ms: number) => {
    const seconds = ms / 1000;
    return seconds.toFixed(2);
  };

  if (!quiz) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy-900 mb-4">Quiz not found</h2>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-navy-600 hover:text-navy-800"
          >
            <Home className="w-4 h-4" />
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  if (showResults) {
    const percentage = Math.round((score / quiz.questions.length) * 100);
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-2xl mx-auto px-6 py-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-navy-600 hover:text-navy-800 mb-8 transition-colors"
          >
            <Home className="w-4 h-4" />
            Return to Home
          </Link>

          <div className="bg-white border-2 border-navy-100 rounded-2xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-navy-600 rounded-full mb-6">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-navy-900 mb-2">Quiz Complete!</h2>
            <p className="text-lg text-navy-600 mb-8">
              You scored {score} out of {quiz.questions.length}
            </p>
            <div className="mb-8">
              <div className="text-5xl font-bold text-navy-600 mb-2">{percentage}%</div>
              <div className="w-full bg-navy-100 rounded-full h-3">
                <div
                  className="bg-navy-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <p className="text-navy-600 mt-4">
                Time: {formatTime(elapsedTime)} seconds
              </p>
            </div>
            <Link
              to="/"
              className="inline-block bg-navy-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-navy-700 transition-colors"
            >
              Try Another Quiz
            </Link>

            {showHighScoreSubmission && quizID && (
              <HighScoreSubmission
                quizID={quizID}
                score={score}
                totalQuestions={quiz.questions.length}
                timeInMs={elapsedTime}
                onSubmit={() => setShowHighScoreSubmission(false)}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.answer;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-navy-600 hover:text-navy-800 transition-colors"
          >
            <Home className="w-4 h-4" />
            Return to Home
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-navy-600">
              <Clock className="w-4 h-4" />
              <span className="font-mono">{formatTime(elapsedTime)}s</span>
            </div>
            <div className="text-sm text-navy-600">
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-navy-100 rounded-2xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-navy-900 mb-6">
            {currentQuestion.question}
          </h2>

          {currentQuestion.image && (
            <div className="mb-8 flex justify-center">
              <img
                src={currentQuestion.image}
                alt="Question illustration"
                className="max-w-full max-h-80 object-contain rounded-lg"
              />
            </div>
          )}

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrectOption = option === currentQuestion.answer;
              const showCorrect = isAnswered && isCorrectOption;
              const showIncorrect = isAnswered && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    showCorrect
                      ? "border-green-500 bg-green-50"
                      : showIncorrect
                      ? "border-red-500 bg-red-50"
                      : isSelected
                      ? "border-navy-600 bg-navy-50"
                      : "border-navy-100 hover:border-navy-300 hover:bg-navy-50"
                  } ${isAnswered ? "cursor-default" : "cursor-pointer"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-navy-900">{option}</span>
                    {showCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    )}
                    {showIncorrect && <XCircle className="w-5 h-5 text-red-600" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {isAnswered && (
          <div className="flex justify-end">
            <button
              onClick={handleNext}
              className="bg-navy-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-navy-700 transition-colors"
            >
              {currentQuestionIndex < quiz.questions.length - 1
                ? "Next Question"
                : "View Results"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
