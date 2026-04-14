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
//      * advancedChallenge: Optional boolean to mark as advanced challenge (deprecated - use category instead)
//      * category: Optional string to group quizzes under a category heading (e.g., "Advanced Challenges", "Beginner Level")
//         - Quizzes with the same category will be grouped together on the start screen
//         - Category display order is controlled by the CATEGORY_ORDER array at the top of this file
//         - Quizzes without a category appear first, before any categorized sections
//      * hidden: Optional boolean to hide the quiz from display
//      * factHeading: Optional custom heading for the fact section (defaults to "Did you know?")
//      * questions: Array of questions following the QuestionData format
//
// 3. QUESTION FORMAT:
//    Each question in the questions array must include the following fields:
//
//    REQUIRED FIELDS:
//      * id: number - Unique identifier for the question (use sequential numbers)
//      * question: string - The main question text displayed to the user
//      * correctAnswer: string | string[] - The correct answer(s)
//         - String format: Single correct answer. Uses pooled answers from other single-answer questions as distractors (default 4 options total)
//         - Array format: Multi-select question - ALL items in the array must be selected to be correct
//         - Multi-select questions show "Select all that apply" and require the user to click Submit
//      * description: string - Brief context or additional information shown with the question
//      * fact: string - Interesting fact shown after the user answers (educational content)
//      * imageUrl: string - Path to the question image (relative to public folder)
//
//    OPTIONAL FIELDS (in addition to those listed below):
//      * answerPool: string[] - Custom answer options for this question only (will be scrambled)
//         - When provided, these are the ONLY options shown for this question
//         - The correctAnswer(s) must be included in the answerPool
//         - Overrides the default behavior of pooling answers from other questions
//         - Can contain any number of options (not limited to 4)
//         - Questions with answerPool are NOT used as distractors for other questions
//
//    OTHER OPTIONAL FIELDS:
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
//      * factAudioUrl: string | string[] - Path(s) to audio file(s) for the fact section
//         - Works identically to audioUrl but plays in the fact section after answering
//         - Supported formats: MP3, WAV, OGG, M4A, AAC
//         - Can be a single file path (string) or multiple file paths (array)
//         - When multiple files are provided, they play sequentially in order
//         - A separate play/pause audio player will appear in the fact section
//         - Single file example: "/audio/quiz-name/fact-sound.mp3"
//         - Multiple files example: ["/audio/fact1.mp3", "/audio/fact2.mp3"]
//      * factAudioLoopCount: number - Number of times to loop the fact audio sequence
//         - Default: 1 (plays the sequence once if not specified)
//         - Example: 2 (plays the entire fact audio sequence twice)
//         - Works the same as audioLoopCount but for fact audio
//
//    Example question with single answer and pooled options:
//    {
//      id: 1,
//      question: "What is this animal?",
//      correctAnswer: "Red Panda",  // String format - single answer, uses pooled answers from other questions as distractors
//      description: "This animal is native to the eastern Himalayas",
//      fact: "Red pandas are not closely related to giant pandas!",
//      imageUrl: "/images/nature/red-panda.jpg",
//      audioUrl: "/audio/nature/red-panda-sound.mp3",  // Optional - single file
//      audioLoopCount: 3  // Optional - will play 3 times (default is 1)
//    }
//
//    Example question with custom answer pool:
//    {
//      id: 2,
//      question: "Which flag is this?",
//      correctAnswer: "United States",  // Single correct answer
//      answerPool: ["United States", "Canada", "Mexico", "Brazil", "Argentina"],  // Custom options (will be scrambled)
//      description: "A North American country's flag",
//      fact: "This flag has 50 stars representing the states!",
//      imageUrl: "/images/flags/usa.jpg"
//    }
//
//    Example multi-select question (requires ALL correct answers):
//    {
//      id: 3,
//      question: "Which of these are primary colors?",
//      correctAnswer: ["Red", "Blue", "Yellow"],  // Array format - ALL must be selected to be correct
//      answerPool: ["Red", "Blue", "Yellow", "Green", "Orange", "Purple"],  // Custom pool with correct and incorrect answers
//      description: "Select all primary colors",
//      fact: "Primary colors cannot be created by mixing other colors!",
//      imageUrl: "/images/colors/palette.jpg"
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
//    Example question with fact audio:
//    {
//      id: 4,
//      question: "What animal makes this sound?",
//      correctAnswer: "Whale",
//      description: "A marine mammal's vocalization",
//      fact: "Whale songs can travel thousands of miles underwater!",
//      imageUrl: "/images/nature/whale.jpg",
//      audioUrl: "/audio/nature/whale-sound.mp3",
//      factAudioUrl: "/audio/nature/whale-song.mp3",  // Optional - plays in the fact section
//      factAudioLoopCount: 1  // Optional - plays once (default)
//    }
//
// FILL-IN-THE-BLANK QUESTIONS:
//
// Fill-in-the-blank questions can be mixed with regular multiple-choice questions in the same quiz.
// To create a fill-in-the-blank question, add `type: "fill-in-the-blank"` to the question object.
// Questions without a type field (or with `type: "multiple-choice"`) will be regular MC questions.
//
//    Example fill-in-the-blank question:
//    {
//      id: 1,
//      type: "fill-in-the-blank",  // REQUIRED for fill-in-the-blank questions
//      question: "The capital of France is (blank) and the Eiffel Tower is (blank) meters tall.",
//      correctAnswer: ["Paris", "330", "London", "Berlin", "Rome"],  // First 2 are correct answers for the blanks, rest are distractors
//      description: "French geography and landmarks",
//      fact: "The Eiffel Tower was completed in 1889!",
//      imageUrl: "/images/geography/eiffel-tower.jpg"
//    }
//
// Fill-in-the-blank format:
//    * Add `type: "fill-in-the-blank"` to the question object
//    * Use (blank) in the question text to mark where blanks should appear (must be exactly this text with parentheses)
//    * correctAnswer must be an array of strings
//    * The first N answers (where N = number of blanks) are the correct answers in order
//    * Any additional answers beyond the first N are distractor options (wrong answers)
//    * All answers (correct + distractors) are shuffled together as clickable options
//    * Each blank is worth 1 point on the leaderboard
//    * Wrong answers reveal the correct answer for that blank
//    * Questions and answer options can both be randomized if enabled in quiz config
//    * Users click on a blank to select it, then choose an answer from the available options
//
//    Example with 3 blanks and 2 distractors:
//    {
//      id: 2,
//      type: "fill-in-the-blank",
//      question: "Water freezes at (blank)°C, boils at (blank)°C, and has a pH of (blank).",
//      correctAnswer: ["0", "100", "7", "50", "14"],  // First 3 fill blanks, last 2 are distractors
//      description: "Properties of water",
//      fact: "Water is one of the few substances that expands when it freezes!",
//      imageUrl: "/images/science/water.jpg"
//    }
//
//    Example quiz with MIXED question types (MC + fill-in-the-blank):
//    {
//      id: 1,
//      question: "What is the largest planet in our solar system?",
//      correctAnswer: "Jupiter",  // Regular MC question - no type field needed
//      description: "A planet in our solar system",
//      fact: "Jupiter is more than twice as massive as all other planets combined!",
//      imageUrl: "/images/space/jupiter.jpg"
//    },
//    {
//      id: 2,
//      type: "fill-in-the-blank",  // Fill-in-the-blank question - type field required
//      question: "Earth has (blank) moon(s) and Mars has (blank) moon(s).",
//      correctAnswer: ["1", "2", "0", "3", "4"],  // First 2 are correct, rest are distractors
//      description: "Moons in our solar system",
//      fact: "Mars has two small moons: Phobos and Deimos!",
//      imageUrl: "/images/space/moons.jpg"
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

// Category display order on the start screen
// Categories not in this list will appear after these in alphabetical order
// Quizzes without a category appear first (before any categorized quizzes)
export const CATEGORY_ORDER: string[] = [
  'WHMIS'
  // Add more categories here in the desired order
];

// Collection of all available quizzes
export const QUIZ_COLLECTION: QuizDefinition[] = [
{
  config: {
    id: "hazardDescription",
    title: "WHMIS Symbols",
    description: "Identify the Hazard",
    themeColor: "red",
    quizKey: "hazardDescription",
    startScreenImage: "/images/navy-emblem.svg",
    studyGuide: "/images/pictogram_names.gif",
    factHeading: "Hazard",
    category: "WHMIS",
    hidden: false
  },
  questions: [
    {
      id: 1,
      question: "Describe this hazard",
      correctAnswer: "Oxidizer",
      description: "",
      fact: "Flame over Circle",
      imageUrl: "/images/flame_circle.png"
    },
    {
      id: 2,
      question: "Describe this hazard",
      correctAnswer: "Flammable, Self-Reactive, Pyrophoric, Self-heating, In Contact With Water, Emits Flammable Gases, Organic Peroxide, Chemicals Under Pressure (flammable)",
      description: "",
      fact: "Flame",
      imageUrl: "/images/flame.png"
    },
    {
      id: 3,
      question: "Describe this hazard",
      correctAnswer: "Explosive, Self-Reactive (severe), Organic Peroxide (severe)",
      description: "",
      fact: "Exploding Bomb",
      imageUrl: "/images/exploding_bomb.png"
    },
    {
      id: 4,
      question: "Describe this hazard",
      correctAnswer: "Gas Under Pressure, Chemicals Under Pressure",
      description: "",
      fact: "Gas Cylinder",
      imageUrl: "/images/gas_cylinder.png"
    },
    {
      id: 5,
      question: "Describe this hazard",
      correctAnswer: "Acute Toxicity (fatal or toxic)",
      description: "",
      fact: "Skull and Crossbones",
      imageUrl: "/images/skull_crossbones.png"
    },
    {
      id: 6,
      question: "Describe this hazard",
      correctAnswer: "Serious Eye Damage, Skin Corrosion, Corrosive to Metals",
      description: "",
      fact: "Corrosion",
      imageUrl: "/images/corrosion.png"
    },
    {
      id: 7,
      question: "Describe this hazard",
      correctAnswer: "Irritation (skin or eyes), Skin Sensitization, Acute Toxicity (harmful), Specific Target Organ Toxicity (drowsiness or dizziness, or respiratory irritation), Hazardous to the Ozone Layer",
      description: "",
      fact: "Exclamation Mark",
      imageUrl: "/images/exclamation_mark.png"
    },
    {
      id: 8,
      question: "Describe this hazard",
      correctAnswer: "Health Hazard",
      description: "Carcinogenicity, Respiratory Sensitization, Reproductive Toxicity, Target Organ Toxicity, Germ Cell Mutagenicity, Aspiration Hazard",
      fact: "Health Hazard",
      imageUrl: "/images/health_hazard.png"
    },
    {
      id: 9,
      question: "Describe this hazard",
      correctAnswer: "Aquatic Toxicity",
      description: "",
      fact: "Environment",
      imageUrl: "/images/environment.png"
    },
    {
      id: 10,
      question: "Describe this hazard",
      correctAnswer: "Biohazardous Infectious Materials",
      description: "",
      fact: "Biohazardous",
      imageUrl: "/images/biohazardous.png"
    }
  ]
},
{
  config: {
    id: "fse_hazlabel",
    title: "Hazardous Waste Labeling",
    description: "Learn Proper Labeling",
    themeColor: "red",
    quizKey: "fse_hazlabel",
    startScreenImage: "/images/navy-emblem.svg",
    studyGuide: "",
    factHeading: "",
    category: "WHMIS",
    fillInTheBlank: true,
    hidden: false
  },
  questions: [
    {
      id: 1,
      imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/hazwaste_label.png",
      question:
        "PIN (blank)<br>Description (blank)<br>Primary Class (blank)<br>ORIGINATOR (blank)<br>TEL (blank)<br>DATE (blank)",
      correctAnswer: ["1950", "AEROSOLS, FLAMMABLE", "2.1", "LS SMITH, HMCS HAZMAT", "3-1234", "JAN 1/26"],
      description: "",
      fact: ""
    },
    {
      id: 2,
      sortLeft: true,
      question: "Complete the label",
      correctAnswer: [
        ["A","1950"],
        ["D","AEROSOLS, FLAMMABLE"],
        ["E","2.1"],
        ["H","LS SMITH, HMCS HAZMAT"],
        ["I","3-1234"],
        ["J","JAN 1/26"]
      ],
      description: "",
      fact: "",
      imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/hazwaste_label2.png"
    },
  ]
},
];

/*
      {
        id: 5,
        question: "Match the sound signal with its correct use.",
        correctAnswer: [
                        ["a vessel nearing a bend or an area of a channel or fairway where other vessels may be obscured by an intervening obstruction","/sounds/2_Prolonged_Blast.mp3"],
                        ["the response from any approaching vessel that may be within hearing around a bend or behind an intervening obstruction","/sounds/2_Prolonged_Blast.mp3"],
                        ["Distractor #1","/sounds/7_Warning_Wake-Up_Signal_5_short.mp3"],
                        ["Distractor #2","/sounds/6_Overtaking Narrow Channel Fairway Agreement Signal_V2.m4a"]
                      ],
        description: "",
        fact: ""
      },
*/

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
    hidden: false,  // Optional hidden flag
    factHeading: "Fun Fact"  // Optional custom heading (defaults to "Did you know?")
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
