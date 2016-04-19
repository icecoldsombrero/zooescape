module Polymorphed.State {
  export class Boot extends Phaser.State {
    preload() {
      this.load.image('sombrero-logo', 'assets/images/sombrero-logo.png');
    }

    create() {
      this.game.stage.backgroundColor = 0xFFFFFF;

      // Assign global settings here

      this.game.state.start('preload');
    }
  }
}
