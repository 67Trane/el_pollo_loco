/**
 * Class representing a background object in the game.
 * The background objects are part of the parallax effect in the game.
 * @extends MoveableObject
 */
class BackgroundObject extends MoveableObject {
    /**
     * The width of the background object.
     * @type {number}
     */
    width = 1000;
  
    /**
     * The height of the background object.
     * @type {number}
     */
    height = 480;
  
    /**
     * Creates an instance of BackgroundObject.
     * 
     * @param {string} imagePath - The path to the image of the background object.
     * @param {number} x - The initial x-coordinate position of the background object.
     * @param {number} [parallaxFactor=1] - The parallax factor to control the scrolling speed of the background object. A lower value results in slower movement (closer to the foreground), a higher value results in faster movement (closer to the background).
     */
    constructor(imagePath, x, parallaxFactor = 1) {
      super().loadImage(imagePath);
      this.x = x;
      this.y = 480 - this.height; // Y-position to place the background at the bottom of the canvas.
      this.parallaxFactor = parallaxFactor;
    }
  }
  