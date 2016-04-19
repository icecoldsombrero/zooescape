module Polymorphed.Entity {
  export class Exit extends Phaser.Sprite {

    game: Phaser.Game;
    placeholderImage: Phaser.BitmapData

    constructor(game, x, y) {
      this.game = game;

      this.placeholderImage = this.game.make.bitmapData(10, 20);
      this.placeholderImage.ctx.fillStyle = '#ff0000';
      this.placeholderImage.ctx.fillRect(0, 0, 32, 32);
      super(game, x, y, this.placeholderImage);

      this.game.physics.arcade.enableBody(this);
    }
  }
}
