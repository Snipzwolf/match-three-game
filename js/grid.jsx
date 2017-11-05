import Gem from './gem.jsx';
import Game from './game.jsx';
import _lang from 'lodash/lang';
import _util from 'lodash/util';
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

class Grid{
  constructor(x, y){
    this.currentSelected = null;
    this.width = x;
    this.height = y;
    this.useGridDict = false;
    this.gridDict = {}

    var i = 1;
    var selfObj = this;
    this.grid = Array(x).fill().map((xVal, xIdx, xArr) => {
      return Array(y).fill().map((yVal, yIdx, yArr) => {
        var xPos = ((xIdx + 1) * Gem.width) - Gem.width,
            yPos = ((yIdx + 1) * Gem.height) - Gem.height,
            currentPos = i++;

        return new GridElement(xPos, yPos, currentPos, this.onGridElementClick.bind(this), this);
      });
    });

    for(var idx = 1; idx <= i; idx++){
      this.gridDict[idx] = this.getElementAt(idx);
    }

    this.useGridDict = true;
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
      Game.instance.checkForMatch(false, this.currentSelected, gridEl);
      this.currentSelected = null;
    }else{
      if(debug)console.log('illegal move');
      this.currentSelected = null;
    }
  }

  checkGrid(setupPhase){
    var allElements = [].concat(...this.grid);
    Game.instance.checkForMatch((_lang.isUndefined(setupPhase) ? false : setupPhase), ...allElements);
  }

  getElementAt(gridPos){
    if(debug)console.log('getElementAt called', arguments, this);

    if(this.useGridDict){
      return this.gridDict[gridPos];
    }

    var xPos = this._getXIndex(gridPos),
        yPos = this._getYIndex(gridPos);

    if(debug)console.log('getElementAt', xPos, yPos);

    if(_lang.isUndefined(this.grid[xPos]) || _lang.isUndefined(this.grid[xPos][yPos])){
      return null;
    }

    return this.grid[xPos][yPos];
  }

  canSwap(gridEl, otherGridEl){
    if(debug)console.log('onGridElementClick canSwap', arguments, this, gridEl.gridPos, otherGridEl.gridPos);

    return (gridEl.gridPos + this.height) === otherGridEl.gridPos
            || (gridEl.gridPos - this.height) === otherGridEl.gridPos
            || (gridEl.gridPos + 1) === otherGridEl.gridPos
            || (gridEl.gridPos - 1) === otherGridEl.gridPos
  }

  /*
  * Get the grid element position above the current position
  * @return {number} the grid position of the element or null if at the bounds of the grid
  */
  _up(currentPos){
    var retPos = currentPos - 1,
        bounds = this._getBounds(currentPos);

    if(bounds.top === currentPos){
      return null;
    }

    return retPos;
  }

  /*
  * Get the grid element position below the current position
  * @return {number} the grid position of the element or null if at the bounds of the grid
  */
  _down(currentPos){
    var retPos = currentPos + 1,
        bounds = this._getBounds(currentPos);

    if(bounds.bottom === currentPos){
      return null;
    }

    return retPos;
  }

  /*
  * Get the grid element position to the left the current position
  * @return {number} the grid position of the element or null if at the bounds of the grid
  */
  _left(currentPos){
    var retPos = currentPos - this.height,
        bounds = this._getBounds(currentPos);

    if(debug)console.log('left called', retPos, arguments, this);

    if(bounds.left === currentPos){
      return null;
    }

    return retPos;
  }

  /*
  * Get the grid element position to the right the current position
  * @return {number} the grid position of the element or null if at the bounds of the grid
  */
  _right(currentPos){
    var retPos = currentPos + this.height,
        bounds = this._getBounds(currentPos);

    if(debug)console.log('right called', retPos, arguments, this);

    if(bounds.right === currentPos){
      return null;
    }

    return retPos;
  }

  _getBounds(gridPos){
    var currentX = this._getXIndex(gridPos),
        currentY = this._getYIndex(gridPos),
        ret = { //FIXME this might be better breaking across lines as there is brackets and arrows everywhere :S
          'top' : gridPos - currentY,
          'bottom' : gridPos + (this.height - (currentY + 1)),
          'left' : ((pos) => (pos <= 0) ? gridPos : pos )(gridPos - this.height),
          'right' : ((pos) => (pos > (this.width * this.height)) ? gridPos : pos )(gridPos + this.height)
        };

    if(debug)console.log('_getBounds called', ret, arguments, this);

    return ret;
  }

  _getXIndex(gridPos){
    if(debug)console.log('_getXIndex called', arguments, this);

    return Math.ceil(gridPos / this.height) - 1;
  }

  _getYIndex(gridPos){
    if(debug)console.log('_getYindex called', arguments, this);

    return ((pos) => pos || this.height)(gridPos % this.height) - 1;
  }
}

export default Grid;
