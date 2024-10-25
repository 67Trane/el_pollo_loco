/**
 * Class representing the start screen of the game.
 * The start screen displays an image and a start button that allows the player to begin the game.
 * @extends DrawableObject
 */
class StartScreen extends DrawableObject {
  /**
   * The width of the start screen.
   * @type {number}
   */
  width = 720;

  /**
   * The height of the start screen.
   * @type {number}
   */
  height = 480;

  /**
   * The horizontal position of the start screen.
   * @type {number}
   */
  x = 0;

  /**
   * The vertical position of the start screen.
   * @type {number}
   */
  y = 0;

  /**
   * Flag to check if the game has started.
   * @type {boolean}
   */
  start = false;

  /**
   * Path to the title screen image.
   * @type {string}
   */
  titelscreen = "./img/titelscreen.png";

  /**
   * The image object for the title screen.
   * @type {HTMLImageElement}
   */
  img;

  /**
   * Button object to represent the start button.
   * @type {Button}
   */
  button;

  /**
   * The canvas element where the start screen is drawn.
   * @type {HTMLCanvasElement}
   */
  canvas;

  /**
   * The 2D rendering context for drawing on the canvas.
   * @type {CanvasRenderingContext2D}
   */
  ctx;

  /**
   * Creates an instance of StartScreen.
   * Initializes the start screen by loading the title image, setting up the button, and adding event listeners.
   */
  constructor() {
    super();
    this.loadImage(this.titelscreen);
    this.img.onload = () => {
      this.draw();
    };
    this.button = new Button(300, 200, 120, 100, "Start", true);
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.setupEventListeners();
  }

  /**
   * Draws the start screen and the start button on the canvas.
   */
  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    this.button.draw(this.ctx);
  }

  /**
   * Sets up event listeners for the start screen.
   * The click listener is triggered when the start button is clicked.
   */
  setupEventListeners() {
    this.clickListener(() => this.startGame(), 30, 30);
  }

  /**
   * Adds a click event listener to the canvas.
   * If the click occurs within the specified button area, the given function is executed.
   * 
   * @param {Function} func - The function to execute when the button is clicked.
   * @param {number} [offsetWidth=0] - The width offset for the clickable area.
   * @param {number} [offsetHeight=0] - The height offset for the clickable area.
   */
  clickListener(func, offsetWidth = 0, offsetHeight = 0) {
    this.canvas.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      let rect = this.canvas.getBoundingClientRect();
      let x = (event.clientX - rect.left) / rect.width * this.canvas.width;
      let y = (event.clientY - rect.top) / rect.height * this.canvas.height;
      if (
        x >= this.x + offsetWidth &&
        x <= this.x + this.width - offsetWidth &&
        y >= this.y + offsetHeight &&
        y <= this.y + this.height - offsetHeight
      ) {
        func();
      }
    });
  }

  /**
   * Starts the game by setting the `start` flag to true.
   */
  startGame() {
    this.start = true;
  }
}
