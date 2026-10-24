import React, { useState, useEffect } from 'react';
import { X, Heart, Upload, Save, Calendar, Sparkles } from 'lucide-react';
import { ScrapbookMemory } from '../data/initialMemories';
import { CoupleArtworkSVG } from './ScrapbookDecorations';

interface MemoryLightboxModalProps {
  memory: ScrapbookMemory | null;
  onClose: () => void;
  onUpdateMemory: (id: string, updates: Partial<ScrapbookMemory>) => void;
  onUploadForMemory: (id: string, file: File) => void;
}

export const MemoryLightboxModal: React.FC<MemoryLightboxModalProps> = ({
  memory,
  onClose,
  onUpdateMemory,
  onUploadForMemory,
}) => {
  const [title, setTitle] = useState<string>('');
  const [secretNote, setSecretNote] = useState<string>('');
  const [dateLabel, setDateLabel] = useState<string>('');
  const [savedFeedback, setSavedFeedback] = useState<boolean>(false);

  useEffect(() => {
    if (memory) {
      setTitle(memory.title);
      setSecretNote(memory.secretNote);
      setDateLabel(memory.dateLabel);
      setSavedFeedback(false);
    }
  }, [memory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!memory) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateMemory(memory.id, {
      title: title.trim() || memory.title,
      secretNote: secretNote.trim() || memory.secretNote,
      dateLabel: dateLabel.trim() || memory.dateLabel,
    });
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-scrapbook-grid rounded-3xl border-4 border-white shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow flex items-center justify-center cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: High-Resolution Polaroid Frame Display */}
        <div className="md:col-span-7 bg-[#1E3A8A] p-6 sm:p-8 flex flex-col items-center justify-center relative">
          <div className="w-full bg-white p-4 pb-6 rounded-2xl shadow-2xl border border-slate-200">
            <div className="aspect-4/3 w-full rounded-xl overflow-hidden bg-slate-100 relative">
              {memory.customImageUrl ? (
                <img
                  src={memory.customImageUrl}
                  alt={memory.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              ) : (
                <CoupleArtworkSVG scene={memory.sceneFallback} />
              )}
            </div>

            <div className="mt-4 flex items-center justify-between px-1">
              <div>
                <p className="font-serif-editorial font-bold text-2xl text-slate-900">
                  {title || memory.title}
                </p>
                <p className="text-xs text-slate-500">
                  {memory.yearTag} · {dateLabel || memory.dateLabel}
                </p>
              </div>

              <label className="px-3 py-1.5 rounded-xl bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#1E3A8A] text-xs font-semibold flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onUploadForMemory(memory.id, file);
                  }}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Right Side: Handwritten Love Note & Customizer */}
        <form
          onSubmit={handleSave}
          className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-5"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-[#1E3A8A] font-semibold">
              <Heart className="w-4 h-4 text-[#E11D48] fill-[#E11D48]" />
              <span>Scrapbook Memory Details</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Polaroid Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-sm focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Date / Moment Label
              </label>
              <input
                type="text"
                value={dateLabel}
                onChange={(e) => setDateLabel(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-sm focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Secret Love Note on the Back
              </label>
              <textarea
                rows={4}
                value={secretNote}
                onChange={(e) => setSecretNote(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF3DD] border border-amber-300 font-serif-editorial italic text-base text-slate-800 focus:outline-none focus:border-[#2563EB]"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer whitespace-nowrap shrink-0"
            >
              Close
            </button>

            <button
              type="submit"
              className="btn-scrapbook-blue px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{savedFeedback ? 'Saved to Scrapbook!' : 'Save Note'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
