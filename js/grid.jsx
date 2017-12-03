import Game from './game.jsx';
import Gem from './gem.jsx';
import GridElement from './gridElement.jsx';
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

        return new GridElement(xPos, yPos, currentPos, this.onGridElementClick.bind(this), {
          'up': this._up(currentPos),
          'down': this._down(currentPos),
          'left': this._left(currentPos),
          'right': this._right(currentPos),
        });
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
      this.currentSelected.swapGems(gridEl).then(() => {
        Game.instance.checkForMatch(this.currentSelected, gridEl);
        this.currentSelected = null;
      });
    }else{
      if(debug)console.log('illegal move');
      this.currentSelected = null;
    }
  }

  checkGrid(){
    var allElements = [].concat(...this.grid);
    Game.instance.checkForMatch(...allElements);
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
