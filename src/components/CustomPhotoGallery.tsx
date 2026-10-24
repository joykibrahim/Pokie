import React, { useState, useRef } from 'react';
import {
  Upload,
  Heart,
  Plus,
  RotateCcw,
  Trash2,
  Eye,
  Camera,
  Image as ImageIcon,
} from 'lucide-react';
import {
  ScrapbookMemory,
  FrameStyle,
  SceneKey,
} from '../data/initialMemories';
import { CoupleArtworkSVG, BlueLilyFlower } from './ScrapbookDecorations';
import { soundManager } from '../utils/soundEffects';

interface CustomPhotoGalleryProps {
  memories: ScrapbookMemory[];
  onAddMemory: (
    file: File | null,
    title: string,
    yearTag: string,
    secretNote: string,
    frameStyle: FrameStyle,
    sceneFallback: SceneKey
  ) => Promise<void>;
  onToggleFavorite: (id: string) => void;
  onDeleteMemory: (id: string) => void;
  onUploadForMemory: (id: string, file: File) => void;
  onSelectMemory: (memory: ScrapbookMemory) => void;
}

type GalleryFilter = 'all' | 'polaroid' | 'photobooth' | 'favorites';

export const CustomPhotoGallery: React.FC<CustomPhotoGalleryProps> = ({
  memories,
  onAddMemory,
  onToggleFavorite,
  onDeleteMemory,
  onUploadForMemory,
  onSelectMemory,
}) => {
  const [filter, setFilter] = useState<GalleryFilter>('all');
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});
  const [isCreatorOpen, setIsCreatorOpen] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // New Memory Form State
  const [newTitle, setNewTitle] = useState<string>('');
  const [newYear, setNewYear] = useState<string>('2026');
  const [newNote, setNewNote] = useState<string>('');
  const [newFrame, setNewFrame] = useState<FrameStyle>('polaroid');
  const [newFile, setNewFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const filteredMemories = memories.filter((m) => {
    if (filter === 'favorites') return m.isFavorite;
    if (filter === 'polaroid') return m.category === 'polaroid' || m.frameStyle === 'polaroid';
    if (filter === 'photobooth') return m.category === 'photobooth' || m.frameStyle === 'filmstrip';
    return true;
  });

  const handleFilePicked = (file: File) => {
    setNewFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    if (!isCreatorOpen) setIsCreatorOpen(true);
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const titleToUse = newTitle.trim() || 'Sweet Moment With My Pokie';
    const noteToUse =
      newNote.trim() || 'Every photo with you is a piece of my heart.';
    await onAddMemory(
      newFile,
      titleToUse,
      newYear.trim() || '2026',
      noteToUse,
      newFrame,
      'polaroid-selfie'
    );
    soundManager.playUnlockChime();
    setNewTitle('');
    setNewNote('');
    setNewFile(null);
    setPreviewUrl(null);
    setIsCreatorOpen(false);
  };

  const toggleCardFlip = (id: string) => {
    soundManager.playHeartKey(5);
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getFrameClasses = (style: FrameStyle) => {
    switch (style) {
      case 'gingham':
        return 'bg-blue-gingham border-2 border-[#93C5FD]';
      case 'denim':
        return 'bg-[#EFF6FF] border-2 border-dashed border-[#3B82F6]';
      case 'filmstrip':
        return 'bg-[#0F172A] text-white border-2 border-slate-800';
      case 'polaroid':
      default:
        return 'bg-white border border-slate-200';
    }
  };

  return (
    <section id="custom-gallery" className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Gallery Header & Action Bar */}
      <div className="bg-scrapbook-grid rounded-3xl border-2 border-slate-200/90 p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <BlueLilyFlower className="absolute -top-8 -right-8 w-28 h-28 opacity-90 rotate-12" />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200/80">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs text-[#1E3A8A] font-medium">
              <span>Our Scrapbook Wall</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{memories.length} Saved Memories</span>
              <span aria-hidden="true">·</span>
              <span>Click Any Polaroid to View or Flip</span>
            </div>
            <h2
              className="font-serif-editorial text-3xl sm:text-5xl font-bold text-[#0F172A] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Custom Polaroid &amp; Memory Gallery
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Upload your favorite photos together, pick a handmade scrapbook frame, and write a secret love note on the back of each Polaroid.
            </p>
          </div>

          {/* Interactive Filter Controls + Add Memory CTA */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 p-1 bg-slate-200/75 rounded-lg">
              {[
                { id: 'all', label: 'All Memories' },
                { id: 'polaroid', label: 'Polaroids' },
                { id: 'photobooth', label: 'Photo Booth' },
                { id: 'favorites', label: 'Favorites' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id as GalleryFilter)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    filter === tab.id
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsCreatorOpen((prev) => !prev)}
              className="px-4 py-2 rounded-xl bg-[#1E3A8A] hover:bg-[#1D4ED8] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>{isCreatorOpen ? 'Close Studio' : 'Add Custom Photo'}</span>
            </button>
          </div>
        </div>

        {/* Collapsible Custom Photo Uploader & Frame Studio */}
        {isCreatorOpen && (
          <form
            onSubmit={handleCreateSubmit}
            className="mt-8 bg-white/95 rounded-2xl border border-[#BFDBFE] p-6 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
          >
            {/* Drag & Drop Photo Zone */}
            <div className="lg:col-span-5">
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file && file.type.startsWith('image/')) {
                    handleFilePicked(file);
                  }
                }}
                onClick={() => fileInputRef.current?.click()}
                className={`aspect-4/3 w-full rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-colors overflow-hidden relative ${
                  isDragging
                    ? 'border-[#2563EB] bg-blue-50'
                    : 'border-slate-300 hover:border-[#3B82F6] bg-slate-50/70'
                }`}
              >
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Upload preview"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="space-y-2">
                    <div className="w-11 h-11 rounded-full bg-blue-100 text-[#1E3A8A] flex items-center justify-center mx-auto">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-semibold text-slate-800">
                      Click or drag &amp; drop a photo here
                    </p>
                    <p className="text-[11px] text-slate-500">
                      JPG, PNG, or WEBP · Automatically saved to your scrapbook
                    </p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFilePicked(file);
                  }}
                />
              </div>
            </div>

            {/* Metadata & Frame Picker */}
            <div className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Memory Title / Caption
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g., Late Night Ice Cream Run <3"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Year / Date Tag
                  </label>
                  <input
                    type="text"
                    value={newYear}
                    onChange={(e) => setNewYear(e.target.value)}
                    placeholder="2026"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm tabular-nums focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Secret Love Note (Written on Back of Polaroid)
                </label>
                <textarea
                  rows={2}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Write a sweet note that appears when she flips this Polaroid..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              {/* Scrapbook Frame Style Selector */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-slate-600 mr-1">Frame:</span>
                  {(
                    [
                      { id: 'polaroid', label: 'Classic White' },
                      { id: 'gingham', label: 'Blue Gingham' },
                      { id: 'denim', label: 'Denim Stitch' },
                      { id: 'filmstrip', label: 'Film Strip' },
                    ] as { id: FrameStyle; label: string }[]
                  ).map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setNewFrame(f.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        newFrame === f.id
                          ? 'bg-[#EFF6FF] border-[#2563EB] text-[#1E3A8A] font-semibold'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCreatorOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-scrapbook-blue px-5 py-2 rounded-xl text-xs font-bold text-white cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Pin to Scrapbook
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* Polaroid Masonry / Bento Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMemories.map((memory) => {
            const isFlipped = Boolean(flippedIds[memory.id]);
            const isDarkFrame = memory.frameStyle === 'filmstrip';

            return (
              <div
                key={memory.id}
                className={`group relative rounded-2xl p-3.5 pb-4 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between ${getFrameClasses(
                  memory.frameStyle
                )}`}
              >
                {/* Top Washi Tape Strip Decoration */}
                <div className="w-16 h-4 bg-[#93C5FD]/55 border border-[#60A5FA]/40 -mt-5 mx-auto mb-2 rotate-[-2deg] rounded-xs pointer-events-none" />

                {/* Photo or Flipped Back Secret Note */}
                {!isFlipped ? (
                  <div
                    onClick={() => onSelectMemory(memory)}
                    className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-slate-100 cursor-pointer"
                  >
                    {memory.customImageUrl ? (
                      <img
                        src={memory.customImageUrl}
                        alt={memory.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <CoupleArtworkSVG scene={memory.sceneFallback} />
                    )}

                    {/* Hover Quick Actions Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                      <span className="text-xs font-medium text-white inline-flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Open Lightbox</span>
                      </span>

                      <label
                        onClick={(e) => e.stopPropagation()}
                        className="px-2 py-1 rounded bg-white/90 hover:bg-white text-[11px] font-semibold text-slate-900 inline-flex items-center gap-1 cursor-pointer"
                        title="Replace with your own photo"
                      >
                        <Camera className="w-3 h-3" />
                        <span>Replace</span>
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
                ) : (
                  <div
                    onClick={() => toggleCardFlip(memory.id)}
                    className="aspect-4/3 w-full rounded-xl bg-[#FAF8F3] border border-dashed border-slate-300 p-4 flex flex-col items-center justify-center text-center cursor-pointer"
                  >
                    <Heart className="w-5 h-5 text-rose-500 fill-rose-500 mb-2" />
                    <p className="font-serif-editorial italic text-base text-slate-800 leading-snug line-clamp-4">
                      “{memory.secretNote}”
                    </p>
                    <span className="mt-2 text-[11px] text-slate-400">Tap to flip back</span>
                  </div>
                )}

                {/* Polaroid Caption & Unboxed Metadata */}
                <div className="mt-3 pt-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3
                      onClick={() => onSelectMemory(memory)}
                      className={`font-serif-editorial font-bold text-xl leading-snug cursor-pointer hover:underline truncate ${
                        isDarkFrame ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {memory.title}
                    </h3>

                    <button
                      type="button"
                      onClick={() => onToggleFavorite(memory.id)}
                      className="p-1 rounded-full hover:bg-rose-50/50 transition-colors cursor-pointer shrink-0"
                      aria-label="Toggle favorite"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          memory.isFavorite
                            ? 'text-[#E11D48] fill-[#E11D48]'
                            : isDarkFrame
                            ? 'text-slate-400'
                            : 'text-slate-400'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Clean Unboxed Metadata with Typographic Separators */}
                  <div
                    className={`mt-1 flex items-center justify-between text-xs ${
                      isDarkFrame ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="tabular-nums">{memory.yearTag}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{memory.dateLabel}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => toggleCardFlip(memory.id)}
                        className={`text-xs font-medium hover:underline inline-flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0 ${
                          isDarkFrame ? 'text-blue-300' : 'text-[#1E3A8A]'
                        }`}
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>{isFlipped ? 'Front' : 'Note'}</span>
                      </button>

                      {memory.id.startsWith('custom-') && (
                        <button
                          type="button"
                          onClick={() => onDeleteMemory(memory.id)}
                          className="text-rose-500 hover:text-rose-700 p-0.5 cursor-pointer"
                          title="Delete custom photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
