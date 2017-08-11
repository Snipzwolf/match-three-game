import Gem from './gem.jsx';
import Game from './game.jsx';
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
    this.grid = Array(x).fill().map((xVal, xIdx, xArr) => {
      return Array(y).fill().map((yVal, yIdx, yArr) => {
        var xPos = ((xIdx + 1) * Gem.width) - Gem.width,
            yPos = ((yIdx + 1) * Gem.height) - Gem.height;

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
      Game.instance.checkForMatch(gridEl); //this is not great
    }else{
      if(debug)console.log('illegal move');
      this.currentSelected = null;
    }
  }

  getElementAt(gridPos){
    if(debug)console.log('getElementAt called', arguments, this);

    var xPos = this.getXIndex(gridPos),
        yPos = this.getYindex(gridPos);

    return this.grid[xPos][yPos];
  }

  /*
  * Get the grid element position above the current position
  * @return {number} the grid position of the element or null if at the bounds of the grid
  */
  up(currentPos){
    var retPos = currentPos - 1,
        bounds = this.getBounds(currentPos);

    if(bounds.top === currentPos){
      return null;
    }

    return retPos;
  }

  /*
  * Get the grid element position below the current position
  * @return {number} the grid position of the element or null if at the bounds of the grid
  */
  down(currentPos){
    var retPos = currentPos + 1,
        bounds = this.getBounds(currentPos);

    if(bounds.bottom === currentPos){
      return null;
    }

    return retPos;
  }

  /*
  * Get the grid element position to the left the current position
  * @return {number} the grid position of the element or null if at the bounds of the grid
  */
  left(currentPos){
    var retPos = currentPos - this.height,
        bounds = this.getBounds(currentPos);

    if(bounds.left === currentPos){
      return null;
    }

    return retPos;
  }

  /*
  * Get the grid element position to the right the current position
  * @return {number} the grid position of the element or null if at the bounds of the grid
  */
  right(currentPos){
    var retPos = currentPos - this.height,
        bounds = this.getBounds(currentPos);

    if(bounds.right === currentPos){
      return null;
    }

    return retPos;
  }

  getBounds(gridPos){
    var currentX = this.getXIndex(gridPos),
        currentY = this.getYindex(gridPos),
        ret = {
          'top' : (currentY === 0) ?  gridPos : (gridPos - (currentY + 1)),
          'bottom' : (currentY === this.height-1) ?  gridPos : (gridPos + (currentY + 1 - this.height)),
          'left' : (currentX === 0) ?  gridPos : (gridPos - (currentX * this.height)),
          'right' : (currentX === this.width-1) ?  gridPos : (gridPos - ((currentX + 1 - this.width) * this.height))
        };

    if(debug)console.log('getBounds called', ret, arguments, this);

    return ret;
  }

  getXIndex(gridPos){
    return Math.ceil(this.width / gridPos);
  }

  getYindex(gridPos){
    return this.width % gridPos;
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
