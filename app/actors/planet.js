const paper = require('../paper')
const Point = paper.Point;
const Path = paper.Path;
const BaseActor = require('./base-actor');

module.exports = class Planet extends BaseActor {

  constructor(options) {
    super(options);
    this.mass = 4 / 3 * Math.PI * this.radius * 10000;

    this.instance = new Path.Circle(this.position, this.radius)
    this.instance.strokeColor = '#ffffff';
  }
}
