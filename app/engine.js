class Engine {

  constructor() {
    this.ships = new Set();
    this.planets = new Set();
    this.bullets = new Set();
  }

  init() {
    this.player = this.createActor('Ship', { position: new Point(0, 0) });
    this.createActor('Planet', { position: new Point(500, 500), radius: 50 });
    this.createActor('Planet', { position: new Point(500, -500), radius: 50 });
    this.createActor('Planet', { position: new Point(-500, 500), radius: 50 });
    this.createActor('Planet', { position: new Point(-500, -500), radius: 50 });

  }

  createActor(type, options) {
    let typeClass = eval(type);
    let actor = new typeClass(options)
    this[`${ type.toLowerCase() }s`].add(actor);
    return actor;
  }

  step(dt) {
    this.applyGravity(this.ships);
    this.applyGravity(this.bullets);
    this.stepEach(this.ships, dt);
    this.stepEach(this.bullets, dt);

    let cameraDiff;
    if(this.player.velocity.length > 100) {
      cameraDiff = this.player.velocity.normalize(100);
    } else {
      cameraDiff = this.player.velocity;
    }
    paper.view.center = this.player.position.add(cameraDiff);
  }

  stepEach(list, dt) {
    for(let entity of list) {
      entity.step(dt);
    }
  }

  allGravityElements(position, callback) {
    for(let planet of this.planets) {
      let diffPosition = planet.position.subtract(position);
      // let acc = planet.mass / Math.pow(diffPosition.length, 2);
      let acc = planet.mass / diffPosition.length / 100;
      callback(diffPosition.normalize(acc));
    }
  }

  applyGravity(list) {
    for(let entity of list) {
      this.allGravityElements(entity.position, entity.applyAcc)
    }
  }
}

module.exports = new Engine();

const Ship = require('./actors/ship');
const Planet = require('./actors/planet');
const Bullet = require('./actors/bullet');
const paper = require('./paper');
const Point = require('./paper').Point;
