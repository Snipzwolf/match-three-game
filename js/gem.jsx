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

    this.sprite.alpha = 0.5;
    this._clickCallback(...arguments);
  }

  onSwap(){
    this.sprite.alpha = 1;
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

  hide(){
    this.sprite.visible = false;
  }

  show(){
    this.sprite.visible = true;
  }

  setDebugInfo(gridPos, neighbours){
    if(debug){
      var style = { fontSize: 20, fontVariant: 'Arial', fontWeight: "bold", fill: "#000000", wordWrap: false, wordWrapWidth: gem_size.w - 10, 'align': 'center', 'boundsAlignH': 'center' };

      var posText = this.name.replace(new RegExp('_.+$', 'i'), '');
      posText += '\n' + _lang.toString(neighbours.up);
      posText += '\n' + _lang.toString(neighbours.left) + ' | ' + _lang.toString(gridPos) + ' | ' + _lang.toString(neighbours.right);
      posText += '\n' + _lang.toString(neighbours.down);

      var label = Game.instance.phaser.add.text(5, 5, posText, style);
      label.width = gem_size.w - 10;
      label.height = gem_size.h;
      this.sprite.addChild(label);
    }
  }

  _getSprite(x, y){
    this._gemType = Game.instance.phaser.rnd.integerInRange(0, gem_prefixs.length-1);
    this.name = gem_prefixs[ this._gemType ] + '_gem_1';
    this.sprite = Game.instance.phaser.add.sprite(x, y, 'gems', this.name);

    this.sprite.inputEnabled = true;
    this.sprite.events.onInputDown.add(this.onClick, this);
  }

  _destroyCurrentSprite(){
    this.sprite.destroy();
  }
}

export default Gem;
