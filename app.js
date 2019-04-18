const app = () => {
  const song = document.querySelector('.song');
  const play = document.querySelector('.play');
  const outline = document.querySelector('.moving-outline circle');
  const video = document.querySelector('.vid-container video');

  const sounds = document.querySelectorAll('.sound-picker button');
  const timeDisplay = document.querySelector('.time-display');
  const timeSelect = document.querySelectorAll('.time-select button');
  // Get circle's length
  const outlineLength = outline.getTotalLength();
  // Duration
  let fakeDuration = 600;
  outline.style.strokeDashoffset = outlineLength;
  outline.style.strokeDasharray = outlineLength;

  // Pick sounds
  sounds.forEach(sound => {
    sound.addEventListener('click', function() {
      song.src = this.getAttribute('data-sound');
      video.src = this.getAttribute('data-video');
      checkPlaying(song);
    });
  });

  // Play sound
  play.addEventListener('click', () => {
    checkPlaying(song);
  });

  // Select sound
  timeSelect.forEach(option => {
    option.addEventListener('click', function() {
      fakeDuration = this.getAttribute('data-time');
      let minutes = Math.floor(fakeDuration / 60);
      let seconds = Math.floor(fakeDuration % 60);
      const remainderSeconds = seconds % 60;
      timeDisplay.textContent = `${minutes}:${
        remainderSeconds < 10 ? '0' : ''
      }${remainderSeconds}`;
    });
  });

  // Toggle play and pause
  const checkPlaying = song => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = './svg/pause.svg';
    } else {
      song.pause();
      video.pause();
      play.src = './svg/play.svg';
    }
  };

  // Animate the circle
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);
    // Filling in the circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;
    // Animate text mins:secs
    const remainderSeconds = seconds % 60;
    timeDisplay.textContent = `${minutes}:${
      remainderSeconds < 10 ? '0' : ''
    }${remainderSeconds}`;

    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = './svg/play.svg';
      video.pause();
    }
  };
};

app();
