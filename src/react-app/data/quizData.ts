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
  'Col Regs Rules 23-31',
  'Col Regs Rules 32-34',
  'Advanced Challenges'
  // Add more categories here in the desired order
];

// Collection of all available quizzes
export const QUIZ_COLLECTION: QuizDefinition[] = [
  {
    config: {
      id: "23to31vessel",
      title: "Col Regs Rules 23-31 Lights Challenge",
      description: "Identify the Vessel",
      themeColor: 'red',
      quizKey: "23to31vessel",
      startScreenImage: "https://cafrank.pages.dev/services/navy-emblem.svg",
      studyGuide: "https://laws-lois.justice.gc.ca/eng/regulations/c.r.c.,_c._1416/FullText.html",
      factHeading: "",
      category: "Col Regs Rules 23-31",
      hidden: false
    },
    questions: [
    {
    id: 1,
    question: "What does this image represent?",
    correctAnswer: ["Power-driven vessel (including a composite unit)", "Vessel engaged in towing"],
    answerPool: ["Power-driven vessel (including a composite unit)", "Vessel pushing ahead another vessel", "Vessel engaged in towing", "Vessel engaged in pilotage duties"],
    description: "23(a); 24(a), (b)",
    fact: "A <strong>composite</strong> unit is a pushing vessel and another vessel pushed ahead, that are rigidly connected. Together, they count as one and display the same lights as a power-driven vessel of their <strong>combined length</strong>. Rule 24(b)",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q1.png"  // Place image in public/images/
    },
    {
    id: 2,
    question: "What does this image represent?",
    correctAnswer: ["Vessel engaged in fishing, other than trawling"],
    answerPool: ["Vessel engaged in fishing, other than trawling", 
      "Vessel engaged in trawling", 
      "Vessel engaged in pilotage duties", 
      "Power-driven vessel"],
    description: "26(c)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q2.png"  // Place image in public/images/
    },
    {
    id: 3,
    question: "What does this image represent?",
    correctAnswer: ["Vessel engaged in trawling; net has come fast upon an obstruction; fishing in close proximity to other vessels engaged in fishing"],
    answerPool: ["Vessel engaged in trawling; net has come fast upon an obstruction; fishing in close proximity to other vessels engaged in fishing", 
      "Vessel engaged in fishing, other than trawling; hauling their nets; fishing in close proximity to other vessels engaged in fishing", 
      "Vessel not under command", "Vessel restricted in its ability to manoeuvre; obstruction on its port side"],
    description: "26(b), (d); Annex II, 2(a)(iii)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q3.png"  // Place image in public/images/
    },
    {
    id: 4,
    question: "What does this image represent?",
    correctAnswer: ["Air cushion vessel in non-displacement mode"],
    answerPool: ["Air cushion vessel in non-displacement mode", 
      "Vessel pushing ahead another vessel", 
      "Composite unit", 
      "Vessel engaged in towing"],
    description: "23(b), (a)",
    fact: "Air-cushion vessels, like hovercraft, don’t move through the water like regular vessels—they hover above it! In this mode, they turn very differently and can reach speeds of over <strong>70 knots</strong>. To tell them apart from normal power-driven vessels, look for the <strong>yellow flashing light</strong>—it signals the vessel is in non-displacement (hover) mode.",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q4.png"  // Place image in public/images/
    },
    {
    id: 5,
    question: "What does this image represent?",
    correctAnswer: ["Vessel constrained by its draught"],
    answerPool: ["Vessel constrained by its draught", 
      "Vessel not under command", 
      "Vessel restricted in its ability to manoeuvre", 
      "Vessel aground"],
    description: "28(a); 23(a)",
    fact: "A vessel’s <strong>draught</strong> is the depth of its <strong>keel</strong> (the bottom of the ship) below the waterline at any point along the <strong>hull</strong> (the main body of the ship).",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q5.png"  // Place image in public/images/
    },
    {
    id: 6,
    question: "What does this image represent?",
    correctAnswer: ["Vessel engaged in towing a partially submerged vessel/object"],
    answerPool: ["Vessel engaged in towing a partially submerged vessel/object", 
      "Vessel at anchor", 
      "Power-driven vessel", 
      "Vessel engaged in towing alongside"],
    description: "24(a), (g); 23(a)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q6.png"  // Place image in public/images/
    },
    {
    id: 7,
    question: "What does this image represent?",
    correctAnswer: ["Vessel engaged in trawling; shooting their nets; fishing in close proximity to other vessels engaged in fishing"],
    answerPool: ["Vessel engaged in trawling; shooting their nets; fishing in close proximity to other vessels engaged in fishing", 
      "Vessel engaged in fishing, other than trawling; hauling their nets; fishing in close proximity to other vessels engaged in fishing", 
      "Vessel engaged in trawling; hauling their nets; fishing in close proximity to other vessels engaged in fishing", 
      "Vessels engaged in mineclearance operations"],
    description: "26(b), (d); Annex II, 2(a)(i)",
    fact: "Sometimes trawlers fish together using a single net—this is called <strong>pair trawling</strong>. At night, each vessel shines a searchlight forward toward the other vessel to warn others: <strong>don’t pass between them!</strong> Annex II, 2(b)",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q7.png"  // Place image in public/images/
    },
    {
    id: 8,
    question: "What does this image represent?",
    correctAnswer: ["Vessel engaged in towing a partially submerged vessel/object"],
    answerPool: ["Vessel engaged in towing a partially submerged vessel/object", 
      "Vessel at anchor", 
      "Power-driven vessel", 
      "Vessel engaged in towing alongside"],
    description: "24(a), (g); 23(a)",
    fact: "If a partially submerged vessel or object is <strong>over 100 m long</strong>, it must have extra all-round white lights so that the gap between them is <strong>no more than 100 m</strong>. Rule 24(g)(iii)",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q8.png"  // Place image in public/images/
    },
    {
    id: 9,
    question: "What does this image represent?",
    correctAnswer: ["Vessel engaged in mineclearance operations"],
    answerPool: ["Vessel engaged in mineclearance operations", 
      "Vessel with an obstruction on its port side", 
      "Vessel pushing ahead a barge", 
      "Vessel engaged in trawling"],
    description: "27(f)",
    fact: "These vessels must show <strong>three all-round green lights</strong>, in addition to the usual lights for a power-driven vessel (Rule 23) or for a vessel at anchor (Rule 30).",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q9.png"  // Place image in public/images/
    },
    {
    id: 10,
    question: "What does this image represent?",
    correctAnswer: ["Vessel aground"],
    answerPool: ["Vessel aground",
      "Vessel not under command at anchor",
      "Vessel engaged in fishing at anchor with its nets fast upon an obstruction",
      "Vessel engaged in pilotage duties"],
    description: "30(d), (a)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q10.png"  // Place image in public/images/
    },
    {
    id: 11,
    question: "What does this image represent?",
    correctAnswer: ["Sailing vessel", "Vessel under oars"],
    answerPool: ["Sailing vessel", 
      "Vessel under oars",
      "Power-driven vessel less than 7 m whose maximum speed does not exceed 7 kts",
      "Power-driven vessel less than 12 m"],
    description: "25(a), (d)(ii)",
    fact: "A sailing vessel under sail only shows sidelights and a sternlight—but no masthead light! If it’s using its engine as well, it adds a masthead light and is considered a power-driven vessel. Rule 3(b), Rule 23(a)",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q11.png"  // Place image in public/images/
    },
    {
    id: 12,
    question: "What does this image represent?",
    correctAnswer: ["Power-driven vessel"],
    answerPool: ["Power-driven vessel",  
      "Vessel pushing ahead another vessel",
      "Vessel engaged in towing",
      "Air cushion vessel in non-displacement mode"],
    description: "23(a)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q12.png"  // Place image in public/images/
    },
    {
    id: 13,
    question: "What does this image represent?",
    correctAnswer: ["Vessel engaged in towing two objects/vessels"],
    answerPool: ["Vessel engaged in towing two objects/vessels",
      "Vessel engaged in towing one object/vessel",
      "Vessel constrained by its draught",
      "Vessel restricted in its ability to manoeuvre"],
    description: "24(a), (d), (e); 23(a)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q13.png"  // Place image in public/images/
    },
    {
    id: 14,
    question: "What does this image represent?",
    correctAnswer: ["Vessel engaged in trawling; hauling their nets; fishing in close proximity to other vessels engaged in fishing"],
    answerPool: ["Vessel engaged in trawling; hauling their nets; fishing in close proximity to other vessels engaged in fishing",
      "Vessel engaged in fishing, other than trawling; hauling their nets; fishing in close proximity to other vessels engaged in fishing",
      "Vessel engaged in trawling; shooting their nets; fishing in close proximity to other vessels engaged in fishing",
      "Vessels engaged in pilotage duties"],
    description: "26(b), (d); Annex II, 2(a)(ii)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q14.png"  // Place image in public/images/
    },
    {
    id: 15,
    question: "What does this image represent?",
    correctAnswer: ["Vessel not under command"],
    answerPool: ["Vessel not under command",
      "Vessel engaged in trawling, its net has come fast upon an obstruction",
      "Vessel constrained by its draught",
      "Vessel restricted in its ability to manoeuvre"],
    description: "27(a)",
    fact: "Under Rule 18, vessels Not Under Command (NUC) and vessels Restricted in their Ability to Manoeuvre (RAM) rank highest in the hierarchy because they can’t easily keep clear of others.",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q15.png"  // Place image in public/images/
    },
    {
    id: 16,
    question: "What does this image represent?",
    correctAnswer: ["Vessel restricted in its ability to manoeuvre"],
    answerPool: ["Vessel restricted in its ability to manoeuvre",
      "Vessel not under command",
      "Vessel engaged in fishing, net has come fast upon an obstruction",
      "Vessel constrained by its draught"],
    description: "27(b)",
    fact: "Under Rule 18, vessels Restricted in their Ability to Manoeuvre (RAM) and vessels Not Under Command (NUC) share the same top level in the hierarchy—because both have limited ability to keep clear of others.",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q16.png"  // Place image in public/images/
    },
    {
    id: 17,
    question: "What does this image represent?",
    correctAnswer: ["Sailing vessel"],
    answerPool: ["Sailing vessel",
      "Vessel under sail and being propelled by machinery",
      "Power-driven vessel less than 7 m whose maximum speed does not exceed 7 kts",
      "Power-driven vessel less than 12 m"],
    description: "25(a)",
    fact: "Small sailing vessels under 20 m can combine their sidelights and sternlight into one lantern at or near the top of the mast. Rule 25(b)",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q17.png"  // Place image in public/images/
    },
    {
    id: 18,
    question: "What does this image represent?",
    correctAnswer: ["Vessel pushing ahead"],
    answerPool: ["Vessel pushing ahead",
      "Vessel engaged in towing one object/vessel",
      "Vessel engaged in towing two objects/vessels",
      "Vessel towing alongside"],
    description: "24(c), (d), (f)(i); 23(a)",
    fact: "A vessel pushed ahead must show sidelights, but no sternlight is required. Rule 24(f)(i)",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q18.png"  // Place image in public/images/
    },
    {
    id: 19,
    question: "What does this image represent?",
    correctAnswer: ["Vessel engaged in purse seining that is hampered by its fishing gear; fishing in close proximity to other vessels engaged in fishing"],
    answerPool: ["Vessel engaged in purse seining that is hampered by its fishing gear; fishing in close proximity to other vessels engaged in fishing",
      "Vessel engaged in trawling; fishing in close proximity to other vessels engaged in fishing",
      "Vessel engaged in pilotage duties",
      "Vessel restricted in its ability to manoeuvre"],
    description: "26(c), (d); Annex II, 3",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q19.png"  // Place image in public/images/
    },
    {
    id: 20,
    question: "What does this image represent?",
    correctAnswer: ["Vessel engaged in towing one object/vessel"],
    answerPool: ["Vessel engaged in towing one object/vessel",
      "Vessel engaged in towing two objects/vessels",
      "Vessel engaged in trawling that is shooting its nets",
      "Vessel at anchor"],
    description: "24(a), (d), (e); 23(a)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q20.png"  // Place image in public/images/
    },
    {
    id: 21,
    question: "What does this image represent?",
    correctAnswer: ["Vessel engaged in trawling"],
    answerPool: ["Vessel engaged in trawling",
      "Vessel engaged in fishing, other than trawling",
      "Vessel engaged in surveying",
      "Power-driven vessel"],
    description: "26(b)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q21.png"  // Place image in public/images/
    },
    {
    id: 22,
    question: "What does this image represent?",
    correctAnswer: ["Vessel engaged in pilotage duties"],
    answerPool: ["Vessel engaged in pilotage duties",
      "Vessel engaged in fishing, other than trawling",
      "Vessel restricted in its ability to manoeuvre",
      "Vessel pushing ahead"],
    description: "29(a)",
    fact: "Many pilot vessels worldwide have “Pilot” painted on their sides for easy identification.",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q22.png"  // Place image in public/images/
    }

  ]
  },
  {
    config: {
      id: "23to31aspect",
      title: "Col Regs Rules 23-31 Lights Challenge",
      description: "Identify the Aspect",
      themeColor: 'red',
      quizKey: "23to31aspect",
      startScreenImage: "https://cafrank.pages.dev/services/navy-emblem.svg",
      studyGuide: "https://laws-lois.justice.gc.ca/eng/regulations/c.r.c.,_c._1416/FullText.html",
      factHeading: "",
      category: "Col Regs Rules 23-31",
      hidden: false
    },
    questions: [
    {
    id: 1,
    question: "What is the aspect of this vessel?",
    correctAnswer: ["Head-on"],
    answerPool: ["Head-on",
      "Port",
      "Starboard",
      "Stern",
      "Unknown"],
    description: "21(a), (b)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q1.png"  // Place image in public/images/
    },
    {
    id: 2,
    question: "What is the aspect of this vessel?",
    correctAnswer: ["Starboard"],
    answerPool: ["Head-on",
      "Port",
      "Starboard",
      "Stern",
      "Unknown"],
    description: "21(b), (e)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q2.png"  // Place image in public/images/
    },
    {
    id: 3,
    question: "What is the aspect of this vessel?",
    correctAnswer: ["Unknown"],
    answerPool: ["Head-on",
      "Port",
      "Starboard",
      "Stern",
      "Unknown"],
    description: "26(a), (b)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q3.png"  // Place image in public/images/
    },
    {
    id: 4,
    question: "What is the aspect of this vessel?",
    correctAnswer: ["Port"],
    answerPool: ["Head-on",
      "Port",
      "Starboard",
      "Stern",
      "Unknown"],
    description: "21(a), (b)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q4.png"  // Place image in public/images/
    },
    {
    id: 5,
    question: "What is the aspect of this vessel?",
    correctAnswer: ["Starboard"],
    answerPool: ["Head-on",
      "Port",
      "Starboard",
      "Stern",
      "Unknown"],
    description: "21(a), (b)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q5.png"  // Place image in public/images/
    },
    {
    id: 6,
    question: "What is the aspect of this vessel?",
    correctAnswer: ["Starboard"],
    answerPool: ["Head-on",
      "Port",
      "Starboard",
      "Stern",
      "Unknown"],
    description: "21(a), (b)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q6.png"  // Place image in public/images/
    },
    {
    id: 7,
    question: "What is the aspect of this vessel?",
    correctAnswer: ["Unknown"],
    answerPool: ["Head-on",
      "Port",
      "Starboard",
      "Stern",
      "Unknown"],
    description: "Starboard",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q7.png"  // Place image in public/images/
    },
    {
    id: 8,
    question: "What is the aspect of this vessel?",
    correctAnswer: ["Starboard"],
    answerPool: ["Head-on",
      "Port",
      "Starboard",
      "Stern",
      "Unknown"],
    description: "Unknown",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q8.png"  // Place image in public/images/
    },
    {
    id: 9,
    question: "What is the aspect of this vessel?",
    correctAnswer: ["Head-on"],
    answerPool: ["Head-on",
      "Port",
      "Starboard",
      "Stern",
      "Unknown"],
    description: "21(a), (b)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q9.png"  // Place image in public/images/
    },
    {
    id: 10,
    question: "What is the aspect of this vessel?",
    correctAnswer: ["Port"],
    answerPool: ["Head-on",
      "Port",
      "Starboard",
      "Stern",
      "Unknown"],
    description: "30(d), (a)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q10.png"  // Place image in public/images/
    },
    {
    id: 11,
    question: "What is the aspect of this vessel?",
    correctAnswer: ["Head-on"],
    answerPool: ["Head-on",
      "Port",
      "Starboard",
      "Stern",
      "Unknown"],
    description: "21(b)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q11.png"  // Place image in public/images/
    },
    {
    id: 12,
    question: "What is the aspect of this vessel?",
    correctAnswer: ["Head-on"],
    answerPool: ["Head-on",
      "Port",
      "Starboard",
      "Stern",
      "Unknown"],
    description: "21(a), (b)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q12.png"  // Place image in public/images/
    },
    {
    id: 13,
    question: "What is the aspect of this vessel?",
    correctAnswer: ["Port"],
    answerPool: ["Head-on",
      "Port",
      "Starboard",
      "Stern",
      "Unknown"],
    description: "21(a), (b)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q13.png"  // Place image in public/images/
    },
    {
    id: 14,
    question: "What is the aspect of this vessel?",
    correctAnswer: ["Unknown"],
    answerPool: ["Head-on",
      "Port",
      "Starboard",
      "Stern",
      "Unknown"],
    description: "26(a), (b)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q14.png"  // Place image in public/images/
    },
    {
    id: 15,
    question: "What is the aspect of this vessel?",
    correctAnswer: ["Unknown"],
    answerPool: ["Head-on",
      "Port",
      "Starboard",
      "Stern",
      "Unknown"],
    description: "27(a)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q15.png"  // Place image in public/images/
    },
    {
    id: 16,
    question: "What is the aspect of this vessel?",
    correctAnswer: ["Unknown"],
    answerPool: ["Head-on",
      "Port",
      "Starboard",
      "Stern",
      "Unknown"],
    description: "27(b)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q16.png"  // Place image in public/images/
    },
    {
    id: 17,
    question: "What is the aspect of this vessel?",
    correctAnswer: ["Head-on"],
    answerPool: ["Head-on",
      "Port",
      "Starboard",
      "Stern",
      "Unknown"],
    description: "21(b)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q17.png"  // Place image in public/images/
    },
    {
    id: 18,
    question: "What is the aspect of this vessel?",
    correctAnswer: ["Starboard"],
    answerPool: ["Head-on",
      "Port",
      "Starboard",
      "Stern",
      "Unknown"],
    description: "21(a), (b)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q18.png"  // Place image in public/images/
    },
    {
    id: 19,
    question: "What is the aspect of this vessel?",
    correctAnswer: ["Port"],
    answerPool: ["Head-on",
      "Port",
      "Starboard",
      "Stern",
      "Unknown"],
    description: "21(b)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q19.png"  // Place image in public/images/
    },
    {
    id: 20,
    question: "What is the aspect of this vessel?",
    correctAnswer: ["Starboard"],
    answerPool: ["Head-on",
      "Port",
      "Starboard",
      "Stern",
      "Unknown"],
    description: "21(a), (b)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q20.png"  // Place image in public/images/
    },
    {
    id: 21,
    question: "What is the aspect of this vessel?",
    correctAnswer: ["Port"],
    answerPool: ["Head-on",
      "Port",
      "Starboard",
      "Stern",
      "Unknown"],
    description: "21(b)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q21.png"  // Place image in public/images/
    },
    {
    id: 22,
    question: "What is the aspect of this vessel?",
    correctAnswer: ["Starboard"],
    answerPool: ["Head-on",
      "Port",
      "Starboard",
      "Stern",
      "Unknown"],
    description: "21(b)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q22.png"  // Place image in public/images/
    }
  ]
  },
  {
    config: {
      id: "23to31length",
      title: "Col Regs Rules 23-31 Lights Challenge",
      description: "Identify the Length",
      themeColor: 'red',
      quizKey: "23to31length",
      startScreenImage: "https://cafrank.pages.dev/services/navy-emblem.svg",
      studyGuide: "https://laws-lois.justice.gc.ca/eng/regulations/c.r.c.,_c._1416/FullText.html",
      factHeading: "",
      category: "Col Regs Rules 23-31",
      hidden: false
    },
    questions: [
    {
    id: 1,
    question: "What is the length of this vessel?",
    correctAnswer: ["May be 50 m or greater, if it is a power-driven vessel", "Less than 50 m, if it is a vessel engaged in towing (where the length of the overall tow does not exceed 200 m)"],
    answerPool: ["May be 50 m or greater, if it is a power-driven vessel",
      "Less than 50 m, if it is a power-driven vessel",
      "Less than 50 m, if it is a vessel engaged in towing (where the length of the overall tow does not exceed 200 m)",
      "May be 50 m or greater, if it is a vessel engaged in towing (where the length of the overall tow does not exceed 200 m)"],
    description: "23(a); 24(a), (d)",
    fact: "From a head-on aspect, you might not be able to tell whether you’re looking at a <strong>power-driven vessel that may be more than 50 m long</strong> or a <strong>vessel engaged in towing under 50 m</strong>. Their lights can look the same!",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q1.png"  // Place image in public/images/
    },
    {
    id: 2,
    question: "What is the length of this vessel?",
    correctAnswer: ["Unknown"],
    answerPool: ["Less than 50 m",
      "May be 50 m or greater",
      "Greater than 100 m",
      "Unknown"],
    description: "26(c)",
    fact: "The number and position of masthead lights help indicate the length of a vessel.",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q2.png"  // Place image in public/images/
    },
    {
    id: 3,
    question: "What is the length of this vessel?",
    correctAnswer: ["Unknown"],
    answerPool: ["Less than 50 m",
      "May be 50 m or greater",
      "Greater than 100 m",
      "Unknown"],
    description: "26(b); Annex II, 2(a), (c)",
    fact: "Trawlers 20 m or longer must show signals for shooting nets, hauling nets, or when nets are fast on an obstruction when fishing near other vessels engaged in fishing. Smaller trawlers may use these signals too. Annex II, 2(a), (c)",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q3.png"  // Place image in public/images/
    },
    {
    id: 4,
    question: "What is the length of this vessel?",
    correctAnswer: ["Less than 50 m"],
    answerPool: ["Less than 50 m",
      "May be 50 m or greater",
      "Greater than 100 m",
      "Unknown"],
    description: "23(b), (a)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q4.png"  // Place image in public/images/
    },
    {
    id: 5,
    question: "What is the length of this vessel?",
    correctAnswer: ["May be 50 m or greater"],
    answerPool: ["Less than 50 m",
      "May be 50 m or greater",
      "Greater than 100 m",
      "Unknown"],
    description: "28(a); 23(a)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q5.png"  // Place image in public/images/
    },
    {
    id: 6,
    question: "What is the length of this vessel?",
    correctAnswer: ["Towing vessel is less than 50 m; overall tow is 200 m or less; inconspicuous vessel/object is 100 m or less"],
    answerPool: ["Towing vessel is less than 50 m; overall tow is 200 m or less; inconspicuous vessel/object is 100 m or less",
      "Towing vessel may be 50 m or greater; overall tow is 200 m or less; inconspicuous vessel/object is greater than 100 m",
      "Towing vessel is less than 50 m; overall tow is greater than 200 m; inconspicuous vessel/object is 100 m or less",
      "Towing vessel may be 50 m or greater; overall tow is greater than 200 m; inconspicuous vessel/object is greater than 100 m"],
    description: "24(a), (d), (g)(iii); 23(a)",
    fact: "We can also tell that this inconspicuous vessel/object is less than 25 m wide because we don’t see two extra all-round white lights (which is required when the breadth is 25 m or more). Rule 24(g)(i)(ii)",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q6.png"  // Place image in public/images/
    },
    {
    id: 7,
    question: "What is the length of this vessel?",
    correctAnswer: ["Unknown"],
    answerPool: ["Less than 50 m",
      "May be 50 m or greater",
      "Greater than 100 m",
      "Unknown"],
    description: "26(b); Annex II, 2(a), (c)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q7.png"  // Place image in public/images/
    },
    {
    id: 8,
    question: "What is the length of this vessel?",
    correctAnswer: ["Towing vessel is less than 50 m; overall tow is 200 m or less; inconspicuous vessel/object is greater than 100 m"],
    answerPool: ["Towing vessel is less than 50 m; overall tow is 200 m or less; inconspicuous vessel/object is greater than 100 m",
      "Towing vessel may be 50 m or greater; overall tow is 200 m or less; inconspicuous vessel/object is greater than 100 m",
      "Towing vessel is less than 50 m; overall tow is greater than 200 m; inconspicuous vessel/object is 100 m or less",
      "Towing vessel may be 50 m or greater; overall tow is greater than 200 m; inconspicuous vessel/object is greater than 100 m"],
    description: "24(a), (d), (g)(iii); 23(a)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q8.png"  // Place image in public/images/
    },
    {
    id: 9,
    question: "What is the length of this vessel?",
    correctAnswer: ["Less than 50 m"],
    answerPool: ["Less than 50 m",
      "May be 50 m or greater",
      "Greater than 100 m",
      "Unknown"],
    description: "27(f); 23(a)",
    fact: "Three all-round green lights mean it’s <strong>dangerous to approach within 1,000 m</strong> of a mineclearance vessel. Rule 27(f)",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q9.png"  // Place image in public/images/
    },
    {
    id: 10,
    question: "What is the length of this vessel?",
    correctAnswer: ["May be 50 m or greater"],
    answerPool: ["Less than 50 m",
      "May be 50 m or greater",
      "Greater than 100 m",
      "Unknown"],
    description: "30(d), (a) ",
    fact: "Vessels aground <strong>don’t use deck-illuminating lights</strong>—those are reserved for vessels at anchor. Rule 30(d), (c)",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q10.png"  // Place image in public/images/
    },
    {
    id: 11,
    question: "What is the length of this vessel?",
    correctAnswer: ["Unknown"],
    answerPool: ["Less than 7 m",
      "Less than 20 m",
      "Greater than 50 m",
      "Unknown"],
    description: "25(a), (b), (d)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q11.png"  // Place image in public/images/
    },
    {
    id: 12,
    question: "What is the length of this vessel?",
    correctAnswer: ["Less than 50 m"],
    answerPool: ["Less than 50 m",
      "May be 50 m or greater",
      "Greater than 100 m",
      "Unknown"],
    description: "23(a)",
    fact: "Two masthead lights on a power-driven vessel may indicate it is 50 meters or longer—but not always. Vessels under 50 meters may also display a second masthead light, it’s optional for them. Rule 23(a)",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q12.png"  // Place image in public/images/
    },
    {
    id: 13,
    question: "What is the length of this vessel?",
    correctAnswer: ["Towing vessel is less than 50 m; overall tow is greater than 200 m; vessels/objects being towed is unknown"],
    answerPool: ["Towing vessel is less than 50 m; overall tow is greater than 200 m; vessels/objects being towed is unknown",
      "Towing vessel may be 50 m or greater; overall tow is 200 m or less; vessels/objects being towed is unknown",
      "Towing vessel is less than 50 m; overall tow is greater than 200 m; vessels/objects being towed is 100 m or less",
      "Towing vessel may be 50 m or greater; overall tow is greater than 200 m; vessels/objects being towed is greater than 100 m"],
    description: "24(a), (d), (e); 23(a)",
    fact: "Tow length is measured from the towing vessel’s bow to the stern of the last vessel or object being towed. If it’s over 200 m, the towing vessel must show <strong>three masthead lights in a vertical line</strong>. Rule 24(a)(i)",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q13.png"  // Place image in public/images/
    },
    {
    id: 14,
    question: "What is the length of this vessel?",
    correctAnswer: ["Unknown"],
    answerPool: ["Less than 50 m",
      "May be 50 m or greater",
      "Greater than 100 m",
      "Unknown"],
    description: "26(b); Annex II, 2(a), (c)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q14.png"  // Place image in public/images/
    },
    {
    id: 15,
    question: "What is the length of this vessel?",
    correctAnswer: ["Unknown"],
    answerPool: ["Less than 50 m",
      "May be 50 m or greater",
      "Greater than 100 m",
      "Unknown"],
    description: "27(a)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q15.png"  // Place image in public/images/
    },
    {
    id: 16,
    question: "What is the length of this vessel?",
    correctAnswer: ["Unknown"],
    answerPool: ["Less than 50 m",
      "May be 50 m or greater",
      "Greater than 100 m",
      "Unknown"],
    description: "27(b)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q16.png"  // Place image in public/images/
    },
    {
    id: 17,
    question: "What is the length of this vessel?",
    correctAnswer: ["Less than 20 m"],
    answerPool: ["Less than 20 m",
      "20 m",
      "Greater than 20 m",
      "Unknown"],
    description: "25(b)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q17.png"  // Place image in public/images/
    },
    {
    id: 18,
    question: "What is the length of this vessel?",
    correctAnswer: ["Pushing vessel is less than 50 m; pushed vessel is unknown"],
    answerPool: ["Pushing vessel is less than 50 m; pushed vessel is unknown",
      "Pushing vessel may be 50 m or greater; pushed vessel is unknown",
      "Pushing vessel is less than 50 m; pushed vessel is less than 50 m",
      "Pushing vessel may be 50 m or greater; pushed vessel is greater than 100 m"],
    description: "24(c), (d), (f)(i); 23(a)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q18.png"  // Place image in public/images/
    },
    {
    id: 19,
    question: "What is the length of this vessel?",
    correctAnswer: ["Unknown"],
    answerPool: ["Less than 20 m",
      "Less than 50 m",
      "May be 50 m or greater",
      "Unknown"],
    description: "26(c); Annex II, 3",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q19.png"  // Place image in public/images/
    },
    {
    id: 20,
    question: "What is the length of this vessel?",
    correctAnswer: ["Towing vessel is less than 50 m; overall tow is 200 m or less; vessel/object being towed is unknown"],
    answerPool: ["Towing vessel is less than 50 m; overall tow is 200 m or less; vessel/object being towed is unknown",
      "Towing vessel may be 50 m or greater; overall tow is 200 m or less; vessel/object being towed is unknown",
      "Towing vessel is less than 50 m; overall tow is greater than 200 m; vessel/object being towed is 100 m or less",
      "Towing vessel may be 50 m or greater; overall tow is greater than 200 m; vessel/object being towed is greater than 100 m"],
    description: "24(a), (d), (e); 23(a)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q20.png"  // Place image in public/images/
    },
    {
    id: 21,
    question: "What is the length of this vessel?",
    correctAnswer: ["Less than 50 m"],
    answerPool: ["Less than 50 m",
      "May be 50 m or greater",
      "Greater than 100 m",
      "Unknown"],
    description: "26(b)",
    fact: "Fishing vessels engaged in trawling have a unique lighting rule: <ul><li>If you see one masthead light, the vessel may be 50 m or longer.</li> <li>If you see none, it’s under 50 m.</li></ul> Rule 26(b)(ii)",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q21.png"  // Place image in public/images/
    },
    {
    id: 22,
    question: "What is the length of this vessel?",
    correctAnswer: ["Unknown"],
    answerPool: ["Less than 20 m",
      "Less than 50 m",
      "May be 50 m or greater",
      "Unknown"],
    description: "29(a)",
    fact: "When a pilot vessel is on duty, it doesn’t display masthead lights, making its length a mystery!",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q22.png"  // Place image in public/images/
    }
  ]
  },
  {
    config: {
      id: "23to31status",
      title: "Col Regs Rules 23-31 Lights Challenge",
      description: "Identify the Status of the Vessel",
      themeColor: 'red',
      quizKey: "23to31status",
      startScreenImage: "https://cafrank.pages.dev/services/navy-emblem.svg",
      studyGuide: "https://laws-lois.justice.gc.ca/eng/regulations/c.r.c.,_c._1416/FullText.html",
      factHeading: "",
      category: "Col Regs Rules 23-31",
      hidden: false
    },
    questions: [
    {
    id: 1,
    question: "This vessel is:",
    correctAnswer: ["Underway"],
    answerPool: ["Underway",
      "Underway but not making way",
      "Underway and making way",
      "At anchor"],
    description: "23(a); Title of Rule 23",
    fact: "For power-driven vessels, their lights only tell you that they are underway—not whether they are making way or not making way. A handy reminder: the rule is called <strong>Power-driven Vessels Underway</strong>. Rule 23",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q1.png"  // Place image in public/images/
    },
    {
    id: 2,
    question: "This vessel is:",
    correctAnswer: ["Underway and making way"],
    answerPool: ["Underway",
      "Underway but not making way",
      "Underway and making way",
      "At anchor"],
    description: "26(c)(iii)",
    fact: "Fishing vessels turn off their sidelights and sternlight when they aren’t making way. Rule 26(b), (c)",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q2.png"  // Place image in public/images/
    },
    {
    id: 3,
    question: "This vessel is:",
    correctAnswer: ["Underway but not making way"],
    answerPool: ["Underway",
      "Underway but not making way",
      "Underway and making way",
      "At anchor"],
    description: "Underway but not making way",
    fact: "Fishing vessels don’t follow the usual anchor light rule! Even when anchored, they keep the <strong>special lights and shapes for fishing</strong> (Rule 26), not the standard anchor lights and ball (Rule 30). This helps other vessels know they’re still engaged in fishing.",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q3.png"  // Place image in public/images/
    },
    {
    id: 4,
    question: "This vessel is:",
    correctAnswer: ["Underway"],
    answerPool: ["Underway",
      "Underway but not making way",
      "Underway and making way",
      "At anchor"],
    description: "23(b), (a)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q4.png"  // Place image in public/images/
    },
    {
    id: 5,
    question: "This vessel is:",
    correctAnswer: ["Underway"],
    answerPool: ["Underway",
      "Underway but not making way",
      "Underway and making way",
      "At anchor"],
    description: "28(b); 23(a)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q5.png"  // Place image in public/images/
    },
    {
    id: 6,
    question: "This vessel is:",
    correctAnswer: ["Underway"],
    answerPool: ["Underway",
      "Underway but not making way",
      "Underway and making way",
      "At anchor"],
    description: "24(a), (d); 23(a)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q6.png"  // Place image in public/images/
    },
    {
    id: 7,
    question: "This vessel is:",
    correctAnswer: ["Underway but not making way", "At anchor"],
    answerPool: ["Underway",
      "Underway but not making way",
      "Underway and making way",
      "At anchor"],
    description: "Underway but not making way",
    fact: "When vessels engaged in trawling are not making way through the water they will let us know by turning off their sidelights and sternlight. Rule 26(b)(iii)",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q7.png"  // Place image in public/images/
    },
    {
    id: 8,
    question: "This vessel is:",
    correctAnswer: ["Underway"],
    answerPool: ["Underway",
      "Underway but not making way",
      "Underway and making way",
      "At anchor"],
    description: "24(a), (d); 23(a)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q8.png"  // Place image in public/images/
    },
    {
    id: 9,
    question: "This vessel is:",
    correctAnswer: ["Underway"],
    answerPool: ["Underway",
      "Underway but not making way",
      "Underway and making way",
      "At anchor"],
    description: "27(f); 23(a); Title of Rule 23",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q9.png"  // Place image in public/images/
    },
    {
    id: 10,
    question: "This vessel is:",
    correctAnswer: ["Aground"],
    answerPool: ["Aground",
      "Underway but not making way",
      "Underway and making way",
      "At anchor"],
    description: "30(d)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q10.png"  // Place image in public/images/
    },
    {
    id: 11,
    question: "This vessel is:",
    correctAnswer: ["Underway"],
    answerPool: ["Underway",
      "Underway but not making way",
      "Underway and making way",
      "At anchor"],
    description: "25(a), Title of Rule 25",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q11.png"  // Place image in public/images/
    },
    {
    id: 12,
    question: "This vessel is:",
    correctAnswer: ["Underway"],
    answerPool: ["Underway",
      "Underway but not making way",
      "Underway and making way",
      "At anchor"],
    description: "23(a), Title of Rule 23",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q12.png"  // Place image in public/images/
    },
    {
    id: 13,
    question: "This vessel is:",
    correctAnswer: ["Underway"],
    answerPool: ["Underway",
      "Underway but not making way",
      "Underway and making way",
      "At anchor"],
    description: "24(a), (d); 23(a); Title of Rule 23",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q13.png"  // Place image in public/images/
    },
    {
    id: 14,
    question: "This vessel is:",
    correctAnswer: ["Underway", "At anchor"],
    answerPool: ["Underway",
      "Underway but not making way",
      "Underway and making way",
      "At anchor"],
    description: "26(a), (b)(iii)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q14.png"  // Place image in public/images/
    },
    {
    id: 15,
    question: "This vessel is:",
    correctAnswer: ["Underway but not making way"],
    answerPool: ["Underway",
      "Underway but not making way",
      "Underway and making way",
      "At anchor"],
    description: "27(a)(iii)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q15.png"  // Place image in public/images/
    },
    {
    id: 16,
    question: "This vessel is:",
    correctAnswer: ["Underway but not making way"],
    answerPool: ["Underway",
      "Underway but not making way",
      "Underway and making way",
      "At anchor"],
    description: "27(b)(iii)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q16.png"  // Place image in public/images/
    },
    {
    id: 17,
    question: "This vessel is:",
    correctAnswer: ["Underway"],
    answerPool: ["Underway",
      "Underway but not making way",
      "Underway and making way",
      "At anchor"],
    description: "25(a), Title of Rule 25",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q17.png"  // Place image in public/images/
    },
    {
    id: 18,
    question: "This vessel is:",
    correctAnswer: ["Underway"],
    answerPool: ["Underway",
      "Underway but not making way",
      "Underway and making way",
      "At anchor"],
    description: "24(c), (d); 23(a); Title of Rule 23",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q18.png"  // Place image in public/images/
    },
    {
    id: 19,
    question: "This vessel is:",
    correctAnswer: ["Underway and making way"],
    answerPool: ["Underway",
      "Underway but not making way",
      "Underway and making way",
      "At anchor"],
    description: "26(c)(iii)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q19.png"  // Place image in public/images/
    },
    {
    id: 20,
    question: "This vessel is:",
    correctAnswer: ["Underway"],
    answerPool: ["Underway",
      "Underway but not making way",
      "Underway and making way",
      "At anchor"],
    description: "24(a), (d); 23(a); Title of Rule 23",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q20.png"  // Place image in public/images/
    },
    {
    id: 21,
    question: "This vessel is:",
    correctAnswer: ["Underway and making way"],
    answerPool: ["Underway",
      "Underway but not making way",
      "Underway and making way",
      "At anchor"],
    description: "26(b)(iii)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q21.png"  // Place image in public/images/
    },
    {
    id: 22,
    question: "This vessel is:",
    correctAnswer: ["Underway"],
    answerPool: ["Underway",
      "Underway but not making way",
      "Underway and making way",
      "At anchor"],
    description: "29(a)(ii)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q22.png"  // Place image in public/images/
    }
  ]
  },
  {
    config: {
      id: "23to31vals",
      title: "Col Regs Rules 23-31 Lights Challenge",
      description: "Identify the Vessel, Aspect, Length, and Status",
      themeColor: 'red',
      quizKey: "23to31vals",
      startScreenImage: "https://cafrank.pages.dev/services/navy-emblem.svg",
      studyGuide: "https://laws-lois.justice.gc.ca/eng/regulations/c.r.c.,_c._1416/FullText.html",
      factHeading: "",
      category: "Col Regs Rules 23-31",
      hidden: false
    },
    questions: [
    {
    id: 1,
    question: "What is the length of this vessel?",
    correctAnswer: ["Power-driven vessel; head-on aspect; may be 50 m or greater in length; underway"],
    answerPool: ["Power-driven vessel; head-on aspect; may be 50 m or greater in length; underway",
      "Power-driven vessel; head-on aspect; less than 50 m in length",
      "Vessel pushing ahead another vessel; head-on aspect; length of the pushing vessel is less than 50 m in length",
      "Composite unit; head-on aspect; less than 50 m in length"],
    description: "23(a)",
    fact: "Two masthead lights don’t always mean a vessel is 50 m or longer. Smaller vessels can have two—but it’s rare because the second light must be at least <strong>4.5 m higher</strong> than the first, and most small vessels simply don’t have the structure for that. Annex II, 2(a)(ii)",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q1.png"  // Place image in public/images/
    },
    {
    id: 2,
    question: "This image represents a: ",
    correctAnswer: ["Vessel engaged in fishing, other than trawling; starboard aspect; underway and making way"],
    answerPool: ["Vessel engaged in fishing, other than trawling; starboard aspect; underway and making way",
      "Vessel engaged in trawling; starboard aspect; less than 50 m in length; underway and making way",
      "Vessel engaged in pilotage duties; starboard aspect; underway",
      "Power-driven vessel; head-on aspect; less than 50 m in length; underway"],
    description: "26(c)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q2.png"  // Place image in public/images/
    },
    {
    id: 3,
    question: "This image represents a: ",
    correctAnswer: ["Vessel engaged in trawling; net has come fast upon an obstruction; fishing in close proximity to other vessels engaged in fishing; underway but not making way or at anchor"],
    answerPool: ["Vessel engaged in trawling; net has come fast upon an obstruction; fishing in close proximity to other vessels engaged in fishing; underway but not making way or at anchor",
      "Vessel engaged in fishing, other than trawling; net has come fast upon an obstruction; fishing in close proximity to other vessels engaged in fishing; underway and making way",
      "Vessel not under command; starboard aspect; less than 50 m in length; underway and making way",
      "Vessel restricted in its ability to manoeuvre; safe to pass on its starboard side; head-on aspect; underway and making way"],
    description: "26(b), (d); Annex II, 2(a)(iii)",
    fact: "If you knew you were looking at the <strong>bow</strong> of a trawler, the missing masthead light would tell you the vessel is <strong>under 50 m</strong>. But if you don’t know which aspect you’re seeing, its length remains a mystery! Rule 26(b)(ii)",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q3.png"  // Place image in public/images/
    },
    {
    id: 4,
    question: "This image represents a: ",
    correctAnswer: ["Air cushion vessel in non-displacement mode; port aspect; less than 50 m in length; underway"],
    answerPool: ["Air cushion vessel in non-displacement mode; port aspect; less than 50 m in length; underway",
      "Vessel pushing ahead another vessel; port aspect; underway",
      "Composite unit; stern aspect; underway",
      "Vessel engaged in towing; stern aspect; underway and making way"],
    description: "23(b), (a)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q4.png"  // Place image in public/images/
    },
    {
    id: 5,
    question: "This image represents a: ",
    correctAnswer: ["Vessel constrained by its draught; starboard aspect; may be 50 m or greater in length; underway"],
    answerPool: ["Vessel constrained by its draught; starboard aspect; may be 50 m or greater in length; underway",
      "Vessel not under command; head-on aspect; may be 50 m or greater in length; underway and making way",
      "Vessel restricted in its ability to manoeuvre; starboard aspect; less than 50 m in length; underway and making way",
      "Vessel aground; starboard aspect; may be 50 m or greater in length; not underway"],
    description: "28(a); 23(a)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q5.png"  // Place image in public/images/
    },
    {
    id: 6,
    question: "This image represents a: ",
    correctAnswer: ["Vessel engaged in towing a partially submerged vessel/object; starboard aspect; towing vessel is less than 50 m in length; overall length of the tow is 200 m or less; inconspicuous vessel/object is 100 m or less in length, and less than 25 m in breadth; underway"],
    answerPool: ["Vessel engaged in towing a partially submerged vessel/object; starboard aspect; towing vessel is less than 50 m in length; overall length of the tow is 200 m or less; inconspicuous vessel/object is 100 m or less in length, and less than 25 m in breadth; underway",
      "Vessel engaged in towing; starboard aspect; towing vessel is less than 50 m in length; overall length of the tow is 200 m or less; underway",
      "Vessel engaged in towing alongside; head-on aspect; towing vessel may be 50 m or greater in length; underway and making way",
      "Vessel at anchor; stern aspect; may be 100 m or greater in length"],
    description: "24(a), (d), (g)(iii); 23(a)",
    fact: "During the day, inconspicuous vessels or objects can be hard to spot until you’re very close. That’s why they are always required to display a diamond shape near the end—it helps you see them from farther away.  Rule 24(g)(iv)",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q6.png"  // Place image in public/images/
    },
    {
    id: 7,
    question: "This image represents a: ",
    correctAnswer: ["Vessel engaged in trawling; shooting their nets; fishing in close proximity to other vessels engaged in fishing; underway but not making way or at anchor"],
    answerPool: ["Vessel engaged in trawling; shooting their nets; fishing in close proximity to other vessels engaged in fishing; underway but not making way or at anchor",
      "Vessel engaged in fishing, other than trawling; hauling their nets; fishing in close proximity to other vessels engaged in fishing; underway and making way",
      "Vessel engaged in trawling; hauling their nets; less than 50 m in length; underway but not making way or at anchor",
      "Vessels engaged in mineclearance operations; stern aspect; underway"],
    description: "Rule 26(b), (d); Annex II, 2(a)(i)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q7.png"  // Place image in public/images/
    },
    {
    id: 8,
    question: "This image represents a: ",
    correctAnswer: ["Vessel engaged in towing a partially submerged vessel/object; starboard aspect; towing vessel is less than 50 m in length; overall length of the tow is 200 m or less; inconspicuous vessel/object is greater than 100 m in length and less than 25 m in breadth; underway"],
    answerPool: ["Vessel engaged in towing a partially submerged vessel/object; starboard aspect; towing vessel is less than 50 m in length; overall length of the tow is 200 m or less; inconspicuous vessel/object is greater than 100 m in length and less than 25 m in breadth; underway",
      "Vessel engaged in towing; starboard aspect; towing vessel is less than 50 m in length; overall length of the tow is 200 m or less; underway",
      "Vessel engaged in towing alongside; head-on aspect; towing vessel may be 50 m or greater in length; underway and making way",
      "Vessel at anchor; stern aspect; may be 100 m or greater in length"],
    description: "24(a), (d), (g)(iii); 23(a)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q8.png"  // Place image in public/images/
    },
    {
    id: 9,
    question: "This image represents a: ",
    correctAnswer: ["Vessel engaged in mineclearance operations; head-on aspect; less than 50 m in length; underway"],
    answerPool: ["Vessel engaged in mineclearance operations; head-on aspect; less than 50 m in length; underway",
      "Vessel with an obstruction on its starboard side; stern aspect; underway and making way",
      "Vessel pushing ahead a barge; head-on aspect; less than 50 m in length; underway",
      "Vessel engaged in trawling; port aspect; may be greater than 50 m in length; underway and making way"],
    description: "27(f); 23(a)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q9.png"  // Place image in public/images/
    },
    {
    id: 10,
    question: "This image represents a: ",
    correctAnswer: ["Vessel aground; port aspect; may be greater than 50 m in length"],
    answerPool: ["Vessel aground; port aspect; may be greater than 50 m in length",
      "Vessel not under command at anchor; port aspect; may be greater than 50 m in length",
      "Vessel engaged in fishing at anchor; nets are fast upon an obstruction; fishing in close proximity to other vessels engaged in fishing;  stern aspect",
      "Vessel engaged in pilotage duties; starboard aspect; may be greater than 50 m in length; underway"],
    description: "30(d), (a)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q10.png"  // Place image in public/images/
    },
    {
    id: 11,
    question: "This image represents a: ",
    correctAnswer: ["Sailing vessel; head-on aspect; underway"],
    answerPool: ["Sailing vessel; head-on aspect; underway",
      "Vessel under oars; head-on aspect; less than 7 m in length; underway and making way",
      "Power-driven vessel; head-on aspect; less than 7 m in length whose maximum speed does not exceed 7 kts; underway",
      "Power-driven vessel; port aspect; less than 12 m in length; underway"],
    description: "25(a), (d)(ii)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q11.png"  // Place image in public/images/
    },
    {
    id: 12,
    question: "This image represents a: ",
    correctAnswer: ["Power-driven vessel; head-on aspect; less than 50 m in length; underway"],
    answerPool: ["Power-driven vessel; head-on aspect; less than 50 m in length; underway",
      "Vessel pushing ahead another vessel; starboard aspect; less than 50 m in length; underway and making way",
      "Vessel engaged in towing; head-on aspect; less than 50 m in length; underway",
      "Air cushion vessel in non-displacement mode; port aspect; underway but not making way"],
    description: "23(a)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q12.png"  // Place image in public/images/
    },
    {
    id: 13,
    question: "This image represents a: ",
    correctAnswer: ["Vessel engaged in towing two objects/vessels; port aspect; towing vessel is less than 50 m in length; overall length of the tow is greater than 200 m; underway"],
    answerPool: ["Vessel engaged in towing two objects/vessels; port aspect; towing vessel is less than 50 m in length; overall length of the tow is greater than 200 m; underway",
      "Vessel engaged in towing one object/vessel; port aspect; towing vessel is greater than 50 m in length; overall length of the tow is greater than 200 m; underway",
      "Vessel constrained by its draught; port aspect; may be greater than 50 m in length; underway and making way",
      "Vessel restricted in its ability to manoeuvre; port aspect; may be greater than 50 m in length; underway and making way"],
    description: "24(a), (d), (e); 23(a)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q13.png"  // Place image in public/images/
    },
    {
    id: 14,
    question: "This image represents a: ",
    correctAnswer: ["Vessel engaged in trawling; hauling their nets; fishing in close proximity to other vessels engaged in fishing; underway but not making way or at anchor"],
    answerPool: ["Vessel engaged in trawling; hauling their nets; fishing in close proximity to other vessels engaged in fishing; underway but not making way or at anchor",
      "Vessel engaged in fishing, other than trawling; hauling their nets; fishing in close proximity to other vessels engaged in fishing; underway and making way",
      "Vessel engaged in trawling; net has come fast upon an obstruction; fishing in close proximity to other vessels engaged in fishing; less than 50 m in length; underway but not making way or at anchor",
      "Vessels engaged in pilotage duties; stern aspect; underway"],
    description: "Rule 26(b), (d); Annex II, 2(a)(ii)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q14.png"  // Place image in public/images/
    },
    {
    id: 15,
    question: "This image represents a: ",
    correctAnswer: ["Vessel not under command; underway but not making way"],
    answerPool: ["Vessel not under command; underway but not making way",
      "Vessel engaged in trawling, net has come fast upon an obstruction; fishing in close proximity to other vessels engaged in fishing; underway but not making way",
      "Vessel constrained by its draught; underway",
      "Vessel restricted in its ability to manoeuvre; underway and making way"],
    description: "Rule 27(a)",
    fact: "Vessels Not Under Command (NUC) aren’t the same as vessels Restricted in their Ability to Manoeuvre (RAM). NUC vessels are limited in their manoeuvrability due to exceptional circumstances—like a steering gear. Rule 3(f)",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q15.png"  // Place image in public/images/
    },
    {
    id: 16,
    question: "This image represents a: ",
    correctAnswer: ["Vessel restricted in its ability to manoeuvre; underway and but not making way"],
    answerPool: ["Vessel restricted in its ability to manoeuvre; underway and but not making way",
      "Vessel not under command; underway but not making way",
      "Vessel engaged in fishing, net has come fast upon an obstruction; fishing in close proximity to other vessels engaged in fishing; underway and making way",
      "Vessel constrained by its draught; underway"],
    description: "Rule 27(b)",
    fact: "Vessels Restricted in their Ability to Manoeuvre (RAM) aren’t the same as vessels Not Under Command (NUC). RAM vessels are limited in their manoeuvrability because of their work—like diving operations, laying submarine cables, or doing underwater surveys. Rule 3(g)",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q16.png"  // Place image in public/images/
    },
    {
    id: 17,
    question: "This image represents a: ",
    correctAnswer: ["Sailing vessel; head-on aspect; less than 20 m in length; underway"],
    answerPool: ["Sailing vessel; head-on aspect; less than 20 m in length; underway",
      "Vessel under sail and being propelled by machinery; head-on aspect; less than 20 m in length; underway",
      "Power-driven vessel; head-on aspect; less than 7 m in length whose maximum speed does not exceed 7 kts; underway",
      "Vessel that is not identified in the Rules"],
    description: "25(a)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q17.png"  // Place image in public/images/
    },
    {
    id: 18,
    question: "This image represents a:",
    correctAnswer: ["Vessel pushing ahead; starboard aspect; pushing vessel is less than 50 m in length; underway"],
    answerPool: ["Vessel pushing ahead; starboard aspect; pushing vessel is less than 50 m in length; underway",
      "Vessel engaged in towing one object/vessel; starboard aspect; towing vessel is less than 50 m in length; overall length of the tow is 200 m or less; underway and making way",
      "Vessel engaged in towing two objects/vessels; starboard aspect; towing vessel is less than 50 m in length; overall length of the tow is 200 m or less; underway",
      "Vessel towing alongside; head-on aspect; towing vessel may be greater than 50 m in length; underway but not making way"],
    description: "24(c), (d), (f)(i); 23(a)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q18.png"  // Place image in public/images/
    },
    {
    id: 19,
    question: "This image represents a: ",
    correctAnswer: ["Vessel engaged in purse seining; hampered by its fishing gear; fishing in close proximity to other vessels engaged in fishing; port aspect; underway and making way"],
    answerPool: ["Vessel engaged in purse seining; hampered by its fishing gear; fishing in close proximity to other vessels engaged in fishing; port aspect; underway and making way",
      "Vessel engaged in trawling; hampered by its fishing gear; fishing in close proximity to other vessels engaged in fishing; port aspect; less than 50 m in length; underway and making way",
      "Vessel engaged in pilotage duties; port aspect; underway",
      "Vessel restricted in its ability to manoeuvre; at anchor"],
    description: "26(c), (d); Annex II, 3",
    fact: "When you see two yellow lights flashing alternately every second, it signals that a purse seiner is hampered by its gear. Annex II, 3",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q19.png"  // Place image in public/images/
    },
    {
    id: 20,
    question: "This image represents a: ",
    correctAnswer: ["Vessel engaged in towing one object/vessel; starboard aspect; towing vessel is less than 50 m in length; overall length of the tow is 200 m or less; underway"],
    answerPool: ["Vessel engaged in towing one object/vessel; starboard aspect; towing vessel is less than 50 m in length; overall length of the tow is 200 m or less; underway",
      "Vessel engaged in towing two objects/vessels; starboard aspect; towing vessel is greater than 50 m in length; overall length of the tow is 200 m or less; underway",
      "Vessel engaged in trawling that is shooting its nets; starboard aspect; less than 50 m in length; underway and making way",
      "Vessel at anchor; starboard aspect; may be greater than 50 m in length"],
    description: "24(a), (d), (e); 23(a)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q20.png"  // Place image in public/images/
    },
    {
    id: 21,
    question: "This image represents a: ",
    correctAnswer: ["Vessel engaged in trawling; port aspect; less than 50 m in length; underway and making way"],
    answerPool: ["Vessel engaged in trawling; port aspect; less than 50 m in length; underway and making way",
      "Vessel engaged in fishing, other than trawling; port aspect; underway and making way",
      "Vessel engaged in surveying; starboard aspect; underway",
      "Power-driven vessel; head-on aspect; less than 50 m in length; underway"],
    description: "26(c)",
    fact: "",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q21.png"  // Place image in public/images/
    },
    {
    id: 22,
    question: "This image represents a: ",
    correctAnswer: ["Vessel engaged in pilotage duties; starboard aspect; underway"],
    answerPool: ["Vessel engaged in pilotage duties; starboard aspect; underway",
      "Vessel engaged in fishing, other than trawling; starboard aspect; underway and making way",
      "Vessel restricted in its ability to manoeuvre; starboard aspect; underway and making way",
      "Vessel pushing ahead; starboard aspect; may be 50 m or greater in length; underway"],
    description: "29(a)",
    fact: "Off duty, a pilot vessel follows the same lighting rules as other vessels of its length. E.g., a power-driven one would turn off its all-round white-over-red lights, turn on its masthead light(s), and keep its sidelights and sternlight on. Rule 29(b), Rule 23(a)",
    imageUrl: "https://raw.githubusercontent.com/albertchouforces/sample/refs/heads/main/images/Q22.png"  // Place image in public/images/
    }
  ]
  },
  {
    config: {
      id: "32to34sounds",
      title: "Col Regs Rules 32-34 Sound Signals Challenge",
      description: "Test your knowledge of Col Regs Rules 32 to 34",
      themeColor: 'blue',
      quizKey: "32to34sounds",
      startScreenImage: "https://cafrank.pages.dev/services/navy-emblem.svg",
      studyGuide: "https://laws-lois.justice.gc.ca/eng/regulations/c.r.c.,_c._1416/FullText.html",
      factHeading: "Additional Information",
      category: "Col Regs Rules 32-34",
      hidden: false
    },
    questions: [
      {
        id: 1,
        question: "The term <strong>short blast</strong> means a blast of:",
        correctAnswer: "about 1 second in duration",      
        answerPool: [
                      "about 1 second in duration", 
                      "about 2 seconds in duration",
                      "about 3 seconds in duration",
                      "about 4 seconds in duration",
                      "about 5 seconds in duration"
                    ],
        description: "",
        fact: "Rule 32(b)",
        factAudioUrl: "https://github.com/albertchouforces/sample/raw/refs/heads/main/sounds/1_Short_Blast.mp3",
      },
      {
        id: 2,
        question: "The term <strong>prolonged blast</strong> means a blast of:",
        correctAnswer: "4 – 6 seconds in duration",      
        answerPool: [
                      "2 – 4 seconds in duration", 
                      "3 – 4 seconds in duration",
                      "4 – 6 seconds in duration",
                      "5 – 7 seconds in duration"
                    ],      
        description: "",
        fact: "Rule 32(c)",
        factAudioUrl: "https://github.com/albertchouforces/sample/raw/refs/heads/main/sounds/2_Prolonged_Blast%20.mp3",
      },
      {
        id: 3,
        question: "A vessel <strong>12 m or more</strong> in length:",
        correctAnswer: "shall have a whistle",
        answerPool: [
                      "shall have a whistle",
                      "shall have a bell",
                      "shall have a gong",
                      "shall have some other means of making an efficient sound signal if it does not have a whistle"    
                    ],
        description: "",
        fact: "Rule 33(a)",
        factAudioUrl: "https://github.com/albertchouforces/sample/raw/refs/heads/main/sounds/1_Short_Blast.mp3",
      },
      {
        id: 4,
        question: "A vessel <strong>20 m or more</strong> in length:",
        correctAnswer: [
                        "shall have a whistle",
                        "shall have a bell"
                      ],
        answerPool: [
                      "shall have a whistle",
                      "shall have a bell",
                      "shall have a gong",
                      "shall have some other means of making an efficient sound signal if it does not have a whistle"    
                    ],
        description: "",
        fact: "Rule 33(a)",
        factAudioUrl: [
                        ["Whistle", "https://github.com/albertchouforces/sample/raw/refs/heads/main/sounds/1_Short_Blast.mp3"], 
                        ["Bell", "https://raw.githubusercontent.com/albertchouforces/sample/main/sounds/Bell.mp3"]
                      ],
      },
      {
        id: 5,
        question: "A vessel <strong>100 m or more</strong> in length:",
        correctAnswer: [
                        "shall have a whistle",
                        "shall have a bell",
                        "shall have a gong"
                      ],
        answerPool: [
                      "shall have a whistle",
                      "shall have a bell",
                      "shall have a gong",
                      "shall have some other means of making an efficient sound signal if it does not have a whistle"    
                    ],
        description: "",
        fact: "Rule 33(a)",
        factAudioUrl: [
                        ["Whistle", "https://github.com/albertchouforces/sample/raw/refs/heads/main/sounds/1_Short_Blast.mp3"], 
                        ["Bell", "https://raw.githubusercontent.com/albertchouforces/sample/main/sounds/Bell.mp3"],
                        ["Gong", "https://raw.githubusercontent.com/albertchouforces/sample/main/sounds/Gong.mp3"]
                      ],
      },
      {
        id: 6,
        question: "A vessel <strong>less than 12 m</strong> in length:",
        correctAnswer: [
                        "may have a whistle",
                        "shall have some other means of making an efficient sound signal if it does not have a whistle"
                      ],
        answerPool: [
                      "may have a whistle",
                      "shall have some other means of making an efficient sound signal if it does not have a whistle",
                      "shall have a bell",
                      "shall have a gong"
                    ],
        description: "",
        fact: "Rule 33(b)",
        factAudioUrl: [
                        ["Whistle", "https://github.com/albertchouforces/sample/raw/refs/heads/main/sounds/1_Short_Blast.mp3"],
                        ["Air Horn", "https://raw.githubusercontent.com/albertchouforces/sample/main/sounds/Airhorn.mp3"]
                      ]
      },
      {
        id: 7,
        question: "When vessels are in sight of one another, which vessels underway must signal their manoeuvre as required by the Rules?",
        correctAnswer: "power-driven vessels",
        answerPool: [
                      "power-driven vessels",
                      "sailing vessels",
                      "vessels engaged in fishing",
                      "vessel restricted in their ability to manoeuvre (RAM)"
                    ],
        description: "",
        fact: "Rule 34(a)",
        factAudioUrl: "",
      },
      {
        id: 8,
        question: "When <strong>vessels are in sight of one another</strong> this sound signal represents:",
        correctAnswer: "an alteration of course to starboard",
        answerPool: [
                      "an alteration of course to port",
                      "operating astern propulsion",
                      "an alteration of course to starboard",
                      "failure to understand the intentions/actions of the other vessel",
                      "in doubt that sufficient action is being taken by the other vessel to avoid collision"
                    ],
        description: "",
        fact: "Rule 34(a)",
        audioUrl: "https://raw.githubusercontent.com/albertchouforces/sample/main/sounds/1_AC_Crse_Stbd.mp3",
      },
      {
        id: 9,
        question: "When <strong>vessels are in sight of one another</strong> this sound signal represents:",
        correctAnswer: "an alteration of course to port",
        answerPool: [
                      "an alteration of course to port",
                      "operating astern propulsion",
                      "an alteration of course to starboard",
                      "failure to understand the intentions/actions of the other vessel",
                      "in doubt that sufficient action is being taken by the other vessel to avoid collision"
                    ],
        description: "",
        fact: "Rule 34(a)",
        audioUrl: "https://raw.githubusercontent.com/albertchouforces/sample/main/sounds/2_AC_Crse_Port.mp3",
      },
      {
        id: 10,
        question: "When <strong>vessels are in sight of one another</strong> this sound signal represents:",
        correctAnswer: "operating astern propulsion",
        answerPool: [
                      "an alteration of course to port",
                      "operating astern propulsion",
                      "an alteration of course to starboard",
                      "failure to understand the intentions/actions of the other vessel",
                      "in doubt that sufficient action is being taken by the other vessel to avoid collision"
                    ],
        description: "",
        fact: "Rule 34(a)",
        audioUrl: "https://raw.githubusercontent.com/albertchouforces/sample/main/sounds/3_Astern_Prop.mp3",
      },
      {
        id: 11,
        question: "When <strong>vessels are in sight of one another</strong> this sound signal represents:",
        correctAnswer: "the intention to overtake another vessel on its starboard side when in a narrow channel or fairway",
        answerPool: [
                      "the intention to overtake another vessel on its starboard side in any body of water",
                      "the intention to overtake another vessel on its starboard side when in a narrow channel or fairway",
                      "the intention to overtake another vessel on its port side in any body of water",
                      "the intention to overtake another vessel on its port side when in a narrow channel or fairway"
                    ],
        description: "",
        fact: "Rule 34(c)(i)",
        audioUrl: "https://raw.githubusercontent.com/albertchouforces/sample/main/sounds/4_Overtake_Stbd.mp3",
      },
      {
        id: 12,
        question: "When <strong>vessels are in sight of one another</strong> this sound signal represents:",
        correctAnswer: "the intention to overtake another vessel on its port side when in a narrow channel or fairway",
        answerPool: [
                      "the intention to overtake another vessel on its starboard side in any body of water",
                      "the intention to overtake another vessel on its starboard side when in a narrow channel or fairway",
                      "the intention to overtake another vessel on its port side in any body of water",
                      "the intention to overtake another vessel on its port side when in a narrow channel or fairway"
                    ],
        description: "",
        fact: "Rule 34(c)(i)",
        audioUrl: "https://raw.githubusercontent.com/albertchouforces/sample/main/sounds/5_Overtake_Port.mp3",
      },
      {
        id: 13,
        question: "When <strong>vessels are in sight of one another</strong> this sound signal represents:",
        correctAnswer: "the agreement response from a vessel about to be overtaken in a narrow channel or fairway",
        answerPool: [
                      "the agreement response from a vessel about to be overtaken in any body of water",
                      "the agreement response from a vessel about to be overtaken in a narrow channel or fairway",
                      "the intention to overtake another vessel on its starboard side when in a narrow channel or fairway",
                      "the intention to overtake another vessel on its starboard side in any body of water"
                    ],
        description: "",
        fact: "Rule 34(c)(ii)",
        audioUrl: "https://github.com/albertchouforces/sample/raw/refs/heads/main/sounds/6_Overtaking%20Narrow%20Channel%20Fairway%20Agreement%20Signal_V2.m4a",
      },
      {
        id: 14,
        question: "When <strong>vessels are in sight of one another</strong> this sound signal represents:",
        correctAnswer: [
                        "in doubt that sufficient action is being taken by the other vessel to avoid collision",
                        "failure to understand the intentions/actions of the other vessel "
                      ],
        answerPool: [
                      "an alteration of course to port",
                      "operating astern propulsion",
                      "an alteration of course to starboard",
                      "in doubt that sufficient action is being taken by the other vessel to avoid collision",
                      "failure to understand the intentions/actions of the other vessel "
                    ],
        description: "",
        fact: "Rule 34(d)",
        audioUrl: "https://raw.githubusercontent.com/albertchouforces/sample/main/sounds/7_Warning_Wake-Up_Signal_5_short.mp3",
      },
      {
        id: 15,
        question: "When <strong>vessels are in sight of one another</strong> this sound signal represents:",
        correctAnswer: [
                        "in doubt that sufficient action is being taken by the other vessel to avoid collision",
                        "failure to understand the intentions/actions of the other vessel "
                      ],
        answerPool: [
                      "an alteration of course to port",
                      "operating astern propulsion",
                      "an alteration of course to starboard",
                      "in doubt that sufficient action is being taken by the other vessel to avoid collision",
                      "failure to understand the intentions/actions of the other vessel "
                    ],
        description: "",
        fact: "Rule 34(d)",
        audioUrl: "https://raw.githubusercontent.com/albertchouforces/sample/main/sounds/8_Warning_Wake-Up_Signal_+5.mp3",
      },
      {
        id: 16,
        question: "When in <strong>clear visibility</strong> this sound signal represents:",
        correctAnswer: "a vessel nearing a bend or an area of a channel or fairway where other vessels may be obscured by an intervening obstruction",
        answerPool: [
                      "a power-driven vessel underway and making way",
                      "a vessel nearing a bend or an area of a channel or fairway where other vessels may be obscured by an intervening obstruction",
                      "an alteration of course to starboard",
                      "I intend to leave you on your port side"
                    ],
        description: "",
        fact: "Rule 34(e)",
        audioUrl: "https://raw.githubusercontent.com/albertchouforces/sample/main/sounds/2_Prolonged_Blast%20.mp3",
      },
    ]
  },
  {
    config: {
      id: "32to34auditory",
      title: "Col Regs Rules 32-34 Auditory Recognition Challenge",
      description: "Test your knowledge of Col Regs Rules 32 to 34",
      themeColor: 'blue',
      quizKey: "32to34auditory",
      startScreenImage: "https://cafrank.pages.dev/services/navy-emblem.svg",
      studyGuide: "https://laws-lois.justice.gc.ca/eng/regulations/c.r.c.,_c._1416/FullText.html",
      factHeading: "Rule reference(s)",
      category: "Col Regs Rules 32-34",
      hidden: false
    },
    questions: [
      {
        id: 1,
        question: "Match the sound signal with the correct definition.",
        correctAnswer: [
                        ["https://github.com/albertchouforces/sample/raw/refs/heads/main/sounds/1_Short_Blast.mp3", "Short Blast"],
                        ["https://github.com/albertchouforces/sample/raw/refs/heads/main/sounds/2_Prolonged_Blast%20.mp3", "Prolonged Blast"],
                        ["https://github.com/albertchouforces/sample/raw/refs/heads/main/sounds/Incorrect%20duration%20for%20short%20or%20prolonged%20blast.m4a", "This sound signal does not meet the criteria to be considered a short or prolonged blast"]
                        ],
        description: "",
        fact: "32(b); 32(c); 32(b), (c)"
      },
      {
        id: 2,
        question: "Match the length of the vessel with the correct sound-signalling device(s).",
        correctAnswer: [
                        [["https://github.com/albertchouforces/sample/raw/refs/heads/main/sounds/1_Short_Blast.mp3", "https://raw.githubusercontent.com/albertchouforces/sample/main/sounds/Airhorn.mp3"], "less than 12 m "],
                        [["https://github.com/albertchouforces/sample/raw/refs/heads/main/sounds/1_Short_Blast.mp3"], "12 m or more"],
                        [["https://github.com/albertchouforces/sample/raw/refs/heads/main/sounds/1_Short_Blast.mp3", "https://raw.githubusercontent.com/albertchouforces/sample/main/sounds/Bell.mp3"], "20 m or more"],
                        [["https://github.com/albertchouforces/sample/raw/refs/heads/main/sounds/1_Short_Blast.mp3", "https://raw.githubusercontent.com/albertchouforces/sample/main/sounds/Bell.mp3", "https://raw.githubusercontent.com/albertchouforces/sample/main/sounds/Gong.mp3"], "100 m or more"]
                        ],
        description: "",
        fact: "33(a); 33(b)"
      },
      {
        id: 3,
        question: "You are <strong>in sight</strong> of another vessel. Match the sound signal with the correct action/explanation.",
        correctAnswer: [
                        ["https://github.com/albertchouforces/sample/raw/refs/heads/main/sounds/1_AC_Crse_Stbd.mp3", "an alteration of course to starboard"],
                        ["https://github.com/albertchouforces/sample/raw/refs/heads/main/sounds/2_AC_Crse_Port.mp3", "an alteration of course to port"],
                        ["https://github.com/albertchouforces/sample/raw/refs/heads/main/sounds/3_Astern_Prop.mp3", "operating astern propulsion"],
                        ["https://github.com/albertchouforces/sample/raw/refs/heads/main/sounds/7_Warning_Wake-Up_Signal_5_short.mp3", "failure to understand the intentions/actions of the other vessel <strong>OR</strong> in doubt that sufficient action is being taken by the other vessel to avoid collision"]
        ],
        description: "",
        fact: "34(a); 34(d)"
      },
      {
        id: 4,
        question: "You are <strong>in sight</strong> of another vessel. Match the sound signal with the correct action/response.",
        correctAnswer: [
                        ["https://github.com/albertchouforces/sample/raw/refs/heads/main/sounds/4_Overtake_Stbd.mp3", "the intention to overtake another vessel on its starboard side when in a narrow channel or fairway"],
                        ["https://github.com/albertchouforces/sample/raw/refs/heads/main/sounds/5_Overtake_Port.mp3", "the intention to overtake another vessel on its port side when in a narrow channel or fairway"],
                        ["https://github.com/albertchouforces/sample/raw/refs/heads/main/sounds/6_Overtaking%20Narrow%20Channel%20Fairway%20Agreement%20Signal_V2.m4a", "the agreement response from a vessel about to be overtaken in a narrow channel or fairway"],
                        ["https://github.com/albertchouforces/sample/raw/refs/heads/main/sounds/Warning%20Signal_7%20Short%20Blasts.m4a", "the “in doubt” response from a vessel about to be overtaken in a narrow channel or fairway"]
                      ],
        description: "",
        fact: "34(c)(i); 34(c)(ii); 34(d)"
      },
      {
        id: 5,
        question: "You are <strong>in sight</strong> of another vessel <strong>and/or in clear visibility</strong>. Match the sound signal with the correct action/response.",
        correctAnswer: [
                        ["https://github.com/albertchouforces/sample/raw/refs/heads/main/sounds/2_Prolonged_Blast%20.mp3", "a vessel nearing a bend or an area of a channel or fairway where other vessels may be obscured by an intervening obstruction <strong>OR</strong> the response from any approaching vessel that may be within hearing around a bend or behind an intervening obstruction"],
                        ["https://raw.githubusercontent.com/albertchouforces/sample/main/sounds/8_Warning_Wake-Up_Signal_+5.mp3", "failure to understand the intentions/actions of the other vessel <strong>OR</strong> in doubt that sufficient action is being taken by the other vessel to avoid collision"],
                        ["https://github.com/albertchouforces/sample/raw/refs/heads/main/sounds/4_Overtake_Stbd.mp3", "the intention to overtake another vessel on its starboard side when in a narrow channel or fairway"],
                        ["https://github.com/albertchouforces/sample/raw/refs/heads/main/sounds/5_Overtake_Port.mp3", "the intention to overtake another vessel on its port side when in a narrow channel or fairway"],
                        ["https://github.com/albertchouforces/sample/raw/refs/heads/main/sounds/6_Overtaking%20Narrow%20Channel%20Fairway%20Agreement%20Signal_V2.m4a", "the agreement response from a vessel about to be overtaken in a narrow channel or fairway"]
                      ],
        description: "",
        fact: "34(c)(i); 34(c)(ii); 34(d); 34(e);"
      },
    ]
  },
];

/*
      {
        id: 5,
        question: "Match the sound signal with its correct use.",
        correctAnswer: [
                        ["a vessel nearing a bend or an area of a channel or fairway where other vessels may be obscured by an intervening obstruction","https://github.com/albertchouforces/sample/raw/refs/heads/main/sounds/2_Prolonged_Blast%20.mp3"],
                        ["the response from any approaching vessel that may be within hearing around a bend or behind an intervening obstruction","https://github.com/albertchouforces/sample/raw/refs/heads/main/sounds/2_Prolonged_Blast%20.mp3"],
                        ["Distractor #1","https://github.com/albertchouforces/sample/raw/refs/heads/main/sounds/7_Warning_Wake-Up_Signal_5_short.mp3"],
                        ["Distractor #2","https://github.com/albertchouforces/sample/raw/refs/heads/main/sounds/6_Overtaking%20Narrow%20Channel%20Fairway%20Agreement%20Signal_V2.m4a"]
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
