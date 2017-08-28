import Game from './game.jsx';
import Options from './options.js';
import _lang from 'lodash/lang';
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

  get reloaded(){ return this._r; }
  set reloaded(a){ this._r = a; }

  set clickCallback(clickCallback) { this._clickCallback = clickCallback}

  constructor(xPos, yPos, clickCallback){
    this._clickCallback = clickCallback;
    this._getSprite(xPos, yPos);
    this.reloaded = false;
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

  reposition(x, y, callback){
    if(debug)console.log('reposition called', arguments, this);

    var tween = Game.instance.phaser.add.tween(this.sprite).to({
          x: x,
          y: y
     }, Options.swapSpeed, Phaser.Easing.Linear.None, true);

     if(!_lang.isUndefined(callback)){
       tween.onComplete.add(callback);
     }

    //this.sprite.x = x;
    //this.sprite.y = y;
  }

  _getSprite(x, y){
    this._gemType = Game.instance.phaser.rnd.integerInRange(0, gem_prefixs.length-1);
    this.name = gem_prefixs[ this._gemType ] + '_gem_1';
    this.sprite = Game.instance.phaser.add.sprite(x, y, 'gems', this.name);

    this.sprite.inputEnabled = true;
    this.sprite.events.onInputDown.add(this.onClick, this);

    if(debug){
      var style = { font: "12px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: gem_size.w, 'align': 'center', 'boundsAlignH': 'center' };
      this.label = Game.instance.phaser.add.text(0, 20, this.name.replace(new RegExp('_.+$', 'i'), ''), style);
      this.label.width = gem_size.w;
      this.sprite.addChild(this.label);
    }
  }

  _destroyCurrentSprite(){
    this.sprite.destroy();
  }
}

export default Gem;
