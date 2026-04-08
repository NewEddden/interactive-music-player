// All Myselectors
const fullPlaylistContent = document.querySelector(".fullPlaylist .content");
const nextSongContent = document.querySelector(".nextSong .content");
const previousSongContent = document.querySelector(".previousSong .content");
const lyricsContent = document.querySelector(".lyrics .content");
const currentSongContent = document.querySelector(".currentSong .content");
const mediaControlsContent = document.querySelector(".mediaControls .content");

const pauseIcon = document.querySelector(".fa-pause");
const playIcon = document.querySelector(".fa-play");
const forwardIcon = document.querySelector(".fa-forward");
const backwardIcon = document.querySelector(".fa-backward");
let allSongsOSArray = [
  {
    artist: "Lil Wayne",
    albumName: "Tha Carter V",
    name: "Mona Lisa (feat. Kendrick Lamar)",
    yearReleased: 2018,
    mp3Source: "/MP3/Lil Wayne - Mona Lisa ft. Kendrick Lamar.mp3",
    coverImage: "/Images/carterV.jpg",
  },
  {
    artist: "The Weeknd",
    albumName: "Dawn FM",
    name: "Is There Someone Else",
    yearReleased: 2022,
    mp3Source: "/MP3/The Weeknd - Is There Someone Else_ (Audio).mp3",
    coverImage: "/Images/dawnFm.jpg",
  },
  {
    artist: "Joji",
    albumName: "Smithereens",
    name: "Glimpse of Us",
    yearReleased: 2022,
    mp3Source: "",
    coverImage: "/Images/glimpse-of-us.jpg",
  },
  {
    artist: "The Weeknd",
    albumName: "My Dear Melancholy,",
    name: "Call Out My Name",
    yearReleased: 2018,
    mp3Source: "/MP3/The Weeknd - Call Out My Name (Official Video).mp3",
    coverImage: "/Images/myDearMelancholy.jpg",
  },
  {
    artist: "The Weeknd",
    albumName: "Starboy",
    name: "Starboy",
    yearReleased: 2016,
    mp3Source: "/MP3/The Weeknd - Starboy ft. Daft Punk (Official Video).mp3",
    coverImage: "/Images/starboy.jpg",
  },

  {
    artist: "The Weeknd",
    albumName: "House of Balloons",
    name: "Wicked Games",
    yearReleased: 2011,
    mp3Source: "/MP3/The Weeknd - Wicked Games (Official Video - Explicit).mp3",
    coverImage: "/Images/House-of-Balloons.webp",
  },
  {
    artist: "The Weeknd",
    albumName: "Trilogy",
    name: "The Morning",
    yearReleased: 2012,
    mp3Source: "/MP3/The Weeknd - The Morning.mp3",
    coverImage: "/Images/TheWeekendTrilogy.jpg",
  },

  {
    artist: "d4vd",
    albumName: "Petals to Thorns",
    name: "Here With Me",
    yearReleased: 2023,
    mp3Source: "",
    coverImage: "/Images/petalsToThorns.jpg",
  },
  {
    artist: "d4vd",
    albumName: "Petals to Thorns",
    name: "Romantic Homicide",
    yearReleased: 2022,
    mp3Source: "",
    coverImage: "/Images/petalsToThorns.jpg",
  },

  {
    artist: "Joji",
    albumName: "Nectar",
    name: "Sanctuary",
    yearReleased: 2020,
    mp3Source: "",
    coverImage: "/Images/nectar.jpg",
  },
  {
    artist: "Lil Wayne",
    albumName: "Tha Carter III",
    name: "A Milli",
    yearReleased: 2008,
    mp3Source: "/MP3/",
    coverImage: "/Images/carterIII.jpg",
  },
  {
    artist: "SiR",
    albumName: "Chasing Summer",
    name: "Hair Down (feat. Kendrick Lamar)",
    yearReleased: 2019,
    mp3Source: "",
    coverImage: "/Images/chasingSummer.jpg",
  },
  {
    artist: "SiR",
    albumName: "November",
    name: "D'Evils",
    yearReleased: 2018,
    mp3Source: "",
    coverImage: "/Images/november.jpg",
  },
];

let startingSongIndex = 1;
let displayedArray = [];
let currentSongArray = [];
let previousSong = [];

document.addEventListener("DOMContentLoaded", () => {
  nextSong(); // Initialize the playlist on load
});

pauseIcon.addEventListener("click", () => {
  console.log("Pause button clicked");
  pauseIcon.style.display = "none";
  playIcon.style.display = "flex";
});

playIcon.addEventListener("click", () => {
  console.log("Play button clicked");
  playIcon.style.display = "none";
  pauseIcon.style.display = "flex";
});

forwardIcon.addEventListener("click", () => {
  console.log("Forward button clicked");
  startingSongIndex = (startingSongIndex + 1) % allSongsOSArray.length; // Ensure wrap-around
  nextSong();
});

backwardIcon.addEventListener("click", () => {
  console.log("Backward button clicked");
  let newStartingIndex =
    (startingSongIndex - 1 + allSongsOSArray.length) % allSongsOSArray.length;

  if (newStartingIndex === 0) {
    previousSong = [];
  } else {
    previousSong = [
      allSongsOSArray[
        (newStartingIndex - 1 + allSongsOSArray.length) % allSongsOSArray.length
      ],
    ];
  }

  startingSongIndex = newStartingIndex;
  nextSong();
});

function updatePlaylistUI() {
  fullPlaylistContent.innerHTML = "";
  displayedArray.forEach((song, index) => {
    if (index !== 0) {
      // Exclude the current song from the playlist display
      let newDiv = document.createElement("div");
      newDiv.className = "imageContainer";
      let img = document.createElement("img");
      img.src = song.coverImage;
      newDiv.appendChild(img);
      fullPlaylistContent.appendChild(newDiv);
    }
  });

  nextSongContent.innerHTML = "";
  if (currentSongArray.length > 0) {
    let img1 = document.createElement("img");
    img1.src = currentSongArray[0].coverImage;
    nextSongContent.appendChild(img1);
  }

  previousSongContent.innerHTML = "";
  if (previousSong.length > 0) {
    let img2 = document.createElement("img");
    img2.src = previousSong[0].coverImage;
    previousSongContent.appendChild(img2);
  }
}

function nextSong() {
  let endingSongIndex = startingSongIndex + 5;
  displayedArray = [];

  for (let i = startingSongIndex; i < endingSongIndex; i++) {
    let index = i % allSongsOSArray.length;
    displayedArray.push(allSongsOSArray[index]);
  }

  //cuts the first song from current song and place it into previous song array

  if (displayedArray.length > 0) {
    previousSong = currentSongArray.slice(0, 1);
    currentSongArray = [displayedArray[0]];
  }

  console.log("Songs In Playlist:", displayedArray);
  console.log("Current Song:", currentSongArray);
  console.log("Previous Song:", previousSong);

  updatePlaylistUI();
}
