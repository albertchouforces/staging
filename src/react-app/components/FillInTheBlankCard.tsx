import { useState, useEffect, useCallback, useMemo, useRef, MouseEvent } from 'react';
import type { QuestionData, QuizConfig } from '@/react-app/types';
import { parseBlankQuestion, shuffleArray } from '@/react-app/lib/utils';
import { BookOpen, Info, X } from 'lucide-react';
import { AudioPlayer } from '@/react-app/components/AudioPlayer';

interface FillInTheBlankCardProps {
  question: QuestionData;
  onAnswer: (correctCount: number) => void;
  onNext: () => void;
  questionNumber: number;
  totalQuestions: number;
  quizConfig: QuizConfig;
}

interface BlankState {
  filled: boolean;
  selectedAnswer: string | null;
  correct: boolean | null;
}

export function FillInTheBlankCard({
  question,
  onAnswer,
  onNext,
  questionNumber,
  totalQuestions,
  quizConfig
}: FillInTheBlankCardProps) {
  const [currentBlankIndex, setCurrentBlankIndex] = useState<number | null>(null);
  const [blanks, setBlanks] = useState<BlankState[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [showInfo, setShowInfo] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);
  const infoBoxRef = useRef<HTMLDivElement>(null);

  // Parse the question to get parts and blank count
  const { parts, blankCount } = useMemo(() => parseBlankQuestion(question.question), [question.question]);

  // Get correct answers and distractors
  const correctAnswers = useMemo(() => {
    if (!Array.isArray(question.correctAnswer)) return [];
    // Filter to ensure only strings
    return (question.correctAnswer.slice(0, blankCount) as string[]).filter((ans): ans is string => typeof ans === 'string');
  }, [question.correctAnswer, blankCount]);

  const distractors = useMemo(() => {
    if (!Array.isArray(question.correctAnswer)) return [];
    // Filter to ensure only strings
    return (question.correctAnswer.slice(blankCount) as string[]).filter((ans): ans is string => typeof ans === 'string');
  }, [question.correctAnswer, blankCount]);

  // Get audio groups with labels - memoized with stable dependencies
  const audioGroups = useMemo((): Array<{ label: string; files: string[] }> => {
    const isNestedArray = (url: any): url is string[][] => {
      return Array.isArray(url) && url.length > 0 && Array.isArray(url[0]);
    };
    
    const isUrl = (str: string): boolean => {
      if (!str) return false;
      return str.startsWith('http://') || 
             str.startsWith('https://') || 
             str.startsWith('/') || 
             /\.(mp3|wav|ogg|m4a|aac)$/i.test(str);
    };
    
    const extractLabelAndFiles = (arr: string[]): { label: string; files: string[] } => {
      if (arr.length === 0) return { label: 'Play audio', files: [] };
      if (!isUrl(arr[0])) {
        return { label: arr[0], files: arr.slice(1) };
      }
      return { label: 'Play audio', files: arr };
    };
    
    if (!question.audioUrl) return [];
    if (typeof question.audioUrl === 'string') return [{ label: 'Play audio', files: [question.audioUrl] }];
    if (isNestedArray(question.audioUrl)) {
      return question.audioUrl.map(group => extractLabelAndFiles(group));
    }
    return [extractLabelAndFiles(question.audioUrl)];
  }, [question.audioUrl, question.id]);
  
  const factAudioGroups = useMemo((): Array<{ label: string; files: string[] }> => {
    const isNestedArray = (url: any): url is string[][] => {
      return Array.isArray(url) && url.length > 0 && Array.isArray(url[0]);
    };
    
    const isUrl = (str: string): boolean => {
      if (!str) return false;
      return str.startsWith('http://') || 
             str.startsWith('https://') || 
             str.startsWith('/') || 
             /\.(mp3|wav|ogg|m4a|aac)$/i.test(str);
    };
    
    const extractLabelAndFiles = (arr: string[]): { label: string; files: string[] } => {
      if (arr.length === 0) return { label: 'Play audio', files: [] };
      if (!isUrl(arr[0])) {
        return { label: arr[0], files: arr.slice(1) };
      }
      return { label: 'Play audio', files: arr };
    };
    
    if (!question.factAudioUrl) return [];
    if (typeof question.factAudioUrl === 'string') return [{ label: 'Play audio', files: [question.factAudioUrl] }];
    if (isNestedArray(question.factAudioUrl)) {
      return question.factAudioUrl.map(group => extractLabelAndFiles(group));
    }
    return [extractLabelAndFiles(question.factAudioUrl)];
  }, [question.factAudioUrl, question.id]);
  
  // Normalize loop counts with defensive bounds
  const audioLoopCount = Math.min(Math.max(question.audioLoopCount || 1, 1), 10);
  const factAudioLoopCount = Math.min(Math.max(question.factAudioLoopCount || 1, 1), 10);

  // Initialize blanks and options
  useEffect(() => {
    const initialBlanks: BlankState[] = Array(blankCount).fill(null).map(() => ({
      filled: false,
      selectedAnswer: null,
      correct: null
    }));
    setBlanks(initialBlanks);
    
    // Shuffle all answers together (correct + distractors)
    const allAnswers = [...correctAnswers, ...distractors];
    setOptions(shuffleArray(allAnswers));
    
    setCurrentBlankIndex(null);
    setShowResult(false);
  }, [question.id, blankCount, correctAnswers, distractors]);

  // Scroll card into view when question changes
  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [question.id]);

  // Close info box when clicking outside
  useEffect(() => {
    if (!showInfo) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (infoBoxRef.current && !infoBoxRef.current.contains(event.target as Node)) {
        setShowInfo(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside as any);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside as any);
    };
  }, [showInfo]);

  const handleBlankClick = useCallback((index: number) => {
    if (showResult) return;
    
    // If clicking a filled blank, remove the answer and return it to options
    if (blanks[index]?.filled) {
      const blank = blanks[index];
      if (blank.selectedAnswer) {
        // Return the answer to options
        setOptions(prev => [...prev, blank.selectedAnswer!]);
        
        // Clear the blank
        const newBlanks = [...blanks];
        newBlanks[index] = {
          filled: false,
          selectedAnswer: null,
          correct: null
        };
        setBlanks(newBlanks);
        
        // Select this blank
        setCurrentBlankIndex(index);
      }
      return;
    }
    
    // If clicking the same blank again, deselect it
    if (currentBlankIndex === index) {
      setCurrentBlankIndex(null);
      return;
    }
    
    // Otherwise, select this blank
    setCurrentBlankIndex(index);
  }, [showResult, blanks, currentBlankIndex]);

  const handleOptionClick = useCallback((answer: string) => {
    if (showResult || currentBlankIndex === null) return;
    
    const isCorrect = correctAnswers[currentBlankIndex] === answer;
    
    // Update the blank state
    const newBlanks = [...blanks];
    newBlanks[currentBlankIndex] = {
      filled: true,
      selectedAnswer: answer,
      correct: isCorrect
    };
    setBlanks(newBlanks);
    
    // Remove the used option
    setOptions(prev => prev.filter(opt => opt !== answer));
    
    // Clear selection
    setCurrentBlankIndex(null);
    
    // Check if all blanks are filled
    if (newBlanks.every(b => b.filled)) {
      setShowResult(true);
      const correctCount = newBlanks.filter(b => b.correct).length;
      onAnswer(correctCount);
    }
  }, [showResult, currentBlankIndex, correctAnswers, blanks, onAnswer]);

  const getBlankContent = useCallback((index: number) => {
    const blank = blanks[index];
    const isSelected = currentBlankIndex === index;
    
    if (!blank || !blank.filled) {
      return (
        <span className={`relative ${isSelected ? 'font-bold' : ''}`}>
          {isSelected && <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-blue-700 whitespace-nowrap">selected</span>}
          <span>______</span>
        </span>
      );
    }
    
    if (showResult) {
      if (blank.correct) {
        return <span>{blank.selectedAnswer}</span>;
      } else {
        // Show both wrong answer and correct answer
        return (
          <span>
            <span className="line-through text-red-600">{blank.selectedAnswer}</span>
            {' '}
            <span className="text-green-600 font-semibold">{correctAnswers[index]}</span>
          </span>
        );
      }
    }
    
    return <span className={isSelected ? 'font-bold' : ''}>{blank.selectedAnswer}</span>;
  }, [blanks, currentBlankIndex, showResult, correctAnswers]);

  const getBlankStyles = useCallback((index: number) => {
    const blank = blanks[index];
    
    if (currentBlankIndex === index) {
      return 'bg-blue-200 border-blue-500 cursor-pointer px-2 py-1 rounded border-2';
    }
    
    if (!blank || !blank.filled) {
      return 'bg-gray-100 border-gray-300 cursor-pointer hover:bg-gray-200 px-2 py-1 rounded border-2';
    }
    
    if (showResult) {
      return blank.correct 
        ? 'bg-green-100 border-green-500 px-2 py-1 rounded border-2'
        : 'bg-red-100 border-red-500 px-2 py-1 rounded border-2';
    }
    
    return 'bg-blue-100 border-blue-400 cursor-pointer hover:bg-blue-200 px-2 py-1 rounded border-2';
  }, [blanks, currentBlankIndex, showResult]);

  const correctCount = blanks.filter(b => b.correct).length;
  const totalBlanks = blanks.length;

  const handleFactClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'A') {
      e.preventDefault();
      const href = target.getAttribute('href');
      if (href) {
        // Check if the link points to an image
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
        const isImageLink = imageExtensions.some(ext => href.toLowerCase().endsWith(ext));
        
        if (isImageLink) {
          // Open image in modal
          setModalImageUrl(href);
          setIsImageModalOpen(true);
        } else {
          // Open regular link in new tab
          window.open(href, '_blank', 'noopener,noreferrer');
        }
      }
    }
  }, []);

  return (
    <>
      {/* Image Modal */}
      {isImageModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div 
            className="relative bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute top-4 right-4 z-10 h-10 w-10 flex items-center justify-center rounded-lg bg-white hover:bg-gray-100 transition-colors shadow-lg"
              aria-label="Close"
            >
              <X size={28} className="text-gray-600 hover:text-gray-800" />
            </button>
            <div className="p-6 flex items-center justify-center bg-gray-50 min-h-[400px]">
              <img
                src={modalImageUrl}
                alt="Fact"
                className="max-w-full max-h-[calc(90vh-3rem)] object-contain rounded-lg shadow-sm"
              />
            </div>
          </div>
        </div>
      )}
      
      <div ref={cardRef} className="w-full max-w-3xl bg-white rounded-xl shadow-lg border-2 border-purple-600">
        <div className="flex flex-col w-full">
        {/* Question Section */}
        <div className="p-6 border-b border-gray-100">
          <div className="mb-4">
            <div className="flex justify-end mb-3">
              <span className="text-sm text-gray-500">Question {questionNumber} of {totalQuestions}</span>
            </div>
            
            {/* Fill in the blank indicator */}
            <div className="text-center mb-4 relative">
              <span className="inline-flex items-center gap-2 px-4 py-2 text-sm text-purple-700 font-bold bg-purple-50 border-2 border-purple-400 rounded-full shadow-md">
                FILL IN THE BLANKS
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                  aria-label="Help"
                >
                  <Info size={16} />
                </button>
              </span>
              
              {/* Info Box */}
              {showInfo && (
                <div ref={infoBoxRef} className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-80 bg-white border-2 border-purple-400 rounded-lg shadow-xl p-4 z-10">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-purple-800 text-sm">How to play:</h3>
                    <button
                      onClick={() => setShowInfo(false)}
                      className="text-gray-500 hover:text-gray-700"
                      aria-label="Close"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <ol className="text-xs text-gray-700 space-y-2 list-decimal list-inside">
                    <li>Click on a blank (______) in the sentence to select it</li>
                    <li>Choose the correct answer from the options below</li>
                    <li>The answer will fill the selected blank</li>
                    <li>Click a filled blank to unselect it and return the answer to the options</li>
                    <li>Fill all blanks to see your score!</li>
                  </ol>
                </div>
              )}
            </div>
            
            {/* Question with interactive blanks */}
            <div className="text-xl font-semibold text-gray-800 text-center mb-4 [&_i]:italic">
              {parts.map((part, index) => (
                <span key={index}>
                  <span dangerouslySetInnerHTML={{ __html: part }} />
                  {index < parts.length - 1 && (
                    <button
                      onClick={() => handleBlankClick(index)}
                      disabled={showResult}
                      className={`inline-block mx-1 ${getBlankStyles(index)} transition-colors`}
                    >
                      {getBlankContent(index)}
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>
          
          {/* Audio Players */}
          {audioGroups.length > 0 && (
            <div className="mb-4 flex flex-col items-center gap-3">
              {audioGroups.map((audioGroup, index) => (
                <div key={`q${question.id}-audio-${index}`} className="flex flex-col items-center gap-3 w-full">
                  <AudioPlayer 
                    key={`q${question.id}-audio-player-${index}`}
                    audioFiles={audioGroup.files} 
                    loopCount={audioLoopCount}
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
            <div className="text-lg text-gray-600 italic text-center max-w-xl mx-auto [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:my-2 [&_li]:mb-1" dangerouslySetInnerHTML={{ __html: question.description }} />
          )}
        </div>

        {/* Options Section */}
        {!showResult && (
          <div className="w-full p-6 border-b border-gray-100">
            {currentBlankIndex !== null && (
              <div className="text-center mb-4">
                <span className="text-sm text-purple-700 font-medium">
                  Select an answer for blank #{currentBlankIndex + 1}
                </span>
              </div>
            )}
            <div className="grid grid-cols-1 gap-3 w-full max-w-xl mx-auto">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  disabled={currentBlankIndex === null}
                  className={`w-full min-h-[60px] p-4 text-left rounded-lg transition-colors ${
                    currentBlankIndex === null
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-purple-50 hover:bg-purple-100 border-2 border-purple-300'
                  }`}
                >
                  <div dangerouslySetInnerHTML={{ __html: option }} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Result Section */}
        {showResult && (
          <div className="w-full p-6 flex flex-col gap-6">
            {/* Feedback */}
            <div className={`p-4 rounded-lg border max-w-xl mx-auto w-full ${
              correctCount === totalBlanks
                ? 'bg-green-50 border-green-200'
                : correctCount > 0
                ? 'bg-yellow-50 border-yellow-200'
                : 'bg-red-50 border-red-200'
            }`}>
              <p className={`text-sm font-medium ${
                correctCount === totalBlanks
                  ? 'text-green-800'
                  : correctCount > 0
                  ? 'text-yellow-800'
                  : 'text-red-800'
              }`}>
                {correctCount === totalBlanks
                  ? `Perfect! All ${totalBlanks} blank${totalBlanks === 1 ? '' : 's'} filled correctly.`
                  : correctCount > 0
                  ? `You got ${correctCount} out of ${totalBlanks} blank${totalBlanks === 1 ? '' : 's'} correct.`
                  : `No blanks filled correctly. The correct answers are shown above.`}
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
                  <div 
                    className="text-blue-900 [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:my-2 [&_li]:mb-1 [&_a]:text-blue-600 [&_a]:underline [&_a:hover]:text-blue-800 [&_a]:cursor-pointer" 
                    dangerouslySetInnerHTML={{ __html: question.fact }}
                    onClick={handleFactClick}
                  />
                )}
                
                {/* Fact Audio Players */}
                {factAudioGroups.length > 0 && (
                  <div className={`${question.fact ? 'mt-4' : ''} flex flex-col items-center gap-3 w-full`}>
                    {factAudioGroups.map((factAudioGroup, index) => (
                      <div key={`q${question.id}-fact-${index}`} className="flex flex-col items-center gap-3 w-full">
                        <AudioPlayer 
                          key={`q${question.id}-fact-player-${index}`}
                          audioFiles={factAudioGroup.files} 
                          loopCount={factAudioLoopCount}
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
    </>
  );
}
