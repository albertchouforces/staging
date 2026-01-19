import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import type { QuestionData, QuizConfig } from '@/react-app/types';
import { getCorrectAnswers, isMultiSelect, isMatchingQuestion } from '@/react-app/lib/utils';
import { BookOpen, Check, ImageOff, X } from 'lucide-react';
import { AudioPlayer } from '@/react-app/components/AudioPlayer';
import { MatchingCard } from '@/react-app/components/MatchingCard';

interface FlashCardProps {
  question: QuestionData;
  options: string[];
  onAnswer: (correct: boolean) => void;
  onNext: () => void;
  questionNumber: number;
  totalQuestions: number;
  quizConfig: QuizConfig;
}

export function FlashCard({ 
  question, 
  options: initialOptions, 
  onAnswer, 
  onNext,
  questionNumber,
  totalQuestions,
  quizConfig
}: FlashCardProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Set<string>>(new Set());
  const [showResult, setShowResult] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const isMultiSelectQuestion = isMultiSelect(question.correctAnswer);
  const isMatchQuestion = isMatchingQuestion(question.correctAnswer);
  const cardRef = useRef<HTMLDivElement>(null);

  // Helper to check if audio is nested array (multiple playback options)
  const isNestedAudioArray = useCallback((url: string | string[] | string[][] | undefined): url is string[][] => {
    return Array.isArray(url) && url.length > 0 && Array.isArray(url[0]);
  }, []);

  // Helper to check if a string is likely a URL/file path (vs a label)
  const isLikelyUrl = useCallback((str: string): boolean => {
    if (!str) return false;
    // Check for common URL patterns or file extensions
    return str.startsWith('http://') || 
           str.startsWith('https://') || 
           str.startsWith('/') || 
           /\.(mp3|wav|ogg|m4a|aac)$/i.test(str);
  }, []);

  // Extract label and audio files from an array
  const extractLabelAndFiles = useCallback((arr: string[]): { label: string; files: string[] } => {
    if (arr.length === 0) return { label: 'Play audio', files: [] };
    
    // If first element is not a URL, treat it as a label
    if (!isLikelyUrl(arr[0])) {
      return {
        label: arr[0],
        files: arr.slice(1)
      };
    }
    
    return {
      label: 'Play audio',
      files: arr
    };
  }, [isLikelyUrl]);

  // Get audio groups with labels - memoized to prevent re-creation on re-renders
  const audioGroups = useMemo((): Array<{ label: string; files: string[] }> => {
    if (!question.audioUrl) return [];
    if (typeof question.audioUrl === 'string') return [{ label: 'Play audio', files: [question.audioUrl] }];
    if (isNestedAudioArray(question.audioUrl)) {
      return question.audioUrl.map(group => extractLabelAndFiles(group));
    }
    return [extractLabelAndFiles(question.audioUrl)];
  }, [question.audioUrl, question.id, isNestedAudioArray, extractLabelAndFiles]);
  
  // Get fact audio groups with labels - memoized to prevent re-creation on re-renders
  const factAudioGroups = useMemo((): Array<{ label: string; files: string[] }> => {
    if (!question.factAudioUrl) return [];
    if (typeof question.factAudioUrl === 'string') return [{ label: 'Play audio', files: [question.factAudioUrl] }];
    if (isNestedAudioArray(question.factAudioUrl)) {
      return question.factAudioUrl.map(group => extractLabelAndFiles(group));
    }
    return [extractLabelAndFiles(question.factAudioUrl)];
  }, [question.factAudioUrl, question.id, isNestedAudioArray, extractLabelAndFiles]);

  // Set options when they change from parent
  useEffect(() => {
    // Use the shuffled options directly from parent without modification
    setOptions(initialOptions);
  }, [initialOptions]);

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswers(new Set());
    setShowResult(false);
    setImageLoaded(false);
    setImageError(false);
  }, [question]);

  // Scroll card into view when question changes
  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [question.id]);

  const handleOptionClick = useCallback((answer: string) => {
    if (showResult) return;
    
    if (isMultiSelectQuestion) {
      // Toggle selection for multi-select
      setSelectedAnswers(prev => {
        const newSet = new Set(prev);
        if (newSet.has(answer)) {
          newSet.delete(answer);
        } else {
          newSet.add(answer);
        }
        return newSet;
      });
    } else {
      // Single select - submit immediately
      setSelectedAnswers(new Set([answer]));
      setShowResult(true);
      const correctAnswers = getCorrectAnswers(question.correctAnswer);
      const correct = correctAnswers.includes(answer);
      onAnswer(correct);
    }
  }, [showResult, isMultiSelectQuestion, question.correctAnswer, onAnswer]);

  const handleSubmitMultiSelect = useCallback(() => {
    if (showResult || selectedAnswers.size === 0) return;
    
    setShowResult(true);
    const correctAnswers = getCorrectAnswers(question.correctAnswer);
    
    // Check if all correct answers are selected and no wrong answers are selected
    const allCorrectSelected = correctAnswers.every(ans => selectedAnswers.has(ans));
    const noWrongSelected = selectedAnswers.size === correctAnswers.length;
    const correct = allCorrectSelected && noWrongSelected;
    
    onAnswer(correct);
  }, [showResult, selectedAnswers, question.correctAnswer, onAnswer]);

  // Get feedback message for multi-select questions
  const getMultiSelectFeedback = useCallback((): { message: string; type: 'success' | 'partial' | 'wrong' } | null => {
    if (!showResult || !isMultiSelectQuestion) return null;
    
    const correctAnswers = getCorrectAnswers(question.correctAnswer);
    const selectedArray = Array.from(selectedAnswers);
    
    const correctSelected = selectedArray.filter(ans => correctAnswers.includes(ans));
    const wrongSelected = selectedArray.filter(ans => !correctAnswers.includes(ans));
    const missedAnswers = correctAnswers.filter(ans => !selectedAnswers.has(ans));
    
    // All correct
    if (correctSelected.length === correctAnswers.length && wrongSelected.length === 0) {
      return {
        message: `Correct! You selected all ${correctAnswers.length} required answers.`,
        type: 'success'
      };
    }
    
    // Some correct but not all, no wrong ones
    if (correctSelected.length > 0 && wrongSelected.length === 0 && missedAnswers.length > 0) {
      return {
        message: `Partially correct. You selected ${correctSelected.length} of ${correctAnswers.length} required answers. You missed: ${missedAnswers.join(', ')}`,
        type: 'partial'
      };
    }
    
    // Some correct with some wrong
    if (correctSelected.length > 0 && wrongSelected.length > 0) {
      const parts = [`You selected ${correctSelected.length} correct answer${correctSelected.length > 1 ? 's' : ''} but also selected ${wrongSelected.length} incorrect answer${wrongSelected.length > 1 ? 's' : ''}.`];
      if (missedAnswers.length > 0) {
        parts.push(` You also missed: ${missedAnswers.join(', ')}`);
      }
      return {
        message: parts.join(''),
        type: 'wrong'
      };
    }
    
    // All wrong
    return {
      message: `Incorrect. None of your selections were correct. The correct answers are: ${correctAnswers.join(', ')}`,
      type: 'wrong'
    };
  }, [showResult, isMultiSelectQuestion, question.correctAnswer, selectedAnswers]);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(true);
  }, []);

  const getOptionStyles = useCallback((option: string) => {
    const correctAnswers = getCorrectAnswers(question.correctAnswer);
    const isSelected = selectedAnswers.has(option);
    const isCorrect = correctAnswers.includes(option);
    
    if (!showResult) {
      if (isMultiSelectQuestion) {
        return isSelected 
          ? "bg-blue-100 border-2 border-blue-500" 
          : "bg-gray-100 hover:bg-gray-200";
      }
      return "bg-gray-100 hover:bg-gray-200";
    }
    
    // For multi-select, distinguish between different feedback states
    if (isMultiSelectQuestion) {
      if (isCorrect && isSelected) {
        // Correctly selected
        return "bg-green-100 border-2 border-green-500";
      }
      if (isCorrect && !isSelected) {
        // Missed correct answer
        return "bg-yellow-100 border-2 border-yellow-500";
      }
      if (!isCorrect && isSelected) {
        // Incorrectly selected
        return "bg-red-100 border-2 border-red-500";
      }
      // Not selected and not correct
      return "bg-gray-100";
    }
    
    // For single-select questions
    if (isCorrect) {
      return "bg-green-100 border-2 border-green-500";
    }
    if (isSelected) {
      return "bg-red-100 border-2 border-red-500";
    }
    return "bg-gray-100";
  }, [showResult, question.correctAnswer, selectedAnswers, isMultiSelectQuestion]);

  // Handle matching questions separately
  if (isMatchQuestion) {
    return (
      <div ref={cardRef} className="w-full max-w-4xl bg-white rounded-xl shadow-lg">
        <div className="flex flex-col w-full">
          {/* Question Section */}
          <div className="p-6 border-b border-gray-100">
            <div className="mb-4">
              <div className="flex justify-end mb-3">
                <span className="text-sm text-gray-500">Question {questionNumber} of {totalQuestions}</span>
              </div>
              <h3 
                className="text-xl font-semibold text-gray-800 text-center"
                dangerouslySetInnerHTML={{ __html: question.question }}
              />
            </div>
            {question.description && question.description.trim() !== '' && (
              <p className="text-lg text-gray-600 italic text-center max-w-xl mx-auto" dangerouslySetInnerHTML={{ __html: question.description }} />
            )}
          </div>

          {/* Matching Section */}
          <div className="w-full p-6 border-b border-gray-100">
            <div className="text-center mb-4">
              <span className="text-sm text-blue-600 font-medium">Match the pairs by selecting one item from each column</span>
            </div>
            <MatchingCard 
              key={question.id}
              pairs={question.correctAnswer as any}
              onComplete={(correct) => {
                setShowResult(true);
                onAnswer(correct);
              }}
            />
          </div>

          {/* Result Section for Matching */}
          {showResult && (
            <div className="w-full p-6 flex flex-col gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 max-w-xl mx-auto w-full">
                <p className="text-green-800 text-sm font-medium">
                  Great job! All pairs matched correctly.
                </p>
              </div>
              
              <div className="flex justify-center w-full">
                <button
                  onClick={onNext}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {questionNumber === totalQuestions ? 'Finish Quiz' : 'Next Question'}
                </button>
              </div>

              {/* Show fact section if there's a fact text or fact audio */}
              {(question.fact || factAudioGroups.length > 0) && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 max-w-xl mx-auto">
                  <div className="flex items-center gap-2 text-blue-800 mb-2">
                    <BookOpen size={20} />
                    <span className="font-semibold">{quizConfig.factHeading || 'Did you know?'}</span>
                  </div>
                  {question.fact && (
                    <p className="text-blue-900" dangerouslySetInnerHTML={{ __html: question.fact }} />
                  )}
                  
                  {/* Fact Audio Players */}
                  {factAudioGroups.length > 0 && (
                    <div className={`${question.fact ? 'mt-4' : ''} flex flex-col items-center gap-3 w-full`}>
                      {factAudioGroups.map((factAudioGroup, index) => (
                        <div key={`q${question.id}-fact-${index}`} className="flex flex-col items-center gap-3 w-full">
                          <AudioPlayer 
                            key={`q${question.id}-fact-player-${index}`}
                            audioFiles={factAudioGroup.files} 
                            loopCount={question.factAudioLoopCount}
                            label={factAudioGroup.label}
                            colorScheme="blue"
                          />
                          {index < factAudioGroups.length - 1 && (
                            <div className="w-full max-w-xs border-t border-blue-300"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div ref={cardRef} className={`w-full max-w-3xl bg-white rounded-xl shadow-lg ${isMultiSelectQuestion && !showResult ? 'border-2 border-blue-600' : ''}`}>
      <div className="flex flex-col w-full">
        {/* Question Section */}
        <div className="p-6 border-b border-gray-100">
          <div className="mb-4">
            <div className="flex justify-end mb-3">
              <span className="text-sm text-gray-500">Question {questionNumber} of {totalQuestions}</span>
            </div>
            <h3 
              className="text-xl font-semibold text-gray-800"
              dangerouslySetInnerHTML={{ __html: question.question }}
            />
          </div>
          {/* Image Container */}
          <div className="flex flex-col items-center mb-4">
            {question.imageUrl && question.imageUrl.trim() !== '' && (
              <div className="w-full aspect-[16/9] relative rounded-lg overflow-hidden bg-transparent mb-4">
                {!imageLoaded && !imageError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50">
                    <div className="text-gray-400 text-center px-4">
                      <div className="text-sm font-medium mb-1">Loading Image</div>
                    </div>
                  </div>
                )}
                {imageError ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 text-gray-400">
                    <ImageOff size={32} />
                    <p className="text-sm mt-2">Image not available</p>
                  </div>
                ) : (
                  <img
                    src={question.imageUrl}
                    alt="Question"
                    className={`w-full h-full object-contain ${imageLoaded ? 'block' : 'hidden'}`}
                    onLoad={() => setImageLoaded(true)}
                    onError={handleImageError}
                  />
                )}
              </div>
            )}
            
            {/* Audio Players */}
            {audioGroups.length > 0 && (
              <div className="mb-4 flex flex-col items-center gap-3">
                {audioGroups.map((audioGroup, index) => (
                  <div key={`q${question.id}-audio-${index}`} className="flex flex-col items-center gap-3 w-full">
                    <AudioPlayer 
                      key={`q${question.id}-audio-player-${index}`}
                      audioFiles={audioGroup.files} 
                      loopCount={question.audioLoopCount}
                      label={audioGroup.label}
                      colorScheme="blue"
                    />
                    {index < audioGroups.length - 1 && (
                      <div className="w-full max-w-xs border-t border-gray-300"></div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {question.description && question.description.trim() !== '' && (
              <p className="text-lg text-gray-600 italic text-center max-w-xl" dangerouslySetInnerHTML={{ __html: question.description }} />
            )}
          </div>
        </div>

        {/* Options Section */}
        <div className="w-full p-6 border-b border-gray-100">
          {isMultiSelectQuestion && !showResult && (
            <div className="text-center mb-4">
              <span className="text-sm text-blue-600 font-medium">Select all that apply</span>
            </div>
          )}
          <div className="grid grid-cols-1 gap-3 w-full max-w-xl mx-auto">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                disabled={showResult}
                className={`w-full min-h-[60px] p-4 text-left rounded-lg transition-colors flex items-center justify-between ${getOptionStyles(option)}`}
              >
                <span dangerouslySetInnerHTML={{ __html: option }} />
                {showResult && (() => {
                  const correctAnswers = getCorrectAnswers(question.correctAnswer);
                  const isCorrect = correctAnswers.includes(option);
                  const isSelected = selectedAnswers.has(option);
                  
                  if (isMultiSelectQuestion) {
                    if (isCorrect && isSelected) {
                      // Correctly selected
                      return <Check className="text-green-600" size={24} />;
                    }
                    if (isCorrect && !isSelected) {
                      // Missed this correct answer
                      return (
                        <div className="flex items-center gap-1">
                          <Check className="text-yellow-600" size={24} />
                          <span className="text-xs text-yellow-700 font-medium">Missed</span>
                        </div>
                      );
                    }
                    if (!isCorrect && isSelected) {
                      // Incorrectly selected
                      return <X className="text-red-600" size={24} />;
                    }
                    return null;
                  }
                  
                  // Single-select feedback
                  if (isCorrect) {
                    return <Check className="text-green-600" size={20} />;
                  }
                  if (isSelected) {
                    return <X className="text-red-600" size={20} />;
                  }
                  return null;
                })()}
              </button>
            ))}
          </div>
          
          {/* Submit button for multi-select */}
          {isMultiSelectQuestion && !showResult && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handleSubmitMultiSelect}
                disabled={selectedAnswers.size === 0}
                className={`px-6 py-2 rounded-lg transition-colors font-medium ${
                  selectedAnswers.size === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Submit Answer
              </button>
            </div>
          )}
        </div>

        {/* Result Section */}
        {showResult && (
          <div className="w-full p-6 flex flex-col gap-6">
            {/* Multi-select feedback */}
            {isMultiSelectQuestion && (() => {
              const feedback = getMultiSelectFeedback();
              if (!feedback) return null;
              
              const bgColor = feedback.type === 'success' 
                ? 'bg-green-50 border-green-200' 
                : feedback.type === 'partial'
                ? 'bg-yellow-50 border-yellow-200'
                : 'bg-red-50 border-red-200';
                
              const textColor = feedback.type === 'success'
                ? 'text-green-800'
                : feedback.type === 'partial'
                ? 'text-yellow-800'
                : 'text-red-800';
              
              return (
                <div className={`${bgColor} p-4 rounded-lg border max-w-xl mx-auto w-full`}>
                  <p className={`${textColor} text-sm font-medium`}>
                    {feedback.message}
                  </p>
                </div>
              );
            })()}
            
            <div className="flex justify-center w-full">
              <button
                onClick={onNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {questionNumber === totalQuestions ? 'Finish Quiz' : 'Next Question'}
              </button>
            </div>

            {/* Show fact section if there's a fact text or fact audio */}
            {(question.fact || factAudioGroups.length > 0) && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 max-w-xl mx-auto">
                <div className="flex items-center gap-2 text-blue-800 mb-2">
                  <BookOpen size={20} />
                  <span className="font-semibold">{quizConfig.factHeading || 'Did you know?'}</span>
                </div>
                {question.fact && (
                  <p className="text-blue-900" dangerouslySetInnerHTML={{ __html: question.fact }} />
                )}
                
                {/* Fact Audio Players */}
                {factAudioGroups.length > 0 && (
                  <div className={`${question.fact ? 'mt-4' : ''} flex flex-col items-center gap-3 w-full`}>
                    {factAudioGroups.map((factAudioGroup, index) => (
                      <div key={`q${question.id}-fact-${index}`} className="flex flex-col items-center gap-3 w-full">
                        <AudioPlayer 
                          key={`q${question.id}-fact-player-${index}`}
                          audioFiles={factAudioGroup.files} 
                          loopCount={question.factAudioLoopCount}
                          label={factAudioGroup.label}
                          colorScheme="blue"
                        />
                        {index < factAudioGroups.length - 1 && (
                          <div className="w-full max-w-xs border-t border-blue-300"></div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
