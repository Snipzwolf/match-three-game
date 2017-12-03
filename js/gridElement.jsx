import Game from './game.jsx';
import Gem from './gem.jsx';
import _lang from 'lodash/lang';
import Options from './options.js';
const debug = Options.debug;

class GridElement{

  constructor(xPos, yPos, gridPos, gridClickCallback, neighbours){
    this.xPos = xPos;
    this.yPos = yPos;
    this._gridPos = gridPos;
    this.gridClickCallback = gridClickCallback;
    this.parent = parent;

    this._gem = new Gem(this.xPos, this.yPos, this.onGemClick.bind(this));
    this._neighbours = Object.freeze(neighbours);

    this._gem.setDebugInfo(this.gridPos, this.neighbours);
  }

  get gridPos(){ return this._gridPos; }
  set gridPos(v){ return; }

  get gemPos() { return { x : this.xPos, y : this.yPos }; }
  set gemPos(v){ return; }

  get neighbours(){ return this._neighbours; }
  set neighbours(v){ return; }

  getGem(){
    return this._gem;
  }

  setGem(newGem){
    this._gem = newGem;

    if(!_lang.isNull(newGem)){
      this._gem.clickCallback = this.onGemClick.bind(this);
      this._gem.setDebugInfo(this.gridPos, this.neighbours);

      return this._gem.reposition(this.xPos, this.yPos);
    }

    return new Promise((resolve, reject) => resolve() );
  }

  onGemClick(sprite, ptr){
    if(debug)console.log('onGemClick called', arguments, this);
    this.gridClickCallback(...arguments, this);
  }

  swapGems(otherGridEl){
    var oldGem = this._gem;

    return Promise.all([
      this.setGem(otherGridEl.getGem()),
      otherGridEl.setGem(oldGem)
    ]);
  }

  getNewGem(){
    if(debug)console.log('getNewGem called', arguments, this);

    this._gem.getNewSprite(this.xPos, this.yPos);
  }
}

export default GridElement
