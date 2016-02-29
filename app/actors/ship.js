const symbolsLibrary = require('../symbols-library');
const Point = require('../paper').Point;
const Key = require('../paper').Key;
const Path = require('../paper').Path;
const mix = require('../mix');
const Physics = require('../modules/physics');
const BaseActor = require('./base-actor');
const engine = require('../engine');

module.exports = class Ship extends mix(BaseActor).with(Physics) {

  constructor(options) {
    super(options);
    this.direction = 0;
    this.mass = 10;
    this.lastShootTime = 0;

    this.instance = symbolsLibrary.ship.place();
    this.trajectory = new Path();
    this.bulletTrajectory = new Path();
    this.trajectory.strokeColor = '#ff0000';
    this.bulletTrajectory.strokeColor = '#0000ff';
  }

  step(ev) {
    super.step(ev);

    if(Key.isDown('up')) {
      this.applyForce(new Point({ angle: this.direction, length: 1000 }));
    }
    if(Key.isDown('left')) {
      this.direction -= 170 * ev.delta;
    } else if(Key.isDown('right')) {
      this.direction += 170 * ev.delta;
    }
    if(Key.isDown('a') && ev.time >= this.lastShootTime + 0.4) {
      this.lastShootTime = ev.time;
      engine.createActor('Bullet', {
        velocity: this.velocity.add(new Point({ angle: this.direction, length: 100 })),
        position: this.position.add(new Point({ angle: this.direction, length: 10 }))
      });
    }
  }

  render() {
    this.instance.position = this.position;
    this.instance.rotation = this.direction;

    this.renderTrajectory(this.trajectory, this.velocity.clone());
    this.renderTrajectory(this.bulletTrajectory, this.velocity.add(new Point({ angle: this.direction, length: 100 })));
  }

  renderTrajectory(trajectory, initialVelocity) {
    let points = [];
    let trajPos = this.position.clone();
    let trajVel = initialVelocity;
    for(let i = 0; i < 30; i++ ) {
      engine.allGravityElements(trajPos, (acc) => {
        trajVel = trajVel.add(acc.multiply(1/10));
      });
      trajPos = trajPos.add(trajVel.multiply(1/10));
      points.push(trajPos);
    }
    trajectory.segments = points;
  }
}
