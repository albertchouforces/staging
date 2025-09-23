// =================================================================
// QUIZ COLLECTION - HOW TO ADD YOUR OWN QUIZZES
// =================================================================
//
// This template allows you to create multiple image-based multiple choice quizzes.
// Follow these steps to add a new quiz:
//
// 1. PREPARE YOUR IMAGES:
//    - Place all question images in the public/images/{quiz-name}/ folder
//    - Recommended image dimensions: 800x600px or similar 4:3/16:9 ratio
//    - Supported formats: PNG, JPG, SVG
//    - Example path: public/images/animals/lion.jpg will be referenced as "/images/animals/lion.jpg"
//
// 2. ADD YOUR QUIZ CONFIGURATION:
//    - Add a new quiz configuration to the QUIZ_COLLECTION below
//    - Each quiz needs:
//      * id: Unique identifier for the quiz
//      * title: Quiz title
//      * description: Brief quiz description
//      * themeColor: Choose from available theme colors
//      * service: Unique identifier for storage (use snake_case) - represents the quiz_name
//      * startScreenImage: Optional image for quiz card
//      * studyGuide: Optional URL or path to study guide/materials:
//         - Local images: Will be shown in a popup modal
//         - External URLs (http/https): Will be opened in a new browser tab
//         - Document files (PDFs, etc.): Will prompt a download
//      * advancedChallenge: Optional boolean to mark as advanced challenge
//      * hidden: Optional boolean to hide the quiz from display
//      * questions: Array of questions following the QuestionData format
//
// Available theme colors:
// - Basic: 'blue', 'green', 'red', 'purple', 'orange', 'pink'
// - Cool: 'sky', 'cyan', 'teal', 'indigo', 'violet'
// - Warm: 'rose', 'amber', 'fuchsia'
// - Nature: 'lime', 'emerald'
//
// =================================================================

import type { QuestionData, QuizConfig } from '../types';

interface QuizDefinition {
  config: QuizConfig;
  questions: QuestionData[];
}

// Collection of all available quizzes
export const QUIZ_COLLECTION: QuizDefinition[] = [
  {
    config: {
      id: "sample",
      title: "Sample Nature Quiz",
      description: "Test your knowledge of animals and nature",
      themeColor: 'emerald',
      service: "sample_nature_quiz",
      startScreenImage: "https://cafrank.pages.dev/services/navy-emblem.svg",
      studyGuide: "public/Flags.pdf",
      hidden: false
    },
    questions: [
      {
        id: 1,
        question: "What is this animal?",
        correctAnswer: "Red Panda",
        description: "This animal is native to the eastern Himalayas and southwestern China",
        fact: "Red pandas are not closely related to giant pandas - they're actually in their own unique family!",
        imageUrl: "/images/nature/red-panda.jpg"
      },
      {
        id: 2,
        question: "What type of tree is this?",
        correctAnswer: "Giant Sequoia",
        description: "Found in California's Sierra Nevada mountains",
        fact: "These trees can live for over 3,000 years!",
        imageUrl: "/images/nature/sequoia.jpg"
      }
    ]
  },
  {
    config: {
      id: "landmarks",
      title: "World Landmarks",
      description: "Explore famous landmarks around the globe",
      themeColor: 'blue',
      service: "world_landmarks_quiz",
      startScreenImage: "/images/landmarks/landmarks-start.jpg",
      studyGuide: "",
      hidden: true // Example of a hidden quiz
    },
    questions: [
      {
        id: 1,
        question: "What is this famous landmark?",
        correctAnswer: "Eiffel Tower",
        description: "An iconic iron lattice tower in Paris",
        fact: "The Eiffel Tower was originally intended to be a temporary structure!",
        imageUrl: "/images/landmarks/eiffel-tower.jpg"
      },
      {
        id: 2,
        question: "Name this ancient wonder",
        correctAnswer: "Petra",
        description: "A historic and archaeological city in Jordan",
        fact: "Petra was carved directly into rose-colored rock faces",
        imageUrl: "/images/landmarks/petra.jpg"
      }
    ]
  },
  {
    config: {
      id: "landmarks2",
      title: "World Landmarks 2",
      description: "Advanced challenge with complex landmarks",
      themeColor: 'rose',
      service: "world_landmarks_quiz2",
      startScreenImage: "/images/landmarks/landmarks-start.jpg",
      studyGuide: "/images/signalflags.jpg",
      advancedChallenge: true,
      hidden: false
    },
    questions: [
      {
        id: 1,
        question: "What is this famous landmark?",
        correctAnswer: "Eiffel Tower",
        description: "An iconic iron lattice tower in Paris",
        fact: "The Eiffel Tower was originally intended to be a temporary structure!",
        imageUrl: "/images/landmarks/eiffel-tower.jpg"
      },
      {
        id: 2,
        question: "Name this ancient wonder",
        correctAnswer: "Petra",
        description: "A historic and archaeological city in Jordan",
        fact: "Petra was carved directly into rose-colored rock faces",
        imageUrl: "/images/landmarks/petra.jpg"
      }
    ]
  },
  {
    config: {
      id: "landmarks3",
      title: "World Landmarks 3",
      description: "Expert-level landmark identification challenge",
      themeColor: 'violet',
      service: "world_landmarks_quiz3",
      startScreenImage: "/images/landmarks/landmarks-start.jpg",
      studyGuide: "https://navalknots.pages.dev/",
      advancedChallenge: true,
      hidden: false
    },
    questions: [
      {
        id: 1,
        question: "What is this famous landmark?",
        correctAnswer: "Eiffel Tower",
        description: "An iconic iron lattice tower in Paris",
        fact: "The Eiffel Tower was originally intended to be a temporary structure!",
        imageUrl: "/images/landmarks/eiffel-tower.jpg"
      },
      {
        id: 2,
        question: "Name this ancient wonder",
        correctAnswer: "Petra",
        description: "A historic and archaeological city in Jordan",
        fact: "Petra was carved directly into rose-colored rock faces",
        imageUrl: "/images/landmarks/petra.jpg"
      }
    ]
  }
];

// =================================================================
// EXAMPLE OF ADDING A NEW QUIZ
// =================================================================
/*
// Add this to the QUIZ_COLLECTION array:
{
  config: {
    id: "music",
    title: "Musical Instruments",
    description: "Test your knowledge of musical instruments",
    themeColor: 'violet',
    service: "musical_instruments_quiz",
    startScreenImage: "/images/music/music-start.jpg",
    studyGuide: "/images/music/study-guide.jpg",  // Optional study guide image
    advancedChallenge: false,  // Optional advanced challenge flag
    hidden: false  // Optional hidden flag
  },
  questions: [
    {
      id: 1,
      question: "What instrument is this?",
      correctAnswer: "Grand Piano",
      description: "A large keyboard instrument",
      fact: "A modern grand piano has about 230 strings!",
      imageUrl: "/images/music/grand-piano.jpg"
    },
    // Add more questions...
  ]
}
*/

// =================================================================
// TIPS FOR CREATING GOOD QUIZZES
// =================================================================
// 1. Use a consistent theme for each quiz
// 2. Choose appropriate theme colors that match the quiz content
// 3. Organize images in separate folders for each quiz
// 4. Use high-quality, clear images
// 5. Keep questions focused and unambiguous
// 6. Add interesting facts to make the quiz educational
// 7. Test all image paths before deploying
// 8. If providing a study guide, ensure it's clear and relevant
// 9. Use advancedChallenge flag for more difficult quizzes
// 10. Use hidden flag to temporarily disable quizzes
// =================================================================
