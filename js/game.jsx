import Gem from './gem.jsx';

class Game {
  get phaser(){ return this.game; }

  constructor(){
    this.grid_size = [15, 9];
    this.grid = [];
    this.game = new Phaser.Game(this.grid_size[0] * Gem.width, this.grid_size[1] * Gem.height, Phaser.AUTO, 'game-canvas', {
      preload: () => this.preload(),
      create: () => this.create(),
      update: () => this.update(),
      enableDebug: false
    });
  }

  preload(){
    this.game.load.atlasJSONHash('gems', 'images/gems.png', 'images/gems-hash.json');
  }

  create(){
    var x = 1, y;
    do{
      y = 1;
      do{
        var xPos = (x * Gem.width) - Gem.width,
            yPos = (y * Gem.height) - Gem.height,
            gem = new Gem(null, null, null, null, xPos, yPos);
      }while(y++ < this.grid_size[1]);
    }while(x++ < this.grid_size[0]);
  }

  update(){

  }
}

var instance = null;
class GameSingleton{
  static get instance(){
    if(!instance){
      instance = new Game();
    }

    return instance;
  }
}

export default GameSingleton;
