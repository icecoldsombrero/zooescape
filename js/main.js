var Polymorphed;
(function (Polymorphed) {
    var Entity;
    (function (Entity) {
        var Owl = (function () {
            function Owl() {
                this.spriteSheet = "owl-spritesheet";
                this.transformSound = "owl-hoot";
                this.escapeSound = "owl-escape";
            }
            Owl.prototype.setPhysics = function (sprite, isPointingRight) {
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
            };
            return Owl;
        })();
        Entity.Owl = Owl;
    })(Entity = Polymorphed.Entity || (Polymorphed.Entity = {}));
})(Polymorphed || (Polymorphed = {}));
var Polymorphed;
(function (Polymorphed) {
    var Entity;
    (function (Entity) {
        var Rat = (function () {
            function Rat() {
                this.spriteSheet = "rat-spritesheet";
                this.transformSound = "rat-squeak";
                this.escapeSound = "rat-escape";
            }
            Rat.prototype.setPhysics = function (sprite, isFacingRight) {
                sprite.scale.set(0.3);
                sprite.body.syncBounds = true;
                sprite.body.gravity.y = 400;
                sprite.body.velocity.x = isFacingRight ? 100 : -100;
                sprite.body.bounce.y = 0;
                sprite.body.bounce.x = 1;
            };
            return Rat;
        })();
        Entity.Rat = Rat;
    })(Entity = Polymorphed.Entity || (Polymorphed.Entity = {}));
})(Polymorphed || (Polymorphed = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Polymorphed;
(function (Polymorphed) {
    var Entity;
    (function (Entity) {
        var Obstacle = (function (_super) {
            __extends(Obstacle, _super);
            function Obstacle(game, x, y, h, w, texture) {
                _super.call(this, game, x, y);
                var bitmap = this.game.make.bitmapData(w, h, texture);
                this.game = game;
                bitmap.ctx.fillStyle = '#AAB6C1';
                bitmap.ctx.fillRect(0, 0, w, h);
                _super.call(this, game, x, y, bitmap);
                this.game.physics.arcade.enableBody(this);
                this.body.immovable = true;
            }
            return Obstacle;
        })(Phaser.Sprite);
        Entity.Obstacle = Obstacle;
    })(Entity = Polymorphed.Entity || (Polymorphed.Entity = {}));
})(Polymorphed || (Polymorphed = {}));
var Polymorphed;
(function (Polymorphed) {
    var Entity;
    (function (Entity) {
        (function (AnimalSpeciesEnum) {
            AnimalSpeciesEnum[AnimalSpeciesEnum["OWL"] = 0] = "OWL";
            AnimalSpeciesEnum[AnimalSpeciesEnum["RAT"] = 1] = "RAT";
        })(Entity.AnimalSpeciesEnum || (Entity.AnimalSpeciesEnum = {}));
        var AnimalSpeciesEnum = Entity.AnimalSpeciesEnum;
        var Animal = (function (_super) {
            __extends(Animal, _super);
            function Animal(game, x, y, initialSpecies) {
                _super.call(this, game, x, y);
                this.game = game;
                this.speciesList = [new Entity.Owl(), new Entity.Rat()];
                this.currentSpecies = initialSpecies;
                this.game.physics.arcade.enableBody(this);
                this.body.collideWorldBounds = true;
                this.transformInto(this.currentSpecies);
                this.handleInput();
            }
            Animal.prototype.update = function () {
                this.checkBounce();
            };
            Animal.prototype.handleInput = function () {
                this.inputEnabled = true;
                this.events.onInputDown.add(this.transformAnimal, this);
            };
            Animal.prototype.transformAnimal = function () {
                this.currentSpecies = (this.currentSpecies + 1) % this.speciesList.length;
                this.transformInto(this.currentSpecies);
            };
            Animal.prototype.transformInto = function (species) {
                this.loadTexture(this.speciesList[species].spriteSheet, 0);
                this.animations.add('move');
                this.animations.play('move', 3, true);
                this.body.reset(this.x, this.y);
                var isFacingRight = this.scale.x > 0;
                this.speciesList[species].setPhysics(this, isFacingRight);
                if (!isFacingRight) {
                    this.flipSprite();
                }
                if (this.game.rnd.frac() < 0.3) {
                    var sound = this.game.add.audio(this.speciesList[this.currentSpecies].transformSound);
                    sound.play();
                }
            };
            Animal.prototype.checkBounce = function () {
                if (this.body.blocked.right === true || this.body.blocked.left === true) {
                    this.flipSprite();
                }
            };
            Animal.prototype.flipSprite = function () {
                this.anchor.setTo(0.5, 1.0);
                this.scale.x = -this.scale.x;
            };
            Animal.prototype.playEscapeSound = function () {
                var sound = this.game.add.audio(this.speciesList[this.currentSpecies].escapeSound);
                sound.play();
            };
            Animal.prototype.escape = function () {
                this.body.enable = false;
                this.inputEnabled = false;
                this.playEscapeSound();
                var exitTween = this.game.add.tween(this).to({ alpha: 0 }, 3000, Phaser.Easing.Linear.None, true, 0, 0, false);
                exitTween.onComplete.add(this.kill, this);
            };
            return Animal;
        })(Phaser.Sprite);
        Entity.Animal = Animal;
    })(Entity = Polymorphed.Entity || (Polymorphed.Entity = {}));
})(Polymorphed || (Polymorphed = {}));
var Polymorphed;
(function (Polymorphed) {
    var Entity;
    (function (Entity) {
        var Exit = (function (_super) {
            __extends(Exit, _super);
            function Exit(game, x, y) {
                this.game = game;
                this.placeholderImage = this.game.make.bitmapData(10, 20);
                this.placeholderImage.ctx.fillStyle = '#ff0000';
                this.placeholderImage.ctx.fillRect(0, 0, 32, 32);
                _super.call(this, game, x, y, this.placeholderImage);
                this.game.physics.arcade.enableBody(this);
            }
            return Exit;
        })(Phaser.Sprite);
        Entity.Exit = Exit;
    })(Entity = Polymorphed.Entity || (Polymorphed.Entity = {}));
})(Polymorphed || (Polymorphed = {}));
var Polymorphed;
(function (Polymorphed) {
    var State;
    (function (State) {
        var Boot = (function (_super) {
            __extends(Boot, _super);
            function Boot() {
                _super.apply(this, arguments);
            }
            Boot.prototype.preload = function () {
                this.load.image('sombrero-logo', 'assets/images/sombrero-logo.png');
            };
            Boot.prototype.create = function () {
                this.game.stage.backgroundColor = 0xFFFFFF;
                // Assign global settings here
                this.game.state.start('preload');
            };
            return Boot;
        })(Phaser.State);
        State.Boot = Boot;
    })(State = Polymorphed.State || (Polymorphed.State = {}));
})(Polymorphed || (Polymorphed = {}));
var Polymorphed;
(function (Polymorphed) {
    var State;
    (function (State) {
        var Preload = (function (_super) {
            __extends(Preload, _super);
            function Preload() {
                _super.apply(this, arguments);
            }
            Preload.prototype.preload = function () {
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
            };
            Preload.prototype.create = function () {
                this.game.state.start('menu');
            };
            Preload.prototype.loadAllSoundFormats = function (fileName) {
                var directory = 'assets/sounds/';
                return [directory + fileName + '.mp3',
                    directory + fileName + '.ogg',
                    directory + fileName + '.wav'];
            };
            return Preload;
        })(Phaser.State);
        State.Preload = Preload;
    })(State = Polymorphed.State || (Polymorphed.State = {}));
})(Polymorphed || (Polymorphed = {}));
var Polymorphed;
(function (Polymorphed) {
    var State;
    (function (State) {
        var Menu = (function (_super) {
            __extends(Menu, _super);
            function Menu() {
                _super.apply(this, arguments);
            }
            Menu.prototype.create = function () {
                var _this = this;
                this.background = this.add.sprite(80, 0, 'sombrero-logo');
                this.input.onDown.addOnce(function () {
                    _this.game.state.start('tutorial');
                });
            };
            return Menu;
        })(Phaser.State);
        State.Menu = Menu;
    })(State = Polymorphed.State || (Polymorphed.State = {}));
})(Polymorphed || (Polymorphed = {}));
var Entity = Polymorphed.Entity;
var Polymorphed;
(function (Polymorphed) {
    var State;
    (function (State) {
        var Main = (function (_super) {
            __extends(Main, _super);
            function Main() {
                _super.apply(this, arguments);
            }
            Main.prototype.create = function () {
                // Initialise physics
                this.game.physics.startSystem(Phaser.Physics.ARCADE);
                this.background = this.add.sprite(0, 0, 'background');
                this.background.tint = 0x888888;
                var soundtrack = this.add.audio('soundtrack');
                soundtrack.play('', 0, 0.5, true);
                // TODO: Set up obstacles
                this.animals = this.game.add.group();
                var animalList = [
                    new Polymorphed.Entity.Animal(this.game, 20, 20, Polymorphed.Entity.AnimalSpeciesEnum.OWL),
                    new Polymorphed.Entity.Animal(this.game, 22, 40, Polymorphed.Entity.AnimalSpeciesEnum.OWL),
                    new Polymorphed.Entity.Animal(this.game, 24, 60, Polymorphed.Entity.AnimalSpeciesEnum.RAT),
                    new Polymorphed.Entity.Animal(this.game, 26, 80, Polymorphed.Entity.AnimalSpeciesEnum.RAT),
                    new Polymorphed.Entity.Animal(this.game, 28, 100, Polymorphed.Entity.AnimalSpeciesEnum.OWL),
                    new Polymorphed.Entity.Animal(this.game, 30, 120, Polymorphed.Entity.AnimalSpeciesEnum.RAT),
                ];
                for (var _i = 0; _i < animalList.length; _i++) {
                    var animal = animalList[_i];
                    this.animals.add(animal);
                }
                this.score = 0;
                this.counter = 60;
                this.timer = this.game.time.create(false);
                this.timer.loop(1000, this.updateCounter, this);
                this.timer.start();
                this.counterText = this.game.add.text(920, 0, this.counter.toString(), { font: "65px Arial", fill: "#ff0044", align: "center" });
                this.obstacles = this.game.add.group();
                var obstacleA = new Polymorphed.Entity.Obstacle(this.game, 150, 0, 570, 30, "obstacle1");
                var obstacleB = new Polymorphed.Entity.Obstacle(this.game, 370, 300, 300, 70, "obstacle2");
                var obstacleC = new Polymorphed.Entity.Obstacle(this.game, 370, 20, 150, 70, "obstacle1");
                var obstacleD = new Polymorphed.Entity.Obstacle(this.game, 550, 400, 200, 30, "obstacle2");
                var obstacleE = new Polymorphed.Entity.Obstacle(this.game, 550, 400, 30, 200, "obstacle1");
                var obstacleF = new Polymorphed.Entity.Obstacle(this.game, 870, 130, 400, 30, "obstacle2");
                var obstacleG = new Polymorphed.Entity.Obstacle(this.game, 700, 500, 30, 180, "obstacle1");
                var obstacleH = new Polymorphed.Entity.Obstacle(this.game, 870, 250, 30, 180, "obstacle2");
                this.obstacles.add(obstacleA);
                this.obstacles.add(obstacleB);
                this.obstacles.add(obstacleC);
                this.obstacles.add(obstacleD);
                this.obstacles.add(obstacleE);
                this.obstacles.add(obstacleF);
                this.obstacles.add(obstacleG);
                this.obstacles.add(obstacleH);
                this.spinningObstacles = this.game.add.group();
                // Not sure this needs to be an Obstacle..?
                var spinningObstacleA = new Polymorphed.Entity.Obstacle(this.game, 600, 100, 150, 30, "obstacle1");
                spinningObstacleA.body.syncBounds = true;
                this.spinningObstacles.add(spinningObstacleA);
                this.spinningObstacles.x = 700;
                this.spinningObstacles.y = 150;
                this.spinningObstacles.pivot.x = 600;
                this.spinningObstacles.pivot.y = 100;
                // TODO: Add traps
                // TODO: Add Entry / Exit points (can they spawn/remove the animals from the game?)
                this.exit = this.game.add.group();
                this.exit.add(new Polymorphed.Entity.Exit(this.game, 950, 550));
                this.exit.add(new Polymorphed.Entity.Exit(this.game, 950, 150));
            };
            Main.prototype.update = function () {
                this.game.physics.arcade.collide(this.animals, this.obstacles, this.animalCollidesWithObstacle, null, this);
                this.game.physics.arcade.overlap(this.animals, this.exit, this.animalOverlapsWithExit, null, this);
                this.game.physics.arcade.collide(this.animals, this.spinningObstacles, this.animalCollidesWithObstacle, null, this);
            };
            Main.prototype.animalCollidesWithObstacle = function (animal, obstacle) {
                if (animal.body.touching.left || animal.body.touching.right) {
                    animal.flipSprite();
                }
                // NO GOOD VERY BAD HACK TO STOP OWL FLYING THROUGH WALL
                animal.body.syncBounds = true;
            };
            Main.prototype.animalOverlapsWithExit = function (animal, exit) {
                animal.escape();
                this.score += 1;
                if (this.score === this.animals.length) {
                    this.timer.pause();
                    var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "YAY! THE ANIMALS ESCAPED", { font: "65px Arial", fill: "#ff0044", align: "center", boundsAlignH: "center", wordWrap: true, wordWrapWidth: 400 });
                    text.anchor.set(0.5);
                }
            };
            Main.prototype.updateCounter = function () {
                this.counter -= 1;
                this.counterText.setText(this.counter.toString());
                if (this.counter === 0) {
                    this.timer.pause();
                    this.animals.destroy();
                    var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "UH OH THE ANIMALS DIDN'T MAKE IT :(", { font: "65px Arial", fill: "#ff0044", align: "center", boundsAlignH: "center", wordWrap: true, wordWrapWidth: 400 });
                    text.anchor.set(0.5);
                }
                this.spinningObstacles.destroy();
                if (this.counter % 2 === 0) {
                }
                //      this.spinningObstacles.add(new Polymorphed.Entity.Obstacle(this.game, 600, 100, 30, 150));
            };
            return Main;
        })(Phaser.State);
        State.Main = Main;
    })(State = Polymorphed.State || (Polymorphed.State = {}));
})(Polymorphed || (Polymorphed = {}));
var Polymorphed;
(function (Polymorphed) {
    var State;
    (function (State) {
        var Tutorial = (function (_super) {
            __extends(Tutorial, _super);
            function Tutorial() {
                _super.apply(this, arguments);
            }
            Tutorial.prototype.create = function () {
                var _this = this;
                this.stage.backgroundColor = 0x000000;
                this.text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Click the animals to transform them and guide them to the red exits! You have 60 seconds. Good luck!", { font: "40px Georgia", fill: "#aa0000", align: "center", boundsAlignH: "center", wordWrap: true, wordWrapWidth: 400 });
                this.text.anchor.set(0.5);
                this.text.anchor.set(0.5);
                this.input.onDown.addOnce(function () {
                    _this.game.state.start('main');
                });
            };
            return Tutorial;
        })(Phaser.State);
        State.Tutorial = Tutorial;
    })(State = Polymorphed.State || (Polymorphed.State = {}));
})(Polymorphed || (Polymorphed = {}));
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
var Polymorphed;
(function (Polymorphed) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 1000, 600, Phaser.AUTO, 'game-div');
            this.state.add('boot', Polymorphed.State.Boot);
            this.state.add('preload', Polymorphed.State.Preload);
            this.state.add('menu', Polymorphed.State.Menu);
            this.state.add('tutorial', Polymorphed.State.Tutorial);
            this.state.add('main', Polymorphed.State.Main);
            this.state.start('boot');
        }
        return Game;
    })(Phaser.Game);
    Polymorphed.Game = Game;
})(Polymorphed || (Polymorphed = {}));
window.onload = function () {
    var game = new Polymorphed.Game();
};
//# sourceMappingURL=main.js.map