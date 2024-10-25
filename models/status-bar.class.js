/**
 * Class representing a status bar in the game.
 * The status bar can represent health (HP), throwable items (THROW), or collected coins (COIN).
 * @extends MoveableObject
 */
class StatusBar extends MoveableObject {
  /**
   * Array of image paths for the health (HP) status bar.
   * @type {string[]}
   */
  IMAGES_HP = [
    "img/statusbar/0.png",
    "img/statusbar/20.png",
    "img/statusbar/40.png",
    "img/statusbar/60.png",
    "img/statusbar/80.png",
    "img/statusbar/100.png",
  ];

  /**
   * Array of image paths for the throwable items (THROW) status bar.
   * @type {string[]}
   */
  IMAGES_THROW = [
    'img/3_statusbar_bottle/blue/0.png',
    'img/3_statusbar_bottle/blue/20.png',
    'img/3_statusbar_bottle/blue/40.png',
    'img/3_statusbar_bottle/blue/60.png',
    'img/3_statusbar_bottle/blue/80.png',
    'img/3_statusbar_bottle/blue/100.png',
  ];

  /**
   * Array of image paths for the coin (COIN) status bar.
   * @type {string[]}
   */
  IMAGES_COIN = [
    'img/1_statusbar_coin/blue/0.png',
    'img/1_statusbar_coin/blue/20.png',
    'img/1_statusbar_coin/blue/40.png',
    'img/1_statusbar_coin/blue/60.png',
    'img/1_statusbar_coin/blue/80.png',
    'img/1_statusbar_coin/blue/100.png',
  ];

  /**
   * The current percentage of the status bar (for HP, THROW, or COIN).
   * @type {number}
   * @default 100
   */
  percentage = 100;

  /**
   * Array to store the images corresponding to the current type (HP, THROW, COIN).
   * @type {string[]}
   */
  images = [];

  /**
   * Creates an instance of StatusBar.
   * 
   * @param {string} [type="HP"] - The type of the status bar (HP, THROW, or COIN).
   * @param {number} [y=0] - The vertical position of the status bar.
   */
  constructor(type = "HP", y = 0) {
    super();
    this.x = 20;
    this.y = y;
    this.width = 200;
    this.height = 60;

    // Load the images based on the type of status bar
    this.loadImagesForType(type);
    this.setPercentage(100); // Set the initial percentage image
  }

  /**
   * Loads the appropriate images based on the type of status bar.
   * 
   * @param {string} type - The type of the status bar (HP, THROW, COIN).
   */
  loadImagesForType(type) {
    if (type === "HP") {
      this.images = this.IMAGES_HP;
    } else if (type === "THROW") {
      this.images = this.IMAGES_THROW;
    } else if (type === "COIN") {
      this.images = this.IMAGES_COIN;
      this.percentage = 0; // Set percentage to 0 for COIN status bar initially
    }

    this.loadImages(this.images); // Load the selected images
  }

  /**
   * Updates the displayed image based on the percentage.
   * 
   * @param {number} percentage - The new percentage value for the status bar.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.images[this.resolveImageIndex()]; // Select the image based on percentage
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index of the image to display based on the current percentage.
   * 
   * @returns {number} The index of the image to display.
   */
  resolveImageIndex() {
    if (this.percentage >= 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
