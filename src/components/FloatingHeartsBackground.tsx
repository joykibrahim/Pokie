import React, { useMemo } from 'react';

interface FloatingHeartParticle {
  id: number;
  leftPercent: number;
  sizePx: number;
  durationSec: number;
  delaySec: number;
  maxOpacity: number;
  color: string;
  variant: 'a' | 'b';
  isOutline: boolean;
}

const HEART_COLORS = [
  '#F43F5E', // romantic rose
  '#FB7185', // soft blush pink
  '#60A5FA', // scrapbook sky blue
  '#3B82F6', // cobalt blue accent
  '#E11D48', // deep love crimson
];

/**
 * Subtle ambient floating hearts overlay that drifts gently across the
 * unlocked scrapbook diary using pure CSS keyframe animations.
 */
export const FloatingHeartsBackground: React.FC = () => {
  const particles = useMemo<FloatingHeartParticle[]>(() => {
    // Deterministic-yet-randomized distribution across the viewport width
    return Array.from({ length: 22 }).map((_, idx) => {
      const seed = (idx * 37 + 13) % 100;
      const leftPercent = Math.min(96, Math.max(3, (idx * 4.5 + (seed % 7)) % 98));
      const sizePx = 14 + (seed % 18); // 14px to 31px
      const durationSec = 13 + (seed % 11); // 13s to 23s slow gentle drift
      const delaySec = -((idx * 1.9) % durationSec); // pre-seeded across the screen immediately on unlock
      const maxOpacity = 0.18 + ((seed % 18) / 100); // subtle 0.18 to 0.35 opacity
      const color = HEART_COLORS[idx % HEART_COLORS.length];
      const variant = idx % 2 === 0 ? 'a' : 'b';
      const isOutline = idx % 3 === 0;

      return {
        id: idx,
        leftPercent,
        sizePx,
        durationSec,
        delaySec,
        maxOpacity,
        color,
        variant,
        isOutline,
      };
    });
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-30 select-none"
      aria-hidden="true"
    >
      {particles.map((h) => (
        <div
          key={h.id}
          className={
            h.variant === 'a' ? 'animate-floating-heart-a' : 'animate-floating-heart-b'
          }
          style={
            {
              position: 'absolute',
              left: `${h.leftPercent}%`,
              top: 0,
              width: `${h.sizePx}px`,
              height: `${h.sizePx}px`,
              animationDuration: `${h.durationSec}s`,
              animationDelay: `${h.delaySec}s`,
              '--heart-max-opacity': h.maxOpacity,
            } as React.CSSProperties
          }
        >
          <svg
            viewBox="0 0 32 30"
            fill={h.isOutline ? 'none' : h.color}
            stroke={h.color}
            strokeWidth={h.isOutline ? '2.2' : '0'}
            className="w-full h-full drop-shadow-xs"
          >
            <path d="M16 27.2 C16 27.2 3 18.6 3 9.6 C3 4.8 6.8 1.6 11.2 1.6 C13.8 1.6 15.4 3.2 16 4.8 C16.6 3.2 18.2 1.6 20.8 1.6 C25.2 1.6 29 4.8 29 9.6 C29 18.6 16 27.2 16 27.2 Z" />
          </svg>
        </div>
      ))}
    </div>
  );
};
