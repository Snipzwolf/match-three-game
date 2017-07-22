import gem from './gem.jsx';

class Game {

  constructor(){
    this.grid = [15, 9];

    this.gem_prefixs = [
      'yellow', 'blue', 'green', 'red', 'purple', 'pink'
    ];

    this.gem_size = {
      w: 55,
      h: 82,
      m: 5
    };

    this.game = new Phaser.Game(this.grid[0] * this.gem_size.w, this.grid[1] * this.gem_size.h, Phaser.AUTO, 'game-canvas', { preload: this.preload, create: this.create, update: this.update, enableDebug: false});
  }

  preload(){
    this.game.load.atlasJSONHash('gems', 'images/gems.png', 'images/gems-hash.json');
  }

  create(){
    var x = 1, y;
    do{
      y = 1;
      do{
        var xPos = (x * gem_size.w) - gem_size.w,
            yPos = (y * gem_size.h) - gem_size.h,
            gemName = gem_prefixs[ game.rnd.integerInRange(0, gem_prefixs.length-1) ] + '_gem_1',
            gemSprite = game.add.sprite(xPos, yPos, 'gems', gemName);

          //TODO use gem class

          console.log({
            x: x,
            y: y,
            xPos: xPos,
            yPos: yPos,
            gemName: gemName,
            gemSprite: gemSprite
          });
      }while(y++ < grid[1]);
    }while(x++ < grid[0]);
  }

  update(){

  }
}

export default Game;
