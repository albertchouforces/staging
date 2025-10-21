interface QuestionCardProps {
  question: string;
  image?: string;
  options: string[];
  selectedAnswer: string | null;
  correctAnswer: string;
  onAnswerSelect: (answer: string) => void;
  questionNumber: number;
  totalQuestions: number;
  showFeedback: boolean;
}

export default function QuestionCard({
  question,
  image,
  options,
  selectedAnswer,
  correctAnswer,
  onAnswerSelect,
  questionNumber,
  totalQuestions,
  showFeedback,
}: QuestionCardProps) {
  const getOptionStyle = (option: string) => {
    if (!showFeedback) {
      // Normal state - no feedback shown yet
      return selectedAnswer === option
        ? "border-navy-600 bg-navy-50 text-navy-900"
        : "border-gray-200 bg-white text-gray-700 hover:border-navy-300 hover:bg-navy-25";
    }

    // Feedback state - show correct/incorrect
    if (option === correctAnswer) {
      return "border-green-600 bg-green-50 text-green-900";
    }
    
    if (selectedAnswer === option && option !== correctAnswer) {
      return "border-red-600 bg-red-50 text-red-900";
    }
    
    return "border-gray-200 bg-gray-50 text-gray-500";
  };

  const getOptionIcon = (option: string) => {
    if (!showFeedback) {
      return selectedAnswer === option
        ? "border-navy-600 bg-navy-600"
        : "border-gray-300";
    }

    if (option === correctAnswer) {
      return "border-green-600 bg-green-600";
    }
    
    if (selectedAnswer === option && option !== correctAnswer) {
      return "border-red-600 bg-red-600";
    }
    
    return "border-gray-300";
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 max-w-2xl mx-auto">
      <div className="p-8">
        {/* Progress indicator */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Question {questionNumber} of {totalQuestions}
            </span>
            <span className="text-sm text-navy-600 font-medium">
              {Math.round((questionNumber / totalQuestions) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-navy-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <h2 className="text-xl font-semibold text-gray-900 mb-6 leading-relaxed">
          {question}
        </h2>

        {/* Image */}
        {image && (
          <div className="mb-8 flex justify-center">
            <img
              src={image}
              alt="Question illustration"
              className="max-w-full max-h-64 object-contain rounded-lg shadow-md"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Answer options */}
        <div className="space-y-3">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showFeedback && onAnswerSelect(option)}
              disabled={showFeedback}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${getOptionStyle(option)} ${
                showFeedback ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${getOptionIcon(option)}`}
                >
                  {(selectedAnswer === option || (showFeedback && option === correctAnswer)) && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <span className="font-medium">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
