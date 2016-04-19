module Polymorphed.Entity {
  export class Obstacle extends Phaser.Sprite {
    game: Phaser.Game;
    body: Phaser.Physics.Arcade.Body;

    constructor(game: Phaser.Game, x: number, y: number, h: number, w: number, texture: string) {
      super(game, x, y);
      let bitmap = this.game.make.bitmapData(w, h, texture);

      this.game = game;

      bitmap.ctx.fillStyle = '#AAB6C1';
      bitmap.ctx.fillRect(0, 0, w, h);
      super(game, x, y, bitmap);

      this.game.physics.arcade.enableBody(this);
      this.body.immovable = true;
    }
  }
}
