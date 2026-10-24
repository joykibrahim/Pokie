/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PasscodeGate } from './components/PasscodeGate';
import { ScrapbookStoryPages } from './components/ScrapbookStoryPages';
import { CustomPhotoGallery } from './components/CustomPhotoGallery';
import { LoveNotesEnvelope } from './components/LoveNotesEnvelope';
import { MemoryLightboxModal } from './components/MemoryLightboxModal';
import { FloatingHeartsBackground } from './components/FloatingHeartsBackground';
import {
  INITIAL_MEMORIES,
  ScrapbookMemory,
  FrameStyle,
  SceneKey,
  compressImageFile,
} from './data/initialMemories';
import { soundManager } from './utils/soundEffects';

const STORAGE_KEY = 'pokie_scrapbook_memories_v1';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [memories, setMemories] = useState<ScrapbookMemory[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback to initial memories
    }
    return INITIAL_MEMORIES;
  });

  const [selectedMemory, setSelectedMemory] = useState<ScrapbookMemory | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
    } catch {
      // Ignore quota errors silently
    }
  }, [memories]);

  const handleUploadForMemory = async (memoryId: string, file: File) => {
    try {
      const dataUrl = await compressImageFile(file);
      setMemories((prev) =>
        prev.map((m) => (m.id === memoryId ? { ...m, customImageUrl: dataUrl } : m))
      );
      setSelectedMemory((prev) =>
        prev && prev.id === memoryId ? { ...prev, customImageUrl: dataUrl } : prev
      );
    } catch {
      // Fallback if image read fails
    }
  };

  const handleAddMemory = async (
    file: File | null,
    title: string,
    yearTag: string,
    secretNote: string,
    frameStyle: FrameStyle,
    sceneFallback: SceneKey
  ) => {
    let customImageUrl: string | undefined;
    if (file) {
      try {
        customImageUrl = await compressImageFile(file);
      } catch {
        customImageUrl = undefined;
      }
    }

    const newMemory: ScrapbookMemory = {
      id: `custom-${Date.now()}`,
      title,
      dateLabel: 'Custom Memory · Saved with Love',
      yearTag,
      secretNote,
      category: frameStyle === 'filmstrip' ? 'photobooth' : 'polaroid',
      frameStyle,
      isFavorite: true,
      rotation: (Math.random() - 0.5) * 6,
      sceneFallback,
      customImageUrl,
    };

    setMemories((prev) => [newMemory, ...prev]);
  };

  const handleToggleFavorite = (id: string) => {
    soundManager.playHeartKey(4);
    setMemories((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isFavorite: !m.isFavorite } : m))
    );
  };

  const handleDeleteMemory = (id: string) => {
    setMemories((prev) => prev.filter((m) => m.id !== id));
  };

  const handleUpdateMemory = (id: string, updates: Partial<ScrapbookMemory>) => {
    setMemories((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
    setSelectedMemory((prev) =>
      prev && prev.id === id ? { ...prev, ...updates } : prev
    );
  };

  const handleToggleMusic = () => {
    const playing = soundManager.toggleMusicBox();
    setIsMusicPlaying(playing);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // First Page: Passcode Gate with Love-Shape Font Numerals (Passcode: 1410)
  if (!isUnlocked) {
    return <PasscodeGate onUnlock={() => setIsUnlocked(true)} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F1EA] text-[#1E293B] relative">
      {/* Subtle CSS-Keyframe Floating Hearts Drifting Across Unlocked Scrapbook Pages */}
      <FloatingHeartsBackground />
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 flex items-center justify-between gap-8 px-6 py-4 bg-[#FAF8F3]/95 backdrop-blur-xs border-b border-slate-200/80">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#scrapbook-top"
          className="font-serif-editorial text-2xl font-bold tracking-tight text-[#1E3A8A] whitespace-nowrap shrink-0"
        >
          For My Pokie &lt;3
        </a>

        {/* Zone 2: 4 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a
            href="#scrapbook-top"
            className="hover:text-[#1E3A8A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Scrapbook Story
          </a>
          <a
            href="#custom-gallery"
            className="hover:text-[#1E3A8A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Photo Gallery
          </a>
          <a
            href="#love-letters"
            className="hover:text-[#1E3A8A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Love Letters
          </a>
          <button
            type="button"
            onClick={() => {
              soundManager.stopMusicBox();
              setIsMusicPlaying(false);
              setIsUnlocked(false);
            }}
            className="hover:text-[#1E3A8A] hover:underline underline-offset-4 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Lock Diary (1410)
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleToggleMusic}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#1E3A8A] rounded-lg hover:bg-[#1D4ED8] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            {isMusicPlaying ? 'Pause Music Box' : 'Play Music Box'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main id="scrapbook-top" className="flex-1">
        {/* Section 1: Interactive 6-Page Scrapbook Story Deck (From PDF Demo) */}
        <ScrapbookStoryPages
          memories={memories}
          onSelectMemory={(mem) => setSelectedMemory(mem)}
          onUploadForMemory={handleUploadForMemory}
          onJumpToGallery={() => scrollToSection('custom-gallery')}
        />

        {/* Section 2: Custom Polaroid & Photo Gallery with Drag & Drop Upload */}
        <CustomPhotoGallery
          memories={memories}
          onAddMemory={handleAddMemory}
          onToggleFavorite={handleToggleFavorite}
          onDeleteMemory={handleDeleteMemory}
          onUploadForMemory={handleUploadForMemory}
          onSelectMemory={(mem) => setSelectedMemory(mem)}
        />

        {/* Section 3: Open-When Wax-Sealed Love Letters */}
        <LoveNotesEnvelope />
      </main>

      {/* Clean Quiet Footer */}
      <footer className="border-t border-slate-200/80 bg-[#FAF8F3] py-6 px-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-serif-editorial italic text-base text-slate-700">
            “My darling, all I want is to be your moon and show you all the little stars of my heart.”
          </p>
          <div className="flex items-center gap-3">
            <span>Passcode: 1410</span>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem(STORAGE_KEY);
                setMemories(INITIAL_MEMORIES);
              }}
              className="text-[#1E3A8A] hover:underline cursor-pointer whitespace-nowrap shrink-0"
            >
              Reset Default Photos
            </button>
          </div>
        </div>
      </footer>

      {/* Fullscreen Lightbox & Note Customizer Modal */}
      <MemoryLightboxModal
        memory={selectedMemory}
        onClose={() => setSelectedMemory(null)}
        onUpdateMemory={handleUpdateMemory}
        onUploadForMemory={handleUploadForMemory}
      />
    </div>
  );
}
