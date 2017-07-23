import Gem from './gem.jsx';

/*
  Grid position is going from left to right and top to bottom
  ie a 2x2 grid would have the positions like so
  -----
  |1|2|
  |3|4|
  ----
*/

class GridElement{
  constructor(xPos, yPos, gridPos){
    this.xPos = xPos;
    this.yPos = yPos;
    this.gridPos = gridPos;

    this.gem = new Gem(this.xPos, this.yPos);
  }

  swap(otherGridEl){

  }
}

class Grid{
  constructor(x, y){

    this.width = x;
    this.height = y;

    var i = 1;
    this.grid = Array(x).fill().map((xV, xI, xArr) => {
      return Array(y).fill().map((yV, yI, yArr) => {
        var xPos = ((xI + 1) * Gem.width) - Gem.width,
            yPos = ((yI + 1) * Gem.height) - Gem.height;

        return new GridElement(xPos, yPos, i++);
      });
    });

    console.log(this, i)
  }
}

export default Grid;
