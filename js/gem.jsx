import Game from './game.jsx';
import Options from './options.js';
const debug = Options.debug && (Options.ignore_debug.gem !== true);

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

  get gemType(){ return this._gemType; }
  set gemType(a){ return; }

  set clickCallback(clickCallback) { this._clickCallback = clickCallback}

  constructor(xPos, yPos, clickCallback){
    this._clickCallback = clickCallback;
    this._getSprite(xPos, yPos);
  }

  getNewSprite(xPos, yPos){
    this._destroyCurrentSprite();
    this._getSprite(xPos, yPos);
  }

  isMatch(otherGem){
    return this.gemType === otherGem.gemType;
  }

  onClick(sprite, ptr){
    if(debug)console.log('onClick called', arguments, this);

    this._clickCallback(...arguments);
  }

  reposition(x, y){
    if(debug)console.log('reposition called', arguments, this);

    this.sprite.x = x;
    this.sprite.y = y;
  }

  _getSprite(x, y){
    this._gemType = Game.instance.phaser.rnd.integerInRange(0, gem_prefixs.length-1);
    this.name = gem_prefixs[ this.gemType ] + '_gem_1';
    this.sprite = Game.instance.phaser.add.sprite(x, y, 'gems', this.name);

    this.sprite.inputEnabled = true;
    this.sprite.events.onInputDown.add(this.onClick, this);
  }

  _destroyCurrentSprite(){
    this.sprite.destroy();
  }
}

export default Gem;
