import React, { useState } from 'react';
import { Heart, Mail, MailOpen, Plus } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface LoveLetter {
  id: string;
  prompt: string;
  date: string;
  body: string;
}

const DEFAULT_LETTERS: LoveLetter[] = [
  {
    id: 'letter-1',
    prompt: 'Open When You Are Missing Me',
    date: 'Seal #01 · Passcode 1410',
    body: 'Close your eyes for three seconds, pokie. Imagine my arms wrapped right around your shoulders like those two little bears on Page 1. No matter what time it is or how far apart we are, you have 100% of my heart.',
  },
  {
    id: 'letter-2',
    prompt: 'Open When You Need a Smile',
    date: 'Seal #02 · Dictionary of Us',
    body: 'Remember the dictionary clipping in our scrapbook? Happiness (noun): the state of looking at your sleepy face, hearing your laugh, and getting to call you my girlfriend.',
  },
  {
    id: 'letter-3',
    prompt: 'Open on Our Anniversary',
    date: 'Seal #03 · My Constant Forever',
    body: 'From 2024 to 2025 to 2026 and every year ahead—thank you for being my moon and showing me all the little stars of your heart. Happy Anniversary, my love <3',
  },
];

export const LoveNotesEnvelope: React.FC = () => {
  const [letters, setLetters] = useState<LoveLetter[]>(DEFAULT_LETTERS);
  const [openId, setOpenId] = useState<string>('letter-1');
  const [newPrompt, setNewPrompt] = useState<string>('');
  const [newBody, setNewBody] = useState<string>('');
  const [isWriting, setIsWriting] = useState<boolean>(false);

  const handleAddLetter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBody.trim()) return;
    const item: LoveLetter = {
      id: `letter-${Date.now()}`,
      prompt: newPrompt.trim() || 'A Sweet Note For My Pokie',
      date: `Seal #0${letters.length + 1} · Custom Note`,
      body: newBody.trim(),
    };
    setLetters((prev) => [...prev, item]);
    setOpenId(item.id);
    setNewPrompt('');
    setNewBody('');
    setIsWriting(false);
    soundManager.playUnlockChime();
  };

  return (
    <section id="love-letters" className="w-full max-w-6xl mx-auto px-4 sm:px-6 pb-16">
      <div className="bg-white/90 rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#1E3A8A] font-medium">
              <span>Sealed Wax Envelopes</span>
              <span aria-hidden="true">·</span>
              <span>Interactive Keepsake Notes</span>
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-slate-900 mt-1">
              Open-When Love Letters
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setIsWriting((prev) => !prev)}
            className="px-4 py-2 rounded-xl border border-[#3B82F6] text-[#1E3A8A] hover:bg-blue-50 text-xs font-semibold flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>{isWriting ? 'Close Letter Pad' : 'Write New Love Note'}</span>
          </button>
        </div>

        {isWriting && (
          <form
            onSubmit={handleAddLetter}
            className="mt-6 bg-[#FAF8F3] border border-slate-200 rounded-2xl p-5 space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Envelope Prompt Title
              </label>
              <input
                type="text"
                value={newPrompt}
                onChange={(e) => setNewPrompt(e.target.value)}
                placeholder="e.g., Open When We Have Our Next Date Night"
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-sm focus:outline-none focus:border-[#2563EB]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Handwritten Letter
              </label>
              <textarea
                rows={3}
                value={newBody}
                onChange={(e) => setNewBody(e.target.value)}
                placeholder="Write something sweet for your pokie..."
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-sm focus:outline-none focus:border-[#2563EB]"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsWriting(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200/60 cursor-pointer whitespace-nowrap shrink-0"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-scrapbook-blue px-5 py-2 rounded-xl text-xs font-bold text-white cursor-pointer whitespace-nowrap shrink-0"
              >
                Seal Envelope
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {letters.map((letter) => {
            const isOpen = openId === letter.id;
            return (
              <div
                key={letter.id}
                onClick={() => {
                  soundManager.playHeartKey(2);
                  setOpenId(letter.id);
                }}
                className={`rounded-2xl p-5 border transition-all cursor-pointer flex flex-col justify-between ${
                  isOpen
                    ? 'bg-[#FAF8F3] border-[#3B82F6] shadow-md'
                    : 'bg-slate-50/70 border-slate-200 hover:border-blue-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span>{letter.date}</span>
                    {isOpen ? (
                      <MailOpen className="w-4 h-4 text-[#1E3A8A]" />
                    ) : (
                      <Mail className="w-4 h-4 text-slate-400" />
                    )}
                  </div>

                  <h3 className="font-serif-editorial font-bold text-2xl text-slate-900">
                    {letter.prompt}
                  </h3>

                  {isOpen ? (
                    <p className="mt-3 font-serif-editorial italic text-lg text-slate-700 leading-relaxed">
                      “{letter.body}”
                    </p>
                  ) : (
                    <p className="mt-3 text-xs text-[#1E3A8A] font-medium">
                      Click wax seal to unfold letter →
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between text-xs text-slate-400">
                  <span>With all my love</span>
                  <Heart className="w-3.5 h-3.5 text-[#E11D48] fill-[#E11D48]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
