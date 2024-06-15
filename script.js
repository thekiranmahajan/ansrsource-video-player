// getting all DOM elements
const playPauseBtn = document.querySelector(".play-pause-btn");
const miniScreenBtn = document.querySelector(".mini-screen-btn");
const theaterScreenBtn = document.querySelector(".theater-screen-btn");
const fullScreenBtn = document.querySelector(".full-screen-btn");
const videoContainer = document.querySelector(".video-container");
const video = document.getElementById("video");

document.addEventListener("keydown", (e) => {
  switch (e.key.toLowerCase()) {
    case " ":
    case "k":
      togglePlay();
      break;
    case "f":
      toggleFullScreenMode();
      break;
    case "t":
      toggleTheaterScreenMode();
      break;
    case "i":
      toggleMiniScreenMode();
      break;
  }
});

// Fn to play & pause video with event handlers
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

// Fn for Screen Modes with event handlers

// ** Mini-Screen **
const toggleMiniScreenMode = () => {
  if (videoContainer.classList.contains("mini-player")) {
    document.exitPictureInPicture();
  } else {
    video.requestPictureInPicture();
  }
};

// injecting and withdrawing mini-player class by video events
video.addEventListener("enterpictureinpicture", () => {
  videoContainer.classList.add("mini-player");
});

video.addEventListener("leavepictureinpicture", () => {
  videoContainer.classList.remove("mini-player");
});
miniScreenBtn.addEventListener("click", toggleMiniScreenMode);

// ** Theater-Screen **
const toggleTheaterScreenMode = () => {
  videoContainer.classList.toggle("theater");
};

theaterScreenBtn.addEventListener("click", toggleTheaterScreenMode);

// ** Full-Screen **
const toggleFullScreenMode = () => {
  if (document.fullscreenElement == null) {
    videoContainer.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};
// adding eventListener to check full screen mode only if there exist fullscreenElement in DOM
document.addEventListener("fullscreenchange", () => {
  videoContainer.classList.toggle("full-screen", document.fullscreenElement);
});

fullScreenBtn.addEventListener("click", toggleFullScreenMode);
