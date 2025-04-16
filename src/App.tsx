import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { KnotDetailPage } from './pages/KnotDetailPage';
import { useEffect } from 'react';
import './index.css';

export function App() {
  useEffect(() => {
    // Load fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/knot/:id" element={<KnotDetailPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
