/**
 * Interactive Scrapbook — Pure Vanilla JS (GitHub Pages Ready)
 * Automatically syncs custom photos from the ./images/ folder:
 * - Camera (14 photos): images/Pokie1 ... images/Pokie14 (.jpg, .png, .jpeg, .webp)
 * - Strip 1 (2 photos): images/Pobo1top, images/Pobo1bottom
 * - Strip 2 (2 photos): images/Pobo2top, images/Pobo2bottom
 * - Page 6 (4 photos):  images/2023, images/2024, images/2025, images/2026
 */

const PASSCODE = '1410';
let enteredCode = '';
let isUnlocked = false;
let currentPageId = 'page-1';

// PokieCam 14 Photos State (Pokie1 ... Pokie14)
const TOTAL_CAMERA_PHOTOS = 14;
let currentCameraIndex = 1; // 1 to 14

// Web Audio API Chime Synthesizer
let audioCtx = null;
function playChime(step = 1) {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioCtx) audioCtx = new AudioContextClass();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const freqs = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freqs[step % freqs.length], audioCtx.currentTime);
    gain.gain.setValueAtTime(0.07, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.32);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.34);
  } catch {
    // Ignore audio errors if blocked by browser policy
  }
}

/**
 * Custom Love-Shape Font SVG Generator for digits 0-9
 */
function miniHeartSVG(cx, cy, scale, fill, rotate = 0) {
  return `<g transform="translate(${cx}, ${cy}) rotate(${rotate}) scale(${scale})">
    <path d="M0 4.5 C-1.5 1.5 -5.5 0 -7.5 3 C-9.5 6 -6.5 10.5 0 15 C6.5 10.5 9.5 6 7.5 3 C5.5 0 1.5 1.5 0 4.5 Z" fill="${fill}" />
  </g>`;
}

function getLoveDigitInnerPaths(d, strokeColor = '#1E3A8A', heartColor = '#E11D48') {
  switch (String(d)) {
    case '0':
      return `<path d="M32 21 C26 11 11 13 11 28 C11 45 25 57 32 64 C39 57 53 45 53 28 C53 13 38 11 32 21 Z" stroke="${strokeColor}" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/>
      ${miniHeartSVG(32, 13, 0.85, heartColor)}${miniHeartSVG(32, 56, 0.65, heartColor)}`;
    case '1':
      return `<path d="M20 24 C25 21 30 16 33 12 L33 60" stroke="${strokeColor}" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M21 61 C28 59 38 59 45 61" stroke="${strokeColor}" stroke-width="6" stroke-linecap="round"/>
      ${miniHeartSVG(33, 6, 0.95, heartColor, -8)}${miniHeartSVG(33, 35, 0.7, heartColor)}`;
    case '2':
      return `<path d="M17 25 C15 13 28 11 32 19 C36 11 49 13 47 26 C45 38 24 47 16 60 L48 60" stroke="${strokeColor}" stroke-width="6.2" stroke-linecap="round" stroke-linejoin="round"/>
      ${miniHeartSVG(17, 20, 0.78, heartColor, -15)}${miniHeartSVG(48, 52, 0.85, heartColor, 12)}`;
    case '3':
      return `<path d="M18 17 C27 11 45 14 44 25 C43 34 33 37 27 37 C35 37 46 41 45 52 C44 62 26 65 17 57" stroke="${strokeColor}" stroke-width="6.2" stroke-linecap="round" stroke-linejoin="round"/>
      ${miniHeartSVG(18, 12, 0.75, heartColor, -20)}${miniHeartSVG(27, 31, 0.72, heartColor)}${miniHeartSVG(17, 50, 0.75, heartColor, 15)}`;
    case '4':
      return `<path d="M38 62 L38 14 C29 27 19 39 13 46 L49 46" stroke="${strokeColor}" stroke-width="6.2" stroke-linecap="round" stroke-linejoin="round"/>
      ${miniHeartSVG(38, 7, 0.9, heartColor, 6)}${miniHeartSVG(49, 39, 0.78, heartColor, 14)}${miniHeartSVG(25, 40, 0.65, heartColor, -10)}`;
    case '5':
      return `<path d="M44 15 L21 15 L19 34 C26 29 46 31 46 46 C46 59 29 64 17 56" stroke="${strokeColor}" stroke-width="6.2" stroke-linecap="round" stroke-linejoin="round"/>
      ${miniHeartSVG(45, 9, 0.8, heartColor, 15)}${miniHeartSVG(17, 49, 0.8, heartColor, -12)}`;
    case '6':
      return `<path d="M41 14 C26 18 15 32 15 47 C15 58 24 63 32 63 C41 63 48 56 48 46 C48 36 38 34 32 41 C26 34 16 36 16 46" stroke="${strokeColor}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      ${miniHeartSVG(42, 9, 0.85, heartColor, 15)}${miniHeartSVG(32, 43, 0.7, heartColor)}`;
    case '7':
      return `<path d="M15 17 C24 14 38 19 47 16 C39 30 30 45 25 61" stroke="${strokeColor}" stroke-width="6.2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M21 38 L41 38" stroke="${strokeColor}" stroke-width="5.5" stroke-linecap="round"/>
      ${miniHeartSVG(15, 11, 0.75, heartColor, -15)}${miniHeartSVG(31, 31, 0.88, heartColor)}`;
    case '8':
      return `<path d="M32 18 C28 11 17 12 17 22 C17 30 27 35 32 39 C37 35 47 30 47 22 C47 12 36 11 32 18 Z" stroke="${strokeColor}" stroke-width="5.8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M32 43 C27 36 14 38 14 49 C14 58 26 62 32 65 C38 62 50 58 50 49 C50 38 37 36 32 43 Z" stroke="${strokeColor}" stroke-width="5.8" stroke-linecap="round" stroke-linejoin="round"/>
      ${miniHeartSVG(32, 33, 0.75, heartColor)}`;
    case '9':
    default:
      return `<path d="M32 20 C26 12 15 15 15 26 C15 36 25 41 32 44 C39 41 48 36 48 26 C48 15 38 12 32 20 Z" stroke="${strokeColor}" stroke-width="5.8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M47 27 C48 44 39 58 21 62" stroke="${strokeColor}" stroke-width="6" stroke-linecap="round"/>
      ${miniHeartSVG(32, 14, 0.72, heartColor)}${miniHeartSVG(21, 55, 0.82, heartColor, -12)}`;
  }
}

function createLoveDigitSVG(digit, width = 34, height = 40) {
  return `<svg width="${width}" height="${height}" viewBox="0 0 64 76" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow:visible">
    <g transform="translate(1.5, 2)" opacity="0.15">${getLoveDigitInnerPaths(digit, '#0F172A', '#0F172A')}</g>
    ${getLoveDigitInnerPaths(digit, '#1E3A8A', '#E11D48')}
  </svg>`;
}

/**
 * Generates a romantic SVG fallback data URI when an image file in ./images/
 * has not been uploaded to the GitHub repository yet.
 */
function createRomanticFallbackDataURI(photoName, subtitle = '') {
  const palettes = [
    ['#DBEAFE', '#93C5FD', '#1E3A8A'],
    ['#FFE4E6', '#FECDD3', '#9F1239'],
    ['#FEF3C7', '#FDE68A', '#92400E'],
    ['#E0E7FF', '#C7D2FE', '#3730A3'],
  ];
  let hash = 0;
  for (let i = 0; i < photoName.length; i++) {
    hash = photoName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const [bg1, bg2, textCol] = palettes[Math.abs(hash) % palettes.length];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 320" width="400" height="320">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${bg1}"/>
        <stop offset="100%" stop-color="${bg2}"/>
      </linearGradient>
    </defs>
    <rect width="400" height="320" fill="url(#g)"/>
    <circle cx="290" cy="85" r="46" fill="#FFFFFF" fill-opacity="0.55"/>
    <!-- Romantic Couple Silhouette -->
    <path d="M115 320 C118 245 142 212 178 212 C210 212 228 245 232 320 Z" fill="${textCol}" fill-opacity="0.82"/>
    <circle cx="182" cy="168" r="30" fill="${textCol}" fill-opacity="0.85"/>
    <path d="M185 320 C190 255 212 224 244 224 C272 224 292 255 296 320 Z" fill="#E11D48" fill-opacity="0.65"/>
    <circle cx="232" cy="180" r="27" fill="${textCol}" fill-opacity="0.85"/>
    <!-- Floating Love Heart -->
    <path d="M206 112 C202 103 190 100 185 108 C180 116 188 126 206 138 C224 126 232 116 227 108 C222 100 210 103 206 112 Z" fill="#E11D48"/>
    <!-- Synced Filename Label -->
    <rect x="60" y="22" width="280" height="34" rx="10" fill="#FFFFFF" fill-opacity="0.82"/>
    <text x="200" y="44" text-anchor="middle" font-family="Georgia, serif" font-size="15" font-weight="bold" fill="${textCol}">
      images/${photoName}
    </text>
    ${
      subtitle
        ? `<text x="200" y="298" text-anchor="middle" font-family="sans-serif" font-size="12" fill="${textCol}" opacity="0.85">${subtitle}</text>`
        : ''
    }
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Cache of resolved image URLs so the 3-second PokieCam slideshow
 * transitions smoothly and instantaneously every 3 seconds.
 */
const resolvedImageCache = new Map();

function getCandidateUrls(baseName) {
  const folders = ['images/', 'image/', 'Images/', ''];
  const exts = ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.PNG', '.JPEG'];
  const names = Array.from(new Set([baseName, baseName.toLowerCase(), baseName.toUpperCase()]));

  const list = [];
  for (const folder of folders) {
    for (const ext of exts) {
      for (const name of names) {
        list.push(`${folder}${name}${ext}`);
      }
    }
  }
  return list;
}

/**
 * Resolves the real URL for a photo name by probing candidate paths in parallel,
 * and caches the result (either the real image path or the fallback SVG) so
 * subsequent 3-second slideshow ticks happen in 0ms without re-probing.
 */
function resolvePhotoUrl(baseName, subtitle = '', onResolved) {
  if (resolvedImageCache.has(baseName)) {
    onResolved(resolvedImageCache.get(baseName));
    return;
  }

  const candidates = getCandidateUrls(baseName);
  let idx = 0;

  function tryNextBatch() {
    if (idx >= candidates.length) {
      const fallback = createRomanticFallbackDataURI(baseName, subtitle);
      resolvedImageCache.set(baseName, fallback);
      onResolved(fallback);
      return;
    }

    // Probe 8 candidates simultaneously so resolution finishes in <150ms
    const batch = candidates.slice(idx, idx + 8);
    idx += 8;
    let settled = false;
    let failedCount = 0;

    batch.forEach((url) => {
      const probe = new Image();
      probe.onload = () => {
        if (!settled) {
          settled = true;
          resolvedImageCache.set(baseName, url);
          onResolved(url);
        }
      };
      probe.onerror = () => {
        failedCount++;
        if (!settled && failedCount === batch.length) {
          tryNextBatch();
        }
      };
      probe.src = url;
    });
  }

  tryNextBatch();
}

function syncImageFromFolder(imgEl, baseName, subtitle = '') {
  if (!imgEl) return;
  const requestToken = `${baseName}_${Date.now()}`;
  imgEl.setAttribute('data-sync-token', requestToken);

  if (resolvedImageCache.has(baseName)) {
    imgEl.src = resolvedImageCache.get(baseName);
    return;
  }

  // Show styled fallback immediately while resolving
  imgEl.src = createRomanticFallbackDataURI(baseName, subtitle);

  resolvePhotoUrl(baseName, subtitle, (finalUrl) => {
    if (imgEl.getAttribute('data-sync-token') === requestToken) {
      imgEl.src = finalUrl;
    }
  });
}

function preloadAllCameraPhotos() {
  for (let i = 1; i <= TOTAL_CAMERA_PHOTOS; i++) {
    const name = `Pokie${i}`;
    resolvePhotoUrl(name, `PokieCam Memory ${i} of ${TOTAL_CAMERA_PHOTOS}`, () => {});
  }
}

// Spotify iFrame API Controller for automatic playback on Page 4
let spotifyController = null;
let pendingPlayOnPage4 = false;

window.onSpotifyIframeApiReady = (IFrameAPI) => {
  const element = document.getElementById('spotify-retro-iframe');
  if (!element) return;
  const options = {
    uri: 'spotify:track:6qrifdo7QINdPQr80IelGi',
    width: '100%',
    height: 152,
  };
  IFrameAPI.createController(element, options, (EmbedController) => {
    spotifyController = EmbedController;
    if (pendingPlayOnPage4 || currentPageId === 'page-4') {
      try {
        spotifyController.play();
      } catch {
        // Fallback if browser requires interaction
      }
    }
  });
};

function triggerPage4SongAutoplay() {
  pendingPlayOnPage4 = true;
  if (spotifyController) {
    try {
      spotifyController.play();
      return;
    } catch {
      // Fallback to iframe autoplay reload below
    }
  }
  const iframe = document.getElementById('spotify-retro-iframe');
  if (iframe) {
    iframe.setAttribute(
      'src',
      'https://open.spotify.com/embed/track/6qrifdo7QINdPQr80IelGi?utm_source=generator&theme=0&autoplay=1'
    );
  }
}

// PokieCam 3-second Auto-Play Timer (Page 5)
let cameraAutoplayTimer = null;

function stopCameraAutoplay() {
  if (cameraAutoplayTimer !== null) {
    clearInterval(cameraAutoplayTimer);
    cameraAutoplayTimer = null;
  }
}

function restartProgressAnimation() {
  const bar = document.getElementById('pokie-cam-progress');
  if (!bar) return;
  bar.style.animation = 'none';
  // Force reflow to restart 3s CSS bar animation
  void bar.offsetWidth;
  bar.style.animation = 'cam-progress-fill 3s linear infinite';
}

function advanceCameraSlide(delta = 1) {
  currentCameraIndex =
    ((currentCameraIndex - 1 + delta + TOTAL_CAMERA_PHOTOS) % TOTAL_CAMERA_PHOTOS) + 1;
  updateCameraPhoto();
  restartProgressAnimation();
}

function startCameraAutoplay() {
  stopCameraAutoplay();
  restartProgressAnimation();
  cameraAutoplayTimer = window.setInterval(() => {
    advanceCameraSlide(1);
  }, 3000);
}

/**
 * Navigation between non-scrollable pages
 */
function showPage(pageId) {
  currentPageId = pageId;
  playChime(pageId.length);

  document.querySelectorAll('.scrapbook-sheet').forEach((sheet) => {
    if (sheet.id === pageId) {
      sheet.classList.add('active');
    } else {
      sheet.classList.remove('active');
    }
  });

  // Page 4 is now Vintage Retro Music Player -> Automatically play song
  if (pageId === 'page-4') {
    triggerPage4SongAutoplay();
  }

  // Page 5 is now Camera & Photo Booth Strips -> Auto-play PokieCam every 3 seconds
  if (pageId === 'page-5') {
    startCameraAutoplay();
  }
}

/**
 * Passcode Lock Screen Logic (Passcode: 1410, No Hint)
 */
function renderPasscodeSlots() {
  for (let i = 0; i < 4; i++) {
    const slot = document.getElementById(`slot-${i}`);
    if (!slot) continue;
    const char = enteredCode[i];
    if (char !== undefined) {
      slot.classList.add('filled');
      slot.innerHTML = createLoveDigitSVG(char, 32, 38);
    } else {
      slot.classList.remove('filled');
      slot.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="#FFE4E6" stroke="#FDA4AF" stroke-width="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
    }
  }
}

function handleDigitInput(digit) {
  if (isUnlocked || currentPageId !== 'page-1') return;
  if (enteredCode.length >= 4) return;

  playChime(Number(digit));
  enteredCode += String(digit);
  renderPasscodeSlots();

  const statusEl = document.getElementById('passcode-status');

  if (enteredCode.length === 4) {
    if (enteredCode === PASSCODE) {
      isUnlocked = true;
      if (statusEl) {
        statusEl.textContent = 'Unlocked! Welcome, my pokie <3';
        statusEl.style.color = '#15803D';
      }
      const heartsLayer = document.getElementById('floating-hearts-layer');
      if (heartsLayer) heartsLayer.classList.add('active');

      setTimeout(() => {
        showPage('page-2');
      }, 480);
    } else {
      const card = document.getElementById('passcode-card');
      if (card) card.classList.add('animate-shake');
      if (statusEl) {
        statusEl.textContent = 'Oopsie! Try our secret code again <3';
        statusEl.style.color = '#E11D48';
      }
      setTimeout(() => {
        if (card) card.classList.remove('animate-shake');
        enteredCode = '';
        renderPasscodeSlots();
      }, 520);
    }
  }
}

function initPasscodeKeypad() {
  const keypadContainer = document.getElementById('love-keypad');
  if (!keypadContainer) return;

  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let html = '';

  digits.forEach((d) => {
    html += `
      <button type="button" class="heart-key-btn" data-digit="${d}" aria-label="Number ${d}">
        <svg viewBox="0 0 100 92" class="heart-bg-halo" fill="currentColor">
          <path d="M50 84 C50 84 10 58 10 30 C10 15 22 6 35 6 C43 6 48 11 50 16 C52 11 57 6 65 6 C78 6 90 15 90 30 C90 58 50 84 50 84 Z" />
        </svg>
        <span style="position:relative;z-index:2">${createLoveDigitSVG(d, 30, 36)}</span>
      </button>
    `;
  });

  // Clear button + Love-shaped 0 + Back button
  html += `
    <button type="button" class="key-action-btn" id="btn-key-clear">Clear</button>
    <button type="button" class="heart-key-btn" data-digit="0" aria-label="Number 0">
      <svg viewBox="0 0 100 92" class="heart-bg-halo" fill="currentColor">
        <path d="M50 84 C50 84 10 58 10 30 C10 15 22 6 35 6 C43 6 48 11 50 16 C52 11 57 6 65 6 C78 6 90 15 90 30 C90 58 50 84 50 84 Z" />
      </svg>
      <span style="position:relative;z-index:2">${createLoveDigitSVG('0', 30, 36)}</span>
    </button>
    <button type="button" class="key-action-btn" id="btn-key-back">Back</button>
  `;

  keypadContainer.innerHTML = html;

  keypadContainer.querySelectorAll('.heart-key-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const digit = btn.getAttribute('data-digit');
      handleDigitInput(digit);
    });
  });

  document.getElementById('btn-key-clear')?.addEventListener('click', () => {
    enteredCode = '';
    renderPasscodeSlots();
  });

  document.getElementById('btn-key-back')?.addEventListener('click', () => {
    enteredCode = enteredCode.slice(0, -1);
    renderPasscodeSlots();
  });

  // Physical Keyboard Listener for 1410
  window.addEventListener('keydown', (e) => {
    if (currentPageId === 'page-1' && !isUnlocked) {
      if (e.key >= '0' && e.key <= '9') {
        handleDigitInput(e.key);
      } else if (e.key === 'Backspace') {
        enteredCode = enteredCode.slice(0, -1);
        renderPasscodeSlots();
      } else if (e.key === 'Escape') {
        enteredCode = '';
        renderPasscodeSlots();
      }
    }
  });

  renderPasscodeSlots();
}

/**
 * Page 3: Build October Calendar (OCT 14, 2023 to 2026 — 3 Years of Togetherness)
 */
function initSpecialCalendar() {
  const grid = document.getElementById('october-calendar-days');
  if (!grid) return;

  // October 2026 starts on Thursday (4 blank slots: Sun, Mon, Tue, Wed)
  let html = '';
  for (let b = 0; b < 4; b++) {
    html += `<div class="cal-day"></div>`;
  }
  for (let day = 1; day <= 31; day++) {
    const isOct14 = day === 14;
    html += `
      <div class="cal-day ${isOct14 ? 'special-oct-14' : ''}">
        <span>${day}</span>
        ${
          isOct14
            ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="#E11D48" style="position:absolute;top:-4px;right:-4px"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`
            : ''
        }
      </div>
    `;
  }
  grid.innerHTML = html;
}

/**
 * Page 5: PokieCam (14 Photos: Pokie1 ... Pokie14) & Booth Strips (Pobo1top, Pobo1bottom, Pobo2top, Pobo2bottom)
 */
function updateCameraPhoto() {
  const camImg = document.getElementById('pokie-cam-img');
  const camCounter = document.getElementById('pokie-cam-counter');
  const camNameLabel = document.getElementById('pokie-cam-filename');

  const photoName = `Pokie${currentCameraIndex}`;
  if (camImg) {
    camImg.classList.remove('pokie-cam-slide');
    void camImg.offsetWidth;
    camImg.classList.add('pokie-cam-slide');
  }
  syncImageFromFolder(camImg, photoName, `PokieCam Memory ${currentCameraIndex} of ${TOTAL_CAMERA_PHOTOS}`);

  if (camCounter) {
    camCounter.textContent = `[${currentCameraIndex}/${TOTAL_CAMERA_PHOTOS}]`;
  }
  if (camNameLabel) {
    camNameLabel.textContent = photoName;
  }
}

function initCameraAndStrips() {
  updateCameraPhoto();
  startCameraAutoplay();

  document.getElementById('cam-prev-btn')?.addEventListener('click', () => {
    playChime(2);
    advanceCameraSlide(-1);
    startCameraAutoplay();
  });

  document.getElementById('cam-next-btn')?.addEventListener('click', () => {
    playChime(4);
    advanceCameraSlide(1);
    startCameraAutoplay();
  });

  document.getElementById('cam-wheel-btn')?.addEventListener('click', () => {
    playChime(5);
    advanceCameraSlide(1);
    startCameraAutoplay();
  });

  // Sync Pokie Booth Strip 1 (Pobo1top, Pobo1bottom) & Strip 2 (Pobo2top, Pobo2bottom)
  syncImageFromFolder(document.getElementById('img-Pobo1top'), 'Pobo1top', 'Strip 1 · Top');
  syncImageFromFolder(document.getElementById('img-Pobo1bottom'), 'Pobo1bottom', 'Strip 1 · Bottom');
  syncImageFromFolder(document.getElementById('img-Pobo2top'), 'Pobo2top', 'Strip 2 · Top');
  syncImageFromFolder(document.getElementById('img-Pobo2bottom'), 'Pobo2bottom', 'Strip 2 · Bottom');
}

/**
 * Page 6: Sync 4 Forever Polaroids (2023, 2024, 2025, 2026)
 */
function initForeverPolaroids() {
  ['2023', '2024', '2025', '2026'].forEach((year) => {
    const imgEl = document.getElementById(`img-year-${year}`);
    syncImageFromFolder(imgEl, year, `Our ${year} Memory`);
  });
}

/**
 * Floating Hearts Background Generator
 */
function initFloatingHearts() {
  const container = document.getElementById('floating-hearts-layer');
  if (!container) return;

  const colors = ['#F43F5E', '#FB7185', '#60A5FA', '#3B82F6', '#E11D48'];
  let html = '';

  for (let i = 0; i < 20; i++) {
    const seed = (i * 37 + 13) % 100;
    const left = Math.min(96, Math.max(3, (i * 4.7 + (seed % 7)) % 98));
    const size = 14 + (seed % 16);
    const duration = 13 + (seed % 10);
    const delay = -((i * 1.8) % duration);
    const opacity = (0.18 + (seed % 16) / 100).toFixed(2);
    const color = colors[i % colors.length];
    const animClass = i % 2 === 0 ? 'animate-floating-heart-a' : 'animate-floating-heart-b';
    const isOutline = i % 3 === 0;

    html += `
      <div class="${animClass}" style="position:absolute;left:${left}%;top:0;width:${size}px;height:${size}px;animation-duration:${duration}s;animation-delay:${delay}s;--heart-max-opacity:${opacity}">
        <svg viewBox="0 0 32 30" fill="${isOutline ? 'none' : color}" stroke="${color}" stroke-width="${isOutline ? '2.2' : '0'}" style="width:100%;height:100%">
          <path d="M16 27.2 C16 27.2 3 18.6 3 9.6 C3 4.8 6.8 1.6 11.2 1.6 C13.8 1.6 15.4 3.2 16 4.8 C16.6 3.2 18.2 1.6 20.8 1.6 C25.2 1.6 29 4.8 29 9.6 C29 18.6 16 27.2 16 27.2 Z" />
        </svg>
      </div>
    `;
  }

  container.innerHTML = html;
}

/**
 * Wire All Page Buttons
 */
function initNavigationButtons() {
  document.querySelectorAll('[data-goto]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetPage = btn.getAttribute('data-goto');
      if (targetPage) {
        showPage(targetPage);
      }
    });
  });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initPasscodeKeypad();
  initSpecialCalendar();
  initCameraAndStrips();
  initForeverPolaroids();
  initFloatingHearts();
  initNavigationButtons();
  preloadAllCameraPhotos();
});
