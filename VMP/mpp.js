const audio = new Audio('Habibi Drip - PagalHits.mp3');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressContainer = document.querySelector('.progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const songTitleEl = document.getElementById('song-title');
const songArtistEl = document.getElementById('song-artist');

let isPlaying = false;

const songs = [
    {
        title: 'Habibi Drip',
        artist: 'DABZEE',
        src: 'Habibi Drip - PagalHits.mp3',
        img: 'hbdrip.jpg'
    },
    {
        title: 'Ballatha Jathi',
        artist: 'DABZEE',
        src: 'btj.mp3',
        img: 'ball.jpg'
    },
    {
        title: 'Illuminati',
        artist: 'DABZEE',
        src: 'illu.mp3',
        img: 'illu.jpeg'
    },
    {
        title: 'Manavalan Thug',
        artist: 'DABZEE',
        src: 'mt.mp3',
        img: 'mt.jpeg'
    }
];

let currentSongIndex = 0;

function loadSong(song) {
    songTitleEl.textContent = song.title;
    songArtistEl.textContent = song.artist;
    document.querySelector('.album-art img').src = song.img;
    audio.src = song.src;
}

function playSong() {
    isPlaying = true;
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    audio.play();
}

function pauseSong() {
    isPlaying = false;
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    audio.pause();
}

playPauseBtn.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
});

nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
});

audio.addEventListener('timeupdate', updateProgress);

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    }

    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
    }

    durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
}

progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
});

// Load initial song
audio.addEventListener('loadedmetadata', () => {
    const durationMinutes = Math.floor(audio.duration / 60);
    let durationSeconds = Math.floor(audio.duration % 60);
    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    }

    durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
});

loadSong(songs[currentSongIndex]);

const playlist = document.querySelector('.playlist');

songs.forEach((song, index) => {
    const songElement = document.createElement('div');
    songElement.classList.add('song');
    songElement.innerHTML = `
        <img src="${song.img}" alt="${song.title}">
        <div class="song-info">
            <h4>${song.title}</h4>
            <p>${song.artist}</p>
        </div>
    `;
    songElement.addEventListener('click', () => {
        currentSongIndex = index;
        loadSong(song);
        playSong();
    });
    playlist.appendChild(songElement);
});

// Event listener for space bar to toggle play/pause
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault(); // Prevent the default action of space bar (scrolling down)
        isPlaying ? pauseSong() : playSong();
    }
});
