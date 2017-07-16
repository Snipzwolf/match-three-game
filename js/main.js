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

  var gem = function(left, right, up, down){
    this.left = left;
    this.right = right;
    this.up = up;
    this.down = down;

    this.gemType = game.rnd.integerInRange(0, gem_prefixs.length-1);
    var name = gem_prefixs[ gemIdx ] + '_gem_1',
    var sprite = game.add.sprite(xPos, yPos, 'gems', gemName);

    this.isMatch = function(gem){
      return this.gemType === gem.gemType;
    };

    this.hasMatch = function(direction){
      if(typeof direction !== 'undefined'){
        return this.isMatch(this[direction]) ? (this[direction].hasMatch(direction) + 1) : 0;
      }else{
        var matches = 0;
        for(var next in ['up', 'down', 'left', 'right']){
          if(this.isMatch(this[next])){
            var currMatches = this[next].hasMatch(next);
            if(currMatches > 3){
              matches += currMatches;
            }
          }
        }

        return matches;
      }
    }
  };

  var preload = function(){
    game.load.atlasJSONHash('gems', 'images/gems.png', 'images/gems-hash.json');
  };

  var create = function(){
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
  };

  var update = function(){

  };

  var game = new Phaser.Game(grid[0] * gem_size.w, grid[1] * gem_size.h, Phaser.AUTO, 'game-canvas', { preload: preload, create: create, update: update, enableDebug: false});
});
