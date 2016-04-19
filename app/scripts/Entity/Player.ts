module Polymorphed.Entity {
  export enum PlayerAnimal { OWL, RAT };

  export class Player extends Phaser.Sprite {
    game: Phaser.Game;
    playerAnimal: PlayerAnimal;
    UP_ARROW: Phaser.Key;
    DOWN_ARROW: Phaser.Key;
    owlSquare: Phaser.BitmapData;
    ratSquare: Phaser.BitmapData;

    constructor(game: Phaser.Game, x: number, y: number) {
      this.game = game;

      this.ratSquare = this.game.make.bitmapData(32, 32);
      this.ratSquare.ctx.fillStyle = '#ff0000';
      this.ratSquare.ctx.fillRect(0, 0, 32, 32);

      this.owlSquare = this.game.make.bitmapData(32, 32);
      this.owlSquare.ctx.fillStyle = '#00ff00';
      this.owlSquare.ctx.fillRect(0, 0, 32, 32);

      this.playerAnimal = PlayerAnimal.OWL;

      this.handleInput();
      super(game, x, y, this.owlSquare);
      this.game.physics.arcade.enable(this);
      this.body.velocity.x = 100;
    }

    update() {
      this.game.debug.text(this.x.toString() + ", " + this.y.toString(), 100, 100, "red");
      if (this.playerAnimal == PlayerAnimal.OWL)  {
        this.body.velocity.y = -200;
      }
      if (this.playerAnimal == PlayerAnimal.RAT) {
        this.body.velocity.y = 200;
      }
    }

    private handleInput() {
      this.UP_ARROW = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
      this.UP_ARROW.onDown.add(this.becomeOwl, this);

      this.DOWN_ARROW = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
      this.DOWN_ARROW.onDown.add(this.becomeRat, this);
    }

    private becomeOwl() {
      this.playerAnimal = PlayerAnimal.OWL;
      this.loadTexture(this.owlSquare);
    }

    private becomeRat() {
      this.playerAnimal = PlayerAnimal.RAT;
      this.loadTexture(this.ratSquare);
    }
  }
}
