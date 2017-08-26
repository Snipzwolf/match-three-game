import Gem from './gem.jsx';
import Grid from './grid.jsx';
import Options from './options.js';
import _lang from 'lodash/lang';

const debug = Options.debug && (Options.ignore_debug.game !== true);

class Game {
  get phaser(){ return this.game; }

  constructor(){
    this.grid_size = [15, 9];
    //this.grid_size = [3, 3];
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
    this.grid.checkGrid();
  }

  update(){

  }

  checkForMatch(setupPhase){
    if(debug)console.log('checkForMatch called', arguments, this);
    //this.getYAxisScore(startEl);

    var getScore = (funcName, startEl, matchArr, lastEl) => {
      matchArr = matchArr || [ startEl ];
      lastEl = lastEl || startEl;

      if(debug)console.log('getScore called', [funcName, startEl, matchArr, lastEl], this);

      var nextPos = this.grid[funcName](lastEl.gridPos);

      if(debug)console.log('getScore nextPos', nextPos, _lang.isNull(nextPos));

      if(_lang.isNull(nextPos)){
        return matchArr;
      }

      var nextEl = this.grid.getElementAt(nextPos);
      if(setupPhase && _lang.isNull(nextEl)){
        return matchArr;
      }

      if(lastEl.gem.isMatch(nextEl.gem)){
        matchArr.push(nextEl);
        getScore(funcName, startEl, matchArr, nextEl);
      }

      return matchArr;
    };

    Object.keys(arguments).map((key, idx) => {
      if(debug)console.log('checking next element', idx, arguments[key]);
      if(idx === 0){
        return; //skip the first argument
      }

      var xMatches = getScore('left', arguments[key]),
          yMatches = getScore('up', arguments[key]);

      getScore('right', arguments[key], xMatches);
      getScore('down', arguments[key], yMatches);

      if(xMatches.length >= 3){
        if(debug)console.log('x matches found', xMatches);
        if(setupPhase){
            //TODO regnerate gem and re test, limit regneration attempts
        }else{
          xMatches.map((match, idx) => match.onGemMatch());
        }
      }

      if(yMatches.length >= 3){
        if(debug)console.log('y matches found', yMatches);
        if(setupPhase){
          //TODO regnerate gem and re test, limit regneration attempts
        }else{
          yMatches.map((match, idx) => match.onGemMatch());
        }
      }

      if((xMatches.length < 3) && (yMatches.length < 3)){
        if(debug)console.log('no matches found', xMatches, yMatches, arguments, this);
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
