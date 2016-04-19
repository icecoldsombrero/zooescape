module Polymorphed.State {
  export class Menu extends Phaser.State {
    background: Phaser.Sprite;

    create() {
      this.background = this.add.sprite(80, 0, 'sombrero-logo');
      this.input.onDown.addOnce(() => {
        this.game.state.start('tutorial');
      });
    }
  }
}
