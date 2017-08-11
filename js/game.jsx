import Gem from './gem.jsx';
import Grid from './grid.jsx';
import Options from './options.js';
const debug = Options.debug && (Options.ignore_debug.game !== true);

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

  checkForMatch(startEl){
    if(debug)console.log('checkForMatch called', arguments, this);
    this.getYAxisScore(startEl);
  }

  getYAxisScore(startEl){
    var bounds = this.grid.getBounds(startEl.gridPos);

    var getScore = (reverse, matchArr, lastEl) => {
      matchArr = matchArr || [ startEl ];
      lastEl = lastEl || startEl;

      var nextPos = reverse ? this.grid.down(lastEl.gridPos) : this.grid.up(lastEl.gridPos);

      if(nextEl === null){
        return matchArr;
      }

      var nextEl = this.grid.getElementAt(nextPos);

try{
      if(lastEl.gem.isMatch(nextEl.gem)){
        matchArr.push(nextEl);
        getScore(reverse, matchArr);
      }
}catch(ex){ debugger; }

      return matchArr;
    };

    var up = getScore(false),
        down = getScore(true);

    if((up.length + down.length) > 2){
      if(debug)console.log('matches found vertical', up, down, arguments, this);
    }else{
      if(debug)console.log('np matches found vertical', arguments, this);
    }
  }

  getXAxisScore(startEl){
    var bounds = this.grid.getBounds(startEl.gridPos);
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
