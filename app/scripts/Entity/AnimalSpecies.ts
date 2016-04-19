module Polymorphed.Entity {
  export interface AnimalSpecies {
    spriteSheet: string;
    transformSound: string;
    escapeSound: string;

    setPhysics(animalSprite: Polymorphed.Entity.Animal, isFacingRight: boolean);
  }
}
