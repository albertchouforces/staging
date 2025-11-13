export interface Quiz {
  quizID: string;
  quizName: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  question: string;
  answer: string;
  image?: string;
}

export const quizzes: Quiz[] = [
  {
    quizID: "world-capitals",
    quizName: "World Capitals",
    questions: [
      { 
        question: "What is the capital of France?", 
        answer: "Paris",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop"
      },
      { question: "What is the capital of Japan?", answer: "Tokyo" },
      { question: "What is the capital of Brazil?", answer: "Brasília" },
      { question: "What is the capital of Australia?", answer: "Canberra" },
      { question: "What is the capital of Egypt?", answer: "Cairo" },
      { question: "What is the capital of Canada?", answer: "Ottawa" },
      { question: "What is the capital of India?", answer: "New Delhi" },
      { question: "What is the capital of Germany?", answer: "Berlin" },
    ],
  },
  {
    quizID: "science-facts",
    quizName: "Science Facts",
    questions: [
      { question: "What is the chemical symbol for gold?", answer: "Au" },
      { question: "What planet is known as the Red Planet?", answer: "Mars" },
      { question: "What is the speed of light in vacuum?", answer: "299,792,458 m/s" },
      { question: "What is the largest organ in the human body?", answer: "Skin" },
      { question: "What gas do plants absorb from the atmosphere?", answer: "Carbon dioxide" },
      { question: "What is the powerhouse of the cell?", answer: "Mitochondria" },
    ],
  },
  {
    quizID: "buoys",
    quizName: "Buoys and Channel Markers",
    questions: [
      {
        question: "What does this indicate?",
        answer: "Safe Water",
        image: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Safe%20Water.png"
      },
      {
        question: "What does this indicate?",
        answer: "Isolated Danger",
        image: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Isolated%20Danger.png"
      },
      {
        question: "What does this indicate?",
        answer: "New Danger",
        image: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/New%20Danger.png"
      },
      {
        question: "What does this indicate?",
        answer: "Port",
        image: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Port.png"
      },
      {
        question: "What does this indicate?",
        answer: "Starboard",
        image: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Starboard.png"
      },
      {
        question: "What does this indicate?",
        answer: "North",
        image: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/North.png"
      },
      {
        question: "What does this indicate?",
        answer: "East",
        image: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/East.png"
      },
      {
        question: "What does this indicate?",
        answer: "South",
        image: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/South.png"
      },
      {
        question: "What does this indicate?",
        answer: "West",
        image: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/West.png"
      },
      {
        question: "What does this indicate?",
        answer: "Do Not Pass",
        image: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Do%20Not%20Pass.png"
      },
    ],
  },
];
