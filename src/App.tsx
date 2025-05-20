import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import QuizSelection from './components/QuizSelection';
import QuizPage from './pages/QuizPage';
import { quizSets } from './data/quizData';

export function App() {
  useEffect(() => {
    // Load fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Inter, sans-serif' }}>
        <Routes>
          <Route path="/" element={<QuizSelection quizSets={quizSets} />} />
          <Route path="/quiz/:quizId" element={<QuizPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
