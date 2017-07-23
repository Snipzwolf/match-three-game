import Gem from './gem.jsx';
import Options from './options.js';
const debug = Options.debug;

/*
  Grid position is going from top to bottom and left to right
  ie a 2x2 grid would have the positions like so
  -----
  |1|3|
  |2|4|
  ----
*/

class GridElement{
  get gridPos(){ return this._gridPos; }
  set gridPos(v){ return; } //dont want this settable externally
  get gem(){ return this._gem; }
  set gem(newGem){
    this._gem = newGem;
    this._gem.reposition(this.xPos, this.yPos);
    this._gem.clickCallback = this.onGemClick.bind(this);
  }

  constructor(xPos, yPos, gridPos, gridClickCallback){
    this.xPos = xPos;
    this.yPos = yPos;
    this._gridPos = gridPos;
    this.gridClickCallback = gridClickCallback;

    this.gem = new Gem(this.xPos, this.yPos, this.onGemClick.bind(this));
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
}

class Grid{
  constructor(x, y){
    this.currentSelected = null;
    this.width = x;
    this.height = y;

    var i = 1;
    this.grid = Array(x).fill().map((xV, xI, xArr) => {
      return Array(y).fill().map((yV, yI, yArr) => {
        var xPos = ((xI + 1) * Gem.width) - Gem.width,
            yPos = ((yI + 1) * Gem.height) - Gem.height;

        return new GridElement(xPos, yPos, i++, this.onGridElementClick.bind(this));
      });
    });
  }

  onGridElementClick(sprite, ptr, gridEl){
    if(debug)console.log('onGridElementClick called', arguments, this);

    if(this.currentSelected === null){ //selected an intial gem to move
      if(debug)console.log('select');
      this.currentSelected = gridEl;
    }else if(this.currentSelected === gridEl){ //deselected intial gem
      if(debug)console.log('deselect');
      this.currentSelected = null;
    }else if(this.canSwap(this.currentSelected, gridEl)){
      if(debug)console.log('swap');
      this.currentSelected.swapGems(gridEl);
      this.currentSelected = null;
    }else{
      if(debug)console.log('illegal move');
      this.currentSelected = null;
    }
  }

  canSwap(gridEl, otherGridEl){
    if(debug)console.log('onGridElementClick canSwap', arguments, this, gridEl.gridPos, otherGridEl.gridPos);

    return (gridEl.gridPos + this.height) === otherGridEl.gridPos
            || (gridEl.gridPos - this.height) === otherGridEl.gridPos
            || (gridEl.gridPos + 1) === otherGridEl.gridPos
            || (gridEl.gridPos - 1) === otherGridEl.gridPos
  }
}

export default Grid;
