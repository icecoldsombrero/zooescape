module Polymorphed.State {
  export class Preload extends Phaser.State {
    private preloadBar: Phaser.Sprite;

    preload() {
      this.preloadBar = this.add.sprite(0, 148, 'sombrero-logo');
      this.load.setPreloadSprite(this.preloadBar);
      // Animal sprites
      this.load.spritesheet('owl-spritesheet', 'assets/images/owl-spritesheet.png', 142, 50);
      this.load.spritesheet('rat-spritesheet', 'assets/images/rat-spritesheet.png', 158, 50);

      this.load.image('background', 'assets/images/zooBackground.png');
      this.load.image('obstacle1', 'assets/images/obstacleB.png');
      this.load.image('obstacle2', 'assets/images/obstacleC.png');

      // Music
      this.load.audio('soundtrack', this.loadAllSoundFormats('soundtrack'));

      // Sound effects
      this.load.audio('owl-escape', this.loadAllSoundFormats('owl-escape'));
      this.load.audio('owl-hoot', this.loadAllSoundFormats('owl-hoot'));
      this.load.audio('rat-escape', this.loadAllSoundFormats('rat-escape'));
      this.load.audio('rat-squeak', this.loadAllSoundFormats('rat-squeak'));
    }

    create() {
      this.game.state.start('menu');
    }

    private loadAllSoundFormats(fileName: string): Array<string>  {
      let directory = 'assets/sounds/';

      return [directory + fileName + '.mp3',
              directory + fileName + '.ogg',
              directory + fileName + '.wav'];
    }
  }
}
