const Ship = require('./actors/ship');
const Planet = require('./actors/planet');
const Bullet = require('./actors/bullet');
const Point = require('./paper').Point;

class Engine {

  constructor() {
    this.ships = new Set();
    this.planets = new Set();
    this.bullets = new Set();
  }

  init() {
    this.ships.add(new Ship(new Point(50, 50)));
    this.planets.add(new Planet(new Point(500, 500), 50));

    for(let i = 10; i < 200; i += 10) {
      this.bullets.add(new Bullet(new Point(5, i)));
    }
  }

  step(dt) {
    this.applyGravity(this.ships);
    this.applyGravity(this.bullets);
    this.stepEach(this.ships, dt);
    this.stepEach(this.bullets, dt);
  }

  stepEach(list, dt) {
    for(let entity of list) {
      entity.step(dt);
    }
  }

  applyGravity(list) {
    for(let planet of this.planets) {
      for(let entity of list) {
        let diffPosition = planet.position.subtract(entity.position);
        let force = planet.mass * entity.mass / Math.pow(diffPosition.length, 2);
        entity.applyForce(diffPosition.normalize(force));
      }
    }
  }
}

module.exports = new Engine();
