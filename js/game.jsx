import Scoreboard from './scoreboard/scoreboard.jsx';
import Gem from './gem.jsx';
import Grid from './grid.jsx';
import Options from './options.js';
import _lang from 'lodash/lang';

const debug = Options.debug && (Options.ignore_debug.game !== true);

class Game {
  get phaser(){ return this.game; }

  get loaded() { return this._loaded; }
  set loaded(v) { }

  constructor(){
    this._loaded = false;
    this.grid_size = [15, 9];
    //this.grid_size = [3, 3];
    this.grid_size = [5, 4];
    this.grid = null;
    this.scoreboard = Scoreboard.instance;
    
    this.game = new Phaser.Game(this.grid_size[0] * Gem.width, this.grid_size[1] * Gem.height, Phaser.AUTO, 'game-canvas', {
      preload: () => this.preload(),
      create: () => this.create(),
      update: () => this.update(),
      enableDebug: false
    });

    this.playerScore = 0;
  }

  preload(){
    this.game.load.atlasJSONHash('gems', 'images/gems.png', 'images/gems-hash.json');
  }

  create(){
    console.log('rnd state is ', this.game.rnd.state());
    //this.game.rnd.state('!rnd,1,0.7426136841531843,0.31959505658596754,0.27615606714971364');

    this.grid = new Grid(this.grid_size[0], this.grid_size[1])
    this.grid.checkGrid(true);
    this._loaded = true;
    console.log(this.grid);
  }

  update(){

  }

  checkForMatch(setupPhase){
    if(debug)console.log('checkForMatch called', arguments, this);

    Object.keys(arguments).map((key, idx) => {
      if(debug)console.log('checking next element', idx, arguments[key]);
      if(idx === 0){
        return; //skip the first argument
      }

      var matches = this._getScores(setupPhase, arguments[key]);

      if(matches.x.length >= 3){
        if(debug)console.log('x matches found', matches.x);
        this._onMatches(setupPhase, matches.x);
        this._addToPlayerScore(matches.x.length);
      }

      if(matches.y.length >= 3){
        if(debug)console.log('y matches found', matches.y);
        this._onMatches(setupPhase, matches.y);
        this._addToPlayerScore(matches.y.length);
      }

      if((matches.x.length < 3) && (matches.y.length < 3)){
        if(debug)console.log('no matches found', matches.x, matches.y, arguments, this);
      }
    });
  }

  _addToPlayerScore(score){
    if(this._loaded){
      this.playerScore += score;
      this.scoreboard.updateScore(this.playerScore);
    }
  }

  _getScores(setupPhase, element){
    var ret = {};

    ret['x'] = this._getScore(setupPhase, 'left', element);
    ret['y'] = this._getScore(setupPhase, 'up', element);

    this._getScore(setupPhase, 'right', element, ret['x']);
    this._getScore(setupPhase, 'down', element, ret['y']);

    return ret;
  }

  _getScore(setupPhase, direction, startEl, matchArr, lastEl){
    matchArr = matchArr || [ startEl ];
    lastEl = lastEl || startEl;

    if(debug)console.log('getScore called', [direction, startEl, matchArr, lastEl], this);

    var nextPos = lastEl.neighbours[direction];

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
      this._getScore(setupPhase, direction, startEl, matchArr, nextEl);
    }

    return matchArr;
  }

  _onMatches(setupPhase, matches){
    if(setupPhase){
        var i = 1;
        while(i++ <= 6){
          while(true){
            matches[0].getNewGem();
            if(!matches[0].gem.isMatch(matches[1].gem)){
              break;
            }
          }
        }
    }else{
      matches.map((match, idx) => match.onGemMatch());
    }
  }

}

var instance = null;
class GameSingleton{
  static get instance(){
    if(!instance){
      instance = new Game();
      window.debug_game = instance;
    }

    return instance;
  }
}

export default GameSingleton;
