import { FC } from 'react';
import { IllustrationWrapper } from '@/react-app/components/IllustrationWrapper';
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
    case 'rolling-hitch':
      return <RollingHitchIllustration stepNumber={stepNumber} className={className} />;
    case 'overhand-knot':
      return <OverhandKnotIllustration stepNumber={stepNumber} className={className} />;
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
      <div className="w-full h-full flex items-center justify-center">
        <LazyLoadImage
          src={src}
          alt={alt}
          effect="blur"
          className="knot-image"
          wrapperClassName="knot-image-wrapper"
          placeholderSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E"
          placeholder={
            <div className="animate-pulse flex items-center justify-center w-full h-full min-h-[200px] bg-gray-100 rounded">
              <div className="w-12 h-12 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          }
        />
      </div>
    </div>
  );
};

const BowlineIllustration: FC<StepIllustrationProps> = ({ stepNumber, className = "" }) => {
  const getStepImageUrl = (step: number) => {
    switch (step) {
      case 1:
        return "/images/Bowline1.png";
      case 2:
        return "/images/Bowline2.png";
      case 3:
        return "/images/Bowline2.png";
      case 4:
        return "/images/Bowline3.png";
      case 5:
        return "/images/Bowline4.png";
      default:
        return "/images/Bowline4.png";
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
        return "/images/clovehitch1.png";
      case 2:
        return "/images/clovehitch2.png";
      case 3:
        return "/images/clovehitch3.png";
      default:
        return "/images/clovehitch3.png";
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
        return "/images/cleathitch1.png";
      case 2:
        return "/images/cleathitch2.png";
      case 3:
        return "/images/cleathitch3.png";
      case 4:
        return "/images/cleathitch4.png";
      default:
        return "/images/cleathitch4.png";
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
        return "/images/reefknot1.png";
      case 2:
        return "/images/reefknot2.png";
      case 3:
        return "/images/reefknot3.png";
      case 4:
        return "/images/reefknot4.png";
      default:
        return "/images/reefknot4.png";
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
        return "/images/figureeight1.png";
      case 2:
        return "/images/figureeight2.png";
      case 3:
        return "/images/figureeight3.png";
      default:
        return "/images/figureeight3.png";
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
        return "/images/sheetbend1.png";
      case 2:
        return "/images/sheetbend2.png";
      case 3:
        return "/images/sheetbend3.png";
      case 4:
        return "/images/sheetbend3.png";
      default:
        return "/images/sheetbend3.png";
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
        return "/images/anchorhitch1.png";
      case 2:
        return "/images/anchorhitch2.png";
      case 3:
        return "/images/anchorhitch3.png";
      case 4:
        return "/images/anchorhitch4.png";
      case 5:
        return "/images/anchorhitch5.png";
      case 6:
        return "/images/anchorhitch6.png";
      default:
        return "/images/anchorhitch6.png";
    }
  };

  const stepDescription = {
    1: "Wrap the working end twice around the ring",
    2: "Bring the working end over the standing part",
    3: "Pass under itself and the standing part",
    4: "Continue pulling through",
    5: "Pass under itself again to lock the knot",
    6: "Pull all parts tight to complete"
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
        return "/images/RoundTurnTwoHalfHitches1.png";
      case 2:
        return "/images/RoundTurnTwoHalfHitches2.png";
      case 3:
        return "/images/RoundTurnTwoHalfHitches3.png";
      case 4:
        return "/images/RoundTurnTwoHalfHitches4.png";
      default:
        return "/images/RoundTurnTwoHalfHitches4.png";
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
        return "/images/halfhitch1.png";
      case 2:
        return "/images/halfhitch1.png";
      case 3:
        return "/images/halfhitch2.png";
      default:
        return "/images/halfhitch2.png";
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
        return "/images/truckershitch1.png";
      case 2:
        return "/images/truckershitch2.png";
      case 3:
        return "/images/truckershitch3.png";
      case 4:
        return "/images/truckershitch4.png";
      case 5:
        return "/images/truckershitch5.png";
      default:
        return "/images/truckershitch5.png";
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
        return "/images/stopperknot1.png";
      case 2:
        return "/images/stopperknot1.png";
      case 3:
        // First loop-passing step
        return "/images/stopperknot2.png";
      case 4:
        // Progress from step 3, partially tightened
        return "/images/stopperknot3.png";
      case 5:
        // Second loop-passing step
        return "/images/stopperknot4.png";
      case 6:
        // Completed knot
        return "/images/stopperknot5.png";
      default:
        return "/images/stopperknot5.png";
    }
  };

  const stepDescription = {
    1: "Form a small loop with the working end crossing over",
    2: "Bring the working end around behind the standing part",
    3: "Pass the working end through the initial loop from behind",
    4: "Pull the working end through to form the first pass",
    5: "Pass through the newly formed loop a second time",
    6: "Tighten by pulling the working end and standing part"
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

const RollingHitchIllustration: FC<StepIllustrationProps> = ({ stepNumber, className = "" }) => {
  const getStepImageUrl = (step: number) => {
    switch (step) {
      case 1:
        return "/images/rollinghitch1.png";
      case 2:
        return "/images/rollinghitch2.png";
      case 3:
        return "/images/rollinghitch3.png";
      case 4:
        return "/images/rollinghitch4.png";
      case 5:
        return "/images/rollinghitch5.png";
      default:
        return "/images/rollinghitch5.png";
    }
  };

  const stepDescription = {
    1: "Bring the working end over and around the pole/rope",
    2: "Wrap around a second time, parallel to the first turn",
    3: "Bring the working end over the standing part",
    4: "Continue under itself and over the pole/rope",
    5: "Pull tight to create friction against the pole/rope"
  }[stepNumber] || "Complete the rolling hitch";

  return (
    <IllustrationWrapper title="Rolling Hitch" stepNumber={stepNumber} className={className}>
      <KnotImageWrapper 
        src={getStepImageUrl(stepNumber)} 
        alt={`Rolling hitch step ${stepNumber}: ${stepDescription}`} 
      />
    </IllustrationWrapper>
  );
};

const OverhandKnotIllustration: FC<StepIllustrationProps> = ({ stepNumber, className = "" }) => {
  const getStepImageUrl = (step: number) => {
    switch (step) {
      case 1:
        return "/images/overhand1.png";
      case 2:
        return "/images/overhand2.png";
      case 3:
        return "/images/overhand3.png";
      default:
        return "/images/overhand3.png";
    }
  };

  const stepDescription = {
    1: "Form a loop by crossing the working end over the standing part",
    2: "Tuck the working end through the loop",
    3: "Pull both ends to tighten the knot"
  }[stepNumber] || "Complete the overhand knot";

  return (
    <IllustrationWrapper title="Overhand Knot" stepNumber={stepNumber} className={className}>
      <KnotImageWrapper 
        src={getStepImageUrl(stepNumber)} 
        alt={`Overhand knot step ${stepNumber}: ${stepDescription}`} 
      />
    </IllustrationWrapper>
  );
};
