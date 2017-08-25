import Gem from './gem.jsx';
import Grid from './grid.jsx';
import Options from './options.js';
const debug = Options.debug && (Options.ignore_debug.game !== true);

class Game {
  get phaser(){ return this.game; }

  constructor(){
    //this.grid_size = [15, 9];
    this.grid_size = [3, 3];
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

  checkForMatch(firstEl, secondEl){
    if(debug)console.log('checkForMatch called', arguments, this);
    //this.getYAxisScore(startEl);

    var getScore = (funcName, startEl, matchArr, lastEl) => {
      if(debug)console.log('getScore called', arguments, this);
      matchArr = matchArr || [ startEl ];
      lastEl = lastEl || startEl;

      var nextPos = this.grid[funcName](lastEl.gridPos);

      if(debug)console.log('getScore nextPos', nextPos, nextPos === null);

      if(nextPos === null){
        return matchArr;
      }

      var nextEl = this.grid.getElementAt(nextPos);

      if(lastEl.gem.isMatch(nextEl.gem)){
        matchArr.push(nextEl);
        getScore(funcName, startEl, matchArr, nextEl);
      }

      return matchArr;
    };

    Object.keys(arguments).map((key, idx) => {
      var xMatches = getScore('left', arguments[key]),
          yMatches = getScore('up', arguments[key]);

      getScore('right', arguments[key], xMatches);
      getScore('down', arguments[key], yMatches);

      if((yMatches.length + xMatches.length) > 2){
        if(debug)console.log('matches found', xMatches, yMatches);

        if(xMatches.length > 3){
          //TODO something
        }

        if(yMatches.length > 3){
            //TODO something
        }

      }else{
        if(debug)console.log('no matches found', arguments, this);
      }
    });


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
