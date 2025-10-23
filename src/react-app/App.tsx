import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/react-app/pages/HomePage';
import { KnotDetailPage } from '@/react-app/pages/KnotDetailPage';
import { ScenariosPage } from '@/react-app/pages/ScenariosPage';
import { useEffect, useState } from 'react';
import '@/react-app/index.css';

export function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    // Simulate loading to ensure all animations work smoothly
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => {
      clearTimeout(timeout);
      document.head.removeChild(link);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading Naval Knots...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/knot/:id" element={<KnotDetailPage />} />
          <Route path="/scenarios" element={<ScenariosPage />} />
        </Routes>
        <footer className="mt-12 py-6 border-t border-gray-200">
          <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
            <p>Naval Knots - Master essential naval knots with interactive tutorials</p>
            <p className="mt-3 pt-3 border-t border-gray-100">Product of the NTG HQ Learning Support Centre. For more information please contact the Learning Support Centre Product Development Lead (Pacific) at <a href="mailto:joshua.hawthorne@ecn.forces.gc.ca" className="text-blue-500 hover:underline">joshua.hawthorne@ecn.forces.gc.ca</a></p>
          </div>
        </footer>
      </Router>
    </div>
  );
}

export default App;
