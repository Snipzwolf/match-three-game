import Gem from './gem.jsx';

class GridElement{
  constructor(xPos, yPos){
    
  }
}

class Grid{
  constructor(x, y){
    this.grid = Array(x).map((xV, xI, xArr) => {
      return Array(y).map((yV, yI, yArr) => {
        var xPos = ((xI + 1) * Gem.width) - Gem.width,
            yPos = ((yI + 1) * Gem.height) - Gem.height;

        return new GridElement(xPos, yPos);
      });
    });
  }
}

export default Grid;
