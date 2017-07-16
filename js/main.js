$(document).ready(function(){
  var grid = [15, 9];

  var gem_prefixs = [
    'yellow', 'blue', 'green', 'red', 'purple', 'pink'
  ];

  var gem_size = {
    w: 55,
    h: 82,
    m: 5
  };

  function preload() {
    game.load.atlasJSONHash('gems', 'images/gems.png', 'images/gems-hash.json');
  }

  function create() {
    var x = 1, y;
    do{
      y = 1;
      do{
        var xPos = (x * gem_size.w) - gem_size.w,
            yPos = (y * gem_size.h) - gem_size.h,
            gemName = gem_prefixs[ game.rnd.integerInRange(0, gem_prefixs.length-1) ] + '_gem_1',
            gemSprite = game.add.sprite(xPos, yPos, 'gems', gemName);

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

  function update() {

  }

  var game = new Phaser.Game(grid[0] * gem_size.w, grid[1] * gem_size.h, Phaser.AUTO, 'game-canvas', { preload: preload, create: create, update: update, enableDebug: false});
});
