import React from 'react';

interface LoveShapeDigitProps {
  digit: string | number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  accentColor?: string;
}

/**
 * Custom Love-Shape Font Renderer:
 * Every numeral (0-9) is crafted with bespoke heart-shaped loops,
 * Cupid-heart terminals, and romantic curved strokes so the numbers
 * themselves are visibly formed out of love-heart shapes.
 */
export const LoveShapeDigit: React.FC<LoveShapeDigitProps> = ({
  digit,
  size = 'md',
  color = '#1E3A8A',
  accentColor = '#E11D48',
}) => {
  const d = String(digit);
  const dimensions =
    size === 'sm'
      ? 'w-7 h-8'
      : size === 'lg'
      ? 'w-12 h-14'
      : 'w-9 h-11';

  return (
    <svg
      viewBox="0 0 64 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${dimensions} inline-block select-none overflow-visible`}
      aria-label={`Love shaped number ${d}`}
    >
      {/* Subtle drop shadow for hand-lettered depth */}
      <g transform="translate(1.5, 2)" opacity="0.16">
        {renderDigitPaths(d, '#0F172A', '#0F172A')}
      </g>
      {renderDigitPaths(d, color, accentColor)}
    </svg>
  );
};

function renderMiniHeart(cx: number, cy: number, scale: number, fill: string, rotate = 0) {
  return (
    <g transform={`translate(${cx}, ${cy}) rotate(${rotate}) scale(${scale})`}>
      <path
        d="M0 4.5 C-1.5 1.5 -5.5 0 -7.5 3 C-9.5 6 -6.5 10.5 0 15 C6.5 10.5 9.5 6 7.5 3 C5.5 0 1.5 1.5 0 4.5 Z"
        fill={fill}
      />
    </g>
  );
}

function renderDigitPaths(d: string, strokeColor: string, heartColor: string) {
  switch (d) {
    case '0':
      // A plump open love-heart contour forming the number 0
      return (
        <g>
          <path
            d="M32 21 C26 11 11 13 11 28 C11 45 25 57 32 64 C39 57 53 45 53 28 C53 13 38 11 32 21 Z"
            stroke={strokeColor}
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {renderMiniHeart(32, 13, 0.85, heartColor)}
          {renderMiniHeart(32, 56, 0.65, heartColor)}
        </g>
      );

    case '1':
      // Romantic serif '1' crowned with a tilted love heart at the peak & heart base
      return (
        <g>
          <path
            d="M20 24 C25 21 30 16 33 12 L33 60"
            stroke={strokeColor}
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 61 C28 59 38 59 45 61"
            stroke={strokeColor}
            strokeWidth="6"
            strokeLinecap="round"
          />
          {renderMiniHeart(33, 6, 0.95, heartColor, -8)}
          {renderMiniHeart(33, 35, 0.7, heartColor)}
        </g>
      );

    case '2':
      // Top curve is half a love-heart swooping down into a ribbon base with heart terminal
      return (
        <g>
          <path
            d="M17 25 C15 13 28 11 32 19 C36 11 49 13 47 26 C45 38 24 47 16 60 L48 60"
            stroke={strokeColor}
            strokeWidth="6.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {renderMiniHeart(17, 20, 0.78, heartColor, -15)}
          {renderMiniHeart(48, 52, 0.85, heartColor, 12)}
        </g>
      );

    case '3':
      // Sideways double-lobed love-heart silhouette forming a curvy '3'
      return (
        <g>
          <path
            d="M18 17 C27 11 45 14 44 25 C43 34 33 37 27 37 C35 37 46 41 45 52 C44 62 26 65 17 57"
            stroke={strokeColor}
            strokeWidth="6.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {renderMiniHeart(18, 12, 0.75, heartColor, -20)}
          {renderMiniHeart(27, 31, 0.72, heartColor)}
          {renderMiniHeart(17, 50, 0.75, heartColor, 15)}
        </g>
      );

    case '4':
      // Expressive '4' with a love-heart ribbon loop intersection and heart crown
      return (
        <g>
          <path
            d="M38 62 L38 14 C29 27 19 39 13 46 L49 46"
            stroke={strokeColor}
            strokeWidth="6.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {renderMiniHeart(38, 7, 0.9, heartColor, 6)}
          {renderMiniHeart(49, 39, 0.78, heartColor, 14)}
          {renderMiniHeart(25, 40, 0.65, heartColor, -10)}
        </g>
      );

    case '5':
      // Top love-ribbon bar + heart-shaped lower belly
      return (
        <g>
          <path
            d="M44 15 L21 15 L19 34 C26 29 46 31 46 46 C46 59 29 64 17 56"
            stroke={strokeColor}
            strokeWidth="6.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {renderMiniHeart(45, 9, 0.8, heartColor, 15)}
          {renderMiniHeart(17, 49, 0.8, heartColor, -12)}
        </g>
      );

    case '6':
      // Graceful upper stem curving into a full love-heart bottom bowl
      return (
        <g>
          <path
            d="M41 14 C26 18 15 32 15 47 C15 58 24 63 32 63 C41 63 48 56 48 46 C48 36 38 34 32 41 C26 34 16 36 16 46"
            stroke={strokeColor}
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {renderMiniHeart(42, 9, 0.85, heartColor, 15)}
          {renderMiniHeart(32, 43, 0.7, heartColor)}
        </g>
      );

    case '7':
      // Wavy Cupid bow top bar + diagonal stem with a love-heart clasp in the middle
      return (
        <g>
          <path
            d="M15 17 C24 14 38 19 47 16 C39 30 30 45 25 61"
            stroke={strokeColor}
            strokeWidth="6.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 38 L41 38"
            stroke={strokeColor}
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          {renderMiniHeart(15, 11, 0.75, heartColor, -15)}
          {renderMiniHeart(31, 31, 0.88, heartColor)}
        </g>
      );

    case '8':
      // Two stacked love hearts (top heart + bottom heart) forming the figure 8
      return (
        <g>
          {/* Top heart */}
          <path
            d="M32 18 C28 11 17 12 17 22 C17 30 27 35 32 39 C37 35 47 30 47 22 C47 12 36 11 32 18 Z"
            stroke={strokeColor}
            strokeWidth="5.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Bottom heart */}
          <path
            d="M32 43 C27 36 14 38 14 49 C14 58 26 62 32 65 C38 62 50 58 50 49 C50 38 37 36 32 43 Z"
            stroke={strokeColor}
            strokeWidth="5.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {renderMiniHeart(32, 33, 0.75, heartColor)}
        </g>
      );

    case '9':
    default:
      // Top bowl is a love-heart, sweeping down into a romantic curved tail
      return (
        <g>
          <path
            d="M32 20 C26 12 15 15 15 26 C15 36 25 41 32 44 C39 41 48 36 48 26 C48 15 38 12 32 20 Z"
            stroke={strokeColor}
            strokeWidth="5.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M47 27 C48 44 39 58 21 62"
            stroke={strokeColor}
            strokeWidth="6"
            strokeLinecap="round"
          />
          {renderMiniHeart(32, 14, 0.72, heartColor)}
          {renderMiniHeart(21, 55, 0.82, heartColor, -12)}
        </g>
      );
  }
}
