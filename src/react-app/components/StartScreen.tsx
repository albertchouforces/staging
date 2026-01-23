import { useState } from 'react';
import { Globe, NotebookText, ChevronDown } from 'lucide-react';
import type { QuizStats } from '@/react-app/types';
import { QuizCard } from '@/react-app/components/QuizCard';
import { GlobalLeaderboard } from '@/react-app/components/GlobalLeaderboard';
import { ENABLE_GLOBAL_LEADERBOARD, COLLAPSIBLE_CATEGORIES } from '@/react-app/config/features';
import { QUIZ_COLLECTION, CATEGORY_ORDER } from '@/react-app/data/quizData';

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
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <NotebookText className="text-blue-600" size={32} />
          <h1 className="text-4xl font-bold text-gray-800">
            NWO Quiz Collection
          </h1>
        </div>
        <h2 className="text-xl text-gray-600">
          Choose a quiz to test your knowledge
        </h2>
      </div>

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

      {/* Global Leaderboard Modal */}
      {showGlobalLeaderboard && (
        <GlobalLeaderboard 
          onClose={() => setShowGlobalLeaderboard(false)}
          quizzes={visibleQuizzes}
        />
      )}
    </div>
  );
}
