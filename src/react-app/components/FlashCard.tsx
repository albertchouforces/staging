import { useState, useEffect, useCallback, useRef } from 'react';
import type { QuestionData } from '@/react-app/types';
import { getCorrectAnswer } from '@/react-app/lib/utils';
import { BookOpen, Check, ImageOff, X, Play, Pause, Volume2 } from 'lucide-react';

interface FlashCardProps {
  question: QuestionData;
  options: string[];
  onAnswer: (correct: boolean) => void;
  onNext: () => void;
  questionNumber: number;
  totalQuestions: number;
}

export function FlashCard({ 
  question, 
  options: initialOptions, 
  onAnswer, 
  onNext,
  questionNumber,
  totalQuestions
}: FlashCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [currentLoop, setCurrentLoop] = useState(0);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Get audio files as array
  const getAudioFiles = useCallback((): string[] => {
    if (!question.audioUrl) return [];
    return Array.isArray(question.audioUrl) ? question.audioUrl : [question.audioUrl];
  }, [question.audioUrl]);

  const audioFiles = getAudioFiles();

  // Set options when they change from parent
  useEffect(() => {
    // Use the shuffled options directly from parent without modification
    setOptions(initialOptions);
  }, [initialOptions]);

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setShowResult(false);
    setImageLoaded(false);
    setImageError(false);
    setIsPlaying(false);
    setAudioError(false);
    setCurrentLoop(0);
    setCurrentFileIndex(0);
    
    // Stop and reset audio when question changes
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [question]);

  const handleAnswer = useCallback((answer: string) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    const correctAnswer = getCorrectAnswer(question.correctAnswer);
    const correct = answer === correctAnswer;
    onAnswer(correct);
  }, [showResult, question.correctAnswer, onAnswer]);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(true);
  }, []);

  const playCurrentAudio = useCallback(() => {
    if (!audioRef.current || audioFiles.length === 0) return;
    
    audioRef.current.src = audioFiles[currentFileIndex];
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {
      setAudioError(true);
      setIsPlaying(false);
    });
  }, [audioFiles, currentFileIndex]);

  const toggleAudioPlayback = useCallback(() => {
    if (audioFiles.length === 0 || audioError) return;
    
    if (isPlaying) {
      // Stop playback
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
      setCurrentLoop(0);
      setCurrentFileIndex(0);
    } else {
      // Start playback from the beginning
      setCurrentLoop(0);
      setCurrentFileIndex(0);
      setIsPlaying(true);
      // Audio will start playing via the effect below
    }
  }, [isPlaying, audioError, audioFiles.length]);

  // Effect to play audio when isPlaying or currentFileIndex changes
  useEffect(() => {
    if (isPlaying && audioFiles.length > 0) {
      playCurrentAudio();
    }
  }, [isPlaying, currentFileIndex, audioFiles.length, playCurrentAudio]);

  const handleAudioEnded = useCallback(() => {
    const loopCount = question.audioLoopCount ?? 1;
    
    // Check if there are more files in the current sequence
    if (currentFileIndex < audioFiles.length - 1) {
      // Move to next file in the sequence
      setCurrentFileIndex(prev => prev + 1);
    } else {
      // Finished all files in the sequence, check if we need to loop
      const nextLoop = currentLoop + 1;
      
      if (nextLoop < loopCount) {
        // Start the sequence again
        setCurrentLoop(nextLoop);
        setCurrentFileIndex(0);
      } else {
        // Finished all loops
        setIsPlaying(false);
        setCurrentLoop(0);
        setCurrentFileIndex(0);
      }
    }
  }, [currentLoop, currentFileIndex, audioFiles.length, question.audioLoopCount]);

  const handleAudioError = useCallback(() => {
    setAudioError(true);
    setIsPlaying(false);
  }, []);

  const getOptionStyles = useCallback((option: string) => {
    const correctAnswer = getCorrectAnswer(question.correctAnswer);
    if (!showResult) {
      return "bg-gray-100 hover:bg-gray-200";
    }
    if (option === correctAnswer) {
      return "bg-green-100 border-2 border-green-500";
    }
    if (selectedAnswer === option) {
      return "bg-red-100 border-2 border-red-500";
    }
    return "bg-gray-100";
  }, [showResult, question.correctAnswer, selectedAnswer]);

  return (
    <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg">
      <div className="flex flex-col w-full">
        {/* Question Section */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">{question.question}</h3>
            <span className="text-sm text-gray-500">Question {questionNumber} of {totalQuestions}</span>
          </div>
          {/* Image Container with improved sizing */}
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
            <p className="text-lg text-gray-600 italic text-center max-w-xl">{question.description}</p>
          </div>

          {/* Audio Player */}
          {audioFiles.length > 0 && (
            <div className="mt-4 flex justify-center">
              <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
                <Volume2 size={20} className="text-gray-600" />
                <button
                  onClick={toggleAudioPlayback}
                  disabled={audioError}
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                    audioError 
                      ? 'bg-gray-300 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                  aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                </button>
                <span className="text-sm text-gray-600">
                  {audioError ? 'Audio unavailable' : isPlaying ? 'Playing...' : 'Play audio'}
                </span>
                <audio
                  ref={audioRef}
                  onEnded={handleAudioEnded}
                  onError={handleAudioError}
                  preload="metadata"
                />
              </div>
            </div>
          )}
        </div>

        {/* Options Section */}
        <div className="w-full p-6 border-b border-gray-100">
          <div className="grid grid-cols-1 gap-3 w-full max-w-xl mx-auto">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={showResult}
                className={`w-full min-h-[60px] p-4 text-left rounded-lg transition-colors flex items-center justify-between ${getOptionStyles(option)}`}
              >
                <span>{option}</span>
                {showResult && (
                  <span>
                    {option === getCorrectAnswer(question.correctAnswer) && (
                      <Check className="text-green-600" size={20} />
                    )}
                    {selectedAnswer === option && option !== getCorrectAnswer(question.correctAnswer) && (
                      <X className="text-red-600" size={20} />
                    )}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Result Section */}
        {showResult && (
          <div className="w-full p-6 flex flex-col gap-6">
            <div className="flex justify-center w-full">
              <button
                onClick={onNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {questionNumber === totalQuestions ? 'Finish Quiz' : 'Next Question'}
              </button>
            </div>

            {/* Only show "Did you know" section if there's a fact */}
            {question.fact && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 max-w-xl mx-auto">
                <div className="flex items-center gap-2 text-blue-800 mb-2">
                  <BookOpen size={20} />
                  <span className="font-semibold">Did you know?</span>
                </div>
                <p className="text-blue-900">{question.fact}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
