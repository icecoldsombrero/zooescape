module Polymorphed.Entity {

  export enum AnimalSpeciesEnum { OWL, RAT }

  export class Animal extends Phaser.Sprite {
    game: Phaser.Game;
    body: Phaser.Physics.Arcade.Body;

    speciesList: Array<AnimalSpecies>;
    currentSpecies: AnimalSpeciesEnum;

    constructor(game: Phaser.Game, x: number, y: number, initialSpecies: AnimalSpeciesEnum) {
      super(game, x, y);
      this.game = game;
      this.speciesList = [ new Owl(), new Rat() ];
      this.currentSpecies = initialSpecies;

      this.game.physics.arcade.enableBody(this);
      this.body.collideWorldBounds = true;
      this.transformInto(this.currentSpecies);
      this.handleInput();
    }

    update() {
      this.checkBounce();
    }

    private handleInput() {
      this.inputEnabled = true;
      this.events.onInputDown.add(this.transformAnimal, this)
    }

    private transformAnimal() {
      this.currentSpecies = (this.currentSpecies + 1) % this.speciesList.length;
      this.transformInto(this.currentSpecies);
    }

    private transformInto(species: AnimalSpeciesEnum) {
      this.loadTexture(this.speciesList[species].spriteSheet, 0);
      this.animations.add('move');
      this.animations.play('move', 3, true);

      this.body.reset(this.x, this.y);
      let isFacingRight = this.scale.x > 0;
      this.speciesList[species].setPhysics(this, isFacingRight);

      if (!isFacingRight) {
        this.flipSprite();
      }

      if (this.game.rnd.frac() < 0.3) {
        let sound = this.game.add.audio(this.speciesList[this.currentSpecies].transformSound);
        sound.play();
      }
    }

    private checkBounce() {
      if (this.body.blocked.right === true || this.body.blocked.left === true) {
        this.flipSprite();
      }
    }

    public flipSprite() {
      this.anchor.setTo(0.5, 1.0);
      this.scale.x = -this.scale.x;
    }

    public playEscapeSound() {
      let sound = this.game.add.audio(this.speciesList[this.currentSpecies].escapeSound);
      sound.play();
    }

    public escape() {
      this.body.enable = false;
      this.inputEnabled = false;
      this.playEscapeSound();

      let exitTween = this.game.add.tween(this).to( { alpha: 0 }, 3000, Phaser.Easing.Linear.None, true, 0, 0, false);
      exitTween.onComplete.add(this.kill, this);
    }
  }
}
