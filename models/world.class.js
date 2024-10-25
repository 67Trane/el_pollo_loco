/**
 * Background music audio element.
 * @type {HTMLAudioElement}
 */
backgroundMusic = new Audio("./audio/background_music.mp3");

/**
 * Class representing the game world.
 * Manages the game loop, drawing, and interactions between game objects.
 */
class World {
  /**
   * The main character of the game.
   * @type {Character}
   */
  character = new Character();

  /**
   * The current level of the game.
   * @type {Level}
   */
  level;

  /**
   * The canvas element where the game is drawn.
   * @type {HTMLCanvasElement}
   */
  canvas;

  /**
   * The drawing context of the canvas.
   * @type {CanvasRenderingContext2D}
   */
  ctx;

  /**
   * Indicates if the game is being played on a mobile device.
   * @type {boolean}
   */
  isMobile = window.isMobile;

  /**
   * Sound effect for bottle shattering.
   * @type {HTMLAudioElement}
   */
  bottleSound = new Audio("./audio/bottle-shatter.mp3");

  /**
   * Keyboard input handler.
   * @type {Keyboard}
   */
  keyboard;

  /**
   * The x-coordinate offset for the camera.
   * @type {number}
   */
  camera_x = 0;

  /**
   * The game over screen object.
   * @type {GameOver}
   */
  gameOver = new GameOver();

  /**
   * Status bar for character's health.
   * @type {StatusBar}
   */
  statusBar = new StatusBar();

  /**
   * Status bar for throwable items.
   * @type {StatusBar}
   */
  bottleBar = new StatusBar("THROW", 50);

  /**
   * Status bar for collected coins.
   * @type {StatusBar}
   */
  coinBar = new StatusBar("COIN", 100);

  /**
   * Array of all coins in the game.
   * @type {Coin[]}
   */
  allCoins = [];

  /**
   * Array of all throwable objects currently in the game.
   * @type {ThrowableObject[]}
   */
  throwableObject = [];

  /**
   * Array of all collectible bottles in the game.
   * @type {Bottle[]}
   */
  collectibleBottles = [];

  /**
   * The ground level y-coordinate.
   * @type {number}
   */
  groundlevel = 400;

  /**
   * Array of all explosion effects currently in the game.
   * @type {Explosion[]}
   */
  explosions = [];

  /**
   * Indicates if the character can throw an object.
   * @type {boolean}
   */
  canThrow = true;

  /**
   * Creates an instance of World.
   * Initializes the level, canvas, and sets up the game.
   *
   * @param {HTMLCanvasElement} canvas - The canvas element where the game is drawn.
   * @param {Keyboard} keyboard - The keyboard input handler.
   */
  constructor(canvas, keyboard) {
    this.checkWinningScreen();
    this.level = new Level(
      [
        new Skull(),
        new Skull(),
        new Skull(),
        new Skull(),
        new Skull(),
        new Skull(),
        new Skull(),
        new Skull(),
        new Endboss(),
      ],
      [new Cloud(), new Cloud(), new Cloud(), new Cloud()],
      [
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
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.addCollectibleBottleToMap();
    this.addCollectibleCoinToMap();
    this.pushAllSounds();
    loaded = true;
  }

  /**
   * Adds all sounds to the global sound array.
   */
  pushAllSounds() {
    allSounds.push(backgroundMusic);
    allSounds.push(this.bottleSound);
  }

  /**
   * Plays the background music if not muted.
   */
  playBackgroundMusic() {
    backgroundMusic.play();
    backgroundMusic.volume = 0.1;
    backgroundMusic.loop = true;
  }

  /**
   * Sets the world reference for the character and enemies.
   */
  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
      enemy.initialize();
    });
  }

  /**
   * Starts the game loop and various intervals for game mechanics.
   */
  run() {
    setInterval(() => {
      if (!allSoundsMute) {
        this.playBackgroundMusic();
      }
    }, 500);

    setInterval(() => {
      this.checkCollisions();
    }, 50);

    setInterval(() => {
      this.checkThrowObjects();
    }, 150);

    setInterval(() => {
      this.checkItemCollection();
    }, 50);

    setInterval(() => {
      this.throwHitsSomething();
    }, 30);

    setInterval(() => {
      this.checkExplosions();
    }, 30);
  }

  /**
   * Checks if the character is attempting to throw an object.
   * Handles the cooldown between throws.
   */
  checkThrowObjects() {
    if (this.keyboard.F) {
      if (this.canThrow) {
        this.throwObject();
        this.canThrow = false;
        setTimeout(() => {
          this.canThrow = true;
        }, 500);
      }
    }
  }

  /**
   * Creates a new throwable object and adds it to the game.
   */
  throwObject() {
    if (this.character.thorws > 0) {
      this.character.thorws -= 10;
      this.bottleBar.setPercentage(this.character.thorws);
      let throwbottle = new ThrowableObject(this.character.x + 100, this.character.y);
      this.throwableObject.push(throwbottle);
    }
  }

  /**
   * Checks if any explosions have finished and removes them.
   */
  checkExplosions() {
    this.explosions.forEach((explosion, i) => {
      if (!allSoundsMute) {
        this.bottleSound.play();
      }
      if (explosion.done == true) {
        this.explosions.splice(i, 1);
      }
    });
  }

  /**
   * Checks if throwable objects have hit the ground or an enemy.
   */
  throwHitsSomething() {
    this.throwableObject.forEach((throwable, index) => {
      if (throwable.y > this.groundlevel) {
        this.objectExplodes(throwable);
        this.throwableObject.splice(index, 1);
      }
    });
  }

  /**
   * Creates an explosion effect at the location of the throwable object.
   * @param {ThrowableObject} throwable - The throwable object that has exploded.
   */
  objectExplodes(throwable) {
    let explosion = new Explosion(throwable.x - 130, throwable.y - 150);
    this.explosions.push(explosion);
    this.addObjectsToMap(this.explosions);
  }

  /**
   * Checks for item collection, such as coins and bottles.
   */
  checkItemCollection() {
    this.checkCoins();
    this.checkBottles();
  }

  /**
   * Checks if the character has collected any bottles.
   */
  checkBottles() {
    this.bottleBar.setPercentage(this.character.thorws);
    this.collectibleBottles.some((bottle, index) => {
      if (this.collectItem(bottle)) {
        this.collectibleBottles.splice(index, 1);
        if (this.character.thorws < 100) {
          this.character.thorws += 10;
        }
      }
    });
  }

  /**
   * Checks if the character has collected any coins.
   */
  checkCoins() {
    let collectCoinSound = new Audio("./audio/collect-coin.mp3");
    this.coinBar.setPercentage(this.character.coins);
    this.allCoins.some((coin, index) => {
      if (this.collectItem(coin)) {
        this.allCoins.splice(index, 1);
        this.character.coins += 20;
        if (!allSoundsMute) {
          collectCoinSound.play();
        }
        this.coinBar.setPercentage(this.character.coins);
      }
    });
  }

  /**
   * Checks for collisions between the character and enemies.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy, index) => {
      this.throwHit(enemy);
      if (enemy.isDead == true) {
        this.level.enemies.splice(index, 1);
      }
      this.playerJumpedOnEnemie(enemy);
      this.playerCollidingWithEnemie(enemy);
    });
  }

  /**
   * Checks if the character has jumped on an enemy.
   * @param {MoveableObject} enemy - The enemy to check against.
   * @returns {boolean} True if the character has jumped on the enemy.
   */
  playerJumpedOnEnemie(enemy) {
    if (this.character.isJumpingOn(enemy)) {
      this.character.jump();
      enemy.skullIsDying();
      clearInterval(enemy.moveId);
      clearInterval(enemy.idleId);
      return true;
    }
  }

  /**
   * Checks if the character is colliding with an enemy.
   * @param {MoveableObject} enemy - The enemy to check against.
   * @returns {boolean} True if the character is colliding with the enemy.
   */
  playerCollidingWithEnemie(enemy) {
    if (this.character.isColliding(enemy)) {
      this.character.hit();
      this.character.knockBack();
      this.statusBar.setPercentage(this.character.energy);
      return true;
    }
  }

  /**
   * Checks if a thrown object has hit an enemy.
   * @param {MoveableObject} enemy - The enemy to check against.
   */
  throwHit(enemy) {
    if (this.throwableObject.length > 0) {
      this.throwableObject.forEach((bottle, index) => {
        if (bottle.collisionThrowable(enemy)) {
          this.throwableObject.splice(index, 1);
          this.objectExplodes(bottle);
          enemy.hp -= 10;
          this.updateEndbossHealthbar(enemy);
          this.checkIfEnemieIsDead(enemy);
        }
      });
    }
  }

  /**
   * Updates the health bar of the end boss.
   * @param {Endboss} enemy - The end boss whose health bar is updated.
   */
  updateEndbossHealthbar(enemy) {
    if (enemy instanceof Endboss) {
      enemy.healthbar.setPercentage(enemy.hp);
    }
  }

  /**
   * Checks if an enemy is dead and handles their death.
   * @param {MoveableObject} enemy - The enemy to check.
   */
  checkIfEnemieIsDead(enemy) {
    if (enemy.hp <= 0) {
      this.endbossDead(enemy);
      this.killEnemie(enemy);
    }
  }

  /**
   * Handles the end game scenario when the end boss is defeated.
   * @param {Endboss} enemy - The end boss that has been defeated.
   */
  endbossDead(enemy) {
    if (enemy instanceof Endboss) {
      setTimeout(() => {
        stopAllIntervals();
        this.winningscreen();
      }, 2000);
    }
  }

  /**
   * Kills an enemy and stops their animations.
   * @param {MoveableObject} enemy - The enemy to kill.
   */
  killEnemie(enemy) {
    enemy.skullIsDying();
    clearInterval(enemy.moveId);
    clearInterval(enemy.idleId);
  }

  /**
   * Hides the winning screen at the start of the game.
   */
  checkWinningScreen() {
    let win = document.getElementById("winning");
    win.classList.add("d-none");
  }

  /**
   * Displays the winning screen when the game is won.
   */
  winningscreen() {
    let win = document.getElementById("winning");
    win.classList.remove("d-none");
  }

  /**
   * Applies the parallax effect to the background objects.
   */
  parallaxEffect() {
    // Hintergrundobjekte mit Parallaxeneffekt zeichnen
    this.level.backgroundObjects.forEach((backgroundObject) => {
      this.ctx.save();
      let parallaxTranslation = this.camera_x * backgroundObject.parallaxFactor;
      this.ctx.translate(parallaxTranslation, 0);
      this.addToMap(backgroundObject);
      this.ctx.restore();
    });
  }

  /**
   * Main draw function that updates the canvas each frame.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.parallaxEffect();
    this.ctx.translate(this.camera_x, 0);
    this.placeInWorld();
    this.ctx.translate(-this.camera_x, 0);
    this.runWithCamera();

    let self = this;
    requestAnimationFrame(() => {
      self.draw();
    });
  }

  /**
   * Places game objects into the world by drawing them.
   */
  placeInWorld() {
    this.addToMap(this.character);
    this.addObjectsToMap(this.collectibleBottles);
    this.addObjectsToMap(this.allCoins);
    this.addObjectsToMap(this.explosions);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObject);
  }

  /**
   * Draws elements that should stay in position relative to the camera.
   */
  runWithCamera() {
    this.characterDeadGameOver();
    this.addToMap(this.statusBar);
    this.addToMap(this.bottleBar);
    this.addToMap(this.coinBar);
  }

  /**
   * Checks if the character is dead and displays the game over screen.
   */
  characterDeadGameOver() {
    if (this.character.energy <= 0) {
      this.addToMap(this.gameOver);
      this.gameOver.init();
    }
  }

  /**
   * Adds collectible bottles to the game at random positions.
   */
  addCollectibleBottleToMap() {
    let bottleAmount = 10;
    for (let i = 0; i < bottleAmount; i++) {
      let random = Math.random() * 2300 + 200;
      let collectBottle = new Bottle(random, 400);
      this.collectibleBottles.push(collectBottle);
    }
  }

  /**
   * Adds collectible coins to the game at random positions.
   */
  addCollectibleCoinToMap() {
    let coinsAmount = 10;
    for (let i = 0; i < coinsAmount; i++) {
      let random = Math.random() * 2300 + 500;
      let coin = new Coin(random, 230);
      this.allCoins.push(coin);
    }
  }

  /**
   * Checks if the character has collected an item.
   * @param {Collectible} mo - The collectible object to check.
   * @returns {boolean} True if the character has collected the item.
   */
  collectItem(mo) {
    let tolerance = 15;
    return (
      this.character.x + tolerance < mo.x + mo.width - tolerance &&
      this.character.x + this.character.width - tolerance > mo.x + tolerance &&
      this.character.y + tolerance < mo.y + mo.height - tolerance &&
      this.character.y + this.character.height - tolerance > mo.y + tolerance
    );
  }

  /**
   * Adds an array of objects to the map by drawing them.
   * @param {DrawableObject[]} objects - The array of objects to add.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a single object to the map by drawing it.
   * Handles flipping the image if necessary.
   * @param {DrawableObject} mo - The object to add.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    //mo.drawFrame(this.ctx); //als kommentar deklarieren um rahmen wegzumachen
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips the image of an object horizontally.
   * @param {DrawableObject} mo - The object whose image is to be flipped.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the image of an object after flipping.
   * @param {DrawableObject} mo - The object whose image is to be restored.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
