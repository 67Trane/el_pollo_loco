/**
 * Class representing a throwable object in the game, such as a Molotov cocktail.
 * The object can be thrown and follows a projectile motion.
 * @extends MoveableObject
 */
class ThrowableObject extends MoveableObject {

    /**
     * Creates an instance of ThrowableObject.
     * 
     * @param {number} x - The horizontal position where the throwable object starts.
     * @param {number} y - The vertical position where the throwable object starts.
     */
    constructor(x, y) {
      super().loadImage("img/explosiv/PNG_2048x1536/Weapons/weapon_14_molotov_cocktail.png");
      this.x = x;
      this.y = y;
      this.throw();
      this.height = 40;
      this.width = 20;
    }
  
    /**
     * Applies the throwing motion to the object.
     * The object is thrown with an initial vertical speed and moves horizontally.
     */
    throw() {
      this.speedY = 20; // Initial vertical speed
      this.applyGravity(); // Apply gravity to the object
      this.intervalHelper(() => {
        this.x += 10; // Move the object horizontally
      }, 25);
    }
  
    /**
     * Checks if the throwable object collides with another moveable object.
     * 
     * @param {MoveableObject} mo - The moveable object to check for collision.
     * @returns {boolean} True if the throwable object collides with the other object.
     */
    collisionThrowable(mo) {
      let tolerance = 10;
      return  this.x + this.width > mo.x &&
              this.x + this.width < mo.x + mo.width &&
              this.y + this.height > mo.y + tolerance;
    }
  }
  