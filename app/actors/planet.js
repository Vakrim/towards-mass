const paper = require('../paper')
const Point = paper.Point;
const Path = paper.Path;

module.exports = class Planet {

  constructor(position, radius) {
    this.position = position;
    this.radius = radius;
    this.mass = 4 / 3 * Math.PI * this.radius * 10000;

    this.instance = new Path.Circle(this.position, this.radius)
    this.instance.strokeColor = '#ffffff';
  }
}
