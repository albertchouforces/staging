import { useEffect, useState } from 'react';
import { Globe, NotebookText, ChevronDown } from 'lucide-react';
import type { QuizStats } from '@/react-app/types';
import { QuizCard } from '@/react-app/components/QuizCard';
import { GlobalLeaderboard } from '@/react-app/components/GlobalLeaderboard';
import { ENABLE_GLOBAL_LEADERBOARD, COLLAPSIBLE_CATEGORIES } from '@/react-app/config/features';
import { QUIZ_COLLECTION, CATEGORY_ORDER } from '@/react-app/data/quizData';
import { RESOURCE_SECTIONS, type ResourceItem } from '@/react-app/data/resourcesData';

interface StartScreenProps {
  onSelectQuiz: (quizId: string) => void;
  getStatsForQuiz: (quizName: string) => QuizStats;
  onResetScores: (quizName: string) => void;
}

export function StartScreen({ 
  onSelectQuiz,
  getStatsForQuiz,
  onResetScores
}: StartScreenProps) {
  const [showGlobalLeaderboard, setShowGlobalLeaderboard] = useState(false);
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'quizzes' | 'resources'>('quizzes');
  const [pendingVideo, setPendingVideo] = useState<{ title: string; embedUrl: string; fallbackUrl: string } | null>(null);
  const [activeVideo, setActiveVideo] = useState<{ title: string; embedUrl: string; fallbackUrl: string } | null>(null);

  const toggleCategory = (category: string) => {
    setCollapsedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const handleResetScores = (quizKey: string) => {
    onResetScores(quizKey);
    // Add reload as fallback
    window.location.reload();
  };

  // Filter out hidden quizzes
  const visibleQuizzes = QUIZ_COLLECTION.filter(quiz => !quiz.config.hidden);
  const getVimeoEmbedUrl = (url: string): string | null => {
    const trimmedUrl = url.trim();

    if (trimmedUrl.includes('player.vimeo.com/video/')) {
      return trimmedUrl;
    }

    const match = trimmedUrl.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
    if (!match) {
      return null;
    }

    return `https://player.vimeo.com/video/${match[1]}`;
  };

  const getVideoEmbedUrl = (resource: ResourceItem): string | null => {
    if (resource.embedUrl && resource.embedUrl.trim() !== '') {
      return resource.embedUrl.trim();
    }

    return getVimeoEmbedUrl(resource.url);
  };

  const handleOpenVideo = (resource: ResourceItem) => {
    const embedUrl = getVideoEmbedUrl(resource);
    if (embedUrl) {
      setPendingVideo({ title: resource.title, embedUrl, fallbackUrl: resource.url });
      return;
    }

    window.open(resource.url, '_blank', 'noopener,noreferrer');
  };

  const openVideoFallback = (url: string, closeModal: boolean = true) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    setPendingVideo(null);
    if (closeModal) {
      setActiveVideo(null);
    }
  };

  useEffect(() => {
    if (!pendingVideo) return;

    let resolved = false;

    const fallbackTimer = window.setTimeout(() => {
      if (!resolved) {
        resolved = true;
        openVideoFallback(pendingVideo.fallbackUrl, false);
      }
    }, 2500);

    const handleVimeoMessage = (event: MessageEvent) => {
      if (!event.origin.includes('vimeo.com')) return;

      let payload: { event?: string } = {};
      if (typeof event.data === 'string') {
        try {
          payload = JSON.parse(event.data) as { event?: string };
        } catch {
          payload = {};
        }
      } else if (typeof event.data === 'object' && event.data !== null) {
        payload = event.data as { event?: string };
      }

      if (payload?.event === 'ready') {
        if (resolved) return;
        resolved = true;
        window.clearTimeout(fallbackTimer);
        setActiveVideo(pendingVideo);
        setPendingVideo(null);
      }

      if (payload?.event === 'error') {
        if (resolved) return;
        resolved = true;
        window.clearTimeout(fallbackTimer);
        openVideoFallback(pendingVideo.fallbackUrl, false);
      }
    };

    window.addEventListener('message', handleVimeoMessage);
    return () => {
      window.clearTimeout(fallbackTimer);
      window.removeEventListener('message', handleVimeoMessage);
    };
  }, [pendingVideo]);
  
  // Group quizzes by category
  const groupedQuizzes = new Map<string | null, typeof visibleQuizzes>();
  
  visibleQuizzes.forEach(quiz => {
    // Use category field, or fall back to advancedChallenge for backward compatibility
    const category = quiz.config.category || (quiz.config.advancedChallenge ? 'Advanced Challenges' : null);
    
    if (!groupedQuizzes.has(category)) {
      groupedQuizzes.set(category, []);
    }
    groupedQuizzes.get(category)!.push(quiz);
  });
  
  // Determine category display order
  const allCategories = Array.from(groupedQuizzes.keys()).filter(cat => cat !== null) as string[];
  const orderedCategories: (string | null)[] = [];
  
  // First add uncategorized quizzes (null category)
  if (groupedQuizzes.has(null)) {
    orderedCategories.push(null);
  }
  
  // Then add categories in the specified order
  CATEGORY_ORDER.forEach(cat => {
    if (allCategories.includes(cat)) {
      orderedCategories.push(cat);
    }
  });
  
  // Finally add any remaining categories alphabetically
  const remainingCategories = allCategories
    .filter(cat => !CATEGORY_ORDER.includes(cat))
    .sort();
  orderedCategories.push(...remainingCategories);

  // Get grid columns based on number of items
  const getGridColumns = (count: number): string => {
    switch (count) {
      case 0:
        return '';
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  // Get grid width based on number of items
  const getGridWidth = (count: number): string => {
    switch (count) {
      case 0:
        return '';
      case 1:
        return 'max-w-md';
      case 2:
        return 'max-w-3xl';
      default:
        return 'max-w-6xl';
    }
  };

  return (
    <div className="max-w-6xl w-full mx-auto px-4">
      <header className="mb-8 border-b border-[#1a365d]/20 pb-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#1a365d]/10 rounded-xl border border-[#1a365d]">
              <NotebookText className="text-[#1a365d]" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#1a365d] tracking-tight text-left">
                NWO Quiz Collection
              </h1>
              <p className="text-sm text-gray-600">
                {activeTab === 'quizzes' ? 'Choose a quiz to test your knowledge' : 'Training and reference materials'}
              </p>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('quizzes')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                activeTab === 'quizzes'
                  ? 'bg-[#1a365d] text-white'
                  : 'text-[#1a365d] hover:bg-[#1a365d]/10'
              }`}
            >
              Quizzes
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                activeTab === 'resources'
                  ? 'bg-[#1a365d] text-white'
                  : 'text-[#1a365d] hover:bg-[#1a365d]/10'
              }`}
            >
              Resources
            </button>
          </nav>
        </div>
      </header>

      {activeTab === 'resources' ? (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8 mb-12">
          <div className="mb-6 pb-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-[#1a365d] tracking-tight">Resources</h2>
            <p className="text-sm text-gray-600 mt-1">Reference links and training videos</p>
          </div>
          {RESOURCE_SECTIONS.length > 0 ? (
            <div className="space-y-6">
              {RESOURCE_SECTIONS.map(section => (
                <section key={section.id} className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 md:p-5">
                  <h3 className="text-base font-semibold text-[#1a365d] mb-3 tracking-wide">{section.heading}</h3>
                  {section.items.length > 0 ? (
                    <div className="space-y-2.5">
                      {section.items.map(resource => (
                        <div
                          key={resource.id}
                          className="rounded-lg border border-gray-200 bg-white px-4 py-3 hover:border-[#1a365d]/50 hover:bg-[#1a365d]/5 transition-colors"
                        >
                          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div className="min-w-0">
                              <p className="font-medium text-gray-900 leading-snug">{resource.title}</p>
                              {resource.description && <p className="text-sm text-gray-600">{resource.description}</p>}
                            </div>
                            {resource.type === 'video' ? (
                              <button
                                onClick={() => handleOpenVideo(resource)}
                                className="inline-flex shrink-0 items-center justify-center rounded-lg bg-[#1a365d] text-white px-4 py-2 text-sm font-semibold hover:bg-[#244a7d] transition-colors"
                              >
                                Watch Video
                              </button>
                            ) : (
                              <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex shrink-0 items-center justify-center rounded-lg border border-[#1a365d] text-[#1a365d] px-4 py-2 text-sm font-semibold hover:bg-[#1a365d]/10 transition-colors"
                              >
                                Open Link
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">No resources are configured in this section yet.</p>
                  )}
                </section>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No resources are configured yet.</p>
          )}
        </div>
      ) : (
        <>
          {/* Quiz Sections by Category */}
          {orderedCategories.map((category, index) => {
            const categoryQuizzes = groupedQuizzes.get(category) || [];
            if (categoryQuizzes.length === 0) return null;
            
            const categoryKey = category || 'uncategorized';
            const isCollapsed = COLLAPSIBLE_CATEGORIES && category && collapsedCategories.has(categoryKey);
            
            return (
              <div key={categoryKey}>
                {/* Category Header - only show for categorized sections */}
                {category && (
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex-1 h-px bg-gray-200" />
                    {COLLAPSIBLE_CATEGORIES ? (
                      <button
                        onClick={() => toggleCategory(categoryKey)}
                        className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 border border-gray-300 hover:border-blue-400 rounded-lg text-gray-700 hover:text-blue-700 font-semibold transition-all shadow-sm hover:shadow-md"
                      >
                        <span>{category}</span>
                        <ChevronDown 
                          size={22} 
                          className={`transition-transform duration-200 ${isCollapsed ? '-rotate-90' : ''}`}
                        />
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 text-gray-600 font-semibold">
                        {category}
                      </div>
                    )}
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                )}

                {/* Quiz Grid */}
                {!isCollapsed && (
                  <div className="flex justify-center mb-12">
                    <div className={`grid ${getGridColumns(categoryQuizzes.length)} gap-8 w-full ${getGridWidth(categoryQuizzes.length)} mx-auto grid-flow-row auto-rows-fr`}>
                      {categoryQuizzes.map((quiz) => (
                        <QuizCard
                          key={quiz.config.id}
                          config={quiz.config}
                          stats={getStatsForQuiz(quiz.config.quizKey)}
                          onStart={() => onSelectQuiz(quiz.config.id)}
                          onResetScores={() => handleResetScores(quiz.config.quizKey)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Global Leaderboard Button - show after uncategorized section */}
                {ENABLE_GLOBAL_LEADERBOARD && category === null && index === 0 && (
                  <div className="flex justify-center mb-12">
                    <button
                      onClick={() => setShowGlobalLeaderboard(true)}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 hover:from-yellow-700 hover:via-amber-600 hover:to-yellow-700 text-white rounded-lg transition-all font-bold shadow-lg hover:shadow-xl hover:scale-105 border border-yellow-700"
                    >
                      <Globe size={20} className="drop-shadow" />
                      View Global Leaderboard
                    </button>
                  </div>
                )}
              </div>
            );
          })}
          
          {/* Global Leaderboard Button - fallback if no uncategorized section */}
          {ENABLE_GLOBAL_LEADERBOARD && !groupedQuizzes.has(null) && visibleQuizzes.length > 0 && (
            <div className="flex justify-center mb-12">
              <button
                onClick={() => setShowGlobalLeaderboard(true)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 hover:from-yellow-700 hover:via-amber-600 hover:to-yellow-700 text-white rounded-lg transition-all font-bold shadow-lg hover:shadow-xl hover:scale-105 border border-yellow-700"
              >
                <Globe size={20} className="drop-shadow" />
                View Global Leaderboard
              </button>
            </div>
          )}
        </>
      )}

      {/* Global Leaderboard Modal */}
      {showGlobalLeaderboard && (
        <GlobalLeaderboard 
          onClose={() => setShowGlobalLeaderboard(false)}
          quizzes={visibleQuizzes.filter(quiz => !quiz.config.disableLeaderboards)}
        />
      )}

      {activeVideo && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-[#1a365d]">{activeVideo.title}</h3>
              <button
                onClick={() => setActiveVideo(null)}
                className="h-8 w-8 rounded-lg hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <div className="relative pt-[56.25%] w-full rounded-lg overflow-hidden bg-black">
                <iframe
                  src={activeVideo.embedUrl}
                  title={activeVideo.title}
                  className="absolute top-0 left-0 h-full w-full"
                  allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                  allowFullScreen
                  onError={() => openVideoFallback(activeVideo.fallbackUrl)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {pendingVideo && (
        <iframe
          src={pendingVideo.embedUrl}
          title={`${pendingVideo.title} probe`}
          className="hidden"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        />
      )}
    </div>
  );
}
