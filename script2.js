/* ─────────────────────────────────────────────────────────
   MUSIC PLAYER — script2.js  (complete rewrite)
───────────────────────────────────────────────────────── */

// ── Song library ──────────────────────────────────────────
const allSongs = [
  {
    artist: "Lil Wayne",
    albumName: "Tha Carter V",
    name: "Mona Lisa (feat. Kendrick Lamar)",
    yearReleased: 2018,
    mp3Source: "MP3/Lil Wayne - Mona Lisa ft. Kendrick Lamar.mp3",
    coverImage: "Images/carterV.jpg",
    lyricsIndex: 0,
  },
  {
    artist: "The Weeknd",
    albumName: "Dawn FM",
    name: "Is There Someone Else",
    yearReleased: 2022,
    mp3Source: "MP3/The Weeknd - Is There Someone Else_ (Audio).mp3",
    coverImage: "Images/dawnFm.jpg",
    lyricsIndex: 1,
  },
  {
    artist: "Joji",
    albumName: "Nectar",
    name: "Sanctuary",
    yearReleased: 2020,
    mp3Source: "MP3/Joji - Sanctuary (Lyrics).mp3",
    coverImage: "Images/nectar.jpg",
    lyricsIndex: 2,
  },
  {
    artist: "The Weeknd",
    albumName: "My Dear Melancholy,",
    name: "Call Out My Name",
    yearReleased: 2018,
    mp3Source: "MP3/The Weeknd - Call Out My Name (Official Video).mp3",
    coverImage: "Images/myDearMelancholy.jpg",
    lyricsIndex: 3,
  },
  {
    artist: "d4vd",
    albumName: "Petals to Thorns",
    name: "Here With Me",
    yearReleased: 2023,
    mp3Source: "MP3/d4vd - Here With Me %5BOfficial Music Video%5D.mp3",
    coverImage: "Images/petalsToThorns.jpg",
    lyricsIndex: 4,
  },
  {
    artist: "The Weeknd",
    albumName: "Starboy",
    name: "Starboy",
    yearReleased: 2016,
    mp3Source: "MP3/The Weeknd - Starboy ft. Daft Punk (Official Video).mp3",
    coverImage: "Images/starboy.jpg",
    lyricsIndex: 5,
  },
  {
    artist: "Joji",
    albumName: "Smithereens",
    name: "Glimpse of Us",
    yearReleased: 2022,
    mp3Source: "MP3/Joji -  Glimpse of Us.mp3",
    coverImage: "Images/glimpse-of-us.jpg",
    lyricsIndex: 6,
  },
  {
    artist: "The Weeknd",
    albumName: "House of Balloons",
    name: "Wicked Games",
    yearReleased: 2011,
    mp3Source: "MP3/The Weeknd - Wicked Games (Official Video - Explicit).mp3",
    coverImage: "Images/House-of-Balloons.webp",
    lyricsIndex: 7,
  },
  {
    artist: "SiR",
    albumName: "Chasing Summer",
    name: "Hair Down (feat. Kendrick Lamar)",
    yearReleased: 2019,
    mp3Source: "MP3/- SiR - Hair Down (Lyric video).mp3",
    coverImage: "Images/chasingSummer.jpg",
    lyricsIndex: 8,
  },
  {
    artist: "The Weeknd",
    albumName: "Trilogy",
    name: "The Morning",
    yearReleased: 2012,
    mp3Source: "MP3/The Weeknd - The Morning.mp3",
    coverImage: "Images/TheWeekendTrilogy.jpg",
    lyricsIndex: 9,
  },
  {
    artist: "d4vd",
    albumName: "Petals to Thorns",
    name: "Romantic Homicide",
    yearReleased: 2022,
    mp3Source: "MP3/d4vd - Romantic Homicide.mp3",
    coverImage: "Images/petalsToThorns.jpg",
    lyricsIndex: 10,
  },
  {
    artist: "Lil Wayne",
    albumName: "Tha Carter III",
    name: "A Milli",
    yearReleased: 2008,
    mp3Source: "MP3/Lil Wayne - A Milli.mp3",
    coverImage: "Images/CarterIII.jpg",
    lyricsIndex: 11,
  },
  {
    artist: "SiR",
    albumName: "November",
    name: "D'Evils",
    yearReleased: 2018,
    mp3Source: "MP3/SiR - D'Evils (Lyrics).mp3",
    coverImage: "Images/november.jpg",
    lyricsIndex: 12,
  },
  {
    artist: "Frank Ocean",
    albumName: "Blonde",
    name: "White Ferrari",
    yearReleased: 2016,
    mp3Source: "MP3/Frank Ocean - White Ferrari (Lyrics).mp3",
    coverImage: "Images/blondeFrankOcean.jpg",
    lyricsIndex: 13,
  },
];

// ── State ──────────────────────────────────────────────────
let currentIndex   = 0;
let previousIndex  = null;
let stagedOffset   = 1;   // which "next" song is staged (1 = next, 2 = one after, etc.)
let isPlaying      = false;
let isShuffle      = false;
let isRepeat       = false;
let shuffleOrder   = [];

// ── DOM refs ───────────────────────────────────────────────
const audio         = document.getElementById("audioPlayer");
const queueStack    = document.getElementById("queueStack");
const currentArt    = document.getElementById("currentArt");
const currentMeta   = document.getElementById("currentMeta");
const metaName      = document.getElementById("metaName");
const metaArtist    = document.getElementById("metaArtist");
const metaYear      = document.getElementById("metaYear");
const previousArt   = document.getElementById("previousArt");
const prevName      = document.getElementById("prevName");
const prevArtist    = document.getElementById("prevArtist");
const lyricsScroll  = document.getElementById("lyricsScroll");
const stagedArtEl   = document.getElementById("stagedArt");
const stagedName    = document.getElementById("stagedName");
const stagedArtist  = document.getElementById("stagedArtist");
const playPauseBtn  = document.getElementById("playPauseBtn");
const playIcon      = document.getElementById("playIcon");
const pauseIcon     = document.getElementById("pauseIcon");
const forwardBtn    = document.getElementById("forwardBtn");
const backwardBtn   = document.getElementById("backwardBtn");
const pushUp        = document.getElementById("pushUp");
const pullDown      = document.getElementById("pullDown");
const shuffleBtn    = document.getElementById("shuffleBtn");
const repeatBtn     = document.getElementById("repeatBtn");
const progressFill  = document.getElementById("progressFill");
const progressThumb = document.getElementById("progressThumb");
const progressBar   = document.getElementById("progressBar");
const timeElapsed   = document.getElementById("timeElapsed");
const timeDuration  = document.getElementById("timeDuration");
const volumeSlider  = document.getElementById("volumeSlider");

// ── Helpers ────────────────────────────────────────────────
function wrap(i) {
  return ((i % allSongs.length) + allSongs.length) % allSongs.length;
}

function makeImg(src, alt = "") {
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  return img;
}

function animateEl(el, cls) {
  el.classList.remove(cls);
  void el.offsetWidth; // reflow
  el.classList.add(cls);
}

function fmtTime(sec) {
  if (!isFinite(sec) || isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function getStagedSong() {
  return allSongs[wrap(currentIndex + stagedOffset)];
}

function getNextIndex() {
  if (isShuffle && shuffleOrder.length) {
    const i = shuffleOrder.shift();
    return i;
  }
  return wrap(currentIndex + 1);
}

function buildShuffle() {
  shuffleOrder = allSongs
    .map((_, i) => i)
    .filter(i => i !== currentIndex)
    .sort(() => Math.random() - 0.5);
}

// ── Render functions ───────────────────────────────────────
function renderQueue() {
  queueStack.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    const song = allSongs[wrap(currentIndex + 1 + i)];
    const card = document.createElement("div");
    card.className = "queue-card";
    card.dataset.index = i + 1;
    card.appendChild(makeImg(song.coverImage, song.name));
    card.title = `${song.name} — ${song.artist}`;
    // clicking a queue card jumps to that song
    card.addEventListener("click", () => {
      const jumps = i + 1;
      for (let j = 0; j < jumps; j++) {
        previousIndex = currentIndex;
        currentIndex  = wrap(currentIndex + 1);
      }
      renderAll();
      if (isPlaying) playCurrent();
    });
    queueStack.appendChild(card);
  }
}

function renderCurrent() {
  const song = allSongs[currentIndex];

  currentArt.innerHTML = "";
  const img = makeImg(song.coverImage, song.name);
  img.classList.add("art-enter");
  currentArt.appendChild(img);

  void metaName.offsetWidth;
  metaName.textContent   = song.name;
  metaArtist.textContent = song.artist;
  metaYear.textContent   = `${song.albumName} · ${song.yearReleased}`;
  metaName.classList.remove("meta-enter");
  void metaName.offsetWidth;
  metaName.classList.add("meta-enter");
}

function renderPrevious() {
  if (previousIndex === null) {
    previousArt.innerHTML = "";
    prevName.textContent    = "—";
    prevArtist.textContent  = "—";
    return;
  }
  const song = allSongs[previousIndex];
  previousArt.innerHTML = "";
  previousArt.appendChild(makeImg(song.coverImage, song.name));
  prevName.textContent   = song.name;
  prevArtist.textContent = song.artist;
}

function renderLyrics() {
  const song = allSongs[currentIndex];
  lyricsScroll.innerHTML = "";
  lyricsScroll.scrollTop = 0;

  const idx = song.lyricsIndex;
  if (typeof lyrics === "undefined" || !lyrics[idx]) {
    lyricsScroll.innerHTML = "<p class='lyric-line' style='color:#aaa;'>No lyrics available.</p>";
    return;
  }

  const lines = lyrics[idx];
  lines.forEach(line => {
    if (/^\[.+\]$/.test(line.trim())) {
      const sec = document.createElement("div");
      sec.className = "lyric-section";
      sec.textContent = line.replace(/[\[\]]/g, "");
      lyricsScroll.appendChild(sec);
    } else {
      const p = document.createElement("p");
      p.className = "lyric-line";
      p.textContent = line || "";
      lyricsScroll.appendChild(p);
    }
  });
}

function renderStaged() {
  const song = getStagedSong();
  stagedArtEl.innerHTML    = "";
  stagedArtEl.appendChild(makeImg(song.coverImage, song.name));
  stagedName.textContent   = song.name;
  stagedArtist.textContent = song.artist;
}

function renderAll() {
  renderQueue();
  renderCurrent();
  renderPrevious();
  renderLyrics();
  renderStaged();
  resetProgress();
}

// ── Audio / playback ───────────────────────────────────────
function playCurrent() {
  audio.pause();
  audio.currentTime = 0;
  const song = allSongs[currentIndex];
  if (!song.mp3Source) {
    setPlayingState(false);
    return;
  }
  audio.src = song.mp3Source;
  audio.play().then(() => setPlayingState(true)).catch(() => setPlayingState(false));
}

function setPlayingState(playing) {
  isPlaying = playing;
  playIcon.style.display  = playing ? "none" : "inline";
  pauseIcon.style.display = playing ? "inline" : "none";
}

function resetProgress() {
  progressFill.style.width  = "0%";
  progressThumb.style.left  = "0%";
  timeElapsed.textContent   = "0:00";
  timeDuration.textContent  = "0:00";
}

// ── Controls ───────────────────────────────────────────────
playPauseBtn.addEventListener("click", () => {
  const song = allSongs[currentIndex];
  if (!song.mp3Source) return;

  if (isPlaying) {
    audio.pause();
    setPlayingState(false);
  } else {
    if (!audio.src || !audio.src.includes(encodeURIComponent(song.mp3Source).slice(0, 10))) {
      audio.src = song.mp3Source;
    }
    audio.play().then(() => setPlayingState(true)).catch(() => {});
  }
});

forwardBtn.addEventListener("click", () => {
  previousIndex = currentIndex;
  currentIndex  = getNextIndex();
  stagedOffset  = 1;
  renderAll();
  if (isPlaying) playCurrent();
});

backwardBtn.addEventListener("click", () => {
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
    return;
  }
  if (previousIndex !== null) {
    const tmp     = currentIndex;
    currentIndex  = previousIndex;
    previousIndex = wrap(tmp - 1);
    stagedOffset  = 1;
    renderAll();
    if (isPlaying) playCurrent();
  }
});

// Staged arrows: pullDown = peek next queued song, pushUp = play staged
pullDown.addEventListener("click", () => {
  stagedOffset = (stagedOffset % 5) + 1;
  renderStaged();
});

pushUp.addEventListener("click", () => {
  // Insert staged song as the very next song by shuffling indexes
  const stagedIdx = wrap(currentIndex + stagedOffset);
  previousIndex   = currentIndex;
  currentIndex    = stagedIdx;
  stagedOffset    = 1;
  renderAll();
  if (isPlaying) playCurrent();
});

// Shuffle
shuffleBtn.addEventListener("click", () => {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle("active", isShuffle);
  if (isShuffle) buildShuffle();
});

// Repeat
repeatBtn.addEventListener("click", () => {
  isRepeat = !isRepeat;
  repeatBtn.classList.toggle("active", isRepeat);
  audio.loop = isRepeat;
});

// Volume
volumeSlider.addEventListener("input", () => {
  audio.volume = parseFloat(volumeSlider.value);
});

// Progress bar click to seek
progressBar.addEventListener("click", (e) => {
  if (!audio.duration) return;
  const rect = progressBar.getBoundingClientRect();
  const pct  = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  audio.currentTime = pct * audio.duration;
});

// ── Audio events ───────────────────────────────────────────
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  progressFill.style.width = `${pct}%`;
  progressThumb.style.left = `${pct}%`;
  timeElapsed.textContent  = fmtTime(audio.currentTime);
  timeDuration.textContent = fmtTime(audio.duration);
});

audio.addEventListener("ended", () => {
  if (!isRepeat) {
    previousIndex = currentIndex;
    currentIndex  = getNextIndex();
    stagedOffset  = 1;
    renderAll();
    playCurrent();
  }
});

audio.addEventListener("error", () => setPlayingState(false));

// ── Init ───────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderAll();
});
