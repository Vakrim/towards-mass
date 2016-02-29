const Point = require('../paper').Point;

let Physics = (superclass) => class extends superclass {

  constructor(options) {
    super(options);
    this.velocity = options.velocity || new Point(0, 0);
    this.forceSum = options.forceSum || new Point(0, 0);
    this.mass =  options.mass || 10;

    this.applyAcc = this.applyAcc.bind(this);
  }

  applyAcc(acc) {
    this.applyForce(acc.multiply(this.mass));
  }

  applyForce(force) {
    this.forceSum = this.forceSum.add(force);
  }

  step(ev) {
    this.velocity = this.velocity.add(this.forceSum.multiply(ev.delta / this.mass));
    this.position = this.position.add(this.velocity.multiply(ev.delta));
    this.forceSum = new Point(0, 0);
  }
}

module.exports = Physics;
