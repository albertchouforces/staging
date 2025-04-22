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
        return "https://www.animatedknots.com/photos/bowline/bowline1.jpg";
      case 2:
        return "https://www.animatedknots.com/photos/bowline/bowline3.jpg";
      case 3:
        return "https://www.animatedknots.com/photos/bowline/bowline5.jpg";
      case 4:
        return "https://www.animatedknots.com/photos/bowline/bowline7.jpg";
      case 5:
        return "https://www.animatedknots.com/photos/bowline/bowline9.jpg";
      default:
        return "https://www.animatedknots.com/photos/bowline/bowlinefinish.jpg";
    }
  };

  const stepDescription = {
    1: "Form a small loop in the standing part",
    2: "Pass the working end up through the loop",
    3: "Wrap the working end behind standing part",
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
        return "https://www.animatedknots.com/photos/clovehitch/clovehitch1.jpg";
      case 2:
        return "https://www.animatedknots.com/photos/clovehitch/clovehitch3.jpg";
      case 3:
        return "https://www.animatedknots.com/photos/clovehitch/clovehitchfinish.jpg";
      default:
        return "https://www.animatedknots.com/photos/clovehitch/clovehitchfinish.jpg";
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
        return "https://www.animatedknots.com/photos/fig8/fig81.jpg";
      case 2:
        return "https://www.animatedknots.com/photos/fig8/fig83.jpg";
      case 3:
        return "https://www.animatedknots.com/photos/fig8/fig8finish.jpg";
      default:
        return "https://www.animatedknots.com/photos/fig8/fig8finish.jpg";
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
        return "https://www.animatedknots.com/photos/sheetbend/sheetbend1.jpg";
      case 2:
        return "https://www.animatedknots.com/photos/sheetbend/sheetbend3.jpg";
      case 3:
        return "https://www.animatedknots.com/photos/sheetbend/sheetbend5.jpg";
      case 4:
        return "https://www.animatedknots.com/photos/sheetbend/sheetbendfinish.jpg";
      default:
        return "https://www.animatedknots.com/photos/sheetbend/sheetbendfinish.jpg";
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
