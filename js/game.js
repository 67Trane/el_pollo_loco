let canvas;
let world;
let keyboard = new Keyboard();

/**
 * Initializes the game by checking if the start button has been pressed and starting the game.
 */
function init() {
  isOnMobile()
  let checkStart = setInterval(() => {
    if (gameStart) {
      loadingScreen();
      clearInterval(checkStart);
      startGame();
    }
  }, 500);
}

/**
 * Hides the start screen and sets the gameStart flag to true.
 */
function startButton() {
  document.getElementById("start-screen").classList.add("d-none");
  gameStart = true;
}

/**
 * Displays the loading screen and starts loading the game.
 */
function loadingScreen() {
  loadingScreenDiv = document.getElementById("loading-screen");
  loadingScreenImg = document.getElementById("loading-screen-img");
  loadingScreenDiv.classList.remove("d-none");
  count = 0;
  amountOfPics = 26;
  intervalId = setInterval(() => {
    loadLoadingScreen();
    if (loaded) {
      removeLoadingScreen();
    }
  }, 60);
}

/**
 * Updates the loading screen with the next image in the sequence.
 */
function loadLoadingScreen() {
  i = (count % amountOfPics) + 1;
  formatedNumber = smallerThenTen(i);
  loadingScreenImg.src = `./img/text-animation/PNG/LoadGame/LoadGame_${formatedNumber}.png`;
  count++;
}

/**
 * Removes the loading screen after the game has loaded.
 */
function removeLoadingScreen() {
  loadingScreenDiv.classList.add("d-none");
  clearInterval(intervalId);
}

/**
 * Formats numbers less than 10 with a leading zero.
 * @param {number} number - The number to format.
 * @returns {string} The formatted number.
 */
function smallerThenTen(number) {
  return number < 10 ? `0${number}` : number;
}

/**
 * Starts the game by initializing the world and attaching it to the canvas.
 */
function startGame() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

/**
 * Adds event listeners for keydown events to control the character and game.
 */
document.addEventListener("keydown", (event) => {
  if (event.keyCode == 80) {
    unpauseCharacter();
  }

  if (event.keyCode == 82) {
    restartGame();
  }

  if (event.keyCode == 70) {
    keyboard.F = true;
  }
  if (event.keyCode == 39) {
    keyboard.RIGHT = true;
  }

  if (event.keyCode == 37) {
    keyboard.LEFT = true;
  }

  if (event.keyCode == 38) {
    keyboard.UP = true;
  }

  if (event.keyCode == 40) {
    keyboard.DOWN = true;
  }

  if (event.keyCode == 32) {
    keyboard.SPACE = true;
  }
});

/**
 * Adds event listeners for keyup events to stop the character's movement.
 */
document.addEventListener("keyup", (event) => {
  if (event.keyCode == 39) {
    keyboard.RIGHT = false;
  }

  if (event.keyCode == 70) {
    keyboard.F = false;
  }

  if (event.keyCode == 37) {
    keyboard.LEFT = false;
  }

  if (event.keyCode == 38) {
    keyboard.UP = false;
  }

  if (event.keyCode == 40) {
    keyboard.DOWN = false;
  }

  if (event.keyCode == 32) {
    keyboard.SPACE = false;
  }
});

/**
 * Stops all active intervals to pause the game.
 */
function stopAllIntervals() {
  window.gameIsPaused = true;
  window.gameIntervalIds.forEach(clearInterval);
  window.gameIntervalIds = [];
}

/**
 * Displays the rotation message for mobile devices if the screen is in portrait mode.
 */
function isMobileRotate() {
  let rotate = document.getElementById("rotate");
  if (window.innerWidth < window.innerHeight) {
    rotate.style.display = "flex";
  } else {
    rotate.style.display = "none";
  }
}

window.addEventListener("resize", isMobileRotate);
window.addEventListener("load", isMobileRotate);

/**
 * Checks if the current device is a mobile device based on the user agent.
 * @returns {boolean} True if the device is mobile, false otherwise.
 */
function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

/**
 * Changes the HUD layout based on whether the device is mobile or not.
 */
function changeHud() {
  if (isMobileDevice()) {
    window.isMobile = true;
  } else {
    window.isMobile = false;
  }
}

changeHud();

/**
 * Closes the info field.
 */
function closeInfo() {
  document.getElementById("info-field-wrapper").classList.add("d-none");
}

/**
 * Closes the impressum field.
 */
function closeImpressum() {
  document.getElementById("impressum-field").classList.add("d-none");
}

/**
 * Opens the info field.
 */
function openInfo() {
  document.getElementById("info-field-wrapper").classList.remove("d-none");
}

/**
 * Opens the impressum field.
 */
function openImpressum() {
  document.getElementById("impressum-field").classList.remove("d-none");
}
