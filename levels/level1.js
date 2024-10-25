/**
 * Creates a new instance of the level.
 * 
 * @type {Level}
 * @param {Enemy[]} enemies - Array of enemies for the level, including Skulls and Endboss.
 * @param {Cloud[]} clouds - Array of cloud objects for the background.
 * @param {BackgroundObject[]} backgroundObjects - Array of background objects that make up the game's parallax background.
 */
const level1 = new Level(
  [new Skull(), new Skull(), new Endboss()], // Array of enemies
  [new Cloud(), new Cloud(), new Cloud(), new Cloud()], // Array of clouds
  [
    // Array of background layers for the level
    new BackgroundObject("img/background/PNG/3_game_background/layers/1.png", -719, 1),
    new BackgroundObject("img/background/PNG/3_game_background/layers/1.png", 0, 0.1),
    new BackgroundObject("img/background/PNG/3_game_background/layers/2.png", 0, 0.1),
    new BackgroundObject("img/background/PNG/3_game_background/layers/3.png", 0, 0.1),
    new BackgroundObject("img/background/PNG/3_game_background/layers/4.png", 0, 0.1),
    new BackgroundObject("img/background/PNG/3_game_background/layers/5.png", 0, 0.1),
    new BackgroundObject("img/background/PNG/3_game_background/layers/6.png", 0, 0.1),
    new BackgroundObject("img/background/PNG/3_game_background/layers/7.png", 0, 0.1),
    new BackgroundObject("img/background/PNG/3_game_background/layers/8.png", 0, 1),
    new BackgroundObject("img/background/PNG/3_game_background/layers/8.png", -719, 1),
    new BackgroundObject("img/background/PNG/3_game_background/layers/8.png", 720, 1),
    new BackgroundObject("img/background/PNG/3_game_background/layers/8.png", 720 * 2, 1),
    new BackgroundObject("img/background/PNG/3_game_background/layers/8.png", 720 * 3, 1),
  ]
);
