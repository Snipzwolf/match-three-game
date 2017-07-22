var gem = function(left, right, up, down){
  this.left = left;
  this.right = right;
  this.up = up;
  this.down = down;


  this.gemType = game.rnd.integerInRange(0, gem_prefixs.length-1);
  var name = gem_prefixs[ gemIdx ] + '_gem_1',
      sprite = game.add.sprite(xPos, yPos, 'gems', gemName);

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

export default gem;
