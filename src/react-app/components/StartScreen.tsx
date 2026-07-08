import { useEffect, useState } from 'react';
import { Globe, List, House, Layers3, Search, FolderOpen, X, ChevronDown } from 'lucide-react';
import type { QuizStats } from '@/react-app/types';
import { QuizCard } from '@/react-app/components/QuizCard';
import { GlobalLeaderboard } from '@/react-app/components/GlobalLeaderboard';
import { Footer } from '@/react-app/components/Footer';
import { ENABLE_GLOBAL_LEADERBOARD } from '@/react-app/config/features';
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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'quizzes' | 'resources'>('quizzes');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
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
  const sidebarStartIcon = visibleQuizzes.find(quiz => !!quiz.config.startScreenImage)?.config.startScreenImage || '/images/naval-operations-branch-600.png';
  const normalizedSearch = searchQuery.trim().toLowerCase();
  const filteredQuizzes = visibleQuizzes.filter((quiz) => {
    const category = quiz.config.category || (quiz.config.advancedChallenge ? 'Advanced Challenges' : null);
    const matchesCategory = activeCategory === 'all' || category === activeCategory;
    const matchesSearch = normalizedSearch === '' || `${quiz.config.title} ${quiz.config.description} ${category || ''}`
      .toLowerCase()
      .includes(normalizedSearch);

    return matchesCategory && matchesSearch;
  });
  const anyFilteredQuizHasLeaderboard = filteredQuizzes.some(quiz => !quiz.config.disableLeaderboards);
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
  
  filteredQuizzes.forEach(quiz => {
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

  const sidebarCategoryCounts = new Map<string, number>();
  visibleQuizzes.forEach((quiz) => {
    const category = quiz.config.category || (quiz.config.advancedChallenge ? 'Advanced Challenges' : null);
    if (!category) return;
    sidebarCategoryCounts.set(category, (sidebarCategoryCounts.get(category) || 0) + 1);
  });

  const orderedSidebarCategories = [
    ...CATEGORY_ORDER.filter(category => sidebarCategoryCounts.has(category)),
    ...Array.from(sidebarCategoryCounts.keys())
      .filter(category => !CATEGORY_ORDER.includes(category))
      .sort()
  ];

  const getSidebarItemClasses = (isActive: boolean): string => {
    if (isActive) {
      return 'w-full flex items-start gap-2.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-white bg-white/15 border-l-2 border-[#f2c94c]';
    }

    return 'w-full flex items-start gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 hover:bg-white/10 transition-colors';
  };

  const getCollapsedSidebarItemClasses = (isActive: boolean): string => {
    if (isActive) {
      return 'h-9 w-9 flex items-center justify-center rounded-lg border border-[#f2c94c]/70 bg-white/15 text-white';
    }

    return 'h-9 w-9 flex items-center justify-center rounded-lg text-slate-100 hover:bg-white/10 transition-colors';
  };

  return (
    <div className="h-full w-full">
      {mobileSidebarOpen && (
        <div className="fixed top-[60px] bottom-0 left-0 right-0 z-40 lg:hidden pointer-events-none">
          <button
            type="button"
            className="absolute inset-0 bg-black/50 pointer-events-auto"
            onClick={() => setMobileSidebarOpen(false)}
            aria-label="Close menu"
          />
          <aside
            className="animate-slide-in-left relative z-10 flex h-full w-[260px] flex-col bg-[#082a5e] bg-cover bg-center bg-no-repeat text-white shadow-2xl pointer-events-auto"
            style={{ backgroundImage: "url('/images/sidebar.png')" }}
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-4">
              <p className="text-xs font-semibold tracking-wider text-[#f2c94c]">CATEGORIES</p>
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-md text-slate-100 hover:bg-white/10"
                aria-label="Close sidebar"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1 px-4 py-4">
              <nav className="space-y-1.5">
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setActiveTab('quizzes');
                    setMobileSidebarOpen(false);
                  }}
                  className={getSidebarItemClasses(activeTab === 'quizzes' && activeCategory === 'all')}
                >
                  <House size={14} />
                  <span>All Quizzes</span>
                </button>

                {orderedSidebarCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setActiveCategory(category);
                      setActiveTab('quizzes');
                      setMobileSidebarOpen(false);
                    }}
                    className={getSidebarItemClasses(activeTab === 'quizzes' && activeCategory === category)}
                  >
                    <Layers3 size={14} />
                    <span className="flex-1 whitespace-normal break-words text-left leading-snug">{category}</span>
                  </button>
                ))}

                <button
                  onClick={() => {
                    setActiveTab('resources');
                    setMobileSidebarOpen(false);
                  }}
                  className={getSidebarItemClasses(activeTab === 'resources')}
                >
                  <FolderOpen size={14} />
                  <span>Resources</span>
                </button>
              </nav>
            </div>

            {ENABLE_GLOBAL_LEADERBOARD && (
              <div className="shrink-0 px-4 pb-4">
                <div className="mb-3 border-t border-white/20" />
                <button
                  onClick={() => {
                    setShowGlobalLeaderboard(true);
                    setMobileSidebarOpen(false);
                  }}
                  className="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 transition-colors hover:bg-white/10"
                >
                  <Globe size={14} />
                  View Global Leaderboard
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      <div className={`grid h-full grid-cols-1 ${isSidebarCollapsed ? 'lg:grid-cols-[64px_1fr]' : 'lg:grid-cols-[240px_1fr]'}`}>
        <aside
          className="hidden lg:flex flex-col overflow-y-auto bg-[#082a5e] bg-cover bg-center bg-no-repeat text-white"
          style={{ backgroundImage: "url('/images/sidebar.png')" }}
        >
          {isSidebarCollapsed ? (
            <div className="flex h-full flex-col items-center py-3">
              <img
                src={sidebarStartIcon}
                alt="Quiz start icon"
                className="h-10 w-10 object-contain"
              />

              <div className="my-3 h-px w-10 bg-white/20" />

              <nav className="flex flex-col items-center gap-2">
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setActiveTab('quizzes');
                  }}
                  className={getCollapsedSidebarItemClasses(activeTab === 'quizzes' && activeCategory === 'all')}
                  title="All Quizzes"
                >
                  <House size={15} />
                </button>

                {orderedSidebarCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setActiveCategory(category);
                      setActiveTab('quizzes');
                    }}
                    className={getCollapsedSidebarItemClasses(activeTab === 'quizzes' && activeCategory === category)}
                    title={category}
                  >
                    <Layers3 size={15} />
                  </button>
                ))}

                <button
                  onClick={() => setActiveTab('resources')}
                  className={getCollapsedSidebarItemClasses(activeTab === 'resources')}
                  title="Resources"
                >
                  <FolderOpen size={15} />
                </button>
              </nav>

              {ENABLE_GLOBAL_LEADERBOARD && (
                <button
                  onClick={() => setShowGlobalLeaderboard(true)}
                  className="mt-auto h-9 w-9 flex items-center justify-center rounded-lg text-slate-100 hover:bg-white/10 transition-colors"
                  title="View Global Leaderboard"
                >
                  <Globe size={15} />
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="border-b border-white/10 px-6 py-8">
                <img
                  src={sidebarStartIcon}
                  alt="Quiz start icon"
                  className="mx-auto mb-4 h-20 w-20 object-contain"
                />
                <h2 className="text-center text-lg font-semibold">NWO Quiz Collection</h2>
              </div>

              <div className="px-4 py-6">
                <p className="mb-3 px-2 text-xs font-semibold tracking-wider text-[#f2c94c]">CATEGORIES</p>
                <nav className="space-y-1.5">
                  <button
                    onClick={() => {
                      setActiveCategory('all');
                      setActiveTab('quizzes');
                    }}
                    className={getSidebarItemClasses(activeTab === 'quizzes' && activeCategory === 'all')}
                  >
                    <House size={14} />
                    <span>All Quizzes</span>
                  </button>

                  {orderedSidebarCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setActiveCategory(category);
                        setActiveTab('quizzes');
                      }}
                      className={getSidebarItemClasses(activeTab === 'quizzes' && activeCategory === category)}
                    >
                      <Layers3 size={14} />
                      <span className="flex-1 whitespace-normal break-words text-left leading-snug">{category}</span>
                    </button>
                  ))}

                  <button
                    onClick={() => setActiveTab('resources')}
                    className={getSidebarItemClasses(activeTab === 'resources')}
                  >
                    <FolderOpen size={14} />
                    <span>Resources</span>
                  </button>
                </nav>
              </div>

              {ENABLE_GLOBAL_LEADERBOARD && (
                <div className="px-4 pb-4">
                  <div className="mb-3 border-t border-white/20" />
                  <p className="mb-2 px-2 text-[11px] font-semibold tracking-wider text-[#f2c94c]">LEADERBOARD</p>
                  <button
                    onClick={() => setShowGlobalLeaderboard(true)}
                    className="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 transition-colors hover:bg-white/10"
                  >
                    <Globe size={14} />
                    View Global Leaderboard
                  </button>
                </div>
              )}

              <div className="mt-auto px-4 pb-5">
                <div className="mb-4 border-t border-[#f2c94c]/70" />
                <Footer
                  className="py-0 text-left text-xs leading-relaxed text-slate-200"
                  linkClassName="text-[#f2c94c] hover:text-[#ffe28a] hover:underline transition-colors"
                />
              </div>
            </>
          )}
        </aside>

        <div className="overflow-y-auto bg-[#f7f8fb] px-4 py-4 pb-24 md:px-8 lg:px-10 lg:pb-6">
          <header className="-mx-4 -mt-4 mb-4 bg-gradient-to-r from-[#00193f] to-[#032b67] px-5 py-4 text-white shadow-sm lg:hidden relative z-50">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(prev => !prev)}
                className="flex h-9 w-9 items-center justify-center rounded-md text-white/90 hover:bg-white/10"
                aria-label="Open sidebar"
              >
                <List size={22} />
              </button>
              <div className="flex items-center gap-2">
                <img src={sidebarStartIcon} alt="Quiz start icon" className="h-10 w-10 object-contain" />
                <span className="text-2xl font-semibold tracking-tight">NWO Quiz Collection</span>
              </div>
            </div>
          </header>

          {activeTab === 'quizzes' && (
            <div className="mb-4 lg:hidden">
              <div className="relative">
                <Search size={24} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search quizzes..."
                  className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-14 pr-4 text-lg text-gray-800 shadow-sm outline-none transition-colors focus:border-[#1a365d]/60"
                />
              </div>
            </div>
          )}

          <header className="mb-5 hidden border border-gray-200 bg-white px-3 py-3 shadow-sm lg:block">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setIsSidebarCollapsed(prev => !prev)}
                className="hidden h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white text-[#1a365d] shadow-sm lg:flex"
                aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                aria-expanded={!isSidebarCollapsed}
              >
                <List size={14} />
              </button>

              <div className="relative min-w-[220px] flex-1 max-w-2xl">
                {activeTab === 'quizzes' ? (
                  <>
                    <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="Search quizzes..."
                      className="w-full rounded-md border border-gray-200 bg-white py-2 pl-9 pr-3 text-xs text-gray-800 outline-none transition-colors focus:border-[#1a365d]/60"
                    />
                  </>
                ) : null}
              </div>

              <nav className="ml-auto flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setActiveTab('quizzes');
                  }}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                    activeTab === 'quizzes'
                      ? 'bg-[#1a365d] text-white'
                      : 'text-[#1a365d] hover:bg-[#1a365d]/10'
                  }`}
                >
                  Quizzes
                </button>
                <button
                  onClick={() => setActiveTab('resources')}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
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
            <div className="mb-12 rounded-xl border border-gray-200 bg-white p-6 shadow-lg md:p-8">
              <div className="mb-6 border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-bold tracking-tight text-[#1a365d]">Resources</h2>
                <p className="mt-1 text-sm text-gray-600">Reference links and training videos</p>
              </div>
              {RESOURCE_SECTIONS.length > 0 ? (
                <div className="space-y-6">
                  {RESOURCE_SECTIONS.map(section => (
                    <section key={section.id} className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 md:p-5">
                      <h3 className="mb-3 text-base font-semibold tracking-wide text-[#1a365d]">{section.heading}</h3>
                      {section.items.length > 0 ? (
                        <div className="space-y-2.5">
                          {section.items.map(resource => (
                            <div
                              key={resource.id}
                              className="rounded-lg border border-gray-200 bg-white px-4 py-3 transition-colors hover:border-[#1a365d]/50 hover:bg-[#1a365d]/5"
                            >
                              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                <div className="min-w-0">
                                  <p className="leading-snug font-medium text-gray-900">{resource.title}</p>
                                  {resource.description && <p className="text-sm text-gray-600">{resource.description}</p>}
                                </div>
                                {resource.type === 'video' ? (
                                  <button
                                    onClick={() => handleOpenVideo(resource)}
                                    className="inline-flex shrink-0 items-center justify-center rounded-lg bg-[#1a365d] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#244a7d]"
                                  >
                                    Watch Video
                                  </button>
                                ) : (
                                  <a
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex shrink-0 items-center justify-center rounded-lg border border-[#1a365d] px-4 py-2 text-sm font-semibold text-[#1a365d] transition-colors hover:bg-[#1a365d]/10"
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
              {orderedCategories.length === 0 ? (
                <div className="rounded-xl border border-gray-200 bg-white p-8 text-gray-600 shadow-sm">
                  No quizzes match the current search and category filters.
                </div>
              ) : (
                orderedCategories.map((category, index) => {
                  const categoryQuizzes = groupedQuizzes.get(category) || [];
                  if (categoryQuizzes.length === 0) return null;

                  const categoryKey = category || 'uncategorized';
                  const canCollapse = activeCategory === 'all' && category !== null;
                  const isCollapsed = canCollapse && collapsedCategories.has(categoryKey);

                  return (
                    <div key={categoryKey}>
                      {category && (
                        <div className="mb-6 flex items-center gap-4">
                          <div className="h-px flex-1 bg-gray-200" />
                          {canCollapse ? (
                            <button
                              onClick={() => toggleCategory(categoryKey)}
                              className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-blue-300 hover:bg-blue-50/40 hover:text-blue-700"
                            >
                              <span>{category}</span>
                              <ChevronDown
                                size={18}
                                className={`transition-transform duration-200 ${isCollapsed ? '-rotate-90' : ''}`}
                              />
                            </button>
                          ) : (
                            <div className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                              {category}
                            </div>
                          )}
                          <div className="h-px flex-1 bg-gray-200" />
                        </div>
                      )}

                      {!isCollapsed && (
                        <div className="mb-12 flex justify-center">
                          <div
                            className="mx-auto grid w-full grid-cols-1 auto-rows-fr gap-4 sm:gap-6 lg:justify-center lg:justify-items-center lg:[grid-template-columns:repeat(auto-fit,minmax(320px,320px))]"
                          >
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

                      {ENABLE_GLOBAL_LEADERBOARD && anyFilteredQuizHasLeaderboard && category === null && index === 0 && (
                        <div className="mb-12 flex justify-center">
                          <button
                            onClick={() => setShowGlobalLeaderboard(true)}
                            className="flex items-center justify-center gap-2 rounded-lg border border-yellow-700 bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105 hover:from-yellow-700 hover:via-amber-600 hover:to-yellow-700 hover:shadow-xl"
                          >
                            <Globe size={20} className="drop-shadow" />
                            View Global Leaderboard
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })
              )}

              {ENABLE_GLOBAL_LEADERBOARD && anyFilteredQuizHasLeaderboard && !groupedQuizzes.has(null) && filteredQuizzes.length > 0 && (
                <div className="mb-12 flex justify-center">
                  <button
                    onClick={() => setShowGlobalLeaderboard(true)}
                    className="flex items-center justify-center gap-2 rounded-lg border border-yellow-700 bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105 hover:from-yellow-700 hover:via-amber-600 hover:to-yellow-700 hover:shadow-xl"
                  >
                    <Globe size={20} className="drop-shadow" />
                    View Global Leaderboard
                  </button>
                </div>
              )}
            </>
          )}

          <Footer
            className="lg:hidden pb-0 text-center text-xs text-gray-500"
            linkClassName="text-[#1a365d] hover:text-[#244a7d] hover:underline transition-colors"
          />
        </div>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-gray-200 bg-white/95 px-4 py-3 shadow-[0_-4px_14px_rgba(0,0,0,0.08)] backdrop-blur lg:hidden">
        <div className="mx-auto grid max-w-xl grid-cols-2 gap-3">
          <button
            onClick={() => {
              setActiveCategory('all');
              setActiveTab('quizzes');
            }}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-base font-semibold transition-colors ${
              activeTab === 'quizzes'
                ? 'bg-[#001f56] text-white'
                : 'border border-gray-200 bg-white text-[#1a365d]'
            }`}
          >
            <List size={18} />
            Quizzes
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-base font-semibold transition-colors ${
              activeTab === 'resources'
                ? 'bg-[#001f56] text-white'
                : 'border border-gray-200 bg-white text-[#1a365d]'
            }`}
          >
            <FolderOpen size={18} />
            Resources
          </button>
        </div>
      </nav>

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
