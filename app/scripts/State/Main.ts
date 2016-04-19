import Entity = Polymorphed.Entity;

module Polymorphed.State {
  export class Main extends Phaser.State {
    game: Phaser.Game;
    background: Phaser.Sprite;
    animals: Phaser.Group;
    obstacles: Phaser.Group;
    exit: Phaser.Group;
    spinningObstacles: Phaser.Group;
    score: number;
    counter: number;
    counterText: Phaser.Text;
    timer: Phaser.Timer;

    create() {
      // Initialise physics
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      this.background = this.add.sprite(0, 0, 'background');
      this.background.tint = 0x888888;

      let soundtrack = this.add.audio('soundtrack');
      soundtrack.play('', 0, 0.5, true);

      // TODO: Set up obstacles
      this.animals = this.game.add.group();
      let animalList = [
        new Polymorphed.Entity.Animal(this.game, 20, 20, Entity.AnimalSpeciesEnum.OWL),
        new Polymorphed.Entity.Animal(this.game, 22, 40, Entity.AnimalSpeciesEnum.OWL),
        new Polymorphed.Entity.Animal(this.game, 24, 60, Entity.AnimalSpeciesEnum.RAT),
        new Polymorphed.Entity.Animal(this.game, 26, 80, Entity.AnimalSpeciesEnum.RAT),
        new Polymorphed.Entity.Animal(this.game, 28, 100, Entity.AnimalSpeciesEnum.OWL),
        new Polymorphed.Entity.Animal(this.game, 30, 120, Entity.AnimalSpeciesEnum.RAT),
      ];

      for (var animal of animalList) {
        this.animals.add(animal);
      }

      this.score = 0;

      this.counter = 60;
      this.timer = this.game.time.create(false);
      this.timer.loop(1000, this.updateCounter, this);
      this.timer.start();
      this.counterText = this.game.add.text(920, 0, this.counter.toString(), { font: "65px Arial", fill: "#ff0044", align: "center" });

      this.obstacles = this.game.add.group();
      let obstacleA = new Polymorphed.Entity.Obstacle(this.game, 150, 0, 570, 30, "obstacle1");
      let obstacleB = new Polymorphed.Entity.Obstacle(this.game, 370, 300, 300, 70, "obstacle2");
      let obstacleC = new Polymorphed.Entity.Obstacle(this.game, 370, 20, 150, 70, "obstacle1");
      let obstacleD = new Polymorphed.Entity.Obstacle(this.game, 550, 400, 200, 30, "obstacle2");
      let obstacleE = new Polymorphed.Entity.Obstacle(this.game, 550, 400, 30, 200, "obstacle1");
      let obstacleF = new Polymorphed.Entity.Obstacle(this.game, 870, 130, 400, 30, "obstacle2");
      let obstacleG = new Polymorphed.Entity.Obstacle(this.game, 700, 500, 30, 180, "obstacle1");
      let obstacleH = new Polymorphed.Entity.Obstacle(this.game, 870, 250, 30, 180, "obstacle2");

      this.obstacles.add(obstacleA);
      this.obstacles.add(obstacleB);
      this.obstacles.add(obstacleC);
      this.obstacles.add(obstacleD);
      this.obstacles.add(obstacleE);
      this.obstacles.add(obstacleF);
      this.obstacles.add(obstacleG);
      this.obstacles.add(obstacleH);

      this.spinningObstacles = this.game.add.group();

      // Not sure this needs to be an Obstacle..?
      let spinningObstacleA = new Polymorphed.Entity.Obstacle(this.game, 600, 100, 150, 30, "obstacle1");
      spinningObstacleA.body.syncBounds = true;
      this.spinningObstacles.add(spinningObstacleA);
      this.spinningObstacles.x = 700;
      this.spinningObstacles.y = 150;
      this.spinningObstacles.pivot.x = 600;
      this.spinningObstacles.pivot.y = 100;

      // TODO: Add traps

      // TODO: Add Entry / Exit points (can they spawn/remove the animals from the game?)
      this.exit = this.game.add.group();
      this.exit.add(new Polymorphed.Entity.Exit(this.game, 950, 550));
      this.exit.add(new Polymorphed.Entity.Exit(this.game, 950, 150));
    }

    update() {
      this.game.physics.arcade.collide(this.animals, this.obstacles, this.animalCollidesWithObstacle, null, this);
      this.game.physics.arcade.overlap(this.animals, this.exit, this.animalOverlapsWithExit, null, this);
      this.game.physics.arcade.collide(this.animals, this.spinningObstacles, this.animalCollidesWithObstacle, null, this);
    }

    private animalCollidesWithObstacle(animal: Entity.Animal, obstacle: Entity.Obstacle) {
      if (animal.body.touching.left || animal.body.touching.right) {
        animal.flipSprite();
      }

      // NO GOOD VERY BAD HACK TO STOP OWL FLYING THROUGH WALL
      animal.body.syncBounds = true;
    }

    private animalOverlapsWithExit(animal: Entity.Animal, exit: Entity.Exit) {
      animal.escape();
      this.score += 1;

      if (this.score === this.animals.length) {
        this.timer.pause();
        let text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "YAY! THE ANIMALS ESCAPED", { font: "65px Arial", fill: "#ff0044", align: "center", boundsAlignH: "center", wordWrap: true, wordWrapWidth: 400 });
        text.anchor.set(0.5);
      }
    }

    private updateCounter() {
      this.counter -= 1;
      this.counterText.setText(this.counter.toString());
      if (this.counter === 0) {
        this.timer.pause();
        this.animals.destroy();
        let text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "UH OH THE ANIMALS DIDN'T MAKE IT :(", { font: "65px Arial", fill: "#ff0044", align: "center", boundsAlignH: "center", wordWrap: true, wordWrapWidth: 400 });
        text.anchor.set(0.5);
      }
      this.spinningObstacles.destroy();
      if (this.counter % 2 === 0) {
//        this.spinningObstacles.add(new Polymorphed.Entity.Obstacle(this.game, 600, 100, 150, 30));
      }
//      this.spinningObstacles.add(new Polymorphed.Entity.Obstacle(this.game, 600, 100, 30, 150));
    }
  }
}
