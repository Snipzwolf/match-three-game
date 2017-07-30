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

  checkForMatch(startEl){
    if(debug)console.log('checkForMatch called', arguments, this);

  }

  getYAxisScore(startEl){
    var bounds = this.grid.getBounds(startEl.gridPos);

    var getScore = (increment, step, matchArr) => {
      matchArr = matchArr || [];
      increment=+step;

      var nextPos = startEl.gridPos + increment,
          nextEl = this.grid.getElementAt(nextPos);

      //TODO do bounds check
      
      if(startEl.gem.isMatch(nextEl.gem)){
        matchArr.push(nextEl);
        return getScore(increment, step, matchArr);
      }

      return {
        'score' : increment - 1,
        'matches' : matchArr
      };
    };

    var up = getScore(0, 1),
        down = getScore(0, -1);

    if(up.matches + down.matches > 2){

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
