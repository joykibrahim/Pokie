export type SceneKey =
  | 'golden-embrace'
  | 'photobooth-kiss'
  | 'beach-sunset'
  | 'cozy-hoodie'
  | 'cafe-date'
  | 'stargazing'
  | 'polaroid-selfie'
  | 'autumn-walk';

export type FrameStyle = 'polaroid' | 'gingham' | 'filmstrip' | 'denim';

export interface ScrapbookMemory {
  id: string;
  title: string;
  dateLabel: string;
  yearTag: string;
  secretNote: string;
  category: 'polaroid' | 'photobooth' | 'camera' | 'gallery';
  frameStyle: FrameStyle;
  isFavorite: boolean;
  rotation: number;
  sceneFallback: SceneKey;
  customImageUrl?: string;
}

export const INITIAL_MEMORIES: ScrapbookMemory[] = [
  {
    id: 'cam-1',
    title: 'Golden Hour in Your Arms',
    dateLabel: 'October 14 · 17:42',
    yearTag: '2024',
    secretNote: 'The exact moment I realized home is not a place—it is wherever you are holding my hand.',
    category: 'camera',
    frameStyle: 'polaroid',
    isFavorite: true,
    rotation: -2,
    sceneFallback: 'golden-embrace',
  },
  {
    id: 'strip-1',
    title: 'Photo Booth Giggles #1',
    dateLabel: 'First Date Strip · Frame 01',
    yearTag: '2024',
    secretNote: 'You tried to look serious for the camera and lasted 0.5 seconds before laughing.',
    category: 'photobooth',
    frameStyle: 'filmstrip',
    isFavorite: true,
    rotation: 2,
    sceneFallback: 'photobooth-kiss',
  },
  {
    id: 'strip-2',
    title: 'Forehead Kisses #2',
    dateLabel: 'Photo Booth · Frame 02',
    yearTag: '2024',
    secretNote: 'Still my favorite 4-strip we keep tucked inside my phone case.',
    category: 'photobooth',
    frameStyle: 'filmstrip',
    isFavorite: false,
    rotation: -3,
    sceneFallback: 'polaroid-selfie',
  },
  {
    id: 'strip-3',
    title: 'Late Night Matcha & Hoodies',
    dateLabel: 'Photo Booth · Frame 03',
    yearTag: '2025',
    secretNote: 'Stealing my oversized hoodie and claiming it was always yours.',
    category: 'photobooth',
    frameStyle: 'filmstrip',
    isFavorite: true,
    rotation: 1.5,
    sceneFallback: 'cozy-hoodie',
  },
  {
    id: 'strip-4',
    title: 'Silly Peace Signs #4',
    dateLabel: 'Photo Booth · Frame 04',
    yearTag: '2025',
    secretNote: 'Every little mundane afternoon with you turns into my favorite memory.',
    category: 'photobooth',
    frameStyle: 'filmstrip',
    isFavorite: false,
    rotation: -1.5,
    sceneFallback: 'cafe-date',
  },
  {
    id: 'polaroid-2024',
    title: 'Where Our Story Began',
    dateLabel: 'Chapter I · 2024',
    yearTag: '2024',
    secretNote: '2024 taught me how lucky a person can get when they meet their soulmate.',
    category: 'polaroid',
    frameStyle: 'polaroid',
    isFavorite: true,
    rotation: -8,
    sceneFallback: 'beach-sunset',
  },
  {
    id: 'polaroid-2025',
    title: 'Growing Closer Every Day',
    dateLabel: 'Chapter II · 2025',
    yearTag: '2025',
    secretNote: '365 days of inside jokes, sleepy FaceTime calls, and loving you deeper.',
    category: 'polaroid',
    frameStyle: 'gingham',
    isFavorite: true,
    rotation: 2,
    sceneFallback: 'golden-embrace',
  },
  {
    id: 'polaroid-2026',
    title: 'My Constant Forever',
    dateLabel: 'Chapter III · 2026',
    yearTag: '2026',
    secretNote: '2nd Anniversary & counting—thank you for being my moon and all the stars in my sky.',
    category: 'polaroid',
    frameStyle: 'denim',
    isFavorite: true,
    rotation: 7,
    sceneFallback: 'stargazing',
  },
];

/**
 * Compresses an uploaded image file onto an offscreen canvas so multiple
 * custom photos can be stored reliably in localStorage without quota overflow.
 */
export function compressImageFile(file: File, maxWidth = 900): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
