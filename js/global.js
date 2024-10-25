/**
 * Array to store all active interval IDs.
 * @type {number[]}
 */
window.gameIntervalIds = [];

/**
 * Flag indicating if the device is mobile.
 * @type {boolean}
 */
isMobile = false;

/**
 * Flag indicating if the game is paused.
 * @type {boolean}
 */
gameIsPaused = false;

/**
 * Flag to mute or unmute all sounds.
 * @type {boolean}
 */
allSoundsMute = true;

/**
 * Array to store all sound objects used in the game.
 * @type {HTMLAudioElement[]}
 */
allSounds = [];

/**
 * Flag indicating if the game has started.
 * @type {boolean}
 */
gameStart = false;

/**
 * Flag indicating if all game assets have been loaded.
 * @type {boolean}
 */
loaded = false;

/**
 * Counter for the number of images that have been loaded.
 * @type {number}
 */
imagesLoaded = 0;

/**
 * Total number of images to be loaded.
 * @type {number}
 */
totalImages = 0;
