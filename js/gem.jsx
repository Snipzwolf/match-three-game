import Game from './game.jsx';

const gem_prefixs = [
  'yellow', 'blue', 'green', 'red', 'purple', 'pink'
];

const gem_size = {
  w: 55,
  h: 82,
  m: 5
};

class Gem{
  static get width(){ return gem_size.w; }
  static get height(){ return gem_size.h; }
  static get margin(){ return gem_size.m; }

  get margin(){ return this.gemType; }

  constructor(xPos, yPos){
    this.gemType = Game.instance.phaser.rnd.integerInRange(0, gem_prefixs.length-1);
    this.name = gem_prefixs[ this.gemType ] + '_gem_1';
    this.sprite = Game.instance.phaser.add.sprite(xPos, yPos, 'gems', this.name);
  }

  isMatch(otherGem){
    return this.gemType === otherGem.gemType;
  }
}

var gem = function(left, right, up, down){
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

export default Gem;
