import { FC } from 'react';
import { IllustrationWrapper } from './IllustrationWrapper';
import { motion } from 'framer-motion';

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
        <div className={`flex items-center justify-center bg-gradient-to-br from-blue-950 to-blue-600 ${className}`}>
          <div className="text-white text-center p-4">
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

const BowlineIllustration: FC<StepIllustrationProps> = ({ stepNumber, className = "" }) => {
  return (
    <IllustrationWrapper title="Bowline" stepNumber={stepNumber} className={className}>
      <svg 
        viewBox="0 0 400 300" 
        className="knot-svg"
        style={{ background: "linear-gradient(135deg, #0c2d56, #2563eb)" }}
      >
      <defs>
        <filter id="bowlineShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
        </filter>
        <linearGradient id="ropeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>

      {stepNumber === 1 && (
        <g className={stepNumber === 1 ? "step-active" : ""}>
          <path className="rope-path" d="M100,120 Q140,80 180,120" stroke="url(#ropeGradient)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#bowlineShadow)" />
          <path d="M180,120 L180,150" stroke="url(#ropeGradient)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#bowlineShadow)" />
          <path d="M180,150 L100,150" stroke="url(#ropeGradient)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#bowlineShadow)" />
          <path d="M100,150 L100,120" stroke="url(#ropeGradient)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#bowlineShadow)" />
          
          <circle cx="140" cy="100" r="6" fill="white" filter="url(#bowlineShadow)" />
          <path d="M150,60 L140,100" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
          <text x="155" y="70" fill="white" fontSize="14" fontWeight="500">Standing part</text>
          
          <text x="190" y="135" fill="white" fontSize="14" fontWeight="500">Loop</text>
          <path d="M185,135 L160,120" stroke="white" strokeWidth="2" strokeDasharray="3,3" />
          
          <g transform="translate(50, 230)">
            <rect width="300" height="36" rx="6" fill="rgba(255,255,255,0.1)" />
            <text x="15" y="24" fill="white" fontSize="16" fontWeight="500">Form a small loop in the standing part</text>
          </g>
        </g>
      )}
      
      {stepNumber === 2 && (
        <g className={stepNumber === 2 ? "step-active" : ""}>
          <path className="rope-path" d="M100,120 Q140,80 180,120" stroke="url(#ropeGradient)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#bowlineShadow)" />
          <path className="rope-path" d="M180,120 L180,150" stroke="url(#ropeGradient)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#bowlineShadow)" />
          <path className="rope-path" d="M180,150 L100,150" stroke="url(#ropeGradient)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#bowlineShadow)" />
          <path className="rope-path" d="M100,150 L100,120" stroke="url(#ropeGradient)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#bowlineShadow)" />
          
          <path className="rope-path" d="M80,170 C85,160 90,155 100,150" stroke="url(#ropeGradient)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#bowlineShadow)" />
          <path className="rope-path" d="M80,170 C85,140 110,110 140,110" stroke="url(#ropeGradient)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#bowlineShadow)" />
          
          <text x="60" y="185" fill="white" fontSize="14" fontWeight="500">Working end</text>
          <path d="M90,180 L82,168" stroke="white" strokeWidth="2" strokeDasharray="3,3" />
          
          <g transform="translate(50, 230)">
            <rect width="300" height="36" rx="6" fill="rgba(255,255,255,0.1)" />
            <text x="15" y="24" fill="white" fontSize="16" fontWeight="500">Pass the working end up through the loop</text>
          </g>
        </g>
      )}
      
      {stepNumber === 3 && (
        <g className={stepNumber === 3 ? "step-active" : ""}>
          <path className="rope-path" d="M100,120 Q140,80 180,120" stroke="url(#ropeGradient)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#bowlineShadow)" />
          <path className="rope-path" d="M180,120 L180,150" stroke="url(#ropeGradient)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#bowlineShadow)" />
          <path className="rope-path" d="M180,150 L100,150" stroke="url(#ropeGradient)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#bowlineShadow)" />
          <path className="rope-path" d="M100,150 L100,120" stroke="url(#ropeGradient)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#bowlineShadow)" />
          
          <path className="rope-path" d="M80,170 C85,160 90,155 100,150" stroke="url(#ropeGradient)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#bowlineShadow)" />
          <path className="rope-path" d="M80,170 C85,140 110,110 140,110" stroke="url(#ropeGradient)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#bowlineShadow)" />
          <path className="rope-path" d="M140,110 C180,115 205,90 200,60" stroke="url(#ropeGradient)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#bowlineShadow)" />
          
          <text x="150" y="70" fill="white" fontSize="14" fontWeight="500">Behind standing part</text>
          <path d="M175,75 L190,65" stroke="white" strokeWidth="2" strokeDasharray="3,3" />
          
          <g transform="translate(50, 230)">
            <rect width="300" height="36" rx="6" fill="rgba(255,255,255,0.1)" />
            <text x="15" y="24" fill="white" fontSize="16" fontWeight="500">Wrap the working end behind standing part</text>
          </g>
        </g>
      )}
      
      {stepNumber === 4 && (
        <g className={stepNumber === 4 ? "step-active" : ""}>
          <path className="rope-path" d="M100,120 Q140,80 180,120" stroke="url(#ropeGradient)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#bowlineShadow)" />
          <path className="rope-path" d="M180,120 L180,150" stroke="url(#ropeGradient)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#bowlineShadow)" />
          <path className="rope-path" d="M180,150 L100,150" stroke="url(#ropeGradient)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#bowlineShadow)" />
          <path className="rope-path" d="M100,150 L100,120" stroke="url(#ropeGradient)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#bowlineShadow)" />
          
          <path className="rope-path" d="M80,170 C85,160 90,155 100,150" stroke="url(#ropeGradient)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#bowlineShadow)" />
          <path className="rope-path" d="M80,170 C85,140 110,110 140,110" stroke="url(#ropeGradient)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#bowlineShadow)" />
          <path className="rope-path" d="M140,110 C180,115 205,90 200,60" stroke="url(#ropeGradient)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#bowlineShadow)" />
          <path className="rope-path" d="M200,60 C185,40 150,50 130,90" stroke="url(#ropeGradient)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#bowlineShadow)" />
          
          <text x="110" y="80" fill="white" fontSize="14" fontWeight="500">Back through loop</text>
          <path d="M130,85 L140,95" stroke="white" strokeWidth="2" strokeDasharray="3,3" />
          
          <g transform="translate(50, 230)">
            <rect width="300" height="36" rx="6" fill="rgba(255,255,255,0.1)" />
            <text x="15" y="24" fill="white" fontSize="16" fontWeight="500">Bring the working end back down through loop</text>
          </g>
        </g>
      )}
      
      {stepNumber === 5 && (
        <g className={stepNumber === 5 ? "step-active" : ""}>
          <path className="rope-path" d="M100,120 Q140,80 180,120" stroke="url(#ropeGradient)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#bowlineShadow)" />
          <path className="rope-path" d="M180,120 L180,150" stroke="url(#ropeGradient)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#bowlineShadow)" />
          <path className="rope-path" d="M100,150 L100,120" stroke="url(#ropeGradient)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#bowlineShadow)" />
          
          <path className="rope-path" d="M80,170 C85,160 90,155 100,150" stroke="url(#ropeGradient)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#bowlineShadow)" />
          <path className="rope-path" d="M80,170 C85,140 110,110 140,110" stroke="url(#ropeGradient)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#bowlineShadow)" />
          <path className="rope-path" d="M140,110 C180,115 195,90 190,60" stroke="url(#ropeGradient)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#bowlineShadow)" />
          <path className="rope-path" d="M190,60 C175,40 140,50 120,90" stroke="url(#ropeGradient)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#bowlineShadow)" />
          <path className="rope-path" d="M120,90 L100,150" stroke="url(#ropeGradient)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#bowlineShadow)" />
          
          <path d="M230,120 L250,120" stroke="white" strokeWidth="3" strokeDasharray="5,5" />
          <path d="M250,120 L260,110" stroke="white" strokeWidth="3" fill="none" />
          <path d="M250,120 L260,130" stroke="white" strokeWidth="3" fill="none" />
          <text x="200" y="110" fill="white" fontSize="16" fontWeight="500">Pull</text>
          <text x="260" y="150" fill="white" fontSize="16" fontWeight="500">Fixed loop</text>
          <path d="M260,145 L220,130" stroke="white" strokeWidth="2" strokeDasharray="3,3" />
          
          <g transform="translate(50, 230)">
            <rect width="300" height="36" rx="6" fill="rgba(255,255,255,0.1)" />
            <text x="15" y="24" fill="white" fontSize="16" fontWeight="500">Pull tight to complete the bowline knot</text>
          </g>
        </g>
      )}
    </svg>
    </IllustrationWrapper>
  );
};

const CloveHitchIllustration: FC<StepIllustrationProps> = ({ stepNumber, className = "" }) => {
  return (
    <IllustrationWrapper title="Clove Hitch" stepNumber={stepNumber} className={className}>
      <svg 
        viewBox="0 0 400 300" 
        className="knot-svg"
        style={{ background: "linear-gradient(135deg, #0c2d56, #2563eb)" }}
      >
      <defs>
        <filter id="cloveHitchShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
        </filter>
        <linearGradient id="poleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6b7280" />
          <stop offset="100%" stopColor="#4b5563" />
        </linearGradient>
        <linearGradient id="ropeGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>

      {stepNumber === 1 && (
        <g className={stepNumber === 1 ? "step-active" : ""}>
          <rect x="185" y="40" width="20" height="200" rx="5" fill="url(#poleGradient)" filter="url(#cloveHitchShadow)" />
          
          <path className="rope-path" d="M70,160 C90,160 120,90 195,90 C270,90 300,160 320,160" 
                stroke="url(#ropeGradient2)" strokeWidth="12" fill="none" strokeLinecap="round" filter="url(#cloveHitchShadow)" />
          
          <circle cx="195" cy="90" r="6" fill="white" />
          <text x="160" y="75" fill="white" fontSize="14" fontWeight="500">Around pole</text>
          <path d="M175,80 L195,90" stroke="white" strokeWidth="2" strokeDasharray="3,3" />
          
          <text x="60" y="140" fill="white" fontSize="14" fontWeight="500">Working end</text>
          <path d="M90,145 L80,155" stroke="white" strokeWidth="2" strokeDasharray="3,3" />
          
          <g transform="translate(50, 230)">
            <rect width="300" height="36" rx="6" fill="rgba(255,255,255,0.1)" />
            <text x="15" y="24" fill="white" fontSize="16" fontWeight="500">Wrap the rope around the post</text>
          </g>
        </g>
      )}
      
      {stepNumber === 2 && (
        <g className={stepNumber === 2 ? "step-active" : ""}>
          <rect x="185" y="40" width="20" height="200" rx="5" fill="url(#poleGradient)" filter="url(#cloveHitchShadow)" />
          
          <path className="rope-path" d="M70,160 C90,160 120,90 195,90 C270,90 300,160 320,160" 
                stroke="url(#ropeGradient2)" strokeWidth="12" fill="none" strokeLinecap="round" filter="url(#cloveHitchShadow)" />
          
          <path className="rope-path" d="M320,160 C300,160 270,130 195,130 C120,130 90,160 70,160" 
                stroke="url(#ropeGradient2)" strokeWidth="12" fill="none" strokeLinecap="round" filter="url(#cloveHitchShadow)" />
          
          <circle cx="195" cy="130" r="6" fill="white" />
          <text x="145" y="150" fill="white" fontSize="14" fontWeight="500">Cross over</text>
          <path d="M170,145 L190,135" stroke="white" strokeWidth="2" strokeDasharray="3,3" />
          
          <g transform="translate(50, 230)">
            <rect width="300" height="36" rx="6" fill="rgba(255,255,255,0.1)" />
            <text x="15" y="24" fill="white" fontSize="16" fontWeight="500">Cross over and wrap around post again</text>
          </g>
        </g>
      )}
      
      {stepNumber === 3 && (
        <g className={stepNumber === 3 ? "step-active" : ""}>
          <rect x="185" y="40" width="20" height="200" rx="5" fill="url(#poleGradient)" filter="url(#cloveHitchShadow)" />
          
          <path className="rope-path" d="M70,160 C90,160 120,90 195,90 C270,90 300,160 320,160" 
                stroke="url(#ropeGradient2)" strokeWidth="12" fill="none" strokeLinecap="round" filter="url(#cloveHitchShadow)" />
          
          <path className="rope-path" d="M320,160 C300,160 270,130 195,130 C140,130 115,145 100,160" 
                stroke="url(#ropeGradient2)" strokeWidth="12" fill="none" strokeLinecap="round" filter="url(#cloveHitchShadow)" />
          
          <path className="rope-path" d="M100,160 C90,165 80,165 60,165" 
                stroke="url(#ropeGradient2)" strokeWidth="12" fill="none" strokeLinecap="round" filter="url(#cloveHitchShadow)" />
          
          <text x="100" y="180" fill="white" fontSize="14" fontWeight="500">Under itself</text>
          <path d="M110,175 L100,160" stroke="white" strokeWidth="2" strokeDasharray="3,3" />
          
          <text x="240" y="140" fill="white" fontSize="14" fontWeight="500">Clove Hitch complete</text>
          <path d="M250,135 L220,120" stroke="white" strokeWidth="2" strokeDasharray="3,3" />
          
          <g transform="translate(50, 230)">
            <rect width="300" height="36" rx="6" fill="rgba(255,255,255,0.1)" />
            <text x="15" y="24" fill="white" fontSize="16" fontWeight="500">Pass end under itself to complete the hitch</text>
          </g>
        </g>
      )}
    </svg>
  );
};

const FigureEightIllustration: FC<StepIllustrationProps> = ({ stepNumber, className = "" }) => {
  return (
    <IllustrationWrapper title="Figure Eight" stepNumber={stepNumber} className={className}>
      <svg 
        viewBox="0 0 400 300" 
        className="knot-svg"
        style={{ background: "linear-gradient(135deg, #0c2d56, #2563eb)" }}
      >
      <defs>
        <filter id="figure8Shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
        </filter>
        <linearGradient id="ropeGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>

      {stepNumber === 1 && (
        <g className={stepNumber === 1 ? "step-active" : ""}>
          <path className="rope-path" d="M80,120 L200,120" 
                stroke="url(#ropeGradient3)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#figure8Shadow)" />
          
          <path className="rope-path" d="M200,120 C250,120 250,170 200,170" 
                stroke="url(#ropeGradient3)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#figure8Shadow)" />
          
          <path className="rope-path" d="M50,120 L80,120" 
                stroke="url(#ropeGradient3)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#figure8Shadow)" />
                
          <path className="rope-path" d="M200,170 L180,170" 
                stroke="url(#ropeGradient3)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#figure8Shadow)" />
          
          <text x="40" y="100" fill="white" fontSize="14" fontWeight="500">Working end</text>
          <path d="M60,105 L60,120" stroke="white" strokeWidth="2" strokeDasharray="3,3" />
          
          <text x="225" y="145" fill="white" fontSize="14" fontWeight="500">Loop</text>
          <path d="M220,145 L200,145" stroke="white" strokeWidth="2" strokeDasharray="3,3" />
          
          <text x="140" y="100" fill="white" fontSize="14" fontWeight="500">Standing part</text>
          <path d="M150,105 L150,120" stroke="white" strokeWidth="2" strokeDasharray="3,3" />
          
          <g transform="translate(50, 230)">
            <rect width="300" height="36" rx="6" fill="rgba(255,255,255,0.1)" />
            <text x="15" y="24" fill="white" fontSize="16" fontWeight="500">Form a loop, passing end over standing part</text>
          </g>
        </g>
      )}
      
      {stepNumber === 2 && (
        <g className={stepNumber === 2 ? "step-active" : ""}>
          <path className="rope-path" d="M80,120 L200,120" 
                stroke="url(#ropeGradient3)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#figure8Shadow)" />
          
          <path className="rope-path" d="M200,120 C250,120 250,170 200,170" 
                stroke="url(#ropeGradient3)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#figure8Shadow)" />
          
          <path className="rope-path" d="M50,120 L80,120" 
                stroke="url(#ropeGradient3)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#figure8Shadow)" />
                
          <path className="rope-path" d="M200,170 C150,170 100,170 80,170" 
                stroke="url(#ropeGradient3)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#figure8Shadow)" />
                
          <path className="rope-path" d="M80,170 C50,170 30,150 40,120" 
                stroke="url(#ropeGradient3)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#figure8Shadow)" />
          
          <text x="100" y="185" fill="white" fontSize="14" fontWeight="500">Wrap around</text>
          <path d="M120,180 L100,170" stroke="white" strokeWidth="2" strokeDasharray="3,3" />
          
          <g transform="translate(50, 230)">
            <rect width="300" height="36" rx="6" fill="rgba(255,255,255,0.1)" />
            <text x="15" y="24" fill="white" fontSize="16" fontWeight="500">Bring end around behind standing part</text>
          </g>
        </g>
      )}
      
      {stepNumber === 3 && (
        <g className={stepNumber === 3 ? "step-active" : ""}>
          <path className="rope-path" d="M80,120 L200,120" 
                stroke="url(#ropeGradient3)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#figure8Shadow)" />
          
          <path className="rope-path" d="M200,120 C250,120 250,170 200,170" 
                stroke="url(#ropeGradient3)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#figure8Shadow)" />
          
          <path className="rope-path" d="M50,120 L80,120" 
                stroke="url(#ropeGradient3)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#figure8Shadow)" />
                
          <path className="rope-path" d="M200,170 C150,170 100,170 80,170" 
                stroke="url(#ropeGradient3)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#figure8Shadow)" />
                
          <path className="rope-path" d="M80,170 C50,170 30,150 40,120" 
                stroke="url(#ropeGradient3)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#figure8Shadow)" />
          
          <path className="rope-path" d="M40,120 C45,100 65,85 90,85" 
                stroke="url(#ropeGradient3)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#figure8Shadow)" />
                
          <path className="rope-path" d="M90,85 L140,85" 
                stroke="url(#ropeGradient3)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#figure8Shadow)" />
          
          <text x="75" y="70" fill="white" fontSize="14" fontWeight="500">Through original loop</text>
          <path d="M100,75 L100,85" stroke="white" strokeWidth="2" strokeDasharray="3,3" />
          
          <g transform="translate(50, 230)">
            <rect width="300" height="36" rx="6" fill="rgba(255,255,255,0.1)" />
            <text x="15" y="24" fill="white" fontSize="16" fontWeight="500">Thread the working end up through original loop</text>
          </g>
          
          <text x="200" y="65" fill="white" fontSize="16" fontWeight="bold">Figure Eight Complete</text>
        </g>
      )}
    </svg>
  );
};

const SheetBendIllustration: FC<StepIllustrationProps> = ({ stepNumber, className = "" }) => {
  return (
    <IllustrationWrapper title="Sheet Bend" stepNumber={stepNumber} className={className}>
      <svg 
        viewBox="0 0 400 300" 
        className="knot-svg"
        style={{ background: "linear-gradient(135deg, #0c2d56, #2563eb)" }}
      >
      <defs>
        <filter id="sheetBendShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
        </filter>
        <linearGradient id="thickRopeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="thinRopeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fcd34d" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>

      {stepNumber === 1 && (
        <g className={stepNumber === 1 ? "step-active" : ""}>
          <path className="rope-path" d="M60,120 L200,120" 
                stroke="url(#thickRopeGradient)" strokeWidth="14" fill="none" strokeLinecap="round" filter="url(#sheetBendShadow)" />
          
          <path className="rope-path" d="M200,120 C240,120 240,160 200,160" 
                stroke="url(#thickRopeGradient)" strokeWidth="14" fill="none" strokeLinecap="round" filter="url(#sheetBendShadow)" />
                
          <path className="rope-path" d="M200,160 L120,160" 
                stroke="url(#thickRopeGradient)" strokeWidth="14" fill="none" strokeLinecap="round" filter="url(#sheetBendShadow)" />
          
          <text x="150" y="100" fill="white" fontSize="14" fontWeight="500">Thicker rope</text>
          <path d="M170,105 L170,120" stroke="white" strokeWidth="2" strokeDasharray="3,3" />
          
          <text x="240" y="140" fill="white" fontSize="14" fontWeight="500">Bight</text>
          <path d="M230,140 L210,140" stroke="white" strokeWidth="2" strokeDasharray="3,3" />
          
          <g transform="translate(50, 230)">
            <rect width="300" height="36" rx="6" fill="rgba(255,255,255,0.1)" />
            <text x="15" y="24" fill="white" fontSize="16" fontWeight="500">Form a bight in the thicker rope</text>
          </g>
        </g>
      )}
      
      {stepNumber === 2 && (
        <g className={stepNumber === 2 ? "step-active" : ""}>
          <path className="rope-path" d="M60,120 L200,120" 
                stroke="url(#thickRopeGradient)" strokeWidth="14" fill="none" strokeLinecap="round" filter="url(#sheetBendShadow)" />
          
          <path className="rope-path" d="M200,120 C240,120 240,160 200,160" 
                stroke="url(#thickRopeGradient)" strokeWidth="14" fill="none" strokeLinecap="round" filter="url(#sheetBendShadow)" />
                
          <path className="rope-path" d="M200,160 L120,160" 
                stroke="url(#thickRopeGradient)" strokeWidth="14" fill="none" strokeLinecap="round" filter="url(#sheetBendShadow)" />
          
          <path className="rope-path" d="M70,190 C100,190 130,170 160,140" 
                stroke="url(#thinRopeGradient)" strokeWidth="7" fill="none" strokeLinecap="round" filter="url(#sheetBendShadow)" />
          
          <text x="70" y="210" fill="white" fontSize="14" fontWeight="500">Thinner rope</text>
          <path d="M80,200 L80,190" stroke="white" strokeWidth="2" strokeDasharray="3,3" />
          
          <text x="150" y="130" fill="white" fontSize="14" fontWeight="500">Up through</text>
          <path d="M155,135 L155,150" stroke="white" strokeWidth="2" strokeDasharray="3,3" />
          
          <g transform="translate(50, 230)">
            <rect width="300" height="36" rx="6" fill="rgba(255,255,255,0.1)" />
            <text x="15" y="24" fill="white" fontSize="16" fontWeight="500">Pass thinner rope end up through bight</text>
          </g>
        </g>
      )}
      
      {stepNumber === 3 && (
        <g className={stepNumber === 3 ? "step-active" : ""}>
          <path className="rope-path" d="M60,120 L200,120" 
                stroke="url(#thickRopeGradient)" strokeWidth="14" fill="none" strokeLinecap="round" filter="url(#sheetBendShadow)" />
          
          <path className="rope-path" d="M200,120 C240,120 240,160 200,160" 
                stroke="url(#thickRopeGradient)" strokeWidth="14" fill="none" strokeLinecap="round" filter="url(#sheetBendShadow)" />
                
          <path className="rope-path" d="M200,160 L120,160" 
                stroke="url(#thickRopeGradient)" strokeWidth="14" fill="none" strokeLinecap="round" filter="url(#sheetBendShadow)" />
          
          <path className="rope-path" d="M70,190 C100,190 130,170 160,140" 
                stroke="url(#thinRopeGradient)" strokeWidth="7" fill="none" strokeLinecap="round" filter="url(#sheetBendShadow)" />
                
          <path className="rope-path" d="M160,140 C200,100 250,110 260,150" 
                stroke="url(#thinRopeGradient)" strokeWidth="7" fill="none" strokeLinecap="round" filter="url(#sheetBendShadow)" />
          
          <text x="240" y="120" fill="white" fontSize="14" fontWeight="500">Behind bight</text>
          <path d="M230,125 L220,140" stroke="white" strokeWidth="2" strokeDasharray="3,3" />
          
          <g transform="translate(50, 230)">
            <rect width="300" height="36" rx="6" fill="rgba(255,255,255,0.1)" />
            <text x="15" y="24" fill="white" fontSize="16" fontWeight="500">Wrap thinner rope behind the bight</text>
          </g>
        </g>
      )}
      
      {stepNumber === 4 && (
        <g className={stepNumber === 4 ? "step-active" : ""}>
          <path className="rope-path" d="M60,120 L200,120" 
                stroke="url(#thickRopeGradient)" strokeWidth="14" fill="none" strokeLinecap="round" filter="url(#sheetBendShadow)" />
          
          <path className="rope-path" d="M200,120 C240,120 240,160 200,160" 
                stroke="url(#thickRopeGradient)" strokeWidth="14" fill="none" strokeLinecap="round" filter="url(#sheetBendShadow)" />
                
          <path className="rope-path" d="M200,160 L120,160" 
                stroke="url(#thickRopeGradient)" strokeWidth="14" fill="none" strokeLinecap="round" filter="url(#sheetBendShadow)" />
          
          <path className="rope-path" d="M70,190 C100,190 130,170 160,140" 
                stroke="url(#thinRopeGradient)" strokeWidth="7" fill="none" strokeLinecap="round" filter="url(#sheetBendShadow)" />
                
          <path className="rope-path" d="M160,140 C200,100 250,110 260,150" 
                stroke="url(#thinRopeGradient)" strokeWidth="7" fill="none" strokeLinecap="round" filter="url(#sheetBendShadow)" />
                
          <path className="rope-path" d="M260,150 C260,180 210,190 170,170" 
                stroke="url(#thinRopeGradient)" strokeWidth="7" fill="none" strokeLinecap="round" filter="url(#sheetBendShadow)" />
          
          <text x="200" y="180" fill="white" fontSize="14" fontWeight="500">Tuck under itself</text>
          <path d="M200,175 L210,165" stroke="white" strokeWidth="2" strokeDasharray="3,3" />
          
          <text x="180" y="75" fill="white" fontSize="16" fontWeight="bold">Sheet Bend Complete</text>
          <text x="180" y="95" fill="white" fontSize="14" fontWeight="500">Joins two different sized ropes</text>
          
          <g transform="translate(50, 230)">
            <rect width="300" height="36" rx="6" fill="rgba(255,255,255,0.1)" />
            <text x="15" y="24" fill="white" fontSize="16" fontWeight="500">Tuck thinner rope under itself to complete</text>
          </g>
        </g>
      )}
    </svg>
  );
};
