import React from 'react';

/**
 * Hand-painted 5-petal blue lily flower with pearl cluster center
 * directly inspired by the PDF scrapbook pages (Pages 1, 2, 4, 6).
 */
export const BlueLilyFlower: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 110,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none pointer-events-none drop-shadow-md ${className}`}
    aria-hidden="true"
  >
    <defs>
      <radialGradient id="lilyPetalGrad" cx="50%" cy="65%" r="65%">
        <stop offset="0%" stopColor="#1E3A8A" />
        <stop offset="45%" stopColor="#3B82F6" />
        <stop offset="85%" stopColor="#93C5FD" />
        <stop offset="100%" stopColor="#DBEAFE" />
      </radialGradient>
      <radialGradient id="pearlGrad" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="70%" stopColor="#E2E8F0" />
        <stop offset="100%" stopColor="#94A3B8" />
      </radialGradient>
    </defs>

    {[0, 72, 144, 216, 288].map((angle) => (
      <g key={angle} transform={`rotate(${angle} 60 60)`}>
        <path
          d="M60 58 C44 42 39 18 53 8 C58 4 62 4 67 8 C81 18 76 42 60 58 Z"
          fill="url(#lilyPetalGrad)"
          stroke="#1E40AF"
          strokeWidth="1.2"
        />
        {/* Delicate petal veins */}
        <path
          d="M60 54 L60 14 M60 44 L52 22 M60 44 L68 22"
          stroke="#1E3A8A"
          strokeWidth="1"
          strokeOpacity="0.45"
          strokeLinecap="round"
        />
      </g>
    ))}

    {/* Stamen & Pearl Cluster Center */}
    {[36, 108, 180, 252, 324].map((angle) => (
      <g key={angle} transform={`rotate(${angle} 60 60)`}>
        <line
          x1="60"
          y1="60"
          x2="60"
          y2="43"
          stroke="#DBEAFE"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="60" cy="42" r="3" fill="url(#pearlGrad)" />
      </g>
    ))}
    <circle cx="60" cy="60" r="6" fill="url(#pearlGrad)" />
    <circle cx="56" cy="57" r="3.5" fill="url(#pearlGrad)" />
    <circle cx="64" cy="58" r="3.5" fill="url(#pearlGrad)" />
    <circle cx="60" cy="64" r="3.5" fill="url(#pearlGrad)" />
  </svg>
);

/**
 * Brown Teddy Bear & White Polar Bear Hugging Warmly
 * Matching Page 1 bottom-right of the PDF demo.
 */
export const HuggingBearsIllustration: React.FC<{ className?: string }> = ({
  className = '',
}) => (
  <svg
    viewBox="0 0 240 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none drop-shadow-lg ${className}`}
    aria-label="Two cute teddy bears hugging"
  >
    {/* Soft ground shadow */}
    <ellipse cx="122" cy="184" rx="82" ry="11" fill="#1E293B" fillOpacity="0.12" />

    {/* Left Bear: Warm Cocoa Brown Teddy */}
    <g>
      {/* Ears */}
      <circle cx="58" cy="48" r="15" fill="#8B5A2B" />
      <circle cx="58" cy="48" r="8" fill="#D2B48C" />
      <circle cx="108" cy="42" r="15" fill="#8B5A2B" />
      <circle cx="108" cy="42" r="8" fill="#D2B48C" />

      {/* Body */}
      <ellipse cx="82" cy="134" rx="44" ry="48" fill="#8B5A2B" />
      <ellipse cx="85" cy="138" rx="26" ry="30" fill="#A67B5B" />

      {/* Left Leg */}
      <ellipse cx="54" cy="172" rx="18" ry="14" transform="rotate(-10 54 172)" fill="#7A4B21" />
      <circle cx="51" cy="173" r="6" fill="#D2B48C" />

      {/* Head */}
      <circle cx="86" cy="74" r="35" fill="#9C6634" />
      {/* Snout */}
      <ellipse cx="94" cy="81" rx="14" ry="11" fill="#E6CCB2" />
      <ellipse cx="96" cy="77" rx="5" ry="3.8" fill="#3E2723" />
      <path d="M96 81 Q93 86 89 85" stroke="#3E2723" strokeWidth="2" strokeLinecap="round" />
      {/* Eyes & Rosy Cheeks */}
      <circle cx="79" cy="69" r="3.2" fill="#271815" />
      <circle cx="102" cy="67" r="3.2" fill="#271815" />
      <ellipse cx="74" cy="78" rx="6" ry="3.5" fill="#F43F5E" fillOpacity="0.35" />
    </g>

    {/* Right Bear: Soft Cream Polar Bear */}
    <g>
      {/* Ears */}
      <circle cx="132" cy="54" r="14" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
      <circle cx="178" cy="62" r="14" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
      <circle cx="178" cy="62" r="7" fill="#FDE2E4" />

      {/* Body */}
      <ellipse cx="152" cy="140" rx="42" ry="44" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
      {/* Right Foot */}
      <ellipse cx="178" cy="174" rx="17" ry="13" transform="rotate(12 178 174)" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
      <circle cx="181" cy="175" r="5.5" fill="#FDE2E4" />

      {/* Head snuggled against Brown Bear */}
      <circle cx="146" cy="86" r="33" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
      {/* Snout */}
      <ellipse cx="136" cy="92" rx="12" ry="9.5" fill="#F1F5F9" />
      <ellipse cx="134" cy="89" rx="4.5" ry="3.2" fill="#334155" />
      <path d="M134 92 Q137 97 141 96" stroke="#334155" strokeWidth="1.8" strokeLinecap="round" />

      {/* Happy closed eyes */}
      <path d="M126 80 Q130 76 134 80" stroke="#334155" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M148 82 Q152 78 156 82" stroke="#334155" strokeWidth="2.2" strokeLinecap="round" />
      <ellipse cx="157" cy="91" rx="6" ry="3.5" fill="#FB7185" fillOpacity="0.4" />
    </g>

    {/* Interlocking Hugging Arms */}
    {/* Brown bear's arm wrapping over polar bear's shoulder */}
    <path
      d="M72 112 C98 102 135 104 158 118 C166 123 163 136 151 133 C130 127 102 126 78 130 Z"
      fill="#8B5A2B"
    />
    {/* Polar bear's arm wrapping around brown bear's waist */}
    <path
      d="M164 126 C138 134 108 134 84 124 C75 120 72 133 81 138 C108 148 138 148 164 140 Z"
      fill="#FFFFFF"
      stroke="#CBD5E1"
      strokeWidth="1.5"
    />

    {/* Floating Love Heart Above Bears */}
    <path
      d="M119 28 C116 21 106 19 102 25 C98 31 104 40 119 49 C134 40 140 31 136 25 C132 19 122 21 119 28 Z"
      fill="#E11D48"
    />
  </svg>
);

/**
 * Pastel Blue Satin Ribbon Bow from Page 4 top-right of PDF
 */
export const BlueRibbonBow: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 140 130"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none pointer-events-none drop-shadow ${className}`}
    aria-hidden="true"
  >
    {/* Left & Right Ribbon Tails */}
    <path
      d="M66 56 C55 82 42 104 28 122 L44 118 L48 126 C58 104 66 82 72 60 Z"
      fill="#60A5FA"
      stroke="#1D4ED8"
      strokeWidth="1.2"
    />
    <path
      d="M74 56 C85 82 96 104 108 124 L94 117 L88 125 C80 102 74 82 68 60 Z"
      fill="#3B82F6"
      stroke="#1D4ED8"
      strokeWidth="1.2"
    />
    {/* Left Loop */}
    <path
      d="M68 52 C42 22 12 28 16 54 C20 76 48 68 68 56 Z"
      fill="#93C5FD"
      stroke="#1E40AF"
      strokeWidth="1.4"
    />
    {/* Right Loop */}
    <path
      d="M72 52 C98 22 128 28 124 54 C120 76 92 68 72 56 Z"
      fill="#93C5FD"
      stroke="#1E40AF"
      strokeWidth="1.4"
    />
    {/* Center Knot */}
    <rect
      x="61"
      y="44"
      width="18"
      height="18"
      rx="6"
      fill="#2563EB"
      stroke="#1E3A8A"
      strokeWidth="1.4"
    />
  </svg>
);

/**
 * Hand-drawn blue scrapbook star sticker (Page 3 & Page 4 of PDF)
 */
export const ScrapbookStarSticker: React.FC<{
  className?: string;
  color?: string;
  size?: number;
}> = ({ className = '', color = '#2563EB', size = 56 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none pointer-events-none ${className}`}
    aria-hidden="true"
  >
    <path
      d="M32 6 L39.5 22.5 L57.5 24.5 L44 36.8 L47.5 54.5 L32 45.5 L16.5 54.5 L20 36.8 L6.5 24.5 L24.5 22.5 Z"
      fill="#EFF6FF"
      stroke={color}
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <path
      d="M32 12 L37.5 24.5 L51 26 L41 35 L43.5 48.5 L32 41.8 L20.5 48.5 L23 35 L13 26 L26.5 24.5 Z"
      fill={color}
      fillOpacity="0.28"
    />
  </svg>
);

/**
 * Illustrated Romantic Couple Scenes for default Polaroid & Camera slots
 * Ensures 100% zero broken images while feeling deeply personal & romantic.
 */
export const CoupleArtworkSVG: React.FC<{
  scene:
    | 'golden-embrace'
    | 'photobooth-kiss'
    | 'beach-sunset'
    | 'cozy-hoodie'
    | 'cafe-date'
    | 'stargazing'
    | 'polaroid-selfie'
    | 'autumn-walk';
  className?: string;
}> = ({ scene, className = '' }) => {
  const palettes: Record<
    string,
    { sky1: string; sky2: string; accent: string; silhouette: string; glow: string }
  > = {
    'golden-embrace': {
      sky1: '#FDE68A',
      sky2: '#FDBA74',
      accent: '#EA580C',
      silhouette: '#431407',
      glow: '#FEF3C7',
    },
    'photobooth-kiss': {
      sky1: '#DBEAFE',
      sky2: '#BFDBFE',
      accent: '#2563EB',
      silhouette: '#1E293B',
      glow: '#EFF6FF',
    },
    'beach-sunset': {
      sky1: '#FECDD3',
      sky2: '#FDE68A',
      accent: '#E11D48',
      silhouette: '#31102F',
      glow: '#FFF1F2',
    },
    'cozy-hoodie': {
      sky1: '#E0E7FF',
      sky2: '#C7D2FE',
      accent: '#4F46E5',
      silhouette: '#1E1B4B',
      glow: '#EEF2FF',
    },
    'cafe-date': {
      sky1: '#F5EBE6',
      sky2: '#E6CCB2',
      accent: '#9C6644',
      silhouette: '#3E2723',
      glow: '#FAF3DD',
    },
    stargazing: {
      sky1: '#1E3A8A',
      sky2: '#3B82F6',
      accent: '#93C5FD',
      silhouette: '#0F172A',
      glow: '#DBEAFE',
    },
    'polaroid-selfie': {
      sky1: '#FFE4E6',
      sky2: '#FECDD3',
      accent: '#F43F5E',
      silhouette: '#4C0519',
      glow: '#FFF1F2',
    },
    'autumn-walk': {
      sky1: '#FED7AA',
      sky2: '#FCA5A5',
      accent: '#DC2626',
      silhouette: '#450A0A',
      glow: '#FFEDD5',
    },
  };

  const p = palettes[scene] || palettes['golden-embrace'];

  return (
    <svg
      viewBox="0 0 320 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full object-cover select-none ${className}`}
    >
      <defs>
        <linearGradient id={`bg-${scene}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.sky1} />
          <stop offset="100%" stopColor={p.sky2} />
        </linearGradient>
      </defs>

      {/* Background Sky */}
      <rect width="320" height="260" fill={`url(#bg-${scene})`} />

      {/* Warm Sun / Moon Glow */}
      <circle cx="235" cy="72" r="42" fill={p.glow} fillOpacity="0.65" />

      {/* Twinkling stars for stargazing */}
      {scene === 'stargazing' && (
        <g fill="#FFFFFF" opacity="0.85">
          <circle cx="55" cy="42" r="2" />
          <circle cx="95" cy="68" r="1.5" />
          <circle cx="145" cy="34" r="2.5" />
          <circle cx="275" cy="48" r="2" />
          <circle cx="68" cy="110" r="1.5" />
        </g>
      )}

      {/* Soft distant hills */}
      <path
        d="M0 195 Q85 165 175 188 T320 180 L320 260 L0 260 Z"
        fill={p.accent}
        fillOpacity="0.22"
      />

      {/* Romantic Couple Silhouette & Warm Details in Foreground */}
      {/* Partner 1 (Left/Taller) */}
      <g>
        {/* Shoulders & Torso */}
        <path
          d="M86 260 C88 202 108 175 138 175 C166 175 180 205 184 260 Z"
          fill={p.silhouette}
        />
        {/* Head tilted lovingly right */}
        <circle cx="142" cy="136" r="27" fill="#FDBA74" />
        {/* Hair */}
        <path
          d="M114 134 C112 106 138 98 162 110 C172 116 170 132 162 134 C152 122 130 122 118 138 Z"
          fill={p.silhouette}
        />
        {/* Gentle smile */}
        <path
          d="M148 144 Q153 148 158 144"
          stroke={p.silhouette}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      {/* Partner 2 (Right, leaning in close) */}
      <g>
        {/* Shoulders & Torso */}
        <path
          d="M142 260 C146 210 164 184 192 184 C218 184 236 212 240 260 Z"
          fill={p.accent}
        />
        {/* Head resting close */}
        <circle cx="182" cy="148" r="25" fill="#FED7AA" />
        {/* Flowing Hair */}
        <path
          d="M160 138 C168 114 204 116 214 144 C222 168 228 202 222 228 C210 218 204 185 198 164 C188 146 172 142 160 138 Z"
          fill={p.silhouette}
        />
        {/* Blush */}
        <ellipse cx="174" cy="154" rx="5" ry="2.8" fill="#F43F5E" fillOpacity="0.45" />
      </g>

      {/* Floating Love Heart between them */}
      <path
        d="M164 92 C161 85 151 83 147 89 C143 95 149 104 164 113 C179 104 185 95 181 89 C177 83 167 85 164 92 Z"
        fill="#E11D48"
      />
    </svg>
  );
};
