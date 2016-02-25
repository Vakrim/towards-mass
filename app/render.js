const paper = require('./paper');

class Render {

  init(canvas) {
    this.setCanvas(canvas);
  }

  render(engine) {
    this.renderEach(engine.ships);
    this.renderEach(engine.bullets);
  }

  renderEach(list) {
    for(let entity of list) {
      entity.render();
    }
  }

  setCanvas(canvas) {
    paper.setup(canvas);
  }
}

module.exports = new Render();
