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

    var windowWidth = $(window).width(),
        windowGemWidth = Math.floor((windowWidth - 450) / (Gem.width + Gem.margin * 2));

    if(windowGemWidth > 5){
      this.grid_size = [windowGemWidth, 8];
    }else{
      this.grid_size = [8, 8];
    }

    //this.grid_size = [15, 8];
    //this.grid_size = [3, 3];
    //this.grid_size = [5, 4];
    this.grid = null;
    this.scoreboard = Scoreboard.instance;

    this.game = new Phaser.Game({
      width: (this.grid_size[0] * Gem.width),
      height: (this.grid_size[1] * Gem.height),
      renderer: Phaser.AUTO,
      parent: 'game-canvas',
      state: {
        preload: () => this.preload(),
        create: () => this.create(),
        update: () => this.update()
      },
      transparent: true,
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
    this.grid.checkGrid();

    this._loaded = true;
  }

  update(){

  }

  checkForMatch(){
    if(debug)console.log('checkForMatch - called', arguments, this);

    Object.keys(arguments).map((key, idx) => {
      if(debug)console.log('checkForMatch - checking next element', idx, arguments[key]);

      var matches = this._getScores(arguments[key]);

      if((matches.x.length < 3) && (matches.y.length < 3)){
        if(debug)console.log('checkForMatch - no matches found', matches.x, matches.y, arguments, this);
      }else{
        var promiseArr = [];
        if(matches.x.length >= 3){
          if(debug)console.log('checkForMatch - x matches found', matches.x, matches.x.map(val => val.getGem().name));
          promiseArr.push(this._onMatches(matches.x));
          this._addToPlayerScore(matches.x.length);
        }

        if(matches.y.length >= 3){
          if(debug)console.log('checkForMatch - y matches found', matches.y, matches.y.map(val => val.getGem().name));
          promiseArr.push(this._onMatches(matches.y));
          this._addToPlayerScore(matches.y.length);
        }

        /*
        * if there was matches above check the grid for new matches
        * caused by gems moving or new gems added
        * TODO change to only check relevant grid elements and not the whole grid
        */
        Promise.all(promiseArr).then(() => this.grid.checkGrid());
      }
    });
  }

  _onGemMatch(gridEl){
    if(debug)console.log('onGemMatch called', arguments, this);
    var promiseArr = [];
    var newGem = gridEl.getGem();
    newGem.hide();
    gridEl.setGem(null);

    var nextEl, lastEl = gridEl;
    do{
      while((nextEl = lastEl.neighbours.up) !== null){
        nextEl = this.grid.getElementAt(nextEl);
        promiseArr.push(nextEl.swapGems(lastEl));
        lastEl = nextEl;
      }

      if(lastEl.getGem() === null){
        lastEl.setGem(newGem);
        lastEl.getNewGem();
      }

    }while((lastEl = nextEl) !== null);

    return Promise.all(promiseArr);
  }

  _addToPlayerScore(score){
    if(this._loaded){
      this.playerScore += score;
      this.scoreboard.updateScore(this.playerScore);
    }
  }

  _getScores(element){
    var ret = {};

    ret['x'] = this._getScore('left', element);
    ret['y'] = this._getScore('up', element);

    this._getScore('right', element, ret['x']);
    this._getScore('down', element, ret['y']);

    return ret;
  }

  _getScore(direction, startEl, matchArr, lastEl){
    matchArr = matchArr || [ startEl ];
    lastEl = lastEl || startEl;

    if(debug)console.log('getScore called', [direction, startEl, matchArr, lastEl], this);

    var nextPos = lastEl.neighbours[direction];

    if(debug)console.log('getScore nextPos', nextPos, _lang.isNull(nextPos));

    if(_lang.isNull(nextPos)){
      return matchArr;
    }

    var nextEl = this.grid.getElementAt(nextPos);
    if(!this.loaded && _lang.isNull(nextEl)){
      return matchArr;
    }

    if(lastEl.getGem().isMatch(nextEl.getGem())){
      matchArr.push(nextEl);
      this._getScore(direction, startEl, matchArr, nextEl);
    }

    return matchArr;
  }

  _onMatches(matches){
    var promiseArr = [];
    if(!this.loaded){
        var i = 1;
        while(i++ <= 6){
          while(true){
            matches[0].getNewGem();
            if(!matches[0].getGem().isMatch(matches[1].getGem())){
              break;
            }
          }
        }
    }else{
      matches.map((match, idx) => {
        promiseArr.push(this._onGemMatch(match));
      });
    }

    return Promise.all(promiseArr);
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
