// getting all DOM elements
const playPauseBtn = document.querySelector(".play-pause-btn");
const videoContainer = document.querySelector(".video-container");
const video = document.getElementById("video");

// Fn to play & pause video
const togglePlay = () => {
  video.paused ? video.play() : video.pause();
};

playPauseBtn.addEventListener("click", togglePlay);

// Listening events on video and toggling class of videoContainer
video.addEventListener("play", () => {
  videoContainer.classList.remove("paused");
});
video.addEventListener("pause", () => {
  videoContainer.classList.add("paused");
});
