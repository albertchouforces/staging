import { FC } from 'react';
import { IllustrationWrapper } from './IllustrationWrapper';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface KnotIllustrationProps {
  knotId: string;
  stepNumber: number;
  className?: string;
}

export const KnotIllustration: FC<KnotIllustrationProps> = ({ knotId, stepNumber, className = "" }) => {
  // Map knot types to their specific illustrations
  switch (knotId) {
    case 'bowline':
      return <BowlineIllustration stepNumber={stepNumber} className={className} />;
    case 'clove-hitch':
      return <CloveHitchIllustration stepNumber={stepNumber} className={className} />;
    case 'cleat-hitch':
      return <CleatHitchIllustration stepNumber={stepNumber} className={className} />;
    case 'reef-knot':
      return <ReefKnotIllustration stepNumber={stepNumber} className={className} />;
    case 'figure-eight':
      return <FigureEightIllustration stepNumber={stepNumber} className={className} />;
    case 'sheet-bend':
      return <SheetBendIllustration stepNumber={stepNumber} className={className} />;
    case 'anchor-hitch':
      return <AnchorHitchIllustration stepNumber={stepNumber} className={className} />;
    case 'round-turn-two-half-hitches':
      return <RoundTurnTwoHalfHitchesIllustration stepNumber={stepNumber} className={className} />;
    case 'half-hitch':
      return <HalfHitchIllustration stepNumber={stepNumber} className={className} />;
    case 'truckers-hitch':
      return <TruckersHitchIllustration stepNumber={stepNumber} className={className} />;
    case 'stopper-knot':
      return <StopperKnotIllustration stepNumber={stepNumber} className={className} />;
    default:
      return (
        <div className={`flex items-center justify-center rounded-lg overflow-hidden ${className}`}>
          <div className="text-gray-500 text-center p-4">
            <div className="text-xl font-bold mb-2">No illustration available</div>
            <div className="text-sm opacity-80">This knot type doesn't have an illustration yet.</div>
          </div>
        </div>
      );
  }
};

interface StepIllustrationProps {
  stepNumber: number;
  className?: string;
}

const KnotImageWrapper: FC<{src: string; alt: string; className?: string}> = ({ src, alt, className = "" }) => {
  return (
    <div className={`rounded-lg overflow-hidden knot-image-container ${className}`}>
      <LazyLoadImage
        src={src}
        alt={alt}
        effect="blur"
        className="w-auto h-auto max-w-full max-h-full object-contain knot-image"
        wrapperClassName="w-full h-full flex items-center justify-center p-2"
        placeholder={
          <div className="animate-pulse flex items-center justify-center w-full h-full min-h-[200px] bg-gray-100 rounded">
            <div className="w-12 h-12 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        }
      />
    </div>
  );
};

const BowlineIllustration: FC<StepIllustrationProps> = ({ stepNumber, className = "" }) => {
  const getStepImageUrl = (step: number) => {
    switch (step) {
      case 1:
        return "https://raw.githubusercontent.com/albertchouforces/staging/refs/heads/main/public/images/Bowline1.png";
      case 2:
        return "https://raw.githubusercontent.com/albertchouforces/staging/refs/heads/main/public/images/Bowline2.png";
      case 3:
        return "https://raw.githubusercontent.com/albertchouforces/staging/refs/heads/main/public/images/Bowline3.png";
      case 4:
        return "https://raw.githubusercontent.com/albertchouforces/staging/refs/heads/main/public/images/Bowline4.png";
      case 5:
        return "https://raw.githubusercontent.com/albertchouforces/staging/refs/heads/main/public/images/Bowline5.png";
      default:
        return "https://raw.githubusercontent.com/albertchouforces/staging/refs/heads/main/public/images/Bowline5.png";
    }
  };

  const stepDescription = {
    1: "Form a small loop in the standing part",
    2: "Pass the working end up through the loop",
    3: "Wrap the working end around the standing part",
    4: "Bring working end back down through loop",
    5: "Pull tight to complete the bowline knot"
  }[stepNumber] || "Complete the bowline knot";

  return (
    <IllustrationWrapper title="Bowline" stepNumber={stepNumber} className={className}>
      <KnotImageWrapper 
        src={getStepImageUrl(stepNumber)} 
        alt={`Bowline knot step ${stepNumber}: ${stepDescription}`} 
      />
    </IllustrationWrapper>
  );
};

const CloveHitchIllustration: FC<StepIllustrationProps> = ({ stepNumber, className = "" }) => {
  const getStepImageUrl = (step: number) => {
    switch (step) {
      case 1:
        return "https://raw.githubusercontent.com/albertchouforces/staging/refs/heads/main/public/images/clovehitch1.jpg";
      case 2:
        return "https://raw.githubusercontent.com/albertchouforces/staging/refs/heads/main/public/images/clovehitch2.jpg";
      case 3:
        return "https://raw.githubusercontent.com/albertchouforces/staging/refs/heads/main/public/images/clovehitch3.jpg";
      default:
        return "https://raw.githubusercontent.com/albertchouforces/staging/refs/heads/main/public/images/clovehitch3.jpg";
    }
  };

  const stepDescription = {
    1: "Wrap the rope around the post",
    2: "Cross over and wrap around post again",
    3: "Pass end under itself to complete the hitch"
  }[stepNumber] || "Complete the clove hitch";

  return (
    <IllustrationWrapper title="Clove Hitch" stepNumber={stepNumber} className={className}>
      <KnotImageWrapper 
        src={getStepImageUrl(stepNumber)} 
        alt={`Clove hitch step ${stepNumber}: ${stepDescription}`} 
      />
    </IllustrationWrapper>
  );
};

const CleatHitchIllustration: FC<StepIllustrationProps> = ({ stepNumber, className = "" }) => {
  const getStepImageUrl = (step: number) => {
    switch (step) {
      case 1:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cleat_hitch_step_1.jpg/640px-Cleat_hitch_step_1.jpg";
      case 2:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Cleat_hitch_step_2.jpg/640px-Cleat_hitch_step_2.jpg";
      case 3:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Cleat_hitch_step_3.jpg/640px-Cleat_hitch_step_3.jpg";
      case 4:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Cleat_hitch_step_4.jpg/640px-Cleat_hitch_step_4.jpg";
      default:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Cleat_hitch_step_4.jpg/640px-Cleat_hitch_step_4.jpg";
    }
  };

  const stepDescription = {
    1: "Wrap around the base of the cleat",
    2: "Create a figure-8 pattern",
    3: "Make another figure-8 wrap",
    4: "Finish with a half hitch"
  }[stepNumber] || "Complete the cleat hitch";

  return (
    <IllustrationWrapper title="Cleat Hitch" stepNumber={stepNumber} className={className}>
      <KnotImageWrapper 
        src={getStepImageUrl(stepNumber)} 
        alt={`Cleat hitch step ${stepNumber}: ${stepDescription}`} 
      />
    </IllustrationWrapper>
  );
};

const ReefKnotIllustration: FC<StepIllustrationProps> = ({ stepNumber, className = "" }) => {
  const getStepImageUrl = (step: number) => {
    switch (step) {
      case 1:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Reef_knot_step_1.jpg/640px-Reef_knot_step_1.jpg";
      case 2:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Reef_knot_step_2.jpg/640px-Reef_knot_step_2.jpg";
      case 3:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Reef_knot_step_3.jpg/640px-Reef_knot_step_3.jpg";
      case 4:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Reef_knot.jpg/640px-Reef_knot.jpg";
      default:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Reef_knot.jpg/640px-Reef_knot.jpg";
    }
  };

  const stepDescription = {
    1: "Cross right end over left",
    2: "Bring right end under left",
    3: "Cross left end over right",
    4: "Bring left end under right and tighten"
  }[stepNumber] || "Complete the reef knot";

  return (
    <IllustrationWrapper title="Reef Knot" stepNumber={stepNumber} className={className}>
      <KnotImageWrapper 
        src={getStepImageUrl(stepNumber)} 
        alt={`Reef knot step ${stepNumber}: ${stepDescription}`} 
      />
    </IllustrationWrapper>
  );
};

const FigureEightIllustration: FC<StepIllustrationProps> = ({ stepNumber, className = "" }) => {
  const getStepImageUrl = (step: number) => {
    switch (step) {
      case 1:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Figure-eight_knot_tying_1.jpg/640px-Figure-eight_knot_tying_1.jpg";
      case 2:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Figure-eight_knot_tying_2.jpg/640px-Figure-eight_knot_tying_2.jpg";
      case 3:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Figure-eight_knot.jpg/640px-Figure-eight_knot.jpg";
      default:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Figure-eight_knot.jpg/640px-Figure-eight_knot.jpg";
    }
  };

  const stepDescription = {
    1: "Form a loop, passing end over standing part",
    2: "Bring the working end around and behind",
    3: "Thread the working end up through the loop"
  }[stepNumber] || "Complete the figure eight knot";

  return (
    <IllustrationWrapper title="Figure Eight" stepNumber={stepNumber} className={className}>
      <KnotImageWrapper 
        src={getStepImageUrl(stepNumber)} 
        alt={`Figure eight knot step ${stepNumber}: ${stepDescription}`} 
      />
    </IllustrationWrapper>
  );
};

const SheetBendIllustration: FC<StepIllustrationProps> = ({ stepNumber, className = "" }) => {
  const getStepImageUrl = (step: number) => {
    switch (step) {
      case 1:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Sheet_bend_tying_1.jpg/640px-Sheet_bend_tying_1.jpg";
      case 2:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Sheet_bend_tying_2.jpg/640px-Sheet_bend_tying_2.jpg";
      case 3:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sheet_bend_tying_3.jpg/640px-Sheet_bend_tying_3.jpg";
      case 4:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Sheet_bend.jpg/640px-Sheet_bend.jpg";
      default:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Sheet_bend.jpg/640px-Sheet_bend.jpg";
    }
  };

  const stepDescription = {
    1: "Form a bight in the thicker rope",
    2: "Pass the working end up through the bight",
    3: "Wrap the working end around behind",
    4: "Tuck the working end under itself"
  }[stepNumber] || "Complete the sheet bend";

  return (
    <IllustrationWrapper title="Sheet Bend" stepNumber={stepNumber} className={className}>
      <KnotImageWrapper 
        src={getStepImageUrl(stepNumber)} 
        alt={`Sheet bend step ${stepNumber}: ${stepDescription}`} 
      />
    </IllustrationWrapper>
  );
};

const AnchorHitchIllustration: FC<StepIllustrationProps> = ({ stepNumber, className = "" }) => {
  const getStepImageUrl = (step: number) => {
    switch (step) {
      case 1:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Anchor_hitch_step_1.jpg/640px-Anchor_hitch_step_1.jpg";
      case 2:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Anchor_hitch_step_2.jpg/640px-Anchor_hitch_step_2.jpg";
      case 3:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Anchor_hitch_step_3.jpg/640px-Anchor_hitch_step_3.jpg";
      case 4:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Anchor_hitch.jpg/640px-Anchor_hitch.jpg";
      default:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Anchor_hitch.jpg/640px-Anchor_hitch.jpg";
    }
  };

  const stepDescription = {
    1: "Pass the working end through the ring",
    2: "Wrap around the standing part",
    3: "Pass through the loop against the ring",
    4: "Pass through the new loop and tighten"
  }[stepNumber] || "Complete the anchor hitch";

  return (
    <IllustrationWrapper title="Anchor Hitch" stepNumber={stepNumber} className={className}>
      <KnotImageWrapper 
        src={getStepImageUrl(stepNumber)} 
        alt={`Anchor hitch step ${stepNumber}: ${stepDescription}`} 
      />
    </IllustrationWrapper>
  );
};

const RoundTurnTwoHalfHitchesIllustration: FC<StepIllustrationProps> = ({ stepNumber, className = "" }) => {
  const getStepImageUrl = (step: number) => {
    switch (step) {
      case 1:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Round_turn_two_half_hitches_step_1.jpg/640px-Round_turn_two_half_hitches_step_1.jpg";
      case 2:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Round_turn_two_half_hitches_step_2.jpg/640px-Round_turn_two_half_hitches_step_2.jpg";
      case 3:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Round_turn_two_half_hitches_step_3.jpg/640px-Round_turn_two_half_hitches_step_3.jpg";
      case 4:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Round_turn_two_half_hitches.jpg/640px-Round_turn_two_half_hitches.jpg";
      default:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Round_turn_two_half_hitches.jpg/640px-Round_turn_two_half_hitches.jpg";
    }
  };

  const stepDescription = {
    1: "Make a round turn around the object",
    2: "Make first half hitch",
    3: "Make second half hitch",
    4: "Tighten both half hitches"
  }[stepNumber] || "Complete the round turn and two half hitches";

  return (
    <IllustrationWrapper title="Round Turn and Two Half Hitches" stepNumber={stepNumber} className={className}>
      <KnotImageWrapper 
        src={getStepImageUrl(stepNumber)} 
        alt={`Round turn and two half hitches step ${stepNumber}: ${stepDescription}`} 
      />
    </IllustrationWrapper>
  );
};

const HalfHitchIllustration: FC<StepIllustrationProps> = ({ stepNumber, className = "" }) => {
  const getStepImageUrl = (step: number) => {
    switch (step) {
      case 1:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Half_hitch_step_1.jpg/640px-Half_hitch_step_1.jpg";
      case 2:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Half_hitch_step_2.jpg/640px-Half_hitch_step_2.jpg";
      case 3:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Half_hitch.jpg/640px-Half_hitch.jpg";
      default:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Half_hitch.jpg/640px-Half_hitch.jpg";
    }
  };

  const stepDescription = {
    1: "Pass the working end around object",
    2: "Cross over the standing part",
    3: "Tuck under itself to complete half hitch"
  }[stepNumber] || "Complete the half hitch";

  return (
    <IllustrationWrapper title="Half Hitch" stepNumber={stepNumber} className={className}>
      <KnotImageWrapper 
        src={getStepImageUrl(stepNumber)} 
        alt={`Half hitch step ${stepNumber}: ${stepDescription}`} 
      />
    </IllustrationWrapper>
  );
};

const TruckersHitchIllustration: FC<StepIllustrationProps> = ({ stepNumber, className = "" }) => {
  const getStepImageUrl = (step: number) => {
    switch (step) {
      case 1:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Truckers_hitch_step_1.jpg/640px-Truckers_hitch_step_1.jpg";
      case 2:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Truckers_hitch_step_2.jpg/640px-Truckers_hitch_step_2.jpg";
      case 3:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Truckers_hitch_step_3.jpg/640px-Truckers_hitch_step_3.jpg";
      case 4:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Truckers_hitch_step_4.jpg/640px-Truckers_hitch_step_4.jpg";
      case 5:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Truckers_hitch.jpg/640px-Truckers_hitch.jpg";
      default:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Truckers_hitch.jpg/640px-Truckers_hitch.jpg";
    }
  };

  const stepDescription = {
    1: "Create a slip loop in the rope",
    2: "Pass working end around anchor point",
    3: "Thread through slip loop for leverage",
    4: "Pull to create tension",
    5: "Secure with half hitches"
  }[stepNumber] || "Complete the trucker's hitch";

  return (
    <IllustrationWrapper title="Trucker's Hitch" stepNumber={stepNumber} className={className}>
      <KnotImageWrapper 
        src={getStepImageUrl(stepNumber)} 
        alt={`Trucker's hitch step ${stepNumber}: ${stepDescription}`} 
      />
    </IllustrationWrapper>
  );
};

const StopperKnotIllustration: FC<StepIllustrationProps> = ({ stepNumber, className = "" }) => {
  const getStepImageUrl = (step: number) => {
    switch (step) {
      case 1:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Stopper_knot_step_1.jpg/640px-Stopper_knot_step_1.jpg";
      case 2:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Stopper_knot_step_2.jpg/640px-Stopper_knot_step_2.jpg";
      case 3:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stopper_knot_step_3.jpg/640px-Stopper_knot_step_3.jpg";
      case 4:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Stopper_knot.jpg/640px-Stopper_knot.jpg";
      default:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Stopper_knot.jpg/640px-Stopper_knot.jpg";
    }
  };

  const stepDescription = {
    1: "Create a small loop near the end",
    2: "Wrap working end around standing part",
    3: "Pass end through the loop",
    4: "Pull tight to form stopper knot"
  }[stepNumber] || "Complete the stopper knot";

  return (
    <IllustrationWrapper title="Stopper Knot" stepNumber={stepNumber} className={className}>
      <KnotImageWrapper 
        src={getStepImageUrl(stepNumber)} 
        alt={`Stopper knot step ${stepNumber}: ${stepDescription}`} 
      />
    </IllustrationWrapper>
  );
};
