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
    this._gem = newGem;
    if(!_lang.isNull(newGem)){
      this.gem.reposition(this.xPos, this.yPos);
      this._gem.clickCallback = this.onGemClick.bind(this);
      this._gem.setDebugInfo(this.gridPos, this.neighbours);
    }
  }

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

  onGemClick(sprite, ptr){
    if(debug)console.log('onGemClick called', arguments, this);
    this.gridClickCallback(...arguments, this);
  }

  swapGems(otherGridEl){
    var oldGem = this.gem;
    this.gem = otherGridEl.gem;
    otherGridEl.gem = oldGem;
  }

  getNewGem(){
    if(debug)console.log('getNewGem called', arguments, this);

    this._gem.getNewSprite(this.xPos, this.yPos);
  }
}

export default GridElement
