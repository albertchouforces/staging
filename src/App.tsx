import { useState, useEffect } from 'react';
import { HomePage } from './pages/HomePage';
import { QuizPage } from './pages/QuizPage';
import './index.css';

export function App() {
  const [activeQuizID, setActiveQuizID] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleStartQuiz = (quizID: string) => {
    setActiveQuizID(quizID);
  };

  const handleReturnHome = () => {
    setActiveQuizID(null);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0" style={{ fontFamily: 'Inter, sans-serif' }}>
        <div className="relative size-full">
          <div className="absolute inset-0 bg-white flex size-full flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="relative flex items-center justify-center w-10 h-10 bg-white border rounded-full">
              <div className="absolute h-10 w-10 rounded-full animate-spin bg-gradient-to-b from-navy-500 to-transparent"></div>
              <div className="absolute flex items-center justify-center bg-white rounded-full h-[38px] w-[38px]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 6V8M12 16V18M8 12H6M18 12H16M16.95 7.05L15.536 8.464M7.05 7.05L8.464 8.464M7.05 16.95L8.464 15.536M16.95 16.95L15.536 15.536M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="text-navy-800 font-medium">Loading Quiz Master...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Inter, sans-serif' }}>
      <header className="bg-navy-700 text-white py-4">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-xl font-bold">Quiz Master</h1>
        </div>
      </header>
      
      <main className="py-8">
        {activeQuizID ? (
          <QuizPage quizID={activeQuizID} onHome={handleReturnHome} />
        ) : (
          <HomePage onStartQuiz={handleStartQuiz} />
        )}
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-4 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center text-navy-600 text-sm">
          &copy; {new Date().getFullYear()} Quiz Master - Test Your Knowledge
        </div>
      </footer>
    </div>
  );
}

export default App;
