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
    case 'figure-eight':
      return <FigureEightIllustration stepNumber={stepNumber} className={className} />;
    case 'sheet-bend':
      return <SheetBendIllustration stepNumber={stepNumber} className={className} />;
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
    <div className={`rounded-lg overflow-hidden ${className}`}>
      <LazyLoadImage
        src={src}
        alt={alt}
        effect="blur"
        className="w-full h-full object-contain"
        wrapperClassName="w-full h-full flex items-center justify-center"
      />
    </div>
  );
};

const BowlineIllustration: FC<StepIllustrationProps> = ({ stepNumber, className = "" }) => {
  const getStepImageUrl = (step: number) => {
    switch (step) {
      case 1:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Bowline_loop-ABOK-1010.jpg/440px-Bowline_loop-ABOK-1010.jpg";
      case 2:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Bowline_knot_-_Step_2.svg/440px-Bowline_knot_-_Step_2.svg.png";
      case 3:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Bowline_knot_-_Step_3.svg/440px-Bowline_knot_-_Step_3.svg.png";
      case 4:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Bowline_knot_-_Step_4.svg/440px-Bowline_knot_-_Step_4.svg.png";
      case 5:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Bowline_knot_-_finished.svg/440px-Bowline_knot_-_finished.svg.png";
      default:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Bowline_knot_-_finished.svg/440px-Bowline_knot_-_finished.svg.png";
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
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Clove_hitch_-_Step_1.svg/440px-Clove_hitch_-_Step_1.svg.png";
      case 2:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Clove_hitch_-_Step_2.svg/440px-Clove_hitch_-_Step_2.svg.png";
      case 3:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Clove_hitch_tied_around_a_pole.jpg/440px-Clove_hitch_tied_around_a_pole.jpg";
      default:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Clove_hitch_tied_around_a_pole.jpg/440px-Clove_hitch_tied_around_a_pole.jpg";
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

const FigureEightIllustration: FC<StepIllustrationProps> = ({ stepNumber, className = "" }) => {
  const getStepImageUrl = (step: number) => {
    switch (step) {
      case 1:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Figure-eight_knot_-_Step_1.svg/440px-Figure-eight_knot_-_Step_1.svg.png";
      case 2:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Figure-eight_knot_-_Step_2.svg/440px-Figure-eight_knot_-_Step_2.svg.png";
      case 3:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Figure-eight_knot_-_finished.svg/440px-Figure-eight_knot_-_finished.svg.png";
      default:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Figure-eight_knot_-_finished.svg/440px-Figure-eight_knot_-_finished.svg.png";
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
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Sheet_bend_knot_-_Step_1.svg/440px-Sheet_bend_knot_-_Step_1.svg.png";
      case 2:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Sheet_bend_knot_-_Step_2.svg/440px-Sheet_bend_knot_-_Step_2.svg.png";
      case 3:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Sheet_bend_knot_-_Step_3.svg/440px-Sheet_bend_knot_-_Step_3.svg.png";
      case 4:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Sheet_bend_knot_-_finished.svg/440px-Sheet_bend_knot_-_finished.svg.png";
      default:
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Sheet_bend_knot_-_finished.svg/440px-Sheet_bend_knot_-_finished.svg.png";
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
