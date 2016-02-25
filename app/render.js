const paper = require('./paper');

class Render {

  init(canvas) {
    this.setCanvas(canvas);
  }

  render(state) {
    this.renderEach(state.ships);
    this.renderEach(state.bullets);
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
