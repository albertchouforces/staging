import { QuizSet } from "../types/quiz";

export const quizSets: QuizSet[] = [
  {
    id: "general-knowledge",
    title: "General Knowledge",
    description: "Test your knowledge of various general facts",
    color: "#1e3a8a", // blue-900
    questions: [
      {
        id: "gk-1",
        text: "What is the capital of France?",
        correctAnswer: "Paris",
        imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "gk-2",
        text: "Which planet is known as the Red Planet?",
        correctAnswer: "Mars"
      },
      {
        id: "gk-3",
        text: "What is the largest ocean on Earth?",
        correctAnswer: "Pacific Ocean"
      },
      {
        id: "gk-4",
        text: "Who wrote the play 'Romeo and Juliet'?",
        correctAnswer: "William Shakespeare"
      },
      {
        id: "gk-5",
        text: "What is the chemical symbol for gold?",
        correctAnswer: "Au"
      },
      {
        id: "gk-6",
        text: "Which country is home to the Great Barrier Reef?",
        correctAnswer: "Australia"
      },
      {
        id: "gk-7",
        text: "What is the tallest mountain in the world?",
        correctAnswer: "Mount Everest"
      },
      {
        id: "gk-8",
        text: "How many sides does a hexagon have?",
        correctAnswer: "Six"
      }
    ]
  },
  {
    id: "science",
    title: "Science Quiz",
    description: "Challenge yourself with these science questions",
    color: "#1e3a8a", // blue-900
    questions: [
      {
        id: "sci-1",
        text: "What is the chemical formula for water?",
        correctAnswer: "H2O"
      },
      {
        id: "sci-2",
        text: "Which element has the symbol 'O'?",
        correctAnswer: "Oxygen"
      },
      {
        id: "sci-3",
        text: "What is the process by which plants make their food called?",
        correctAnswer: "Photosynthesis",
        imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "sci-4",
        text: "What force keeps objects in orbit around the Earth?",
        correctAnswer: "Gravity"
      },
      {
        id: "sci-5",
        text: "What is the smallest unit of matter?",
        correctAnswer: "Atom"
      },
      {
        id: "sci-6",
        text: "What is the study of fossils called?",
        correctAnswer: "Paleontology"
      },
      {
        id: "sci-7",
        text: "What is the main component of natural gas?",
        correctAnswer: "Methane"
      },
      {
        id: "sci-8",
        text: "Which planet has the most moons in our solar system?",
        correctAnswer: "Saturn"
      }
    ]
  },
  {
    id: "tech",
    title: "Technology",
    description: "Test your knowledge about modern technology",
    color: "#1e3a8a", // blue-900
    questions: [
      {
        id: "tech-1",
        text: "Who founded Microsoft?",
        correctAnswer: "Bill Gates"
      },
      {
        id: "tech-2",
        text: "What does 'HTTP' stand for?",
        correctAnswer: "Hypertext Transfer Protocol"
      },
      {
        id: "tech-3",
        text: "What programming language is named after a type of coffee?",
        correctAnswer: "Java"
      },
      {
        id: "tech-4",
        text: "What year was the first iPhone released?",
        correctAnswer: "2007"
      },
      {
        id: "tech-5",
        text: "What does 'CPU' stand for?",
        correctAnswer: "Central Processing Unit"
      },
      {
        id: "tech-6",
        text: "Which company developed the Chrome browser?",
        correctAnswer: "Google",
        imageUrl: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "tech-7",
        text: "What is the main function of RAM in a computer?",
        correctAnswer: "Temporary memory storage"
      },
      {
        id: "tech-8",
        text: "Which social media platform was founded by Mark Zuckerberg?",
        correctAnswer: "Facebook"
      }
    ]
  }
];
