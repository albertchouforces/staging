import { BrowserRouter as Router, Routes, Route } from "react-router";
import { useLocation } from "react-router";
import HomePage from "@/react-app/pages/Home";
import QuizPage from "@/react-app/pages/QuizPage";

function QuizRoute() {
  const location = useLocation();
  const quiz = location.state?.quiz;
  
  if (!quiz) {
    return <HomePage />;
  }
  
  return <QuizPage quiz={quiz} />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizRoute />} />
      </Routes>
    </Router>
  );
}
