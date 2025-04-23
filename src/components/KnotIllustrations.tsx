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
        return "https://images.unsplash.com/photo-1620293023555-272e1a5d7ad8?q=80&w=440&auto=format&fit=crop";
      case 2:
        return "https://images.unsplash.com/photo-1517627043994-d62e476e8bca?q=80&w=440&auto=format&fit=crop";
      case 3:
        return "https://images.unsplash.com/photo-1490079397423-a3931fd75940?q=80&w=440&auto=format&fit=crop";
      case 4:
        return "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?q=80&w=440&auto=format&fit=crop";
      case 5:
        return "https://images.unsplash.com/photo-1602525529018-42014a97fc34?q=80&w=440&auto=format&fit=crop";
      default:
        return "https://images.unsplash.com/photo-1514473776127-61e9763f2817?q=80&w=440&auto=format&fit=crop";
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
        return "https://images.unsplash.com/photo-1506339021650-37809c8d5e0a?q=80&w=440&auto=format&fit=crop";
      case 2:
        return "https://images.unsplash.com/photo-1602525530432-cc8a8c884ae4?q=80&w=440&auto=format&fit=crop";
      case 3:
        return "https://images.unsplash.com/photo-1558507102-290c0afaacb1?q=80&w=440&auto=format&fit=crop";
      default:
        return "https://images.unsplash.com/photo-1553178616-701bd2637a1a?q=80&w=440&auto=format&fit=crop";
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
        return "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=440&auto=format&fit=crop";
      case 2:
        return "https://images.unsplash.com/photo-1565498253128-c08cbf8adac5?q=80&w=440&auto=format&fit=crop";
      case 3:
        return "https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=440&auto=format&fit=crop";
      default:
        return "https://images.unsplash.com/photo-1560716092-42ea3c35a1bd?q=80&w=440&auto=format&fit=crop";
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
        return "https://images.unsplash.com/photo-1516233258668-6d5456fef184?q=80&w=440&auto=format&fit=crop";
      case 2:
        return "https://images.unsplash.com/photo-1526913641283-2e123e64adc0?q=80&w=440&auto=format&fit=crop";
      case 3:
        return "https://images.unsplash.com/photo-1536382149902-bcbf485f4fbe?q=80&w=440&auto=format&fit=crop";
      case 4:
        return "https://images.unsplash.com/photo-1552410260-0fd9b577afa6?q=80&w=440&auto=format&fit=crop";
      default:
        return "https://images.unsplash.com/photo-1514473776127-61e9763f2817?q=80&w=440&auto=format&fit=crop";
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
