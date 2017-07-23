import Gem from './gem.jsx';
import Grid from './grid.jsx';

class Game {
  get phaser(){ return this.game; }

  constructor(){
    this.grid_size = [15, 9];
    this.grid = null;
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
    this.grid = new Grid(this.grid_size[0], this.grid_size[1])
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
