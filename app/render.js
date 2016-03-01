const paper = require('./paper');
const engine = require('./engine');
const Path = require('./paper').Path;
const Point = require('./paper').Point;
const Group = require('./paper').Group;
const Size = require('./paper').Size;

class Render {

  init(canvas) {
    this.setCanvas(canvas);

    this.shipTrajectory = new Path();
    this.bulletTrajectory = new Path();
    this.shipTrajectory.strokeColor = '#ff0000';
    this.bulletTrajectory.strokeColor = '#0000ff';

    this.healthBarGroup = new Group();
    for(let i = 0; i < 5; i++) {
      this.healthBarGroup.addChild(new Path.Rectangle(new Point(17 * i, 0), new Size(14, 7)));
    }
    this.healthBarGroup.fillColor = '#ffffff';
    this.healthBarGroup.strokeColor = '#ffffff';
    this.healthBarGroup.opacity = 0.5;
    this.healthBarGroup.skew(-30, 0);
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
    this.renderHealthBar();
  }

  renderHealthBar() {
    this.healthBarGroup.position = engine.player.position.add(new Point(0, 25));
    this.healthBarGroup.children.forEach((bar, i) => {
      if(engine.player.health >= i + 1) {
        bar.fillColor = '#ffffff';
      } else {
        bar.fillColor = null;
      }
    });
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
