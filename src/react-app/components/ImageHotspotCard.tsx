import { useState, useCallback, useEffect, useRef, MouseEvent } from 'react';
import { X, ImageOff, Info } from 'lucide-react';
import { shuffleArray } from '@/react-app/lib/utils';
import type { Hotspot } from '@/react-app/types';

interface ImageHotspotCardProps {
  imageUrl: string;
  hotspots: Hotspot[];
  answerPool: string[];
  onComplete: (correct: boolean) => void;
}

interface ImageScale {
  scaleX: number;
  scaleY: number;
  offsetX: number;
  offsetY: number;
}

export function ImageHotspotCard({ imageUrl, hotspots, answerPool, onComplete }: ImageHotspotCardProps) {
  const [selectedHotspot, setSelectedHotspot] = useState<number | null>(null);
  const [filledHotspots, setFilledHotspots] = useState<Map<number, string>>(new Map());
  const [usedAnswers, setUsedAnswers] = useState<Set<string>>(new Set());
  const [showResult, setShowResult] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [shuffledAnswers] = useState(() => {
    // Extract all correct answers from hotspots
    const correctAnswers = hotspots.map(h => h.correctAnswer);
    
    // If answerPool is provided and not empty (filter out empty strings), use it as distractors
    const distractors = answerPool && answerPool.length > 0 && answerPool.some(a => a.trim() !== '')
      ? answerPool.filter(a => a.trim() !== '')
      : [];
    
    // Combine correct answers with distractors, removing duplicates
    const allAnswers = [...correctAnswers];
    distractors.forEach(distractor => {
      if (!allAnswers.includes(distractor)) {
        allAnswers.push(distractor);
      }
    });
    
    return shuffleArray(allAnswers);
  });
  const [imageScale, setImageScale] = useState<ImageScale>({ scaleX: 1, scaleY: 1, offsetX: 0, offsetY: 0 });
  const [showInfo, setShowInfo] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const infoBoxRef = useRef<HTMLDivElement>(null);

  // Detect mobile/tablet view
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 1024); // Use mobile view for tablets and below
    };
    
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

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

  // Calculate image scale when image loads or window resizes
  useEffect(() => {
    const calculateScale = () => {
      if (!imageRef.current || !containerRef.current) return;
      
      const naturalWidth = imageRef.current.naturalWidth;
      const naturalHeight = imageRef.current.naturalHeight;
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;
      
      // Calculate scale to fit image within container (object-contain behavior)
      const scaleX = containerWidth / naturalWidth;
      const scaleY = containerHeight / naturalHeight;
      const scale = Math.min(scaleX, scaleY);
      
      // Calculate displayed dimensions
      const displayedWidth = naturalWidth * scale;
      const displayedHeight = naturalHeight * scale;
      
      // Calculate offset (image is centered in container)
      const offsetX = (containerWidth - displayedWidth) / 2;
      const offsetY = (containerHeight - displayedHeight) / 2;
      
      setImageScale({
        scaleX: scale,
        scaleY: scale,
        offsetX,
        offsetY
      });
    };
    
    if (imageLoaded) {
      calculateScale();
      window.addEventListener('resize', calculateScale);
      return () => window.removeEventListener('resize', calculateScale);
    }
  }, [imageLoaded]);

  // Check if all hotspots are filled
  useEffect(() => {
    if (filledHotspots.size === hotspots.length && !showResult) {
      setShowResult(true);
      
      // Check if all answers are correct
      const allCorrect = hotspots.every(hotspot => 
        filledHotspots.get(hotspot.id) === hotspot.correctAnswer
      );
      
      onComplete(allCorrect);
    }
  }, [filledHotspots, hotspots, showResult, onComplete]);

  const handleHotspotClick = useCallback((hotspotId: number) => {
    if (showResult) return;
    
    // If clicking a filled hotspot, remove its answer and return it to the pool
    if (filledHotspots.has(hotspotId)) {
      const answer = filledHotspots.get(hotspotId);
      if (answer) {
        setFilledHotspots(prev => {
          const newMap = new Map(prev);
          newMap.delete(hotspotId);
          return newMap;
        });
        setUsedAnswers(prev => {
          const newSet = new Set(prev);
          newSet.delete(answer);
          return newSet;
        });
        setSelectedHotspot(hotspotId);
      }
      return;
    }
    
    setSelectedHotspot(prev => prev === hotspotId ? null : hotspotId);
  }, [showResult, filledHotspots]);

  const handleAnswerClick = useCallback((answer: string) => {
    if (showResult || selectedHotspot === null || usedAnswers.has(answer)) return;
    
    setFilledHotspots(prev => new Map(prev).set(selectedHotspot, answer));
    setUsedAnswers(prev => new Set(prev).add(answer));
    setSelectedHotspot(null);
  }, [showResult, selectedHotspot, usedAnswers]);

  const isHotspotCorrect = useCallback((hotspotId: number): boolean | null => {
    if (!showResult) return null;
    const filledAnswer = filledHotspots.get(hotspotId);
    if (!filledAnswer) return null;
    const hotspot = hotspots.find(h => h.id === hotspotId);
    return hotspot ? filledAnswer === hotspot.correctAnswer : null;
  }, [showResult, filledHotspots, hotspots]);

  // Render mobile view
  if (isMobileView) {
    return (
      <div className="w-full">
        {/* Instruction with Info Icon */}
        <div className="text-center mb-4 relative">
          <span className="inline-flex items-center gap-2 px-3 py-2 text-xs text-blue-700 font-bold bg-blue-50 border-2 border-blue-400 rounded-full shadow-md">
            TAP A LABEL, THEN SELECT ANSWER
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
              aria-label="Help"
            >
              <Info size={14} />
            </button>
          </span>
          
          {/* Info Box */}
          {showInfo && (
            <div ref={infoBoxRef} className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-72 bg-white border-2 border-blue-400 rounded-lg shadow-xl p-4 z-10">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-blue-800 text-sm">How to play:</h3>
                <button
                  onClick={() => setShowInfo(false)}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
              <ol className="text-xs text-gray-700 space-y-2 list-decimal list-inside">
                <li>Tap a hotspot label below the image</li>
                <li>Select the correct answer from the options</li>
                <li>Tap a filled label to change your answer</li>
                <li>Once all labels are filled, answers will be checked!</li>
              </ol>
            </div>
          )}
        </div>

        {/* Image with visual markers */}
        <div ref={containerRef} className="w-full aspect-[16/9] relative rounded-lg overflow-hidden bg-gray-50 mb-4">
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
            <>
              <img
                ref={imageRef}
                src={imageUrl}
                alt="Question"
                className={`w-full h-full object-contain ${imageLoaded ? 'block' : 'hidden'}`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
              
              {/* Visual indicators for hotspot locations */}
              {imageLoaded && hotspots.map(hotspot => {
                const isFilled = filledHotspots.has(hotspot.id);
                const isSelected = selectedHotspot === hotspot.id;
                const isCorrect = isHotspotCorrect(hotspot.id);
                
                let bgColor = 'bg-blue-500/40';
                let borderColor = 'border-blue-600';
                
                if (isSelected) {
                  bgColor = 'bg-yellow-500/60';
                  borderColor = 'border-yellow-600';
                }
                
                if (showResult && isFilled) {
                  if (isCorrect) {
                    bgColor = 'bg-green-500/40';
                    borderColor = 'border-green-600';
                  } else {
                    bgColor = 'bg-red-500/40';
                    borderColor = 'border-red-600';
                  }
                }
                
                const scaledLeft = hotspot.x * imageScale.scaleX + imageScale.offsetX;
                const scaledTop = hotspot.y * imageScale.scaleY + imageScale.offsetY;
                
                return (
                  <div
                    key={hotspot.id}
                    className={`absolute w-8 h-8 ${bgColor} ${borderColor} border-2 rounded-full flex items-center justify-center pointer-events-none`}
                    style={{
                      left: `${scaledLeft}px`,
                      top: `${scaledTop}px`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <span className="text-xs font-bold text-white drop-shadow">{hotspot.label}</span>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Hotspot Labels List */}
        <div className="space-y-2 mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Select a hotspot:</h4>
          {hotspots.map(hotspot => {
            const isFilled = filledHotspots.has(hotspot.id);
            const isSelected = selectedHotspot === hotspot.id;
            const isCorrect = isHotspotCorrect(hotspot.id);
            
            let bgColor = 'bg-white';
            let borderColor = 'border-gray-300';
            let textColor = 'text-gray-800';
            
            if (isSelected) {
              bgColor = 'bg-yellow-50';
              borderColor = 'border-yellow-500';
            }
            
            if (showResult && isFilled) {
              if (isCorrect) {
                bgColor = 'bg-green-50';
                borderColor = 'border-green-600';
                textColor = 'text-green-800';
              } else {
                bgColor = 'bg-red-50';
                borderColor = 'border-red-600';
                textColor = 'text-red-800';
              }
            }
            
            return (
              <button
                key={hotspot.id}
                onClick={() => handleHotspotClick(hotspot.id)}
                disabled={showResult}
                className={`w-full p-4 rounded-lg border-2 ${borderColor} ${bgColor} transition-all ${!showResult ? 'cursor-pointer active:scale-98' : 'cursor-default'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                      {hotspot.label}
                    </span>
                    <span className={`font-medium ${textColor}`}>
                      {isFilled ? filledHotspots.get(hotspot.id) : 'Select answer...'}
                    </span>
                  </div>
                  {showResult && isFilled && !isCorrect && (
                    <span className="text-xs text-gray-600">Correct: {hotspot.correctAnswer}</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Answer Selection Dialog */}
        {selectedHotspot !== null && !showResult && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setSelectedHotspot(null)}
            />
            
            {/* Dialog */}
            <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-md mx-auto bg-white rounded-xl shadow-2xl z-50 max-h-[80vh] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">
                  Select answer for {hotspots.find(h => h.id === selectedHotspot)?.label}
                </h3>
                <button
                  onClick={() => setSelectedHotspot(null)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Answer Options */}
              <div className="overflow-y-auto p-4 space-y-2">
                {shuffledAnswers.map((answer, index) => {
                  const isUsed = usedAnswers.has(answer);
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerClick(answer)}
                      disabled={isUsed}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        isUsed
                          ? 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed opacity-50'
                          : 'bg-white text-gray-800 border-gray-300 hover:border-blue-500 hover:bg-blue-50 cursor-pointer active:scale-[0.98]'
                      }`}
                    >
                      <div className="font-medium">{answer}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // Desktop view
  return (
    <div className="w-full max-w-4xl">
      {/* Instruction with Info Icon */}
      <div className="text-center mb-4 relative">
        <span className="inline-flex items-center gap-2 px-4 py-2 text-sm text-blue-700 font-bold bg-blue-50 border-2 border-blue-400 rounded-full shadow-md">
          CLICK A HOTSPOT, THEN SELECT THE CORRECT ANSWER
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
            aria-label="Help"
          >
            <Info size={16} />
          </button>
        </span>
        
        {/* Info Box */}
        {showInfo && (
          <div ref={infoBoxRef} className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-80 bg-white border-2 border-blue-400 rounded-lg shadow-xl p-4 z-10">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-blue-800 text-sm">How to play:</h3>
              <button
                onClick={() => setShowInfo(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
            <ol className="text-xs text-gray-700 space-y-2 list-decimal list-inside">
              <li>Click on a labeled hotspot (A, B, C, etc.) on the image</li>
              <li>Select the correct answer from the pool below</li>
              <li>The hotspot label will be replaced by your answer</li>
              <li>Click a filled hotspot to change your answer</li>
              <li>Once all hotspots are filled, your answers will be checked!</li>
            </ol>
          </div>
        )}
      </div>

      {/* Image Container with Hotspots */}
      <div className="relative w-full mb-6">
        <div ref={containerRef} className="w-full aspect-[16/9] relative rounded-lg overflow-hidden bg-gray-50">
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
            <>
              <img
                ref={imageRef}
                src={imageUrl}
                alt="Question"
                className={`w-full h-full object-contain ${imageLoaded ? 'block' : 'hidden'}`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
              
              {/* Hotspot overlays */}
              {imageLoaded && hotspots.map(hotspot => {
                const isFilled = filledHotspots.has(hotspot.id);
                const isSelected = selectedHotspot === hotspot.id;
                const isCorrect = isHotspotCorrect(hotspot.id);
                
                let bgColor = 'bg-blue-500/30 hover:bg-blue-500/50';
                let borderColor = 'border-blue-600';
                
                if (isFilled) {
                  bgColor = 'bg-gray-500/20';
                  borderColor = 'border-gray-600';
                }
                
                if (isSelected) {
                  bgColor = 'bg-yellow-500/40';
                  borderColor = 'border-yellow-600';
                }
                
                if (showResult && isFilled) {
                  if (isCorrect) {
                    bgColor = 'bg-green-500/30';
                    borderColor = 'border-green-600';
                  } else {
                    bgColor = 'bg-red-500/30';
                    borderColor = 'border-red-600';
                  }
                }
                
                // Transform pixel coordinates based on image scaling
                // Coordinates represent the center of the hotspot
                const scaledLeft = hotspot.x * imageScale.scaleX + imageScale.offsetX;
                const scaledTop = hotspot.y * imageScale.scaleY + imageScale.offsetY;
                
                // If width/height are provided, scale them. Otherwise let it auto-size
                const styleProps: React.CSSProperties = {
                  left: `${scaledLeft}px`,
                  top: `${scaledTop}px`,
                  transform: 'translate(-50%, -50%)', // Center the box at the specified coordinates
                };
                
                if (hotspot.width !== undefined) {
                  styleProps.width = `${hotspot.width * imageScale.scaleX}px`;
                }
                
                if (hotspot.height !== undefined) {
                  styleProps.height = `${hotspot.height * imageScale.scaleY}px`;
                }
                
                return (
                  <div
                    key={hotspot.id}
                    onClick={() => handleHotspotClick(hotspot.id)}
                    className={`absolute border-2 ${borderColor} ${bgColor} ${!showResult ? 'cursor-pointer' : 'cursor-default'} transition-all rounded flex items-center justify-center px-3 py-2 min-w-[40px]`}
                    style={styleProps}
                  >
                    <div className="text-center">
                      {isFilled ? (
                        // Show only the answer when filled
                        <div className={`text-sm font-medium ${
                          showResult 
                            ? (isCorrect ? 'text-green-800' : 'text-red-800')
                            : 'text-gray-800'
                        }`}>
                          {filledHotspots.get(hotspot.id)}
                        </div>
                      ) : (
                        // Show the label when empty
                        <div className={`text-lg font-bold ${isSelected ? 'text-yellow-800' : 'text-blue-800'}`}>
                          {hotspot.label}
                        </div>
                      )}
                    </div>
                    {/* Show label next to box when revealing answers */}
                    {showResult && isFilled && (
                      <div 
                        className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-900/75 text-white text-xs rounded whitespace-nowrap pointer-events-none"
                      >
                        {hotspot.label}
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>

      {/* Answer Pool */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3 text-center">Answer Pool</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {shuffledAnswers.map((answer, index) => {
            const isUsed = usedAnswers.has(answer);
            
            return (
              <button
                key={index}
                onClick={() => handleAnswerClick(answer)}
                disabled={isUsed || showResult}
                className={`p-3 rounded-lg border-2 transition-all ${
                  isUsed
                    ? 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed opacity-50'
                    : 'bg-white text-gray-800 border-gray-300 hover:border-blue-500 hover:bg-blue-50 cursor-pointer'
                }`}
              >
                <div className="text-sm font-medium text-center">{answer}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Show correct answers if wrong */}
      {showResult && hotspots.some(h => filledHotspots.get(h.id) !== h.correctAnswer) && (
        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-yellow-800 mb-2">Correct Answers:</h4>
          <div className="space-y-1">
            {hotspots.map(hotspot => {
              const userAnswer = filledHotspots.get(hotspot.id);
              const isCorrect = userAnswer === hotspot.correctAnswer;
              
              if (isCorrect) return null;
              
              return (
                <div key={hotspot.id} className="text-sm text-yellow-900">
                  <span className="font-medium">{hotspot.label}:</span> {hotspot.correctAnswer}
                  {userAnswer && <span className="text-red-600"> (You selected: {userAnswer})</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
