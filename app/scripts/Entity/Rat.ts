module Polymorphed.Entity {
  export class Rat implements AnimalSpecies {
    spriteSheet: string;
    transformSound: string;
    escapeSound: string;

    constructor() {
      this.spriteSheet = "rat-spritesheet";
      this.transformSound = "rat-squeak";
      this.escapeSound = "rat-escape";
    }

    setPhysics(sprite: Polymorphed.Entity.Animal, isFacingRight: boolean){
      sprite.scale.set(0.3);
      sprite.body.syncBounds = true;

      sprite.body.gravity.y = 400;
      sprite.body.velocity.x = isFacingRight ? 100 : -100;
      sprite.body.bounce.y = 0;
      sprite.body.bounce.x = 1;
    }
  }
}
