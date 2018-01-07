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
  m: 5 //TODO kill with fire as it unused
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

  getNewSprite(xPos, yPos, queuePos){
    this._destroyCurrentSprite();

    var startYPos = yPos;
    var tweenSpeed = 0;
    if(Game.instance.loaded){
      startYPos = (-((queuePos + 1) * gem_size.h));
      tweenSpeed = Options.swapSpeed;
      //tweenSpeed = (Math.abs(startYPos) / gem_size.h) * Options.swapSpeed;
    }

    this._getSprite(xPos, startYPos);
    if(Game.instance.loaded){
      var tween = Game.instance.phaser.add.tween(this.sprite).to({
            x: xPos,
            y: yPos
       }, tweenSpeed, Phaser.Easing.Linear.None, true);

       return new Promise((resolve, reject) => { tween.onComplete.add(() => resolve()); } );
    }

    return new Promise((resolve, reject) => resolve() );
  }

  isMatch(otherGem){
    return this.gemType === otherGem.gemType;
  }

  onClick(sprite, ptr){
    if(debug)console.log('onClick called', arguments, this);

    this.setFocus(true);
    this._clickCallback(...arguments);
  }

  setFocus(isFocus){
    this.sprite.alpha = isFocus ? 0.5 : 1;
  }

  reposition(x, y){
    if(debug)console.log('reposition called', arguments, this);

    var tween = Game.instance.phaser.add.tween(this.sprite).to({
        x: x,
        y: y
    }, Game.instance.loaded ? Options.swapSpeed : 0, Phaser.Easing.Linear.None, true);

    tween.onComplete.add(() => this.setFocus(false));

    return new Promise((resolve, reject) => { tween.onComplete.add(() => resolve()); } );
  }

  hide(){
    this.sprite.visible = false;
    return this;
  }

  show(){
    this.sprite.visible = true;
    return this;
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
