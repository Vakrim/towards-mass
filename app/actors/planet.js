const paper = require('../paper')
const Point = paper.Point;
const Path = paper.Path;
const BaseActor = require('./base-actor');

module.exports = class Planet extends BaseActor {

  constructor(options) {
    super(options);
    Object.assign(this, {
      mass: 4 / 3 * Math.PI * this.radius * 10000
    }, options);

    this.instance = new Path.Circle(this.position, this.radius)
    this.instance.strokeColor = '#ffffff';
  }
}
