import { FC } from 'react';
import { IllustrationWrapper } from './IllustrationWrapper';

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
          {/* Draw the initial loop as a continuous path */}
          <path 
            className="rope-path" 
            d="M100,120 C110,100 130,90 150,90 C170,90 190,100 200,120 C200,130 200,140 200,150 C180,150 160,150 140,150 C120,150 100,150 100,150 L100,120" 
            stroke="url(#ropeGradient)" 
            strokeWidth="10" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter="url(#bowlineShadow)" 
          />
          
          <circle cx="140" cy="100" r="6" fill="white" filter="url(#bowlineShadow)" />
          <path d="M150,60 L140,100" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
          <text x="155" y="70" fill="white" fontSize="14" fontWeight="500">Standing part</text>
          
          <text x="210" y="135" fill="white" fontSize="14" fontWeight="500">Loop</text>
          <path d="M205,135 L180,130" stroke="white" strokeWidth="2" strokeDasharray="3,3" />
          
          <g transform="translate(50, 230)">
            <rect width="300" height="36" rx="6" fill="rgba(255,255,255,0.1)" />
            <text x="15" y="24" fill="white" fontSize="16" fontWeight="500">Form a small loop in the standing part</text>
          </g>
        </g>
      )}
      
      {stepNumber === 2 && (
        <g className={stepNumber === 2 ? "step-active" : ""}>
          {/* Base loop */}
          <path 
            className="rope-path" 
            d="M100,120 C110,100 130,90 150,90 C170,90 190,100 200,120 C200,130 200,140 200,150 C180,150 160,150 140,150 C120,150 100,150 100,150 L100,120" 
            stroke="url(#ropeGradient)" 
            strokeWidth="10" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter="url(#bowlineShadow)" 
          />
          
          {/* Working end going through the loop */}
          <path 
            className="rope-path" 
            d="M80,180 C85,170 90,160 100,150 C100,140 100,130 120,120 C130,115 140,115 150,120" 
            stroke="url(#ropeGradient)" 
            strokeWidth="10" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter="url(#bowlineShadow)" 
          />
          
          <text x="60" y="195" fill="white" fontSize="14" fontWeight="500">Working end</text>
          <path d="M90,190 L82,178" stroke="white" strokeWidth="2" strokeDasharray="3,3" />
          
          <g transform="translate(50, 230)">
            <rect width="300" height="36" rx="6" fill="rgba(255,255,255,0.1)" />
            <text x="15" y="24" fill="white" fontSize="16" fontWeight="500">Pass the working end up through the loop</text>
          </g>
        </g>
      )}
      
      {stepNumber === 3 && (
        <g className={stepNumber === 3 ? "step-active" : ""}>
          {/* Base loop */}
          <path 
            className="rope-path" 
            d="M100,120 C110,100 130,90 150,90 C170,90 190,100 200,120 C200,130 200,140 200,150 C180,150 160,150 140,150 C120,150 100,150 100,150 L100,120" 
            stroke="url(#ropeGradient)" 
            strokeWidth="10" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter="url(#bowlineShadow)" 
          />
          
          {/* Working end through loop and wrapping around standing part */}
          <path 
            className="rope-path" 
            d="M80,180 C85,170 90,160 100,150 C100,140 100,130 120,120 C130,115 140,115 150,120" 
            stroke="url(#ropeGradient)" 
            strokeWidth="10" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter="url(#bowlineShadow)" 
          />
          
          <path 
            className="rope-path" 
            d="M150,120 C170,125 185,115 190,90 C195,70 180,60 160,70" 
            stroke="url(#ropeGradient)" 
            strokeWidth="10" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter="url(#bowlineShadow)" 
          />
          
          <text x="150" y="60" fill="white" fontSize="14" fontWeight="500">Behind standing part</text>
          <path d="M175,65 L185,75" stroke="white" strokeWidth="2" strokeDasharray="3,3" />
          
          <g transform="translate(50, 230)">
            <rect width="300" height="36" rx="6" fill="rgba(255,255,255,0.1)" />
            <text x="15" y="24" fill="white" fontSize="16" fontWeight="500">Wrap the working end behind standing part</text>
          </g>
        </g>
      )}
      
      {stepNumber === 4 && (
        <g className={stepNumber === 4 ? "step-active" : ""}>
          {/* Base loop */}
          <path 
            className="rope-path" 
            d="M100,120 C110,100 130,90 150,90 C170,90 190,100 200,120 C200,130 200,140 200,150 C180,150 160,150 140,150 C120,150 100,150 100,150 L100,120" 
            stroke="url(#ropeGradient)" 
            strokeWidth="10" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter="url(#bowlineShadow)" 
          />
          
          {/* Working end through loop and wrapping around standing part */}
          <path 
            className="rope-path" 
            d="M80,180 C85,170 90,160 100,150 C100,140 100,130 120,120 C130,115 140,115 150,120" 
            stroke="url(#ropeGradient)" 
            strokeWidth="10" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter="url(#bowlineShadow)" 
          />
          
          <path 
            className="rope-path" 
            d="M150,120 C170,125 185,115 190,90 C195,70 180,60 160,70" 
            stroke="url(#ropeGradient)" 
            strokeWidth="10" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter="url(#bowlineShadow)" 
          />
          
          {/* Working end coming back through the loop */}
          <path 
            className="rope-path" 
            d="M160,70 C140,80 130,100 130,120 C130,130 125,140 120,150" 
            stroke="url(#ropeGradient)" 
            strokeWidth="10" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter="url(#bowlineShadow)" 
          />
          
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
          {/* The completed bowline - rendered as a continuous path */}
          <path 
            className="rope-path" 
            d="M80,180 C85,170 90,160 100,150 C100,140 100,120 100,120 C110,100 130,90 150,90 C170,90 190,100 200,120 C200,130 200,140 200,150" 
            stroke="url(#ropeGradient)" 
            strokeWidth="10" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter="url(#bowlineShadow)" 
          />
          
          <path 
            className="rope-path" 
            d="M120,150 C130,140 130,130 130,120 C130,100 140,80 160,70 C180,60 195,70 190,90 C185,115 170,125 150,120 C140,115 130,115 120,120 C100,130 100,140 100,150" 
            stroke="url(#ropeGradient)" 
            strokeWidth="10" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter="url(#bowlineShadow)" 
          />
          
          {/* Arrows and labels */}
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

      {/* Pole stays constant across all steps */}
      <rect x="185" y="40" width="20" height="200" rx="5" fill="url(#poleGradient)" filter="url(#cloveHitchShadow)" />

      {stepNumber === 1 && (
        <g className={stepNumber === 1 ? "step-active" : ""}>
          <path 
            className="rope-path" 
            d="M70,160 C90,160 140,130 180,110 C220,90 270,90 300,110 C320,120 330,140 320,160" 
            stroke="url(#ropeGradient2)" 
            strokeWidth="12" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter="url(#cloveHitchShadow)" 
          />
          
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
          {/* First wrap around pole */}
          <path 
            className="rope-path" 
            d="M70,160 C90,160 140,130 180,110 C220,90 270,90 300,110 C320,120 330,140 320,160" 
            stroke="url(#ropeGradient2)" 
            strokeWidth="12" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter="url(#cloveHitchShadow)" 
          />
          
          {/* Second wrap around pole */}
          <path 
            className="rope-path" 
            d="M320,160 C300,160 240,140 195,130 C150,120 100,120 70,160" 
            stroke="url(#ropeGradient2)" 
            strokeWidth="12" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter="url(#cloveHitchShadow)" 
          />
          
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
          {/* First wrap around pole */}
          <path 
            className="rope-path" 
            d="M70,160 C90,160 140,130 180,110 C220,90 270,90 300,110 C320,120 330,140 320,160" 
            stroke="url(#ropeGradient2)" 
            strokeWidth="12" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter="url(#cloveHitchShadow)" 
          />
          
          {/* Second wrap around pole with end tucked under */}
          <path 
            className="rope-path" 
            d="M320,160 C300,160 240,140 195,130 C150,120 110,130 95,145 C85,155 75,160 60,165" 
            stroke="url(#ropeGradient2)" 
            strokeWidth="12" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter="url(#cloveHitchShadow)" 
          />
          
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
    </IllustrationWrapper>
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
          <path 
            className="rope-path" 
            d="M50,120 L80,120 L200,120 C230,120 250,140 250,170 C250,200 230,220 200,220 C170,220 160,200 170,170" 
            stroke="url(#ropeGradient3)" 
            strokeWidth="10" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter="url(#figure8Shadow)" 
          />
          
          <text x="40" y="100" fill="white" fontSize="14" fontWeight="500">Working end</text>
          <path d="M60,105 L60,120" stroke="white" strokeWidth="2" strokeDasharray="3,3" />
          
          <text x="225" y="185" fill="white" fontSize="14" fontWeight="500">Loop</text>
          <path d="M220,185 L205,185" stroke="white" strokeWidth="2" strokeDasharray="3,3" />
          
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
          <path 
            className="rope-path" 
            d="M50,120 L80,120 L200,120 C230,120 250,140 250,170 C250,200 230,220 200,220 C170,220 130,220 100,220 C70,220 50,200 40,170 C35,150 40,130 50,120" 
            stroke="url(#ropeGradient3)" 
            strokeWidth="10" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter="url(#figure8Shadow)" 
          />
          
          <text x="100" y="240" fill="white" fontSize="14" fontWeight="500">Wrap around</text>
          <path d="M120,235 L100,220" stroke="white" strokeWidth="2" strokeDasharray="3,3" />
          
          <g transform="translate(50, 230)">
            <rect width="300" height="36" rx="6" fill="rgba(255,255,255,0.1)" />
            <text x="15" y="24" fill="white" fontSize="16" fontWeight="500">Bring end around behind standing part</text>
          </g>
        </g>
      )}
      
      {stepNumber === 3 && (
        <g className={stepNumber === 3 ? "step-active" : ""}>
          <path 
            className="rope-path" 
            d="M50,120 L80,120 L200,120 C230,120 250,140 250,170 C250,200 230,220 200,220 C170,220 130,220 100,220 C70,220 50,200 40,170 C35,150 40,130 60,100 C70,85 90,80 120,80 C150,80 160,90 150,120" 
            stroke="url(#ropeGradient3)" 
            strokeWidth="10" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter="url(#figure8Shadow)" 
          />
          
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
    </IllustrationWrapper>
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
          <path 
            className="rope-path" 
            d="M60,120 L200,120 C230,120 250,140 250,160 C250,180 230,200 200,200 C160,200 120,200 120,160 C120,140 140,120 200,120" 
            stroke="url(#thickRopeGradient)" 
            strokeWidth="14" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter="url(#sheetBendShadow)" 
          />
          
          <text x="150" y="100" fill="white" fontSize="14" fontWeight="500">Thicker rope</text>
          <path d="M170,105 L170,120" stroke="white" strokeWidth="2" strokeDasharray="3,3" />
          
          <text x="240" y="160" fill="white" fontSize="14" fontWeight="500">Bight</text>
          <path d="M230,160 L210,160" stroke="white" strokeWidth="2" strokeDasharray="3,3" />
          
          <g transform="translate(50, 230)">
            <rect width="300" height="36" rx="6" fill="rgba(255,255,255,0.1)" />
            <text x="15" y="24" fill="white" fontSize="16" fontWeight="500">Form a bight in the thicker rope</text>
          </g>
        </g>
      )}
      
      {stepNumber === 2 && (
        <g className={stepNumber === 2 ? "step-active" : ""}>
          <path 
            className="rope-path" 
            d="M60,120 L200,120 C230,120 250,140 250,160 C250,180 230,200 200,200 C160,200 120,200 120,160 C120,140 140,120 200,120" 
            stroke="url(#thickRopeGradient)" 
            strokeWidth="14" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter="url(#sheetBendShadow)" 
          />
          
          <path 
            className="rope-path" 
            d="M70,190 C100,190 130,170 160,140" 
            stroke="url(#thinRopeGradient)" 
            strokeWidth="7" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter="url(#sheetBendShadow)" 
          />
          
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
          <path 
            className="rope-path" 
            d="M60,120 L200,120 C230,120 250,140 250,160 C250,180 230,200 200,200 C160,200 120,200 120,160 C120,140 140,120 200,120" 
            stroke="url(#thickRopeGradient)" 
            strokeWidth="14" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter="url(#sheetBendShadow)" 
          />
          
          <path 
            className="rope-path" 
            d="M70,190 C100,190 130,170 160,140 C200,100 250,100 270,140" 
            stroke="url(#thinRopeGradient)" 
            strokeWidth="7" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter="url(#sheetBendShadow)" 
          />
          
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
          <path 
            className="rope-path" 
            d="M60,120 L200,120 C230,120 250,140 250,160 C250,180 230,200 200,200 C160,200 120,200 120,160 C120,140 140,120 200,120" 
            stroke="url(#thickRopeGradient)" 
            strokeWidth="14" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter="url(#sheetBendShadow)" 
          />
          
          <path 
            className="rope-path" 
            d="M70,190 C100,190 130,170 160,140 C200,100 250,100 270,140 C280,160 260,180 230,180 C200,180 180,170 170,160" 
            stroke="url(#thinRopeGradient)" 
            strokeWidth="7" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter="url(#sheetBendShadow)" 
          />
          
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
    </IllustrationWrapper>
  );
};
