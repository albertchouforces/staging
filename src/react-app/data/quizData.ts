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
// 1.5. OPTIONAL: ADD AUDIO FILES TO QUESTIONS:
//    - Place audio files in the public/audio/{quiz-name}/ folder
//    - Supported formats: MP3, WAV, OGG, M4A
//    - Example path: public/audio/animals/lion-roar.mp3 will be referenced as "/audio/animals/lion-roar.mp3"
//    - Add the audioUrl field to any question where you want audio playback
//    - The audio player will appear automatically when audioUrl is present
//    - OPTIONAL: Add audioLoopCount to specify how many times to play the audio (default: 1)
//      * audioLoopCount: 1 - plays once (default if not specified)
//      * audioLoopCount: 3 - plays three times in a row
//      * audioLoopCount: 5 - plays five times in a row, etc.
//
// 2. ADD YOUR QUIZ CONFIGURATION:
//    - Add a new quiz configuration to the QUIZ_COLLECTION below
//    - Each quiz needs:
//      * id: Unique identifier for the quiz
//      * title: Quiz title
//      * description: Brief quiz description
//      * themeColor: Choose from available theme colors
//      * quizKey: Unique key for storage and database (use snake_case)
//      * startScreenImage: Optional image for quiz card
//      * studyGuide: Optional URL or path to study guide/materials:
//         - Local images: Will be shown in a popup modal
//         - External URLs (http/https): Will be opened in a new browser tab
//         - Document files (PDFs, etc.): Will prompt a download
//      * advancedChallenge: Optional boolean to mark as advanced challenge
//      * hidden: Optional boolean to hide the quiz from display
//      * questions: Array of questions following the QuestionData format
//
// 3. QUESTION FORMAT:
//    Each question in the questions array must include the following fields:
//
//    REQUIRED FIELDS:
//      * id: number - Unique identifier for the question (use sequential numbers)
//      * question: string - The main question text displayed to the user
//      * correctAnswer: string | string[] - The correct answer choice
//         - String format: Uses pooled random answers from other questions as distractors (default 4 options)
//         - Array format: Manual override - first item is correct, all items become the options for THIS question only
//         - Array answers are NOT used as distractors for other questions
//         - Array can contain more than 4 items if needed
//      * description: string - Brief context or additional information shown with the question
//      * fact: string - Interesting fact shown after the user answers (educational content)
//      * imageUrl: string - Path to the question image (relative to public folder)
//
//    OPTIONAL FIELDS:
//      * audioUrl: string | string[] - Path(s) to audio file(s) for the question
//         - Supported formats: MP3, WAV, OGG, M4A, AAC
//         - Can be a single file path (string) or multiple file paths (array)
//         - When multiple files are provided, they play sequentially in order
//         - When provided, a play/pause audio player will appear
//         - Audio automatically stops when moving to the next question
//         - Single file example: "/audio/quiz-name/sound.mp3"
//         - Multiple files example: ["/audio/sound1.mp3", "/audio/sound2.mp3", "/audio/sound3.mp3"]
//      * audioLoopCount: number - Number of times to loop the entire audio sequence
//         - Default: 1 (plays the sequence once if not specified)
//         - Example: 3 (plays the entire sequence three times in succession)
//         - With multiple files, all files play in order, then the sequence repeats
//         - Note: Pressing pause will stop playback and reset to the beginning
//
//    Example question with single audio file and pooled answers:
//    {
//      id: 1,
//      question: "What is this animal?",
//      correctAnswer: "Red Panda",  // String format - uses pooled answers from other questions
//      description: "This animal is native to the eastern Himalayas",
//      fact: "Red pandas are not closely related to giant pandas!",
//      imageUrl: "/images/nature/red-panda.jpg",
//      audioUrl: "/audio/nature/red-panda-sound.mp3",  // Optional - single file
//      audioLoopCount: 3  // Optional - will play 3 times (default is 1)
//    }
//
//    Example question with manual answer options:
//    {
//      id: 3,
//      question: "Which flag is this?",
//      correctAnswer: ["United States", "Canada", "Mexico", "Brazil", "Argentina"],  // Array format - manual override
//      // First item is correct answer, all items become the options (5 options in this case)
//      // These answers won't be used as distractors for other questions
//      description: "A North American country's flag",
//      fact: "This flag has 50 stars representing the states!",
//      imageUrl: "/images/flags/usa.jpg"
//    }
//
//    Example question with multiple audio files:
//    {
//      id: 2,
//      question: "What sound pattern is this?",
//      correctAnswer: "Emergency Signal",
//      description: "A sequence of warning sounds",
//      fact: "This pattern is used internationally for emergencies!",
//      imageUrl: "/images/signals/emergency.jpg",
//      audioUrl: [  // Array of multiple audio files
//        "/audio/signals/short-blast.mp3",
//        "/audio/signals/long-blast.mp3",
//        "/audio/signals/short-blast.mp3"
//      ],
//      audioLoopCount: 2  // Optional - plays the entire sequence twice
//    }
//
// Available theme colors:
// - Basic: 'blue', 'green', 'red', 'purple', 'orange', 'pink'
// - Cool: 'sky', 'cyan', 'teal', 'indigo', 'violet'
// - Warm: 'rose', 'amber', 'fuchsia'
// - Nature: 'lime', 'emerald'
//
// =================================================================

import type { QuestionData, QuizConfig } from '@/react-app/types';

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
      quizKey: "sample_nature_quiz",
      startScreenImage: "https://cafrank.pages.dev/services/navy-emblem.svg",
      studyGuide: "https://github.com/albertchouforces/staging/raw/e8dc17661db4348c91e0bd5a4a7009b3c8bd41bc/public/Flags.pdf",
      hidden: false
    },
    questions: [
      {
        id: 1,
        question: "What is this animal?",
        correctAnswer: "Red Panda",
        description: "This animal is native to the eastern Himalayas and southwestern China",
        fact: "Red pandas are not closely related to giant pandas - they're actually in their own unique family!",
        imageUrl: "/images/nature/red-panda.jpg",
        audioUrl: ["https://github.com/albertchouforces/sample/raw/refs/heads/main/sounds/7_Warning_Wake-Up_Signal_5_short.mp3", "https://github.com/albertchouforces/sample/raw/d812ee16fd0a96a7643b821e8bc97fae05a4beb9/sounds/1_Short_Blast.mp3"],
        audioLoopCount: 1,
      },
      {
        id: 2,
        question: "What type of tree is this?",
        correctAnswer: "Giant Sequoia",
        description: "Found in California's Sierra Nevada mountains",
        fact: "These trees can live for over 3,000 years!",
        imageUrl: "/images/nature/sequoia.jpg"
      },
      {
        id: 3,
        question: "The term short blast means a blast of?",
        correctAnswer: [
                        "1 second in duration", 
                        "2 seconds in duration",
                        "3 seconds in duration",
                        "4 seconds in duration",
                        "5 seconds in duration"
                       ],
        description: "",
        fact: "",
        imageUrl: ""
      },
    ]
  },
  {
    config: {
      id: "landmarks",
      title: "World Landmarks",
      description: "Explore famous landmarks around the globe",
      themeColor: 'blue',
      quizKey: "world_landmarks_quiz",
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
      quizKey: "world_landmarks_quiz2",
      startScreenImage: "/images/landmarks/landmarks-start.jpg",
      studyGuide: "https://navalknots.pages.dev/images/bowline1.png",
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
      quizKey: "world_landmarks_quiz3",
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
    quizKey: "musical_instruments_quiz",
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
      imageUrl: "/images/music/grand-piano.jpg",
      audioUrl: "/audio/music/piano-sound.mp3"  // Optional audio file
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
