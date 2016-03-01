const symbolsLibrary = require('../symbols-library');
const Point = require('../paper').Point;
const Key = require('../paper').Key;
const Path = require('../paper').Path;
const mix = require('../mix');
const Physics = require('../modules/physics');
const BaseActor = require('./base-actor');

module.exports = class Bullet extends mix(BaseActor).with(Physics) {

  constructor(options) {
    super(Object.assign({
      mass: 0.1
    }, options));

    this.instance = symbolsLibrary.bullet.place();
  }

  render() {
    this.instance.position = this.position;
    this.instance.rotation = this.velocity.angle;
  }
}
