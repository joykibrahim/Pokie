import React, { useState, useEffect, useCallback } from 'react';
import { Delete, Heart, Lock, Unlock, Sparkles, HelpCircle } from 'lucide-react';
import { LoveShapeDigit } from './LoveShapeDigits';
import { BlueLilyFlower, HuggingBearsIllustration, ScrapbookStarSticker } from './ScrapbookDecorations';
import { soundManager } from '../utils/soundEffects';

interface PasscodeGateProps {
  onUnlock: () => void;
}

const TARGET_PASSCODE = '1410';

export const PasscodeGate: React.FC<PasscodeGateProps> = ({ onUnlock }) => {
  const [entered, setEntered] = useState<string>('');
  const [errorShake, setErrorShake] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isUnlockedAnim, setIsUnlockedAnim] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  const handleDigitPress = useCallback(
    (digitStr: string) => {
      if (isUnlockedAnim) return;
      setErrorMessage('');
      soundManager.playHeartKey(Number(digitStr));

      setEntered((prev) => {
        if (prev.length >= 4) return prev;
        const next = prev + digitStr;

        if (next.length === 4) {
          if (next === TARGET_PASSCODE) {
            setIsUnlockedAnim(true);
            soundManager.playUnlockChime();
            setTimeout(() => {
              onUnlock();
            }, 650);
          } else {
            setErrorShake(true);
            setErrorMessage('Oopsie pokie! That is not our secret code <3');
            setTimeout(() => {
              setErrorShake(false);
              setEntered('');
            }, 650);
          }
        }
        return next;
      });
    },
    [isUnlockedAnim, onUnlock]
  );

  const handleBackspace = useCallback(() => {
    if (isUnlockedAnim) return;
    setErrorMessage('');
    setEntered((prev) => prev.slice(0, -1));
  }, [isUnlockedAnim]);

  const handleClear = useCallback(() => {
    if (isUnlockedAnim) return;
    setErrorMessage('');
    setEntered('');
  }, [isUnlockedAnim]);

  // Support typing 1410 directly on the physical keyboard
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handleDigitPress(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Escape') {
        handleClear();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleDigitPress, handleBackspace, handleClear]);

  const keypadDigits = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return (
    <div className="min-h-screen w-full bg-[#1E3A8A] flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Scrapbook Outer Collage Background Layers (Matching PDF Demo Page 1) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-left & Top-right vintage newspaper print strips */}
        <div className="absolute -top-6 -left-6 w-72 h-56 bg-[#F5F2EB] opacity-90 rotate-[-8deg] p-4 text-[9px] leading-tight font-serif text-slate-600 select-none border border-slate-300 shadow-md">
          <p className="font-bold uppercase tracking-widest mb-1 text-slate-800">THE DAILY LOVE CHRONICLE · EDITION 1410</p>
          <p>
            Every love story is beautiful, but ours is my absolute favorite chapter. From late night laughs to quiet mornings, you are the sweetest melody in my everyday life.
          </p>
          <p className="mt-2">
            Dedicated exclusively to my pokie girlfriend—keep this secret passcode safe inside your heart forever and always.
          </p>
        </div>

        <div className="absolute -top-4 -right-6 w-80 h-64 bg-[#F5F2EB] opacity-90 rotate-[6deg] p-4 text-[9px] leading-tight font-serif text-slate-600 select-none border border-slate-300 shadow-md">
          <p className="font-bold uppercase tracking-widest mb-1 text-slate-800">ROMANCE & POETRY ARCHIVE · VOL. II</p>
          <p>
            My darling, all I want is to be your moon and show you all the little stars of my heart. Happiness (n.) the state of being right next to you.
          </p>
        </div>

        {/* Bottom-right Blue Gingham Fabric Patch */}
        <div className="absolute -bottom-10 -right-10 w-96 h-80 bg-blue-gingham rotate-[-4deg] border-4 border-white shadow-xl" />
      </div>

      {/* Main Tilted Grid-Paper Scrapbook Sheet */}
      <div className="relative z-10 w-full max-w-4xl bg-scrapbook-grid rounded-2xl shadow-2xl border-4 border-[#FAF8F3] p-6 sm:p-10 md:p-12 transition-transform duration-300">
        {/* Decorative Blue Lily Flowers in Corners (Matching PDF) */}
        <BlueLilyFlower className="absolute -top-10 -right-8 w-28 h-28 sm:w-36 sm:h-36 rotate-12 z-20" />
        <BlueLilyFlower className="absolute -bottom-10 -left-8 w-28 h-28 sm:w-32 sm:h-32 -rotate-12 z-20" />
        <ScrapbookStarSticker className="absolute top-6 left-6 hidden sm:block -rotate-12" size={48} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Scrapbook Cover Greeting & Hugging Teddy Bears */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-[#1E40AF] tracking-wide">
              <Lock className="w-3.5 h-3.5 text-[#E11D48]" />
              <span>Private Scrapbook Diary</span>
              <span aria-hidden="true">·</span>
              <span>For My Pokie Only</span>
            </div>

            <h1
              className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl font-bold text-[#0F172A] tracking-tight leading-[1.08]"
              style={{ textWrap: 'balance' }}
            >
              For My Pokie Girlfriend &lt;3
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-md leading-relaxed">
              I made a handmade digital scrapbook just for you. Enter our 4-digit secret love passcode in the heart keypad to unlock your surprise!
            </p>

            {/* Kraft Paper Hint Note */}
            <div className="w-full max-w-sm bg-[#F3E5AB]/70 border border-[#D4A373]/50 rounded-xl p-3.5 shadow-sm text-left relative">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowHint((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#78350F] hover:text-[#451A03] transition-colors cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{showHint ? 'Hide Secret Passcode Hint' : 'Need a hint for the passcode?'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEntered('');
                    ['1', '4', '1', '0'].forEach((d, idx) => {
                      setTimeout(() => handleDigitPress(d), idx * 110);
                    });
                  }}
                  className="text-xs font-semibold text-[#1D4ED8] hover:underline cursor-pointer whitespace-nowrap shrink-0"
                >
                  Auto-Enter 1410
                </button>
              </div>
              {showHint && (
                <p className="mt-1.5 text-xs text-[#78350F] font-serif-editorial italic text-sm">
                  “Our special love numbers: <strong className="font-sans not-italic">1410</strong> (Tap the love-shaped numbers 1 · 4 · 1 · 0)”
                </p>
              )}
            </div>

            {/* Hugging Bears Illustration from Page 1 of the PDF */}
            <div className="pt-2 w-48 sm:w-56 mx-auto lg:mx-0">
              <HuggingBearsIllustration />
            </div>
          </div>

          {/* Right Column: Love-Shape Font Passcode Display & Heart Keypad */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div
              className={`w-full max-w-sm bg-white/90 backdrop-blur-sm border-2 border-[#BFDBFE] rounded-2xl p-5 sm:p-6 shadow-xl ${
                errorShake ? 'animate-shake border-rose-400' : ''
              }`}
            >
              {/* Passcode Header */}
              <div className="text-center mb-4">
                <span className="text-xs font-medium text-slate-500">
                  Enter 4-Digit Love Passcode
                </span>
                {/* 4 Love-Heart Display Slots */}
                <div className="mt-3 flex items-center justify-center gap-3">
                  {[0, 1, 2, 3].map((slotIdx) => {
                    const char = entered[slotIdx];
                    const isFilled = Boolean(char);
                    return (
                      <div
                        key={slotIdx}
                        className={`w-14 h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-150 ${
                          isUnlockedAnim
                            ? 'bg-rose-50 border-rose-400 scale-105'
                            : isFilled
                            ? 'bg-[#EFF6FF] border-[#3B82F6] shadow-sm scale-105'
                            : 'bg-slate-50/80 border-dashed border-slate-300'
                        }`}
                      >
                        {isFilled ? (
                          <LoveShapeDigit
                            digit={char}
                            size="md"
                            color="#1E3A8A"
                            accentColor="#E11D48"
                          />
                        ) : (
                          <Heart className="w-5 h-5 text-rose-300/80 fill-rose-100" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Error or Unlock Status Message */}
                <div className="h-6 mt-2 flex items-center justify-center">
                  {errorMessage ? (
                    <p className="text-xs font-medium text-rose-600">{errorMessage}</p>
                  ) : isUnlockedAnim ? (
                    <p className="text-xs font-semibold text-emerald-700 inline-flex items-center gap-1">
                      <Unlock className="w-3.5 h-3.5" />
                      <span>Unlocked! Opening your surprise, pokie...</span>
                    </p>
                  ) : (
                    <p className="text-xs text-slate-400 font-serif-editorial italic">
                      Tap the love-shaped numbers below (or type on keyboard)
                    </p>
                  )}
                </div>
              </div>

              {/* 3x4 Keypad with Love-Heart Shaped Buttons & Custom Love-Shape Font Numerals */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3 place-items-center">
                {keypadDigits.map((digit) => (
                  <HeartKeypadButton
                    key={digit}
                    digit={digit}
                    onClick={() => handleDigitPress(digit)}
                  />
                ))}

                {/* Clear Button */}
                <button
                  type="button"
                  onClick={handleClear}
                  className="w-full h-14 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-xs font-semibold text-slate-700 transition-all flex items-center justify-center cursor-pointer whitespace-nowrap shrink-0"
                  title="Clear digits"
                >
                  Clear
                </button>

                {/* Digit 0 in Love-Shape Font */}
                <HeartKeypadButton
                  digit="0"
                  onClick={() => handleDigitPress('0')}
                />

                {/* Backspace Button */}
                <button
                  type="button"
                  onClick={handleBackspace}
                  className="w-full h-14 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 transition-all flex items-center justify-center gap-1 text-xs font-semibold cursor-pointer whitespace-nowrap shrink-0"
                  title="Delete last digit"
                  aria-label="Delete last digit"
                >
                  <Delete className="w-4 h-4" />
                  <span>Back</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Tactile Heart-Contoured Keypad Button containing our bespoke LoveShapeDigit SVG font
 */
const HeartKeypadButton: React.FC<{
  digit: string;
  onClick: () => void;
}> = ({ digit, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative w-full h-16 rounded-2xl bg-gradient-to-b from-[#EFF6FF] to-[#DBEAFE] hover:from-[#DBEAFE] hover:to-[#BFDBFE] border border-[#93C5FD] shadow-sm hover:shadow transition-all duration-150 active:scale-95 flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1D4ED8]"
      aria-label={`Number ${digit}`}
    >
      {/* Subtle Love-Heart Halo inside each button */}
      <svg
        viewBox="0 0 100 92"
        className="w-14 h-14 absolute inset-0 m-auto text-rose-200/55 group-hover:text-rose-300/75 transition-colors pointer-events-none"
        fill="currentColor"
      >
        <path d="M50 84 C50 84 10 58 10 30 C10 15 22 6 35 6 C43 6 48 11 50 16 C52 11 57 6 65 6 C78 6 90 15 90 30 C90 58 50 84 50 84 Z" />
      </svg>

      {/* Custom Love-Shape Font Digit */}
      <div className="relative z-10 group-hover:scale-110 transition-transform duration-150">
        <LoveShapeDigit
          digit={digit}
          size="md"
          color="#1E3A8A"
          accentColor="#E11D48"
        />
      </div>
    </button>
  );
};
