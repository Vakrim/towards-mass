const paper = require('./paper');
const Path = paper.Path;
const Point = paper.Point;
const Symbol = paper.Symbol;

class SymbolsLibrary {

  init() {
    this.generateShipSymbol();
    this.generateBulletSymbol();
  }

  generateShipSymbol() {
    let shipPath = new Path([
      new Point(0, 0),
      new Point(-6, 6),
      new Point(12, 0),
      new Point(-6, -6)
    ]);
    shipPath.closed = true;
    shipPath.strokeColor = '#ffffff';
    this.ship = new Symbol(shipPath);
  }

  generateBulletSymbol() {
    let bulletPath = new Path([
      new Point(0, 0),
      new Point(9, 1),
      new Point(10, 0),
      new Point(9, -1)
    ]);
    bulletPath.fillColor = '#ffffff';
    this.bullet = new Symbol(bulletPath);
  }
}

module.exports = new SymbolsLibrary;
