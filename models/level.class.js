/**
 * Class representing a level in the game.
 * A level consists of enemies, clouds, and background objects, as well as a defined end point.
 */
class Level {
    /**
     * Array of enemies present in the level.
     * @type {Enemy[]}
     */
    enemies;
  
    /**
     * Array of clouds used for the background in the level.
     * @type {Cloud[]}
     */
    clouds;
  
    /**
     * Array of background objects used to create the scenery for the level.
     * @type {BackgroundObject[]}
     */
    backgroundObjects;
  
    /**
     * The x-coordinate where the level ends.
     * @type {number}
     * @default 2200
     */
    level_end_x = 2200;
  
    /**
     * Creates an instance of Level.
     * 
     * @param {Enemy[]} enemies - The enemies that appear in the level.
     * @param {Cloud[]} clouds - The clouds that appear in the background of the level.
     * @param {BackgroundObject[]} backgroundObjects - The background objects that create the level's scenery.
     */
    constructor(enemies, clouds, backgroundObjects) {
      this.enemies = enemies;
      this.clouds = clouds;
      this.backgroundObjects = backgroundObjects;
    }
  }
  