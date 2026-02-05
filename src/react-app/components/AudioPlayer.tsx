import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { audioManager } from '@/react-app/lib/audioManager';

interface AudioPlayerProps {
  audioFiles: string[];
  loopCount?: number;
  label?: string;
  colorScheme?: 'blue' | 'orange';
}

export function AudioPlayer({ 
  audioFiles, 
  loopCount = 1, 
  label = 'Play audio',
  colorScheme = 'blue'
}: AudioPlayerProps) {
  // Normalize loop count with defensive bounds (1-10)
  const normalizedLoopCount = Math.min(Math.max(loopCount || 1, 1), 10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [currentLoop, setCurrentLoop] = useState(0);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);
  const playerIdRef = useRef<string>(Math.random().toString(36).substring(7));

  const colors = {
    blue: {
      bg: 'bg-blue-600',
      hover: 'hover:bg-blue-700',
      text: 'text-blue-600',
      errorBg: 'bg-orange-500',
      errorHover: 'hover:bg-orange-600'
    },
    orange: {
      bg: 'bg-orange-500',
      hover: 'hover:bg-orange-600',
      text: 'text-orange-600',
      errorBg: 'bg-red-500',
      errorHover: 'hover:bg-red-600'
    }
  };

  const colorClass = colors[colorScheme];

  const loadAndPlayAudio = useCallback(() => {
    if (!audioRef.current || audioFiles.length === 0 || !isPlayingRef.current) return;
    
    const targetSrc = audioFiles[currentFileIndex];
    
    if (!targetSrc || targetSrc.trim() === '') {
      console.error('Invalid audio URL: empty or undefined');
      setAudioError(true);
      setIsPlaying(false);
      isPlayingRef.current = false;
      audioManager.stop(playerIdRef.current);
      return;
    }
    
    // Set src if it's different
    if (audioRef.current.src !== targetSrc) {
      audioRef.current.src = targetSrc;
      audioRef.current.load();
    }
    
    const playPromise = audioRef.current.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Ensure state is set when play succeeds
          if (isPlayingRef.current) {
            setIsPlaying(true);
            setAudioError(false);
          }
        })
        .catch((error) => {
          // Only log error if we're still trying to play
          if (isPlayingRef.current) {
            console.error('Audio playback failed:', error);
            setAudioError(true);
            setIsPlaying(false);
            isPlayingRef.current = false;
            audioManager.stop(playerIdRef.current);
          }
        });
    }
  }, [audioFiles, currentFileIndex]);

  const toggleAudioPlayback = useCallback(() => {
    if (audioFiles.length === 0) return;
    
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
      setAudioError(false);
      setCurrentLoop(0);
      setCurrentFileIndex(0);
      isPlayingRef.current = false;
      audioManager.stop(playerIdRef.current);
    } else {
      // Notify the audio manager that this player is starting
      audioManager.play(playerIdRef.current);
      setAudioError(false);
      setCurrentLoop(0);
      setCurrentFileIndex(0);
      setIsPlaying(true);
      isPlayingRef.current = true;
    }
  }, [isPlaying, audioFiles.length]);

  useEffect(() => {
    if (isPlaying && audioFiles.length > 0) {
      loadAndPlayAudio();
    }
  }, [isPlaying, currentFileIndex, audioFiles, loadAndPlayAudio]);

  const handleAudioEnded = useCallback(() => {
    if (currentFileIndex < audioFiles.length - 1) {
      setCurrentFileIndex(prev => prev + 1);
    } else {
      const nextLoop = currentLoop + 1;
      
      if (nextLoop < normalizedLoopCount) {
        setCurrentLoop(nextLoop);
        setCurrentFileIndex(0);
      } else {
        setIsPlaying(false);
        setCurrentLoop(0);
        setCurrentFileIndex(0);
        isPlayingRef.current = false;
        audioManager.stop(playerIdRef.current);
      }
    }
  }, [currentLoop, currentFileIndex, audioFiles.length, normalizedLoopCount]);

  const handleAudioError = useCallback(() => {
    if (!isPlayingRef.current) return;
    
    const audio = audioRef.current;
    if (audio?.error) {
      console.error('Audio error code:', audio.error.code);
      console.error('Audio error message:', audio.error.message);
      console.error('Audio source:', audio.src);
    }
    
    setAudioError(true);
    setIsPlaying(false);
    isPlayingRef.current = false;
    audioManager.stop(playerIdRef.current);
  }, []);

  // Handle when audio actually starts playing
  const handlePlaying = useCallback(() => {
    if (isPlayingRef.current) {
      setIsPlaying(true);
      setAudioError(false);
    }
  }, []);

  // Handle when audio pauses
  const handlePause = useCallback(() => {
    // Only update state if we're not at the end (handled by onEnded) and we're supposed to be playing
    if (audioRef.current && !audioRef.current.ended && isPlayingRef.current) {
      setIsPlaying(false);
    }
  }, []);

  // Handle waiting (buffering) state
  const handleWaiting = useCallback(() => {
    // Keep playing state true while buffering
    if (isPlayingRef.current) {
      setIsPlaying(true);
    }
  }, []);

  // Create a stable string representation of audioFiles for comparison
  const audioFilesKey = useMemo(() => audioFiles.join('|'), [audioFiles]);

  // Listen for other audio players starting
  useEffect(() => {
    const unsubscribe = audioManager.subscribe((currentPlayingId) => {
      // If another audio player started, stop this one
      if (currentPlayingId !== null && currentPlayingId !== playerIdRef.current && isPlayingRef.current) {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        setIsPlaying(false);
        setAudioError(false);
        setCurrentLoop(0);
        setCurrentFileIndex(0);
        isPlayingRef.current = false;
      }
    });

    return unsubscribe;
  }, []);

  // Reset state when audioFiles actually change (not just array reference)
  useEffect(() => {
    setAudioError(false);
    setIsPlaying(false);
    setCurrentLoop(0);
    setCurrentFileIndex(0);
    isPlayingRef.current = false;
    audioManager.stop(playerIdRef.current);
  }, [audioFilesKey]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.removeAttribute('src');
        audioRef.current.load();
      }
      audioManager.stop(playerIdRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-1.5 bg-gray-50 px-2 py-2 rounded-lg border border-gray-200 min-w-0 relative">
      <Volume2 size={12} className="text-gray-400 absolute top-1 right-1" />
      <div className="relative mb-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleAudioPlayback();
          }}
          className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full transition-colors text-white ${
            audioError 
              ? `${colorClass.errorBg} ${colorClass.errorHover}` 
              : `${colorClass.bg} ${colorClass.hover}`
          }`}
          aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
        </button>
        {isPlaying && !audioError && (
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-end gap-0.5 h-3">
            <div className={`w-1 ${colorClass.bg} rounded-full animate-wave-1`} style={{ height: '4px' }}></div>
            <div className={`w-1 ${colorClass.bg} rounded-full animate-wave-2`} style={{ height: '6px' }}></div>
            <div className={`w-1 ${colorClass.bg} rounded-full animate-wave-3`} style={{ height: '8px' }}></div>
            <div className={`w-1 ${colorClass.bg} rounded-full animate-wave-2`} style={{ height: '6px' }}></div>
            <div className={`w-1 ${colorClass.bg} rounded-full animate-wave-1`} style={{ height: '4px' }}></div>
          </div>
        )}
      </div>
      {label && (
        <span className="text-[9px] text-gray-600 text-center leading-tight max-w-full truncate px-0.5 w-full">
          {audioError ? 'Audio unavailable' : label}
        </span>
      )}
      <audio
        ref={audioRef}
        onEnded={handleAudioEnded}
        onError={handleAudioError}
        onPlaying={handlePlaying}
        onPause={handlePause}
        onWaiting={handleWaiting}
        preload="none"
      />
    </div>
  );
}
