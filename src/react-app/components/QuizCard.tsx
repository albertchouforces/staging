import { useState, useEffect, useCallback } from 'react';
import { BookOpen, Download, ExternalLink, FileText, ImageOff, Play } from 'lucide-react';
import type { QuizConfig, QuizStats } from '@/react-app/types';
import { HighScoresList } from '@/react-app/components/HighScoresList';

interface QuizCardProps {
  config: QuizConfig;
  stats: QuizStats;
  onStart: () => void;
  onResetScores: () => void;
}

export function QuizCard({ config, stats, onStart, onResetScores }: QuizCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showStudyGuide, setShowStudyGuide] = useState(false);
  const [studyGuideType, setStudyGuideType] = useState<'image' | 'pdf' | 'web' | 'other'>('image');
  const imageTimeoutRef = useCallback(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    return {
      set: (callback: () => void, delay: number) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(callback, delay);
      },
      clear: () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
      }
    };
  }, [])();

  // Map theme colors to actual Tailwind classes
  const getColorClasses = useCallback((color: string) => {
    const colorMap: Record<string, { 
      title: string;
      button: string;
      buttonHover: string;
      studyGuideText: string;
      studyGuideHover: string;
      modalHeader: string;
      modalTitle: string;
    }> = {
      blue: {
        title: 'text-blue-600',
        button: 'bg-blue-600',
        buttonHover: 'hover:bg-blue-700',
        studyGuideText: 'text-blue-600',
        studyGuideHover: 'hover:bg-blue-50',
        modalHeader: 'bg-blue-50',
        modalTitle: 'text-blue-600'
      },
      green: {
        title: 'text-green-600',
        button: 'bg-green-600',
        buttonHover: 'hover:bg-green-700',
        studyGuideText: 'text-green-600',
        studyGuideHover: 'hover:bg-green-50',
        modalHeader: 'bg-green-50',
        modalTitle: 'text-green-600'
      },
      purple: {
        title: 'text-purple-600',
        button: 'bg-purple-600',
        buttonHover: 'hover:bg-purple-700',
        studyGuideText: 'text-purple-600',
        studyGuideHover: 'hover:bg-purple-50',
        modalHeader: 'bg-purple-50',
        modalTitle: 'text-purple-600'
      },
      red: {
        title: 'text-red-600',
        button: 'bg-red-600',
        buttonHover: 'hover:bg-red-700',
        studyGuideText: 'text-red-600',
        studyGuideHover: 'hover:bg-red-50',
        modalHeader: 'bg-red-50',
        modalTitle: 'text-red-600'
      },
      orange: {
        title: 'text-orange-600',
        button: 'bg-orange-600',
        buttonHover: 'hover:bg-orange-700',
        studyGuideText: 'text-orange-600',
        studyGuideHover: 'hover:bg-orange-50',
        modalHeader: 'bg-orange-50',
        modalTitle: 'text-orange-600'
      },
      yellow: {
        title: 'text-yellow-600',
        button: 'bg-yellow-500',
        buttonHover: 'hover:bg-yellow-600',
        studyGuideText: 'text-yellow-600',
        studyGuideHover: 'hover:bg-yellow-50',
        modalHeader: 'bg-yellow-50',
        modalTitle: 'text-yellow-600'
      },
      pink: {
        title: 'text-pink-600',
        button: 'bg-pink-600',
        buttonHover: 'hover:bg-pink-700',
        studyGuideText: 'text-pink-600',
        studyGuideHover: 'hover:bg-pink-50',
        modalHeader: 'bg-pink-50',
        modalTitle: 'text-pink-600'
      },
      indigo: {
        title: 'text-indigo-600',
        button: 'bg-indigo-600',
        buttonHover: 'hover:bg-indigo-700',
        studyGuideText: 'text-indigo-600',
        studyGuideHover: 'hover:bg-indigo-50',
        modalHeader: 'bg-indigo-50',
        modalTitle: 'text-indigo-600'
      },
      teal: {
        title: 'text-teal-600',
        button: 'bg-teal-600',
        buttonHover: 'hover:bg-teal-700',
        studyGuideText: 'text-teal-600',
        studyGuideHover: 'hover:bg-teal-50',
        modalHeader: 'bg-teal-50',
        modalTitle: 'text-teal-600'
      },
      sky: {
        title: 'text-sky-600',
        button: 'bg-sky-600',
        buttonHover: 'hover:bg-sky-700',
        studyGuideText: 'text-sky-600',
        studyGuideHover: 'hover:bg-sky-50',
        modalHeader: 'bg-sky-50',
        modalTitle: 'text-sky-600'
      },
      cyan: {
        title: 'text-cyan-600',
        button: 'bg-cyan-600',
        buttonHover: 'hover:bg-cyan-700',
        studyGuideText: 'text-cyan-600',
        studyGuideHover: 'hover:bg-cyan-50',
        modalHeader: 'bg-cyan-50',
        modalTitle: 'text-cyan-600'
      },
      rose: {
        title: 'text-rose-600',
        button: 'bg-rose-600',
        buttonHover: 'hover:bg-rose-700',
        studyGuideText: 'text-rose-600',
        studyGuideHover: 'hover:bg-rose-50',
        modalHeader: 'bg-rose-50',
        modalTitle: 'text-rose-600'
      },
      amber: {
        title: 'text-amber-600',
        button: 'bg-amber-600',
        buttonHover: 'hover:bg-amber-700',
        studyGuideText: 'text-amber-600',
        studyGuideHover: 'hover:bg-amber-50',
        modalHeader: 'bg-amber-50',
        modalTitle: 'text-amber-600'
      },
      lime: {
        title: 'text-lime-600',
        button: 'bg-lime-600',
        buttonHover: 'hover:bg-lime-700',
        studyGuideText: 'text-lime-600',
        studyGuideHover: 'hover:bg-lime-50',
        modalHeader: 'bg-lime-50',
        modalTitle: 'text-lime-600'
      },
      violet: {
        title: 'text-violet-600',
        button: 'bg-violet-600',
        buttonHover: 'hover:bg-violet-700',
        studyGuideText: 'text-violet-600',
        studyGuideHover: 'hover:bg-violet-50',
        modalHeader: 'bg-violet-50',
        modalTitle: 'text-violet-600'
      },
      fuchsia: {
        title: 'text-fuchsia-600',
        button: 'bg-fuchsia-600',
        buttonHover: 'hover:bg-fuchsia-700',
        studyGuideText: 'text-fuchsia-600',
        studyGuideHover: 'hover:bg-fuchsia-50',
        modalHeader: 'bg-fuchsia-50',
        modalTitle: 'text-fuchsia-600'
      },
      emerald: {
        title: 'text-emerald-600',
        button: 'bg-emerald-600',
        buttonHover: 'hover:bg-emerald-700',
        studyGuideText: 'text-emerald-600',
        studyGuideHover: 'hover:bg-emerald-50',
        modalHeader: 'bg-emerald-50',
        modalTitle: 'text-emerald-600'
      },
      grey: {
        title: 'text-gray-600',
        button: 'bg-gray-600',
        buttonHover: 'hover:bg-gray-700',
        studyGuideText: 'text-gray-600',
        studyGuideHover: 'hover:bg-gray-50',
        modalHeader: 'bg-gray-50',
        modalTitle: 'text-gray-600'
      }
    };

    return colorMap[color] || colorMap.blue;
  }, []);

  const colors = getColorClasses(config.themeColor);

  const handleReset = () => {
    onResetScores();
    // Add reload as fallback
    window.location.reload();
  };

  // Determine study guide type once when the component mounts or when config changes
  useEffect(() => {
    if (!config.studyGuide || config.studyGuide.trim() === "") return;
    
    const url = config.studyGuide.toLowerCase();
    
    // First priority: check if it's an external URL
    if (url.startsWith('http://') || url.startsWith('https://')) {
      setStudyGuideType('web');
      return;
    } 
    
    // For local files only, handle by extension
    if (url.match(/\.(jpeg|jpg|gif|png|svg|webp)$/i)) {
      setStudyGuideType('image');
    } 
    else if (url.match(/\.(pdf|doc|docx|xls|xlsx|ppt|pptx|txt)$/i)) {
      setStudyGuideType('pdf');
    } 
    else {
      setStudyGuideType('other');
    }
  }, [config.studyGuide]);

  const handleStudyGuideClick = useCallback(() => {
    if (!config.studyGuide || config.studyGuide.trim() === "") return;
    
    // First priority: handle external URLs consistently
    if (studyGuideType === 'web') {
      window.open(config.studyGuide, '_blank', 'noopener,noreferrer');
      return;
    }
    
    // For local files only, handle by type
    if (studyGuideType === 'image') {
      // Show modal for local images only
      setShowStudyGuide(true);
    } 
    else {
      // Trigger download for documents and other file types
      const link = document.createElement('a');
      link.href = config.studyGuide;
      link.download = config.studyGuide.split('/').pop() || 'study-guide';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [config.studyGuide, studyGuideType]);

  // Get the appropriate icon and text for the study guide button
  const getStudyGuideButtonContent = useCallback(() => {
    switch (studyGuideType) {
      case 'image':
        return { icon: <BookOpen size={16} />, text: 'View Study Guide' };
      case 'pdf':
        return { icon: <Download size={16} />, text: 'Download Study Materials' };
      case 'web':
        return { icon: <ExternalLink size={16} />, text: 'Visit Study Resources' };
      default:
        return { icon: <FileText size={16} />, text: 'Access Study Materials' };
    }
  }, [studyGuideType]);

  const studyGuideButton = getStudyGuideButtonContent();

  // Image error handler with proper dependency array
  const handleImageError = useCallback(() => {
    imageTimeoutRef.clear();
    setImageError(true);
    setImageLoaded(true);
  }, [imageTimeoutRef]);
  
  // Image load handler to clear timeout
  const handleImageLoad = useCallback(() => {
    imageTimeoutRef.clear();
    setImageLoaded(true);
  }, [imageTimeoutRef]);

  // Reset image state when config changes and set timeout for loading
  useEffect(() => {
    setImageError(false);
    setImageLoaded(false);
    
    // Set a timeout to prevent infinite loading state
    // If the image doesn't load within 10 seconds, treat it as an error
    if (config.startScreenImage && config.startScreenImage.trim() !== '') {
      imageTimeoutRef.set(() => {
        setImageError(true);
        setImageLoaded(true);
      }, 10000);
    }
    
    // Cleanup timeout on unmount or when config changes
    return () => {
      imageTimeoutRef.clear();
    };
  }, [config.startScreenImage, imageTimeoutRef]);

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full">
        {/* Quiz Image with transparent background */}
        {config.startScreenImage && config.startScreenImage.trim() !== '' && (
          <div className="w-full h-32 relative bg-transparent flex items-center justify-center">
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-gray-400 text-center">
                  <div className="text-sm font-medium">Loading Image</div>
                </div>
              </div>
            )}
            {imageError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                <ImageOff size={32} />
                <p className="text-sm mt-2">Preview not available</p>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center p-4 bg-transparent">
                <img
                  src={config.startScreenImage}
                  alt={config.title}
                  className={`max-w-full max-h-full object-contain ${imageLoaded ? 'block' : 'hidden'}`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              </div>
            )}
          </div>
        )}

        {/* Quiz Content - Using flex with flex-grow to push bottom content down */}
        <div className="px-6 pb-6 pt-2 flex flex-col flex-grow">
          {/* Top section that can grow/shrink */}
          <div className="flex-grow">
            <h3 className={`text-xl font-bold ${colors.title} mb-2 text-center`}>
              {config.title}
            </h3>
            <p className="text-gray-600 mb-4 text-center">
              {config.description}
            </p>

            {/* Study Guide Button */}
            {config.studyGuide && config.studyGuide.trim() !== "" && (
              <div className="mb-6 flex justify-center">
                <button
                  onClick={handleStudyGuideClick}
                  className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium ${colors.studyGuideText} ${colors.studyGuideHover} rounded-lg transition-colors`}
                >
                  {studyGuideButton.icon}
                  {studyGuideButton.text}
                </button>
              </div>
            )}
          </div>

          {/* Bottom section that stays at the bottom */}
          <div className="mt-auto">
            <div className="mb-6">
              <HighScoresList
                scores={stats.highScores}
                onReset={handleReset}
                title="Local Top Scores"
                headerBackground={false}
                quizConfig={config}
              />
            </div>

            <button
              onClick={onStart}
              className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 ${colors.button} ${colors.buttonHover} text-white rounded-lg transition-colors font-semibold`}
            >
              <Play size={20} />
              Start Quiz
            </button>
          </div>
        </div>
      </div>

      {/* Study Guide Modal - Only shown for local images */}
      {showStudyGuide && studyGuideType === 'image' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className={`p-4 border-b border-gray-200 flex justify-between items-center ${colors.modalHeader}`}>
              <h3 className={`text-lg font-semibold ${colors.modalTitle}`}>Study Guide</h3>
              <button
                onClick={() => setShowStudyGuide(false)}
                className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-4 overflow-auto">
              {config.studyGuide && (
                <img
                  src={config.studyGuide}
                  alt="Study Guide"
                  className="max-w-full h-auto mx-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
                    target.className = 'w-16 h-16 mx-auto text-gray-400';
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
