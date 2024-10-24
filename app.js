const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("myAudio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const currTime = document.querySelector("#currTime");
const durTime = document.querySelector("#durTime");

// songs object
var song0 = {
  name : 'Kaise ab Kahein',
  music_url : "Static/Kaise Ab Kahein (feat. Hrishi Giridhar, Pratik Gangavane) (From Gutar Gu).mp3",
  song_type : 'audio/mpeg',
  img_src:'Static/kaiseabkahein.jpeg'
}
var song1 = {
  name : 'Parwah Nahin',
  music_url : 'Static/PARWAH NAHIN Full Song ( Audio)  M.S. DHONI -THE UNTOLD STORY  Sushant Singh Rajput , Disha Patani.mp3',
  song_type : 'audio/mpeg',
  img_src : 'Static/parwahnahi.webp'
}
var song2 = {
  name : 'Soorma Anthem',
  music_url : 'Static/Soorma Anthem  Lyric Video  Soorma  Diljit Dosanjh  Shankar Ehsaan Loy  Gulzar.mp3',
  song_type : 'audio/mpeg',
  img_src : 'Static/Soorma.jpg'
}

var songs_list = [song0,song1,song2]

let songIndex = 2;

loadSong(songs_list[songIndex]);

function loadSong(song) {
  title.innerText = song.name;
  audio.src = song.music_url;
  cover.src = song.img_src;
}

playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
    myAudio.pause()
  } else {
    playSong();
    myAudio.play()
  }
});

function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
}

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs_list.length - 1;
  }

  loadSong(songs_list[songIndex]);

  playSong();
}

function nextSong() {
  songIndex++;

  if (songIndex > songs_list.length - 1) {
    songIndex = 0;
  }

  loadSong(songs_list[songIndex]);

  playSong();
}

audio.addEventListener("timeupdate", updateProgress);

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

progressContainer.addEventListener("click", setProgress);

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

audio.addEventListener("ended", nextSong);







