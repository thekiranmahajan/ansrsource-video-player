// getting all DOM elements
const playPauseBtn = document.querySelector(".play-pause-btn");
const miniScreenBtn = document.querySelector(".mini-screen-btn");
const theaterScreenBtn = document.querySelector(".theater-screen-btn");
const fullScreenBtn = document.querySelector(".full-screen-btn");
const volumeBtn = document.querySelector(".volume-btn");
const volumeSlider = document.querySelector(".volume-slider");
const videoContainer = document.querySelector(".video-container");
const video = document.getElementById("video");

document.addEventListener("keydown", (e) => {
  // to avoid unwanted click while typing in input field getting focused element(TAB)
  const tagName = document.activeElement.tagName.toLowerCase();
  if (tagName === "input") return;
  switch (e.key.toLowerCase()) {
    case " ":
      if (tagName === "button") return; // if focused ele. is btn then return

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
    case "m":
      toggleMute();
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

// Volume Levels

// just muting and unmuting the video
const toggleMute = () => {
  video.muted = !video.muted;
};
volumeBtn.addEventListener("click", toggleMute);

// changing the slider range based on current video.volume
volumeSlider.addEventListener("input", (e) => {
  video.volume = e.target.value;
  video.muted = e.target.value === 0;
});

video.addEventListener("volumechange", () => {
  volumeSlider.value = video.volume; // making both equal visual and actual volume

  // getting diff. volume states  and at last changing the dataset attr. value to the calculated value of volumeLevel to change styles and icons
  let volumeLevel;
  if (video.muted || video.volume === 0) {
    volumeSlider.value = 0;
    volumeLevel = "mute";
  } else if (video.volume > 0.5) {
    volumeLevel = "high";
  } else {
    volumeLevel = "low";
  }
  videoContainer.dataset.volumeLevel = volumeLevel;
});
