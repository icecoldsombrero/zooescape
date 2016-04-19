/// <reference path="../vendor/phaser-official/typescript/phaser.d.ts"/>

/// <reference path='Entity/AnimalSpecies.ts'/>
/// <reference path='Entity/Owl.ts'/>
/// <reference path='Entity/Rat.ts'/>
/// <reference path='Entity/Obstacle.ts'/>
/// <reference path='Entity/Animal.ts'/>

/// <reference path='Entity/Exit.ts'/>

/// <reference path='State/Boot.ts'/>
/// <reference path='State/Preload.ts'/>
/// <reference path='State/Menu.ts'/>
/// <reference path='State/Main.ts'/>
/// <reference path='State/Tutorial.ts'/>

module Polymorphed {
  export class Game extends Phaser.Game {
    constructor() {
      super(1000, 600, Phaser.AUTO, 'game-div');

      this.state.add('boot', State.Boot);
      this.state.add('preload', State.Preload);
      this.state.add('menu', State.Menu);
      this.state.add('tutorial', State.Tutorial);
      this.state.add('main', State.Main);

      this.state.start('boot');
    }
  }
}

window.onload = () => {
  var game = new Polymorphed.Game();
}
