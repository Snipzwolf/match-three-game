import Game from './game.jsx';
import Gem from './gem.jsx';
import _lang from 'lodash/lang';
import Options from './options.js';
const debug = Options.debug;

class GridElement{
  get gridPos(){ return this._gridPos; }
  set gridPos(v){ return; }

  get gemPos() { return { x : this.xPos, y : this.yPos }; }
  set gemPos(v){ return; }

  get neighbours(){ return this._neighbours; }
  set neighbours(v){ return; }

  get gem(){ return this._gem; }
  set gem(newGem){
    if(!_lang.isNull(newGem)){
      this._gem = newGem;
      this._gem.reposition(this.xPos, this.yPos);
      this._gem.clickCallback = this.onGemClick.bind(this);
      this._gem.setDebugInfo(this.gridPos, this.neighbours);
    }
  }

  constructor(xPos, yPos, gridPos, gridClickCallback, parent){
    this.xPos = xPos;
    this.yPos = yPos;
    this._gridPos = gridPos;
    this.gridClickCallback = gridClickCallback;
    this.parent = parent;

    this._gem = new Gem(this.xPos, this.yPos, this.onGemClick.bind(this));
    this._neighbours = {
      'up': this.parent._up(this._gridPos),
      'down': this.parent._down(this._gridPos),
      'left': this.parent._left(this._gridPos),
      'right': this.parent._right(this._gridPos),
    }

    this._gem.setDebugInfo(this.gridPos, this.neighbours);

    this._neighbours = Object.freeze(this._neighbours);
  }

  onGemClick(sprite, ptr){
    if(debug)console.log('onGemClick called', arguments, this);
    this.gridClickCallback(...arguments, this);
  }

  swapGems(otherGridEl){
    var oldGem = this.gem;
    this.gem = otherGridEl.gem;
    otherGridEl.gem = oldGem;
  }

  onGemMatch(){
    if(debug)console.log('onGemMatch called', arguments, this);
    //may want to do more on a gem match than get a new gem so put
    var newGem = this.gem;
    newGem.hide();
    this.gem = null;

    var nextEl, lastEl = this;
    do{
      while((nextEl = lastEl._neighbours.up) !== null){
        nextEl = this.parent.getElementAt(nextEl);
        nextEl.swapGems(lastEl);
        lastEl = nextEl;
      }

      if(lastEl.gem === null){
        lastEl.gem = newGem;
        lastEl.show();
        lastEl.getNewGem();
      }

    }while((lastEl = nextEl) !== null);
  }

  getNewGem(){
    if(debug)console.log('getNewGem called', arguments, this);

    if(Game.instance.loaded){
      debugger;
    }

    this._gem.getNewSprite(this.xPos, this.yPos);
  }
}

export default GridElement
