import { useState, useCallback, useMemo, useEffect, useRef, Fragment } from 'react';
import { Check } from 'lucide-react';
import { shuffleArray } from '@/react-app/lib/utils';
import type { MatchItem } from '@/react-app/types';
import { AudioPlayer } from '@/react-app/components/AudioPlayer';

interface MatchingCardProps {
  pairs: [MatchItem, MatchItem][] | [MatchItem, MatchItem, MatchItem][];
  onComplete: (correct: boolean) => void;
}

interface ParsedItem {
  id: string;
  display: MatchItem;
  type: 'text' | 'image' | 'audio' | 'audio-or';
  value: string | string[] | string[][];
  orValues?: string[][]; // For audio-or type: array of audio file arrays
  orLabels?: string[]; // For audio-or type: labels for each OR option
  label?: string; // Optional label for audio items
}

export function MatchingCard({ pairs, onComplete }: MatchingCardProps) {
  // Parse and create unique IDs for items
  const { leftItems, rightItems, correctMatches } = useMemo(() => {
    const parseItem = (item: MatchItem, side: 'left' | 'right', index: number): ParsedItem => {
      // Handle array of audio files
      if (Array.isArray(item)) {
        // Check if first element is a label (text that's not an audio URL)
        const firstElement = item[0];
        const isLabel = typeof firstElement === 'string' && 
                       !firstElement.match(/\.(mp3|wav|ogg|m4a|aac)$/i);
        
        if (isLabel) {
          // First element is a label, rest are audio files
          const label = firstElement;
          const audioFiles = item.slice(1);
          return { 
            id: `${side}-${index}`, 
            display: item, 
            type: 'audio', 
            value: audioFiles,
            label: label  // Store the label
          };
        } else {
          // All elements are audio files
          return { id: `${side}-${index}`, display: item, type: 'audio', value: item };
        }
      }
      
      if (typeof item === 'string') {
        // Detect type based on string content
        if (item.match(/\.(mp3|wav|ogg|m4a|aac)$/i)) {
          return { id: `${side}-${index}`, display: item, type: 'audio', value: item };
        } else if (item.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) {
          return { id: `${side}-${index}`, display: item, type: 'image', value: item };
        }
        return { id: `${side}-${index}`, display: item, type: 'text', value: item };
      }
      return { id: `${side}-${index}`, display: item, type: item.type, value: item.value };
    };

    // Helper to parse OR items from nested array structure
    const parseOrItem = (nestedArrays: any[][], side: 'left' | 'right', index: number): ParsedItem => {
      // Each element in nestedArrays should be an array of audio files (potentially with a label)
      const audioArrays: string[][] = [];
      const labels: string[] = [];
      
      nestedArrays.forEach(arr => {
        if (!Array.isArray(arr)) {
          audioArrays.push([arr]);
          labels.push("Play audio");
          return;
        }
        
        // Check if first element is a label (text that's not an audio URL)
        const firstElement = arr[0];
        const isLabel = typeof firstElement === 'string' && 
                       !firstElement.match(/\.(mp3|wav|ogg|m4a|aac)$/i);
        
        if (isLabel) {
          // First element is a label, rest are audio files
          labels.push(firstElement);
          audioArrays.push(arr.slice(1));
        } else {
          // All elements are audio files
          labels.push("Play audio");
          audioArrays.push(arr);
        }
      });
      
      return {
        id: `${side}-${index}`,
        display: nestedArrays as any,
        type: 'audio-or',
        value: audioArrays[0],
        orValues: audioArrays,
        orLabels: labels
      };
    };

    const left = shuffleArray(pairs.map((pair, i) => parseItem(pair[0], 'left', i)));
    
    // Handle each pair individually
    // Check if second element is an array of arrays (OR format)
    const right = shuffleArray(shuffleArray(pairs.map((p, i) => {
      const secondElement = p[1];
      
      // Check if it's an array of arrays (nested structure for OR)
      if (Array.isArray(secondElement) && secondElement.length > 0 && Array.isArray(secondElement[0])) {
        // This is OR format: p[1] is [[audio1], [audio2]]
        return parseOrItem(secondElement as any[][], 'right', i);
      } else {
        // Regular pair
        return parseItem(secondElement, 'right', i);
      }
    })));
    
    // Create mapping of correct matches (left ID -> right ID)
    const matches: Record<string, string> = {};
    pairs.forEach((_, i) => {
      const leftId = `left-${i}`;
      const rightId = `right-${i}`;
      matches[leftId] = rightId;
    });

    return { leftItems: left, rightItems: right, correctMatches: matches };
  }, [pairs]);

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [incorrectPair, setIncorrectPair] = useState<{ left: string; right: string } | null>(null);
  const [justMatchedPair, setJustMatchedPair] = useState<{ left: string; right: string } | null>(null);
  const hasCompletedRef = useRef(false);

  // Reset state when pairs change (new question)
  useEffect(() => {
    setMatchedPairs(new Set());
    setSelectedLeft(null);
    setSelectedRight(null);
    setIncorrectPair(null);
    setJustMatchedPair(null);
    hasCompletedRef.current = false;
  }, [pairs]);

  const handleLeftClick = useCallback((id: string) => {
    if (matchedPairs.has(id) || incorrectPair) return;
    setSelectedLeft(prev => prev === id ? null : id);
  }, [matchedPairs, incorrectPair]);

  const handleRightClick = useCallback((id: string) => {
    if (matchedPairs.has(id) || incorrectPair) return;
    setSelectedRight(prev => prev === id ? null : id);
  }, [matchedPairs, incorrectPair]);

  // Check for match when both are selected
  useEffect(() => {
    if (selectedLeft && selectedRight) {
      const isCorrectMatch = correctMatches[selectedLeft] === selectedRight;
      
      if (isCorrectMatch) {
        console.log('[MatchingCard] Correct match found, adding to matchedPairs');
        // Show green border effect
        setJustMatchedPair({ left: selectedLeft, right: selectedRight });
        
        // Add both to matched set
        setMatchedPairs(prev => {
          const newSet = new Set([...prev, selectedLeft, selectedRight]);
          console.log('[MatchingCard] matchedPairs size after match:', newSet.size);
          return newSet;
        });
        
        // Remove green border effect and selections after brief moment
        setTimeout(() => {
          setJustMatchedPair(null);
          setSelectedLeft(null);
          setSelectedRight(null);
        }, 600);
        
        setIncorrectPair(null);
      } else {
        // Show incorrect feedback
        setIncorrectPair({ left: selectedLeft, right: selectedRight });
        
        // Not a match - deselect after a brief moment
        setTimeout(() => {
          setSelectedLeft(null);
          setSelectedRight(null);
          setIncorrectPair(null);
        }, 800);
      }
    }
  }, [selectedLeft, selectedRight, correctMatches]);

  // Separate effect to check completion and call onComplete only once
  useEffect(() => {
    console.log('[MatchingCard] Checking completion:', 
      'hasCompleted:', hasCompletedRef.current,
      'matchedSize:', matchedPairs.size,
      'leftLength:', leftItems.length,
      'rightLength:', rightItems.length,
      'totalNeeded:', leftItems.length + rightItems.length
    );
    
    if (!hasCompletedRef.current && matchedPairs.size > 0 && matchedPairs.size >= leftItems.length + rightItems.length) {
      console.log('[MatchingCard] All pairs matched, calling onComplete');
      hasCompletedRef.current = true;
      setTimeout(() => {
        console.log('[MatchingCard] Actually calling onComplete now');
        onComplete(true);
      }, 500);
    }
  }, [matchedPairs.size, leftItems.length, rightItems.length, pairs]);

  const renderItem = useCallback((item: ParsedItem, isLeft: boolean) => {
    const isMatched = matchedPairs.has(item.id);
    const isSelected = isLeft ? selectedLeft === item.id : selectedRight === item.id;
    const isIncorrect = incorrectPair && (incorrectPair.left === item.id || incorrectPair.right === item.id);
    const isJustMatched = justMatchedPair && (justMatchedPair.left === item.id || justMatchedPair.right === item.id);
    
    const baseClasses = "w-full h-full p-4 rounded-lg transition-all flex items-center justify-center";
    const stateClasses = isJustMatched
      ? "bg-green-100 border-2 border-green-500 cursor-not-allowed"
      : isMatched 
      ? "bg-gray-200 text-gray-400 cursor-not-allowed opacity-60 border-2 border-transparent" 
      : isIncorrect
      ? "bg-red-100 border-2 border-red-500 cursor-pointer animate-shake"
      : isSelected
      ? "bg-blue-100 border-2 border-blue-500 cursor-pointer"
      : "bg-white hover:bg-blue-50 cursor-pointer border-2 border-gray-800 shadow-sm hover:shadow-md hover:border-black";

    const onClick = isLeft ? () => handleLeftClick(item.id) : () => handleRightClick(item.id);

    if (item.type === 'text') {
      return (
        <button
          key={item.id}
          onClick={onClick}
          disabled={isMatched}
          className={`${baseClasses} ${stateClasses}`}
        >
          <span className="font-medium">{item.value}</span>
          {isMatched && <Check className="ml-2 text-green-600" size={20} />}
        </button>
      );
    }

    if (item.type === 'image') {
      return (
        <button
          key={item.id}
          onClick={onClick}
          disabled={isMatched}
          className={`${baseClasses} ${stateClasses} relative overflow-hidden`}
        >
          <img 
            src={item.value as string} 
            alt="Match item" 
            className="max-w-full max-h-[60px] object-contain"
          />
          {isMatched && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
              <Check className="text-green-600" size={24} />
            </div>
          )}
        </button>
      );
    }

    if (item.type === 'audio') {
      const audioFiles = Array.isArray(item.value) ? item.value as string[] : [item.value as string];
      const label = item.label || "Play audio";
      return (
        <div
          key={item.id}
          onClick={onClick}
          className={`${baseClasses} ${stateClasses} flex-col gap-2 relative overflow-hidden`}
        >
          <div className="w-full min-w-0">
            <AudioPlayer
              audioFiles={audioFiles}
              loopCount={1}
              label={label}
              colorScheme="blue"
            />
          </div>
          {isMatched && (
            <div className="absolute top-2 right-2">
              <Check className="text-green-600 bg-white rounded-full p-1" size={24} />
            </div>
          )}
        </div>
      );
    }

    if (item.type === 'audio-or' && item.orValues) {
      return (
        <div
          key={item.id}
          onClick={onClick}
          className={`${baseClasses} ${stateClasses} flex-col gap-1.5 relative justify-center overflow-hidden p-2`}
        >
          <div className="flex flex-wrap items-center justify-center gap-1 w-full">
            {item.orValues.map((audioFiles, index) => {
              const label = item.orLabels?.[index] || "Play audio";
              return (
                <div key={index} className="flex items-center gap-1 min-w-[60px]">
                  {index > 0 && (
                    <span className="text-gray-600 font-semibold text-[10px] px-0.5 flex-shrink-0">OR</span>
                  )}
                  <div className="flex-1 min-w-[60px]">
                    <AudioPlayer
                      audioFiles={audioFiles}
                      loopCount={1}
                      label={label}
                      colorScheme="blue"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          {isMatched && (
            <div className="absolute top-2 right-2">
              <Check className="text-green-600 bg-white rounded-full p-1" size={20} />
            </div>
          )}
        </div>
      );
    }

    return null;
  }, [matchedPairs, selectedLeft, selectedRight, incorrectPair, justMatchedPair, handleLeftClick, handleRightClick]);

  return (
    <div className="w-full max-w-4xl">
      <div className="grid grid-cols-2 gap-x-8 gap-y-3" style={{ gridAutoRows: 'minmax(100px, auto)' }}>
        {/* Interleave left and right items in grid rows */}
        {leftItems.map((leftItem, index) => {
          const rightItem = rightItems[index];
          return (
            <Fragment key={index}>
              <div>
                {renderItem(leftItem, true)}
              </div>
              <div>
                {renderItem(rightItem, false)}
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
