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

// Collection of all available quizzes
export const QUIZ_COLLECTION: QuizDefinition[] = [
  {
    config: {
      id: "32to34sounds",
      title: "Col Regs Rules 32-34 Sound Signals Challenge",
      description: "Test your knowledge of Col Regs Rules 32 to 34",
      themeColor: 'emerald',
      quizKey: "32to34sounds",
      startScreenImage: "https://cafrank.pages.dev/services/navy-emblem.svg",
      studyGuide: "https://laws-lois.justice.gc.ca/eng/regulations/c.r.c.,_c._1416/FullText.html",
      factHeading: "Additional Information",
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
        factAudioUrl: "https://raw.githubusercontent.com/albertchouforces/sample/d812ee16fd0a96a7643b821e8bc97fae05a4beb9/sounds/1_Short_Blast.mp3",
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
        factAudioUrl: "https://raw.githubusercontent.com/albertchouforces/sample/main/sounds/2_Prolonged_Blast%20.mp3",
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
        factAudioUrl: "https://raw.githubusercontent.com/albertchouforces/sample/d812ee16fd0a96a7643b821e8bc97fae05a4beb9/sounds/1_Short_Blast.mp3",
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
                        ["Whistle", "https://raw.githubusercontent.com/albertchouforces/sample/d812ee16fd0a96a7643b821e8bc97fae05a4beb9/sounds/1_Short_Blast.mp3"], 
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
                        ["Whistle", "https://raw.githubusercontent.com/albertchouforces/sample/d812ee16fd0a96a7643b821e8bc97fae05a4beb9/sounds/1_Short_Blast.mp3"], 
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
                        ["Whistle", "https://raw.githubusercontent.com/albertchouforces/sample/d812ee16fd0a96a7643b821e8bc97fae05a4beb9/sounds/1_Short_Blast.mp3"],
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
        question: "When <strong>vessels are in sight of one another this sound signal represents:",
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
        audioUrl: "https://raw.githubusercontent.com/albertchouforces/sample/main/sounds/OvertakingAgreement.mp3",
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
        question: "When in <strong>clear visibility</strong> this sound signal represents:  ",
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
      studyGuide: "",
      hidden: true
    },
    questions: [
      {
        id: 1,
        question: "Match the sound signal with the correct definition.",
        correctAnswer: [
                        ["Short Blast", "https://raw.githubusercontent.com/albertchouforces/sample/d812ee16fd0a96a7643b821e8bc97fae05a4beb9/sounds/1_Short_Blast.mp3"],
                        ["Prolonged Blast", "https://raw.githubusercontent.com/albertchouforces/sample/main/sounds/2_Prolonged_Blast%20.mp3"]
                        ],
        description: "",
        fact: ""
      },
      {
        id: 2,
        question: "Match the length of the vessel with the correct sound signaling device(s).",
        audioUrl: "https://raw.githubusercontent.com/albertchouforces/sample/main/sounds/2_Prolonged_Blast%20.mp3",
        correctAnswer: [
                        ["less than 12 m ", [["Whistleeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee","https://raw.githubusercontent.com/albertchouforces/sample/d812ee16fd0a96a7643b821e8bc97fae05a4beb9/sounds/1_Short_Blast.mp3"], ["https://raw.githubusercontent.com/albertchouforces/sample/main/sounds/Airhorn.mp3"]]],
                        ["12 m or more", "https://raw.githubusercontent.com/albertchouforces/sample/d812ee16fd0a96a7643b821e8bc97fae05a4beb9/sounds/1_Short_Blast.mp3"],
                        ["20 m or more", ["Whistle", "https://raw.githubusercontent.com/albertchouforces/sample/d812ee16fd0a96a7643b821e8bc97fae05a4beb9/sounds/1_Short_Blast.mp3", "https://raw.githubusercontent.com/albertchouforces/sample/main/sounds/Bell.mp3"]],
                        ["100 m or more", ["https://raw.githubusercontent.com/albertchouforces/sample/d812ee16fd0a96a7643b821e8bc97fae05a4beb9/sounds/1_Short_Blast.mp3", "https://raw.githubusercontent.com/albertchouforces/sample/main/sounds/Bell.mp3", "https://raw.githubusercontent.com/albertchouforces/sample/main/sounds/Gong.mp3"]]
                        ],
        description: "",
        fact: ""
      }
    ]
  },
  {
    config: {
      id: "32to34auditorytest",
      title: "Col Regs Rules 32-34 Auditory Recognition Challenge",
      description: "Test your knowledge of Col Regs Rules 32 to 34",
      themeColor: 'blue',
      quizKey: "32to34auditorytest",
      startScreenImage: "https://cafrank.pages.dev/services/navy-emblem.svg",
      studyGuide: "",
      hidden: true
    },
    questions: [
      {
        id: 1,
        question: "Match the sound signal with the correct definition.",
        audioUrl: "https://raw.githubusercontent.com/albertchouforces/sample/d812ee16fd0a96a7643b821e8bc97fae05a4beb9/sounds/1_Short_Blast.mp3",
        correctAnswer: "short blast",
        description: "Rule 32(b)",
        fact: ""
      },
      {
        id: 2,
        question: "What is the definition of this sound signal?",
        audioUrl: "https://raw.githubusercontent.com/albertchouforces/sample/main/sounds/2_Prolonged_Blast%20.mp3",
        correctAnswer: "prolonged blast",
        description: "Rule 32(c)",
        fact: ""
      },
      {
        id: 3,
        question: "What does this sound signal for the vessel length?",
        audioUrl: "",
        correctAnswer: [ 
                        "less than 12 m",
                        "12 m or more",
                        "20 m or more",
                        "100 m or more"
                       ],
        description: "Rule 33(b)",
        fact: ""
      },
      {
        id: 4,
        question: "What does this sound signal for the vessel length?",
        audioUrl: "",
        correctAnswer: [
                        "12 m or more",
                        "less than 12 m",
                        "20 m or more",
                        "100 m or more"
                       ],
        description: "Rule 33(a)",
        fact: ""
      },
      {
        id: 5,
        question: "What does this sound signal for the vessel length?",
        audioUrl: "",
        correctAnswer: [
                        "20 m or more", 
                        "less than 12 m",
                        "12 m or more",
                        "100 m or more"
                       ],
        description: "Rule 33(a)",
        fact: ""
      },
      {
        id: 6,
        question: "What does this sound signal for the vessel length?",
        audioUrl: "",
        correctAnswer: [
                        "100 m or more",
                        "20 m or more", 
                        "less than 12 m",
                        "12 m or more"
                       ],
        description: "Rule 33(a)",
        fact: ""
      },
      {
        id: 7,
        question: "What is the action/explanation for this sound signal?",
        audioUrl: "https://raw.githubusercontent.com/albertchouforces/sample/main/sounds/1_AC_Crse_Stbd.mp3",
        correctAnswer: [
                        "an alteration of course to starboard",
                        "an alteration of course to port", 
                        "operating astern propulsion",
                        "failure to understand the intentions/actions of the other vessel",
                        "in doubt that sufficient action is being taken by the other vessel to avoid collision"
                       ],
        description: "Rule 34(a)",
        fact: ""
      },
      {
        id: 8,
        question: "What is the action/explanation for this sound signal?",
        audioUrl: "https://raw.githubusercontent.com/albertchouforces/sample/main/sounds/2_AC_Crse_Port.mp3",
        correctAnswer: [
                        "an alteration of course to port", 
                        "operating astern propulsion",
                        "failure to understand the intentions/actions of the other vessel",
                        "in doubt that sufficient action is being taken by the other vessel to avoid collision",
                        "an alteration of course to starboard"
                       ],
        description: "Rule 34(a)",
        fact: ""
      },
      {
        id: 9,
        question: "What is the action/explanation for this sound signal?",
        audioUrl: "https://raw.githubusercontent.com/albertchouforces/sample/main/sounds/3_Astern_Prop.mp3",
        correctAnswer: [
                        "operating astern propulsion",
                        "failure to understand the intentions/actions of the other vessel",
                        "in doubt that sufficient action is being taken by the other vessel to avoid collision",
                        "an alteration of course to starboard",
                        "an alteration of course to port"
                       ],
        description: "Rule 34(a)",
        fact: ""
      },
      {
        id: 10,
        question: "What is the action/explanation for this sound signal?",
        audioUrl: ["https://raw.githubusercontent.com/albertchouforces/sample/main/sounds/7_Warning_Wake-Up_Signal_5_short.mp3", "https://raw.githubusercontent.com/albertchouforces/sample/main/sounds/8_Warning_Wake-Up_Signal_+5.mp3"],
        correctAnswer: [
                        "failure to understand the intentions/actions of the other vessel",
                        "in doubt that sufficient action is being taken by the other vessel to avoid collision",
                        "an alteration of course to starboard",
                        "an alteration of course to port",
                        "operating astern propulsion"
                       ],
        description: "Rule 34(d)",
        fact: ""
      },
      {
        id: 11,
        question: "What is the action/explanation for this sound signal?",
        audioUrl: ["https://raw.githubusercontent.com/albertchouforces/sample/main/sounds/7_Warning_Wake-Up_Signal_5_short.mp3", "https://raw.githubusercontent.com/albertchouforces/sample/d812ee16fd0a96a7643b821e8bc97fae05a4beb9/sounds/1_Short_Blast.mp3", "https://raw.githubusercontent.com/albertchouforces/sample/d812ee16fd0a96a7643b821e8bc97fae05a4beb9/sounds/1_Short_Blast.mp3", "https://raw.githubusercontent.com/albertchouforces/sample/d812ee16fd0a96a7643b821e8bc97fae05a4beb9/sounds/1_Short_Blast.mp3", "https://raw.githubusercontent.com/albertchouforces/sample/d812ee16fd0a96a7643b821e8bc97fae05a4beb9/sounds/1_Short_Blast.mp3", "https://raw.githubusercontent.com/albertchouforces/sample/d812ee16fd0a96a7643b821e8bc97fae05a4beb9/sounds/1_Short_Blast.mp3", "https://raw.githubusercontent.com/albertchouforces/sample/d812ee16fd0a96a7643b821e8bc97fae05a4beb9/sounds/1_Short_Blast.mp3"],
        correctAnswer: [
                        "in doubt that sufficient action is being taken by the other vessel to avoid collision",
                        "an alteration of course to starboard",
                        "an alteration of course to port",
                        "operating astern propulsion",
                        "failure to understand the intentions/actions of the other vessel"
                       ],
        description: "Rule 34(d)",
        fact: ""
      },
      {
        id: 12,
        question: "What is the action/explanation for this sound signal?",
        audioUrl: "",
        correctAnswer: [
                        "in doubt that sufficient action is being taken by the other vessel to avoid collision",
                        "an alteration of course to starboard",
                        "an alteration of course to port",
                        "operating astern propulsion",
                        "failure to understand the intentions/actions of the other vessel"
                       ],
        description: "Rule 34(d)",
        fact: ""
      },
      {
        id: 13,
        question: "What is the action/response for this sound signal?",
        audioUrl: "",
        correctAnswer: [
                        "the intention to overtake another vessel on its starboard side when in a narrow channel or fairway",
                        "the intention to overtake another vessel on its port side when in a narrow channel or fairway",
                        "the agreement response from a vessel about to be overtaken in a narrow channel or fairway",
                        "the “in doubt” response from a vessel about to be overtaken in a narrow channel or fairway"
                       ],
        description: "Rule 34(c)(i)",
        fact: ""
      },
      {
        id: 14,
        question: "What is the action/response for this sound signal?",
        audioUrl: "",
        correctAnswer: [
                        "the intention to overtake another vessel on its port side when in a narrow channel or fairway",
                        "the agreement response from a vessel about to be overtaken in a narrow channel or fairway",
                        "the “in doubt” response from a vessel about to be overtaken in a narrow channel or fairway",
                        "the intention to overtake another vessel on its starboard side when in a narrow channel or fairway"
                       ],
        description: "Rule 34(c)(i)",
        fact: ""
      },
      {
        id: 15,
        question: "What is the action/response for this sound signal?",
        audioUrl: "",
        correctAnswer: [
                        "the agreement response from a vessel about to be overtaken in a narrow channel or fairway",
                        "the “in doubt” response from a vessel about to be overtaken in a narrow channel or fairway",
                        "the intention to overtake another vessel on its starboard side when in a narrow channel or fairway",
                        "the intention to overtake another vessel on its port side when in a narrow channel or fairway"
                       ],
        description: "Rule 34(c)(ii)",
        fact: ""
      },
      {
        id: 16,
        question: "What is the action/response for this sound signal?",
        audioUrl: "",
        correctAnswer: [
                        "the “in doubt” response from a vessel about to be overtaken in a narrow channel or fairway",
                        "the intention to overtake another vessel on its starboard side when in a narrow channel or fairway",
                        "the intention to overtake another vessel on its port side when in a narrow channel or fairway",
                        "the agreement response from a vessel about to be overtaken in a narrow channel or fairway"
                       ],
        description: "Rule 34(d)",
        fact: ""
      },
      {
        id: 17,
        question: "What is the correct use for this sound signal?",
        audioUrl: "",
        correctAnswer: "a vessel nearing a bend or an area of a channel or fairway where other vessels may be obscured by an intervening obstruction",
        description: "Rule 34(e)",
        fact: ""
      },
      {
        id: 18,
        question: "What is the correct use for this sound signal?",
        audioUrl: "",
        correctAnswer: "the response from any approaching vessel that may be within hearing around a bend or behind an intervening obstruction",
        description: "Rule 34(e)",
        fact: ""
      },
    ]
  },
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
