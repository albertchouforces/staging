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
    setImageError(true);
    setImageLoaded(true);
  }, []);

  // Reset image state when config changes
  useEffect(() => {
    setImageError(false);
    setImageLoaded(false);
  }, [config.startScreenImage]);

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
                  onLoad={() => setImageLoaded(true)}
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
            <h3 className={`text-xl font-bold text-${config.themeColor}-600 mb-2 text-center`}>
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
                  className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-${config.themeColor}-600 hover:bg-${config.themeColor}-50 rounded-lg transition-colors`}
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
              className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-${config.themeColor}-600 hover:bg-${config.themeColor}-700 text-white rounded-lg transition-colors font-semibold`}
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
            <div className={`p-4 border-b border-gray-200 flex justify-between items-center bg-${config.themeColor}-50`}>
              <h3 className={`text-lg font-semibold text-${config.themeColor}-600`}>Study Guide</h3>
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
