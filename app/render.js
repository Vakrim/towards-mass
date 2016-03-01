const paper = require('./paper');
const engine = require('./engine');
const Path = require('./paper').Path;
const Point = require('./paper').Point;

class Render {

  init(canvas) {
    this.setCanvas(canvas);

    this.shipTrajectory = new Path();
    this.bulletTrajectory = new Path();
    this.shipTrajectory.strokeColor = '#ff0000';
    this.bulletTrajectory.strokeColor = '#0000ff';
  }

  render() {
    this.renderEach(engine.ships);
    this.renderEach(engine.bullets);
    this.renderGUI();
  }

  renderEach(list) {
    for(let entity of list) {
      entity.render();
    }
  }

  renderGUI() {
    this.renderTrajectory(this.shipTrajectory, engine.player.velocity.clone());
    this.renderTrajectory(this.bulletTrajectory, engine.player.velocity.add(new Point({ angle: engine.player.direction, length: 100 })));
  }

  renderTrajectory(trajectory, initialVelocity) {
    let points = [];
    let trajPos = engine.player.position.clone();
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

  setCanvas(canvas) {
    paper.setup(canvas);
  }
}

module.exports = new Render();
