module Polymorphed.Entity {
  export class Owl implements AnimalSpecies {
    spriteSheet: string;
    transformSound: string;
    escapeSound: string;

    constructor() {
      this.spriteSheet = "owl-spritesheet";
      this.transformSound = "owl-hoot";
      this.escapeSound = "owl-escape";
    }

    setPhysics(sprite: Polymorphed.Entity.Animal, isPointingRight: boolean) {
      // NO GOOD VERY BAD HACK TO STOP OWL FLYING THROUGH WALL
      sprite.body.syncBounds = false;

      sprite.scale.set(0.8);
      if (sprite.body.embedded) {
        sprite.body.x = sprite.body.x - 1000;
      }
      sprite.body.velocity.x = isPointingRight ? 100 : -100;
      sprite.body.gravity.y = 0;
      sprite.body.velocity.y = -200;
      sprite.body.bounce.set(1);
    }
  }
}
