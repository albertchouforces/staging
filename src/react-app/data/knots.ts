import { Knot } from '@/react-app/types';

export const knots: Knot[] = [
  {
    id: 'rolling-hitch',
    name: 'Rolling Hitch',
    description: 'A friction hitch used to attach a line to a rod, pole, or another line. The rolling hitch grips well under tension yet can be easily adjusted when slack.',
    difficulty: 'intermediate',
    useCases: [
      'Attaching a line to a pole or spar under tension',
      'Creating an adjustable line that can be moved when not under load',
      'Securing a towline to another rope',
      'Replacing a broken cleat by tying to a rail or spar'
    ],
    steps: [
      {
        description: 'Bring the working end over and around the pole/rope (away from the direction of expected load).',
        imagePosition: '0%',
      },
      {
        description: 'Wrap the working end around a second time, parallel to the first turn.',
        imagePosition: '20%',
      },
      {
        description: 'Bring the working end over the standing part, then around the pole/rope in the opposite direction.',
        imagePosition: '40%',
      },
      {
        description: 'Continue bringing the working end under itself and over the pole/rope.',
        imagePosition: '60%',
      },
      {
        description: 'Pull the working end to tighten the knot, creating friction against the pole/rope.',
        imagePosition: '80%',
      }
    ]
  },
  {
    id: 'overhand-knot',
    name: 'Overhand Knot',
    description: 'The most basic of all knots and the foundation for many others. It\'s a simple stopper knot that prevents a rope from sliding through a hole or device.',
    difficulty: 'beginner',
    useCases: [
      'Creating a simple stopper at the end of a rope',
      'Preventing rope ends from fraying',
      'Serving as the starting point for more complex knots',
      'Securing the end of a thread when sewing'
    ],
    steps: [
      {
        description: 'Form a simple loop by crossing the working end over the standing part.',
        imagePosition: '0%',
      },
      {
        description: 'Tuck the working end through the loop.',
        imagePosition: '33%',
      },
      {
        description: 'Pull both ends to tighten the knot.',
        imagePosition: '66%',
      }
    ]
  },
  {
    id: 'bowline',
    name: 'Bowline',
    description: 'The bowline creates a fixed loop at the end of a line. It\'s known as the "king of knots" because of its importance and utility.',
    difficulty: 'beginner',
    useCases: [
      'Creating a secure loop that won\'t slip or bind',
      'Rescue operations for securing around a person',
      'Securing a line to a ring or post',
      'Mooring a boat to a dock or buoy'
    ],
    steps: [
      {
        description: 'Form a small loop in the standing part of the line, leaving enough rope for the working end.',
        imagePosition: '0%',
      },
      {
        description: 'Pass the working end up through the loop from underneath.',
        imagePosition: '20%',
      },
      {
        description: 'Wrap the working end around behind the standing part.',
        imagePosition: '40%',
      },
      {
        description: 'Bring the working end back down through the loop.',
        imagePosition: '60%',
      },
      {
        description: 'Pull the knot tight by holding the loop and pulling on the standing part.',
        imagePosition: '80%',
      },
    ]
  },
  {
    id: 'clove-hitch',
    name: 'Clove Hitch',
    description: 'A quick and easy knot used to secure a line to a post or rail temporarily.',
    difficulty: 'beginner',
    useCases: [
      'Quickly securing a line to a pole or post',
      'Starting point for lashings in pioneering projects',
      'Temporary mooring of small boats',
      'Setting up a ridge line for tarps or shelters'
    ],
    steps: [
      {
        description: 'Wrap the rope around the post.',
        imagePosition: '0%',
      },
      {
        description: 'Cross the working end over the standing part and wrap around the post again.',
        imagePosition: '33%',
      },
      {
        description: 'Pass the working end under itself, in the space between the rope and the post.',
        imagePosition: '66%',
      }
    ]
  },
  {
    id: 'cleat-hitch',
    name: 'Cleat Hitch',
    description: 'A secure method to fasten a line to a cleat, commonly used in boating and sailing.',
    difficulty: 'intermediate',
    useCases: [
      'Securing a boat to a dock cleat',
      'Fastening halyards on sailboats',
      'Tying down tent guy lines to cleats',
      'Securing heavy loads during transportation'
    ],
    steps: [
      {
        description: 'Wrap the line around the base of the cleat, passing it across the far horn.',
        imagePosition: '0%',
      },
      {
        description: 'Bring the line back across the cleat, creating a figure-8 pattern.',
        imagePosition: '25%',
      },
      {
        description: 'Continue the figure-8 pattern for another wrap.',
        imagePosition: '50%',
      },
      {
        description: 'Finish with a half hitch over the top horn of the cleat.',
        imagePosition: '75%',
      }
    ]
  },
  {
    id: 'reef-knot',
    name: 'Reef Knot (Square Knot)',
    description: 'A simple binding knot used to secure a line around an object. Not suitable for critical loads.',
    difficulty: 'beginner',
    useCases: [
      'Joining two ropes of similar size temporarily',
      'Tying packages or bundles',
      'Securing bandages in first aid',
      'Reefing a sail (traditional use)'
    ],
    steps: [
      {
        description: 'Cross the right end over the left end.',
        imagePosition: '0%',
      },
      {
        description: 'Bring the right end under the left end.',
        imagePosition: '33%',
      },
      {
        description: 'Cross the left end (now on the right) over the right end.',
        imagePosition: '66%',
      },
      {
        description: 'Bring the left end under the right end and pull tight.',
        imagePosition: '100%',
      }
    ]
  },
  {
    id: 'figure-eight',
    name: 'Figure Eight Knot',
    description: 'A stopper knot that prevents a line from passing through a hole or block.',
    difficulty: 'beginner',
    useCases: [
      'Preventing a rope from running through a pulley or hole',
      'Creating a stopper at the end of a rope',
      'Base for more complex knots like the Figure Eight Follow Through',
      'Sailing applications to secure lines'
    ],
    steps: [
      {
        description: 'Form a loop in the rope, passing the working end over the standing part.',
        imagePosition: '0%',
      },
      {
        description: 'Bring the working end around and behind the standing part.',
        imagePosition: '33%',
      },
      {
        description: 'Thread the working end up through the original loop.',
        imagePosition: '66%',
      }
    ]
  },
  {
    id: 'sheet-bend',
    name: 'Sheet Bend',
    description: 'Used to join two ropes of unequal sizes. More secure than a square knot for this purpose.',
    difficulty: 'intermediate',
    useCases: [
      'Joining two ropes of different diameters or materials',
      'Attaching a fishing line to a leader',
      'Extending rope when you need additional length',
      'Securing a sheet to the clew of a sail'
    ],
    steps: [
      {
        description: 'Form a bight in the thicker rope.',
        imagePosition: '0%',
      },
      {
        description: 'Pass the working end of the thinner rope up through the bight.',
        imagePosition: '25%',
      },
      {
        description: 'Wrap the working end around behind the bight.',
        imagePosition: '50%',
      },
      {
        description: 'Tuck the working end under itself, in front of the bight.',
        imagePosition: '75%',
      }
    ]
  },
  {
    id: 'anchor-hitch',
    name: 'Anchor Hitch',
    description: 'A secure knot for attaching a line to an anchor or ring, designed to resist slipping under load.',
    difficulty: 'advanced',
    useCases: [
      'Securing a line to an anchor',
      'Attaching a rope to a ring or shackle',
      'Mooring applications where security is critical',
      'Situations where the knot will be under constant load'
    ],
    steps: [
      {
        description: 'Wrap the working end twice around the ring or post.',
        imagePosition: '0%',
      },
      {
        description: 'Bring the working end over the standing part.',
        imagePosition: '16.6%',
      },
      {
        description: 'Pass the working end under itself and the standing part.',
        imagePosition: '33.3%',
      },
      {
        description: 'Continue pulling the working end through.',
        imagePosition: '50%',
      },
      {
        description: 'Pass the working end under itself again to lock the knot.',
        imagePosition: '66.6%',
      },
      {
        description: 'Pull all parts tight to complete the anchor hitch.',
        imagePosition: '83.3%',
      }
    ]
  },
  {
    id: 'round-turn-two-half-hitches',
    name: 'Round Turn and Two Half Hitches',
    description: 'A reliable knot for securing a line to a post or ring, distributing the load with the round turn.',
    difficulty: 'intermediate',
    useCases: [
      'Securing boats to mooring posts',
      'Fastening a line to a ring or pole',
      'Tying up animals to a post',
      'Situations requiring a secure attachment that can be easily untied'
    ],
    steps: [
      {
        description: 'Make a round turn (wrap the rope completely around the object twice).',
        imagePosition: '0%',
      },
      {
        description: 'Bring the working end over the standing part and back under itself.',
        imagePosition: '25%',
      },
      {
        description: 'Repeat the half hitch by bringing the working end over and under the standing part again.',
        imagePosition: '50%',
      },
      {
        description: 'Pull tight to secure both half hitches.',
        imagePosition: '75%',
      }
    ]
  },
  {
    id: 'half-hitch',
    name: 'Half Hitch',
    description: 'A simple overhand knot around a rope or object, often used in pairs or as a component of more complex knots.',
    difficulty: 'beginner',
    useCases: [
      'Securing a line temporarily',
      'Starting point for more complex knots',
      'Quick attachments that don\'t need to hold heavy loads',
      'Securing bundled items temporarily'
    ],
    steps: [
      {
        description: 'Pass the working end around the object.',
        imagePosition: '0%',
      },
      {
        description: 'Bring the working end over the standing part.',
        imagePosition: '50%',
      },
      {
        description: 'Tuck the working end under itself to complete the half hitch.',
        imagePosition: '100%',
      }
    ]
  },
  {
    id: 'truckers-hitch',
    name: 'Trucker\'s Hitch',
    description: 'A compound knot that creates a mechanical advantage for tensioning ropes, ideal for securing loads.',
    difficulty: 'advanced',
    useCases: [
      'Securing loads on trucks and trailers',
      'Tightening tent guy lines',
      'Creating a tight ridge line for tarps',
      'Any situation requiring a rope to be pulled tight and secured'
    ],
    steps: [
      {
        description: 'Create a slip loop in the standing part of the rope by making a half twist and passing a bight through it.',
        imagePosition: '0%',
      },
      {
        description: 'Pass the working end around the anchor point.',
        imagePosition: '20%',
      },
      {
        description: 'Thread the working end through the slip loop, creating a pulley effect.',
        imagePosition: '40%',
      },
      {
        description: 'Pull down on the working end to create tension.',
        imagePosition: '60%',
      },
      {
        description: 'Secure with one or two half hitches around the standing part.',
        imagePosition: '80%',
      }
    ]
  },
  {
    id: 'stopper-knot',
    name: 'Stopper Knot',
    description: 'A knot tied at the end of a rope to prevent it from unraveling or passing through a hole or ring.',
    difficulty: 'intermediate',
    useCases: [
      'Preventing a rope from running through a pulley or fairlead',
      'Creating a handhold at the end of a rope',
      'Preventing the end of a rope from fraying',
      'Adding weight to the end of a throwing line'
    ],
    steps: [
      {
        description: 'Form a small loop near the end of the rope, with the working end crossing over the standing part.',
        imagePosition: '0%',
      },
      {
        description: 'Bring the working end around behind the standing part.',
        imagePosition: '20%',
      },
      {
        description: 'Continue bringing the working end around and pass it through the initial loop from behind.',
        imagePosition: '40%',
      },
      {
        description: 'Pull the working end through the loop to form the first pass.',
        imagePosition: '60%',
      },
      {
        description: 'Pass the working end through the newly formed loop a second time to strengthen the knot.',
        imagePosition: '80%',
      },
      {
        description: 'Tighten the knot by pulling the working end while holding the standing part firmly.',
        imagePosition: '100%',
      }
    ]
  }
];
