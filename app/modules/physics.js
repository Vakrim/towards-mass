const Point = require('../paper').Point;

let Physics = (superclass) => class extends superclass {

  constructor() {
    super();
    this.velocity = new Point(0, 0);
    this.forceSum = new Point(0, 0);
    this.mass = 10;
  }

  applyForce(force) {
    this.forceSum = this.forceSum.add(force);
  }

  step(dt) {
    this.velocity = this.velocity.add(this.forceSum.multiply(dt / this.mass));
    this.position = this.position.add(this.velocity.multiply(dt));
    this.forceSum = new Point(0, 0);
  }
}

module.exports = Physics;