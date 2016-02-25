const symbolsLibrary = require('../symbols-library');
const Point = require('../paper').Point;
const Key = require('../paper').Key;
const mix = require('../mix');
const Physics = require('../modules/physics');
const BaseActor = require('./base-actor');

module.exports = class Ship extends mix(BaseActor).with(Physics) {

  constructor(options) {
    super(options);
    this.direction = 0;
    this.mass = 10;

    this.instance = symbolsLibrary.ship.place();
  }

  step(ev) {
    super.step(ev);

    if(Key.isDown('up')) {
      let dirVector = new Point(Math.cos(this.direction), Math.sin(this.direction));
      this.applyForce(dirVector.multiply(1000))
    }
    if(Key.isDown('left')) {
      this.direction -= 3 * ev.delta;
    } else if(Key.isDown('right')) {
      this.direction += 3 * ev.delta;
    }
  }

  render() {
    this.instance.position = this.position;
    this.instance.rotation = this.direction / Math.PI * 180;
  }
}
