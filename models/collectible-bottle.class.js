/**
 * Class representing a bottle (Molotov cocktail) in the game.
 * Bottles are collectible objects that the character can pick up.
 * @extends Collectible
 */
class Bottle extends Collectible {
  /**
   * The horizontal position of the bottle.
   * @type {number}
   */
  x;

  /**
   * The vertical position of the bottle.
   * @type {number}
   */
  y;

  /**
   * The width of the bottle.
   * @type {number}
   */
  width = 20;

  /**
   * The height of the bottle.
   * @type {number}
   */
  height = 30;

  /**
   * Creates an instance of Bottle.
   * 
   * @param {number} x - The x-coordinate where the bottle will be placed.
   * @param {number} y - The y-coordinate where the bottle will be placed.
   */
  constructor(x, y) {
    super();
    this.loadImage("img/explosiv/PNG_2048x1536/Weapons/weapon_14_molotov_cocktail.png");
    this.x = x;
    this.y = y;
  }
}
