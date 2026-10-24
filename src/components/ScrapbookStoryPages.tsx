import React, { useState } from 'react';
import {
  Camera,
  Heart,
  RotateCcw,
  Sparkles,
  Upload,
  Calendar as CalendarIcon,
  ArrowRight,
  ArrowLeft,
  Eye,
} from 'lucide-react';
import {
  BlueLilyFlower,
  HuggingBearsIllustration,
  BlueRibbonBow,
  ScrapbookStarSticker,
  CoupleArtworkSVG,
} from './ScrapbookDecorations';
import { ScrapbookMemory } from '../data/initialMemories';
import { soundManager } from '../utils/soundEffects';

interface ScrapbookStoryPagesProps {
  memories: ScrapbookMemory[];
  onSelectMemory: (memory: ScrapbookMemory) => void;
  onUploadForMemory: (memoryId: string, file: File) => void;
  onJumpToGallery: () => void;
}

export type StoryStep = 1 | 2 | 3 | 4 | 5 | 6;

export const ScrapbookStoryPages: React.FC<ScrapbookStoryPagesProps> = ({
  memories,
  onSelectMemory,
  onUploadForMemory,
  onJumpToGallery,
}) => {
  const [step, setStep] = useState<StoryStep>(1);
  const [cameraIndex, setCameraIndex] = useState<number>(0);
  const [cameraFlash, setCameraFlash] = useState<boolean>(false);
  const [flippedPolaroids, setFlippedPolaroids] = useState<Record<string, boolean>>({});
  const [calendarMonth, setCalendarMonth] = useState<'sep' | 'oct'>('sep');
  const [selectedDayNote, setSelectedDayNote] = useState<string>(
    'September 18 · Our 2nd Anniversary celebration & forever milestone <3'
  );

  const goToStep = (nextStep: StoryStep) => {
    soundManager.playHeartKey(nextStep);
    setStep(nextStep);
  };

  const handleCameraShutter = () => {
    soundManager.playCameraShutter();
    setCameraFlash(true);
    setTimeout(() => setCameraFlash(false), 180);
    setCameraIndex((prev) => (prev + 1) % memories.length);
  };

  const togglePolaroidFlip = (id: string) => {
    soundManager.playHeartKey(3);
    setFlippedPolaroids((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const activeCameraMemory = memories[cameraIndex % memories.length] || memories[0];
  const boothMemories = memories.filter((m) => m.category === 'photobooth').slice(0, 4);
  const polaroidMemories = memories.filter((m) => m.category === 'polaroid').slice(0, 3);

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-10">
      {/* Interactive Chapter Progress Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl px-4 py-2.5 shadow-sm">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="font-semibold text-[#1E3A8A]">Scrapbook Story</span>
          <span aria-hidden="true">·</span>
          <span>Page {step} of 6</span>
        </div>

        {/* Direct Page Jump Controls */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto">
          {[
            { id: 1, label: '01. Welcome' },
            { id: 2, label: '02. Try Again' },
            { id: 3, label: '03. Anniversary' },
            { id: 4, label: '04. Camera & Strips' },
            { id: 5, label: '05. Special Day' },
            { id: 6, label: '06. Forever Polaroids' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => goToStep(tab.id as StoryStep)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                step === tab.id
                  ? 'bg-white text-[#1E3A8A] shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Scrapbook Stage Frame (Matches the Deep Cobalt Blue & Grid Collage in PDF) */}
      <div className="relative w-full min-h-[560px] md:min-h-[620px] rounded-3xl bg-[#1E3A8A] p-4 sm:p-8 md:p-10 shadow-2xl overflow-hidden flex items-center justify-center border-4 border-[#172554]">
        {/* Newspaper Clippings & Blue Gingham Outer Collage Layers */}
        <div className="absolute -top-6 -left-6 w-64 h-44 bg-[#F5F2EB] opacity-90 rotate-[-7deg] p-3 text-[9px] font-serif text-slate-600 select-none pointer-events-none border border-slate-300 shadow">
          <p className="font-bold uppercase tracking-wider text-slate-800">ORIGINAL SOUNDTRACK · SIDE A</p>
          <p className="mt-1">
            01. Falling for You at First Sight · 02. Late Night Calls · 03. Pokie Lullaby · 04. My Constant Forever
          </p>
        </div>

        <div className="absolute -top-4 -right-4 w-72 h-52 bg-[#F5F2EB] opacity-90 rotate-[5deg] p-3 text-[9px] font-serif text-slate-600 select-none pointer-events-none border border-slate-300 shadow">
          <p className="font-bold uppercase tracking-wider text-slate-800">LOVE ARCHIVE · SPECIAL ISSUE</p>
          <p className="mt-1">
            “In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.”
          </p>
        </div>

        <div className="absolute -bottom-8 -right-8 w-80 h-72 bg-blue-gingham rotate-[-4deg] border-4 border-white/90 shadow-lg pointer-events-none" />

        {/* PAGE 1: "I Made something for you <3 / Do you want to see?" */}
        {step === 1 && (
          <div className="relative z-10 w-full max-w-4xl bg-scrapbook-grid rounded-2xl border-4 border-[#FAF8F3] shadow-2xl p-8 sm:p-12 md:p-16 text-center rotate-[-1deg]">
            <BlueLilyFlower className="absolute -top-10 -right-6 w-28 h-28 sm:w-36 sm:h-36 rotate-12" />
            <BlueLilyFlower className="absolute -bottom-10 -left-6 w-24 h-24 sm:w-32 sm:h-32 -rotate-12" />

            <div className="max-w-xl mx-auto py-6 sm:py-10 space-y-6">
              <h2
                className="font-serif-editorial text-4xl sm:text-6xl font-bold text-[#0F172A] tracking-tight leading-[1.1]"
                style={{ textWrap: 'balance' }}
              >
                I Made something for you &lt;3
              </h2>

              <p className="font-serif-editorial italic text-2xl sm:text-3xl text-[#1E3A8A]">
                Do you want to see?
              </p>

              {/* YES / NO Buttons matching Page 1 of the PDF */}
              <div className="pt-4 flex items-center justify-center gap-6 sm:gap-10">
                <button
                  type="button"
                  onClick={() => goToStep(3)}
                  className="btn-scrapbook-blue px-8 py-3 rounded-xl font-serif-editorial text-xl sm:text-2xl font-bold text-white tracking-wider cursor-pointer whitespace-nowrap shrink-0"
                >
                  YES
                </button>
                <button
                  type="button"
                  onClick={() => goToStep(2)}
                  className="btn-scrapbook-blue px-8 py-3 rounded-xl font-serif-editorial text-xl sm:text-2xl font-bold text-white tracking-wider cursor-pointer whitespace-nowrap shrink-0"
                >
                  NO
                </button>
              </div>
            </div>

            {/* Hugging Bears in Bottom-Right (Exact match to PDF Page 1) */}
            <div className="mt-4 sm:mt-0 sm:absolute sm:bottom-2 sm:right-4 w-44 sm:w-56 mx-auto">
              <HuggingBearsIllustration />
            </div>
          </div>
        )}

        {/* PAGE 2: "NOOOO TRY AGAINN <3" (When clicking NO on Page 1) */}
        {step === 2 && (
          <div className="relative z-10 w-full max-w-4xl bg-scrapbook-grid rounded-2xl border-4 border-[#FAF8F3] shadow-2xl p-8 sm:p-12 md:p-14 text-center">
            {/* Top-left & Bottom-right Blue Gingham Squares (Matching PDF Page 2) */}
            <div className="hidden sm:block absolute top-6 left-6 w-32 h-36 bg-blue-gingham border-2 border-white shadow-sm pointer-events-none" />
            <div className="hidden sm:block absolute bottom-16 right-8 w-44 h-44 bg-blue-gingham border-2 border-white shadow-sm pointer-events-none" />

            {/* 3 Blue Lily Flowers */}
            <BlueLilyFlower className="absolute top-16 left-20 w-24 h-24 hidden sm:block -rotate-12" />
            <BlueLilyFlower className="absolute top-6 left-1/2 -translate-x-8 w-24 h-24 hidden md:block rotate-12" />
            <BlueLilyFlower className="absolute bottom-20 right-36 w-28 h-28 hidden sm:block -rotate-6" />

            {/* Top-Right Highlighted Poetry Strips (Exact Quote from PDF Page 2) */}
            <div className="relative sm:absolute sm:top-6 sm:right-6 max-w-xs ml-auto mb-6 sm:mb-0 text-right space-y-1 font-serif-editorial text-sm sm:text-base text-[#451A03]">
              <div>
                <span className="bg-[#E6CCB2]/90 px-2 py-0.5 rounded-sm shadow-xs inline-block">
                  My darling,
                </span>
              </div>
              <div>
                <span className="bg-[#E6CCB2]/90 px-2 py-0.5 rounded-sm shadow-xs inline-block">
                  all I want
                </span>
              </div>
              <div>
                <span className="bg-[#E6CCB2]/90 px-2 py-0.5 rounded-sm shadow-xs inline-block">
                  is to be your moon
                </span>
              </div>
              <div>
                <span className="bg-[#E6CCB2]/90 px-2 py-0.5 rounded-sm shadow-xs inline-block">
                  and show you
                </span>
              </div>
              <div>
                <span className="bg-[#E6CCB2]/90 px-2 py-0.5 rounded-sm shadow-xs inline-block">
                  all the little stars of my heart.
                </span>
              </div>
            </div>

            {/* Center "NOOOO TRY AGAINN <3" */}
            <div className="relative z-20 my-8 sm:my-16 max-w-md mx-auto space-y-4">
              <h2 className="font-serif-editorial text-4xl sm:text-5xl font-bold text-[#0F172A] tracking-wide">
                NOOOO
              </h2>
              <p className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#0F172A]">
                TRY AGAINN &lt;3
              </p>
              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => goToStep(1)}
                  className="btn-scrapbook-blue px-8 py-2.5 rounded-xl font-serif-editorial text-xl font-bold text-white tracking-wider cursor-pointer whitespace-nowrap shrink-0"
                >
                  BACK
                </button>
              </div>
            </div>

            {/* Bottom-Left Torn Kraft Note & Bottom-Right Dictionary Definition */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 relative z-20">
              <div className="bg-[#E6CCB2] border border-[#B08968] p-3 rounded-lg max-w-[200px] rotate-[-4deg] shadow text-xs font-serif-editorial italic text-[#3E2723]">
                “You are just like a dream, the prettiest pokie I have ever seen &lt;3”
              </div>

              <div className="bg-[#FAF3DD] border border-amber-300/80 p-3 rounded-lg max-w-[260px] rotate-[3deg] shadow text-left font-serif text-xs text-slate-700">
                <p className="text-[10px] text-slate-400 italic">particular geographical area</p>
                <p className="text-sm font-bold text-slate-900">
                  <span className="bg-amber-300/80 px-1 rounded-xs">Happiness</span>{' '}
                  <span className="font-normal text-slate-500">/ˈhæp.i.nəs/</span>
                </p>
                <p className="mt-0.5 text-[11px]">
                  <strong>n. 1</strong> the state of feeling or showing pleasure; being with you.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 3: "Happy 2nd Anniversary" Ransom-Note Magazine Cutout Page */}
        {step === 3 && (
          <div className="relative z-10 w-full max-w-4xl bg-[#F8FAFC] rounded-2xl border-4 border-[#1E40AF] shadow-2xl p-8 sm:p-14 text-center overflow-hidden">
            {/* Decorative Hand-Drawn Blue Stars (Matching PDF Page 3) */}
            <ScrapbookStarSticker className="absolute top-6 right-16 rotate-12" size={64} />
            <ScrapbookStarSticker className="absolute top-20 right-6 -rotate-12" size={48} />
            <ScrapbookStarSticker className="absolute bottom-8 left-8 rotate-6" size={54} />

            {/* Ransom-Note Magazine Cutout Letters Spelling "Happy 2nd Anniversary" */}
            <div className="py-6 sm:py-10 space-y-5">
              {/* Row 1: H a p p y */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
                <span className="inline-block bg-[#991B1B] text-white font-serif-editorial font-bold text-4xl sm:text-6xl px-3.5 py-1.5 rotate-[-4deg] shadow-md">
                  H
                </span>
                <span className="inline-block bg-[#DBEAFE] text-[#1E3A8A] border-2 border-[#60A5FA] font-sans font-bold text-3xl sm:text-5xl px-3 py-1 rotate-[3deg] shadow-sm">
                  a
                </span>
                <span className="inline-block bg-[#F1F5F9] text-[#7F1D1D] font-serif-editorial font-bold text-4xl sm:text-6xl px-3 py-1 rotate-[-2deg] shadow-sm">
                  p
                </span>
                <span className="inline-block bg-[#FCE7F3] text-[#BE123C] font-sans font-bold text-3xl sm:text-5xl px-3 py-1.5 rotate-[4deg] shadow-sm">
                  p
                </span>
                <span className="inline-block bg-[#FEF3C7] text-[#B45309] font-serif-editorial italic font-bold text-4xl sm:text-6xl px-3.5 py-1 rotate-[-3deg] shadow-sm">
                  y
                </span>
              </div>

              {/* Row 2: ♥ 2nd ♥ */}
              <div className="flex items-center justify-center gap-3">
                <Heart className="w-7 h-7 sm:w-9 sm:h-9 text-[#B91C1C] fill-[#B91C1C] -rotate-12" />
                <span className="font-serif-editorial font-bold text-4xl sm:text-6xl text-[#451A03] tracking-tight">
                  2nd
                </span>
                <Heart className="w-7 h-7 sm:w-9 sm:h-9 text-[#B91C1C] fill-[#B91C1C] rotate-12" />
              </div>

              {/* Row 3: A n n i v e r s a r y */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 flex-wrap max-w-2xl mx-auto">
                {[
                  { char: 'A', bg: 'bg-[#FEE2E2]', text: 'text-[#991B1B]', rot: '-rotate-3' },
                  { char: 'n', bg: 'bg-[#991B1B]', text: 'text-white', rot: 'rotate-2' },
                  { char: 'N', bg: 'bg-[#E2E8F0]', text: 'text-[#0F172A]', rot: '-rotate-2' },
                  { char: 'i', bg: 'bg-[#1E3A8A]', text: 'text-white', rot: 'rotate-3' },
                  { char: 'V', bg: 'bg-[#991B1B]', text: 'text-white', rot: '-rotate-2' },
                  { char: 'e', bg: 'bg-[#FEF3C7]', text: 'text-[#92400E]', rot: 'rotate-2' },
                  { char: 'r', bg: 'bg-[#DCFCE7]', text: 'text-[#166534]', rot: '-rotate-3' },
                  { char: 's', bg: 'bg-[#F8FAFC]', text: 'text-[#DC2626]', rot: 'rotate-3' },
                  { char: 'a', bg: 'bg-[#991B1B]', text: 'text-white', rot: '-rotate-2' },
                  { char: 'r', bg: 'bg-[#F59E0B]', text: 'text-white', rot: 'rotate-2' },
                  { char: 'y', bg: 'bg-[#F1F5F9]', text: 'text-[#1E293B]', rot: 'rotate-6' },
                ].map((item, idx) => (
                  <span
                    key={idx}
                    className={`inline-block ${item.bg} ${item.text} ${item.rot} font-serif-editorial font-bold text-3xl sm:text-5xl px-2.5 py-1 shadow-sm border border-black/10 select-none hover:scale-110 transition-transform`}
                  >
                    {item.char}
                  </span>
                ))}
              </div>

              <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto pt-2 font-serif-editorial italic">
                “Every day with you feels like the sweetest page of my favorite book.”
              </p>

              <div className="pt-4 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => goToStep(1)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => goToStep(4)}
                  className="btn-scrapbook-blue px-9 py-2.5 rounded-xl font-serif-editorial text-xl font-bold text-white tracking-wider cursor-pointer whitespace-nowrap shrink-0"
                >
                  NEXT
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 4: Pastel Blue Digital Camera + 2 Photo Booth Strips + "LOVE" Cutout */}
        {step === 4 && (
          <div className="relative z-10 w-full max-w-5xl bg-scrapbook-grid rounded-2xl border-4 border-[#FAF8F3] shadow-2xl p-6 sm:p-10">
            {/* Top-Right Blue Ribbon Bow (Matching PDF Page 4) */}
            <BlueRibbonBow className="absolute -top-6 -right-4 w-28 h-28 sm:w-36 sm:h-36 z-20" />
            <BlueLilyFlower className="absolute -bottom-8 -left-6 w-24 h-24 z-20" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Pastel Blue Digital Camera & "LOVE" Letters */}
              <div className="lg:col-span-6 flex flex-col items-center">
                {/* Interactive Pastel Blue Vintage Digital Camera (Matching PDF Page 4) */}
                <div className="relative w-full max-w-md bg-gradient-to-br from-[#DBEAFE] via-[#BFDBFE] to-[#93C5FD] rounded-3xl p-5 border-2 border-[#60A5FA] shadow-xl">
                  {/* Top Shutter Bar */}
                  <div className="flex items-center justify-between mb-3 px-2">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#1E3A8A]" />
                      <span className="font-serif-editorial font-bold tracking-wider text-sm text-[#1E3A8A]">
                        PokieCam · Canon IXUS
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleCameraShutter}
                        className="px-3 py-1 rounded-lg bg-[#1E3A8A] hover:bg-[#1D4ED8] text-white text-xs font-semibold flex items-center gap-1.5 shadow cursor-pointer whitespace-nowrap shrink-0"
                        title="Click to snap & cycle camera photo"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>Snap Photo</span>
                      </button>
                      <label className="px-2.5 py-1 rounded-lg bg-white/90 hover:bg-white text-[#1E3A8A] text-xs font-semibold flex items-center gap-1 shadow-xs cursor-pointer whitespace-nowrap shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file && activeCameraMemory) {
                              onUploadForMemory(activeCameraMemory.id, file);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Camera Body Grid: Left LCD Screen + Right D-Pad Controls */}
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Camera LCD Screen */}
                    <div
                      onClick={() => activeCameraMemory && onSelectMemory(activeCameraMemory)}
                      className="col-span-8 bg-[#0F172A] p-2 rounded-xl border-2 border-slate-700 shadow-inner cursor-pointer group relative overflow-hidden aspect-4/3"
                    >
                      {activeCameraMemory?.customImageUrl ? (
                        <img
                          src={activeCameraMemory.customImageUrl}
                          alt={activeCameraMemory.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full rounded-lg overflow-hidden">
                          <CoupleArtworkSVG
                            scene={activeCameraMemory?.sceneFallback || 'golden-embrace'}
                          />
                        </div>
                      )}

                      {/* Camera Viewfinder HUD Overlay */}
                      <div className="absolute inset-3 border border-white/40 rounded pointer-events-none flex flex-col justify-between p-1.5 text-[10px] font-mono text-white drop-shadow">
                        <div className="flex justify-between">
                          <span>REC · LOVE</span>
                          <span>ISO 1410</span>
                        </div>
                        <div className="flex justify-between items-end">
                          <span className="truncate max-w-[140px] font-sans font-medium">
                            {activeCameraMemory?.title}
                          </span>
                          <span>[{cameraIndex + 1}/{memories.length}]</span>
                        </div>
                      </div>

                      {/* White Shutter Flash Effect */}
                      {cameraFlash && (
                        <div className="absolute inset-0 bg-white z-30 pointer-events-none" />
                      )}
                    </div>

                    {/* Camera Circular Control Wheel (Matching PDF Page 4) */}
                    <div className="col-span-4 flex flex-col items-center justify-center space-y-3">
                      <div className="w-14 h-9 rounded-lg bg-slate-200/90 border border-slate-400 flex items-center justify-center shadow-inner">
                        <div className="w-8 h-5 rounded bg-slate-700/80" />
                      </div>
                      <button
                        type="button"
                        onClick={handleCameraShutter}
                        className="w-16 h-16 rounded-full bg-gradient-to-b from-slate-100 to-slate-300 border-4 border-slate-400 shadow-md flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                        title="Next Memory"
                      >
                        <div className="w-7 h-7 rounded-full bg-[#3B82F6] text-white flex items-center justify-center text-[10px] font-bold">
                          OK
                        </div>
                      </button>
                      <span className="text-[10px] font-mono text-[#1E3A8A] font-semibold">
                        TAP WHEEL
                      </span>
                    </div>
                  </div>
                </div>

                {/* Colorful Cutout Letters "LOVE" at Bottom-Left (Matching PDF Page 4) */}
                <div className="mt-5 flex items-center gap-2">
                  <span className="bg-[#FEF3C7] text-[#D97706] border-2 border-[#F59E0B] font-serif-editorial font-bold text-4xl sm:text-5xl px-3 py-1 rotate-[-6deg] shadow">
                    L
                  </span>
                  <span className="bg-[#DBEAFE] text-[#1D4ED8] border-2 border-[#3B82F6] font-serif-editorial font-bold text-4xl sm:text-5xl px-3 py-1 rotate-[4deg] shadow">
                    O
                  </span>
                  <span className="bg-[#FCE7F3] text-[#E11D48] border-2 border-[#F43F5E] font-serif-editorial font-bold text-4xl sm:text-5xl px-3 py-1 rotate-[-3deg] shadow">
                    V
                  </span>
                  <span className="bg-[#DCFCE7] text-[#15803D] border-2 border-[#22C55E] font-serif-editorial font-bold text-4xl sm:text-5xl px-3 py-1 rotate-[6deg] shadow">
                    E
                  </span>
                </div>
              </div>

              {/* Right Column: Two 4-Frame Photo Booth Strips & Denim Pocket */}
              <div className="lg:col-span-6 flex flex-col items-center">
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  {[0, 1].map((stripCol) => (
                    <div
                      key={stripCol}
                      className={`bg-white p-2.5 rounded-xl shadow-xl border border-slate-200 flex flex-col gap-2.5 ${
                        stripCol === 0 ? 'rotate-[-3deg]' : 'rotate-[4deg] mt-4'
                      }`}
                    >
                      {boothMemories
                        .slice(stripCol * 2, stripCol * 2 + 2)
                        .map((mem) => (
                          <div
                            key={mem.id}
                            className="group relative w-32 sm:w-40 aspect-4/3 bg-slate-100 rounded overflow-hidden cursor-pointer border border-slate-200"
                            onClick={() => onSelectMemory(mem)}
                          >
                            {mem.customImageUrl ? (
                              <img
                                src={mem.customImageUrl}
                                alt={mem.title}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                            ) : (
                              <CoupleArtworkSVG scene={mem.sceneFallback} />
                            )}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                              <Eye className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </div>
                        ))}
                      <div className="text-center py-1">
                        <p className="font-serif-editorial italic text-xs text-slate-600">
                          {stripCol === 0 ? 'Pokie Booth · Strip I' : 'Pokie Booth · Strip II'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Denim Jeans Pocket Patch + NEXT Button (Matching PDF Page 4 Bottom) */}
                <div className="mt-6 w-full flex items-center justify-between gap-4">
                  <div className="bg-[#1E40AF] border-2 border-dashed border-[#93C5FD] rounded-b-3xl rounded-t-lg px-5 py-3 shadow-md flex items-center gap-3 text-white">
                    <Heart className="w-5 h-5 text-rose-300 fill-rose-300" />
                    <div className="text-xs">
                      <p className="font-semibold">Denim Memory Pocket</p>
                      <p className="text-[11px] text-blue-200">Click any frame to view or customize</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => goToStep(5)}
                    className="btn-scrapbook-blue px-8 py-2.5 rounded-xl font-serif-editorial text-xl font-bold text-white tracking-wider cursor-pointer whitespace-nowrap shrink-0"
                  >
                    NEXT
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 5: "OUR SPECIAL DAY" — Tilted Clipboard Calendar (September 2026 / October 14) */}
        {step === 5 && (
          <div className="relative z-10 w-full max-w-4xl bg-scrapbook-grid rounded-2xl border-4 border-[#FAF8F3] shadow-2xl p-6 sm:p-12">
            {/* Top-Right Ribbon Banner "OUR SPECIAL DAY" (Matching PDF Page 5) */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="inline-flex items-center gap-2 bg-[#DBEAFE] border-2 border-[#3B82F6] px-4 py-1.5 rounded-xl shadow-xs">
                <CalendarIcon className="w-4 h-4 text-[#1E3A8A]" />
                <span className="font-serif-editorial font-bold text-lg sm:text-xl text-[#1E3A8A] tracking-wide">
                  OUR SPECIAL DAY
                </span>
              </div>

              {/* Switch between PDF Demo Month (September 2026) and Passcode Month (October 14 / 1410) */}
              <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-lg">
                <button
                  type="button"
                  onClick={() => {
                    setCalendarMonth('sep');
                    setSelectedDayNote(
                      'September 18, 2026 · Our 2nd Anniversary milestone from the scrapbook!'
                    );
                  }}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    calendarMonth === 'sep'
                      ? 'bg-white text-[#1E3A8A] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  September 2026
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCalendarMonth('oct');
                    setSelectedDayNote(
                      'October 14 (14 · 10) · The secret passcode date written in our stars <3'
                    );
                  }}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    calendarMonth === 'oct'
                      ? 'bg-white text-[#1E3A8A] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  October 2026 (1410)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Tilted Clipboard Calendar Sheet (Matching PDF Page 5) */}
              <div className="lg:col-span-7 flex flex-col items-center">
                {/* Vintage Black Metal Clipboard Clip */}
                <div className="w-24 h-8 bg-slate-800 rounded-t-xl border-2 border-slate-600 flex items-center justify-center shadow-md -mb-2 z-20">
                  <div className="w-8 h-3 rounded-full border-2 border-slate-400" />
                </div>

                <div className="w-full max-w-md bg-[#F8F5EE] border-2 border-slate-300 rounded-2xl p-6 shadow-xl rotate-[-1.5deg]">
                  <div className="flex items-baseline justify-between border-b border-slate-300 pb-3 mb-4">
                    <h3 className="font-serif-editorial font-bold text-3xl text-slate-900">
                      {calendarMonth === 'sep' ? 'September' : 'October'}
                    </h3>
                    <span className="font-serif-editorial font-bold text-2xl text-slate-700 tabular-nums">
                      2026
                    </span>
                  </div>

                  {/* Weekday Headers */}
                  <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-slate-500 mb-2">
                    <span className="text-rose-500">SUN</span>
                    <span>MON</span>
                    <span>TUE</span>
                    <span>WED</span>
                    <span>THU</span>
                    <span>FRI</span>
                    <span>SAT</span>
                  </div>

                  {/* Calendar Days Grid */}
                  <div className="grid grid-cols-7 gap-1.5 text-center font-mono text-sm tabular-nums">
                    {/* Offset blanks (Sep 2026 starts on Tuesday = 2 blanks; Oct 2026 starts on Thursday = 4 blanks) */}
                    {Array.from({ length: calendarMonth === 'sep' ? 2 : 4 }).map((_, i) => (
                      <div key={`blank-${i}`} className="h-9" />
                    ))}

                    {Array.from({ length: calendarMonth === 'sep' ? 30 : 31 }).map((_, idx) => {
                      const day = idx + 1;
                      const isSpecialDay =
                        (calendarMonth === 'sep' && (day === 18 || day === 14)) ||
                        (calendarMonth === 'oct' && day === 14);

                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => {
                            soundManager.playHeartKey(day);
                            setSelectedDayNote(
                              isSpecialDay
                                ? `${
                                    calendarMonth === 'sep' ? 'September' : 'October'
                                  } ${day}, 2026 · Forever marked with a love heart in my calendar <3`
                                : `${
                                    calendarMonth === 'sep' ? 'September' : 'October'
                                  } ${day}, 2026 · Another 24 hours of loving my pokie.`
                            );
                          }}
                          className={`relative h-9 rounded-lg flex items-center justify-center transition-transform hover:scale-110 cursor-pointer ${
                            isSpecialDay
                              ? 'bg-rose-100 text-rose-700 font-bold ring-2 ring-rose-500 shadow-xs'
                              : 'text-slate-700 hover:bg-blue-50'
                          }`}
                        >
                          <span>{day}</span>
                          {isSpecialDay && (
                            <Heart className="w-3 h-3 text-rose-600 fill-rose-600 absolute -top-1 -right-1" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Silver Foil "2" Balloon Badge & Interactive Memory Note */}
              <div className="lg:col-span-5 space-y-5 text-center lg:text-left">
                <div className="inline-flex items-center gap-4 bg-white/90 border border-slate-200 p-4 rounded-2xl shadow-sm">
                  <div className="w-14 h-16 rounded-2xl bg-gradient-to-b from-slate-100 via-slate-300 to-slate-400 border-2 border-white shadow-md flex items-center justify-center font-serif-editorial font-bold text-4xl text-slate-800">
                    2
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold text-[#1E3A8A]">2 Years of Magic</p>
                    <p className="text-lg font-bold text-slate-900 tabular-nums">
                      730 Days · 17,520 Hours
                    </p>
                    <p className="text-xs text-slate-500">Every second better than the last</p>
                  </div>
                </div>

                {/* Selected Calendar Day Note */}
                <div className="bg-[#FAF3DD] border border-amber-300/80 rounded-2xl p-4 shadow-sm">
                  <p className="text-xs font-semibold text-amber-900 mb-1">
                    Selected Calendar Memory
                  </p>
                  <p className="font-serif-editorial italic text-lg text-slate-800">
                    “{selectedDayNote}”
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-center lg:justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => goToStep(4)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => goToStep(6)}
                    className="btn-scrapbook-blue px-8 py-2.5 rounded-xl font-serif-editorial text-xl font-bold text-white tracking-wider cursor-pointer whitespace-nowrap shrink-0"
                  >
                    NEXT
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 6: "My Constant Forever" — Hanging Polaroid String (2024, 2025, 2026) */}
        {step === 6 && (
          <div className="relative z-10 w-full max-w-5xl bg-scrapbook-grid rounded-2xl border-4 border-[#FAF8F3] shadow-2xl p-6 sm:p-12 text-center">
            <BlueLilyFlower className="absolute -bottom-8 -left-6 w-28 h-28 z-20" />

            {/* Curved Clothesline String Across Top (Matching PDF Page 6) */}
            <svg
              viewBox="0 0 800 50"
              className="w-full h-10 overflow-visible pointer-events-none mb-2 hidden sm:block"
            >
              <path
                d="M 20 10 Q 220 48 400 22 Q 580 48 780 8"
                fill="none"
                stroke="#334155"
                strokeWidth="2.2"
              />
            </svg>

            {/* 3 Hanging Polaroids (2024, 2025, 2026) Pinned with Red Hearts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto my-2">
              {polaroidMemories.map((mem, idx) => {
                const isFlipped = Boolean(flippedPolaroids[mem.id]);
                const rotClass =
                  idx === 0
                    ? 'sm:-rotate-6'
                    : idx === 1
                    ? 'sm:rotate-2 sm:mt-4'
                    : 'sm:rotate-6';

                return (
                  <div
                    key={mem.id}
                    className={`relative bg-white p-3.5 pb-5 rounded-xl shadow-xl border border-slate-200 transition-transform duration-300 hover:scale-105 ${rotClass}`}
                  >
                    {/* Red Heart Clothespin at Top Center (Exact match to PDF Page 6) */}
                    <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200 shadow flex items-center justify-center mx-auto -mt-7 mb-2 relative z-20">
                      <Heart className="w-5 h-5 text-[#E11D48] fill-[#E11D48]" />
                    </div>

                    {!isFlipped ? (
                      <div
                        onClick={() => onSelectMemory(mem)}
                        className="aspect-square w-full bg-slate-100 rounded overflow-hidden cursor-pointer relative group"
                      >
                        {mem.customImageUrl ? (
                          <img
                            src={mem.customImageUrl}
                            alt={mem.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <CoupleArtworkSVG scene={mem.sceneFallback} />
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                          <span className="px-2.5 py-1 rounded bg-white/90 text-xs font-semibold text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity">
                            View Memory
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => togglePolaroidFlip(mem.id)}
                        className="aspect-square w-full bg-[#FAF8F3] rounded border border-dashed border-slate-300 p-4 flex flex-col items-center justify-center text-center cursor-pointer"
                      >
                        <Heart className="w-5 h-5 text-rose-500 mb-2" />
                        <p className="font-serif-editorial italic text-base text-slate-800 leading-snug">
                          “{mem.secretNote}”
                        </p>
                        <span className="mt-3 text-[11px] text-slate-400">Tap to flip back</span>
                      </div>
                    )}

                    {/* Year Label under Polaroid (2024, 2025, 2026) + Flip & Upload Actions */}
                    <div className="mt-3 flex items-center justify-between px-1">
                      <button
                        type="button"
                        onClick={() => togglePolaroidFlip(mem.id)}
                        className="text-xs text-[#1E3A8A] hover:underline font-medium flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>{isFlipped ? 'Show Photo' : 'Read Back'}</span>
                      </button>

                      <span className="font-serif-editorial font-bold text-xl text-slate-800 tabular-nums">
                        {mem.yearTag}
                      </span>

                      <label className="text-xs text-slate-500 hover:text-slate-900 font-medium flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0">
                        <Upload className="w-3 h-3" />
                        <span>Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) onUploadForMemory(mem.id, file);
                          }}
                        />
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Title "My Constant Forever" (Exact match to PDF Page 6) */}
            <div className="mt-8 space-y-4">
              <h2 className="font-serif-editorial text-3xl sm:text-5xl font-bold text-[#0F172A] tracking-tight">
                My Constant Forever
              </h2>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => goToStep(1)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  Replay Story
                </button>
                <button
                  type="button"
                  onClick={onJumpToGallery}
                  className="btn-scrapbook-blue px-7 py-3 rounded-xl font-serif-editorial text-xl font-bold text-white tracking-wide flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Explore Our Custom Photo Gallery</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
