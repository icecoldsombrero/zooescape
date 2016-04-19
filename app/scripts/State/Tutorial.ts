module Polymorphed.State {
  export class Tutorial extends Phaser.State {
    background: Phaser.Sprite;
    text: Phaser.Text;

    create() {
      this.stage.backgroundColor = 0x000000;
      this.text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Click the animals to transform them and guide them to the red exits! You have 60 seconds. Good luck!", { font: "40px Georgia", fill: "#aa0000", align: "center", boundsAlignH: "center", wordWrap: true, wordWrapWidth: 400 });
      this.text.anchor.set(0.5);
      this.text.anchor.set(0.5);

      this.input.onDown.addOnce(() => {
        this.game.state.start('main');
      });
    }
  }
}
